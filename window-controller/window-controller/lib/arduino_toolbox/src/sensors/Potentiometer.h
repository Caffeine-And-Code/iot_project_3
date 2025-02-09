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
        return (int)round(value * 100 / 1024);
    }
};

#endif