import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import ScreenContainer from "../../components/ScreenContainer";

export default function ChildIntroductionScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 750;
  const artWidth = Math.min(width, 412);
  const artHeight = isSmallScreen ? 275 : 315;
  const broccoliSize = Math.min(width * 0.53, 216);

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">
      <ScreenContainer>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: isSmallScreen ? 18 : 28, paddingBottom: 30 }}
        >

          <View
            className="absolute rounded-full bg-[#E5D8B0]"
            style={{ width: Math.max(width * 1.75, 700), height: isSmallScreen ? 680 : 730, top: -40, left: -(Math.max(width * 1.75, 700) - width) / 2 }}
          />

          <View className="w-full items-center">
            <View className="w-full h-[8px] bg-white rounded-full overflow-hidden">
              <View className="h-full bg-[#6F5A22] rounded-full" style={{ width: "48%" }} />
            </View>

            <Text className="text-[#574A24] text-[20px] mt-2">
              Passo 1 de 2.
            </Text>
          </View>

          <Text className={`text-white text-center font-normal ${isSmallScreen ? "text-[48px]" : "text-[56px]"}`}>
            Boas-Vindas!
          </Text>

          <View
            className="w-full items-center relative"
            style={{ height: artHeight, marginTop: isSmallScreen ? 4 : 8 }}
          >

            <Image
              source={require("../../../assets/images/introducao_fitas.png")}
              resizeMode="contain"
              style={{ position: "absolute", width: artWidth, height: artHeight, top: 0 }}
            />

            <Image
              source={require("../../../assets/images/introducao_brocolis.png")}
              resizeMode="contain"
              style={{ position: "absolute", width: broccoliSize, height: broccoliSize * 1.09, bottom: isSmallScreen ? -2 : 0 }}
            />

          </View>

          <View className="mt-2">
            <Text className={`text-white ${isSmallScreen ? "text-[20px]" : "text-[22px]"}`}>
              Tudo certo, Maria.
            </Text>

            <Text
              className={`text-[#80775C] mt-2 ${isSmallScreen ? "text-[19px]" : "text-[21px]"}`}
              style={{ lineHeight: isSmallScreen ? 25 : 28 }}
            >
              Agora precisamos conhecer um pouquinho de quem mais vai usar nosso pianinho mágico...
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/child-register")}
            className="w-full items-center justify-center rounded-[7px] bg-[#A3987B]"
            style={{ height: isSmallScreen ? 68 : 76, marginTop: isSmallScreen ? 28 : 38 }}
          >
            <Text className={`text-white font-bold ${isSmallScreen ? "text-[20px]" : "text-[22px]"}`}>
              cadastrar criança
            </Text>
          </TouchableOpacity>

        </ScrollView>

      </ScreenContainer>
    </SafeAreaView>
  );
}