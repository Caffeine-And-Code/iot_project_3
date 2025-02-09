#ifndef __CHANGE_STATE_EVENT__
#define __CHANGE_STATE_EVENT__

#include "Event.h"

class ChangeStateEvent : public Event
{
protected:
    int lastState;
    int newState;

public:
    static const short EventID = 1;
    ChangeStateEvent(int lastState, int newState);

    short getEventID() override
    {
        return this->EventID;
    }
    int getLastState();
    int getNewState();
};

#endif