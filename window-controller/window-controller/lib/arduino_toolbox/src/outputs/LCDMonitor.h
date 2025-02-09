#ifndef __LCD_MONITOR__
#define __LCD_MONITOR__

#include "LiquidCrystal_I2C.h"

class LCDMonitor
{
private:
    unsigned short rows = 0;
    unsigned short columns = 0;

public:
    LiquidCrystal_I2C *monitor;
    LCDMonitor(uint8_t lcdAddr, unsigned short rows, unsigned short columns);
    void print(unsigned short row, unsigned short col, String chars, bool withClean = false);
    void clean();
    void printSlideShow(String toPrint, unsigned short row, unsigned short endCol, int animationDelay = 150);
    void printCentered(String toPrint, unsigned short row);
};

#endif