import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      className="w-full h-[83px] rounded-[7px] items-center justify-center"
      style={{
        backgroundColor: disabled ? "#979388" : "#A3C78C",
      }}
    >
      <Text className="text-white text-[22px] font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}