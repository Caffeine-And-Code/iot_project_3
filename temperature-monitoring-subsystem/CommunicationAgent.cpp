#include <WiFi.h>
#include <PubSubClient.h>
#include "CommunicationAgent.h"

#define MSG_BUFFER_SIZE 50
#define CONNECTION_TIMEOUT 10000
#define PAUSE_FREQUENCY -1

WiFiClient espClient;
PubSubClient client(espClient);

/* Network variables */
const char* __ssid;
const char* __password;
const char* __mqtt_server;
const char* __topic;
int __port;

/* Messages variables */
unsigned long lastMsgTime = 0;
char msg[MSG_BUFFER_SIZE];

/* Input variables */
float temperatureToSend = -1;

/* Return variables */
float frequency = PAUSE_FREQUENCY; // Hz, how many times per second the data is sent

bool setup_wifi() {
    WiFi.disconnect(true); 
    delay(100);

    WiFi.mode(WIFI_STA);
    WiFi.begin(__ssid, __password);

    Serial.print("Connecting to WiFi");

    unsigned long startAttemptTime = millis();

    while (WiFi.status() != WL_CONNECTED) {
        if (millis() - startAttemptTime >= CONNECTION_TIMEOUT) {
            Serial.println("\nWiFi connection timeout");
            WiFi.disconnect(true);
            delay(500); 
            return false;
        }
        delay(500);
        Serial.print(".");
    }

    Serial.println("\nConnected");
    
    return true;
}

bool connectMQTT() {
  
    Serial.println("Attempting MQTT connection...");
    
    String clientId = String("esp32-")+String(random(0xffff), HEX);

    if (client.connect(clientId.c_str())) {
        Serial.println("Connected");
        client.subscribe(__topic);
        return true;
    }
    Serial.println("Connection failed");
    return false;
}

float messageTryCast(char* message) {
    if (message[0] == 'F' && strlen(message) > 1) {
        float number = atof(&message[1]);
        if (number == PAUSE_FREQUENCY) {
            return PAUSE_FREQUENCY;
        }
        else if (number > 0) {
            return number;
        }
    }
    return 0;
}

void messageCallback(char* topic, byte* payload, unsigned int length) {
    char message[length + 1];
    for (unsigned int i = 0; i < length; i++) {
        message[i] = (char)payload[i];
    }
    message[length] = '\0';

    float number = messageTryCast(message);
    if (number > 0) {
        Serial.print("Update frequency (Hz): ");
        Serial.println(number);
        frequency = number;
    }
    else if (number == PAUSE_FREQUENCY) {
        Serial.println("Transmission paused");
        frequency = number;
    }
}

bool CommunicationAgent::setupConnection() {
    
    if (!setup_wifi()) {
        return false;
    }
    client.setServer(__mqtt_server, 1883);
    client.setCallback(messageCallback);
    if (!connectMQTT()) {
        return false;
    }
    return true;
}

CommunicationAgent::CommunicationAgent(const char* ssid, const char* password, const char* mqtt_server, const char* topic, int port) {
  
    __ssid = ssid;
    __password = password;
    __mqtt_server = mqtt_server;
    __topic = topic;
    __port = port;

    randomSeed(micros());
}

bool sendMessage() {
    if (!client.connected()) {
        return false;
    }

    unsigned long now = millis();

    // Start transmitting only if a frequency has been assigned
    if (frequency != PAUSE_FREQUENCY && (now - lastMsgTime > (1000 / frequency))) {
        lastMsgTime = now;
        snprintf(msg, MSG_BUFFER_SIZE, "T%.2f", temperatureToSend);
        client.publish(__topic, msg);
        client.subscribe(__topic);
    }
    return true;
}

bool CommunicationAgent::loop() {
    return client.loop() && sendMessage();
}

bool CommunicationAgent::handleConnectionError() {
    unsigned long start;
    if (WiFi.status() != WL_CONNECTED) {
        start = millis();
        Serial.println("WiFi error: attempting reconnection");
        if(!setup_wifi()) {
            return false;
        }
    }
    client.setServer(__mqtt_server, __port);
    client.setCallback(messageCallback);

    if (!client.connected()) {
        start = millis();
        Serial.println("MQTT connection lost: attempting reconnection");
        if(!connectMQTT()) {
            return false;
        }
    }

    return true;
    
}

void CommunicationAgent::sendTemperature(float temperature) {
    temperatureToSend = temperature;
}