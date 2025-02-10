#include "EspController.h"

Thermo* thermo;

CommunicationAgent* agent;
ConnectionState* stateMachine;

// void getFreeMemory() {
//   Serial.print("Free memory (bytes): ");
//   Serial.println(esp_get_free_heap_size());
// }

EspController::EspController() {
    agent = new CommunicationAgent(SSID, PASSWORD, MQTT_SERVER, TOPIC, PORT);

    thermo = new Thermo(TEMP_PIN);

    stateMachine = new ConnectionState(new Led(GREEN_PIN), new Led(RED_PIN));
}

void EspController::start() {

  if (agent->setupConnection()) {
    stateMachine->trigger(ConnectionState::CONNECTION_OK);
  }
  else {
    stateMachine->trigger(ConnectionState::CONNECTION_ERROR);
  }
}

void EspController::loop() {

  if(stateMachine->isConnected()) {
    if(!agent->loop()) {
      stateMachine->trigger(ConnectionState::CONNECTION_ERROR);
    }

    agent->sendTemperature(thermo->readTemperature());

  }
  else if(agent->handleConnectionError()) {
    stateMachine->trigger(ConnectionState::CONNECTION_OK);
  }

}