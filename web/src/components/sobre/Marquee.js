import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

// Faixa de fotos em movimento contínuo (estilo "filme"). Pausa ao passar o mouse.
// A animação (.marquee-track) está em global.css.
export default function Marquee({ photos, onOpen, height = 170, secondsPerPhoto = 5, reverse = false }) {
  const duration = Math.max(30, photos.length * secondsPerPhoto);
  const list = [...photos, ...photos];
  return (
    <View className="marquee-wrap w-full overflow-hidden" style={{ height }}>
      <View
        className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}
        style={{ flexDirection: 'row', height, animationDuration: `${duration}s` }}
      >
        {list.map((p, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel={`Ampliar: ${p.alt}`}
            onPress={() => onOpen(i % photos.length)}
            style={{ marginRight: 12, height, width: Math.round((p.w / p.h) * height), borderRadius: 14, overflow: 'hidden' }}
          >
            <Image source={p.src} accessibilityLabel={p.alt} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
