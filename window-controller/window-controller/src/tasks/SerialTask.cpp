#include "SerialTask.h"

SerialTask::SerialTask(AppController *controller) : controller(controller) {}

void SerialTask::tick()
{
    auto appController = static_cast<AppController *>(this->controller);

    appController->serial->updateState(appController);
    appController->serial->changeMode(appController->stateMachineTask->getCurrentState());
}

void SerialTask::reset()
{
}