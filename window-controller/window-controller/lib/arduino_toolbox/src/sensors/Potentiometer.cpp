#include "Potentiometer.h"
#include "Arduino.h"

Potentiometer::Potentiometer(unsigned char pin) : MonoPin(pin)
{
    pinMode(pin, INPUT);
}

int Potentiometer::getValue()
{
    return analogRead(this->pin);
}

bool Potentiometer::hasChanged()
{
    int checkValue = this->lastValue;
    this->lastValue = this->getValue();
    return this->lastValue != checkValue;
}