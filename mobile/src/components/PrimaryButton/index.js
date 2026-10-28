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
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{
        disabled,
      }}
      className="w-full h-[56px] rounded-[18px] items-center justify-center"
      style={{
        backgroundColor:
          disabled
            ? "#B8B4AA"
            : "#438C3B",
        shadowColor: "#438C3B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: disabled ? 0 : 0.25,
        shadowRadius: 8,
        elevation: disabled ? 0 : 3,
      }}
    >
      <Text className="text-white text-[16px] font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
