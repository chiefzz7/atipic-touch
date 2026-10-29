import React, { useEffect } from 'react';
import { Modal, View, Text, Image, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

// Visualizador em tela cheia. `index` null = fechado.
export default function Lightbox({ photos, index, onChange, onClose }) {
  const { width, height } = useWindowDimensions();
  const open = index !== null && index !== undefined;
  const n = photos.length;

  useEffect(() => {
    if (!open || Platform.OS !== 'web') return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onChange((index + 1) % n);
      else if (e.key === 'ArrowLeft') onChange((index - 1 + n) % n);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, n, onChange, onClose]);

  if (!open) return null;
  const p = photos[index];
  const maxW = width - 32;
  const maxH = height - 140;
  const scale = Math.min(maxW / p.w, maxH / p.h);

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: 'rgba(20,20,32,0.94)' }}>
        <TouchableOpacity
          accessibilityLabel="Fechar"
          onPress={onClose}
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 items-center justify-center z-10"
        >
          <Feather name="x" size={24} color="#fff" />
        </TouchableOpacity>

        <Image
          source={p.src}
          accessibilityLabel={p.alt}
          resizeMode="contain"
          style={{ width: Math.round(p.w * scale), height: Math.round(p.h * scale), borderRadius: 8 }}
        />
        <Text className="text-white text-[14px] mt-4 px-6 text-center">
          {p.legenda || p.alt}
          <Text className="text-white/60">{`   ${index + 1}/${n}`}</Text>
        </Text>

        {n > 1 ? (
          <>
            <TouchableOpacity
              accessibilityLabel="Foto anterior"
              onPress={() => onChange((index - 1 + n) % n)}
              className="absolute left-3 w-12 h-12 rounded-full bg-white/15 items-center justify-center"
              style={{ top: '50%', marginTop: -24 }}
            >
              <Feather name="chevron-left" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Próxima foto"
              onPress={() => onChange((index + 1) % n)}
              className="absolute right-3 w-12 h-12 rounded-full bg-white/15 items-center justify-center"
              style={{ top: '50%', marginTop: -24 }}
            >
              <Feather name="chevron-right" size={26} color="#fff" />
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </Modal>
  );
}
