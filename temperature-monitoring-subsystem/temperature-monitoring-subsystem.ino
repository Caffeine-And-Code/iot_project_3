#include "ConnectionState.h"
#include "CommunicationAgent.h"
#include <esp32-hal.h>

#define TEMP_UPDATE_DELTA 1000

/* Configuration variables */
#define GREEN_PIN 4
#define RED_PIN 5
#define TEMP_PIN 8

const char* ssid = "esp32wifi";
const char* password = "esp3232esp";
const char* mqtt_server = "broker.hivemq.com";
const char* topic = "iot_project_3";

CommunicationAgent* agent;
ConnectionState::State state;

unsigned long lastRegistration;

// void getFreeMemory() {
//   Serial.print("Free memory (bytes): ");
//   Serial.println(esp_get_free_heap_size());
// }

void switchState(ConnectionState::State newState) {
  if (state != newState) {
    state = newState;
    switch (state)
    {
    case ConnectionState::CONNECTION_OK:
      digitalWrite(GREEN_PIN, HIGH);
      digitalWrite(RED_PIN, LOW);
      break;
    
    default:
      digitalWrite(RED_PIN, HIGH);
      digitalWrite(GREEN_PIN, LOW);
      break;
    }
  }
}

float readTemperature() {
  int sensorValue = analogRead(TEMP_PIN);
  return (sensorValue * (3.3 / 4095.0)) * 100.0;
}

void setup() {
  Serial.begin(115200);

  agent = new CommunicationAgent(ssid, password, mqtt_server, topic);

  state = ConnectionState::UNKNOWN;

  pinMode(GREEN_PIN, OUTPUT);
  pinMode(RED_PIN, OUTPUT);
  pinMode(TEMP_PIN, INPUT);

  if (agent->setupConnection()) {
    switchState(ConnectionState::CONNECTION_OK);
  }
  else {
    switchState(ConnectionState::CONNECTION_ERROR);
  }

  lastRegistration = millis();
}

void loop() {

  if(state == ConnectionState::CONNECTION_OK) {
    if(!agent->loop()) {
      switchState(ConnectionState::CONNECTION_ERROR);
    }

    if (millis() - lastRegistration >= TEMP_UPDATE_DELTA) {
      agent->sendTemperature(readTemperature());
    }

  }
  else {
    if(agent->handleConnectionError()) {
      switchState(ConnectionState::CONNECTION_OK);
    }
  }


}