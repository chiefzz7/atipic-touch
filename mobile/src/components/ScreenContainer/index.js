import React from "react";
import { View } from "react-native";

export default function ScreenContainer({ children }) {
  return (
    <View className="flex-1 w-full items-center bg-[#FFFCEF]">
      <View className="flex-1 w-full max-w-[600px]">
        {children}
      </View>
    </View>
  );
}