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
  childName = "João",
  age = "3 anos",
  hasNotification = false,
  onNotificationPress,
  onMenuPress,
}) {
  return (
    <View className="w-full min-h-[108px] bg-[#C6BB9A] rounded-[10px] px-4 py-3 mt-4 mb-4 flex-row items-center">
      <View className="w-[72px] h-[72px] rounded-full bg-[#AEA282] items-center justify-center">
        <Ionicons
          name="person"
          size={42}
          color="#FFFCEF"
        />
      </View>

      <View className="flex-1 ml-4">
        {variant === "dashboard" ? (
          <>
            <Text className="text-[#E1F0D8] font-semibold text-[17px]">
              {greeting},
            </Text>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              className="text-white text-[30px] font-bold mt-1"
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
              className="text-white text-[30px] font-bold"
            >
              {childName}
            </Text>

            <Text className="text-[#FFFCEF] text-[17px] mt-1">
              {age}
            </Text>
          </>
        )}
      </View>

      <View className="items-center ml-2">
        <View className="mb-3 relative">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onNotificationPress}
            className="w-[36px] h-[36px] items-center justify-center"
          >
            <Ionicons
              name="notifications"
              size={22}
              color="#FFFCEF"
            />
          </TouchableOpacity>

          {hasNotification && (
            <View className="absolute top-1 right-1 w-[10px] h-[10px] rounded-full bg-red-500" />
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onMenuPress}
          className="w-[36px] h-[36px] items-center justify-center"
        >
          <Ionicons
            name="menu"
            size={24}
            color="#FFFCEF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
