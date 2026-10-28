import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ChildAdd() {
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

        <TouchableOpacity
          className="absolute right-[75px] bottom-[45px] w-[48px] h-[48px] bg-[#438C3B] rounded-full items-center justify-center"
          activeOpacity={0.8}
        >

          <Ionicons
            name="camera"
            size={24}
            color="#FFFFFF"
          />

        </TouchableOpacity>


      </View>

      <View
        className="bg-white rounded-[28px] px-5 py-6 shadow-sm"
      >

        <Text
          className="text-[#554B41] text-lg font-semibold mb-5"
        >
          Dados da criança
        </Text>


        <Text
          className="text-[#554B41] text-sm mb-2"
        >
          Nome Completo
        </Text>


        <TextInput
          className="w-full h-[52px] bg-[#FBF8EE] border border-[#E7DFC6] rounded-[16px] px-4 mb-4 text-[#554B41]"
          placeholder="Digite o nome completo"
          placeholderTextColor="#A3987B"
        />


        <Text
          className="text-[#554B41] text-sm mb-2"
        >
          Data de nascimento
        </Text>


        <TextInput
          className="w-full h-[52px] bg-[#FBF8EE] border border-[#E7DFC6] rounded-[16px] px-4 mb-4 text-[#554B41]"
          placeholder="dd/mm/aaaa"
          placeholderTextColor="#A3987B"
          keyboardType="numeric"
        />


        <Text
          className="text-[#554B41] text-sm mb-3"
        >
          Sexo
        </Text>


        <View className="flex-row justify-between mb-5">


          <TouchableOpacity
            onPress={() => setSexo("masculino")}
            className={`w-[44%] h-[75px] rounded-[16px] items-center justify-center border ${
              sexo === "masculino"
                ? "border-[#438C3B] bg-[#EDF6E8]"
                : "border-[#E7DFC6] bg-[#FBF8EE]"
            }`}
          >

            <Image
              source={require("../../../assets/images/masculino_sexo.png")}
              className="w-[24px] h-[25px] mb-1"
              resizeMode="cover"
            />

            <Text className="text-[#554B41] text-sm">
              Masculino
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSexo("feminino")}
            className={`w-[44%] h-[75px] rounded-[16px] items-center justify-center border ${
              sexo === "feminino"
                ? "border-[#438C3B] bg-[#EDF6E8]"
                : "border-[#E7DFC6] bg-[#FBF8EE]"
            }`}
          >

            <Image
              source={require("../../../assets/images/feminino_sexo.png")}
              className="w-[24px] h-[25px] mb-1"
              resizeMode="cover"
            />

            <Text className="text-[#554B41] text-sm">
              Feminino
            </Text>

          </TouchableOpacity>


        </View>


<Text
          className="text-[#554B41] text-sm mb-2"
        >
          Restrições
        </Text>


        <TextInput
          className="w-full h-[100px] bg-[#FBF8EE] border border-[#E7DFC6] rounded-[16px] px-4 py-3 text-[#554B41]"
          placeholder="Se houver, insira as restrições..."
          placeholderTextColor="#A3987B"
          multiline
          textAlignVertical="top"
        />

        <Text
          className="text-[#554B41] text-sm mb-2"
        >
          Observações
        </Text>


        <TextInput
          className="w-full h-[100px] bg-[#FBF8EE] border border-[#E7DFC6] rounded-[16px] px-4 py-3 text-[#554B41]"
          placeholder="Digite alguma observação..."
          placeholderTextColor="#A3987B"
          multiline
          textAlignVertical="top"
        />


        <TouchableOpacity
          className="w-full h-[55px] bg-[#438C3B] rounded-[16px] items-center justify-center mt-6"
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