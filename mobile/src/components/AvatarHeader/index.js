import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AvatarHeader() {
  return (
    <View className="w-full bg-[#C6BB9A] rounded-[7px] px-4 py-4 flex-row items-center">

      {/* Avatar */}

      <View className="w-[90px] h-[90px] rounded-full bg-[#AEA282] items-center justify-center">

        <Ionicons
          name="person"
          size={55}
          color="#FFFCEF"
        />

      </View>

      {/* Dados */}

      <View className="flex-1 ml-4">

        <Text className="text-white text-[22px] font-semibold">
          Nome da criança,
        </Text>

      </View>

      <Text className="text-[#7B715F] text-[22px] mr-3">
        3 anos
      </Text>

      {/* Ações */}

      <View className="items-center">

        <TouchableOpacity
          activeOpacity={0.8}
          className="mb-2"
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