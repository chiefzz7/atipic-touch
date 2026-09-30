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
// GPIO - reações
// ========================================

// Mantidos conforme o hardware já utilizado.
#define BOTAO_NAO_GOSTOU 23
#define BOTAO_GOSTOU     22
#define BOTAO_NEUTRO     21

// ========================================
// GPIO - aspectos sensoriais
// ========================================

#define BOTAO_COR          25
#define BOTAO_SABOR        26
#define BOTAO_CHEIRO       27
#define BOTAO_TEXTURA      32
#define BOTAO_TEMPERATURA  33

// ========================================
// Estado anterior - reações
// ========================================

bool estadoAnteriorNaoGostou =
  HIGH;

bool estadoAnteriorGostou =
  HIGH;

bool estadoAnteriorNeutro =
  HIGH;

// ========================================
// Estado anterior - sensoriais
// ========================================

bool estadoAnteriorCor =
  HIGH;

bool estadoAnteriorSabor =
  HIGH;

bool estadoAnteriorCheiro =
  HIGH;

bool estadoAnteriorTextura =
  HIGH;

bool estadoAnteriorTemperatura =
  HIGH;

// ========================================
// BLE
// ========================================

BLEServer *bleServer =
  nullptr;

BLECharacteristic *eventCharacteristic =
  nullptr;

bool dispositivoConectado =
  false;

// ========================================
// Callbacks do servidor BLE
// ========================================

class ServerCallbacks :
  public BLEServerCallbacks {

  void onConnect(
    BLEServer *server
  ) override {

    dispositivoConectado =
      true;

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

    dispositivoConectado =
      false;

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

    delay(
      300
    );

    server
      ->startAdvertising();
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
    eventCharacteristic ==
      nullptr
  ) {
    return;
  }

  /*
   * MTU BLE padrão:
   *
   * 23 bytes
   * - 3 bytes ATT
   * = aproximadamente 20 bytes úteis.
   *
   * O aplicativo já possui buffer para
   * remontar mensagens fragmentadas.
   */
  const size_t TAMANHO_PACOTE =
    20;

  /*
   * O \n indica o final de cada JSON.
   */
  String payload =
    mensagem +
    "\n";

  for (
    size_t inicio = 0;
    inicio <
      payload.length();
    inicio +=
      TAMANHO_PACOTE
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
     * Pequeno intervalo para reduzir
     * risco de perda entre notificações.
     */
    delay(
      15
    );
  }
}

// ========================================
// Evento de reação
// ========================================

void enviarEventoReacao(
  const char *botao,
  int value
) {

  String json =
    "{";

  json +=
    "\"tipo\":\"reacao\",";

  json +=
    "\"botao\":\"";

  json +=
    botao;

  json +=
    "\",";

  json +=
    "\"value\":";

  json +=
    value;

  json +=
    "}";

  Serial.print(
    "Evento de reação: "
  );

  Serial.println(
    json
  );

  if (
    !dispositivoConectado
  ) {

    Serial.println(
      "Evento não enviado: nenhum celular conectado."
    );

    return;
  }

  enviarMensagemBLE(
    json
  );

  Serial.println(
    "Evento de reação enviado via BLE."
  );
}

// ========================================
// Evento sensorial
// ========================================

void enviarEventoSensorial(
  const char *atributo
) {

  String json =
    "{";

  json +=
    "\"tipo\":\"sensorial\",";

  json +=
    "\"atributo\":\"";

  json +=
    atributo;

  json +=
    "\"";

  json +=
    "}";

  Serial.print(
    "Evento sensorial: "
  );

  Serial.println(
    json
  );

  if (
    !dispositivoConectado
  ) {

    Serial.println(
      "Evento não enviado: nenhum celular conectado."
    );

    return;
  }

  enviarMensagemBLE(
    json
  );

  Serial.println(
    "Evento sensorial enviado via BLE."
  );
}

// ========================================
// Detectar pressionamento
// ========================================

bool foiPressionado(
  int pin,
  bool &estadoAnterior
) {

  bool estadoAtual =
    digitalRead(
      pin
    );

  bool pressionado =
    estadoAtual ==
      LOW &&
    estadoAnterior ==
      HIGH;

  estadoAnterior =
    estadoAtual;

  return pressionado;
}

// ========================================
// Setup
// ========================================

