#ifndef __LED__
#define __LED__

#include "MonoPin.h"

class Led : public MonoPin
{
public:
    Led(unsigned char pin);
    void switchOn();
    void switchOff();
};

#endif