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
  ...rest
}) {
  return (
    <View className="w-full mb-4">
      <Text className="text-[11px] font-bold text-[#212134] mb-2 uppercase tracking-wide">
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9A9279"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={label}
        {...rest}
        className="w-full h-[50px] bg-[#FFFCEF] border border-[#DCE7D2] rounded-[12px] px-4 text-[#212134] outline-none focus:border-[#528F33] transition-colors"
      />
    </View>
  );
}
