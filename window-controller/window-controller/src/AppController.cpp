#include "AppController.h"
#include "Arduino.h"
#include "listeners/ChangeStateListener.h"
#include <avr/sleep.h>

AppController controller;

void AppController::setup()
{
    this->disableVerbose();

    switchButton = new Button(BUTTON_PIN);
    serial = new SerialAgent();
    potentiometer = new Potentiometer(POT_PIN);
    userLCD = new UserLCD();
    window = new Window(WINDOW_PIN);

    this->eventScheduler->addSchedule(ChangeStateEvent::EventID, new ChangeStateListener());

    stateMachineTask = new StateMachineTask(this);
    stateMachineTask->init(200);
    serialTask = new SerialTask(this);
    serialTask->init(1000);

    this->stateMachineTask->changeState(Automatic);

    this->scheduler->init(200);
    this->scheduler->addTask(serialTask);
    this->scheduler->addTask(stateMachineTask);
}

void AppController::loop()
{
    if (this->eventScheduler->hasEventToTrigger())
    {
        this->eventScheduler->trigger();
    }
    else
    {
        this->scheduler->schedule();
    }
}