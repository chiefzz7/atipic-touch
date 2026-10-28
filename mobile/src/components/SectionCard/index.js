import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function SectionCard({
  title,
  subtitle,
  icon,
  children,
}) {
  return (
    <View
      className="w-full bg-white rounded-[24px] px-5 py-5 border border-[#EFE7D0]"
      style={{
        shadowColor: "#554B41",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      <View className="flex-row items-center">
        {icon ? (
          <View className="w-[36px] h-[36px] rounded-[12px] bg-[#EAF3E3] items-center justify-center mr-3">
            <Ionicons
              name={icon}
              size={20}
              color="#438C3B"
            />
          </View>
        ) : null}

        <View className="flex-1">
          <Text className="text-[18px] font-bold text-[#554B41]">
            {title}
          </Text>

          {subtitle ? (
            <Text className="text-[#80775C] text-[13px] mt-0.5">
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      <View className="mt-4">
        {children}
      </View>
    </View>
  );
}
