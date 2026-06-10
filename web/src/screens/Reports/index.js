import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  ReportCard, 
  PatientSummaryWidget, 
  QuickMetricsList, 
  HorizontalBarChart, 
  SensoryProfileList 
} from '../../components/report/ReportWidgets';

export default function ReportsScreen() {
  
  const maisAceitos = [
    { emoji: '🍌', name: 'Banana', value: '92%' },
    { emoji: '🍎', name: 'Maçã', value: '87%' },
    { emoji: '🍚', name: 'Arroz', value: '83%' },
    { emoji: '🥛', name: 'Iogurte', value: '77%' },
    { emoji: '🥔', name: 'Batata', value: '75%' },
  ];

  const menosAceitos = [
    { emoji: '🥦', name: 'Brócolis', value: '82%' },
    { emoji: '🫑', name: 'Pimentão', value: '58%' },
    { emoji: '🐟', name: 'Peixe', value: '53%' },
    { emoji: '🥕', name: 'Cenoura', value: '47%' },
    { emoji: '🍅', name: 'Tomate', value: '40%' },
  ];

  return (
    <DashboardLayout>
      <ScrollView className="flex-1 bg-[#FDFFF1] p-6 lg:p-8" showsVerticalScrollIndicator={false}>
        <View className="flex-col md:flex-row justify-end items-start md:items-center mb-6 gap-3">
          <TouchableOpacity className="flex-row items-center bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm">
            <Feather name="calendar" size={16} color="#6B7280" />
            <Text className="ml-2 text-[14px] font-medium text-[#4B5563]">Maio de 2026</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center bg-[#528F33] px-5 py-2 rounded-lg shadow-sm hover:bg-[#457a2a] transition-colors">
            <Feather name="file-text" size={16} color="#fff" />
            <Text className="ml-2 text-[14px] font-bold text-white">Baixar PDF</Text>
          </TouchableOpacity>
        </View>

        <View className="max-w-[1000px] w-full self-center flex-col gap-4 mb-20">
          <PatientSummaryWidget />

          <View className="flex-col lg:flex-row gap-4">
            <ReportCard title="1. Resumo Analítico" flexClass="flex-[2]">
              <Text className="text-[14px] font-bold text-[#212134] leading-relaxed">
                Observa-se uma evolução positiva nas interações alimentares de Lucas ao longo do mês. Houve aumento de 6% nas reações positivas e redução de 6% nas rejeições em comparação ao período anterior. O tempo médio de sessão também apresentou leve aumento, indicando maior engajamento durante as refeições.
              </Text>
            </ReportCard>
            <ReportCard flexClass="flex-[1]">
              <QuickMetricsList />
            </ReportCard>
          </View>

          <View className="flex-col lg:flex-row gap-4">
            <ReportCard title="2. Evolução da reações ao longo do tempo" flexClass="flex-[2]">
              <View className="h-32 justify-end border-b border-l border-gray-200 pb-1 pl-1 relative mt-4">
                <View className="flex-row justify-center gap-4 absolute -top-4 w-full">
                  <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-[#528F33] mr-1"/><Text className="text-[9px]">Positivas</Text></View>
                  <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-[#F59E0B] mr-1"/><Text className="text-[9px]">Neutras</Text></View>
                  <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-[#D9534F] mr-1"/><Text className="text-[9px]">Negativas</Text></View>
                </View>
                <View className="flex-row justify-between px-2">
                  <Text className="text-[8px] text-gray-400">01/05</Text>
                  <Text className="text-[8px] text-gray-400">08/05</Text>
                  <Text className="text-[8px] text-gray-400">15/05</Text>
                  <Text className="text-[8px] text-gray-400">22/05</Text>
                  <Text className="text-[8px] text-gray-400">29/05</Text>
                </View>
              </View>
            </ReportCard>

            <ReportCard flexClass="flex-[1] justify-center">
              <View className="flex-row items-center mb-2">
                <Feather name="smile" size={16} color="#528F33" />
                <Text className="text-[12px] font-bold text-[#528F33] ml-2 uppercase tracking-wide">Interpretação</Text>
              </View>
              <Text className="text-[12px] text-[#212134] leading-tight font-medium">
                A tendência geral indica melhora na aceitação dos alimentos, com aumento gradual das reações positivas e estabilidade nas reações neutras. As rejeições permaneceram em baixa frequência e com redução consistente.
              </Text>
            </ReportCard>

            <ReportCard title="5. Perfil sensorial" flexClass="flex-[1.2]">
              <SensoryProfileList />
            </ReportCard>
          </View>

          <View className="flex-col lg:flex-row gap-4">
            <ReportCard title="3. Alimentos mais aceitos" flexClass="flex-[1]">
              <HorizontalBarChart data={maisAceitos} positive={true} />
            </ReportCard>

            <ReportCard title="4. Alimentos menos aceitos" flexClass="flex-[1]">
              <HorizontalBarChart data={menosAceitos} positive={false} />
            </ReportCard>

            <ReportCard title="6. Histórico de sessões" flexClass="flex-[1.5]">
              <View className="flex-row border-b border-gray-100 pb-1 mb-2">
                <Text className="flex-1 text-[8px] font-bold text-[#9CA3AF] uppercase">Data</Text>
                <Text className="flex-1 text-[8px] font-bold text-[#9CA3AF] uppercase">Alimento</Text>
                <Text className="flex-1 text-[8px] font-bold text-[#9CA3AF] uppercase">Reação</Text>
                <Text className="flex-1 text-[8px] font-bold text-[#9CA3AF] uppercase text-right">Duração</Text>
              </View>
              {[
                { date: '31/05', food: 'Arroz com frango', reaction: 'smile', color: '#528F33', duration: '20 min' },
                { date: '28/05', food: 'Banana', reaction: 'smile', color: '#528F33', duration: '15 min' },
                { date: '25/05', food: 'Brócolis', reaction: 'frown', color: '#D9534F', duration: '12 min' },
              ].map((row, i) => (
                <View key={i} className="flex-row border-b border-gray-50 py-1.5 items-center">
                  <Text className="flex-1 text-[10px] text-[#4B5563]">{row.date}</Text>
                  <Text className="flex-1 text-[10px] font-bold text-[#4B5563]">{row.food}</Text>
                  <View className="flex-1 items-start">
                    <Feather name={row.reaction} size={12} color={row.color} />
                  </View>
                  <Text className="flex-1 text-[10px] text-[#4B5563] text-right">{row.duration}</Text>
                </View>
              ))}
            </ReportCard>
          </View>

          <View className="flex-col lg:flex-row gap-4">
            <ReportCard title="7. Recomendações" flexClass="flex-[1] max-w-md">
              <View className="flex-col gap-2 mt-1">
                <Text className="text-[12px] text-[#212134] font-medium leading-tight">• Manter exposição gradual a alimentos rejeitados.</Text>
                <Text className="text-[12px] text-[#212134] font-medium leading-tight">• Oferecer opções de texturas variadas de forma lúdica e sem pressão.</Text>
                <Text className="text-[12px] text-[#212134] font-medium leading-tight">• Reforçar positivamente cada tentativa e pequena aceitação.</Text>
                <Text className="text-[12px] text-[#212134] font-medium leading-tight">• Priorizar alimentos preferidos como estratégia de segurança nas refeições.</Text>
              </View>
            </ReportCard>
            <View className="flex-[2]" />
          </View>

        </View>
      </ScrollView>
    </DashboardLayout>
  );
}
