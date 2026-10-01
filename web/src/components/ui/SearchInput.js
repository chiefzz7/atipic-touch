import React from 'react';

import {
  View,
  TextInput,
} from 'react-native';

import {
  Feather,
} from '@expo/vector-icons';

export default function SearchInput({
  placeholder,
  value,
  onChangeText,
}) {
  return (
    <View className="flex-row items-center bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] px-4 h-[56px] mb-8">
      <Feather
        name="search"
        size={20}
        color="#80775C"
      />

      <TextInput
        className="flex-1 ml-3 text-[16px] text-[#554B41] outline-none"
        placeholder={placeholder}
        placeholderTextColor="#A3987B"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
