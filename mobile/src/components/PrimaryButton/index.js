import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className="w-[full] h-[55px] rounded-[7px] items-center justify-center"
      style={{
        backgroundColor: disabled ? "#979388" : "#A3C78C",
      }}
    >
      <Text className="text-white text-[15px] font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}