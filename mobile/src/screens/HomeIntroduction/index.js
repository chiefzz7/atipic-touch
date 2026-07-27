import React from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

export default function HomeIntroduction() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF] overflow-hidden">
      <View
  className="absolute rounded-full bg-[#E5D8B0]"
  style={{
    width: 713,
    height: 756,
    top: -130,
    left: -148,
  }}
/>

      <Image
        source={require("../../../assets/images/introducao_fitas.png")}
        resizeMode="cover"
        className="absolute"
        style={{
          width: 412,
          height: 300,
          top: 0,
          left: 0,
        }}
      />

      <Text
        className="absolute text-center text-white font-semibold"
        style={{
          width: 340,
          fontSize: 48,
          lineHeight: 56,
          top: 145,
          left: 36,
        }}
      >
        Cadastro{"\n"}Finalizado!
      </Text>

      <Text
        className="absolute text-[#555555] text-center font-medium"
        style={{
          width: 280,
          fontSize: 20,
          top: 300,
          left: 66,
        }}
      >
        Perfil criado com sucesso!
      </Text>

      <Text
        className="absolute text-[#555555] text-center"
        style={{
          width: 300,
          fontSize: 18,
          top: 350,
          left: 56,
        }}
      >
        Tudo certo,{" "}
        <Text className="font-semibold">
          João!
        </Text>
      </Text>

      <Text
        className="absolute text-[#555555] text-center justify-end"
        style={{
          width: 318,
          fontSize: 18,
          lineHeight: 28,
          top: 375,
          left: 47,
        }}
      >
        Agora precisamos habilitar o dispositivo auxiliador. Fazendo com que a
        alimentação seja apenas mais uma etapa divertida!
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push("/device")}
        className="absolute items-center justify-center bg-[#A3C78C] rounded-[17px]"
        style={{
          width: 351,
          height: 83,
          left: 31,
          bottom: 300,
        }}
      >
        <Text className="text-white text-[28px] font-bold">
          Ir para tela inicial
        </Text>
      </TouchableOpacity>

      <Image
  source={require("../../../assets/images/home_brocolis.png")}
  resizeMode="contain"
  className="absolute"
  style={{
    width: 280,
    height: 280,
    left: -20,
    bottom: -10,
  }}
/>

        </SafeAreaView>
  );
}