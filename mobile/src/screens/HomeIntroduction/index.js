import React from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import ScreenContainer from "../../components/ScreenContainer";

export default function HomeIntroduction() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 750;
  const broccoliSize = Math.min(width * 0.72, 280);

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">
      <ScreenContainer>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 20 }}
        >

          <View
            className="absolute rounded-full bg-[#E5D8B0]"
            style={{ width: Math.max(width * 1.75, 700), height: isSmallScreen ? 650 : 720, top: -130, left: -(Math.max(width * 1.75, 700) - width) / 2 }}
          />

          <Image
            source={require("../../../assets/images/introducao_fitas.png")}
            resizeMode="cover"
            className="absolute"
            style={{ width: width, height: isSmallScreen ? 270 : 300, top: 0, left: 0 }}
          />

          <View className="items-center pt-[60px]">

            <Text
              className={`text-center text-white font-semibold ${isSmallScreen ? "text-[42px]" : "text-[48px]"}`}
              style={{ lineHeight: isSmallScreen ? 48 : 56 }}
            >
              Cadastro{"\n"}Finalizado!
            </Text>

            <Text
              className={`text-[#555555] text-center font-medium mt-8 ${isSmallScreen ? "text-[18px]" : "text-[20px]"}`}
            >
              Perfil criado com sucesso!
            </Text>

            <Text className={`text-[#555555] text-center mt-4 ${isSmallScreen ? "text-[17px]" : "text-[18px]"}`}>
              Tudo certo, <Text className="font-semibold">Maria!</Text>
            </Text>

            <Text
              className={`text-[#555555] text-center mt-2 ${isSmallScreen ? "text-[17px]" : "text-[18px]"}`}
              style={{ lineHeight: isSmallScreen ? 24 : 28 }}
            >
              Agora precisamos habilitar o dispositivo auxiliador. Fazendo com que a alimentação seja apenas mais uma etapa divertida!
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/device")}
              className="w-full items-center justify-center bg-[#A3C78C] rounded-[17px]"
              style={{ height: isSmallScreen ? 68 : 76, marginTop: isSmallScreen ? 24 : 34 }}
            >
              <Text className={`text-white font-bold ${isSmallScreen ? "text-[22px]" : "text-[26px]"}`}>
                Ir para tela inicial
              </Text>
            </TouchableOpacity>

          </View>

          <View className="flex-1 items-start justify-end">
            <Image
              source={require("../../../assets/images/home_brocolis.png")}
              resizeMode="contain"
              style={{ width: broccoliSize, height: broccoliSize, marginLeft: -70, marginBottom: -20 }}
            />
          </View>

        </ScrollView>

      </ScreenContainer>
    </SafeAreaView>
  );
}