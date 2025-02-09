#include "Event.h"

bool Event::isEvent(short id)
{
    return this->getEventID() == id;
}