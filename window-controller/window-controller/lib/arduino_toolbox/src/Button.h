#ifndef __BUTTON__
#define __BUTTON__

#include "MonoPin.h"
#include "ChangeNotifier.h"

class Button : public MonoPin, public ChangeNotifier
{
private:
    bool lastValue = false;

public:
    Button(unsigned char pin);
    bool isPressed();
    bool hasChanged();
};

#endif