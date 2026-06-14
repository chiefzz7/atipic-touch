import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';

export default function DashboardLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(Platform.OS === 'web' && Dimensions.get('window').width > 1024);
  const pathname = usePathname();

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleResize = () => {
        if (Dimensions.get('window').width < 1024) setIsExpanded(false);
        else setIsExpanded(true);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon: 'pie-chart', route: '/dashboard' },
    { name: 'Pacientes', icon: 'users', route: '/patients' },
    { name: 'Relatórios', icon: 'clipboard', route: '/reports' },
    { name: 'Configurações', icon: 'settings', route: '/settings' },
  ];

  return (
    <View className="flex-1 flex-row bg-[#FDFFF1] print:bg-white overflow-hidden">
      <View 
        className={`print:hidden bg-[#E2DCC8] transition-all duration-300 h-full flex-col justify-between py-6 border-r border-[#d4cea3] shadow-sm z-50
          ${isExpanded ? 'w-64 absolute md:relative' : 'w-20'}
        `}
      >
        <View>
          <View className={`flex-row items-center h-12 mb-8 ${isExpanded ? 'px-5' : 'justify-center'}`}>
            <View className="w-10 h-10 bg-[#528F33] rounded-lg items-center justify-center shadow-sm">
              <Text className="text-white font-bold text-lg">AT</Text>
            </View>
            {isExpanded && (
              <Text className="ml-3 text-[18px] lg:text-[20px] font-extrabold text-[#212134] tracking-tight">AtipicTouch</Text>
            )}
          </View>

          <View className="px-3">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.route || pathname.startsWith(item.route);

              return (
                <Link key={index} href={item.route} asChild>
                  <TouchableOpacity 
                    className={`flex-row items-center h-12 mb-2 rounded-xl transition-all ${isActive ? 'bg-[#D4CDA8] shadow-sm' : 'hover:bg-[#dcd6b6]'} ${isExpanded ? 'px-4' : 'justify-center'}`}
                  >
                    <Feather name={item.icon} size={20} color={isActive ? '#528F33' : '#6B7280'} />
                    {isExpanded && (
                      <Text className={`ml-4 text-[14px] lg:text-[15px] font-medium ${isActive ? 'text-[#212134]' : 'text-[#4B5563]'}`}>
                        {item.name}
                      </Text>
                    )}
                  </TouchableOpacity>
                </Link>
              );
            })}
          </View>
        </View>

        <View className="px-3">
          <Link href="/" asChild>
            <TouchableOpacity className={`flex-row items-center h-12 rounded-xl hover:bg-[#dcd6b6] transition-colors ${isExpanded ? 'px-4' : 'justify-center'}`}>
              <Feather name="log-out" size={20} color="#D9534F" />
              {isExpanded && <Text className="ml-4 text-[14px] lg:text-[15px] font-medium text-[#D9534F]">Sair</Text>}
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

      <View className="flex-1 relative">
        {isExpanded && Dimensions.get('window').width < 768 && (
           <TouchableOpacity 
             activeOpacity={1} 
             onPress={() => setIsExpanded(false)} 
             className="absolute inset-0 bg-black/20 z-40"
           />
        )}
        
        <View className="flex-1 w-full max-w-[1600px] mx-auto">
          {children}
        </View>
      </View>

    </View>
  );
}
