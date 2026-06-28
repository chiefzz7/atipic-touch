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
        className="absolute bg-[#C6BB9A] rounded-[7px] align-items-center "
        style={{
          width: 360,
          height: 455,
          top: 160,
          left: 16,
        }}
      >

        <Text
          className="text-white text-[36px] font-bold"
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Login responsável
        </Text>

        <Text
          className="text-white text-[24px]"
          style={{
            marginTop: 48,
            textAlign: "center",
          }}
        >
          Seu E-mail
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="self-center mt-2 w-[343px] h-[53px] rounded-[7px] bg-white px-4 text-[18px]"
        />

        <Text
          className="text-white text-[24px]"
          style={{
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Senha
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="self-center mt-2 w-[343px] h-[53px] rounded-[7px] bg-white px-4 text-[18px]"
        />

        <TouchableOpacity
          onPress={() => router.push("/child-introduction")}
          className="self-center items-center justify-center rounded-[7px] bg-[#A3987B]"
          style={{
            width: 260,
            height: 83,
            marginTop: 37,
          }}
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
    zIndex: 1,
  }}
/>

    </SafeAreaView>
  );
}