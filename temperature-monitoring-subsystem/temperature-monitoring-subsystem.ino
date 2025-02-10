#include "ConnectionState.h"
#include "CommunicationAgent.h"
#include <esp32-hal.h>
#include "Configuration.h"
#include "Led.h"
#include "Thermo.h"

Led* green;
Led* red;
Thermo* thermo;

CommunicationAgent* agent;
ConnectionState::State state;

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
      green->on();
      red->off();
      break;
    
    default:
      green->off();
      red->on();
      break;
    }
  }
}

void setup() {
  Serial.begin(115200);

  agent = new CommunicationAgent(SSID, PASSWORD, MQTT_SERVER, TOPIC, PORT);

  state = ConnectionState::UNKNOWN;

  green = new Led(GREEN_PIN);
  red = new Led(RED_PIN);
  thermo = new Thermo(TEMP_PIN);

  if (agent->setupConnection()) {
    switchState(ConnectionState::CONNECTION_OK);
  }
  else {
    switchState(ConnectionState::CONNECTION_ERROR);
  }
}

void loop() {

  if(state == ConnectionState::CONNECTION_OK) {
    if(!agent->loop()) {
      switchState(ConnectionState::CONNECTION_ERROR);
    }

    agent->sendTemperature(thermo->readTemperature());

  }
  else {
    if(agent->handleConnectionError()) {
      switchState(ConnectionState::CONNECTION_OK);
    }
  }


}