void setup() {

  Serial.begin(
    115200
  );

  delay(
    500
  );

  Serial.println();

  Serial.println(
    "========================================"
  );

  Serial.println(
    "AtipicTouch - ESP32 BLE"
  );

  Serial.println(
    "8 botoes - reacao + sensorial"
  );

  Serial.println(
    "========================================"
  );

  // ======================================
  // Reações
  // ======================================

  pinMode(
    BOTAO_NAO_GOSTOU,
    INPUT_PULLUP
  );

  pinMode(
    BOTAO_GOSTOU,
    INPUT_PULLUP
  );

  pinMode(
    BOTAO_NEUTRO,
    INPUT_PULLUP
  );

  // ======================================
  // Sensoriais
  // ======================================

  pinMode(
    BOTAO_COR,
    INPUT_PULLUP
  );

  pinMode(
    BOTAO_SABOR,
    INPUT_PULLUP
  );

  pinMode(
    BOTAO_CHEIRO,
    INPUT_PULLUP
  );

  pinMode(
    BOTAO_TEXTURA,
    INPUT_PULLUP
  );

  pinMode(
    BOTAO_TEMPERATURA,
    INPUT_PULLUP
  );

  // ======================================
  // Inicialização BLE
  // ======================================

  BLEDevice::init(
    DEVICE_NAME
  );

  bleServer =
    BLEDevice
      ::createServer();

  bleServer
    ->setCallbacks(
      new ServerCallbacks()
    );

  BLEService *service =
    bleServer
      ->createService(
        SERVICE_UUID
      );

  // ======================================
  // Característica de eventos
  // ======================================

  eventCharacteristic =
    service
      ->createCharacteristic(
        CHARACTERISTIC_UUID,

        BLECharacteristic
          ::PROPERTY_READ |
        BLECharacteristic
          ::PROPERTY_NOTIFY
      );

  eventCharacteristic
    ->addDescriptor(
      new BLE2902()
    );

  eventCharacteristic
    ->setValue(
      "{\"status\":\"ready\"}"
    );

  // ======================================
  // Serviço
  // ======================================

  service
    ->start();

  // ======================================
  // Advertising
  // ======================================

  BLEAdvertising *advertising =
    BLEDevice
      ::getAdvertising();

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

  Serial.println();

  Serial.println(
    "GPIO 22 -> Gostou"
  );

  Serial.println(
    "GPIO 23 -> Nao gostou"
  );

  Serial.println(
    "GPIO 21 -> Neutro"
  );

  Serial.println(
    "GPIO 25 -> Cor"
  );

  Serial.println(
    "GPIO 26 -> Sabor"
  );

  Serial.println(
    "GPIO 27 -> Cheiro"
  );

  Serial.println(
    "GPIO 32 -> Textura"
  );

  Serial.println(
    "GPIO 33 -> Temperatura"
  );

  Serial.println();

  Serial.println(
    "Aguardando conexao..."
  );
}

// ========================================
// Loop
// ========================================

void loop() {

  // ======================================
  // NÃO GOSTOU
  // ======================================

  if (
    foiPressionado(
      BOTAO_NAO_GOSTOU,
      estadoAnteriorNaoGostou
    )
  ) {

    enviarEventoReacao(
      "rejeitou",
      2
    );

    delay(
      50
    );
  }

  // ======================================
  // GOSTOU
  // ======================================

  if (
    foiPressionado(
      BOTAO_GOSTOU,
      estadoAnteriorGostou
    )
  ) {

    enviarEventoReacao(
      "aceitou",
      1
    );

    delay(
      50
    );
  }

  // ======================================
  // NEUTRO
  // ======================================

  if (
    foiPressionado(
      BOTAO_NEUTRO,
      estadoAnteriorNeutro
    )
  ) {

    enviarEventoReacao(
      "neutro",
      3
    );

    delay(
      50
    );
  }

  // ======================================
  // COR
  // ======================================

  if (
    foiPressionado(
      BOTAO_COR,
      estadoAnteriorCor
    )
  ) {

    enviarEventoSensorial(
      "cor"
    );

    delay(
      50
    );
  }

  // ======================================
  // SABOR
  // ======================================

  if (
    foiPressionado(
      BOTAO_SABOR,
      estadoAnteriorSabor
    )
  ) {

    enviarEventoSensorial(
      "sabor"
    );

    delay(
      50
    );
  }

  // ======================================
  // CHEIRO
  // ======================================

  if (
    foiPressionado(
      BOTAO_CHEIRO,
      estadoAnteriorCheiro
    )
  ) {

    enviarEventoSensorial(
      "cheiro"
    );

    delay(
      50
    );
  }

  // ======================================
  // TEXTURA
  // ======================================

  if (
    foiPressionado(
      BOTAO_TEXTURA,
      estadoAnteriorTextura
    )
  ) {

    enviarEventoSensorial(
      "textura"
    );

    delay(
      50
    );
  }

  // ======================================
  // TEMPERATURA
  // ======================================

  if (
    foiPressionado(
      BOTAO_TEMPERATURA,
      estadoAnteriorTemperatura
    )
  ) {

    enviarEventoSensorial(
      "temperatura"
    );

    delay(
      50
    );
  }

  delay(
    5
  );
}