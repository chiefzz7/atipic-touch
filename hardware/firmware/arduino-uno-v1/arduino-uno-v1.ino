/*
    *Título: Tabuleiro Sensorial IoT - AtipicTouch
    *Autor: Samuel Ramos or Chiefzz7
    *Descrição: Firmware de captura das reações sensoriais da criança durante a alimentação
    *Hardware: Arduino Uno R3, Módulo Bluetooth HC-05, Botões Arcade & Buzzer
    *Versão: v1.0.1
*/

#include <SoftwareSerial.h>

/* Mapeamento do Hardware - Definir variaveis globais */
// Entradas
#define BTN_VERDE 2      // Reação Positiva
#define BTN_LARANJA 3    // Reação Neutra
#define BTN_VERMELHO 4   // Reação Negativa

#define BTN_SABOR 5
#define BTN_TEXTURA 6
#define BTN_TEMPERATURA 7
#define BTN_CHEIRO 9
#define BTN_COR 10


//by: Ravel

// Saídas
#define BUZZER 8         // Reforço Sonoro
#define LED_STATUS 13    // LED para indicar o envio

// Comunicação 
#define BT_RX 11        // Pino RX do Arduino (Conecta-lo ao TX do HC-05)
#define BT_TX 12        // Pino TX do Arduino (Conecta-lo ao RX do HC-05)
SoftwareSerial bluetooth(BT_RX, BT_TX);

// Controle de Estado
unsigned long ultimoTempoToque = 0;
const int delayDebounce = 500;  // Delay de 500ms/Meio segundo entre toques (Evitar sobrecarga de toques)

void setup() {
    // Inicializar a comunicação
    Serial.begin(9600);
    bluetooth.begin(9600);

    // Configuração dos Pinos de entrada
    pinMode(BTN_VERDE, INPUT_PULLUP);
    pinMode(BTN_LARANJA, INPUT_PULLUP);
    pinMode(BTN_VERMELHO, INPUT_PULLUP);

    pinMode(BTN_SABOR, INPUT_PULLUP);
    pinMode(BTN_TEXTURA, INPUT_PULLUP);
    pinMode(BTN_TEMPERATURA, INPUT_PULLUP);
    pinMode(BTN_CHEIRO, INPUT_PULLUP);
    pinMode(BTN_COR, INPUT_PULLUP);

    // Configuração dos Pinos de Saída
    pinMode(BUZZER, OUTPUT);
    pinMode(LED_STATUS, OUTPUT);

    Serial.println("SISTEMA ATIVO: Aguardando resposta...");
}

void loop() {
    // LOW significa que o botão foi pressionado (devido ao PullUp)
    if (digitalRead(BTN_VERDE) == LOW) {
        registrarReacao("CMD:REACTION:1", "ACEITACAO");
    }
    else if (digitalRead(BTN_LARANJA) == LOW) {
        registrarReacao("CMD:REACTION:2", "NEUTRO");
    }
    else if (digitalRead(BTN_VERMELHO) == LOW) {
        registrarReacao("CMD:REACTION:3", "NEGACAO");
    }
    
    int sensor = 0;
    // SENSORIAIS (novo)
    // =========================
    if (digitalRead(BTN_SABOR) == LOW) sensor = 1;
    else if (digitalRead(BTN_TEXTURA) == LOW) sensor = 2;
    else if (digitalRead(BTN_TEMPERATURA) == LOW) sensor = 3;
    else if (digitalRead(BTN_CHEIRO) == LOW) sensor = 4;
    else if (digitalRead(BTN_COR) == LOW) sensor = 5;

    // Switch case igual lógica das reações
    switch (sensor) {
        case 1:
            registrarReacao("CMD:SENSOR:1", "SABOR");
            break;

        case 2:
            registrarReacao("CMD:SENSOR:2", "TEXTURA");
            break;

        case 3:
            registrarReacao("CMD:SENSOR:3", "TEMPERATURA");
            break;

        case 4:
            registrarReacao("CMD:SENSOR:4", "CHEIRO");
            break;

        case 5:
            registrarReacao("CMD:SENSOR:5", "COR");
            break;

        default:
            break;
    }
}

// Função principal de Registrar a Alimentação
void registrarReacao(String payload, String logDebug) {
    if ((millis() - ultimoTempoToque) > delayDebounce) {
        feedbackSensorial();            // Feedback Sensorial local para a criança
        bluetooth.println(payload);     // Transmissão de dados para o App Mobile via Bluetooth

        // Log para os desenvolvedores (testes)
        Serial.print("Dado enviado via BT: ");
        Serial.println(logDebug);

        ultimoTempoToque = millis();    // Atualizar o relógio do último toque
    }
}

void feedbackSensorial() {
    // Aciona LED e som simultaneamente
    digitalWrite(LED_STATUS, HIGH);
    digitalWrite(BUZZER, HIGH);

    delay(150); // Duração do estímulo (curto para não assustar)
    
    digitalWrite(BUZZER, LOW);
    digitalWrite(LED_STATUS, LOW);
}
