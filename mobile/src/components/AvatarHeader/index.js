import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AvatarHeader({
    variant = "device", greeting = "Bom dia", childName = "João", age = "3 anos",
}) {
  return (
    <View className="w-full bg-[#C6BB9A] rounded-[7px] px-4 py-4 mt-4 mb-4 flex-row items-center">

      <View className="w-[90px] h-[90px] rounded-full bg-[#AEA282] items-center justify-center">

        <Ionicons
          name="person"
          size={55}
          color="#FFFCEF"
        />

      </View>


      <View className="flex-1 ml-4 ">

        {variant === "dashboard" ? (
          <>
            <Text className="text-[#c7e0b7] font-semibold text-[22px]">
              {greeting},
            </Text>

            <Text className="text-white text-[40px] font-bold mt-1">
              {childName}!
            </Text>
          </>
        ) : (
          <>
            <Text className="text-white text-[40px] font-bold">
              {childName}
            </Text>

            <Text className="text-[#FFFCEF] text-[22px] mt-1">
              {age}
            </Text>
          </>
        )}

      </View>

      <View className="items-center">

        <TouchableOpacity
          className="mb-3"
          activeOpacity={0.8}
        >
          <Ionicons
            name="notifications"
            size={24}
            color="#FFFCEF"
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}>
          <Ionicons
            name="menu"
            size={26}
            color="#FFFCEF"
          />
        </TouchableOpacity>

      </View>

    </View>
  );
}