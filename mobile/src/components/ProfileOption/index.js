import React from "react";

import {
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function ProfileOption({
  icon,
  title,
  value,
  type = "default",
  onPress,
  onValueChange,
}) {
  return (
    <TouchableOpacity
      activeOpacity={
        type === "switch"
          ? 1
          : 0.85
      }
      disabled={
        type ===
        "switch"
      }
      onPress={
        onPress
      }
      className="min-h-[54px] bg-[#F7F0DC] border border-[#DDD3B9] rounded-[10px] px-4 mb-2 flex-row items-center"
    >
      <Ionicons
        name={icon}
        size={22}
        color="#806A42"
      />

      <Text className="ml-3 flex-1 text-[#554B41] text-[16px] font-medium">
        {title}
      </Text>

      {type ===
      "switch" ? (
        <Switch
          value={
            value
          }
          onValueChange={
            onValueChange
          }
          trackColor={{
            false:
              "#D9D9D9",
            true:
              "#A3C78C",
          }}
          thumbColor="#FFFCEF"
        />
      ) : (
        <>
          {!!value && (
            <Text
              numberOfLines={
                1
              }
              className="max-w-[48%] text-[#80775C] text-[14px] mr-2"
            >
              {value}
            </Text>
          )}

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#A3987B"
          />
        </>
      )}
    </TouchableOpacity>
  );
}
