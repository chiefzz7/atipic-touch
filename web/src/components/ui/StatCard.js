import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function StatCard({ title, value, icon, color, trend, trendValue }) {
  const isPositive = trend === 'up';
  
  return (
    <View className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex-1 min-w-[200px] mb-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-[14px] font-semibold text-[#6B7280] uppercase tracking-wide">{title}</Text>
        <View className={`w-10 h-10 rounded-full items-center justify-center`} style={{ backgroundColor: `${color}15` }}>
          <Feather name={icon} size={20} color={color} />
        </View>
      </View>
      <Text className="text-3xl font-extrabold text-[#212134] mb-2">{value}</Text>
      
      <View className="flex-row items-center">
        <Feather name={isPositive ? 'trending-up' : 'trending-down'} size={14} color={isPositive ? '#528F33' : '#D9534F'} />
        <Text className={`text-[12px] font-medium ml-1 ${isPositive ? 'text-[#528F33]' : 'text-[#D9534F]'}`}>
          {trendValue} <Text className="text-[#9CA3AF] font-normal">vs mês anterior</Text>
        </Text>
      </View>
    </View>
  );
}
