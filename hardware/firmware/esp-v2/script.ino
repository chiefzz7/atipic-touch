#include <Arduino.h>

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// ========================================
// Identificação do dispositivo
// ========================================

#define DEVICE_NAME "AtipicTouch-ESP32"

// ========================================
// BLE
// ========================================

#define SERVICE_UUID \
  "7a8f0001-4a54-4b00-8000-000000000001"

#define CHARACTERISTIC_UUID \
  "7a8f0002-4a54-4b00-8000-000000000002"

// ========================================
// GPIO dos botões
// ========================================

#define BOTAO_VERMELHO 23
#define BOTAO_VERDE    22
#define BOTAO_LARANJA  21
#define BOTAO_AZUL     19

// ========================================
// Estado dos botões
// ========================================

bool estadoAnteriorVermelho = HIGH;
bool estadoAnteriorVerde = HIGH;
bool estadoAnteriorLaranja = HIGH;
bool estadoAnteriorAzul = HIGH;

// ========================================
// BLE
// ========================================

BLEServer *bleServer = nullptr;
BLECharacteristic *eventCharacteristic = nullptr;

bool dispositivoConectado = false;
bool dispositivoConectadoAnterior = false;

// ========================================
// Callbacks do servidor BLE
// ========================================

class ServerCallbacks : public BLEServerCallbacks {

  void onConnect(BLEServer *server) override {
    dispositivoConectado = true;

    Serial.println("BLE conectado.");
  }

  void onDisconnect(BLEServer *server) override {
    dispositivoConectado = false;

    Serial.println("BLE desconectado.");

    // Permite que o celular encontre novamente o ESP32.
    server->startAdvertising();
  }
};

// ========================================
// Envio de evento
// ========================================

void enviarEvento(const char *botao, int value) {

  String json = "{";

  json += "\"botao\":\"";
  json += botao;
  json += "\",";
  json += "\"value\":";
  json += value;
  json += "}";

  // Mostra no monitor USB
  Serial.println(json);

  // Só envia BLE se existir um dispositivo conectado
  if (!dispositivoConectado || eventCharacteristic == nullptr) {
    return;
  }

  eventCharacteristic->setValue(json.c_str());
  eventCharacteristic->notify();

  Serial.println("Evento enviado via BLE.");
}

// ========================================
// Setup
// ========================================

void setup() {

  Serial.begin(115200);

  Serial.println();
  Serial.println("========================================");
  Serial.println("AtipicTouch - ESP32 BLE");
  Serial.println("========================================");

  // ======================================
  // Configuração dos botões
  // ======================================

  pinMode(BOTAO_VERMELHO, INPUT_PULLUP);
  pinMode(BOTAO_VERDE, INPUT_PULLUP);
  pinMode(BOTAO_LARANJA, INPUT_PULLUP);
  pinMode(BOTAO_AZUL, INPUT_PULLUP);

  // ======================================
  // Inicialização BLE
  // ======================================

  BLEDevice::init(DEVICE_NAME);

  bleServer = BLEDevice::createServer();

  bleServer->setCallbacks(new ServerCallbacks());

  BLEService *service =
    bleServer->createService(SERVICE_UUID);

  eventCharacteristic =
    service->createCharacteristic(
      CHARACTERISTIC_UUID,
      BLECharacteristic::PROPERTY_READ |
      BLECharacteristic::PROPERTY_NOTIFY
    );

  eventCharacteristic->addDescriptor(
    new BLE2902()
  );

  eventCharacteristic->setValue(
    "{\"status\":\"ready\"}"
  );

  service->start();

  // ======================================
  // Advertising
  // ======================================

  BLEAdvertising *advertising =
    BLEDevice::getAdvertising();

  advertising->addServiceUUID(SERVICE_UUID);

  advertising->setScanResponse(true);

  advertising->setMinPreferred(0x06);
  advertising->setMaxPreferred(0x12);

  BLEDevice::startAdvertising();

  Serial.println("BLE iniciado.");
  Serial.println("Nome: AtipicTouch-ESP32");
  Serial.println("Aguardando conexao...");
}

// ========================================
// Loop
// ========================================

void loop() {

  // ======================================
  // VERMELHO - REJEITOU
  // GPIO 23
  // ======================================

  bool estadoVermelho =
    digitalRead(BOTAO_VERMELHO);

  if (
    estadoVermelho == LOW &&
    estadoAnteriorVermelho == HIGH
  ) {

    enviarEvento("rejeitou", 2);

    delay(50);
  }

  estadoAnteriorVermelho =
    estadoVermelho;

  // ======================================
  // VERDE - ACEITOU
  // GPIO 22
  // ======================================

  bool estadoVerde =
    digitalRead(BOTAO_VERDE);

  if (
    estadoVerde == LOW &&
    estadoAnteriorVerde == HIGH
  ) {

    enviarEvento("aceitou", 1);

    delay(50);
  }

  estadoAnteriorVerde =
    estadoVerde;

  // ======================================
  // LARANJA - NEUTRO
  // GPIO 21
  // ======================================

  bool estadoLaranja =
    digitalRead(BOTAO_LARANJA);

  if (
    estadoLaranja == LOW &&
    estadoAnteriorLaranja == HIGH
  ) {

    enviarEvento("neutro", 3);

    delay(50);
  }

  estadoAnteriorLaranja =
    estadoLaranja;

  // ======================================
  // AZUL - AÇÃO / FEEDBACK FUTURO
  // GPIO 19
  // ======================================

  bool estadoAzul =
    digitalRead(BOTAO_AZUL);

  if (
    estadoAzul == LOW &&
    estadoAnteriorAzul == HIGH
  ) {

    enviarEvento("acao", 0);

    delay(50);
  }

  estadoAnteriorAzul =
    estadoAzul;
}
