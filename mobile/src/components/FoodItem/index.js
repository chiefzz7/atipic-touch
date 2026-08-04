import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FoodItem({title, icon, onPress }) {
  return (
    <TouchableOpacity
      active
      activeOpacity={0.85}
      onPress={onPress}
      className="w-full h-[72px] bg-[#B9AE8D] rounded-[7px] flex-row items-center px-4 mb-4"
    >

      <View className="w-[56px] h-[56px] rounded-full bg-[#9D9276] items-center justify-center">

        {
          <Image 
            source={require("../../../assets/images/foods/feijao.png")}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
            }}
            resizeMode="cover"
          />
        }


      </View>

      <Text className="flex-1 ml-4 text-white text-[22px] font-semibold">
        {title}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={34}
        color="#5E543E"
      />

    </TouchableOpacity>
  );
}