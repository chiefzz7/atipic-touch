import {
  BleManager,
  State,
} from "react-native-ble-plx";

import {
  PermissionsAndroid,
  Platform,
} from "react-native";

import { decode } from "base-64";

const DEVICE_NAME =
  "AtipicTouch-ESP32";

const SERVICE_UUID =
  "7a8f0001-4a54-4b00-8000-000000000001";

const EVENT_CHARACTERISTIC_UUID =
  "7a8f0002-4a54-4b00-8000-000000000002";

class BluetoothService {

  constructor() {

    this.manager =
      new BleManager();

    this.device = null;

    this.conectando = false;

    this.disconnectSubscription =
      null;

    this.monitorSubscription =
      null;

    this.connectionListeners =
      new Set();

    this.eventListeners =
      new Set();

    this.bufferBLE = "";
  }

  // ========================================
  // Permissões
  // ========================================

  async solicitarPermissoes() {

    if (
      Platform.OS !== "android"
    ) {
      return true;
    }

    if (
      Platform.Version < 31
    ) {
      return true;
    }

    const resultado =
      await PermissionsAndroid
        .requestMultiple([
          PermissionsAndroid
            .PERMISSIONS
            .BLUETOOTH_SCAN,

          PermissionsAndroid
            .PERMISSIONS
            .BLUETOOTH_CONNECT,
        ]);

    const scanPermitido =
      resultado[
        PermissionsAndroid
          .PERMISSIONS
          .BLUETOOTH_SCAN
      ] ===
      PermissionsAndroid
        .RESULTS
        .GRANTED;

    const connectPermitido =
      resultado[
        PermissionsAndroid
          .PERMISSIONS
          .BLUETOOTH_CONNECT
      ] ===
      PermissionsAndroid
        .RESULTS
        .GRANTED;

    return (
      scanPermitido &&
      connectPermitido
    );
  }

  // ========================================
  // Estado Bluetooth
  // ========================================

  async verificarBluetooth() {

    const state =
      await this.manager.state();

    return (
      state ===
      State.PoweredOn
    );
  }

  // ========================================
  // Listener de conexão
  // ========================================

  adicionarListenerConexao(
    listener
  ) {

    this.connectionListeners
      .add(listener);

    return () => {

      this.connectionListeners
        .delete(listener);
    };
  }

  notificarConexao(
    conectado
  ) {

    this.connectionListeners
      .forEach(
        (listener) => {

          try {

            listener(
              conectado
            );

          } catch (error) {

            console.error(
              "Erro no listener de conexão BLE:",
              error
            );
          }
        }
      );
  }

  // ========================================
  // Listener de eventos do ESP32
  // ========================================

  adicionarListener(
    listener
  ) {

    this.eventListeners
      .add(listener);

    return () => {

      this.eventListeners
        .delete(listener);
    };
  }

  notificarEvento(
    evento
  ) {

    this.eventListeners
      .forEach(
        (listener) => {

          try {

            listener(
              evento
            );

          } catch (error) {

            console.error(
              "Erro no listener de evento BLE:",
              error
            );
          }
        }
      );
  }

  // ========================================
  // Conectar
  // ========================================

  async conectar() {

    if (
      this.conectando
    ) {

      throw new Error(
        "Já existe uma tentativa de conexão em andamento."
      );
    }

    const permissoes =
      await this
        .solicitarPermissoes();

    if (
      !permissoes
    ) {

      throw new Error(
        "Permissão de Bluetooth não concedida."
      );
    }

    const bluetoothLigado =
      await this
        .verificarBluetooth();

    if (
      !bluetoothLigado
    ) {

      throw new Error(
        "O Bluetooth do celular está desligado."
      );
    }

    // Já conectado?
    if (
      this.device
    ) {

      try {

        const conectado =
          await this.device
            .isConnected();

        if (
          conectado
        ) {

          console.log(
            "ESP32 já conectado:",
            this.device.id
          );

          if (
            !this.monitorSubscription
          ) {

            this
              .monitorarEventos(
                this.device
              );
          }

          this
            .notificarConexao(
              true
            );

          return this.device;
        }

      } catch (error) {

        console.warn(
          "Erro ao verificar conexão existente:",
          error
        );
      }

      this.device =
        null;
    }

    this.conectando =
      true;

    try {

      const device =
        await this
          .procurarDispositivo();

      console.log(
        "ESP32 encontrado:",
        device.id
      );

      let conectado =
        await device
          .connect();

      conectado =
        await conectado
          .discoverAllServicesAndCharacteristics();

      this.device =
        conectado;

      this.bufferBLE =
        "";

      this
        .monitorarDesconexao(
          conectado
        );

      this
        .monitorarEventos(
          conectado
        );

      console.log(
        "ESP32 conectado:",
        conectado.id
      );

      this
        .notificarConexao(
          true
        );

      return conectado;

    } finally {

      this.conectando =
        false;

      this.manager
        .stopDeviceScan();
    }
  }

  // ========================================
  // Scan
  // ========================================

