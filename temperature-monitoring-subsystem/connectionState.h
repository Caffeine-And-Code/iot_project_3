#ifndef CONNECTION_STATE_H
#define CONNECTION_STATE_H

#include "Led.h"

class ConnectionState {
    public:
        enum State {
            CONNECTION_OK,
            CONNECTION_ERROR,
            UNKNOWN
        };

        ConnectionState(Led* green, Led* red);
        void trigger(State state);
        bool isConnected();
    private:
        State state;
        Led* green;
        Led* red;
    };

#endif
    