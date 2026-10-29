import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useRouter,
  usePathname,
} from "expo-router";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ITEMS = [
  {
    key: "dashboard",
    route: "/dashboard",
    icon: "home",
    iconOutline: "home-outline",
    label: "Início",
  },
  {
    key: "device",
    route: "/device",
    icon: "hardware-chip",
    iconOutline: "hardware-chip-outline",
    label: "Dispositivo",
  },
  {
    key: "management-food",
    route: "/management-food",
    icon: "fast-food",
    iconOutline: "fast-food-outline",
    label: "Alimentos",
  },
  {
    key: "profile",
    route: "/profile",
    icon: "people",
    iconOutline: "people-outline",
    label: "Perfil",
  },
];

export default function BottomNavigation({
  active = "",
}) {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const insets =
    useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 w-full bg-[#554B41] rounded-t-[28px]"
      style={{
        height:
          74 + insets.bottom,
        paddingBottom:
          insets.bottom,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 12,
      }}
    >
      <View className="flex-1 flex-row justify-around items-center px-2">
        {ITEMS.map((item) => {
          const isActive =
            active === item.key;

          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.75}
              onPress={() => {
                // Já está nesta tela: não recarrega
                if (
                  pathname ===
                  item.route
                ) {
                  return;
                }

                // replace evita empilhar telas
                // (e a sobreposição na animação)
                router.replace(
                  item.route
                );
              }}
              accessibilityRole="button"
              accessibilityLabel={
                item.label
              }
              accessibilityState={{
                selected:
                  isActive,
              }}
              className="flex-1 items-center justify-center"
            >
              <View
                className={`items-center justify-center px-4 py-1.5 rounded-[16px] ${
                  isActive
                    ? "bg-[#A3C78C]/20"
                    : ""
                }`}
              >
                <Ionicons
                  name={
                    isActive
                      ? item.icon
                      : item.iconOutline
                  }
                  size={24}
                  color={
                    isActive
                      ? "#B9DDA2"
                      : "#D9D2BA"
                  }
                />

                <Text
                  numberOfLines={1}
                  className={`text-[11px] mt-0.5 ${
                    isActive
                      ? "font-bold text-[#B9DDA2]"
                      : "font-medium text-[#D9D2BA]"
                  }`}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
