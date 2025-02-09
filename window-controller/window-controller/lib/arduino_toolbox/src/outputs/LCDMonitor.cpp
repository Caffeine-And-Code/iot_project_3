#include "LCDMonitor.h"
#include "Arduino.h"

LCDMonitor::LCDMonitor(uint8_t lcdAddr, unsigned short rows, unsigned short columns)
{
    this->rows = rows;
    this->columns = columns;
    this->monitor = new LiquidCrystal_I2C(lcdAddr, columns, rows);
    this->monitor->init();
    this->monitor->backlight();
}

void LCDMonitor::print(unsigned short row, unsigned short col, String chars, bool withClean = false)
{
    for (unsigned short i = 0; i < col && withClean; i++)
    {
        this->monitor->setCursor(i, row);
        this->monitor->print(" ");
    }
    this->monitor->setCursor(col, row);
    this->monitor->print(chars);
    unsigned short length = chars.length();
    for (unsigned short i = col + length; i < this->columns && withClean; i++)
    {
        this->monitor->setCursor(i, row);
        this->monitor->print(" ");
    }
}

void LCDMonitor::clean()
{
    for (unsigned short i = 0; i < this->rows; i++)
    {
        this->print(i, 0, "", true);
    }
}

void LCDMonitor::printSlideShow(String toPrint, unsigned short row, unsigned short endCol, int animationDelay = 150)
{
    auto strLen = toPrint.length();
    for (unsigned short i = 0; i < strLen; i++)
    {
        for (unsigned short j = 0; j <= endCol - i; j++)
        {
            int prev = j - 1 > 0 ? j - 1 : 0;
            this->monitor->setCursor(prev, row);
            this->monitor->print(" ");
            this->monitor->setCursor(j, row);
            this->monitor->print(toPrint.charAt(strLen - 1 - i));
            delay(animationDelay);
        }
    }
}

void LCDMonitor::printCentered(String toPrint, unsigned short row)
{
    unsigned short len = toPrint.length();
    unsigned short start = (this->columns - len) / 2;
    this->print(row, start, toPrint, true);
}