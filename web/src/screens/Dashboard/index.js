import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {
  Feather,
} from '@expo/vector-icons';

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
  ProgressReacoes,
} from '../../components/dashboard/ChartWidgets';

import Footer from '../../components/ui/Footer';
import usePeriodFilter from '../../hooks/usePeriodFilter';

const API_URL =
  'https://atipic-touch-devlop.onrender.com';

export default function DashboardScreen() {
  const [
    selectedChild,
    setSelectedChild,
  ] = useState(null);

  const [
    logs,
    setLogs,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    showPeriodModal,
    setShowPeriodModal,
  ] = useState(false);

  const {
    periodType,
    logsFiltrados,
    setSelectedDate,
    formatPeriod,
    selecionarPeriodo,
  } =
    usePeriodFilter(
      logs
    );

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados =
    async () => {
      try {
        const childStorage =
          await AsyncStorage.getItem(
            '@atipictouch:selected_child'
          );

        const token =
          await AsyncStorage.getItem(
            '@atipictouch:token'
          );

        if (
          !childStorage ||
          !token
        ) {
          return;
        }

        const child =
          JSON.parse(
            childStorage
          );

        setSelectedChild(
          child
        );

        const response =
          await fetch(
            `${API_URL}/api/feeding-logs/crianca/${child.id}`,
            {
              headers: {
                Accept:
                  'application/json',
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            `Erro ao buscar logs: ${response.status}`
          );
        }

        const data =
          await response.json();

        setLogs(data);

        if (
          data.length >
          0
        ) {
          const latestLog =
            [...data]
              .filter(
                (log) =>
                  log.timestamp
              )
              .sort(
                (
                  a,
                  b
                ) =>
                  new Date(
                    b.timestamp
                  ) -
                  new Date(
                    a.timestamp
                  )
              )[0];

          if (
            latestLog
          ) {
            setSelectedDate(
              new Date(
                latestLog.timestamp
              )
            );
          }
        }
      } catch (error) {
        console.error(
          'Erro ao carregar dados do dashboard:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

  const selecionarPeriodoDashboard =
    (type) => {
      selecionarPeriodo(
        type
      );

      setShowPeriodModal(
        false
      );
    };

  const tentativas =
    logsFiltrados.length;

  const aceitacoes =
    logsFiltrados.filter(
      (log) =>
        log.reacao === 1
    ).length;

  const rejeicoes =
    logsFiltrados.filter(
      (log) =>
        log.reacao === 2
    ).length;

  const neutros =
    logsFiltrados.filter(
      (log) =>
        log.reacao === 3
    ).length;

  const taxaAceitacao =
    tentativas > 0
      ? (
          (
            aceitacoes /
            tentativas
          ) *
          100
        ).toFixed(1)
      : '0.0';

  const renderPeriodOption =
    (
      type,
      label,
      icon
    ) => {
      const active =
        periodType ===
        type;

      return (
        <TouchableOpacity
          onPress={() =>
            selecionarPeriodoDashboard(
              type
            )
          }
          className={`flex-row items-center justify-between p-4 rounded-[10px] border mb-3 ${
            active
              ? 'bg-[#EDF6E8] border-[#83BF6E]'
              : 'bg-[#F7F0DC] border-[#DDD3B9]'
          }`}
        >
          <View className="flex-row items-center">
            <Feather
              name={icon}
              size={18}
              color="#4D9B43"
            />

            <Text className="ml-3 text-[14px] font-bold text-[#554B41]">
              {label}
            </Text>
          </View>

          {active ? (
            <Feather
              name="check"
              size={18}
              color="#4D9B43"
            />
          ) : null}
        </TouchableOpacity>
      );
    };

  return (
    <DashboardLayout>
      <ScrollView
        className="flex-1 bg-[#FFFCEF] p-6"
        showsVerticalScrollIndicator={
          false
        }
      >
        <View className="flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <View>
            <Text className="text-[32px] font-extrabold text-[#554B41]">
              Dashboard Clínico
            </Text>

            <Text className="text-[15px] text-[#80775C] font-medium mt-1">
              Resumo do paciente{' '}

              <Text className="font-bold text-[#554B41]">
                {selectedChild?.nome ||
                  'Carregando...'}
              </Text>
            </Text>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() =>
                setShowPeriodModal(
                  true
                )
              }
              className="flex-row items-center bg-[#F7F0DC] border border-[#DDD3B9] px-4 py-2.5 rounded-[10px]"
            >
              <Feather
                name="calendar"
                size={16}
                color="#554B41"
              />

              <Text className="ml-2 text-[14px] font-bold text-[#554B41]">
                {formatPeriod()}
              </Text>

              <Feather
                name="chevron-down"
                size={14}
                color="#80775C"
                style={{
                  marginLeft:
                    8,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-[#83BF6E] px-4 py-2.5 rounded-[10px] hover:bg-[#4D9B43] transition-colors">
              <Feather
                name="file-text"
                size={16}
                color="#FFFFFF"
              />

              <Text className="ml-2 text-[14px] font-bold text-white">
                Gerar Relatório
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={
            showPeriodModal
          }
          transparent
          animationType="fade"
          onRequestClose={() =>
            setShowPeriodModal(
              false
            )
          }
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              setShowPeriodModal(
                false
              )
            }
            className="flex-1 bg-black/30 items-center justify-center p-6"
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              className="bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] w-full max-w-[420px] p-6"
            >
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-[18px] font-bold text-[#554B41]">
                  Selecionar período
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    setShowPeriodModal(
                      false
                    )
                  }
                >
                  <Feather
                    name="x"
                    size={20}
                    color="#80775C"
                  />
                </TouchableOpacity>
              </View>

              {renderPeriodOption(
                'day',
                'Dia',
                'calendar'
              )}

              {renderPeriodOption(
                'week',
                'Semana',
                'calendar'
              )}

              {renderPeriodOption(
                'month',
                'Mês',
                'calendar'
              )}

              {renderPeriodOption(
                'all',
                'Todos os registros',
                'list'
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

        <View className="flex-row flex-wrap gap-4 mb-6">
          <StatCard
            title="Tentativas"
            value={
              loading
                ? '...'
                : tentativas
            }
            icon="layers"
            color="#4D9B43"
          />

          <StatCard
            title="Aceitações"
            value={
              loading
                ? '...'
                : aceitacoes
            }
            icon="check-circle"
            color="#4D9B43"
          />

          <StatCard
            title="Rejeições"
            value={
              loading
                ? '...'
                : rejeicoes
            }
            icon="x-circle"
            color="#D9534F"
          />

          <StatCard
            title="Neutros"
            value={
              loading
                ? '...'
                : neutros
            }
            icon="minus-circle"
            color="#C29424"
          />
        </View>

        <View className="flex-col lg:flex-row gap-6 mb-10">
          <AlertsWidget
            logs={
              logsFiltrados
            }
          />

          <CombosWidget
            logs={
              logsFiltrados
            }
          />
        </View>

        <View className="mb-10">
          <Text className="text-[20px] font-bold text-[#554B41] mb-4">
            Análise Sensorial e Consumo
          </Text>

          <View className="flex-col lg:flex-row gap-4 mb-6">
            <View className="flex-1 bg-[#F7F0DC] p-5 rounded-[10px] border border-[#DDD3B9] min-h-[180px]">
              <LineChartEvolucao
                logs={
                  logsFiltrados
                }
              />
            </View>

            <View className="flex-1 bg-[#F7F0DC] p-5 rounded-[10px] border border-[#DDD3B9] min-h-[180px]">
              <BarChartCor
                logs={
                  logsFiltrados
                }
              />
            </View>

            <View className="flex-1 bg-[#F7F0DC] p-5 rounded-[10px] border border-[#DDD3B9] min-h-[180px]">
              <RadarChartTextura
                logs={
                  logsFiltrados
                }
              />
            </View>
          </View>

          <View className="flex-col lg:flex-row gap-4">
            <View className="flex-[2] bg-[#F7F0DC] p-6 rounded-[10px] border border-[#DDD3B9]">
              <ProgressReacoes
                logs={
                  logsFiltrados
                }
              />
            </View>

            <View className="flex-[1] bg-[#F7F0DC] p-6 rounded-[10px] border border-[#DDD3B9] justify-center">
              <Text className="text-[13px] font-bold text-[#554B41] mb-4">
                Taxa Geral de Aceitação
              </Text>

              <View className="flex-row items-center justify-between">
                <View className="items-center justify-center relative">
                  <Feather
                    name="pie-chart"
                    size={64}
                    color="#C6BB9A"
                  />
                </View>

                <View className="ml-4 flex-1">
                  <Text className="text-[24px] font-extrabold text-[#4D9B43]">
                    {loading
                      ? '...'
                      : `${taxaAceitacao}%`}
                  </Text>

                  <Text className="text-[11px] text-[#80775C]">
                    {aceitacoes}{' '}
                    refeições aceitas de{' '}
                    {tentativas}{' '}
                    tentativas.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <LogsTableWidget
          logs={
            logsFiltrados
          }
        />

        <Footer />
      </ScrollView>
    </DashboardLayout>
  );
}
