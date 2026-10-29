import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function Toast({ toast, onHide }) {
  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(onHide, 3200);
    return () => clearTimeout(id);
  }, [toast, onHide]);

  if (!toast) return null;
  const isError = toast.type === 'error';

  return (
    <View
      pointerEvents="none"
      accessibilityLiveRegion="polite"
      style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}
      className={`flex-row items-center px-4 py-3 rounded-[12px] shadow-card border ${
        isError ? 'bg-[#FCEBE8] border-[#E7B8B2]' : 'bg-[#212134] border-[#212134]'
      }`}
    >
      <Feather
        name={isError ? 'alert-circle' : 'check-circle'}
        size={18}
        color={isError ? '#D9534F' : '#A3C78B'}
      />
      <Text className={`ml-2 text-[13px] font-bold ${isError ? 'text-[#9B5547]' : 'text-white'}`}>
        {toast.message}
      </Text>
    </View>
  );
}
