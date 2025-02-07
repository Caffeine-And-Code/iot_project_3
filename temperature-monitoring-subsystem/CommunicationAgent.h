#ifndef COMMUNICATION_AGENT_H
#define COMMUNICATION_AGENT_H

class CommunicationAgent {
public:
    CommunicationAgent(const char* ssid, const char* password, const char* mqtt_server, const char* topic);

    bool setupConnection();

    bool loop();

    bool handleConnectionError();

    void sendTemperature(float temperature);

    virtual ~CommunicationAgent() {}
};

#endif