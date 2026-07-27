import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";

export default function InteractionItem({
  label,
  color,
  image,
  selected = false,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="items-center mr-4"
    >
      <View
        className={`w-[58px] h-[58px] rounded-full items-center justify-center ${
          selected ? "border-[3px] border-[#7B5E3B]" : ""
        }`}
        style={{
          backgroundColor: image ? "#F4F0E5" : color,
        }}
      >
        {image && (
          <>
            {/*
            <Image
              source={image}
              className="w-12 h-12"
              resizeMode="contain"
            />
            */}
          </>
        )}
      </View>

      <Text
        className="text-[#554B41] text-[11px] mt-2 text-center"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}