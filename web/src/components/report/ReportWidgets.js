import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const ReportCard = ({ title, children, flexClass = "flex-1" }) => (
  <View className={`bg-white border border-[#A3C78B] rounded-2xl p-5 shadow-sm ${flexClass}`}>
    {title && <Text className="text-[15px] font-extrabold text-[#528F33] mb-4 uppercase tracking-wide">{title}</Text>}
    {children}
  </View>
);

export const PatientSummaryWidget = () => (
  <View className="flex-col md:flex-row bg-[#F2F7ED] border border-[#A3C78B] rounded-2xl mb-4 shadow-sm">
    <View className="flex-1 p-5 border-b md:border-b-0 md:border-r border-[#A3C78B] flex-row items-center">
      <View className="w-16 h-16 bg-gray-300 rounded-full items-center justify-center mr-4 border-2 border-white shadow-sm overflow-hidden">
        <Feather name="user" size={24} color="#fff" />
      </View>
      <View>
        <Text className="text-[12px] font-bold text-[#528F33] uppercase tracking-wider mb-1">Dados do paciente</Text>
        <Text className="text-[18px] font-extrabold text-[#212134]">Lucas Ferreira</Text>
        <Text className="text-[13px] text-[#4B5563] mt-0.5">Idade: 6 Anos e 3 meses | CID: F84.0</Text>
      </View>
    </View>
    <View className="flex-1 p-5 flex-row items-start">
      <Feather name="activity" size={20} color="#528F33" className="mr-3 mt-1" />
      <View className="flex-1">
        <Text className="text-[12px] font-bold text-[#528F33] uppercase tracking-wider mb-1">Evolução Global</Text>
        <Text className="text-[13px] text-[#4B5563] leading-relaxed">
          O paciente realizou 24 sessões no período. A interação tátil subiu para 78%, e a taxa de aceitação global fixou-se em 51.6%. Houve redução notável de crises perante texturas sólidas.
        </Text>
      </View>
    </View>
  </View>
);

export const QuickMetricsGrid = () => (
  <View className="flex-row flex-wrap gap-4 h-full content-center">
    {[
      { icon: 'calendar', label: 'Sessões', value: '24' },
      { icon: 'clock', label: 'Tempo Médio', value: '14 min' },
      { icon: 'check-circle', label: 'Aceitação', value: '51.6%' },
      { icon: 'alert-triangle', label: 'Rejeição Tátil', value: '18%' },
    ].map((item, i) => (
      <View key={i} className="w-[45%] flex-row items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
        <View className="w-8 h-8 rounded-full bg-[#EAF3E2] items-center justify-center mr-2">
          <Feather name={item.icon} size={14} color="#528F33" />
        </View>
        <View>
          <Text className="text-[10px] text-[#6B7280] uppercase font-bold">{item.label}</Text>
          <Text className="text-[15px] font-extrabold text-[#212134]">{item.value}</Text>
        </View>
      </View>
    ))}
  </View>
);

export const SensoryMatrixWidget = () => (
  <View className="flex-col w-full">
    <View className="flex-row border-b border-[#A3C78B] pb-2 mb-2 bg-[#F2F7ED] p-2 rounded-t-lg hidden md:flex-row">
      <Text className="flex-[1.5] text-[11px] font-bold text-[#528F33] uppercase">Textura Base</Text>
      <Text className="flex-1 text-[11px] font-bold text-[#528F33] uppercase text-center">Exposição</Text>
      <Text className="flex-1 text-[11px] font-bold text-[#528F33] uppercase text-center">Aceitação</Text>
      <Text className="flex-1 text-[11px] font-bold text-[#528F33] uppercase text-center">Sucesso</Text>
    </View>
    {[
      { tex: 'Sólido/Macio', exp: 80, aceit: 60, taxa: '75.0%', color: 'text-[#528F33]' },
      { tex: 'Crocante', exp: 45, aceit: 30, taxa: '66.6%', color: 'text-yellow-600' },
      { tex: 'Líquido', exp: 60, aceit: 35, taxa: '58.3%', color: 'text-yellow-600' },
      { tex: 'Pastoso (Gatilho)', exp: 63, aceit: 3, taxa: '4.7%', color: 'text-[#D9534F]' }, 
    ].map((row, i) => (
      <View key={i} className="flex-col md:flex-row border-b border-gray-100 py-2 px-2 last:border-0 hover:bg-gray-50 transition-colors">
        <Text className="flex-[1.5] text-[12px] font-bold text-[#4B5563]">{row.tex}</Text>
        <Text className="flex-1 text-[12px] text-[#6B7280] text-center">{row.exp}</Text>
        <Text className="flex-1 text-[12px] text-[#6B7280] text-center">{row.aceit}</Text>
        <Text className={`flex-1 text-[12px] font-bold text-center ${row.color}`}>{row.taxa}</Text>
      </View>
    ))}
  </View>
);

