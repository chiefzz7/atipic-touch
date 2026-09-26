import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function ProfileSection({
  title,
  children,
  expandable = false,
  expanded = true,
  rightLabel = "",
  onPress,
}) {
  return (
    <View className="mt-4 bg-[#E5DCC4] rounded-[10px] overflow-hidden">
      <TouchableOpacity
        activeOpacity={
          expandable
            ? 0.8
            : 1
        }
        disabled={
          !expandable
        }
        onPress={
          onPress
        }
        className="min-h-[52px] px-4 flex-row items-center justify-between"
      >
        <View className="flex-1 flex-row items-center">
          <Ionicons
            name="person-circle-outline"
            size={24}
            color="#554B41"
          />

          <Text
            numberOfLines={
              1
            }
            className="flex-1 ml-2 text-[#554B41] text-[18px] font-bold"
          >
            {title}
          </Text>
        </View>

        {expandable && (
          <View className="flex-row items-center ml-2">
            <Text className="text-[#80775C] text-[12px] mr-2">
              {rightLabel}
            </Text>

            <Ionicons
              name={
                expanded
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={17}
              color="#554B41"
            />
          </View>
        )}
      </TouchableOpacity>

      {(
        !expandable ||
        expanded
      ) && (
        <View className="pb-3 px-3">
          {children}
        </View>
      )}
    </View>
  );
}
