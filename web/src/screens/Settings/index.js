import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import DashboardLayout from '../../components/layout/DashboardLayout';
import ProfileTab from '../../components/settings/ProfileTab';
import SignatureTab from '../../components/settings/SignatureTab';
import SystemTab from '../../components/settings/SystemTab';
import Toast from '../../components/common/Toast';
import Footer from '../../components/ui/Footer';
import { useSettings } from '../../context/SettingsContext';

const TABS = [
  { id: 'profile', label: 'Meu perfil', icon: 'user', Component: ProfileTab },
  { id: 'signature', label: 'Documentos e assinatura', icon: 'pen-tool', Component: SignatureTab },
  { id: 'system', label: 'Preferências do sistema', icon: 'sliders', Component: SystemTab },
];

export default function SettingsScreen() {
  const { ready } = useSettings();
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, type = 'success') => setToast({ message, type, id: Date.now() }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const Active = TABS.find((t) => t.id === activeTab).Component;

  return (
    <DashboardLayout>
      <Toast toast={toast} onHide={hideToast} />
      <ScrollView className="flex-1 bg-[#FFFCEF] px-5 py-6 lg:px-10 lg:py-8" showsVerticalScrollIndicator={false}>
        <View className="max-w-[920px] w-full self-center mb-16">
          <View className="mb-7">
            <Text className="text-[30px] font-extrabold text-[#212134] tracking-tight">Configurações</Text>
            <Text className="text-[15px] text-[#6B6554] mt-1">
              Gerencie seu perfil, documentos e os parâmetros que regem alertas e relatórios.
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-7 flex-grow-0">
            <View className="flex-row bg-[#F3F7EE] rounded-[14px] p-1 border border-[#DCE7D2]">
              {TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => setActiveTab(tab.id)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: active }}
                    className={`flex-row items-center py-2.5 px-5 rounded-[11px] transition-colors ${
                      active ? 'bg-white shadow-card' : 'hover:bg-white/60'
                    }`}
                  >
                    <Feather name={tab.icon} size={15} color={active ? '#528F33' : '#6B6554'} />
                    <Text className={`ml-2 text-[13px] font-bold ${active ? 'text-[#528F33]' : 'text-[#6B6554]'}`}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {ready ? <Active key={activeTab} notify={notify} /> : null}
        </View>

        <Footer />
      </ScrollView>
    </DashboardLayout>
  );
}
