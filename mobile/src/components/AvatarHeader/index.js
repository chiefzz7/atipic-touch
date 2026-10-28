import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function AvatarHeader({
  variant = "device",
  greeting = "Bom dia",
  childName = "Criança",
  age = "",
  hasNotification = false,
  onNotificationPress,
  onMenuPress,
}) {
  return (
    <View
      className="w-full min-h-[112px] bg-[#4F7A44] rounded-[28px] px-4 py-4 mt-4 mb-4 flex-row items-center"
      style={{
        shadowColor: "#2F4A29",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 14,
        elevation: 4,
      }}
    >
      <View className="w-[76px] h-[76px] rounded-full bg-white/25 items-center justify-center">
        <View className="w-[64px] h-[64px] rounded-full bg-[#E8F1DF] items-center justify-center">
          <Ionicons
            name="person"
            size={36}
            color="#4F7A44"
          />
        </View>
      </View>

      <View className="flex-1 ml-4">
        {variant === "dashboard" ? (
          <>
            <Text className="text-[#EAF4E0] font-semibold text-[15px]">
              {greeting},
            </Text>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              className="text-white text-[24px] font-bold mt-0.5"
            >
              {childName}!
            </Text>
          </>
        ) : (
          <>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              className="text-white text-[24px] font-bold"
            >
              {childName}
            </Text>

            {age ? (
              <View className="self-start bg-white/20 rounded-full px-3 py-0.5 mt-1.5">
                <Text className="text-white text-[14px] font-semibold">
                  {age}
                </Text>
              </View>
            ) : null}
          </>
        )}
      </View>

      <View className="items-center ml-2">
        <View className="mb-2 relative">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onNotificationPress}
            accessibilityRole="button"
            accessibilityLabel="Notificações"
            className="w-[40px] h-[40px] rounded-full bg-white/15 items-center justify-center"
          >
            <Ionicons
              name="notifications"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {hasNotification && (
            <View className="absolute top-0 right-0 w-[12px] h-[12px] rounded-full bg-[#F25A4F] border-2 border-[#4F7A44]" />
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onMenuPress}
          accessibilityRole="button"
          accessibilityLabel="Menu"
          className="w-[40px] h-[40px] rounded-full bg-white/15 items-center justify-center"
        >
          <Ionicons
            name="menu"
            size={22}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
