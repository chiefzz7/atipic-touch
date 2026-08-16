import React, { useState } from "react";
import { useRouter } from "expo-router";
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Image} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF] overflow-hidden">

      <View
        className="absolute rounded-full bg-[#E5D8B0]"
        style={{
          width: 713,
          height: 670,
          top: 20,
          left: -154,
        }}
      />

      <Text
        className="absolute text-[#3F361E] text-[48px] font-bold italic"
        style={{
          top: 79,
          left: 30,
          width: 449,
        }}
      >
        Bem-Vindo(a)!
      </Text>

<View
  className="absolute w-[92%] self-center items-center bg-[#C6BB9A] rounded-[7px]"
  style={{
    height: 455,
    top: 160,
  }}
>
  <Text
    className="text-white text-[36px] font-bold text-center mt-5"
  >
    Login responsável
  </Text>

<Text
  className="text-white text-[24px] text-center mt-12"
>
  Seu E-mail
</Text>

<TextInput
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
  className="mt-2 w-[90%] h-[53px] rounded-[7px] bg-white px-4 text-[18px]"
/>

<Text
  className="text-white text-[24px] text-center mt-4"
>
  Senha
</Text>

<TextInput
  value={password}
  onChangeText={setPassword}
  secureTextEntry
  className="mt-2 w-[90%] h-[53px] rounded-[7px] bg-white px-4 text-[18px]"
/>

  <TouchableOpacity
    onPress={() => router.push("/child-introduction")}
    className="items-center justify-center rounded-[7px] bg-[#A3987B] w-[260px] h-[83px] mt-[37px]"
  >
    <Text className="text-white text-[34px] font-bold">
      Continuar
    </Text>
  </TouchableOpacity>
</View>

      <Image
  source={require("../../../assets/images/login_brocolis.png")}
  resizeMode="contain"
  className="absolute"
  style={{
    width: 230,
    height: 280,
    bottom: -43,
    left: -30,
  }}
/>

    </SafeAreaView>
  );
}