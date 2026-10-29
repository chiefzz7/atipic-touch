import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function PatientCard({
  name,
  childrenCount,
  initials,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row items-center bg-[#FFFFFF] p-5 rounded-[10px] mb-4 border border-[#DCE7D2] hover:border-[#528F33] transition-colors"
    >
      <View className="w-14 h-14 rounded-full bg-[#9A9279] items-center justify-center mr-5">
        <Text className="text-white font-bold text-lg uppercase">
          {initials}
        </Text>
      </View>

      <View className="flex-1">
        <Text className="text-[18px] font-bold text-[#212134]">
          {name}
        </Text>

        <Text className="text-[14px] text-[#6B6554] mt-0.5">
          {childrenCount}{' '}
          {childrenCount === 1
            ? 'criança'
            : 'crianças'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
