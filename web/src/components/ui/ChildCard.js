import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ChildCard({ name, age, teaLevel, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`flex-row items-center p-6 rounded-2xl mb-6 border-2 transition-all duration-200 ${
        selected ? 'bg-[#E6E0CC] border-[#A39B7D]' : 'bg-white border-gray-100 hover:border-gray-300'
      }`}
    >
      <View 
        className={`w-8 h-8 rounded-lg border items-center justify-center mr-6 transition-colors ${
          selected ? 'bg-[#7A986A] border-[#7A986A]' : 'bg-transparent border-[#9CA3AF]'
        }`}
      >
        {selected && <Feather name="check" size={20} color="white" />}
      </View>

      <View className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mr-6 items-center justify-center border-4 border-white shadow-sm">
        <Feather name="user" size={40} color="#9CA3AF" />
      </View>

      <View className="flex-1 justify-center">
        <Text className="text-[24px] font-bold text-[#1F1D1A] mb-1">{name}</Text>
        <Text className="text-[18px] font-medium text-[#4B4842] mb-1">{age}</Text>
        <Text className="text-[18px] text-[#4B4842]">{teaLevel}</Text>
      </View>
    </TouchableOpacity>
  );
}
