#include "SerialTask.h"

SerialTask::SerialTask(AppController *controller) : controller(controller) {}

void SerialTask::tick()
{
    auto appController = static_cast<AppController *>(this->controller);
    appController->serial->updateState(appController);
}

void SerialTask::reset()
{
}