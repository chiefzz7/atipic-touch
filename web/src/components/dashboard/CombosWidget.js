import React from 'react';
import { View, Text } from 'react-native';

export default function CombosWidget() {
  return (
    <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 min-w-[300px]">
      <Text className="text-[18px] font-bold text-[#212134] mb-1">Gatilhos Críticos (Combos)</Text>
      <Text className="text-[13px] text-[#6B7280] mb-5">Padrões sensoriais capturados pelo hardware</Text>
      
      <View className="flex-col gap-4">
        <View className="flex-row justify-between items-center border-b border-gray-100 pb-3">
          <View className="flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 rounded-full bg-[#D9534F]" />
            <Text className="text-[14px] font-medium text-[#4B5563]">Pastoso + Amarelo</Text>
          </View>
          <Text className="text-[14px] font-bold text-[#D9534F]">85% Rejeição</Text>
        </View>

        <View className="flex-row justify-between items-center border-b border-gray-100 pb-3">
          <View className="flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 rounded-full bg-[#528F33]" />
            <Text className="text-[14px] font-medium text-[#4B5563]">Crocante + Verde</Text>
          </View>
          <Text className="text-[14px] font-bold text-[#528F33]">70% Aceitação</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <Text className="text-[14px] font-medium text-[#4B5563]">Frio + Vermelho</Text>
          </View>
          <Text className="text-[14px] font-bold text-[#F59E0B]">Oscilante</Text>
        </View>
      </View>
    </View>
  );
} 
