#ifndef __USER_LCD__
#define __USER_LCD__
#include "outputs/LCDMonitor.h"

class UserLCD : public LCDMonitor
{
public:
    UserLCD() : LCDMonitor(0x27, 4, 20) {}

    void printAutomaticInfo(int openLevelPercentage)
    {
        this->printCentered("OPEN LEVEL " + String(openLevelPercentage) + "%", 1);
        this->printCentered("MODE: AUTOMATIC", 2);
        this->printCentered(" ", 3);
    }

    void printManualInfo(int openLevelPercentage, int temperature)
    {
        this->printCentered("OPEN LEVEL: " + String(openLevelPercentage) + "%", 1);
        this->printCentered("MODE: MANUAL", 2);
        this->printCentered("TEMPERATURE: " + String(temperature) + "C", 3);
    }
};

#endif