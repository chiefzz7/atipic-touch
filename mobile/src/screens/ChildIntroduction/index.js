import React from "react";
import {SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import { useRouter } from "expo-router";

export default function ChildIntroductionScreen() {
  const router = useRouter();
  return (
  <View className="flex-1 bg-[#FFFCEF]">

    <ScrollView
      className="flex-1 px-6 pt-10"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 40
      }}
    >

      <View
        className="absolute rounded-full bg-[#E5D8B0]"
        style={{
          width: 713,
          height: 756,
          top: -39,
          left: -141,
        }}
      />

      <View
        className="absolute bg-white rounded-full"
        style={{
          width: 351,
          height: 10,
          top: 42,
          left: 28,
        }}
      >
        <View
          className="bg-[#6F5A22] rounded-full"
          style={{
            width: 170,
            height: 10,
          }}
        />
      </View>

      <Text
        className="absolute text-[#574A24] text-[24px]"
        style={{
          top: 58,
          alignSelf: "center",
        }}
      >
        Passo 1 de 2.
      </Text>

      <Text
        className="absolute text-white text-[64px]"
        style={{
          top: 95,
          alignSelf: "center",
        }}
      >
        Boas-Vindas!
      </Text>

      <Image
        source={require("../../../assets/images/introducao_fitas.png")}
        resizeMode="contain"
        className="absolute"
        style={{
          width: 418,
          height: 348,
          top: 163,
          left: -5,
        }}
      />

      <Image
        source={require("../../../assets/images/introducao_brocolis.png")}
        resizeMode="contain"
        className="absolute"
        style={{
          width: 216,
          height: 235,
          top: 288,
          left: 98,
          zIndex: 2,
        }}
      />

      <Text
        className="absolute text-white text-[24px]"
        style={{
          top: 546,
          left: 15,
        }}
      >
        Tudo certo, (nome do responsável).
      </Text>

      <Text
        className="absolute text-[#80775C] text-[24px]"
        style={{
          width: 385,
          top: 590,
          left: 15,
          lineHeight: 30,
        }}
      >
        Agora precisamos conhecer um pouquinho de quem mais vai usar nosso pianinho mágico...
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/child-register")}
        className="absolute items-center justify-center rounded-[7px] bg-[#A3987B]"
        style={{
          width: 351,
          height: 83,
          top: 778,
          left: 30,
          zIndex: 10,
        }}
      >
        <Text className="text-white text-[24px] font-bold">
          cadastrar criança
        </Text>
      </TouchableOpacity>
    </ScrollView>

  </View>
);
}