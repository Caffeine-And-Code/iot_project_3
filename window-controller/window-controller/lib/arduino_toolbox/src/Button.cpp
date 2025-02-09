#include "Button.h"
#include "Arduino.h"

Button::Button(unsigned char pin) : MonoPin(pin)
{
    pinMode(this->pin, INPUT);
}

bool Button::isPressed()
{
    return digitalRead(this->pin) == HIGH;
}

bool Button::hasChanged()
{
    bool pressed = this->isPressed();
    bool lValue = this->lastValue;
    this->lastValue = pressed;
    return pressed != lValue;
}