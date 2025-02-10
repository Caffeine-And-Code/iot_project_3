#ifndef __DOOR__
#define __DOOR__
#include "outputs/ServoMotor.h"
#define WINDOW_OPEN 90
#define WINDOW_CLOSE 0

class Window : ServoMotor
{
public:
    Window(unsigned char pin) : ServoMotor(pin) {}

    void open(int percentage)
    {
        short degree = (percentage * (WINDOW_OPEN - WINDOW_CLOSE) / 100) + WINDOW_CLOSE;
        this->move(degree);
    }
};

#endif