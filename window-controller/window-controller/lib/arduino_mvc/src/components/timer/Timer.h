#ifndef __TIMER__
#define __TIMER__
#include "Controller.h"
#include "Arduino.h"
#include "Event.h"

class Controller;

class Timer
{
    bool loop;
    unsigned long time;
    unsigned long lastCheckMillis;
    bool running;
    Event *triggerEvent;
    bool shouldTrigger;
    bool trigger;
    bool isStopped;
    Controller *controller;

public:
    Timer(Controller *controller, Event *triggerEvent);
    Timer();
    void init(unsigned long time, bool loop);

    bool isRunning();

    void start();

    void restart();
    void stop();

    void update();
    bool runUpdateAndCheckTrigger();
    bool hasTriggered();
};

#endif