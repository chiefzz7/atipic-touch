import React from "react";
import { View, Text } from "react-native";

export default function StatusCard({ children }) {
  return (
    <View className="w-full bg-[#C6BB9A] rounded-[7px] px-4 py-5">

      <Text
        className="text-[24px] font-semibold text-[#554B41]"
      >
        Status do dispositivo auxiliador
      </Text>

      <View className="items-center mt-10">
        {children}
      </View>

    </View>
  );
}