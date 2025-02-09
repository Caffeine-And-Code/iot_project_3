#ifndef __EVENT__
#define __EVENT__
#include "Arduino.h"

class Event
{
protected:
public:
    virtual short getEventID()
    {
        return 0;
    }
    bool isEvent(short id);
    virtual ~Event() {}
};

#endif