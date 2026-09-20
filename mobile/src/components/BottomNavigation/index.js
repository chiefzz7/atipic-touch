import React from "react";

import {
  View,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useRouter,
} from "expo-router";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function BottomNavigation({
  active = "",
}) {
  const router = useRouter();

  const insets =
    useSafeAreaInsets();

  const color = (item) =>
    active === item
      ? "#A3C78C"
      : "#EDE8D0";

  return (
    <View
      className="absolute bottom-0 w-full bg-[#554B41]"
      style={{
        height: 83 + insets.bottom,
        paddingBottom: insets.bottom,
      }}
    >
      <View className="flex-1 flex-row justify-around items-center">
        <TouchableOpacity
          onPress={() =>
            router.push("/dashboard")
          }
        >
          <Ionicons
            name="home"
            size={30}
            color={color("dashboard")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push("/device")
          }
        >
          <Ionicons
            name="hardware-chip"
            size={30}
            color={color("device")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push(
              "/management-food"
            )
          }
        >
          <Ionicons
            name="fast-food"
            size={30}
            color={color(
              "management-food"
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push("/profile")
          }
        >
          <Ionicons
            name="people"
            size={30}
            color={color("profile")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
