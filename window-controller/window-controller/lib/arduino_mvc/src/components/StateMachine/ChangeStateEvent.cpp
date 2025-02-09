#include "ChangeStateEvent.h"

ChangeStateEvent::ChangeStateEvent(int lastState, int newState) : lastState(lastState),
                                                                  newState(newState) {}


int ChangeStateEvent::getLastState()
{
    return this->lastState;
}
int ChangeStateEvent::getNewState()
{
    return this->newState;
}