import React from "react";

import {
  TouchableOpacity,
  View,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function PowerButton({
  onPress,
  connected = false,
  disabled = false,
}) {
  const buttonColor =
    connected
      ? "#83BF6E"
      : "#F25A4F";

  const iconColor =
    connected
      ? "#3D7C36"
      : "#8F1712";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      className="items-center justify-center"
      style={{
        opacity:
          disabled
            ? 0.75
            : 1,
      }}
    >
      <View
        className="w-[190px] h-[190px] rounded-full items-center justify-center"
        style={{
          backgroundColor:
            "#A3987B",
        }}
      >
        <View
          className="w-[170px] h-[170px] rounded-full items-center justify-center"
          style={{
            backgroundColor:
              buttonColor,
          }}
        >
          <Ionicons
            name="power"
            size={86}
            color={iconColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
