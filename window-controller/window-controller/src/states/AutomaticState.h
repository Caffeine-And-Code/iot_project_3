#ifndef __AVAILABLE_STATE__
#define __AVAILABLE_STATE__
#include "components/StateMachine/State.h"
#include "AppController.h"

class AutomaticState : public State
{
private:
    AppController *controller;
    int lastPercentage = 0;

public:
    AutomaticState(AppController *controller) : controller(controller)
    {
    }
    void run() override
    {
        if (controller->switchButton->isPressed())
        {
            controller->stateMachineTask->changeState(Manual);
            return;
        }
        auto openPercentage = controller->openPercentage;
        if (openPercentage != lastPercentage)
        {

            controller->userLCD->printAutomaticInfo(openPercentage);
            lastPercentage = openPercentage;
        }
        controller->window->open(openPercentage);
    }
};

#endif