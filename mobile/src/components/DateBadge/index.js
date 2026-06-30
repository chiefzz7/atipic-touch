import React from "react";
import { View, Text } from "react-native";

export default function DateBadge({
  date = "Hoje, 30 de Junho",
}) {
  return (
    <View className="items-center mb-6">
      <Text className="text-[#554B41] text-base font-bold">
        {date}
      </Text>
    </View>
  );
}