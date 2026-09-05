import React from 'react';
import { View, Text } from 'react-native';

export function BarChartCor({ logs = [] }) {
  const cores = {};

  logs.forEach(log => {
    const cor = log.alimento?.cor;

    if (!cor) {
      return;
    }

    if (!cores[cor]) {
      cores[cor] = {
        total: 0,
        aceitos: 0,
      };
    }

    cores[cor].total += 1;

    if (log.reacao === 1) {
      cores[cor].aceitos += 1;
    }
  });

  const data = Object.entries(cores).map(([label, values]) => ({
    label,
    value: values.total > 0
      ? Math.round((values.aceitos / values.total) * 100)
      : 0,
  }));

  const maxValue = Math.max(
    ...data.map(item => item.value),
    1
  );

  return (
    <View>
      <Text className="text-[13px] font-bold text-[#212134] mb-1">
        Aceitação por Cor
      </Text>

      <Text className="text-[10px] text-[#6B7280] mb-4">
        Taxa de aceitação por grupo de cores
      </Text>

      {data.length === 0 ? (

        <View className="h-24 items-center justify-center">
          <Text className="text-[11px] text-[#9CA3AF]">
            Dados de cor ainda não disponíveis.
          </Text>
        </View>

      ) : (

        <View className="flex-row items-end justify-between h-24 border-b border-l border-gray-100 pb-1 pl-2">
          {data.map((item, index) => {

            const height =
              Math.max(
                (item.value / maxValue) * 100,
                item.value > 0 ? 5 : 0
              );

            return (
              <View
                key={index}
                className="items-center flex-1"
              >

                <Text className="text-[9px] text-[#6B7280] mb-1">
                  {item.value}%
                </Text>

                <View
                  className="w-6 bg-[#528F33] rounded-t-sm"
                  style={{
                    height: `${height}%`,
                  }}
                />
              </View>
            );
          })}
        </View>
      )}

      <View className="flex-row justify-between pl-2 mt-1">
        {data.map((item, index) => (
          <Text
            key={index}
            className="text-[8px] font-medium text-[#4B5563] flex-1 text-center"
          >
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

export function RadarChartTextura({ logs = [] }) {
  const texturas = {};

  logs.forEach(log => {

    const feedback = log.feedbacks?.find(
      item => item.atributo?.toUpperCase() === 'TEXTURA'
    );

    if (!feedback) {
      return;
    }

    if (!texturas[feedback.gostou ? 'Gostou' : 'Não gostou']) {
      texturas[feedback.gostou ? 'Gostou' : 'Não gostou'] = 0;
    }

    texturas[
      feedback.gostou ? 'Gostou' : 'Não gostou'
    ] += 1;
  });

  const gostou = texturas['Gostou'] || 0;
  const naoGostou = texturas['Não gostou'] || 0;

  const total = gostou + naoGostou;

  const taxa =
    total > 0
      ? Math.round((gostou / total) * 100)
      : 0;

  return (
    <View>
      <Text className="text-[13px] font-bold text-[#212134] mb-1">
        Feedback de Textura
      </Text>

      <Text className="text-[10px] text-[#6B7280] mb-4">
        Percepção da criança sobre a textura
      </Text>

      {total === 0 ? (
        <View className="h-24 items-center justify-center">
          <Text className="text-[11px] text-[#9CA3AF]">
            Nenhum feedback de textura encontrado.
          </Text>
        </View>

      ) : (

        <View className="h-24 items-center justify-center">
          <Text className="text-[26px] font-extrabold text-[#528F33]">
            {taxa}%
          </Text>

          <Text className="text-[10px] text-[#6B7280] mt-1">
            {gostou} gostaram da textura
          </Text>

          <Text className="text-[10px] text-[#6B7280]">
            {naoGostou} não gostaram
          </Text>
        </View>
      )}
    </View>
  );
}

export function LineChartEvolucao({ logs = [] }) {
  const agrupado = {};

  logs.forEach(log => {

    if (!log.timestamp) {
      return;
    }

    const date = new Date(log.timestamp);

    const key = date.toISOString().split('T')[0];

    const label = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });

    if (!agrupado[key]) {
      agrupado[key] = {
        label,
        tentativas: 0,
        aceitacoes: 0,
      };
    }

    agrupado[key].tentativas += 1;

    if (log.reacao === 1) {
      agrupado[key].aceitacoes += 1;
    }
  });

  const data = Object.entries(agrupado)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([, values]) => values);

  return (
    <View>
      <Text className="text-[13px] font-bold text-[#212134] mb-1">
        Evolução Temporal
      </Text>

      <Text className="text-[10px] text-[#6B7280] mb-4">
        Tentativas vs Aceitações ao longo do tempo
      </Text>

      {data.length === 0 ? (

        <View className="h-20 items-center justify-center">
          <Text className="text-[11px] text-[#9CA3AF]">
            Nenhum dado temporal disponível.
          </Text>
        </View>

      ) : (

        <View>
          <View className="flex-row justify-center items-center gap-4 mb-2">
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-gray-400 mr-1" />

              <Text className="text-[9px]">
                Tentativas
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-[#528F33] mr-1" />

              <Text className="text-[9px]">
                Aceitações
              </Text>
            </View>
          </View>

          <View className="flex-row items-end justify-between h-20 border-b border-l border-gray-100 px-2 pb-1">
            {data.map((values, index) => {
              const max = Math.max(
                values.tentativas,
                1
              );

              const attemptsHeight =
                (values.tentativas / max) * 100;

              const acceptedHeight =
                (values.aceitacoes / max) * 100;

              return (
                <View
                  key={index}
                  className="items-center flex-1"
                >
                  <View className="flex-row items-end h-14 gap-1">
                    <View
                      className="w-2 bg-gray-400 rounded-t-sm"
                      style={{
                        height: `${attemptsHeight}%`,
                      }}
                    />

                    <View
                      className="w-2 bg-[#528F33] rounded-t-sm"
                      style={{
                        height: `${acceptedHeight}%`,
                      }}
                    />
                  </View>

                  <Text className="text-[8px] text-[#6B7280] mt-1">
                    {values.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

export function ProgressReacoes({ logs = [] }) {
  const tentativas = logs.length;

  const aceitacoes = logs.filter(
    log => log.reacao === 1
  ).length;

  const rejeicoes = logs.filter(
    log => log.reacao === 2
  ).length;

  const neutros = logs.filter(
    log => log.reacao === 3
  ).length;

  const calcularPercentual = valor => {
    return tentativas > 0
      ? Math.round((valor / tentativas) * 100)
      : 0;
  };

  const dados = [
    {
      label: 'Aceitações',
      valor: aceitacoes,
      percentual: calcularPercentual(aceitacoes),
      color: '#528F33',
    },
    {
      label: 'Rejeições',
      valor: rejeicoes,
      percentual: calcularPercentual(rejeicoes),
      color: '#D9534F',
    },
    {
      label: 'Neutros',
      valor: neutros,
      percentual: calcularPercentual(neutros),
      color: '#F59E0B',
    },
  ];

  return (
    <View>
      <Text className="text-[13px] font-bold text-[#212134] mb-1">
        Distribuição das Reações
      </Text>

      <Text className="text-[10px] text-[#6B7280] mb-4">
        Distribuição das respostas alimentares no período
      </Text>

      {tentativas === 0 ? (
        <View className="h-16 w-full rounded-md bg-gray-100 items-center justify-center">
          <Text className="text-[11px] text-[#6B7280]">
            Nenhum registro disponível no período.
          </Text>
        </View>
      ) : (
        <View className="gap-3">
          {dados.map(item => (
            <View key={item.label}>
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-[10px] font-medium text-[#4B5563]">
                  {item.label}
                </Text>

                <Text className="text-[10px] font-bold text-[#212134]">
                  {item.valor} ({item.percentual}%)
                </Text>
              </View>

              <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${item.percentual}%`,
                    backgroundColor: item.color,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
