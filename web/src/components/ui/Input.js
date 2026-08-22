import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Input({ 
  label, 
  placeholder, 
  secureTextEntry, 
  keyboardType, 
  autoCapitalize,
  value,           
  onChangeText     
}) {
  return (
    <View className="w-full mb-4">
      <Text className="text-[11px] font-bold text-[#4B5563] mb-2 uppercase tracking-wide">
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={value}             
        onChangeText={onChangeText} 
        className="w-full bg-[#F3F4F6] rounded-xl h-[52px] px-4 text-black outline-none focus:ring-1 focus:ring-gray-300"
      />
    </View>
  );
}
