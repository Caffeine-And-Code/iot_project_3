#include "Controller.h"
#include "Arduino.h"

class Scheduler;

Controller::Controller()
{
    this->eventScheduler = new EventScheduler(this);
    this->scheduler = new Scheduler();
}

void Controller::schedule()
{
    this->scheduler->schedule();
}

void Controller::triggerEvent(Event *event)
{
    this->eventScheduler->schedule(event);
}

void Controller::print(String logWrite)
{
    if (verbose)
    {
        Serial.print(logWrite);
    }
}

void Controller::println(String logWrite)
{
    if (verbose)
    {
        Serial.println(logWrite);
    }
}

void Controller::enableVerbose()
{
    verbose = true;
}
void Controller::disableVerbose()
{
    verbose = false;
}