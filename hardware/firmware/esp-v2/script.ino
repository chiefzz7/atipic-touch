#include "BluetoothSerial.h"

BluetoothSerial SerialBT;

// Definição dos botões
#define BOTAO_VERMELHO 23
#define BOTAO_VERDE    22
#define BOTAO_LARANJA  21
#define BOTAO_AZUL     19

// Controle para detectar apenas o clique
bool estadoAnteriorVermelho = HIGH;
bool estadoAnteriorVerde    = HIGH;
bool estadoAnteriorLaranja  = HIGH;
bool estadoAnteriorAzul     = HIGH;

void enviarJSON(const char* botao, int value) {
  String json = "{";
  json += "\"botao\":\"";
  json += botao;
  json += "\",";
  json += "\"value\":";
  json += value;
  json += "}";

  SerialBT.println(json);

  // Também mostra no Serial Monitor USB
  Serial.println(json);
}

void setup() {
  Serial.begin(115200);

  // Configuração dos botões
  pinMode(BOTAO_VERMELHO, INPUT_PULLUP);
  pinMode(BOTAO_VERDE, INPUT_PULLUP);
  pinMode(BOTAO_LARANJA, INPUT_PULLUP);
  pinMode(BOTAO_AZUL, INPUT_PULLUP);

  // Inicializa Bluetooth
  SerialBT.begin("AtipicTouch-ESP32");

  Serial.println("================================");
  Serial.println("AtipicTouch - ESP32 Bluetooth");
  Serial.println("Bluetooth: AtipicTouch-ESP32");
  Serial.println("================================");
}

void loop() {

  // =========================
  // BOTÃO VERMELHO
  // GPIO 23
  // =========================

  bool estadoVermelho = digitalRead(BOTAO_VERMELHO);

  if (estadoVermelho == LOW && estadoAnteriorVermelho == HIGH) {
    enviarJSON("rejeitou", 2);
    delay(50); // debounce
  }

  estadoAnteriorVermelho = estadoVermelho;


  // =========================
  // BOTÃO VERDE
  // GPIO 22
  // =========================

  bool estadoVerde = digitalRead(BOTAO_VERDE);

  if (estadoVerde == LOW && estadoAnteriorVerde == HIGH) {
    enviarJSON("aceitou", 1);
    delay(50);
  }

  estadoAnteriorVerde = estadoVerde;


  // =========================
  // BOTÃO LARANJA
  // GPIO 21
  // =========================

  bool estadoLaranja = digitalRead(BOTAO_LARANJA);

  if (estadoLaranja == LOW && estadoAnteriorLaranja == HIGH) {
    enviarJSON("neutro", 3);
    delay(50);
  }

  estadoAnteriorLaranja = estadoLaranja;


  // =========================
  // BOTÃO AZUL
  // GPIO 19
  // =========================

  bool estadoAzul = digitalRead(BOTAO_AZUL);

  if (estadoAzul == LOW && estadoAnteriorAzul == HIGH) {
    enviarJSON("acao", 0);
    delay(50);
  }

  estadoAnteriorAzul = estadoAzul;
}
