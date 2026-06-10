import serial
import time

# porta = "COM3"
# no windows rodar com a porta COM3 ou COM6 dependendo de onde está o arduino
porta = "/dev/ttyACM0"
velocidade = 9600

try:
    arduino = serial.Serial(porta, velocidade, timeout=1)
    time.sleep(2)
    print(f"Conectado na porta {porta}")

    while True:
        if arduino.in_waiting > 0:
            dados = arduino.readline().decode('utf-8').rstrip()
            print(f"Recebido: {dados}")

except serial.SerialException as e:
    print(f"Erro de conexão: {e}")

except KeyboardInterrupt:
    print("Finalizando a leitura...")

finally:
    if 'arduino' in locals() and arduino.is_open:
        arduino.close()
        print("Portal serial fechada.")


print(f"O dado é: {dados}")
