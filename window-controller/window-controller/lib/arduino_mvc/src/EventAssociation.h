#ifndef __EVENT_ASSOCIATION__
#define __EVENT_ASSOCIATION__
#include "Event.h"
#include "Listener.h"
class Listener;

class EventAssociation
{
public:
    short eventID;
    Listener *listener;
    EventAssociation(short eventID, Listener *listener);
};

#endif