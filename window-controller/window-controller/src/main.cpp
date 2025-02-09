#include <Arduino.h>
// #define DEBUG
#ifndef DEBUG
#include "AppController.h"
#else
#include "TestController.h"
#endif
#include "config/Config.h"

void setup()
{
    Serial.begin(BAUDRATE);
    controller.setup();
}

void loop()
{
    controller.loop();
}