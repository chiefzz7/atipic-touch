import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  Feather,
} from '@expo/vector-icons';

import DashboardLayout from '../../components/layout/DashboardLayout';

import ProfileTab from '../../components/settings/ProfileTab';
import SignatureTab from '../../components/settings/SignatureTab';
import SystemTab from '../../components/settings/SystemTab';
import Footer from '../../components/ui/Footer';

export default function SettingsScreen() {
  const [
    activeTab,
    setActiveTab,
  ] = useState(
    'profile'
  );

  const tabs = [
    {
      id: 'profile',
      label:
        'Meu Perfil',
      icon: 'user',
    },
    {
      id:
        'signature',
      label:
        'Documentos e Assinatura',
      icon:
        'pen-tool',
    },
    {
      id: 'system',
      label:
        'Preferências do Sistema',
      icon:
        'settings',
    },
  ];

  return (
    <DashboardLayout>
      <ScrollView
        className="flex-1 bg-[#FFFCEF] p-6 lg:p-10"
        showsVerticalScrollIndicator={
          false
        }
      >
        <View className="max-w-[900px] w-full self-center mb-20">
          <View className="mb-8">
            <Text className="text-[32px] font-extrabold text-[#554B41]">
              Configurações
            </Text>

            <Text className="text-[15px] text-[#80775C] font-medium mt-1">
              Faça a gestão do seu perfil, laudos e parâmetros técnicos do sistema.
            </Text>
          </View>

          <View className="flex-row border-b border-[#DDD3B9] mb-8 overflow-hidden">
            {tabs.map(
              (tab) => {
                const isActive =
                  activeTab ===
                  tab.id;

                return (
                  <TouchableOpacity
                    key={
                      tab.id
                    }
                    onPress={() =>
                      setActiveTab(
                        tab.id
                      )
                    }
                    activeOpacity={0.7}
                    className={`flex-row items-center py-3 px-6 border-b-2 transition-colors ${
                      isActive
                        ? 'border-[#4D9B43] bg-[#F7F0DC]'
                        : 'border-transparent hover:bg-[#F7F0DC]'
                    }`}
                  >
                    <Feather
                      name={
                        tab.icon
                      }
                      size={16}
                      color={
                        isActive
                          ? '#4D9B43'
                          : '#80775C'
                      }
                    />

                    <Text
                      className={`ml-2 text-[14px] font-bold ${
                        isActive
                          ? 'text-[#4D9B43]'
                          : 'text-[#80775C]'
                      }`}
                    >
                      {
                        tab.label
                      }
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>

          <View className="min-h-[500px]">
            {activeTab ===
            'profile' ? (
              <ProfileTab />
            ) : null}

            {activeTab ===
            'signature' ? (
              <SignatureTab />
            ) : null}

            {activeTab ===
            'system' ? (
              <SystemTab />
            ) : null}
          </View>
        </View>

        <Footer />
      </ScrollView>
    </DashboardLayout>
  );
}
