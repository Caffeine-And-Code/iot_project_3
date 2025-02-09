#include "Scheduler.h"
#include <TimerOne.h>

volatile bool timerFlag;

void timerHandler(void)
{
    timerFlag = true;
}

void Scheduler::init(int basePeriod)
{
    this->basePeriod = basePeriod;
    timerFlag = false;
    long period = 1000l * basePeriod;
    timer = new Timer();
    timer->init(basePeriod, true);
    nTasks = 0;
}

bool Scheduler::addTask(Task *task)
{
    if (nTasks < MAX_TASKS - 1)
    {
        taskList[nTasks] = task;
        nTasks++;
        return true;
    }
    else
    {
        return false;
    }
}

void Scheduler::schedule()
{
    if (this->timer->runUpdateAndCheckTrigger())
    {
        for (int i = 0; i < nTasks; i++)
        {
            if (taskList[i]->isActive() && taskList[i]->updateAndCheckTime(basePeriod))
            {
                taskList[i]->tick();
            }
        }
    }
}