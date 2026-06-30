import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BottomNavigation({
  active = "",
}) {

  const router = useRouter();

  const color = (item) =>
    active === item
      ? "#A3C78C"
      : "#EDE8D0";

  return (

    <View className="w-full h-[83px] bg-[#554B41] flex-row justify-around items-center">

      <TouchableOpacity
        onPress={() => router.push("/dashboard")}
      >
        <Ionicons
          name="home"
          size={30}
          color={color("dashboard")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/device")}>
        <Ionicons
          name="hardware-chip"
          size={30}
          color={color("device")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Ionicons
          name="people"
          size={30}
          color={color("children")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Ionicons
          name="settings"
          size={30}
          color={color("settings")}
        />
      </TouchableOpacity>

    </View>

  );
}