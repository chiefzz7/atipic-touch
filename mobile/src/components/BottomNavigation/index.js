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
  const router =
    useRouter();

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
        height:
          65 + insets.bottom,
        paddingBottom:
          insets.bottom,
      }}
    >
      <View className="flex-1 flex-row justify-around items-center">
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() =>
            router.push(
              "/dashboard"
            )
          }
          className="w-[52px] h-[52px] items-center justify-center"
        >
          <Ionicons
            name="home"
            size={28}
            color={color(
              "dashboard"
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() =>
            router.push(
              "/device"
            )
          }
          className="w-[52px] h-[52px] items-center justify-center"
        >
          <Ionicons
            name="hardware-chip"
            size={28}
            color={color(
              "device"
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() =>
            router.push(
              "/management-food"
            )
          }
          className="w-[52px] h-[52px] items-center justify-center"
        >
          <Ionicons
            name="fast-food"
            size={28}
            color={color(
              "management-food"
            )}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() =>
            router.push(
              "/profile"
            )
          }
          className="w-[52px] h-[52px] items-center justify-center"
        >
          <Ionicons
            name="people"
            size={28}
            color={color(
              "profile"
            )}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
