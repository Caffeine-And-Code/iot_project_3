#ifndef __TEST_CONTROLLER__
#define __TEST_CONTROLLER__
#include "Controller.h"
#include "Led.h"
#include "Button.h"
#include "sensors/PIR.h"
#include "outputs/LCDMonitor.h"
#include "config/Config.h"
#include "sensors/Temperature.h"
#include "sensors/UltrasoundProximity.h"
#include "outputs/ServoMotor.h"

class TestController : Controller
{
public:
    void setup();
    void loop();
};
extern TestController controller;
#endif