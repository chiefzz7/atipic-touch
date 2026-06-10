import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const ReportCard = ({ title, children, flexClass = "flex-1" }) => (
  <View className={`bg-white border border-[#A3C78B] rounded-xl p-4 shadow-sm ${flexClass}`}>
    {title && <Text className="text-[14px] font-bold text-[#528F33] mb-3">{title}</Text>}
    {children}
  </View>
);

export const PatientSummaryWidget = () => (
  <View className="flex-col md:flex-row bg-[#F2F7ED] border border-[#A3C78B] rounded-xl mb-4 overflow-hidden shadow-sm">
    <View className="flex-1 p-5 border-b md:border-b-0 md:border-r border-[#A3C78B] flex-row items-center">
      <View className="w-16 h-16 bg-gray-300 rounded-full items-center justify-center mr-4 border-2 border-white shadow-sm overflow-hidden">
        <Feather name="user" size={24} color="#fff" />
      </View>
      <View>
        <Text className="text-[16px] font-bold text-[#528F33] mb-1">Dados do paciente</Text>
        <Text className="text-[14px] font-bold text-[#212134]">Nome: Lucas Ferreira</Text>
        <Text className="text-[13px] text-[#4B5563] mt-1">Idade: 6 Anos e 3 meses</Text>
      </View>
    </View>
    <View className="flex-1 p-5 flex-row items-start">
      <Feather name="clipboard" size={20} color="#212134" className="mr-3 mt-1" />
      <View className="flex-1">
        <Text className="text-[13px] font-bold text-[#528F33] mb-1">Resumo do período</Text>
        <Text className="text-[12px] text-[#4B5563] leading-tight">
          Durante o período analisado, Lucas realizou 15 sessões de alimentação, com aumento consistente nas reações positivas e redução nas rejeições quando comparado ao período anterior.
        </Text>
      </View>
    </View>
  </View>
);

export const QuickMetricsList = () => (
  <View className="flex-col gap-3 justify-center h-full">
    {[
      { icon: 'calendar', label: 'Sessões realizadas', value: '7' },
      { icon: 'clock', label: 'Tempo médio por sessão', value: '2' },
      { icon: 'box', label: 'Alimentos experimentados', value: '2' },
      { icon: 'plus-square', label: 'Novos alimentos', value: '2' },
    ].map((item, i) => (
      <View key={i} className="flex-row justify-between items-center border-b border-gray-100 pb-2 last:border-0">
        <View className="flex-row items-center">
          <Feather name={item.icon} size={14} color="#212134" />
          <Text className="text-[12px] font-bold text-[#212134] ml-2">{item.label}</Text>
        </View>
        <Text className="text-[13px] font-bold text-[#212134]">{item.value}</Text>
      </View>
    ))}
  </View>
);

export const HorizontalBarChart = ({ data, positive }) => (
  <View className="flex-col gap-3 mt-2">
    <View className="flex-row justify-between border-b border-gray-200 pb-1 mb-1">
      <Text className="text-[9px] font-bold text-[#9CA3AF] uppercase">Alimento</Text>
      <Text className="text-[9px] font-bold text-[#9CA3AF] uppercase">% de reações {positive ? 'positivas' : 'negativas'}</Text>
    </View>
    {data.map((item, i) => (
      <View key={i} className="flex-row items-center justify-between">
        <View className="flex-row items-center w-20">
          <Text className="text-[12px] mr-2">{item.emoji}</Text>
          <Text className="text-[11px] text-[#4B5563]">{item.name}</Text>
        </View>
        <View className="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <View className={`h-full ${positive ? 'bg-[#528F33]' : 'bg-[#D9534F]'}`} style={{ width: item.value }} />
        </View>
        <Text className="text-[11px] font-medium text-[#6B7280] w-8 text-right">{item.value}</Text>
      </View>
    ))}
  </View>
);

export const SensoryProfileList = () => (
  <View className="flex-col gap-3 mt-2">
    {[
      { title: 'Texturas preferidas', desc: 'Macias e pastosas', icon: 'smile', color: 'text-red-300' },
      { title: 'Texturas menos aceitas', desc: 'Crocantes e fibrosas', icon: 'frown', color: 'text-yellow-500' },
      { title: 'Sabores preferidos', desc: 'Doces e neutros', icon: 'heart', color: 'text-blue-300' },
      { title: 'Sabores menos aceitos', desc: 'Amargos e ácidos', icon: 'x-circle', color: 'text-red-400' },
      { title: 'Temperatura preferida', desc: 'Alimentos em temperatura ambiente', icon: 'thermometer', color: 'text-purple-300' },
    ].map((item, i) => (
      <View key={i} className="flex-row items-start mb-1">
        <View className="w-6 h-6 rounded-full bg-gray-50 items-center justify-center mr-2 border border-gray-100 mt-0.5">
           <Feather name={item.icon} size={12} className={item.color} color="#9CA3AF" />
        </View>
        <View>
          <Text className="text-[11px] font-bold text-[#4B5563]">{item.title}</Text>
          <Text className="text-[10px] text-[#6B7280]">{item.desc}</Text>
        </View>
      </View>
    ))}
  </View>
);
