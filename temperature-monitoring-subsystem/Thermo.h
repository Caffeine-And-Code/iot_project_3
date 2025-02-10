#ifndef THERMO_H
#define THERMO_H

class Thermo {
public:
    Thermo(int pin);
    float readTemperature();

private:
    int pin;
};

#endif