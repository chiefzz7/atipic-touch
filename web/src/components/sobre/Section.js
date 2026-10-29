import React from 'react';
import { View, Text } from 'react-native';

// Bloco de seção com largura máxima e título padronizado.
export function Container({ children, className = '' }) {
  return <View className={`w-full max-w-[1120px] mx-auto px-5 md:px-8 ${className}`}>{children}</View>;
}

export function SectionTitle({ eyebrow, title, subtitle, align = 'left' }) {
  const center = align === 'center';
  return (
    <View className={`mb-8 md:mb-10 ${center ? 'items-center' : 'items-start'}`}>
      {eyebrow ? (
        <Text className="text-[12px] font-bold tracking-[2px] uppercase text-[#528F33] mb-2">{eyebrow}</Text>
      ) : null}
      <Text
        accessibilityRole="header"
        aria-level={2}
        className={`text-[28px] md:text-[36px] leading-tight font-extrabold text-[#212134] tracking-tight ${
          center ? 'text-center' : ''
        }`}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text className={`mt-3 text-[15px] md:text-[16px] leading-relaxed text-[#6B6554] max-w-[640px] ${center ? 'text-center' : ''}`}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
