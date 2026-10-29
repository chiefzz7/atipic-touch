import React, {
  useMemo,
} from 'react';

import {
  View,
  Text,
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import { useSettings } from '../../context/SettingsContext';

export default function AlertsWidget({
  logs = [],
}) {
  const { settings } = useSettings();
  const { limiarRejeicao, amostraMinima } = settings.system;

  const insights =
    useMemo(() => {
      if (!logs.length) {
        return [];
      }

      const textureStats =
        {};

      logs.forEach(
        (log) => {
          const texture =
            log.alimento?.textura;

          if (!texture) {
            return;
          }

          if (
            !textureStats[
              texture
            ]
          ) {
            textureStats[
              texture
            ] = {
              total: 0,
              rejected: 0,
            };
          }

          textureStats[
            texture
          ].total += 1;

          if (
            log.reacao === 2
          ) {
            textureStats[
              texture
            ].rejected += 1;
          }
        }
      );

      const result = [];

      Object.entries(
        textureStats
      ).forEach(
        ([
          texture,
          stats,
        ]) => {
          if (
            stats.total < amostraMinima
          ) {
            return;
          }

          const rejectionRate =
            (
              stats.rejected /
              stats.total
            ) *
            100;

          if (
            rejectionRate >=
            limiarRejeicao
          ) {
            result.push({
              type: 'danger',
              title:
                'Possível defensividade tátil',
              description:
                `${rejectionRate.toFixed(0)}% de rejeição em alimentos com textura ${texture}.`,
            });
          }
        }
      );

      const acceptedLogs =
        logs.filter(
          (log) =>
            log.reacao === 1
        );

      if (
        acceptedLogs.length >
          0 &&
        result.length === 0
      ) {
        result.push({
          type: 'success',
          title:
            'Evolução positiva',
          description:
            `${acceptedLogs.length} refeições foram aceitas no período analisado.`,
        });
      }

      return result.slice(
        0,
        3
      );
    }, [logs, limiarRejeicao, amostraMinima]);

  return (
    <View className="flex-1 bg-white p-6 rounded-[16px] border border-[#DCE7D2] shadow-card">
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-[17px] font-bold text-[#212134]">
          Alertas e Insights
        </Text>

        <Text className="text-[12px] font-bold text-[#528F33]">
          Limiar: {limiarRejeicao}%
        </Text>
      </View>

      {insights.length ===
      0 ? (
        <View className="items-center py-5">
          <Feather
            name="check-circle"
            size={28}
            color="#528F33"
          />

          <Text className="text-[14px] font-bold text-[#212134] mt-2">
            Nenhum alerta identificado
          </Text>

          <Text className="text-[12px] text-[#6B6554] text-center mt-1">
            Os padrões serão analisados conforme novos registros forem adicionados.
          </Text>
        </View>
      ) : (
        <View className="flex-col gap-4">
          {insights.map(
            (
              item,
              index
            ) => {
              const isDanger =
                item.type ===
                'danger';

              return (
                <View
                  key={index}
                  className={`flex-row items-start p-3.5 rounded-[14px] border ${
                    isDanger
                      ? 'bg-[#FCEBE8] border-[#E7B8B2]'
                      : 'bg-[#EEF5E8] border-[#CFE3C0]'
                  }`}
                >
                  <Feather
                    name={
                      isDanger
                        ? 'alert-triangle'
                        : 'bell'
                    }
                    size={20}
                    color={
                      isDanger
                        ? '#D9534F'
                        : '#528F33'
                    }
                  />

                  <View className="ml-3 flex-1">
                    <Text
                      className={`text-[14px] font-bold ${
                        isDanger
                          ? 'text-[#9B5547]'
                          : 'text-[#528F33]'
                      }`}
                    >
                      {item.title}
                    </Text>

                    <Text
                      className={`text-[12px] mt-1 leading-tight ${
                        isDanger
                          ? 'text-[#9B5547]'
                          : 'text-[#3F6E27]'
                      }`}
                    >
                      {
                        item.description
                      }
                    </Text>
                  </View>
                </View>
              );
            }
          )}
        </View>
      )}
    </View>
  );
}
