#ifndef __DOUBLE_PIN__
#define __DOUBLE_PIN__

class DoublePin
{
protected:
    unsigned char firstPin;
    unsigned char secondPin;

public:
    DoublePin(unsigned char firstPin, unsigned char secondPin);
};

#endif