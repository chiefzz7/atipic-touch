import React from "react";

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useRouter,
} from "expo-router";

export default function FoodSearch({
  value,
  onChangeText,
  onAddPress,
}) {
  const router =
    useRouter();

  return (
    <View className="flex-row items-center mb-4">
      <View className="flex-1 flex-row items-center bg-white rounded-[10px] h-[50px] px-3 mr-3 border border-[#C6BB9A]">
        <Ionicons
          name="search"
          size={20}
          color="#80775C"
        />

        <TextInput
          className="flex-1 ml-2 text-[#554B41] text-[15px]"
          placeholder="Buscar alimento..."
          placeholderTextColor="#B5AE9D"
          value={
            value
          }
          onChangeText={
            onChangeText
          }
        />
      </View>

      <TouchableOpacity
        activeOpacity={
          0.8
        }
        onPress={() =>
          router.push(
            "/food-register"
          )
        }
        className="items-center justify-center"
      >
        <View className="w-[48px] h-[48px] rounded-[10px] bg-[#83BF6E] items-center justify-center">
          <Ionicons
            name="add"
            size={28}
            color="#FFFCEF"
          />
        </View>

        <Text className="text-[#4D9B43] text-[11px] font-medium mt-1">
          Adicionar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
