#ifndef __PIR__
#define __PIR__

#include "../MonoPin.h"
#include "../ChangeNotifier.h"

class PIR : public MonoPin, ChangeNotifier
{
protected:
    bool lastValue;

public:
    PIR(unsigned char pin);
    void calibrate(unsigned char calibrationSeconds);
    bool hasDetected();
    bool hasChanged();
};

#endif