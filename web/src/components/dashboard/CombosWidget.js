import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

export default function CombosWidget({ logs = [] }) {
  const combos = useMemo(() => {
    const stats = {};

    logs.forEach((log) => {
      const food = log.alimento;
      if (!food) return;

      const texture = food.textura || 'Desconhecida';
      const foodColor = food.cor || 'Desconhecida';
      const key = `${texture} + ${foodColor}`;

      if (!stats[key]) {
        stats[key] = {
          total: 0,
          rejected: 0,
          accepted: 0,
        };
      }

      stats[key].total += 1;

      if (log.reacao === 1) {
        stats[key].accepted += 1;
      }

      if (log.reacao === 2) {
        stats[key].rejected += 1;
      }
    });

    return Object.entries(stats)
      .filter(([, data]) => data.total >= 2)
      .map(([name, data]) => {
        const acceptance =
          data.total > 0
            ? (data.accepted / data.total) * 100
            : 0;

        const rejection =
          data.total > 0
            ? (data.rejected / data.total) * 100
            : 0;

        let percentage = acceptance;
        let label = 'Aceitação';
        let statusColor = '#528F33';

        if (rejection > acceptance) {
          percentage = rejection;
          label = 'Rejeição';
          statusColor = '#D9534F';
        }

        return {
          name,
          percentage,
          label,
          statusColor,
          total: data.total,
        };
      })
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);
  }, [logs]);

  return (
    <View className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <Text className="text-[17px] font-bold text-[#212134] mb-1">
        Gatilhos Críticos (Combos)
      </Text>

      <Text className="text-[12px] text-[#9CA3AF] mb-5">
        Padrões sensoriais capturados pelos registros.
      </Text>

      {combos.length === 0 ? (
        <View className="py-5">
          <Text className="text-[13px] text-[#6B7280] text-center">
            Ainda não existem dados suficientes para identificar combinações.
          </Text>
        </View>
      ) : (
        <View className="flex-col gap-4">
          {combos.map((combo, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center border-b border-gray-100 pb-3"
            >
              <View className="flex-row items-center gap-2 flex-1">
                <View
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: combo.statusColor }}
                />

                <Text className="text-[14px] font-medium text-[#4B5563]">
                  {combo.name}
                </Text>
              </View>

              <Text
                className="text-[14px] font-bold"
                style={{ color: combo.statusColor }}
              >
                {combo.percentage.toFixed(0)}% {combo.label}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
