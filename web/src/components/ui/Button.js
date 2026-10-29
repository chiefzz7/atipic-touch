import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export default function Button({ title, onPress, disabled, loading }) {
  const off = disabled || loading;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={off}
      activeOpacity={0.85}
      accessibilityRole="button"
      className={`w-full h-[52px] bg-[#528F33] rounded-[12px] flex-row justify-center items-center mb-5 transition-colors ${
        off ? 'opacity-60' : 'hover:bg-[#467A2B]'
      }`}
    >
      {loading ? <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} /> : null}
      <Text className="text-white font-bold text-[15px]">{title}</Text>
    </TouchableOpacity>
  );
}
