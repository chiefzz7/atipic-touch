import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmotionSelector({
  selected,
  onSelect,
}) {
  const emotions = [
  {
    value: "Amei",
    label: "Amei",
    icon: "happy",
    color: "#59C36A",
  },
  {
    value: "Neutro",
    label: "Neutro",
    icon: "remove-circle",
    color: "#F2C94C",
  },
  {
    value: "Não gostei",
    label: "Não gostei",
    icon: "sad",
    color: "#EB5757",
  },
];

  return (
    <View className="bg-[#FFFCEF] rounded-[7px] p-5">

      <Text className="text-xl font-bold text-[#554B41] mb-5">
        Como foi a experiência?
      </Text>

      <View className="flex-row justify-around">

        {emotions.map((emotion) => (
          <TouchableOpacity
            key={emotion.value}
            activeOpacity={0.8}
            onPress={() => onSelect(emotion.value)}
            className="items-center"
          >
            <View
              className={`w-[72px] h-[72px] rounded-full items-center justify-center ${
                selected === emotion.value
                  ? "border-[3px] border-[#7B5E3B]"
                  : ""
              }`}
              style={{
                backgroundColor: "#F7F2E8",
              }}
            >
              <Ionicons
                name={emotion.icon}
                size={42}
                color={emotion.color}
              />
            </View>

            <Text className="text-[#554B41] mt-2 text-sm font-medium">
              {emotion.label}
            </Text>

          </TouchableOpacity>
        ))}

      </View>

    </View>
  );
}