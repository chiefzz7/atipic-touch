// src/screens/ChildRegister/index.js
import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ChildRegister() {
  const [sexo, setSexo] = useState(null);
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

      {/* Progresso */}
      <View className="mb-6">

        <Text className="text-[#7A7A7A] text-sm font-medium mb-2">
          Passo 2 de 2
        </Text>

        <View className="w-full h-2 bg-[#E8E3D7] rounded-full overflow-hidden">

          <View
            className="h-full w-full bg-[#A3C78C] rounded-full"
          />

        </View>

      </View>


      {/* Card Foto */}

      <View
        className="bg-white rounded-[28px] items-center justify-center shadow-sm mb-6"
        style={{
          height: 230,
        }}
      >

        <View
          className="w-[120px] h-[120px] rounded-full bg-[#F2F0E8] items-center justify-center"
        >

          <Ionicons
            name="person"
            size={70}
            color="#A3A3A3"
          />

        </View>


        {/* Botão câmera */}

        <TouchableOpacity
          className="absolute right-[75px] bottom-[45px] w-[48px] h-[48px] bg-[#A3C78C] rounded-full items-center justify-center"
          activeOpacity={0.8}
        >

          <Ionicons
            name="camera"
            size={24}
            color="#FFFFFF"
          />

        </TouchableOpacity>


      </View>



      {/* Formulário */}

      <View
        className="bg-white rounded-[28px] px-5 py-6 shadow-sm"
      >

        <Text
          className="text-[#404040] text-lg font-semibold mb-5"
        >
          Dados da criança
        </Text>



        {/* Nome */}

        <Text
          className="text-[#555555] text-sm mb-2"
        >
          Nome Completo
        </Text>


        <TextInput
          className="w-full h-[52px] bg-[#FAF8F1] rounded-2xl px-4 mb-4 text-[#444]"
          placeholder="Digite o nome completo"
          placeholderTextColor="#A7A7A7"
        />



        {/* Data */}

        <Text
          className="text-[#555555] text-sm mb-2"
        >
          Data de nascimento
        </Text>


        <TextInput
          className="w-full h-[52px] bg-[#FAF8F1] rounded-2xl px-4 mb-4 text-[#444]"
          placeholder="dd/mm/aaaa"
          placeholderTextColor="#A7A7A7"
          keyboardType="numeric"
        />



        {/* Sexo */}

        <Text
          className="text-[#555555] text-sm mb-3"
        >
          Sexo
        </Text>


        <View className="flex-row justify-between mb-5">


          <TouchableOpacity
            onPress={() => setSexo("masculino")}
            className={`w-[44%] h-[75px] rounded-2xl items-center justify-center border ${
              sexo === "masculino"
                ? "border-[#A3C78C] bg-[#F1F8EC]"
                : "border-[#E7E2D8]"
            }`}
          >

            <Image
              source={require("../../../assets/images/masculino_sexo.png")}
              className="w-[24px] h-[25px] mb-1"
              resizeMode="cover"
            />

            <Text className="text-[#555] text-sm">
              Masculino
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSexo("feminino")}
            className={`w-[44%] h-[75px] rounded-2xl items-center justify-center border ${
              sexo === "feminino"
                ? "border-[#A3C78C] bg-[#F1F8EC]"
                : "border-[#E7E2D8]"
            }`}
          >

            <Image
              source={require("../../../assets/images/feminino_sexo.png")}
              className="w-[24px] h-[25px] mb-1"
              resizeMode="cover"
            />

            <Text className="text-[#555] text-sm">
              Feminino
            </Text>

          </TouchableOpacity>


        </View>


        {/* restricoes */}
<Text
          className="text-[#555555] text-sm mb-2"
        >
          Restrições
        </Text>


        <TextInput
          className="w-full h-[100px] bg-[#FAF8F1] rounded-2xl px-4 py-3 text-[#444]"
          placeholder="Se houver, insira as restrições..."
          placeholderTextColor="#A7A7A7"
          multiline
          textAlignVertical="top"
        />
    {/* Observações */}

        <Text
          className="text-[#555555] text-sm mb-2"
        >
          Observações
        </Text>


        <TextInput
          className="w-full h-[100px] bg-[#FAF8F1] rounded-2xl px-4 py-3 text-[#444]"
          placeholder="Digite alguma observação..."
          placeholderTextColor="#A7A7A7"
          multiline
          textAlignVertical="top"
        />

        {/* Salvar */}

        <TouchableOpacity
          onPress={() => router.push("/home-introduction")}
          className="w-full h-[55px] bg-[#A3C78C] rounded-2xl items-center justify-center mt-6"
          activeOpacity={0.85}
        >

          <Text
            className="text-white font-semibold text-base"
          >
            Salvar
          </Text>

        </TouchableOpacity>


      </View>


        </ScrollView>

  </View>
);
}