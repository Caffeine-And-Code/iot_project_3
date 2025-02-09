#ifndef __STATE_MACHINE__
#define __STATE_MACHINE__
#define MAX_STATES 30
#include "Task.h"
#include "ChangeStateEvent.h"
#include "Controller.h"
#include "components/timer/Timer.h"
#include "components/StateMachine/State.h"

class StateMachine : public Task
{
protected:
    int currentState;
    int states[MAX_STATES];
    State *stateCallbacks[MAX_STATES];
    int currentStateIndex = 0;
    unsigned long currentStateIterations = 0;
    Controller *controller;

public:
    StateMachine(Controller *controller);

    void addState(int stateId, State *state);

    void changeState(int stateId);
    int getCurrentState();
    unsigned long getCurrentStateIterationAmount();

    void tick() override;
};

#endif