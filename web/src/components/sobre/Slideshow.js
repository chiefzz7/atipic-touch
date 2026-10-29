import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

// Slideshow lento com fade e leve zoom. Troca sozinho a cada `interval` ms;
// os botões e os pontos reiniciam o tempo.
export default function Slideshow({ photos, interval = 7000 }) {
  const [index, setIndex] = useState(0);
  const n = photos.length;

  useEffect(() => {
    if (n < 2) return undefined;
    const t = setTimeout(() => setIndex((i) => (i + 1) % n), interval);
    return () => clearTimeout(t);
  }, [index, n, interval]);

  const go = useCallback((d) => setIndex((i) => (i + d + n) % n), [n]);

  return (
    <View
      className="w-full rounded-[20px] overflow-hidden bg-[#212134] border border-[#DDD3B9]"
      style={{ aspectRatio: 4 / 3, boxShadow: '0 12px 40px rgba(33,33,52,0.18)' }}
    >
      {photos.map((p, i) => {
        const active = i === index;
        const portrait = p.h > p.w;
        return (
          <View
            key={i}
            className="transition-opacity duration-[1600ms]"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: active ? 1 : 0, pointerEvents: 'none' }}
          >
            <Image
              source={p.src}
              accessibilityLabel={p.alt}
              resizeMode={portrait ? 'contain' : 'cover'}
              className="transition-transform duration-[9000ms] ease-linear"
              style={{ width: '100%', height: '100%', transform: [{ scale: active ? 1.06 : 1 }] }}
            />
          </View>
        );
      })}

      {n > 1 ? (
        <>
          <TouchableOpacity
            accessibilityLabel="Foto anterior"
            onPress={() => go(-1)}
            className="absolute left-3 w-10 h-10 rounded-full bg-white/80 items-center justify-center"
            style={{ top: '50%', marginTop: -20 }}
          >
            <Feather name="chevron-left" size={22} color="#212134" />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Próxima foto"
            onPress={() => go(1)}
            className="absolute right-3 w-10 h-10 rounded-full bg-white/80 items-center justify-center"
            style={{ top: '50%', marginTop: -20 }}
          >
            <Feather name="chevron-right" size={22} color="#212134" />
          </TouchableOpacity>
          <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-1.5">
            {photos.map((_, i) => (
              <TouchableOpacity
                key={i}
                accessibilityLabel={`Ir para a foto ${i + 1}`}
                onPress={() => setIndex(i)}
                hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
              />
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
}
