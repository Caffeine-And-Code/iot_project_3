#ifndef __SERIAL_AGENT__
#define __SERIAL_AGENT__
#include "Arduino.h"
#include "AppController.h"

class AppController;

class SerialAgent
{
public:
    void updateState(AppController *controller);
    void changeMode(int mode);
    void updatePercentage(int percentage);
};

#endif