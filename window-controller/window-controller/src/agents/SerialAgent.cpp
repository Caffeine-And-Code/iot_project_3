#include "SerialAgent.h"
#include "config/Config.h"

void SerialAgent::updateState(AppController *controller)
{
    if (Serial.available() > 0)
    {
        String receivedData = Serial.readString();
        receivedData.trim();
        if (receivedData.startsWith("T"))
        {
            controller->temperature = receivedData.substring(1).toInt();
        }
        else if (receivedData.startsWith("P") && controller->stateMachineTask->getCurrentState() == Automatic)
        {
            controller->openPercentage = receivedData.substring(1).toInt();
        }
    }
}

void SerialAgent::changeMode(int mode)
{
    Serial.println("M" + String(mode));
}

void SerialAgent::updatePercentage(int mode)
{
    Serial.println("P" + String(mode));
}