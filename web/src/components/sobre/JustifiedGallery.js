import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

// Galeria "justificada": cada foto ocupa a largura proporcional à sua proporção,
// então as linhas ficam com a mesma altura sem cortar as imagens.
export default function JustifiedGallery({ photos, offset = 0, rowHeight = 220, onOpen }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      {photos.map((p, i) => {
        const ar = p.w / p.h;
        return (
          <TouchableOpacity
            key={i}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel={`Ampliar: ${p.alt}`}
            onPress={() => onOpen(offset + i)}
            className="rounded-[14px] overflow-hidden bg-[#F1E9D2] border border-[#DDD3B9] hover:opacity-90 transition-opacity"
            style={{ flexGrow: ar * 100, flexBasis: ar * rowHeight, minWidth: 120, maxWidth: ar * rowHeight * 1.7 }}
          >
            <Image source={p.src} accessibilityLabel={p.alt} resizeMode="cover" style={{ width: '100%', aspectRatio: ar }} />
            {p.legenda ? (
              <View className="px-3 py-2 bg-white">
                <Text numberOfLines={2} className="text-[12px] text-[#6B6554] leading-snug">
                  {p.legenda}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
      <View style={{ flexGrow: 10000, height: 0 }} />
    </View>
  );
}
