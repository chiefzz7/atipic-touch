
import React from "react";
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView,
} from "react-native";

export default function RegisterScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">

      <View className="items-center mt-[35px]">

        <View className="w-[338px] h-[8px] rounded-full bg-[#EDE8D0] overflow-hidden">
          <View className="w-1/2 h-full bg-[#6B5A2A]" />
        </View>

        <Text className="mt-4 text-[24px] text-[#574A24] font-normal">
          Passo 1 de 2.
        </Text>

      </View>

      <View className="self-center mt-5 w-[355px] h-[670px] rounded-[7px] bg-[#C6BB9A]">

        <Text className="mt-5 text-center text-[32px] font-bold text-white">
          Cadastro responsável
        </Text>

        <Text className="mt-7 text-center text-[24px] text-white">
          Seu Nome (ou apelido)
        </Text>

        <TextInput
          className="self-center mt-3 w-[321px] h-[49px] rounded-[7px] bg-white px-4 text-[18px]"
        />

        <Text className="mt-2 text-center text-[24px] text-white">
          Seu E-mail
        </Text>

        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          className="self-center mt-3 w-[321px] h-[50px] rounded-[7px] bg-white px-4 text-[18px]"
        />

        <Text className="mt-2 text-center text-[24px] text-white">
          Crie uma senha
        </Text>

        <TextInput
          secureTextEntry
          className="self-center mt-3 w-[321px] h-[50px] rounded-[7px] bg-white px-4 text-[18px]"
        />

        <Text className="mt-2 text-center text-[24px] text-white">
          Confirme sua senha
        </Text>

        <TextInput
          secureTextEntry
          className="self-center mt-3 w-[321px] h-[49px] rounded-[7px] bg-white px-4 text-[18px]"
        />

        <TouchableOpacity
          className="self-center mt-9 w-[329px] h-[72px] rounded-[7px] bg-[#A3987B] items-center justify-center">
          <Text className="text-[36px] font-bold text-white">
            Continuar
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}