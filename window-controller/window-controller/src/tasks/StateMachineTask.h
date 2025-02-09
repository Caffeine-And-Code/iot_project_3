#ifndef __STATE_MACHINE_TASK__
#define __STATE_MACHINE_TASK__

#include "components/StateMachine/StateMachine.h"
#include "AppController.h"

class AppController;

class StateMachineTask : public StateMachine
{
public:
    StateMachineTask(AppController *controller);
};

#endif