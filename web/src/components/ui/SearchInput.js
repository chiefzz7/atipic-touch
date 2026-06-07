import React from 'react';
import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function SearchInput({ placeholder, value, onChangeText }) {
  return (
    <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 h-[56px] shadow-sm mb-8">
      <Feather name="search" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-3 text-[16px] text-[#212134] outline-none"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
