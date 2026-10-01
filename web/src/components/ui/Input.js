import React from 'react';

import {
  View,
  Text,
  TextInput,
} from 'react-native';

export default function Input({
  label,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  value,
  onChangeText,
}) {
  return (
    <View className="w-full mb-4">
      <Text className="text-[11px] font-bold text-[#554B41] mb-2 uppercase tracking-wide">
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A3987B"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
        className="w-full h-[52px] bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] px-4 text-[#554B41] outline-none focus:border-[#83BF6E] transition-colors"
      />
    </View>
  );
}
