import React, {
  useMemo,
} from 'react';

import {
  View,
  Text,
} from 'react-native';


export function BarChartCor({
  logs = [],
}) {

  const data = useMemo(() => {

    const groups = {};

    logs.forEach((log) => {

      const color =
        log.alimento?.cor;

      if (!color) {
        return;
      }

      if (!groups[color]) {
        groups[color] = {
          total: 0,
          accepted: 0,
        };
      }

      groups[color].total += 1;

      if (log.reacao === 1) {
        groups[color].accepted += 1;
      }

    });


    return Object.entries(groups)
      .map(([label, value]) => ({
        label,
        value:
          value.total > 0
            ? Math.round(
                (value.accepted /
                  value.total) *
                  100
              )
            : 0,
      }))
      .sort(
        (a, b) =>
          b.value - a.value
      )
      .slice(0, 5);

  }, [logs]);


  return (
    <View>

      <Text className="text-[15px] font-bold text-[#212134]">
        Aceitação por Cor
      </Text>

      <Text className="text-[10px] text-[#9CA3AF] mb-4">
        Taxa de aceitação por grupo de cores
      </Text>


      {data.length === 0 ? (

        <View className="h-24 items-center justify-center">

          <Text className="text-[11px] text-[#9CA3AF]">
            Sem dados suficientes.
          </Text>

        </View>

      ) : (

        <>
          <View className="flex-row items-end justify-between h-24 border-b border-l border-gray-100 pb-1 pl-2">

            {data.map((item, index) => {

              const height =
                Math.max(
                  item.value,
                  5
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
        </>

      )}

    </View>
  );
}


export function RadarChartTextura({
  logs = [],
}) {

  const data = useMemo(() => {

    const groups = {};

    logs.forEach((log) => {

      const texture =
        log.alimento?.textura;

      if (!texture) {
        return;
      }

      if (!groups[texture]) {
        groups[texture] = {
          total: 0,
          accepted: 0,
        };
      }

      groups[texture].total += 1;

      if (log.reacao === 1) {
        groups[texture].accepted += 1;
      }

    });


    return Object.entries(groups)
      .map(([label, value]) => ({
        label,
        value:
          value.total > 0
            ? Math.round(
                (value.accepted /
                  value.total) *
                  100
              )
            : 0,
      }))
      .sort(
        (a, b) =>
          b.value - a.value
      )
      .slice(0, 4);

  }, [logs]);


  return (
    <View>

      <Text className="text-[15px] font-bold text-[#212134]">
        Aceitação por Textura
      </Text>

      <Text className="text-[10px] text-[#9CA3AF] mb-4">
        Correlação entre textura e aceitação
      </Text>


      {data.length === 0 ? (

        <View className="h-24 items-center justify-center">

          <Text className="text-[11px] text-[#9CA3AF]">
            Sem dados suficientes.
          </Text>

        </View>

      ) : (

        <View className="flex-col gap-3">

          {data.map((item, index) => (

            <View key={index}>

              <View className="flex-row justify-between mb-1">

                <Text className="text-[10px] font-medium text-[#4B5563]">
                  {item.label}
                </Text>

                <Text className="text-[10px] font-bold text-[#528F33]">
                  {item.value}%
                </Text>

              </View>

              <View className="h-2 bg-gray-100 rounded-full overflow-hidden">

                <View
                  className="h-full bg-[#528F33] rounded-full"
                  style={{
                    width: `${item.value}%`,
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


export function LineChartEvolucao({
  logs = [],
}) {

  const data = useMemo(() => {

    const sortedLogs = [...logs]
      .sort(
        (a, b) =>
          new Date(a.timestamp) -
          new Date(b.timestamp)
      );


    const grouped = {};


    sortedLogs.forEach((log) => {

      if (!log.timestamp) {
        return;
      }

      const date =
        new Date(log.timestamp)
          .toLocaleDateString(
            'pt-BR',
            {
              day: '2-digit',
              month: '2-digit',
            }
          );


      if (!grouped[date]) {
        grouped[date] = {
          attempts: 0,
          accepted: 0,
        };
      }


      grouped[date].attempts += 1;


      if (log.reacao === 1) {
        grouped[date].accepted += 1;
      }

    });


    return Object.entries(grouped)
      .map(([date, values]) => ({
        date,
        attempts: values.attempts,
        accepted: values.accepted,
      }))
      .slice(-7);

  }, [logs]);


  const maxValue =
    Math.max(
      1,
      ...data.map(
        (item) =>
          Math.max(
            item.attempts,
            item.accepted
          )
      )
    );


  return (
    <View>

      <Text className="text-[15px] font-bold text-[#212134]">
        Evolução Temporal
      </Text>

      <Text className="text-[10px] text-[#9CA3AF] mb-3">
        Tentativas vs Aceitações ao longo do tempo
      </Text>


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


      {data.length === 0 ? (
        <View className="h-20 items-center justify-center">
          <Text className="text-[11px] text-[#9CA3AF]">
            Sem dados suficientes.
          </Text>
        </View>

      ) : (

        <View className="flex-row items-end justify-between h-20 border-b border-l border-gray-100 px-2 pb-1">

          {data.map((item, index) => {

            const attemptsHeight =
              (item.attempts /
                maxValue) *
              100;

            const acceptedHeight =
              (item.accepted /
                maxValue) *
              100;


            return (
              <View
                key={index}
                className="flex-1 items-center justify-end h-full"
              >
                <View className="flex-row items-end gap-0.5 h-full">

                  <View
                    className="w-2 bg-gray-400 rounded-t-sm"
                    style={{
                      height: `${Math.max(
                        attemptsHeight,
                        4
                      )}%`,
                    }}
                  />

                  <View
                    className="w-2 bg-[#528F33] rounded-t-sm"
                    style={{
                      height: `${Math.max(
                        acceptedHeight,
                        4
                      )}%`,
                    }}
                  />

                </View>

                <Text className="text-[8px] text-[#6B7280] mt-1">
                  {item.date}
                </Text>

              </View>
            );

          })}

        </View>
      )}
    </View>
  );
}


export function ProgressSaudaveis({
  logs = [],
}) {
  const data = useMemo(() => {

    let healthy = 0;
    let unhealthy = 0;


    logs.forEach((log) => {

      const category =
        (
          log.alimento?.categoria ||
          ''
        ).toLowerCase();


      if (!category) {
        return;
      }


      const healthyTerms = [
        'fruta',
        'verdura',
        'legume',
        'proteína',
        'proteina',
        'cereal',
        'integral',
      ];


      const isHealthy =
        healthyTerms.some(
          (term) =>
            category.includes(term)
        );


      if (isHealthy) {
        healthy += 1;
      } else {
        unhealthy += 1;
      }

    });


    const total =
      healthy + unhealthy;


    if (total === 0) {
      return {
        healthy: 0,
        unhealthy: 0,
      };
    }


    return {
      healthy:
        Math.round(
          (healthy / total) *
            100
        ),

      unhealthy:
        Math.round(
          (unhealthy / total) *
            100
        ),
    };

  }, [logs]);


  return (
    <View>
      <Text className="text-[15px] font-bold text-[#212134] mb-4">
        Alimentos saudáveis vs não saudáveis
      </Text>

      {data.healthy === 0 &&
      data.unhealthy === 0 ? (

        <Text className="text-[12px] text-[#9CA3AF]">
          Não existem dados suficientes para esta análise.
        </Text>

      ) : (

        <>

          <View className="h-6 w-full rounded-md flex-row overflow-hidden mb-3">
            {data.healthy > 0 && (
              <View
                className="h-full bg-[#528F33] justify-center items-center"
                style={{
                  width: `${data.healthy}%`,
                }}
              >
                <Text className="text-white font-bold text-[11px]">
                  {data.healthy}%
                </Text>
              </View>
            )}

            {data.unhealthy > 0 && (
              <View
                className="h-full bg-[#D9534F] justify-center items-center"
                style={{
                  width: `${data.unhealthy}%`,
                }}
              >
                <Text className="text-white font-bold text-[11px]">
                  {data.unhealthy}%
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row justify-between mt-2">
            <View className="flex-1 pr-2">
              <View className="flex-row items-center mb-1">
                <View className="w-2.5 h-2.5 rounded-full bg-[#528F33] mr-2" />

                <Text className="text-[11px] font-bold text-[#4B5563]">
                  Saudáveis ({data.healthy}%)
                </Text>

              </View>

              <Text className="text-[9px] text-[#6B7280] leading-tight">
                Classificados com base na categoria cadastrada do alimento.
              </Text>
            </View>


            <View className="flex-1 pl-2 border-l border-gray-100">
              <View className="flex-row items-center mb-1">
                <View className="w-2.5 h-2.5 rounded-full bg-[#D9534F] mr-2" />

                <Text className="text-[11px] font-bold text-[#4B5563]">
                  Outros ({data.unhealthy}%)
                </Text>
              </View>

              <Text className="text-[9px] text-[#6B7280] leading-tight">
                Alimentos que não foram classificados como saudáveis.
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
