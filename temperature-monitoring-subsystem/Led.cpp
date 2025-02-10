#include "Led.h"
#include <esp32-hal.h>

Led::Led(int pin) {
    this->pin = pin;
    pinMode(pin, OUTPUT);
    this->state = false;
}

void Led::on() {
    if (!this->state) {
        digitalWrite(pin, HIGH);
        this->state = true;
    }
}

void Led::off() {
    if (this->state) {
        digitalWrite(pin, LOW);
        this->state = false;
    }
}