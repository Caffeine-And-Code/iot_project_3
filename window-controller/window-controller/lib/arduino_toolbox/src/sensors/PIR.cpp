#include "PIR.h"
#include "Arduino.h"

PIR::PIR(unsigned char pin) : MonoPin(pin)
{
    pinMode(this->pin, INPUT);
}

void PIR::calibrate(unsigned char calibrationSeconds)
{
    delay(calibrationSeconds * 1000);
}

bool PIR::hasDetected()
{
    bool read = digitalRead(this->pin);
    return read;
}

bool PIR::hasChanged()
{
    bool checkValue = this->lastValue;
    this->lastValue = this->hasDetected();
    return this->lastValue != checkValue;
}