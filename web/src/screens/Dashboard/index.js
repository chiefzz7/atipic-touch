import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import AlertsWidget from '../../components/dashboard/AlertsWidget';
import CombosWidget from '../../components/dashboard/CombosWidget';
import LogsTableWidget from '../../components/dashboard/LogsTableWidget';
import {
  BarChartCor,
  RadarChartTextura,
  LineChartEvolucao,
  ProgressSaudaveis,
} from '../../components/dashboard/ChartWidgets';

import Footer from '../../components/ui/Footer';

import {
  getDashboardData,
} from '../../services/feedingLogService';


const CHILD_KEY = '@atipictouch:selected_child';


export default function DashboardScreen() {
  const [selectedChild, setSelectedChild] = useState(null);

  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  useEffect(() => {
    carregarDashboard();
  }, []);


  const carregarDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const childStorage = await AsyncStorage.getItem(
        CHILD_KEY
      );

      if (!childStorage) {
        setError('Nenhuma criança foi selecionada.');
        return;
      }

      const child = JSON.parse(childStorage);

      setSelectedChild(child);

      const data = await getDashboardData(child.id);

      setLogs(data.logs || []);
    } catch (err) {
      console.error(
        'Erro ao carregar dashboard:',
        err
      );

      setError(
        err?.message ||
        'Não foi possível carregar os dados do dashboard.'
      );
    } finally {
      setLoading(false);
    }
  };


  const metrics = useMemo(() => {
    const attempts = logs.length;

    const accepted = logs.filter(
      (log) => log.reacao === 1
    ).length;

    const rejected = logs.filter(
      (log) => log.reacao === 2
    ).length;

    const crises = logs.filter(
      (log) => log.reacao === 3
    ).length;

    const acceptanceRate =
      attempts > 0
        ? ((accepted / attempts) * 100).toFixed(1)
        : '0.0';

    return {
      attempts,
      accepted,
      rejected,
      crises,
      acceptanceRate,
    };
  }, [logs]);


  if (loading) {
    return (
      <DashboardLayout>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator
            size="large"
            color="#528F33"
          />

          <Text className="mt-4 text-[14px] text-[#6B7280]">
            Carregando dados do paciente...
          </Text>
        </View>
      </DashboardLayout>
    );
  }


  if (error) {
    return (
      <DashboardLayout>
        <View className="flex-1 items-center justify-center px-6">
          <Feather
            name="alert-circle"
            size={42}
            color="#D9534F"
          />

          <Text className="text-[20px] font-bold text-[#212134] mt-4 text-center">
            Não foi possível carregar o dashboard
          </Text>

          <Text className="text-[14px] text-[#6B7280] mt-2 text-center">
            {error}
          </Text>

          <TouchableOpacity
            onPress={carregarDashboard}
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
        className="flex-1"
        contentContainerStyle={{
          padding: 24,
        }}
      >

        <View className="flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <View>
            <Text className="text-[32px] font-extrabold text-[#212134]">
              Dashboard Clínico
            </Text>

            <Text className="text-[15px] text-[#6B7280] font-medium mt-1">
              Resumo do paciente{' '}

              <Text className="font-bold text-[#212134]">
                {selectedChild?.nome || 'Paciente'}
              </Text>
            </Text>
          </View>


          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-row items-center bg-white border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm"
            >
              <Feather
                name="calendar"
                size={16}
                color="#4B5563"
              />

              <Text className="ml-2 text-[14px] font-bold text-[#4B5563]">
                Dados disponíveis
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-[#528F33] px-4 py-2.5 rounded-xl shadow-sm"
            >
              <Feather
                name="file-text"
                size={16}
                color="#fff"
              />

              <Text className="ml-2 text-[14px] font-bold text-white">
                Gerar Relatório
              </Text>
            </TouchableOpacity>

          </View>
        </View>

        <View className="flex-row flex-wrap gap-4 mb-6">
          <StatCard
            title="Tentativas"
            value={metrics.attempts}
            icon="layers"
            color="#528F33"
          />

          <StatCard
            title="Aceitações"
            value={metrics.accepted}
            icon="check-circle"
            color="#528F33"
          />

          <StatCard
            title="Rejeições"
            value={metrics.rejected}
            icon="x-circle"
            color="#D9534F"
          />

          <StatCard
            title="Taxa de Aceitação"
            value={`${metrics.acceptanceRate}%`}
            icon="activity"
            color="#3B82F6"
          />
        </View>

        <View className="flex-col lg:flex-row gap-6 mb-10">
          <AlertsWidget logs={logs} />

          <CombosWidget logs={logs} />
        </View>

        <View className="mb-10">
          <Text className="text-[20px] font-bold text-[#212134] mb-4">
            Análise Sensorial e Consumo
          </Text>

          <View className="flex-col lg:flex-row gap-4 mb-6">
            <View className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 min-h-[180px]">
              <LineChartEvolucao logs={logs} />
            </View>

            <View className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 min-h-[180px]">
              <BarChartCor logs={logs} />
            </View>

            <View className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 min-h-[180px]">
              <RadarChartTextura logs={logs} />
            </View>
          </View>

          <View className="flex-col lg:flex-row gap-4">
            <View className="flex-[2] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <ProgressSaudaveis logs={logs} />
            </View>

            <View className="flex-[1] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 justify-center">
              <Text className="text-[13px] font-bold text-[#212134] mb-4">
                Taxa Geral de Aceitação
              </Text>

              <View className="flex-row items-center justify-between">
                <View className="items-center justify-center relative">

                  <Feather
                    name="pie-chart"
                    size={64}
                    color="#D4CDA8"
                  />

                </View>


                <View className="ml-4 flex-1">
                  <Text className="text-[24px] font-extrabold text-[#528F33]">
                    {metrics.acceptanceRate}%
                  </Text>

                  <Text className="text-[11px] text-[#6B7280]">
                    {metrics.accepted} refeições aceitas de {metrics.attempts} tentativas.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>


        <LogsTableWidget logs={logs} />


        <Footer />

      </ScrollView>
    </DashboardLayout>
  );
}
