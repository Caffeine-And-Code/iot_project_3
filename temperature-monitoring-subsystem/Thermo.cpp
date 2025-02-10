#include "Thermo.h"
#include <esp32-hal.h>

Thermo::Thermo(int pin) {
    this->pin = pin;
    pinMode(pin, INPUT);
}

float Thermo::readTemperature() {
    int sensorValue = analogRead(this->pin);
    return (sensorValue * (3.3 / 4095.0)) * 100.0;
}