import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ChildCard({ name, age, teaLevel, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`flex-row items-center p-4 md:p-6 rounded-2xl border-2 transition-all duration-200 ${
        selected ? 'bg-[#E6E0CC] border-[#A39B7D]' : 'bg-white border-gray-100 hover:border-gray-300'
      }`}
    >
      <View 
        className={`w-6 h-6 md:w-8 md:h-8 rounded-lg border items-center justify-center mr-4 md:mr-6 transition-colors ${
          selected ? 'bg-[#7A986A] border-[#7A986A]' : 'bg-transparent border-[#9CA3AF]'
        }`}
      >
        {selected && <Feather name="check" size={16} color="white" />}
      </View>

      <View className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 overflow-hidden mr-4 md:mr-6 items-center justify-center border-2 border-white shadow-sm">
        <Feather name="user" size={32} color="#9CA3AF" />
      </View>

      <View className="flex-1 justify-center">
        <Text className="text-lg md:text-xl font-bold text-[#1F1D1A] mb-1">{name}</Text>
        <Text className="text-sm md:text-base font-medium text-[#4B4842] mb-0.5">{age}</Text>
        <Text className="text-sm md:text-base text-[#4B4842]">{teaLevel}</Text>
      </View>
    </TouchableOpacity>
  );
}
