#ifndef __CONTROLLER__
#define __CONTROLLER__

#include "Arduino.h"
#include "EventScheduler.h"
#include "Scheduler.h"

class EventScheduler;
class Event;
class Scheduler;

class Controller
{
protected:
    int currentComponentIndex = 0;
    bool verbose = false;

public:
    Scheduler *scheduler;
    EventScheduler *
        eventScheduler;
    Controller();
    virtual void setup() = 0;
    virtual void loop() = 0;

    void schedule();

    void triggerEvent(Event *event);
    void print(String logText);
    void println(String logText);
    void enableVerbose();
    void disableVerbose();
};

#endif