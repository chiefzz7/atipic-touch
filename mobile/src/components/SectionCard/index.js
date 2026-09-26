import React from "react";

import {
  View,
  Text,
} from "react-native";

export default function SectionCard({
  title,
  subtitle,
  children,
}) {
  return (
    <View className="w-full bg-[#E5DCC4] rounded-[10px] px-4 py-5">
      <Text className="text-[20px] font-bold text-[#554B41] text-center">
        {title}
      </Text>

      {subtitle ? (
        <Text className="text-[#80775C] text-[14px] mt-1 text-center">
          {subtitle}
        </Text>
      ) : null}

      <View className="mt-4">
        {children}
      </View>
    </View>
  );
}
