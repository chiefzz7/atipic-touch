import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import DashboardLayout from '../../components/layout/DashboardLayout';
import {
  ReportCard,
  PatientSummaryWidget,
  QuickMetricsGrid,
  SensoryMatrixWidget,
  HorizontalBarChart,
  RepertoireWidget,
  EditableNotesWidget,
  BehavioralFactorsWidget,
  SignatureWidget,
} from '../../components/report/ReportWidgets';
import Footer from '../../components/ui/Footer';

import useReportData from '../../hooks/useReportData';

import {
  calcularPeriodo,
  calcularFoodStats,
  calcularMaisAceitos,
  calcularMenosAceitos,
} from '../../utils/reports';

export default function ReportsScreen() {
  const {
    logs,
    selectedChild,
    professional,
    loading,
    error,
    carregarDados,
  } = useReportData();

  const periodo = calcularPeriodo(logs);

  const foodStats =
    calcularFoodStats(logs);

  const maisAceitos =
    calcularMaisAceitos(foodStats);

  const menosAceitos =
    calcularMenosAceitos(foodStats);

  const handlePrint = () => {
    if (Platform.OS === 'web') {
      window.print();
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <View className="flex-1 items-center justify-center bg-[#FDFFF1]">
          <ActivityIndicator
            size="large"
            color="#528F33"
          />

          <Text className="mt-3 text-[14px] text-[#6B7280]">
            Carregando relatório...
          </Text>
        </View>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <View className="flex-1 items-center justify-center bg-[#FDFFF1] p-6">
          <Feather
            name="alert-circle"
            size={40}
            color="#D9534F"
          />

          <Text className="mt-4 text-[18px] font-bold text-[#212134]">
            Não foi possível carregar o relatório
          </Text>

          <Text className="mt-2 text-[14px] text-[#6B7280] text-center">
            {error}
          </Text>

          <TouchableOpacity
            onPress={carregarDados}
            className="mt-5 bg-[#528F33] px-5 py-3 rounded-xl"
          >
            <Text className="text-white font-bold">
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ScrollView
        className="flex-1 bg-[#FDFFF1] p-6 lg:p-8 print:bg-white print:p-0"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 print:hidden">
          <View>
            <Text className="text-[32px] font-extrabold text-[#212134]">
              Relatório Clínico
            </Text>

            <Text className="text-[15px] text-[#6B7280] font-medium mt-1">
              Visão estruturada para prontuário
            </Text>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-row items-center bg-white border border-[#A3C78B] px-4 py-2.5 rounded-xl shadow-sm">
              <Feather
                name="calendar"
                size={16}
                color="#528F33"
              />

              <Text className="ml-2 text-[14px] font-bold text-[#528F33]">
                {periodo}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handlePrint}
              className="flex-row items-center bg-[#528F33] px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#457a2a] transition-colors"
            >
              <Feather
                name="download"
                size={16}
                color="#fff"
              />

              <Text className="ml-2 text-[14px] font-bold text-white">
                Exportar PDF
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full max-w-[1200px] self-center flex-col gap-5 mb-20">
          <PatientSummaryWidget
            child={selectedChild}
            logs={logs}
          />

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard
              title="1. Métricas de Exposição"
              flexClass="flex-[1]"
            >
              <QuickMetricsGrid
                logs={logs}
              />
            </ReportCard>

            <ReportCard
              title="2. Matriz de Aceitação Sensorial"
              flexClass="flex-[2]"
            >
              <SensoryMatrixWidget
                logs={logs}
              />
            </ReportCard>
          </View>

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard
              title="3. Top Aceitação"
              flexClass="flex-[1]"
            >
              <HorizontalBarChart
                data={maisAceitos}
                positive={true}
              />
            </ReportCard>

            <ReportCard
              title="4. Top Rejeição"
              flexClass="flex-[1]"
            >
              <HorizontalBarChart
                data={menosAceitos}
                positive={false}
              />
            </ReportCard>

            <ReportCard
              title="5. Fatores Comportamentais"
              flexClass="flex-[1.2]"
            >
              <BehavioralFactorsWidget
                logs={logs}
              />
            </ReportCard>
          </View>

          <ReportCard title="6. Mapeamento do Repertório Alimentar">
            <RepertoireWidget
              logs={logs}
            />
          </ReportCard>

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard flexClass="flex-[2]">
              <EditableNotesWidget />
            </ReportCard>

            <ReportCard
              title="7. Profissional Responsável"
              flexClass="flex-[1] justify-center items-center bg-[#F2F7ED]"
            >
              <SignatureWidget
                professional={professional}
              />
            </ReportCard>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </DashboardLayout>
  );
}
