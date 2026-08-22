import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

export default function GoogleButton({ onPress }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-full flex-row items-center justify-center rounded-xl h-[52px] mb-4 bg-transparent border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <Image
        source={require('../../../assets/google.png')}
        className="w-5 h-5 mr-3"
        resizeMode="contain"
      />
      <Text className="text-[14px] md:text-[15px] text-[#4B5563] font-medium">
        Entrar com Google
      </Text>
    </TouchableOpacity>
  );
}
