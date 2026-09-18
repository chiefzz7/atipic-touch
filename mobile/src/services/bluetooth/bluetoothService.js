import {
  BleManager,
  State,
} from "react-native-ble-plx";

import { decode } from "base-64";

const DEVICE_NAME = "AtipicTouch-ESP32";

const SERVICE_UUID =
  "7a8f0001-4a54-4b00-8000-000000000001";

const EVENT_CHARACTERISTIC_UUID =
  "7a8f0002-4a54-4b00-8000-000000000002";

class BluetoothService {

  constructor() {
    this.manager = new BleManager();

    this.device = null;
    this.monitorSubscription = null;

    this.listeners = new Set();
  }

  // ========================================
  // Estado BLE
  // ========================================

  async verificarBluetooth() {

    const state = await this.manager.state();

    return state === State.PoweredOn;
  }

  // ========================================
  // Eventos
  // ========================================

  adicionarListener(listener) {

    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  notificarListeners(evento) {

    this.listeners.forEach((listener) => {

      try {
        listener(evento);
      } catch (error) {
        console.error(
          "Erro ao processar evento BLE:",
          error
        );
      }

    });
  }

  // ========================================
  // Scan + conexão
  // ========================================

  async conectar() {

    const bluetoothLigado =
      await this.verificarBluetooth();

    if (!bluetoothLigado) {
      throw new Error(
        "O Bluetooth do celular está desligado."
      );
    }

    await this.desconectar(false);

    return new Promise(
      (resolve, reject) => {

        let finalizado = false;

        const finalizarErro = (error) => {

          if (finalizado) {
            return;
          }

          finalizado = true;

          this.manager.stopDeviceScan();

          reject(error);
        };

        const finalizarSucesso = (device) => {

          if (finalizado) {
            return;
          }

          finalizado = true;

          this.manager.stopDeviceScan();

          resolve(device);
        };

        this.manager.startDeviceScan(
          [SERVICE_UUID],
          null,
          async (error, device) => {

            if (error) {

              console.error(
                "Erro durante scan BLE:",
                error
              );

              finalizarErro(error);

              return;
            }

            if (!device) {
              return;
            }

            const nome =
              device.name ||
              device.localName;

            if (nome !== DEVICE_NAME) {
              return;
            }

            try {

              this.manager.stopDeviceScan();

              console.log(
                "ESP32 encontrado:",
                device.id
              );

              const conectado =
                await device.connect();

              const descoberto =
                await conectado.discoverAllServicesAndCharacteristics();

              this.device = descoberto;

              this.monitorarEventos(descoberto);

              console.log(
                "ESP32 conectado:",
                descoberto.id
              );

              finalizarSucesso(descoberto);

            } catch (connectionError) {

              console.error(
                "Erro ao conectar ao ESP32:",
                connectionError
              );

              finalizarErro(connectionError);
            }
          }
        );

        setTimeout(() => {

          if (finalizado) {
            return;
          }

          this.manager.stopDeviceScan();

          finalizarErro(
            new Error(
              "Não foi possível encontrar o AtipicTouch-ESP32."
            )
          );

        }, 15000);
      }
    );
  }

  // ========================================
  // Monitoramento dos eventos
  // ========================================

  monitorarEventos(device) {

    if (this.monitorSubscription) {
      this.monitorSubscription.remove();

      this.monitorSubscription = null;
    }

    this.monitorSubscription =
      device.monitorCharacteristicForService(
        SERVICE_UUID,
        EVENT_CHARACTERISTIC_UUID,
        (error, characteristic) => {

          if (error) {

            console.error(
              "Erro na notificação BLE:",
              error
            );

            return;
          }

          if (!characteristic?.value) {
            return;
          }

          try {

            const jsonString =
              decode(characteristic.value);

            console.log(
              "Evento recebido do ESP32:",
              jsonString
            );

            const evento =
              JSON.parse(jsonString);

            if (
              !evento ||
              typeof evento !== "object"
            ) {
              return;
            }

            this.notificarListeners(evento);

          } catch (parseError) {

            console.error(
              "Erro ao interpretar evento BLE:",
              parseError
            );
          }
        }
      );
  }

  // ========================================
  // Desconectar
  // ========================================

  async desconectar(
    limparDevice = true
  ) {

    if (this.monitorSubscription) {

      this.monitorSubscription.remove();

      this.monitorSubscription = null;
    }

    if (this.device) {

      try {

        await this.device.cancelConnection();

      } catch (error) {

        console.warn(
          "Erro ao desconectar ESP32:",
          error
        );
      }
    }

    if (limparDevice) {
      this.device = null;
    }
  }

  // ========================================
  // Status
  // ========================================

  estaConectado() {

    return this.device !== null;
  }

  obterDevice() {

    return this.device;
  }

  // ========================================
  // Cleanup
  // ========================================

  destroy() {

    if (this.monitorSubscription) {
      this.monitorSubscription.remove();

      this.monitorSubscription = null;
    }

    this.manager.destroy();

    this.device = null;
    this.listeners.clear();
  }
}

const bluetoothService =
  new BluetoothService();

export default bluetoothService;

export {
  DEVICE_NAME,
  SERVICE_UUID,
  EVENT_CHARACTERISTIC_UUID,
};
