import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AlertsWidget() {
  return (
    <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 min-w-[300px]">
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-[18px] font-bold text-[#212134]">Alertas e Insights</Text>
        <TouchableOpacity><Text className="text-[#3B82F6] font-medium text-[13px]">Ver todos</Text></TouchableOpacity>
      </View>
      
      <View className="flex-col gap-4">
        <View className="flex-row items-start bg-red-50 p-3.5 rounded-xl border border-red-100">
          <Feather name="alert-triangle" size={20} color="#D9534F" className="mt-0.5" />
          <View className="ml-3 flex-1">
            <Text className="text-[14px] font-bold text-red-800">Possível Defensividade Tátil</Text>
            <Text className="text-[12px] text-red-600 mt-1 leading-tight">90% de rejeição isolada em alimentos com textura pastosa (ex: Purê).</Text>
          </View>
        </View>
        
        <View className="flex-row items-start bg-green-50 p-3.5 rounded-xl border border-green-100">
          <Feather name="bell" size={20} color="#528F33" className="mt-0.5" />
          <View className="ml-3 flex-1">
            <Text className="text-[14px] font-bold text-green-800">Evolução Positiva</Text>
            <Text className="text-[12px] text-green-600 mt-1 leading-tight">A aceitação de alimentos da cor "Verde" aumentou 15% esta semana.</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
