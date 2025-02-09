#ifndef __MINE_LISTENER__
#define __MINE_LISTENER__

#include "Controller.h"
#include "Event.h"

class Controller;

class Listener
{
public:
    virtual void execute(Event *event, Controller *controller) = 0;
};

#endif