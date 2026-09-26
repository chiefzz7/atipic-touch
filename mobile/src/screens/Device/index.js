import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  StatusBar,
} from "expo-status-bar";

import AvatarHeader from "../../components/AvatarHeader";
import SectionCard from "../../components/SectionCard";
import PowerButton from "../../components/PowerButton";
import PrimaryButton from "../../components/PrimaryButton";
import BottomNavigation from "../../components/BottomNavigation";

import bluetoothService from "../../services/bluetooth/bluetoothService";

export default function Device() {
  const insets =
    useSafeAreaInsets();

  const [
    connected,
    setConnected,
  ] = useState(false);

  const [
    connecting,
    setConnecting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    let mounted = true;

    async function verificarConexao() {
      const conectado =
        await bluetoothService
          .verificarConexaoAtual();

      if (mounted) {
        setConnected(
          conectado
        );
      }
    }

    verificarConexao();

    const removerListener =
      bluetoothService
        .adicionarListenerConexao(
          (conectado) => {
            if (mounted) {
              setConnected(
                conectado
              );
            }
          }
        );

    return () => {
      mounted = false;

      removerListener();
    };
  }, []);

  const handleConnection =
    async () => {
      if (connecting) {
        return;
      }

      setError("");

      if (connected) {
        try {
          setConnecting(
            true
          );

          await bluetoothService
            .desconectar();

          setConnected(
            false
          );
        } catch (
          disconnectError
        ) {
          console.error(
            "Erro ao desconectar dispositivo:",
            disconnectError
          );

          setError(
            disconnectError
              ?.message ||
              "Não foi possível desconectar o dispositivo."
          );
        } finally {
          setConnecting(
            false
          );
        }

        return;
      }

      try {
        setConnecting(
          true
        );

        await bluetoothService
          .conectar();

        const conectado =
          await bluetoothService
            .verificarConexaoAtual();

        setConnected(
          conectado
        );

        if (!conectado) {
          setError(
            "O dispositivo foi encontrado, mas a conexão BLE não permaneceu ativa."
          );
        }
      } catch (
        connectionError
      ) {
        console.error(
          "Erro ao conectar dispositivo:",
          connectionError
        );

        setConnected(
          false
        );

        setError(
          connectionError
            ?.message ||
            "Não foi possível conectar ao dispositivo."
        );
      } finally {
        setConnecting(
          false
        );
      }
    };

  return (
    <View
      className="flex-1 bg-[#FFFCEF]"
      style={{
        paddingTop:
          insets.top,
      }}
    >
      <StatusBar
        style="dark"
      />

      <ScrollView
        className="flex-1 px-3 pt-2"
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom:
            120,
        }}
      >
        <AvatarHeader />

        <View className="mt-2">
          <SectionCard
            title="Status do dispositivo auxiliador"
          >
            <View className="items-center pt-2">
              <PowerButton
                onPress={
                  handleConnection
                }
                connected={
                  connected
                }
                disabled={
                  connecting
                }
              />

              <Text className="text-[#554B41] text-[22px] font-medium mt-6 text-center">
                {connecting
                  ? "Conectando..."
                  : connected
                    ? "Auxiliador conectado"
                    : "Auxiliador desconectado"}
              </Text>

              {connecting && (
                <View className="items-center mt-3">
                  <ActivityIndicator
                    size="small"
                    color="#4D9B43"
                  />
                </View>
              )}

              {error !== "" && (
                <Text className="text-[#9B5547] text-[14px] text-center mt-4 px-3">
                  {error}
                </Text>
              )}

              <View className="w-full mt-6">
                <PrimaryButton
                  title={
                    connected
                      ? "Desconectar dispositivo"
                      : "Conectar dispositivo"
                  }
                  disabled={
                    connecting
                  }
                  onPress={
                    handleConnection
                  }
                />
              </View>
            </View>
          </SectionCard>
        </View>
      </ScrollView>

      <BottomNavigation
        active="device"
      />
    </View>
  );
}
