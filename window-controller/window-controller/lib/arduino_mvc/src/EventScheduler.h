#ifndef __EVENT_SCHEDULER__
#define __EVENT_SCHEDULER__
#define MAX_SCHEDULER 30
#define MAX_EVENTS 30
#include "Controller.h"
#include "EventAssociation.h"
#include "Listener.h"
class Controller;
class EventAssociation;
class Listener;
class EventScheduler
{
private:
    EventAssociation *scheduler[MAX_SCHEDULER];
    Controller *controller;
    unsigned short currentIndex = 0;
    Event *eventQueue[MAX_EVENTS];
    unsigned short currentQueueIndex = 0;

public:
    EventScheduler(Controller *controller);
    void addSchedule(short eventID, Listener *listener);
    void schedule(Event *event);
    bool hasEventToTrigger();
    void trigger();
};

#endif