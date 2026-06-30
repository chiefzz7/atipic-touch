import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

export default function GoogleButton({ onPress }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-full flex-row items-center justify-center rounded-xl h-[52px] mb-6 hover:bg-gray-50 transition-colors"
    >
      <Image
        source={require('../../../assets/google.png')}
        className="w-7 h-7 mr-3"
      />
      <Text className="text-[16px] text-[#4B5563] font-medium">
        Entrar com Google
      </Text>
    </TouchableOpacity>
  );
}
