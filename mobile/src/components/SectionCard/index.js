import React from "react";
import { View, Text } from "react-native";

export default function SectionCard({ title, subtitle, children }) {

  return (

    <View className="flex-0 w-full bg-[#E5DCC4] rounded-[7px] px-4 py-7">
      <Text className="text-[20px] font-bold text-[#fff] text-center">
        {title}
      </Text>

      {subtitle && (
        <Text className="text-[#80775C] text-lg mt-1 text-center">
          {subtitle}
        </Text>
      )}

      <View className="mt-2">
        {children}
      </View>

    </View>
  );
}