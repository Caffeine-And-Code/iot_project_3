#include <Arduino.h>
// #define DEBUG
#ifndef DEBUG
#include "AppController.h"
#else
#include "TestController.h"
#endif
#include "config/Config.h"

extern int __heap_start, *__brkval;
int freeMemory()
{
    int v;
    return (int)&v - (__brkval == 0 ? (int)&__heap_start : (int)__brkval);
}

void setup()
{
    Serial.begin(BAUDRATE);
    controller.setup();
}

void loop()
{
    controller.loop();
    // Serial.print("Free Memory: ");
    // Serial.print(freeMemory());
    // Serial.println(" bytes");
}