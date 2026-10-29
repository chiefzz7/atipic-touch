import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Link, usePathname, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS, clearSession } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';
import { initials } from '../../utils/format';

const MENU = [
  { name: 'Dashboard', icon: 'pie-chart', route: '/dashboard' },
  { name: 'Pacientes', icon: 'users', route: '/patients' },
  { name: 'Relatórios', icon: 'clipboard', route: '/reports' },
  { name: 'Configurações', icon: 'settings', route: '/settings' },
];

export default function DashboardLayout({ children }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;
  const [userExpanded, setUserExpanded] = useState(null); // null = automático pela largura
  const isExpanded = userExpanded ?? isWide;
  const pathname = usePathname();
  const router = useRouter();
  const { settings } = useSettings();
  const { nome, foto, especialidade } = settings.profile;

  // Guarda de rota: sem token, volta ao login.
  useEffect(() => {
    AsyncStorage.getItem(KEYS.token).then((token) => {
      if (!token) router.replace('/');
    });
  }, [router, pathname]);

  const sair = useCallback(async () => {
    await clearSession();
    router.replace('/');
  }, [router]);

  const overlayMobile = isExpanded && width < 768;

  return (
    <View className="flex-1 flex-row bg-[#FFFCEF] print:bg-white overflow-hidden" style={{ minHeight: '100vh' }}>
      <View
        accessibilityRole="navigation"
        className={`print-hide bg-[#F1E9D2] border-r border-[#DDD3B9] h-full flex-col justify-between py-5 z-50 transition-all duration-200 ${
          isExpanded ? 'w-64' : 'w-[76px]'
        } ${overlayMobile ? 'absolute' : 'relative'}`}
      >
        <View>
          <View className={`flex-row items-center h-12 mb-6 ${isExpanded ? 'px-5' : 'justify-center'}`}>
            <View className="w-10 h-10 bg-[#528F33] rounded-[12px] items-center justify-center">
              <Text className="text-white font-extrabold text-[15px]">AT</Text>
            </View>
            {isExpanded ? (
              <Text className="ml-3 text-[19px] font-extrabold text-[#212134] tracking-tight">AtipicTouch</Text>
            ) : null}
          </View>

          <View className="px-3">
            {MENU.map((item) => {
              const active = pathname === item.route || pathname.startsWith(`${item.route}/`);
              return (
                <Link key={item.route} href={item.route} asChild>
                  <TouchableOpacity
                    accessibilityLabel={item.name}
                    activeOpacity={0.8}
                    className={`flex-row items-center h-11 mb-1.5 rounded-[12px] transition-colors ${
                      active ? 'bg-[#528F33]' : 'hover:bg-[#E6DCBF]'
                    } ${isExpanded ? 'px-4' : 'justify-center'}`}
                  >
                    <Feather name={item.icon} size={19} color={active ? '#FFFFFF' : '#6B6554'} />
                    {isExpanded ? (
                      <Text className={`ml-3.5 text-[14px] ${active ? 'text-white font-bold' : 'text-[#6B6554] font-medium'}`}>
                        {item.name}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                </Link>
              );
            })}
          </View>
        </View>

        <View className="px-3">
          {isExpanded ? (
            <Link href="/settings" asChild>
              <TouchableOpacity className="flex-row items-center p-3 mb-3 rounded-[12px] bg-white/70 hover:bg-white transition-colors">
                <View className="w-9 h-9 rounded-full bg-[#A3C78B] items-center justify-center overflow-hidden">
                  {foto ? (
                    <Image source={{ uri: foto }} style={{ width: 36, height: 36 }} />
                  ) : (
                    <Text className="text-[#212134] font-extrabold text-[13px]">{initials(nome)}</Text>
                  )}
                </View>
                <View className="ml-3 flex-1">
                  <Text numberOfLines={1} className="text-[#212134] text-[13px] font-bold">{nome || 'Meu perfil'}</Text>
                  <Text numberOfLines={1} className="text-[#6B6554] text-[11px]">{especialidade || 'Profissional'}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          ) : null}

          <TouchableOpacity
            onPress={sair}
            accessibilityLabel="Sair"
            activeOpacity={0.8}
            className={`flex-row items-center h-11 rounded-[12px] hover:bg-[#F3DCD6] transition-colors ${
              isExpanded ? 'px-4' : 'justify-center'
            }`}
          >
            <Feather name="log-out" size={19} color="#D9534F" />
            {isExpanded ? <Text className="ml-3.5 text-[14px] font-medium text-[#D9534F]">Sair</Text> : null}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setUserExpanded(!isExpanded)}
            accessibilityLabel={isExpanded ? 'Recolher menu' : 'Expandir menu'}
            className="mt-4 flex-row items-center justify-center h-10 border-t border-[#DDD3B9]"
          >
            <Feather name={isExpanded ? 'chevron-left' : 'chevron-right'} size={19} color="#6B6554" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 relative">
        {overlayMobile ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setUserExpanded(false)}
            className="absolute inset-0 bg-[#212134]/30 z-40"
          />
        ) : null}
        <View className="flex-1 w-full max-w-[1600px] mx-auto">{children}</View>
      </View>
    </View>
  );
}
