#ifndef __APP_CONTROLLER__
#define __APP_CONTROLLER__

#include <Arduino.h>
#include "Controller.h"
#include "enums/States.h"
#include "Led.h"
#include "config/Config.h"
#include "toolbox_extended/UserLCD.h"
#include "components/timer/Timer.h"
#include "agents/SerialAgent.h"
#include "Button.h"
#include "components/timer/Timer.h"
#include "sensors/Temperature.h"
#include "tasks/StateMachineTask.h"
#include "tasks/SerialTask.h"
#include "toolbox_extended/Window.h"
#include "sensors/Potentiometer.h"
#include "Button.h"

class SerialAgent;
class StateMachineTask;
class SerialTask;

class AppController : public Controller
{

public:
    Button *switchButton;
    SerialAgent *serial;
    Window *window;
    Potentiometer *potentiometer;
    StateMachineTask *stateMachineTask;
    SerialTask *serialTask;
    UserLCD *userLCD;

    int temperature = 0;
    int openPercentage = 0;

    void
    setup() override;
    void loop() override;
};

extern AppController controller;
#endif