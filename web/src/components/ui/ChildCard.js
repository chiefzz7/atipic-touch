import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Feather,
} from '@expo/vector-icons';

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
          ? 'bg-[#C6BB9A] border-[#A3987B]'
          : 'bg-[#F7F0DC] border-[#DDD3B9] hover:border-[#83BF6E]'
      }`}
    >
      <View
        className={`w-7 h-7 md:w-8 md:h-8 rounded-[8px] border items-center justify-center mr-4 md:mr-6 ${
          selected
            ? 'bg-[#83BF6E] border-[#83BF6E]'
            : 'bg-[#FFFCEF] border-[#A3987B]'
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

      <View className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E5DCC4] overflow-hidden mr-4 md:mr-6 items-center justify-center border border-[#C6BB9A]">
        <Feather
          name="user"
          size={32}
          color="#80775C"
        />
      </View>

      <View className="flex-1 justify-center">
        <Text className="text-lg md:text-xl font-bold text-[#554B41] mb-1">
          {name}
        </Text>

        <Text className="text-sm md:text-base font-medium text-[#80775C] mb-0.5">
          {age}
        </Text>

        <Text className="text-sm md:text-base text-[#80775C]">
          {teaLevel}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
