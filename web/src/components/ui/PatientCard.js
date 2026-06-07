import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function PatientCard({ name, childrenCount, initials, onPress }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center bg-white p-5 rounded-2xl mb-4 border border-gray-100 shadow-sm hover:border-[#528F33] transition-all"
    >
      <View className="w-14 h-14 rounded-full bg-[#8E8E8E] items-center justify-center mr-5">
        <Text className="text-white font-bold text-lg uppercase">{initials}</Text>
      </View>
      
      <View className="flex-1">
        <Text className="text-[18px] font-bold text-[#212134]">{name}</Text>
        <Text className="text-[14px] text-[#6B7280]">{childrenCount} {childrenCount === 1 ? 'criança' : 'crianças'}</Text>
      </View>
    </TouchableOpacity>
  );
}
