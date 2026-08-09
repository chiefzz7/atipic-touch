import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

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
      activeOpacity={type === "switch" ? 1 : 0.85}
      disabled={type === "switch"}
      onPress={onPress}
      className="
        h-[52px]
        bg-[#B9AE8D]
        rounded-[7px]
        px-4
        mb-2
        flex-row
        items-center
      "
    >

      <Ionicons
        name={icon}
        size={24}
        color="#FFFCEF"
      />

      <Text
        className="
          ml-3
          flex-1
          text-white
          text-[18px]
        "
      >
        {title}
      </Text>

      {type === "switch" ? (

        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: "#D9D9D9",
            true: "#FFFFFF",
          }}
          thumbColor="#6E6246"
        />

      ) : (

        <>
          {!!value && (

            <Text
              numberOfLines={1}
              className="
                text-white
                text-[16px]
                mr-3
              "
            >
              {value}
            </Text>

          )}

          <Ionicons
            name="chevron-forward"
            size={24}
            color="#FFFCEF"
          />

        </>

      )}

    </TouchableOpacity>

  );
}