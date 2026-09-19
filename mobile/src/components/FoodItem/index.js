import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FoodItem({ title, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="w-full h-[72px] bg-[#B9AE8D] rounded-[7px] flex-row items-center px-4 mb-4"
    >
      <View className="w-[56px] h-[56px] rounded-full bg-[#9D9276] items-center justify-center">
        <Ionicons
          name="restaurant-outline"
          size={30}
          color="#FFFCEF"
        />
      </View>

      <Text className="flex-1 ml-4 text-white text-[22px] font-semibold">
        {title}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={34}
        color="#5E543E"
      />
    </TouchableOpacity>
  );
}