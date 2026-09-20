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

BLECharacteristic *eventCharacteristic =
  nullptr;

bool dispositivoConectado = false;

// ========================================
// Callbacks do servidor BLE
// ========================================

class ServerCallbacks :
  public BLEServerCallbacks {

  void onConnect(
    BLEServer *server
  ) override {

    dispositivoConectado = true;

    Serial.println();

    Serial.println(
      "========================================"
    );

    Serial.println(
      "Celular conectado ao ESP32."
    );

    Serial.println(
      "========================================"
    );
  }

  void onDisconnect(
    BLEServer *server
  ) override {

    dispositivoConectado = false;

    Serial.println();

    Serial.println(
      "========================================"
    );

    Serial.println(
      "Celular desconectado do ESP32."
    );

    Serial.println(
      "Reiniciando advertising..."
    );

    Serial.println(
      "========================================"
    );

    delay(300);

    server->startAdvertising();
  }
};

// ========================================
// Envio BLE fragmentado
// ========================================

void enviarMensagemBLE(
  const String &mensagem
) {

  if (
    !dispositivoConectado ||
    eventCharacteristic == nullptr
  ) {
    return;
  }

  /*
   * O MTU padrão BLE é 23.
   *
   * 23 - 3 bytes de cabeçalho ATT =
   * aproximadamente 20 bytes úteis.
   *
   * Por isso enviamos em blocos de 20.
   */
  const size_t TAMANHO_PACOTE = 20;

  /*
   * O \n é utilizado pelo aplicativo
   * para identificar o final do JSON.
   */
  String payload =
    mensagem + "\n";

  for (
    size_t inicio = 0;
    inicio < payload.length();
    inicio += TAMANHO_PACOTE
  ) {

    size_t fim =
      inicio +
      TAMANHO_PACOTE;

    if (
      fim >
      payload.length()
    ) {

      fim =
        payload.length();
    }

    String pacote =
      payload.substring(
        inicio,
        fim
      );

    eventCharacteristic
      ->setValue(
        (uint8_t *)
          pacote.c_str(),
        pacote.length()
      );

    eventCharacteristic
      ->notify();

    /*
     * Pequeno intervalo para evitar
     * perda de notificações.
     */
    delay(15);
  }
}

// ========================================
// Envio de evento
// ========================================

void enviarEvento(
  const char *botao,
  int value
) {

  String json = "{";

  json += "\"botao\":\"";
  json += botao;
  json += "\",";

  json += "\"value\":";
  json += value;

  json += "}";

  // ======================================
  // Monitor serial
  // ======================================

  Serial.print(
    "Evento: "
  );

  Serial.println(
    json
  );

  // ======================================
  // Verificar conexão
  // ======================================

  if (
    !dispositivoConectado
  ) {

    Serial.println(
      "Evento nao enviado: nenhum celular conectado."
    );

    return;
  }

  // ======================================
  // Enviar BLE
  // ======================================

  enviarMensagemBLE(
    json
  );

  Serial.println(
    "Evento enviado via BLE."
  );
}

// ========================================
// Setup
// ========================================

void setup() {

  Serial.begin(
    115200
  );

  delay(500);

  Serial.println();

  Serial.println(
    "========================================"
  );

  Serial.println(
    "AtipicTouch - ESP32 BLE"
  );

  Serial.println(
    "========================================"
  );

  // ======================================
  // Configuração dos botões
  // ======================================

  pinMode(
    BOTAO_VERMELHO,
    INPUT_PULLUP
  );

  pinMode(
    BOTAO_VERDE,
    INPUT_PULLUP
  );

  pinMode(
    BOTAO_LARANJA,
    INPUT_PULLUP
  );

  pinMode(
    BOTAO_AZUL,
    INPUT_PULLUP
  );

  // ======================================
  // Inicialização BLE
  // ======================================

  BLEDevice::init(
    DEVICE_NAME
  );

  bleServer =
    BLEDevice::createServer();

  bleServer->setCallbacks(
    new ServerCallbacks()
  );

  BLEService *service =
    bleServer->createService(
      SERVICE_UUID
    );

  // ======================================
  // Característica de eventos
  // ======================================

  eventCharacteristic =
    service->createCharacteristic(
      CHARACTERISTIC_UUID,

      BLECharacteristic::PROPERTY_READ |
      BLECharacteristic::PROPERTY_NOTIFY
    );

  /*
   * Necessário para notificações BLE.
   */
  eventCharacteristic
    ->addDescriptor(
      new BLE2902()
    );

  /*
   * Valor inicial da característica.
   */
  eventCharacteristic
    ->setValue(
      "{\"status\":\"ready\"}"
    );

  // ======================================
  // Iniciar serviço
  // ======================================

  service->start();

  // ======================================
  // Advertising
  // ======================================

  BLEAdvertising *advertising =
    BLEDevice::getAdvertising();

  advertising
    ->addServiceUUID(
      SERVICE_UUID
    );

  advertising
    ->setScanResponse(
      true
    );

  advertising
    ->setMinPreferred(
      0x06
    );

  advertising
    ->setMaxPreferred(
      0x12
    );

  BLEDevice
    ::startAdvertising();

  // ======================================
  // Informações
  // ======================================

  Serial.println(
    "BLE iniciado."
  );

  Serial.print(
    "Nome: "
  );

  Serial.println(
    DEVICE_NAME
  );

  Serial.println(
    "Aguardando conexao..."
  );
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
    digitalRead(
      BOTAO_VERMELHO
    );

  if (
    estadoVermelho == LOW &&
    estadoAnteriorVermelho == HIGH
  ) {

    enviarEvento(
      "rejeitou",
      2
    );

    delay(50);
  }

  estadoAnteriorVermelho =
    estadoVermelho;

  // ======================================
  // VERDE - ACEITOU
  // GPIO 22
  // ======================================

  bool estadoVerde =
    digitalRead(
      BOTAO_VERDE
    );

  if (
    estadoVerde == LOW &&
    estadoAnteriorVerde == HIGH
  ) {

    enviarEvento(
      "aceitou",
      1
    );

    delay(50);
  }

  estadoAnteriorVerde =
    estadoVerde;

  // ======================================
  // LARANJA - NEUTRO
  // GPIO 21
  // ======================================

  bool estadoLaranja =
    digitalRead(
      BOTAO_LARANJA
    );

  if (
    estadoLaranja == LOW &&
    estadoAnteriorLaranja == HIGH
  ) {

    enviarEvento(
      "neutro",
      3
    );

    delay(50);
  }

  estadoAnteriorLaranja =
    estadoLaranja;

  // ======================================
  // AZUL - AÇÃO
  // GPIO 19
  // ======================================

  bool estadoAzul =
    digitalRead(
      BOTAO_AZUL
    );

  if (
    estadoAzul == LOW &&
    estadoAnteriorAzul == HIGH
  ) {

    enviarEvento(
      "acao",
      0
    );

    delay(50);
  }

  estadoAnteriorAzul =
    estadoAzul;

  delay(5);
}