import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import ImagePicker from "../../components/ImagePicker";
import PrimaryButton from "../../components/PrimaryButton";

export default function EditFoodFormScreen() {
  const router = useRouter();

  const { variant = "create" } = useLocalSearchParams();
  const isEdit = variant === "edit";

  const [food, setFood] = useState({
    name: "",
    image: null,
  });


  function handleSave() {
    console.log(food);

    router.back();
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">

      <View className="flex-1 px-5 pt-6">

        {/* Voltar */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          className="mb-6"
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="#6E6246"
          />
        </TouchableOpacity>

        <View className="flex-1 bg-[#C6BB9A] rounded-[7px] px-5 py-6">

          <ImagePicker
            image={food.image}
            title="Adicionar imagem"
            onChange={(image) =>
              setFood((previous) => ({
                ...previous,
                image,
              }))
            }
          />

          <View className="mt-8">

            <Text className="text-white font-semibold text-base mb-2">
              Nome do alimento
            </Text>

            <TextInput
              value={food.name}
              onChangeText={(text) =>
                setFood((previous) => ({
                  ...previous,
                  name: text,
                }))
              }
              placeholder="Digite o nome do alimento..."
              placeholderTextColor="#A8A8A8"
              className="bg-white rounded-[7px] h-[52px] px-4 text-[#444]"
            />

          </View>

          <View className="flex-1 justify-end">

            <PrimaryButton
              title={
                isEdit
                  ? "Salvar alterações"
                  : "Cadastrar alimento"
              }
              onPress={handleSave}
            />

          </View>

        </View>

      </View>

    </SafeAreaView>
  );
}