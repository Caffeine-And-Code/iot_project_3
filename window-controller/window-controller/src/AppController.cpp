#include "AppController.h"
#include "Arduino.h"
#include "listeners/ChangeStateListener.h"
#include <avr/sleep.h>

AppController controller;

void AppController::setup()
{
    this->enableVerbose();

    switchButton = new Button(BUTTON_PIN);
    serial = new SerialAgent();
    potentiometer = new Potentiometer(POT_PIN);
    userLCD = new UserLCD();

    this->eventScheduler->addSchedule(ChangeStateEvent::EventID, new ChangeStateListener());

    stateMachineTask = new StateMachineTask(this);
    stateMachineTask->init(100);
    serialTask = new SerialTask(this);
    serialTask->init(100);

    this->stateMachineTask->changeState(Automatic);

    this->scheduler->init(100);
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

    controller.println("Temperature: " + String(temperature));
    controller.println("Open Percentage: " + String(openPercentage));
    delay(2000);
}