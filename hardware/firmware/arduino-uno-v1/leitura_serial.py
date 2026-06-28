import serial
import time
import requests

API_URL = "[http://127.0.0.1:8000](http://127.0.0.1:8000)"
EMAIL_USUARIO = "admin@adm.com"
SENHA_USUARIO = "123456"
CRIANCA_ID = "7457a1a4-8885-478f-aa28-c0ed1043d506"
ALIMENTO_ID = 1 
PORTA = "/dev/ttyACM0" 
VELOCIDADE = 9600

MAPEAMENTO_SENSOR = {
    "CMD:SENSOR:1": "sabor",
    "CMD:SENSOR:2": "textura",
    "CMD:SENSOR:3": "temperatura",
    "CMD:SENSOR:4": "cheiro",
    "CMD:SENSOR:5": "cor"
}

MAPEAMENTO_REACAO = {
    "CMD:REACTION:1": {"nivel": 5, "gostou": True},   
    "CMD:REACTION:2": {"nivel": 3, "gostou": None},   
    "CMD:REACTION:3": {"nivel": 1, "gostou": False}   
}

sensor_em_espera = None 

def fazer_login():
    url = f"{API_URL}/api/auth/login"
    payload = {"email": EMAIL_USUARIO, "senha": SENHA_USUARIO}
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json().get("access_token")
        else:
            print(f"❌ Falha no login: {response.status_code} - {response.text}")
            exit()
    except Exception as e:
        print(f"❌ Erro de API: {e}")
        exit()

def enviar_log_para_api(token, nivel_reacao, feedbacks):
    payload = {
        "criancaId": CRIANCA_ID,
        "alimentoId": ALIMENTO_ID,
        "reacao": nivel_reacao,
        "origem": "hardware_iot",
        "feedbacks": feedbacks
    }
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    try:
        resposta = requests.post(f"{API_URL}/api/feeding-logs/", json=payload, headers=headers)
        if resposta.status_code == 201:
            print(f"🚀 SUCESSO! Log salvo -> Reação Geral: {nivel_reacao} | Feedbacks: {feedbacks}")
        else:
            print(f"❌ Erro ao salvar: {resposta.text}")
    except Exception as e:
        print(f"❌ Erro de comunicação: {e}")

if __name__ == "__main__":
    token_jwt = fazer_login()
    try:
        arduino = serial.Serial(PORTA, VELOCIDADE, timeout=1)
        time.sleep(2)
        print(f"\n🔌 Conectado ao Arduino! (Porta: {PORTA})")
        print("💡 INSTRUÇÕES: Aperte um SENSOR e depois uma REAÇÃO.")

        while True:
            if arduino.in_waiting > 0:
                dado = arduino.readline().decode('utf-8').rstrip()
                if dado in MAPEAMENTO_SENSOR:
                    sensor_em_espera = MAPEAMENTO_SENSOR[dado]
                    print(f"\n👉 SENSOR SELECIONADO: [{sensor_em_espera.upper()}]. Aguardando reação...")
                    
                elif dado in MAPEAMENTO_REACAO:
                    config_reacao = MAPEAMENTO_REACAO[dado]
                    lista_feedbacks = []
                    
                    if sensor_em_espera and config_reacao["gostou"] is not None:
                        lista_feedbacks.append({
                            "atributo": sensor_em_espera,
                            "gostou": config_reacao["gostou"]
                        })
                    
                    print(f"\n👉 REAÇÃO ACIONADA. Disparando para a API...")
                    enviar_log_para_api(token_jwt, config_reacao["nivel"], lista_feedbacks)
                    sensor_em_espera = None 

    except serial.SerialException as e:
        print(f"\n❌ Erro na porta serial: {e}")
    except KeyboardInterrupt:
        print("\n🛑 Finalizado pelo usuário.")
    finally:
        if 'arduino' in locals() and arduino.is_open:
            arduino.close()
            