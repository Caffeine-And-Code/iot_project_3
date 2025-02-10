#ifndef __CHANGE_STATE_LISTENER__
#define __CHANGE_STATE_LISTENER__
#include "Listener.h"
#include "components/StateMachine/ChangeStateEvent.h"
#include "components/timer/Timer.h"
#include "AppController.h"
#include "Event.h"
#include "Controller.h"
#include "enums/States.h"

class ChangeStateListener : public Listener
{
public:
    void execute(Event *event, Controller *controller)
    {
        auto *changeStateEvent = static_cast<ChangeStateEvent *>(event);
        auto *appController = static_cast<AppController *>(controller);

        if (changeStateEvent->getNewState() == Automatic)
        {
            appController->serial->changeMode(Automatic);
            appController->userLCD->printAutomaticInfo(appController->openPercentage);
        }
        else
        {
            appController->serial->changeMode(Manual);
            appController->userLCD->printManualInfo(appController->openPercentage, appController->temperature);
        }
    }
};

#endif