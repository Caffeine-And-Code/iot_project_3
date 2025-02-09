#ifndef __ULTRASOUND_PROXIMITY__
#define __ULTRASOUND_PROXIMITY__

#include "../DoublePin.h"
#include "Temperature.h"
#include "../ChangeNotifier.h"

class UltrasoundProximity : public DoublePin, public ChangeNotifier
{
private:
    Temperature *temperatureSensor;
    short temperature = 0;
    bool useSensor = false;
    short lastValue = 0;

public:
    UltrasoundProximity(unsigned char trigPin, unsigned char echoPint, Temperature *temperature);
    UltrasoundProximity(unsigned char trigPin, unsigned char echoPint, short temperature);

    /// @return the distance in cm (centimeters)
    short getDistance();
    bool hasChanged();
};

#endif