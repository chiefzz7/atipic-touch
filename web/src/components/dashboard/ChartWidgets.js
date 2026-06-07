import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function BarChartCor() {
  const data = [
    { label: 'Verdes', value: '75%', height: 'h-[75%]', color: 'bg-[#528F33]' },
    { label: 'Brancos', value: '50%', height: 'h-[50%]', color: 'bg-gray-300' },
    { label: 'Vermelhos', value: '34%', height: 'h-[34%]', color: 'bg-[#D9534F]' },
    { label: 'Amarelos', value: '55%', height: 'h-[55%]', color: 'bg-[#F59E0B]' },
    { label: 'Marrons', value: '40%', height: 'h-[40%]', color: 'bg-[#8B4513]' },
  ];

  return (
    <View className="flex-1">
      <Text className="text-[13px] font-bold text-[#212134]">Aceitação por Cor</Text>
      <Text className="text-[10px] text-[#6B7280] mb-4">Taxa de aceitação por grupo de cores</Text>
      
      <View className="flex-row items-end justify-between h-24 border-b border-l border-gray-100 pb-1 pl-2">
        {data.map((item, index) => (
          <View key={index} className="items-center w-8">
            <Text className="text-[9px] text-[#6B7280] mb-1">{item.value}</Text>
            <View className={`w-6 ${item.height} ${item.color} rounded-t-sm`} />
          </View>
        ))}
      </View>
      <View className="flex-row justify-between pl-2 mt-1">
        {data.map((item, index) => (
          <Text key={index} className="text-[8px] font-medium text-[#4B5563] w-8 text-center">{item.label}</Text>
        ))}
      </View>
    </View>
  );
}

export function RadarChartTextura() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full">
        <Text className="text-[13px] font-bold text-[#212134]">Aceitação por Textura</Text>
        <Text className="text-[10px] text-[#6B7280] mb-2">Correlação entre textura e aceitação</Text>
      </View>
      <View className="relative w-28 h-28 items-center justify-center mt-2">
        <Feather name="hexagon" size={100} color="#E5E7EB" />
        <View className="absolute w-16 h-16 bg-blue-500/20 border border-blue-500 rounded-full" />
        <Text className="absolute -top-3 text-[9px] font-bold text-[#4B5563]">Cremoso</Text>
        <Text className="absolute -bottom-3 text-[9px] font-bold text-[#4B5563]">Sólido</Text>
        <Text className="absolute -left-6 text-[9px] font-bold text-[#4B5563]">Pastoso</Text>
        <Text className="absolute -right-8 text-[9px] font-bold text-[#4B5563]">Crocante</Text>
      </View>
    </View>
  );
}

export function LineChartEvolucao() {
  return (
    <View className="flex-1">
      <Text className="text-[13px] font-bold text-[#212134]">Evolução Temporal</Text>
      <Text className="text-[10px] text-[#6B7280] mb-2">Tentativas vs Aceitações ao longo do tempo</Text>
      
      <View className="flex-row justify-center items-center gap-4 mb-2">
        <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-gray-400 mr-1"/><Text className="text-[9px]">Tentativas</Text></View>
        <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-[#528F33] mr-1"/><Text className="text-[9px]">Aceitações</Text></View>
      </View>

      <View className="relative h-20 border-b border-l border-gray-100 flex-row items-end justify-between px-2 pb-1">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} className="items-center">
            <View className={`w-1.5 h-1.5 rounded-full bg-[#528F33] absolute bottom-[${40 + (i * 10)}%]`}/>
            <View className={`w-1.5 h-1.5 rounded-full bg-gray-400 absolute bottom-[${60 + (i * 5)}%]`}/>
            <Text className="text-[8px] text-[#6B7280] mt-16">0{i+1}/04</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function ProgressSaudaveis() {
  return (
    <View className="flex-1 justify-center">
      <Text className="text-[13px] font-bold text-[#212134] mb-4">Alimentos saudáveis vs não saudáveis</Text>
      
      <View className="h-6 w-full rounded-md flex-row overflow-hidden mb-3">
        <View className="h-full bg-[#528F33] justify-center items-center" style={{ width: '70%' }}>
          <Text className="text-white font-bold text-[11px]">70%</Text>
        </View>
        <View className="h-full bg-[#D9534F] justify-center items-center" style={{ width: '30%' }}>
          <Text className="text-white font-bold text-[11px]">30%</Text>
        </View>
      </View>
      
      <View className="flex-row justify-between mt-2">
        <View className="flex-1 pr-2">
          <View className="flex-row items-center mb-1">
            <View className="w-2.5 h-2.5 rounded-full bg-[#528F33] mr-2" />
            <Text className="text-[11px] font-bold text-[#4B5563]">Alimentos saudáveis (70%)</Text>
          </View>
          <Text className="text-[9px] text-[#6B7280] leading-tight">Frutas, verduras, proteínas magras, cereais integrais.</Text>
        </View>
        <View className="flex-1 pl-2 border-l border-gray-100">
          <View className="flex-row items-center mb-1">
            <View className="w-2.5 h-2.5 rounded-full bg-[#D9534F] mr-2" />
            <Text className="text-[11px] font-bold text-[#4B5563]">Alimentos não saudáveis (30%)</Text>
          </View>
          <Text className="text-[9px] text-[#6B7280] leading-tight">Industrializados, frituras, doces, refrigerantes.</Text>
        </View>
      </View>
    </View>
  );
}
