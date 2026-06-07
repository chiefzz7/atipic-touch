import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function DashboardLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(Platform.OS === 'web' && Dimensions.get('window').width > 768);

  const menuItems = [
    { name: 'Dashboard', icon: 'pie-chart', route: '/dashboard', active: true },
    { name: 'Pacientes', icon: 'users', route: '#', active: false },
    { name: 'Logs e Relatórios', icon: 'clipboard', route: '#', active: false },
    { name: 'Configurações', icon: 'settings', route: '#', active: false },
  ];

  return (
    <View className="flex-1 flex-row bg-[#FDFFF1]">
      <View 
        className={`${isExpanded ? 'w-64' : 'w-20'} bg-[#E2DCC8] transition-all duration-300 h-full flex-col justify-between py-6 border-r border-[#d4cea3] shadow-sm`}
      >
        <View>
          <View className="flex-row items-center px-5 mb-10 h-12">
            <View className="w-10 h-10 bg-[#528F33] rounded-lg items-center justify-center">
              <Text className="text-white font-bold text-lg">AT</Text>
            </View>
            {isExpanded && (
              <Text className="ml-3 text-[20px] font-extrabold text-[#212134]">AtipicTouch</Text>
            )}
          </View>

          <View className="px-3">
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                className={`flex-row items-center px-4 h-12 mb-2 rounded-xl transition-colors ${item.active ? 'bg-[#D4CDA8] shadow-sm' : 'hover:bg-[#dcd6b6]'}`}
              >
                <Feather name={item.icon} size={22} color={item.active ? '#528F33' : '#6B7280'} />
                {isExpanded && (
                  <Text className={`ml-4 text-[15px] font-medium ${item.active ? 'text-[#212134]' : 'text-[#4B5563]'}`}>
                    {item.name}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="px-3">
          <Link href="/" asChild>
            <TouchableOpacity className="flex-row items-center px-4 h-12 rounded-xl hover:bg-[#dcd6b6] transition-colors">
              <Feather name="log-out" size={22} color="#D9534F" />
              {isExpanded && <Text className="ml-4 text-[15px] font-medium text-[#D9534F]">Sair</Text>}
            </TouchableOpacity>
          </Link>
          
          {Platform.OS === 'web' && (
            <TouchableOpacity 
              onPress={() => setIsExpanded(!isExpanded)}
              className="mt-6 flex-row items-center justify-center h-10 border-t border-[#d4cea3]"
            >
              <Feather name={isExpanded ? 'chevron-left' : 'chevron-right'} size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="flex-1">
        {children}
      </View>
    </View>
  );
}
