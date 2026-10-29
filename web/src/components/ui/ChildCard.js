import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';

export default function ChildCard({
  name,
  age,
  teaLevel,
  selected,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`flex-row items-center p-4 md:p-6 rounded-[10px] border transition-colors ${
        selected
          ? 'bg-[#A3C78B] border-[#9A9279]'
          : 'bg-[#FFFFFF] border-[#DCE7D2] hover:border-[#528F33]'
      }`}
    >
      <View
        className={`w-7 h-7 md:w-8 md:h-8 rounded-[8px] border items-center justify-center mr-4 md:mr-6 ${
          selected
            ? 'bg-[#528F33] border-[#528F33]'
            : 'bg-[#FFFCEF] border-[#9A9279]'
        }`}
      >
        {selected ? (
          <Feather
            name="check"
            size={16}
            color="#FFFFFF"
          />
        ) : null}
      </View>

      <View className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F3F7EE] overflow-hidden mr-4 md:mr-6 items-center justify-center border border-[#A3C78B]">
        <Feather
          name="user"
          size={32}
          color="#6B6554"
        />
      </View>

      <View className="flex-1 justify-center">
        <Text className="text-lg md:text-xl font-bold text-[#212134] mb-1">
          {name}
        </Text>

        <Text className="text-sm md:text-base font-medium text-[#6B6554] mb-0.5">
          {age}
        </Text>

        <Text className="text-sm md:text-base text-[#6B6554]">
          {teaLevel}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
