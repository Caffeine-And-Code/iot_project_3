#ifndef __POTENTIOMETER__
#define __POTENTIOMETER__

#include "../MonoPin.h"
#include "../ChangeNotifier.h"
#include "Arduino.h"

class Potentiometer : public MonoPin, public ChangeNotifier
{
private:
    int lastValue;

public:
    Potentiometer(unsigned char pin);
    int getValue();
    bool hasChanged();

    static int toPercentage(int value)
    {
        float a = ((float)value) / 1020.0;
        int b = a * 100;
        return b;
    }
};

#endif