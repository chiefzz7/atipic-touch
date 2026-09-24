import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  StatusBar,
} from "expo-status-bar";

import {
  useRouter,
} from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  const insets =
    useSafeAreaInsets();

  const {
    width,
    height,
  } = useWindowDimensions();

  const imageSize =
    Math.min(
      width * 0.82,
      335
    );

  const imageTop =
    height * 0.18;

  const buttonWidth =
    Math.min(
      width * 0.85,
      350
    );

  const buttonTop =
    Math.min(
      height * 0.66,
      height - 210
    );

  const loginTop =
    buttonTop + 87;

  // Círculo real:
  // largura e altura iguais.
  const circleSize =
    Math.max(
      width * 1.7,
      650
    );

  return (
    <View
      className="flex-1 items-center bg-[#FFFCEF]"
      style={{
        overflow: "hidden",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar
        style="dark"
      />

      <View
        className="absolute rounded-full bg-[#E5D8B0]"
        pointerEvents="none"
        style={{
          width: circleSize,
          height: circleSize,
          top: height * 0.10,
          left:
            (width - circleSize) /
            2,
        }}
      />

      <Image
        source={require(
          "../../../assets/images/welcome_brocolis.png"
        )}
        resizeMode="contain"
        pointerEvents="none"
        style={{
          position: "absolute",
          width: imageSize,
          height: imageSize,
          top: imageTop,
          borderRadius:
            imageSize / 2,
        }}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        className="absolute h-[83px] bg-[#D8C792] items-center justify-center rounded-[7px]"
        style={{
          width: buttonWidth,
          top: buttonTop,
        }}
        onPress={() =>
          router.push(
            "/register"
          )
        }
      >
        <Text className="text-white text-[24px] font-bold">
          Criar minha conta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        className="absolute items-center"
        style={{
          top: loginTop,
        }}
        onPress={() =>
          router.push(
            "/login"
          )
        }
      >
        <Text className="text-[#6E6246] text-[18px]">
          Já tem uma conta?{" "}

          <Text className="font-bold">
            Entrar
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
