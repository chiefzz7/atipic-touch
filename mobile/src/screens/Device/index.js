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

import {
  Ionicons,
} from "@expo/vector-icons";

import AvatarHeader from "../../components/AvatarHeader";
import SectionCard from "../../components/SectionCard";
import PowerButton from "../../components/PowerButton";
import PrimaryButton from "../../components/PrimaryButton";
import BottomNavigation from "../../components/BottomNavigation";

import bluetoothService from "../../services/bluetooth/bluetoothService";

import {
  getChildren,
} from "../../services/children/children";

import {
  getSelectedChild,
} from "../../services/children/selectedChild";

function calculateAge(
  birthDate
) {
  if (!birthDate) {
    return "";
  }

  const [
    year,
    month,
    day,
  ] =
    birthDate
      .split("-")
      .map(Number);

  if (
    !year ||
    !month ||
    !day
  ) {
    return "";
  }

  const today =
    new Date();

  let age =
    today.getFullYear() -
    year;

  const birthdayHasPassed =
    today.getMonth() + 1 >
      month ||
    (
      today.getMonth() + 1 ===
        month &&
      today.getDate() >=
        day
    );

  if (
    !birthdayHasPassed
  ) {
    age -= 1;
  }

  return `${age} ${
    age === 1
      ? "ano"
      : "anos"
  }`;
}

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

  const [
    child,
    setChild,
  ] = useState(null);

  useEffect(() => {
    let mounted =
      true;

    async function loadChild() {
      try {
        const children =
          await getChildren();

        const childrenList =
          Array.isArray(
            children
          )
            ? children
            : [];

        if (
          childrenList.length ===
          0
        ) {
          return;
        }

        const selectedChild =
          await getSelectedChild();

        const validSelectedChild =
          selectedChild?.id
            ? childrenList.find(
                (
                  currentChild
                ) =>
                  currentChild.id ===
                  selectedChild.id
              )
            : null;

        if (
          validSelectedChild
        ) {
          if (mounted) {
            setChild(
              validSelectedChild
            );
          }

          return;
        }

        if (
          childrenList.length ===
            1 &&
          mounted
        ) {
          setChild(
            childrenList[0]
          );
        }
      } catch (childError) {
        console.warn(
          "Não foi possível carregar a criança no Device:",
          childError
        );
      }
    }

    loadChild();

    return () => {
      mounted =
        false;
    };
  }, []);

  useEffect(() => {
    let mounted =
      true;

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
          (
            conectado
          ) => {
            if (mounted) {
              setConnected(
                conectado
              );
            }
          }
        );

    return () => {
      mounted =
        false;

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
        className="flex-1 px-4 pt-2"
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom:
            120,
        }}
      >
        <AvatarHeader
          childName={
            child?.nome ||
            "Criança"
          }
          age={
            calculateAge(
              child
                ?.dataNascimento
            )
          }
        />

        <View className="mt-2">
          <SectionCard
            title="Status do dispositivo"
            icon="hardware-chip-outline"
          >
            <View className="items-center">
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

              <View
                className={`flex-row items-center rounded-full px-4 py-2 mt-2 ${
                  connecting
                    ? "bg-[#F8F0D9]"
                    : connected
                      ? "bg-[#EAF3E3]"
                      : "bg-[#FCEBE8]"
                }`}
              >
                <View
                  className={`w-[10px] h-[10px] rounded-full mr-2 ${
                    connecting
                      ? "bg-[#C29424]"
                      : connected
                        ? "bg-[#4D9B43]"
                        : "bg-[#D9534F]"
                  }`}
                />

                <Text
                  className={`text-[17px] font-semibold ${
                    connecting
                      ? "text-[#8A6A12]"
                      : connected
                        ? "text-[#2F6B28]"
                        : "text-[#A33B36]"
                  }`}
                >
                  {connecting
                    ? "Conectando..."
                    : connected
                      ? "Auxiliador conectado"
                      : "Auxiliador desconectado"}
                </Text>
              </View>

              {connecting && (
                <View className="items-center mt-3">
                  <ActivityIndicator
                    size="small"
                    color="#4D9B43"
                  />
                </View>
              )}

              {error !== "" && (
                <View className="w-full flex-row items-center bg-[#FCEBE8] rounded-[16px] px-4 py-3 mt-4">
                  <Ionicons
                    name="alert-circle-outline"
                    size={20}
                    color="#A33B36"
                  />

                  <Text className="flex-1 ml-2 text-[#A33B36] text-[14px]">
                    {error}
                  </Text>
                </View>
              )}

              <View className="w-full mt-5">
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

        {/* Bloco opcional de dicas (apenas visual/estático) */}
        <View className="mt-5 flex-row bg-[#EAF3E3] rounded-[20px] px-4 py-4">
          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#438C3B"
          />

          <View className="flex-1 ml-3">
            <Text className="text-[#2F6B28] text-[14px] font-bold">
              Dica de conexão
            </Text>

            <Text className="text-[#4F6B49] text-[13px] mt-1">
              Mantenha o Bluetooth do celular ligado e o
              auxiliador por perto para conectar.
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation
        active="device"
      />
    </View>
  );
}
