import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';

export default function StatCard({
  title,
  value,
  icon,
  color,
  trend,
  trendValue,
}) {
  const hasTrend =
    trend !== undefined &&
    trendValue !== undefined;

  const isPositive =
    trend === 'up';

  return (
    <View className="flex-1 min-w-[220px] bg-white p-5 rounded-[14px] border border-[#DCE7D2] shadow-card">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-[13px] font-bold text-[#6B6554]">
          {title}
        </Text>

        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{
            backgroundColor:
              `${color}18`,
          }}
        >
          <Feather
            name={icon}
            size={20}
            color={color}
          />
        </View>
      </View>

      <Text className="text-[28px] font-extrabold text-[#212134]">
        {value}
      </Text>

      {hasTrend ? (
        <View className="flex-row items-center mt-2">
          <Feather
            name={
              isPositive
                ? 'trending-up'
                : 'trending-down'
            }
            size={14}
            color={
              isPositive
                ? '#528F33'
                : '#D9534F'
            }
          />

          <Text
            className={`text-[12px] font-medium ml-1 ${
              isPositive
                ? 'text-[#528F33]'
                : 'text-[#D9534F]'
            }`}
          >
            {trendValue}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
