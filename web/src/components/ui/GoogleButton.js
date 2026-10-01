import React from 'react';

import {
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

export default function GoogleButton({
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="w-full flex-row items-center justify-center h-[52px] mb-4 bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] hover:bg-[#F7F0DC] transition-colors"
    >
      <Image
        source={require('../../../assets/google.png')}
        className="w-5 h-5 mr-3"
        resizeMode="contain"
      />

      <Text className="text-[14px] md:text-[15px] text-[#554B41] font-medium">
        Entrar com Google
      </Text>
    </TouchableOpacity>
  );
}
