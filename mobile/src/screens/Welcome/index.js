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
  const router =
    useRouter();

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
    buttonTop + 82;

  const circleSize =
    Math.max(
      width * 1.7,
      650
    );

  return (
    <View
      className="flex-1 items-center bg-[#FFFCEF]"
      style={{
        overflow:
          "hidden",

        paddingTop:
          insets.top,

        paddingBottom:
          insets.bottom,
      }}
    >
      <StatusBar
        style="dark"
      />

      <View
        pointerEvents="none"
        className="absolute rounded-full bg-[#E5DCC4]"
        style={{
          width:
            circleSize,

          height:
            circleSize,

          top:
            height *
            0.1,

          left:
            (
              width -
              circleSize
            ) /
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
          position:
            "absolute",

          width:
            imageSize,

          height:
            imageSize,

          top:
            imageTop,

          borderRadius:
            imageSize /
            2,
        }}
      />

      <TouchableOpacity
        activeOpacity={
          0.85
        }
        className="absolute h-[72px] bg-[#83BF6E] items-center justify-center rounded-[10px]"
        style={{
          width:
            buttonWidth,

          top:
            buttonTop,
        }}
        onPress={() =>
          router.push(
            "/register"
          )
        }
      >
        <Text className="text-white text-[22px] font-bold">
          Criar minha conta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={
          0.7
        }
        className="absolute items-center"
        style={{
          top:
            loginTop,
        }}
        onPress={() =>
          router.push(
            "/login"
          )
        }
      >
        <Text className="text-[#80775C] text-[18px]">
          Já tem uma conta?{" "}

          <Text className="font-bold text-[#4D9B43]">
            Entrar
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
