import React from "react";
import { View, Text } from "react-native";

export default function SectionCard({ title, subtitle, children }) {

  return (

    <View className="flex-1 w-full bg-[#C6BB9A] rounded-[7px] px-4 py-9">
      <Text className="text-[30px] font-bold text-[#554B41]">
        {title}
      </Text>

      {subtitle && (
        <Text className="text-[#80775C] text-lg mt-1">
          {subtitle}
        </Text>
      )}

      <View className="mt-6">
        {children}
      </View>

    </View>
  );
}