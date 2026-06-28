/*
    * Título: Tabuleiro Sensorial IoT - AtipicTouch
    * Autor: Samuel Ramos or Chiefzz7
    * Descrição: Firmware de captura das reações sensoriais
    * Hardware: Arduino Uno R3, Módulo Bluetooth HC-05, Botões Arcade & Buzzer
    * Versão: v1.0.2
*/

#include <SoftwareSerial.h>

/* Mapeamento do Hardware */
// Entradas
#define BTN_VERDE 2      
#define BTN_LARANJA 3    
#define BTN_VERMELHO 4   
#define BTN_SABOR 5
#define BTN_TEXTURA 6
#define BTN_TEMPERATURA 7
#define BTN_CHEIRO 9
#define BTN_COR 10

// Saídas
#define BUZZER 8         
#define LED_STATUS 13    

// Comunicação Bluetooth
#define BT_RX 11        
#define BT_TX 12        
SoftwareSerial bluetooth(BT_RX, BT_TX);

// Controle de Estado (Debounce)
unsigned long ultimoTempoToque = 0;
const int delayDebounce = 500;  

void setup() {
    Serial.begin(9600);     // Inicia comunicação com o PC (Python)
    bluetooth.begin(9600);  // Inicia comunicação com App

    // Pinos de entrada (Botões)
    pinMode(BTN_VERDE, INPUT_PULLUP);
    pinMode(BTN_LARANJA, INPUT_PULLUP);
    pinMode(BTN_VERMELHO, INPUT_PULLUP);
    pinMode(BTN_SABOR, INPUT_PULLUP);
    pinMode(BTN_TEXTURA, INPUT_PULLUP);
    pinMode(BTN_TEMPERATURA, INPUT_PULLUP);
    pinMode(BTN_CHEIRO, INPUT_PULLUP);
    pinMode(BTN_COR, INPUT_PULLUP);

    // Pinos de Saída
    pinMode(BUZZER, OUTPUT);
    pinMode(LED_STATUS, OUTPUT);
    
    delay(1000); // Pequena pausa para estabilizar a comunicação
}

void loop() {
    // LOW = Botão pressionado
    if (digitalRead(BTN_VERDE) == LOW) registrarReacao("CMD:REACTION:1");
    else if (digitalRead(BTN_LARANJA) == LOW) registrarReacao("CMD:REACTION:2");
    else if (digitalRead(BTN_VERMELHO) == LOW) registrarReacao("CMD:REACTION:3");
    
    else if (digitalRead(BTN_SABOR) == LOW) registrarReacao("CMD:SENSOR:1");
    else if (digitalRead(BTN_TEXTURA) == LOW) registrarReacao("CMD:SENSOR:2");
    else if (digitalRead(BTN_TEMPERATURA) == LOW) registrarReacao("CMD:SENSOR:3");
    else if (digitalRead(BTN_CHEIRO) == LOW) registrarReacao("CMD:SENSOR:4");
    else if (digitalRead(BTN_COR) == LOW) registrarReacao("CMD:SENSOR:5");
}

// Função Enxuta: Apenas emite o sinal e dá o feedback sonoro
void registrarReacao(String payload) {
    if ((millis() - ultimoTempoToque) > delayDebounce) {
        feedbackSensorial();
        
        bluetooth.println(payload); // Envia via Bluetooth (se conectado)
        Serial.println(payload);    // Envia o payload LIMPO para a Serial USB (Python)

        ultimoTempoToque = millis();
    }
}

void feedbackSensorial() {
    digitalWrite(LED_STATUS, HIGH);
    digitalWrite(BUZZER, HIGH);
    delay(150); 
    digitalWrite(BUZZER, LOW);
    digitalWrite(LED_STATUS, LOW);
}
