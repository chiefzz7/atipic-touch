import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function FoodSearch({value,onChangeText,onAddPress,}) 
{
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between mb-5">

      <View className="flex-1 flex-row items-center bg-white rounded-[7px] h-[48px] px-3 mr-3 border border-[#A3987B]">

        <Ionicons
          name="search"
          size={20}
          color="#80775C"
        />

        <TextInput
          className="flex-1 ml-2 text-[#554B41]"
          placeholder="Buscar alimento..."
          placeholderTextColor="#B5AE9D"
          value={value}
          onChangeText={onChangeText}
        />

      </View>

      <TouchableOpacity
  activeOpacity={0.8}
  onPress={() => router.push("/edit-food-form")}
  className="items-center"
>

  <View className="w-[42px] h-[42px] rounded-[7px] bg-[#83BF6E] items-center justify-center">
    <Ionicons
      name="add"
      size={30}
      color="#FFFCEF"
    />
  </View>

  <Text className="text-[#83BF6E] text-[12px] mt-1">
    Adicionar
  </Text>

</TouchableOpacity>

    </View>
  );
}