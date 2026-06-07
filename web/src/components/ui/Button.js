import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-full bg-[#528F33] h-[52px] rounded-xl justify-center items-center mb-5 hover:bg-[#457a2a] transition-colors"
    >
      <Text className="text-white font-bold text-[16px]">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
