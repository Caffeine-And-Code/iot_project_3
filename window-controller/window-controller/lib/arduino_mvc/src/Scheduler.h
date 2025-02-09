#ifndef __SCHEDULER__
#define __SCHEDULER__

#include "Task.h"
#include "components/timer/Timer.h"
#define MAX_TASKS 30

class Timer;

class Scheduler
{

    int basePeriod;
    int nTasks;
    Task *taskList[MAX_TASKS];
    Timer *timer;

public:
    void init(int basePeriod);
    virtual bool addTask(Task *task);
    virtual void schedule();
};

#endif