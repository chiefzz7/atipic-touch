import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  ReportCard, 
  PatientSummaryWidget, 
  QuickMetricsGrid, 
  SensoryMatrixWidget,
  HorizontalBarChart, 
  RepertoireWidget,
  EditableNotesWidget
} from '../../components/report/ReportWidgets';

export default function ReportsScreen() {
  
  const handlePrint = () => {
    if (Platform.OS === 'web') {
      window.print();
    }
  };

  const maisAceitos = [
    { emoji: '🍌', name: 'Banana', value: '92%' },
    { emoji: '🍎', name: 'Maçã', value: '87%' },
    { emoji: '🍚', name: 'Arroz', value: '83%' },
  ];

  const menosAceitos = [
    { emoji: '🥦', name: 'Brócolis', value: '82%' },
    { emoji: '🫑', name: 'Pimentão', value: '58%' },
    { emoji: '🥔', name: 'Purê', value: '95%' },
  ];

  return (
    <DashboardLayout>
      <ScrollView className="flex-1 bg-[#FDFFF1] p-6 lg:p-8 print:bg-white print:p-0" showsVerticalScrollIndicator={false}>
        <View className="flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 print:hidden">
          <View>
            <Text className="text-[32px] font-extrabold text-[#212134]">Relatório Clínico</Text>
            <Text className="text-[15px] text-[#6B7280] font-medium mt-1">Visão estruturada para prontuário</Text>
          </View>
          
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-row items-center bg-white border border-[#A3C78B] px-4 py-2.5 rounded-xl shadow-sm">
              <Feather name="calendar" size={16} color="#528F33" />
              <Text className="ml-2 text-[14px] font-bold text-[#528F33]">Maio de 2026</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handlePrint}
              className="flex-row items-center bg-[#528F33] px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#457a2a] transition-colors"
            >
              <Feather name="download" size={16} color="#fff" />
              <Text className="ml-2 text-[14px] font-bold text-white">Exportar PDF</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full max-w-[1200px] self-center flex-col gap-5 mb-20">
          <PatientSummaryWidget />

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard title="1. Métricas de Exposição" flexClass="flex-[1]">
              <QuickMetricsGrid />
            </ReportCard>
            
            <ReportCard title="2. Matriz de Aceitação Sensorial" flexClass="flex-[2]">
              <SensoryMatrixWidget />
            </ReportCard>
          </View>

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard title="3. Top Aceitação" flexClass="flex-[1]">
              <HorizontalBarChart data={maisAceitos} positive={true} />
            </ReportCard>

            <ReportCard title="4. Top Rejeição" flexClass="flex-[1]">
              <HorizontalBarChart data={menosAceitos} positive={false} />
            </ReportCard>

            <ReportCard title="5. Fatores Comportamentais" flexClass="flex-[1.2]">
              <View className="flex-col gap-3 mt-1">
                <View className="flex-row items-start"><View className="w-2 h-2 rounded-full bg-red-400 mt-1.5 mr-2"/><Text className="text-[13px] text-[#4B5563] flex-1">Maior rejeição em <Text className="font-bold">casa</Text> (Comparado à clínica).</Text></View>
                <View className="flex-row items-start"><View className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"/><Text className="text-[13px] text-[#4B5563] flex-1">Picos de crise sensorial identificados no horário do <Text className="font-bold">jantar</Text>.</Text></View>
                <View className="flex-row items-start"><View className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"/><Text className="text-[13px] text-[#4B5563] flex-1">Aceitação aumenta em 30% quando ofertado pela <Text className="font-bold">mãe</Text>.</Text></View>
              </View>
            </ReportCard>
          </View>
          <ReportCard title="6. Mapeamento do Repertório Alimentar">
            <RepertoireWidget />
          </ReportCard>

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard flexClass="flex-[2]">
              <EditableNotesWidget />
            </ReportCard>
            
            <ReportCard title="7. Assinatura Eletrônica" flexClass="flex-[1] justify-center items-center bg-[#F2F7ED]">
              <Feather name="check-circle" size={32} color="#528F33" className="mb-3" />
              <Text className="text-[14px] font-bold text-[#212134]">Dra. Camila Nogueira</Text>
              <Text className="text-[12px] text-[#6B7280] mb-3">CRN-3 45892</Text>
              <View className="bg-white px-3 py-1.5 rounded border border-[#A3C78B]">
                <Text className="text-[10px] font-bold text-[#528F33]">Doc #LT-202605</Text>
              </View>
            </ReportCard>
          </View>
        </View>
      </ScrollView>
    </DashboardLayout>
  );
}
