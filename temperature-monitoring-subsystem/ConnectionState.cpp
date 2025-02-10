#include "ConnectionState.h"

ConnectionState::ConnectionState(Led* green, Led* red) {
    this->green = green;
    this->red = red;
    this->trigger(UNKNOWN);
}

bool ConnectionState::isConnected() {
    return this->state == CONNECTION_OK;
}

void ConnectionState::trigger(State state) {
    if (this->state != state || state == UNKNOWN) {
        this->state = state;
        switch (this->state)
        {
            case CONNECTION_OK:
                green->on();
                red->off();
                break;
            
            default:
                green->off();
                red->on();
                break;
        }
      }
}