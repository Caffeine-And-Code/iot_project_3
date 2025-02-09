#ifndef __SERVO_MOTOR__
#define __SERVO_MOTOR__

#define SERVO_MOTOR_OPEN 180
#define SERVO_MOTOR_CLOSE 0

#include "../MonoPin.h"
#include <Servo.h>

class ServoMotor : public MonoPin
{
protected:
    Servo servo;
    short lastValue = -1;

public:
    ServoMotor(unsigned char pin);
    void move(short value);
    void open();
    void close();
};

#endif