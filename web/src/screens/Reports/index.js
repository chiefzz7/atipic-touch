import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Modal,
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
import usePeriodFilter from '../../hooks/usePeriodFilter';

import {
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

  const {
    periodType,
    selectedDate,
    logsFiltrados,
    setSelectedDate,
    formatPeriod,
    selecionarPeriodo,
  } = usePeriodFilter(logs);

  const [showPeriodModal, setShowPeriodModal] = useState(false);

  useEffect(() => {
    if (logs.length === 0) {
      return;
    }

    const latestLog = [...logs]
      .filter(log => log.timestamp)
      .sort(
        (a, b) =>
          new Date(b.timestamp) - new Date(a.timestamp)
      )[0];

    if (latestLog) {
      setSelectedDate(new Date(latestLog.timestamp));
    }
  }, [logs, setSelectedDate]);

  const foodStats = calcularFoodStats(logsFiltrados);

  const maisAceitos = calcularMaisAceitos(foodStats);

  const menosAceitos = calcularMenosAceitos(foodStats);

  const handlePrint = () => {
    if (Platform.OS === 'web') {
      window.print();
    }
  };

  const selecionarPeriodoReports = type => {
    selecionarPeriodo(type);
    setShowPeriodModal(false);
  };

  const navegarPeriodo = direction => {
    if (periodType === 'all' || !selectedDate) {
      return;
    }

    const nextDate = new Date(selectedDate);

    if (periodType === 'day') {
      nextDate.setDate(
        nextDate.getDate() + direction
      );
    }

    if (periodType === 'week') {
      nextDate.setDate(
        nextDate.getDate() + direction * 7
      );
    }

    if (periodType === 'month') {
      nextDate.setMonth(
        nextDate.getMonth() + direction
      );
    }

    setSelectedDate(nextDate);
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
            <TouchableOpacity
              onPress={() => setShowPeriodModal(true)}
              className="flex-row items-center bg-white border border-[#A3C78B] px-4 py-2.5 rounded-xl shadow-sm"
            >
              <Feather
                name="calendar"
                size={16}
                color="#528F33"
              />

              <Text className="ml-2 text-[14px] font-bold text-[#528F33]">
                {formatPeriod()}
              </Text>

              <Feather
                name="chevron-down"
                size={14}
                color="#528F33"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>

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

        <View className="flex-row items-center justify-center gap-2 mb-6 print:hidden">
          <TouchableOpacity
            onPress={() => navegarPeriodo(-1)}
            disabled={periodType === 'all'}
            className={`w-10 h-10 rounded-xl items-center justify-center border ${
              periodType === 'all'
                ? 'bg-gray-100 border-gray-200'
                : 'bg-white border-gray-200'
            }`}
          >
            <Feather
              name="chevron-left"
              size={20}
              color={
                periodType === 'all'
                  ? '#D1D5DB'
                  : '#528F33'
              }
            />
          </TouchableOpacity>

          <View className="min-w-[220px] items-center px-4 py-2">
            <Text className="text-[15px] font-bold text-[#212134]">
              {formatPeriod()}
            </Text>

            {periodType !== 'all' && (
              <Text className="text-[11px] text-[#6B7280] mt-1">
                Use as setas para navegar entre períodos
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navegarPeriodo(1)}
            disabled={periodType === 'all'}
            className={`w-10 h-10 rounded-xl items-center justify-center border ${
              periodType === 'all'
                ? 'bg-gray-100 border-gray-200'
                : 'bg-white border-gray-200'
            }`}
          >
            <Feather
              name="chevron-right"
              size={20}
              color={
                periodType === 'all'
                  ? '#D1D5DB'
                  : '#528F33'
              }
            />
          </TouchableOpacity>
        </View>

        <Modal
          visible={showPeriodModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowPeriodModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowPeriodModal(false)}
            className="flex-1 bg-black/30 items-center justify-center p-6"
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              className="bg-white rounded-2xl w-full max-w-[420px] p-6 shadow-lg"
            >
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-[18px] font-bold text-[#212134]">
                  Selecionar período
                </Text>

                <TouchableOpacity
                  onPress={() => setShowPeriodModal(false)}
                >
                  <Feather
                    name="x"
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() =>
                  selecionarPeriodoReports('day')
                }
                className={`flex-row items-center justify-between p-4 rounded-xl border mb-3 ${
                  periodType === 'day'
                    ? 'bg-[#F1F7EC] border-[#528F33]'
                    : 'bg-white border-gray-200'
                }`}
              >
                <View className="flex-row items-center">
                  <Feather
                    name="calendar"
                    size={18}
                    color="#528F33"
                  />

                  <Text className="ml-3 text-[14px] font-bold text-[#212134]">
                    Dia
                  </Text>
                </View>

                {periodType === 'day' && (
                  <Feather
                    name="check"
                    size={18}
                    color="#528F33"
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  selecionarPeriodoReports('week')
                }
                className={`flex-row items-center justify-between p-4 rounded-xl border mb-3 ${
                  periodType === 'week'
                    ? 'bg-[#F1F7EC] border-[#528F33]'
                    : 'bg-white border-gray-200'
                }`}
              >
                <View className="flex-row items-center">
                  <Feather
                    name="calendar"
                    size={18}
                    color="#528F33"
                  />

                  <Text className="ml-3 text-[14px] font-bold text-[#212134]">
                    Semana
                  </Text>
                </View>

                {periodType === 'week' && (
                  <Feather
                    name="check"
                    size={18}
                    color="#528F33"
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  selecionarPeriodoReports('month')
                }
                className={`flex-row items-center justify-between p-4 rounded-xl border mb-3 ${
                  periodType === 'month'
                    ? 'bg-[#F1F7EC] border-[#528F33]'
                    : 'bg-white border-gray-200'
                }`}
              >
                <View className="flex-row items-center">
                  <Feather
                    name="calendar"
                    size={18}
                    color="#528F33"
                  />

                  <Text className="ml-3 text-[14px] font-bold text-[#212134]">
                    Mês
                  </Text>
                </View>

                {periodType === 'month' && (
                  <Feather
                    name="check"
                    size={18}
                    color="#528F33"
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  selecionarPeriodoReports('all')
                }
                className={`flex-row items-center justify-between p-4 rounded-xl border ${
                  periodType === 'all'
                    ? 'bg-[#F1F7EC] border-[#528F33]'
                    : 'bg-white border-gray-200'
                }`}
              >
                <View className="flex-row items-center">
                  <Feather
                    name="list"
                    size={18}
                    color="#528F33"
                  />

                  <Text className="ml-3 text-[14px] font-bold text-[#212134]">
                    Todos os registros
                  </Text>
                </View>

                {periodType === 'all' && (
                  <Feather
                    name="check"
                    size={18}
                    color="#528F33"
                  />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

        <View className="w-full max-w-[1200px] self-center flex-col gap-5 mb-20">
          <PatientSummaryWidget
            child={selectedChild}
            logs={logsFiltrados}
          />

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard
              title="1. Métricas de Exposição"
              flexClass="flex-[1]"
            >
              <QuickMetricsGrid
                logs={logsFiltrados}
              />
            </ReportCard>

            <ReportCard
              title="2. Matriz de Aceitação Sensorial"
              flexClass="flex-[2]"
            >
              <SensoryMatrixWidget
                logs={logsFiltrados}
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
                logs={logsFiltrados}
              />
            </ReportCard>
          </View>

          <ReportCard title="6. Mapeamento do Repertório Alimentar">
            <RepertoireWidget
              logs={logsFiltrados}
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
