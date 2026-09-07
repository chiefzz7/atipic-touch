import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import Footer from '../../components/ui/Footer';

const API_URL = 'http://localhost:8000';

export default function ReportsScreen() {
  const [logs, setLogs] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError('');

      const token = await AsyncStorage.getItem('@atipictouch:token');
      const childData = await AsyncStorage.getItem('@atipictouch:selected_child');

      console.log('========== DEBUG REPORTS ==========');
      console.log('TOKEN EXISTE:', !!token);
      console.log('TOKEN:', token);
      console.log('CHILD DATA:', childData);

      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }

      if (!childData) {
        throw new Error('Nenhuma criança selecionada.');
      }

      const child = JSON.parse(childData);

      console.log('CHILD PARSED:', child);
      console.log('CHILD ID:', child.id);

      setSelectedChild(child);

      const url = `${API_URL}/api/feeding-logs/crianca/${child.id}`;

      console.log('API URL:', API_URL);
      console.log('URL RELATORIO:', url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('STATUS DA API:', response.status);
      console.log('STATUS TEXT:', response.statusText);

      const responseText = await response.text();

      console.log('RESPOSTA DA API:', responseText);
      console.log('===================================');

      if (!response.ok) {
        throw new Error(`Erro ao carregar registros: ${response.status}`);
      }

      const data = JSON.parse(responseText);

      console.log('LOGS PARSEADOS:', data);
      console.log('QUANTIDADE DE LOGS:', data.length);

      setLogs(data);
    } catch (err) {
      console.error('ERRO COMPLETO REPORTS:', err);
      setError(err.message || 'Não foi possível carregar os dados do relatório.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (Platform.OS === 'web') {
      window.print();
    }
  };

  const calcularAceitacao = (logs) => {
    const stats = {};

    logs.forEach((log) => {
      const food = log.alimento;

      if (!food?.id) return;

      if (!stats[food.id]) {
        stats[food.id] = {
          name: food.nome,
          total: 0,
          accepted: 0,
          rejected: 0,
        };
      }

      stats[food.id].total += 1;

      if (log.reacao === 1) {
        stats[food.id].accepted += 1;
      }

      if (log.reacao === 2) {
        stats[food.id].rejected += 1;
      }
    });

    return Object.values(stats);
  };

  const foodStats = calcularAceitacao(logs);

  const maisAceitos = foodStats
    .filter((food) => food.accepted > 0)
    .map((food) => ({
      emoji: '🍽️',
      name: food.name,
      value: `${((food.accepted / food.total) * 100).toFixed(1)}%`,
    }))
    .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
    .slice(0, 3);

  const menosAceitos = foodStats
    .filter((food) => food.rejected > 0)
    .map((food) => ({
      emoji: '🍽️',
      name: food.name,
      value: `${((food.rejected / food.total) * 100).toFixed(1)}%`,
    }))
    .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
    .slice(0, 3);

  if (loading) {
    return (
      <DashboardLayout>
        <View className="flex-1 items-center justify-center bg-[#FDFFF1]">
          <ActivityIndicator size="large" color="#528F33" />
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
          <Feather name="alert-circle" size={40} color="#D9534F" />

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
      <ScrollView className="flex-1 bg-[#FDFFF1] p-6 lg:p-8 print:bg-white print:p-0" showsVerticalScrollIndicator={false}>
        <View className="flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 print:hidden">
          <View>
            <Text className="text-[32px] font-extrabold text-[#212134]">Relatório Clínico</Text>
            <Text className="text-[15px] text-[#6B7280] font-medium mt-1">
              Visão estruturada para prontuário
            </Text>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-row items-center bg-white border border-[#A3C78B] px-4 py-2.5 rounded-xl shadow-sm">
              <Feather name="calendar" size={16} color="#528F33" />
              <Text className="ml-2 text-[14px] font-bold text-[#528F33]">
                Maio de 2026
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePrint}
              className="flex-row items-center bg-[#528F33] px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#457a2a] transition-colors"
            >
              <Feather name="download" size={16} color="#fff" />
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
            <ReportCard title="1. Métricas de Exposição" flexClass="flex-[1]">
              <QuickMetricsGrid logs={logs} />
            </ReportCard>

            <ReportCard title="2. Matriz de Aceitação Sensorial" flexClass="flex-[2]">
              <SensoryMatrixWidget logs={logs} />
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
                <View className="flex-row items-start">
                  <View className="w-2 h-2 rounded-full bg-red-400 mt-1.5 mr-2" />
                  <Text className="text-[13px] text-[#4B5563] flex-1">
                    Maior rejeição em <Text className="font-bold">casa</Text> (Comparado à clínica).
                  </Text>
                </View>

                <View className="flex-row items-start">
                  <View className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2" />
                  <Text className="text-[13px] text-[#4B5563] flex-1">
                    Picos de crise sensorial identificados no horário do <Text className="font-bold">jantar</Text>.
                  </Text>
                </View>

                <View className="flex-row items-start">
                  <View className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2" />
                  <Text className="text-[13px] text-[#4B5563] flex-1">
                    Aceitação aumenta em 30% quando ofertado pela <Text className="font-bold">mãe</Text>.
                  </Text>
                </View>
              </View>
            </ReportCard>
          </View>

          <ReportCard title="6. Mapeamento do Repertório Alimentar">
            <RepertoireWidget logs={logs} />
          </ReportCard>

          <View className="flex-col lg:flex-row gap-5">
            <ReportCard flexClass="flex-[2]">
              <EditableNotesWidget />
            </ReportCard>

            <ReportCard title="7. Assinatura Eletrônica" flexClass="flex-[1] justify-center items-center bg-[#F2F7ED]">
              <Feather name="check-circle" size={32} color="#528F33" className="mb-3" />
              <Text className="text-[14px] font-bold text-[#212134]">
                Dra. Camila Nogueira
              </Text>
              <Text className="text-[12px] text-[#6B7280] mb-3">
                CRN-3 45892
              </Text>

              <View className="bg-white px-3 py-1.5 rounded border border-[#A3C78B]">
                <Text className="text-[10px] font-bold text-[#528F33]">
                  Doc #LT-202605
                </Text>
              </View>
            </ReportCard>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </DashboardLayout>
  );
}
