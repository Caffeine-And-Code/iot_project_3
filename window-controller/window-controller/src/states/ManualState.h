#ifndef __DOOR_OPEN_STATE__
#define __DOOR_OPEN_STATE__
#include "components/StateMachine/State.h"
#include "AppController.h"

class ManualState : public State
{
private:
    AppController *controller;
    int lastTemperature = 0;
    int lastOpenPercentage = 0;

public:
    ManualState(AppController *controller) : controller(controller)
    {
    }
    void run() override
    {
        if (controller->switchButton->isPressed())
        {
            controller->stateMachineTask->changeState(Automatic);
            return;
        }
        auto temperature = controller->temperature;
        bool temperatureChange = lastTemperature != temperature;
        bool openPercentageChange = false;

        if (controller->potentiometer->hasChanged())
        {
            controller->println(String(controller->potentiometer->getValue()));
            auto percentage = Potentiometer::toPercentage(controller->potentiometer->getValue());
            if (percentage != controller->openPercentage)
            {
                controller->openPercentage = percentage;
                controller->window->open(controller->openPercentage);
                controller->serial->updatePercentage(controller->openPercentage);
                openPercentageChange = true;
            }
        }

        if (openPercentageChange || temperatureChange)
        {
            controller->userLCD->printManualInfo(controller->openPercentage, temperature);
        }
        controller->window->open(controller->openPercentage);
    }
};

#endif