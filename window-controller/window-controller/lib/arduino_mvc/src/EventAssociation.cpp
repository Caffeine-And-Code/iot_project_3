#include "EventAssociation.h"

EventAssociation::EventAssociation(short eventID, Listener *listener)
{
    this->eventID = eventID;
    this->listener = listener;
}