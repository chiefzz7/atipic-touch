import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FDFFF1] items-center justify-center p-6">
      <View className="w-24 h-24 bg-[#528F33] rounded-2xl items-center justify-center shadow-sm mb-6">
        <Text className="text-white font-bold text-4xl">AT</Text>
      </View>
      <Text className="text-3xl font-extrabold text-[#212134] text-center mb-2">
        Mobile Gateway
      </Text>
      <Text className="text-base text-[#6B7280] text-center mb-8">
        Expo Router configurado com sucesso!
      </Text>
      
      <TouchableOpacity 
        className="bg-[#528F33] px-8 py-4 rounded-xl shadow-sm"
        onPress={() => console.log('Pronto para navegar!')}
      >
        <Text className="text-white font-bold text-lg">Iniciar Sessão</Text>
      </TouchableOpacity>
    </View>
  );
}
