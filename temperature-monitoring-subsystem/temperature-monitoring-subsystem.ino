#include "connectionState.h"

#define GREEN_PIN 4
#define RED_PIN 5
#define TEMP_PIN 8

ConnectionState state;

void setup() {
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(RED_PIN, OUTPUT);
  pinMode(TEMP_PIN, INPUT);
}

void loop() {

  //TODO:
  /**
   * - Invio di messaggi su mqtt
   * - visualizzare temperature su .js
   * - inviare la frequenza
   * - non inviare dati finchè non arriva la prima frequenza
   */
  
  //digitalWrite(GREEN_PIN, HIGH);

  // Stampa il valore sulla seriale
  Serial.print("Temperatura: ");
  Serial.print(analogToTemp(analogRead(TEMP_PIN)));
  Serial.println(" C");

  delay(1000);
}

float analogToTemp(int sensorValue) {
  return (sensorValue * (3.3 / 4095.0)) * 100.0;
}