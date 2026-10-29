import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import DashboardLayout from '../../components/layout/DashboardLayout';
import PeriodModal from '../../components/common/PeriodModal';
import Toast from '../../components/common/Toast';
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
  PrintHeader,
  AuthFooter,
} from '../../components/report/ReportWidgets';
import Footer from '../../components/ui/Footer';

import useReportData from '../../hooks/useReportData';
import usePeriodFilter from '../../hooks/usePeriodFilter';
import useAutosavedNote from '../../hooks/useAutosavedNote';
import useReportAuth from '../../hooks/useReportAuth';
import { useSettings } from '../../context/SettingsContext';
import { downloadText } from '../../utils/image';
import { logsToCsv } from '../../utils/format';
import { calcularFoodStats, calcularMaisAceitos, calcularMenosAceitos, calcularResumo } from '../../utils/reports';

const pad = (n) => String(n).padStart(2, '0');

function periodKey(type, date) {
  if (type === 'all' || !date) return 'all';
  const d = new Date(date);
  if (type === 'day') return `day-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  if (type === 'week') {
    const diff = d.getDay() === 0 ? -6 : 1 - d.getDay();
    d.setDate(d.getDate() + diff);
    return `week-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  return `month-${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

export default function ReportsScreen() {
  const { settings } = useSettings();
  const { logs, selectedChild, professional, loading, error, carregarDados, atualizar } = useReportData({ withProfessional: true });
  const { periodType, selectedDate, logsFiltrados, setSelectedDate, formatPeriod, selecionarPeriodo } = usePeriodFilter(logs);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [toast, setToast] = useState(null);

  const latestTimestamp = useMemo(() => {
    let latest = 0;
    for (const log of logs) {
      const t = log.timestamp ? new Date(log.timestamp).getTime() : 0;
      if (t > latest) latest = t;
    }
    return latest;
  }, [logs]);

  useEffect(() => {
    if (latestTimestamp) setSelectedDate(new Date(latestTimestamp));
  }, [latestTimestamp, setSelectedDate]);

  const { foodStats, maisAceitos, menosAceitos, resumo } = useMemo(() => {
    const stats = calcularFoodStats(logsFiltrados);
    return {
      foodStats: stats,
      maisAceitos: calcularMaisAceitos(stats),
      menosAceitos: calcularMenosAceitos(stats),
      resumo: calcularResumo(logsFiltrados),
    };
  }, [logsFiltrados]);

  const key = selectedChild ? `@atipictouch:notes:${selectedChild.id}:${periodKey(periodType, selectedDate)}` : null;
  const note = useAutosavedNote(key);

  const { documents, clinic, profile } = settings;
  const periodo = formatPeriod();
  const geradoEm = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  const auth = useReportAuth({
    enabled: documents.usarHash,
    withQr: documents.usarQrCode,
    payload: {
      paciente: selectedChild?.id,
      periodo: periodKey(periodType, selectedDate),
      resumo,
      parecer: note.text,
      registro: profile.registro,
      emitido: new Date().toISOString().slice(0, 10),
    },
  });

  const notify = (message, type = 'success') => setToast({ message, type });

  const handlePrint = () => {
    if (typeof window === 'undefined') return;
    const previous = document.title;
    document.title = `Relatorio-${(selectedChild?.nome || 'paciente').replace(/\s+/g, '-')}-${periodo.replace(/[^\w]+/g, '-')}`;
    window.print();
    setTimeout(() => {
      document.title = previous;
    }, 500);
  };

  const handleCsv = () => {
    if (!logsFiltrados.length) return notify('Não há registros no período selecionado.', 'error');
    downloadText(
      `registros-${(selectedChild?.nome || 'paciente').toLowerCase().replace(/\s+/g, '-')}.csv`,
      logsToCsv(logsFiltrados, selectedChild, { anonimizar: settings.system.anonimizar })
    );
    notify(`${logsFiltrados.length} registros exportados.`);
  };

  const selecionarPeriodoReports = (type) => {
    selecionarPeriodo(type);
    setShowPeriodModal(false);
  };

  const navegarPeriodo = (direction) => {
    if (periodType === 'all' || !selectedDate) return;
    const next = new Date(selectedDate);
    if (periodType === 'day') next.setDate(next.getDate() + direction);
    if (periodType === 'week') next.setDate(next.getDate() + direction * 7);
    if (periodType === 'month') next.setMonth(next.getMonth() + direction, 1);
    setSelectedDate(next);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <View className="flex-1 items-center justify-center bg-[#FFFCEF]">
          <ActivityIndicator size="large" color="#528F33" />
          <Text className="mt-3 text-[14px] text-[#6B6554]">Carregando relatório...</Text>
        </View>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <View className="flex-1 items-center justify-center bg-[#FFFCEF] p-6">
          <Feather name="alert-circle" size={40} color="#D9534F" />
          <Text className="mt-4 text-[18px] font-bold text-[#212134]">Não foi possível carregar o relatório</Text>
          <Text className="mt-2 text-[14px] text-[#6B6554] text-center">{error}</Text>
          <TouchableOpacity
            onPress={() => carregarDados({ force: true })}
            className="mt-5 bg-[#528F33] px-5 py-3 rounded-[12px] hover:bg-[#467A2B] transition-colors"
          >
            <Text className="text-white font-bold">Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </DashboardLayout>
    );
  }

  const navDisabled = periodType === 'all';
  const NavButton = ({ dir, icon }) => (
    <TouchableOpacity
      onPress={() => navegarPeriodo(dir)}
      disabled={navDisabled}
      accessibilityLabel={dir < 0 ? 'Período anterior' : 'Próximo período'}
      className={`w-10 h-10 rounded-[12px] items-center justify-center border ${
        navDisabled ? 'bg-[#F3F7EE] border-[#DCE7D2] opacity-60' : 'bg-white border-[#DCE7D2] hover:bg-[#EEF5E8]'
      }`}
    >
      <Feather name={icon} size={20} color={navDisabled ? '#9A9279' : '#528F33'} />
    </TouchableOpacity>
  );

  return (
    <DashboardLayout>
      <Toast toast={toast} onHide={() => setToast(null)} />
      <ScrollView className="flex-1 bg-[#FFFCEF] px-5 py-6 lg:px-8 lg:py-8" showsVerticalScrollIndicator={false}>
        <View className="flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 print-hide">
          <View>
            <Text className="text-[30px] font-extrabold text-[#212134] tracking-tight">Relatório clínico</Text>
            <Text className="text-[15px] text-[#6B6554] font-medium mt-1">Visão estruturada para prontuário</Text>
          </View>

          <View className="flex-row gap-3 flex-wrap">
            <TouchableOpacity
              onPress={() => setShowPeriodModal(true)}
              className="flex-row items-center bg-white border border-[#A3C78B] px-4 h-11 rounded-[12px] hover:bg-[#EEF5E8]"
            >
              <Feather name="calendar" size={16} color="#528F33" />
              <Text className="ml-2 text-[14px] font-bold text-[#528F33]">{periodo}</Text>
              <Feather name="chevron-down" size={14} color="#528F33" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCsv}
              className="flex-row items-center bg-white border border-[#DCE7D2] px-4 h-11 rounded-[12px] hover:bg-[#F3F7EE]"
            >
              <Feather name="table" size={16} color="#212134" />
              <Text className="ml-2 text-[14px] font-bold text-[#212134]">CSV</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePrint}
              className="flex-row items-center bg-[#528F33] px-5 h-11 rounded-[12px] hover:bg-[#467A2B] transition-colors"
            >
              <Feather name="download" size={16} color="#FFFFFF" />
              <Text className="ml-2 text-[14px] font-bold text-white">Exportar PDF</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center justify-center gap-3 mb-6 print-hide">
          <NavButton dir={-1} icon="chevron-left" />
          <View className="flex-1 max-w-[260px] items-center px-2 py-1">
            <Text className="text-[15px] font-bold text-[#212134]">{periodo}</Text>
            {!navDisabled ? <Text className="text-[11px] text-[#6B6554] mt-0.5">Use as setas para navegar entre períodos</Text> : null}
          </View>
          <NavButton dir={1} icon="chevron-right" />
        </View>

        <PeriodModal
          visible={showPeriodModal}
          periodType={periodType}
          onSelect={selecionarPeriodoReports}
          onClose={() => setShowPeriodModal(false)}
        />

        <View className="w-full max-w-[1200px] self-center flex-col gap-5 mb-16">
          <PrintHeader clinic={clinic} profile={profile} periodo={periodo} geradoEm={geradoEm} />

          <PatientSummaryWidget child={selectedChild} logs={logsFiltrados} />

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard title="1. Métricas de exposição" flexClass="flex-[1]">
              <QuickMetricsGrid logs={logsFiltrados} />
            </ReportCard>
            <ReportCard title="2. Matriz de aceitação sensorial" flexClass="flex-[2]">
              <SensoryMatrixWidget logs={logsFiltrados} />
            </ReportCard>
          </View>

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard title="3. Top aceitação" flexClass="flex-[1]">
              <HorizontalBarChart data={maisAceitos} positive />
            </ReportCard>
            <ReportCard title="4. Top rejeição" flexClass="flex-[1]">
              <HorizontalBarChart data={menosAceitos} positive={false} />
            </ReportCard>
            <ReportCard title="5. Fatores comportamentais" flexClass="flex-[1.2]">
              <BehavioralFactorsWidget logs={logsFiltrados} />
            </ReportCard>
          </View>

          <ReportCard title="6. Mapeamento do repertório alimentar">
            <RepertoireWidget logs={logsFiltrados} />
          </ReportCard>

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard flexClass="flex-[2]">
              <EditableNotesWidget value={note.text} onChangeText={note.onChange} status={note.status} />
            </ReportCard>
            <ReportCard title="7. Profissional responsável" flexClass="flex-[1] justify-center items-center bg-[#EEF5E8]">
              <SignatureWidget professional={professional} profile={profile} assinatura={documents.assinatura} />
            </ReportCard>
          </View>

          <AuthFooter hash={auth.hash} qr={auth.qr} clinic={clinic} />
        </View>

        <View className="print-hide"><Footer /></View>
      </ScrollView>
    </DashboardLayout>
  );
}
