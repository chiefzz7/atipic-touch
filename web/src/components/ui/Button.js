import React from 'react';

import {
  TouchableOpacity,
  Text,
} from 'react-native';

export default function Button({
  title,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="w-full h-[54px] bg-[#83BF6E] rounded-[10px] justify-center items-center mb-5 hover:bg-[#4D9B43] transition-colors"
    >
      <Text className="text-white font-bold text-[16px]">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
