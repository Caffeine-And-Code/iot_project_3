#ifndef __TEMPERATURE__
#define __TEMPERATURE__

#define TEMPERATURE_CONSTANT 0.48828125

#include "../MonoPin.h"
#include "../ChangeNotifier.h"

class Temperature : public MonoPin, public ChangeNotifier
{
private:
    int lastValue;

public:
    Temperature(unsigned char pin);
    int getTemperature();
    bool hasChanged();
};

#endif