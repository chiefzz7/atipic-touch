import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BottomNavigation() {
  const router = useRouter();

  return (
    <View
      className="w-full h-[83px] bg-[#554B41] flex-row justify-around items-center"
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/home")}
      >
        <Ionicons
          name="home"
          size={30}
          color="#EDE8D0"
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/device")}
      >
        <Ionicons
          name="hardware-chip"
          size={30}
          color="#EDE8D0"
        />
      </TouchableOpacity>


      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/child-add")}
      >
        <Ionicons
          name="people"
          size={30}
          color="#EDE8D0"
        />
      </TouchableOpacity>


      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {}}
      >
        <Ionicons
          name="settings"
          size={30}
          color="#EDE8D0"
        />
      </TouchableOpacity>

    </View>
  );
}