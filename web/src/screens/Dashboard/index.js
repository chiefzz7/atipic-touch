import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import AlertsWidget from '../../components/dashboard/AlertsWidget';
import CombosWidget from '../../components/dashboard/CombosWidget';
import LogsTableWidget from '../../components/dashboard/LogsTableWidget';
import { BarChartCor, RadarChartTextura, LineChartEvolucao, ProgressSaudaveis } from '../../components/dashboard/ChartWidgets';
import Footer from '../../components/ui/Footer';

export default function DashboardScreen() {
  return (
    <DashboardLayout>
      <ScrollView className="flex-1 bg-[#F9F8F3] p-6 lg:p-8" showsVerticalScrollIndicator={false}>
        <View className="flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <View>
            <Text className="text-[32px] font-extrabold text-[#212134]">Dashboard Clínico</Text>
            <Text className="text-[15px] text-[#6B7280] font-medium mt-1">Resumo do paciente <Text className="font-bold text-[#212134]">João Pedro</Text></Text>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-row items-center bg-white border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm">
              <Feather name="calendar" size={16} color="#4B5563" />
              <Text className="ml-2 text-[14px] font-bold text-[#4B5563]">Maio de 2026</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-[#528F33] px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#457a2a] transition-colors">
              <Feather name="file-text" size={16} color="#fff" />
              <Text className="ml-2 text-[14px] font-bold text-white">Gerar Relatório</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-4 mb-6">
          <StatCard title="Qualidade" value="7.6 / 10" icon="activity" color="#3B82F6" trend="up" trendValue="↑ +0.4 pts" />
          <StatCard title="Tentativas" value="248" icon="layers" color="#528F33" trend="up" trendValue="↑ 10% vs anterior" />
          <StatCard title="Aceitações" value="128" icon="check-circle" color="#528F33" trend="down" trendValue="↓ 4% vs anterior" />
          <StatCard title="Rejeições" value="112" icon="x-circle" color="#D9534F" trend="down" trendValue="↓ 12% vs anterior" />
        </View>

        <View className="flex-col lg:flex-row gap-6 mb-10">
          <AlertsWidget />
          <CombosWidget />
        </View>

        <View className="mb-10">
          <Text className="text-[20px] font-bold text-[#212134] mb-4">Análise Sensorial e Consumo</Text>

          <View className="flex-col lg:flex-row gap-4 mb-6">
            <View className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 min-h-[180px]">
              <LineChartEvolucao />
            </View>
            <View className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 min-h-[180px]">
              <BarChartCor />
            </View>
            <View className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 min-h-[180px]">
              <RadarChartTextura />
            </View>
          </View>

          <View className="flex-col lg:flex-row gap-4">
            <View className="flex-[2] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <ProgressSaudaveis />
            </View>

            <View className="flex-[1] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 justify-center">
              <Text className="text-[13px] font-bold text-[#212134] mb-4">Taxa Geral de Aceitação</Text>
              <View className="flex-row items-center justify-between">
                <View className="items-center justify-center relative">
                  <Feather name="pie-chart" size={64} color="#D4CDA8" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-[24px] font-extrabold text-[#528F33]">51.6%</Text>
                  <Text className="text-[11px] text-[#6B7280]">128 refeições aceitas de 248 tentativas.</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <LogsTableWidget />

        <Footer />
      </ScrollView>
    </DashboardLayout>
  );
}
