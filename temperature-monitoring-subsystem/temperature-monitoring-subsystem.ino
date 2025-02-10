#include "EspController.h"

EspController* esp;

void setup() {
  Serial.begin(115200);
  esp = new EspController();
  esp->start();
}

void loop() {
  esp->loop();
}