// Definizione dei pin per i LED
#define LED1_PIN 4
#define LED2_PIN 5

// Definizione del pin per il LM35 (termometro analogico) su ESP
#define LM35_PIN 8

void setup() {
  // Inizializzazione della comunicazione seriale
  Serial.begin(115200);
  delay(2000); // Attendi 2 secondi per permettere al monitor seriale di connettersi

  // Messaggio di debug per verificare l'avvio della seriale
  Serial.println("Serial communication started");

  // Configura i pin dei LED come uscite
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);

  // Configura il pin del LM35 come ingresso
  pinMode(LM35_PIN, INPUT);
}

void loop() {
  // Alterna l'accensione dei LED
  digitalWrite(LED1_PIN, HIGH);
  digitalWrite(LED2_PIN, LOW);
  delay(500);

  digitalWrite(LED1_PIN, LOW);
  digitalWrite(LED2_PIN, HIGH);
  delay(500);

  // Legge il valore analogico dal LM35
  int sensorValue = analogRead(LM35_PIN);

  // Su un ESP, analogRead restituisce un valore da 0 a 4095
  // e la tensione di riferimento è 3.3V
  float voltage = sensorValue * (3.3 / 4095.0);

  // LM35 fornisce 10 mV per °C, dunque:
  // 1 V corrisponde a 100 °C, perciò moltiplichiamo la tensione per 100
  float temperatureC = voltage * 100.0;

  // Stampa il valore sulla seriale
  Serial.print("Temperatura: ");
  Serial.print(temperatureC);
  Serial.println(" C");
}