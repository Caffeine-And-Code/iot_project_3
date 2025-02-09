#ifndef __SERIAL_TASK__
#define __SERIAL_TASK__

#include "Task.h"
#include "AppController.h"

class AppController;

class SerialTask : public Task
{
private:
    AppController *controller;

public:
    SerialTask(AppController *controller);
    void tick() override;
    void reset();
};

#endif
