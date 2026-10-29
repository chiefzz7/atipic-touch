import React from 'react';
import { View, Text } from 'react-native';
import { BarChartCor, RadarChartTextura, LineChartEvolucao, ProgressReacoes } from './ChartWidgets';

const Card = ({ grow = 'flex-1', pad = 'p-5', minH = '', children }) => (
  <View className={`bg-white rounded-[16px] border border-[#DCE7D2] shadow-card ${grow} ${pad} ${minH}`}>{children}</View>
);

function Donut({ percent }) {
  const p = Math.min(100, Math.max(0, Number(percent) || 0));
  return (
    <View
      style={{
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundImage: `conic-gradient(#528F33 ${p * 3.6}deg, #E4EEDB 0deg)`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: 62, height: 62, borderRadius: 31, backgroundColor: '#fff' }} />
    </View>
  );
}

export default function ChartsSection({ logs, taxaAceitacao, aceitacoes, tentativas, loading }) {
  return (
    <View className="mb-10">
      <Text className="text-[20px] font-bold text-[#212134] mb-4">Análise sensorial e consumo</Text>

      <View className="flex-col lg:flex-row gap-4 mb-4">
        <Card minH="min-h-[180px]"><LineChartEvolucao logs={logs} /></Card>
        <Card minH="min-h-[180px]"><BarChartCor logs={logs} /></Card>
        <Card minH="min-h-[180px]"><RadarChartTextura logs={logs} /></Card>
      </View>

      <View className="flex-col lg:flex-row gap-4">
        <Card grow="flex-[2]" pad="p-6"><ProgressReacoes logs={logs} /></Card>

        <Card grow="flex-[1] justify-center" pad="p-6">
          <Text className="text-[13px] font-bold text-[#212134] mb-4">Taxa geral de aceitação</Text>
          <View className="flex-row items-center">
            <Donut percent={taxaAceitacao} />
            <View className="ml-4 flex-1">
              <Text className="text-[26px] font-extrabold text-[#528F33]">{loading ? '...' : `${taxaAceitacao}%`}</Text>
              <Text className="text-[11px] text-[#6B6554]">
                {aceitacoes} refeições aceitas de {tentativas} tentativas.
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
}