export const HorizontalBarChart = ({ data, positive }) => (
  <View className="flex-col gap-3">
    {data.map((item, i) => (
      <View key={i} className="flex-row items-center justify-between">
        <View className="flex-row items-center w-20">
          <Text className="text-[14px] mr-2">{item.emoji}</Text>
          <Text className="text-[12px] font-medium text-[#4B5563]">{item.name}</Text>
        </View>
        <View className="flex-1 mx-3 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <View className={`h-full ${positive ? 'bg-[#528F33]' : 'bg-[#D9534F]'}`} style={{ width: item.value }} />
        </View>
        <Text className="text-[11px] font-bold text-[#6B7280] w-8 text-right">{item.value}</Text>
      </View>
    ))}
  </View>
);

export const RepertoireWidget = () => (
  <View className="flex-col lg:flex-row gap-4 mt-2">
    <View className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
      <Text className="text-[11px] font-bold text-[#4B5563] uppercase mb-3">Conforto (100% Aceitação)</Text>
      <View className="flex-row flex-wrap gap-2">
        {['🍚 Arroz', '🍎 Maçã', '🧀 Pão de Queijo', '🍌 Banana'].map((food, i) => (
          <View key={i} className="bg-[#EAF3E2] px-3 py-1.5 rounded-lg border border-[#A3C78B]"><Text className="text-[11px] font-bold text-[#528F33]">{food}</Text></View>
        ))}
      </View>
    </View>

    <View className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
      <Text className="text-[11px] font-bold text-[#4B5563] uppercase mb-3">Novos (Aceitos no mês)</Text>
      <View className="flex-row flex-wrap gap-2">
        {['🥕 Cenoura Crua', '🥚 Ovo Cozido'].map((food, i) => (
          <View key={i} className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"><Text className="text-[11px] font-bold text-blue-600">{food}</Text></View>
        ))}
      </View>
    </View>

    <View className="flex-1 bg-red-50 p-4 rounded-xl border border-red-100">
      <Text className="text-[11px] font-bold text-[#D9534F] uppercase mb-3">Em Dessensibilização</Text>
      <View className="flex-row flex-wrap gap-2">
        {['🥦 Brócolis (Tocou)', '🥔 Purê (Cheirou)'].map((food, i) => (
          <View key={i} className="bg-white px-3 py-1.5 rounded-lg border border-red-200"><Text className="text-[11px] font-bold text-[#D9534F]">{food}</Text></View>
        ))}
      </View>
    </View>
  </View>
);

export const EditableNotesWidget = () => (
  <View className="flex-1">
    <View className="flex-row items-center mb-3">
      <Feather name="edit-3" size={16} color="#528F33" />
      <Text className="text-[12px] font-bold text-[#528F33] uppercase ml-2">Parecer Clínico e Conduta</Text>
    </View>
    <TextInput
      multiline
      numberOfLines={6}
      placeholder="Digite suas observações e o plano terapêutico aqui..."
      className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-[13px] text-[#212134] min-h-[140px] outline-none focus:border-[#A3C78B] transition-colors"
      textAlignVertical="top"
      defaultValue="Paciente demonstrou excelente tolerância à introdução de texturas crocantes no ambiente clínico. Notamos forte repulsa tátil a texturas pastosas. META: Continuar exposição lúdica e iniciar pareamento do purê com estímulos visuais."
    />
  </View>
);
