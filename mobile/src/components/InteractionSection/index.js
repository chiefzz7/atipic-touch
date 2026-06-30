import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import InteractionItem from "../InteractionItem";

export default function InteractionSection({
  title, icon, image, items = [], selected, onSelect,
}) {
  return (
    <View className="bg-[#FFFCEF] rounded-[7px] p-4 mb-4">

      <View className="flex-row items-center mb-4">

        {image ? (
          <>
            {/*
            <Image
              source={image}
              className="w-10 h-10"
              resizeMode="contain"
            />
            */}
          </>
        ) : (
          <Ionicons
            name={icon}
            size={30}
            color="#7B5E3B"
          />
        )}

        <Text className="text-xl font-bold text-[#554B41] ml-3">
          {title}
        </Text>

      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item) => (
          <InteractionItem
            key={item.label}
            {...item}
            selected={selected === item.label}
            onPress={() => onSelect(item.label)}
          />
        ))}
      </ScrollView>

    </View>
  );
}