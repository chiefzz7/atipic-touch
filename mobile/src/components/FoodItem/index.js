import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function FoodItem({
  title,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={
        0.85
      }
      onPress={
        onPress
      }
      className="w-full min-h-[64px] bg-[#C6BB9A] rounded-[10px] flex-row items-center px-3 mb-3"
    >
      <View className="w-[46px] h-[46px] rounded-full bg-[#A3987B] items-center justify-center">
        <Ionicons
          name="restaurant-outline"
          size={24}
          color="#FFFCEF"
        />
      </View>

      <Text
        numberOfLines={
          1
        }
        className="flex-1 ml-3 text-[#554B41] text-[18px] font-bold"
      >
        {title}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={24}
        color="#554B41"
      />
    </TouchableOpacity>
  );
}
