import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ProfileSection({
  title,
  children,

  expandable = false,
  expanded = true,

  rightLabel = "",

  onPress,
}) {

  return (

    <View className="mx-4 mt-5 bg-[#C6BB9A] rounded-[7px] overflow-hidden">

      <TouchableOpacity
        activeOpacity={expandable ? 0.8 : 1}
        disabled={!expandable}
        onPress={onPress}
        className="h-[48px] px-4 flex-row items-center justify-between"
      >

        <View className="flex-row items-center">

          <Ionicons
            name="person-circle-outline"
            size={24}
            color="#FFFCEF"
          />

          <Text className="ml-2 text-white text-[20px] font-bold">
            {title}
          </Text>

        </View>

        {expandable && (

          <View className="flex-row items-center">

            <Text className="text-[#554B41] text-[16px] mr-2">

              {rightLabel}

            </Text>

            <Ionicons
              name={
                expanded
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={20}
              color="#554B41"
            />

          </View>

        )}

      </TouchableOpacity>

      {(!expandable || expanded) && (

        <View className="pb-3">

          {children}

        </View>

      )}

    </View>

  );

}