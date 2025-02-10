#ifndef ESP_CONTROLLER_H
#define ESP_CONTROLLER_H

#include "ConnectionState.h"
#include "CommunicationAgent.h"
#include <esp32-hal.h>
#include "Configuration.h"
#include "Led.h"
#include "Thermo.h"

class EspController {
public:
    EspController();
    void start();
    void loop();
};

#endif