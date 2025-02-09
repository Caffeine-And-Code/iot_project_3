#include "StateMachineTask.h"
#include "enums/States.h"
#include "states/AutomaticState.h"
#include "states/ManualState.h"

StateMachineTask::StateMachineTask(AppController *controller) : StateMachine(controller)
{
    this->addState(Automatic, new AutomaticState(controller));
    this->addState(Manual, new ManualState(controller));
}