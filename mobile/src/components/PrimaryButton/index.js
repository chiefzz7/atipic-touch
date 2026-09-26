import React from "react";

import {
  TouchableOpacity,
  Text,
} from "react-native";

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
      accessibilityState={{
        disabled,
      }}
      className="w-full h-[54px] rounded-[10px] items-center justify-center"
      style={{
        backgroundColor:
          disabled
            ? "#B8B4AA"
            : "#83BF6E",
      }}
    >
      <Text className="text-white text-[16px] font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
