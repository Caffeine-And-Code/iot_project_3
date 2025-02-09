#include "EventScheduler.h"

EventScheduler::EventScheduler(Controller *controller)
{
    this->controller = controller;
    for (int i = 0; i < MAX_EVENTS; i++)
    {
        this->eventQueue[i] = nullptr;
    }
}
void EventScheduler::addSchedule(short eventID, Listener *listener)
{
    if (currentIndex < MAX_SCHEDULER)
    {
        EventAssociation *association = new EventAssociation(eventID, listener);
        this->scheduler[currentIndex++] = association;
    }
}

void EventScheduler::schedule(Event *event)
{
    if (this->currentQueueIndex + 1 < MAX_EVENTS)
    {
        this->eventQueue[this->currentQueueIndex] = event;
        this->currentQueueIndex += 1;
    }
}

bool EventScheduler::hasEventToTrigger()
{
    return this->currentQueueIndex > 0;
}

void EventScheduler::trigger()
{
    while (this->currentQueueIndex > 0)
    {
        this->currentQueueIndex--;
        Event *event = this->eventQueue[this->currentQueueIndex];
        if (event != nullptr)
        {
            for (unsigned short i = 0; i < currentIndex; i++)
            {
                if (event->isEvent(this->scheduler[i]->eventID))
                {
                    this->scheduler[i]->listener->execute(event, this->controller);
                }
            }
            delete event;
            event = nullptr;
        }
    }
}