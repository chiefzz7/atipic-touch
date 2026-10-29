import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import AlertsWidget from '../../components/dashboard/AlertsWidget';
import CombosWidget from '../../components/dashboard/CombosWidget';
import PeriodModal from '../../components/common/PeriodModal';
import Footer from '../../components/ui/Footer';

import usePeriodFilter from '../../hooks/usePeriodFilter';
import useReportData from '../../hooks/useReportData';
import { useSettings } from '../../context/SettingsContext';

// Código pesado carregado sob demanda: melhora o tempo até a primeira tela.
const LogsTableWidget = lazy(() => import('../../components/dashboard/LogsTableWidget'));
const ChartsSection = lazy(() => import('../../components/dashboard/ChartsSection'));

const Fallback = ({ h = 160 }) => (
  <View style={{ height: h }} className="items-center justify-center">
    <ActivityIndicator color="#528F33" />
  </View>
);

const Banner = ({ tone, icon, children, action }) => {
  const tones = {
    danger: ['bg-[#FCEBE8] border-[#E7B8B2]', '#D9534F', 'text-[#9B5547]'],
    warn: ['bg-[#FFF6DD] border-[#E9D69B]', '#C29424', 'text-[#6B5516]'],
  }[tone];
  return (
    <View className={`flex-row items-center border rounded-[12px] p-4 mb-5 ${tones[0]}`}>
      <Feather name={icon} size={18} color={tones[1]} />
      <Text className={`flex-1 ml-3 text-[13px] font-medium ${tones[2]}`}>{children}</Text>
      {action}
    </View>
  );
};

export default function DashboardScreen() {
  const router = useRouter();
  const { settings } = useSettings();
  const { logs, selectedChild, loading, refreshing, error, lastSync, atualizar } = useReportData();
  const [showPeriodModal, setShowPeriodModal] = useState(false);

  const { periodType, logsFiltrados, setSelectedDate, formatPeriod, selecionarPeriodo } = usePeriodFilter(logs);

  const latestTimestamp = useMemo(() => {
    let latest = 0;
    for (const log of logs) {
      const t = log.timestamp ? new Date(log.timestamp).getTime() : 0;
      if (t > latest) latest = t;
    }
    return latest;
  }, [logs]);

  // Ao carregar, posiciona o filtro no mês do registro mais recente.
  useEffect(() => {
    if (latestTimestamp) setSelectedDate(new Date(latestTimestamp));
  }, [latestTimestamp, setSelectedDate]);

  const { tentativas, aceitacoes, rejeicoes, neutros, taxaAceitacao } = useMemo(() => {
    let aceitos = 0;
    let rejeitados = 0;
    let neutro = 0;
    for (const log of logsFiltrados) {
      if (log.reacao === 1) aceitos += 1;
      else if (log.reacao === 2) rejeitados += 1;
      else if (log.reacao === 3) neutro += 1;
    }
    const total = logsFiltrados.length;
    return {
      tentativas: total,
      aceitacoes: aceitos,
      rejeicoes: rejeitados,
      neutros: neutro,
      taxaAceitacao: total > 0 ? ((aceitos / total) * 100).toFixed(1) : '0.0',
    };
  }, [logsFiltrados]);

  const diasSemRegistro = latestTimestamp ? Math.floor((Date.now() - latestTimestamp) / 86400000) : null;
  const mostrarAvisoOffline =
    settings.system.alertaOffline &&
    !loading &&
    !error &&
    diasSemRegistro !== null &&
    diasSemRegistro >= settings.system.diasOffline;

  const selecionar = (type) => {
    selecionarPeriodo(type);
    setShowPeriodModal(false);
  };

  const value = (n) => (loading ? '...' : n);

  return (
    <DashboardLayout>
      <ScrollView className="flex-1 bg-[#FFFCEF] px-5 py-6 lg:px-8 lg:py-8" showsVerticalScrollIndicator={false}>
        <View className="flex-col md:flex-row justify-between items-start md:items-center mb-7 gap-4">
          <View>
            <Text className="text-[30px] font-extrabold text-[#212134] tracking-tight">Dashboard clínico</Text>
            <Text className="text-[15px] text-[#6B6554] font-medium mt-1">
              Resumo do paciente{' '}
              <Text className="font-bold text-[#212134]">{selectedChild?.nome || '...'}</Text>
              {lastSync ? (
                <Text className="text-[12px] text-[#9A9279]">
                  {'  ·  '}atualizado às {lastSync.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              ) : null}
            </Text>
          </View>

          <View className="flex-row gap-3 flex-wrap">
            <TouchableOpacity
              onPress={atualizar}
              disabled={refreshing}
              accessibilityLabel="Atualizar dados"
              className="w-11 h-11 items-center justify-center bg-white border border-[#DCE7D2] rounded-[12px] hover:bg-[#F3F7EE]"
            >
              {refreshing ? <ActivityIndicator size="small" color="#528F33" /> : <Feather name="refresh-cw" size={16} color="#212134" />}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowPeriodModal(true)}
              className="flex-row items-center bg-white border border-[#DCE7D2] px-4 h-11 rounded-[12px] hover:bg-[#F3F7EE]"
            >
              <Feather name="calendar" size={16} color="#212134" />
              <Text className="ml-2 text-[14px] font-bold text-[#212134]">{formatPeriod()}</Text>
              <Feather name="chevron-down" size={14} color="#6B6554" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/reports')}
              className="flex-row items-center bg-[#528F33] px-5 h-11 rounded-[12px] hover:bg-[#467A2B] transition-colors"
            >
              <Feather name="file-text" size={16} color="#FFFFFF" />
              <Text className="ml-2 text-[14px] font-bold text-white">Gerar relatório</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PeriodModal
          visible={showPeriodModal}
          periodType={periodType}
          onSelect={selecionar}
          onClose={() => setShowPeriodModal(false)}
        />

        {error ? (
          <Banner
            tone="danger"
            icon="alert-circle"
            action={
              <TouchableOpacity onPress={atualizar}>
                <Text className="text-[13px] font-bold text-[#9B5547]">Tentar novamente</Text>
              </TouchableOpacity>
            }
          >
            {error}
          </Banner>
        ) : null}

        {mostrarAvisoOffline ? (
          <Banner tone="warn" icon="wifi-off">
            Sem novos registros há {diasSemRegistro} dias. Verifique se o aplicativo ou o dispositivo do cuidador está sincronizando.
          </Banner>
        ) : null}

        <View className="flex-row flex-wrap gap-4 mb-6">
          <StatCard title="Tentativas" value={value(tentativas)} icon="layers" color="#528F33" />
          <StatCard title="Aceitações" value={value(aceitacoes)} icon="check-circle" color="#528F33" />
          <StatCard title="Rejeições" value={value(rejeicoes)} icon="x-circle" color="#D9534F" />
          <StatCard title="Neutros" value={value(neutros)} icon="minus-circle" color="#C29424" />
        </View>

        <View className="flex-col lg:flex-row gap-5 mb-10">
          <AlertsWidget logs={logsFiltrados} />
          <CombosWidget logs={logsFiltrados} />
        </View>

        <Suspense fallback={<Fallback h={380} />}>
          <ChartsSection
            logs={logsFiltrados}
            taxaAceitacao={taxaAceitacao}
            aceitacoes={aceitacoes}
            tentativas={tentativas}
            loading={loading}
          />
        </Suspense>

        <Suspense fallback={<Fallback h={300} />}>
          <LogsTableWidget logs={logsFiltrados} />
        </Suspense>

        <Footer />
      </ScrollView>
    </DashboardLayout>
  );
}
