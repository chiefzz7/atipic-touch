import React from 'react';

import {
  View,
  TextInput,
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';

export default function SearchInput({
  placeholder,
  value,
  onChangeText,
}) {
  return (
    <View className="flex-row items-center bg-[#FFFCEF] border border-[#DCE7D2] rounded-[10px] px-4 h-[56px] mb-8">
      <Feather
        name="search"
        size={20}
        color="#6B6554"
      />

      <TextInput
        className="flex-1 ml-3 text-[16px] text-[#212134] outline-none"
        placeholder={placeholder}
        placeholderTextColor="#9A9279"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
