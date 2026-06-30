import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function LogsTableWidget() {
  const mockLogs = [
    { date: '30/04/2026 12:30', food: 'Brócolis', color: 'Verde', texture: 'Sólido', reaction: 'Aceitou', rColor: 'bg-green-100 text-green-700' },
    { date: '30/04/2026 12:45', food: 'Purê de Batata', color: 'Amarelo', texture: 'Pastoso', reaction: 'Rejeitou', rColor: 'bg-red-100 text-red-700' },
    { date: '29/04/2026 19:15', food: 'Arroz', color: 'Branco', texture: 'Sólido', reaction: 'Aceitou', rColor: 'bg-green-100 text-green-700' },
    { date: '29/04/2026 19:30', food: 'Maçã', color: 'Vermelho', texture: 'Crocante', reaction: 'Crise', rColor: 'bg-blue-100 text-blue-700' },
  ];

  return (
    <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 w-full">
      <View className="flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3">
        <View>
          <Text className="text-[18px] font-bold text-[#212134]">Registos de Interação</Text>
          <Text className="text-[12px] text-[#6B7280]">Eventos sensoriais capturados pelo hardware</Text>
        </View>
        <TouchableOpacity className="flex-row items-center bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
          <Feather name="download" size={14} color="#528F33" />
          <Text className="ml-2 text-[13px] font-bold text-[#528F33]">Exportar CSV</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-col md:flex-row gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
        <View className="flex-row items-center bg-white border border-gray-200 px-3 py-2.5 rounded-lg flex-1 shadow-sm">
          <Feather name="search" size={16} color="#9CA3AF" />
          <TextInput 
            placeholder="Pesquisar por alimento, cor ou textura..." 
            className="ml-2 flex-1 text-[13px] text-[#212134] outline-none bg-transparent"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-row items-center bg-white border border-gray-200 px-3 py-2.5 rounded-lg shadow-sm">
            <Feather name="calendar" size={14} color="#6B7280" />
            <Text className="ml-2 text-[13px] text-[#4B5563] mr-2">Últimos 7 dias</Text>
            <Feather name="chevron-down" size={14} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center bg-white border border-gray-200 px-3 py-2.5 rounded-lg shadow-sm">
            <Feather name="filter" size={14} color="#6B7280" />
            <Text className="ml-2 text-[13px] text-[#4B5563] mr-2">Todas as Reações</Text>
            <Feather name="chevron-down" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="hidden md:flex flex-row border-b border-gray-200 pb-3 mb-2 px-2 bg-white">
        <Text className="flex-[1.5] text-[12px] font-bold text-[#6B7280] uppercase">Data/Hora</Text>
        <Text className="flex-1 text-[12px] font-bold text-[#6B7280] uppercase">Alimento</Text>
        <Text className="flex-1 text-[12px] font-bold text-[#6B7280] uppercase">Cor</Text>
        <Text className="flex-1 text-[12px] font-bold text-[#6B7280] uppercase">Textura</Text>
        <Text className="flex-[1.5] text-[12px] font-bold text-[#6B7280] uppercase text-center">Reação</Text>
      </View>

      <View className="flex-col gap-3 md:gap-0">
        {mockLogs.map((log, index) => (
          <View key={index} className="flex-col md:flex-row border border-gray-100 md:border-t-0 md:border-x-0 md:border-b-gray-100 p-4 md:py-3 md:px-2 rounded-xl md:rounded-none bg-white hover:bg-gray-50 transition-colors shadow-sm md:shadow-none">
            <View className="flex-[1.5] flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0">
              <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">Data/Hora</Text>
              <Text className="text-[14px] text-[#4B5563] md:mt-1">{log.date}</Text>
            </View>

            <View className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0">
              <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">Alimento</Text>
              <Text className="text-[14px] font-bold text-[#212134] md:mt-1">{log.food}</Text>
            </View>

            <View className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0">
              <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">Cor</Text>
              <Text className="text-[14px] text-[#6B7280] md:mt-1">{log.color}</Text>
            </View>

            <View className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-3 md:mb-0">
              <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">Textura</Text>
              <Text className="text-[14px] text-[#6B7280] md:mt-1">{log.texture}</Text>
            </View>

            <View className="flex-[1.5] flex-row md:flex-col justify-between items-center border-t border-gray-100 md:border-0 pt-3 md:pt-0">
              <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">Reação Sensorial</Text>
              <View className={`px-4 py-1.5 rounded-full ${log.rColor}`}>
                <Text className={`text-[12px] font-bold ${log.rColor.split(' ')[1]}`}>{log.reaction}</Text>
              </View>
            </View>

          </View>
        ))}
      </View>
    </View>
  );
}
