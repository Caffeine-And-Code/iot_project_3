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
        auto openPercentage = controller->openPercentage;
        if (openPercentage != lastPercentage)
        {
            controller->println("new Percentage: " + String(openPercentage));
            controller->window->open(openPercentage);
            controller->userLCD->printAutomaticInfo(openPercentage);
            lastPercentage = openPercentage;
        }

        if (controller->switchButton->isPressed())
        {
            controller->stateMachineTask->changeState(Manual);
        }
    }
};

#endif