  procurarDispositivo() {

    return new Promise(
      (
        resolve,
        reject
      ) => {

        let finalizado =
          false;

        const encerrar =
          () => {

            this.manager
              .stopDeviceScan();
          };

        const timeout =
          setTimeout(
            () => {

              if (
                finalizado
              ) {
                return;
              }

              finalizado =
                true;

              encerrar();

              reject(
                new Error(
                  "AtipicTouch-ESP32 não encontrado."
                )
              );

            },
            15000
          );

        this.manager
          .startDeviceScan(
            [
              SERVICE_UUID
            ],
            null,
            (
              error,
              device
            ) => {

              if (
                finalizado
              ) {
                return;
              }

              if (
                error
              ) {

                finalizado =
                  true;

                clearTimeout(
                  timeout
                );

                encerrar();

                reject(
                  error
                );

                return;
              }

              if (
                !device
              ) {
                return;
              }

              const nome =
                device.name ||
                device.localName;

              if (
                nome !==
                DEVICE_NAME
              ) {
                return;
              }

              finalizado =
                true;

              clearTimeout(
                timeout
              );

              encerrar();

              resolve(
                device
              );
            }
          );
      }
    );
  }

  // ========================================
  // Desconexão
  // ========================================

  monitorarDesconexao(
    device
  ) {

    if (
      this.disconnectSubscription
    ) {

      this.disconnectSubscription
        .remove();

      this.disconnectSubscription =
        null;
    }

    this.disconnectSubscription =
      this.manager
        .onDeviceDisconnected(
          device.id,
          (
            error
          ) => {

            if (
              error
            ) {

              console.warn(
                "ESP32 desconectado:",
                error
              );

            } else {

              console.log(
                "ESP32 desconectado."
              );
            }

            this.device =
              null;

            this.bufferBLE =
              "";

            if (
              this.monitorSubscription
            ) {

              this.monitorSubscription
                .remove();

              this.monitorSubscription =
                null;
            }

            this
              .notificarConexao(
                false
              );
          }
        );
  }

  // ========================================
  // Monitorar eventos BLE
  // ========================================

  monitorarEventos(
    device
  ) {

    if (
      this.monitorSubscription
    ) {

      this.monitorSubscription
        .remove();

      this.monitorSubscription =
        null;
    }

    this.bufferBLE =
      "";

    this.monitorSubscription =
      device
        .monitorCharacteristicForService(
          SERVICE_UUID,
          EVENT_CHARACTERISTIC_UUID,
          (
            error,
            characteristic
          ) => {

            if (
              error
            ) {

              if (
                error?.message
                  ?.toLowerCase()
                  .includes(
                    "cancel"
                  )
              ) {
                return;
              }

              console.error(
                "Erro na notificação BLE:",
                error
              );

              return;
            }

            if (
              !characteristic
                ?.value
            ) {
              return;
            }

            try {

              const trecho =
                decode(
                  characteristic
                    .value
                );

              console.log(
                "Trecho recebido do ESP32:",
                trecho
              );

              this
                .processarTrechoBLE(
                  trecho
                );

            } catch (
              error
            ) {

              console.error(
                "Erro ao decodificar evento BLE:",
                error
              );
            }
          }
        );
  }

  // ========================================
  // Juntar os pedaços BLE
  // ========================================

  processarTrechoBLE(
    trecho
  ) {

    if (
      !trecho
    ) {
      return;
    }

    this.bufferBLE +=
      trecho;

    let indiceFim;

    while (
      (
        indiceFim =
          this.bufferBLE
            .indexOf(
              "\n"
            )
      ) !== -1
    ) {

      const mensagem =
        this.bufferBLE
          .slice(
            0,
            indiceFim
          )
          .trim();

      this.bufferBLE =
        this.bufferBLE
          .slice(
            indiceFim + 1
          );

      if (
        !mensagem
      ) {
        continue;
      }

      try {

        const evento =
          JSON.parse(
            mensagem
          );

        console.log(
          "Evento recebido do ESP32:",
          evento
        );

        this
          .notificarEvento(
            evento
          );

      } catch (
        error
      ) {

        console.error(
          "Erro ao interpretar evento BLE completo:",
          mensagem,
          error
        );
      }
    }

    if (
      this.bufferBLE
        .length > 4096
    ) {

      console.warn(
        "Buffer BLE excedeu o limite. Limpando."
      );

      this.bufferBLE =
        "";
    }
  }

  // ========================================
  // Desconectar manualmente
  // ========================================

  async desconectar() {

    this.manager
      .stopDeviceScan();

    this.conectando =
      false;

    if (
      this.monitorSubscription
    ) {

      this.monitorSubscription
        .remove();

      this.monitorSubscription =
        null;
    }

    if (
      !this.device
    ) {

      this.bufferBLE =
        "";

      this
        .notificarConexao(
          false
        );

      return;
    }

    const device =
      this.device;

    try {

      const conectado =
        await device
          .isConnected();

      if (
        conectado
      ) {

        await device
          .cancelConnection();
      }

    } finally {

      this.device =
        null;

      this.bufferBLE =
        "";

      this
        .notificarConexao(
          false
        );
    }
  }

  // ========================================
  // Verificar conexão
  // ========================================

  async verificarConexaoAtual() {

    if (
      !this.device
    ) {
      return false;
    }

    try {

      return await this.device
        .isConnected();

    } catch (
      error
    ) {

      this.device =
        null;

      return false;
    }
  }

  estaConectado() {

    return (
      this.device !== null
    );
  }

  obterDevice() {

    return this.device;
  }

  // ========================================
  // Cleanup
  // ========================================

  destroy() {

    this.manager
      .stopDeviceScan();

    if (
      this.monitorSubscription
    ) {

      this.monitorSubscription
        .remove();

      this.monitorSubscription =
        null;
    }

    if (
      this.disconnectSubscription
    ) {

      this.disconnectSubscription
        .remove();

      this.disconnectSubscription =
        null;
    }

    this.manager
      .destroy();

    this.device =
      null;

    this.conectando =
      false;

    this.bufferBLE =
      "";

    this.connectionListeners
      .clear();

    this.eventListeners
      .clear();
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
