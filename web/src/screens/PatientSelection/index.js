import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PatientCard from '../../components/ui/PatientCard';
import SearchInput from '../../components/ui/SearchInput';
import Footer from '../../components/ui/Footer';

export default function PatientSelectionScreen() {
  const router = useRouter();

  const patients = [
    { id: '1', name: 'Ana Maria Silva', childrenCount: 2, initials: 'AM' },
    { id: '2', name: 'Carlos Henrique Augusto', childrenCount: 1, initials: 'CH' },
    { id: '3', name: 'Maria José', childrenCount: 1, initials: 'MJ' },
    { id: '4', name: 'Ana Clara Diaz', childrenCount: 3, initials: 'AC' },
    { id: '5', name: 'Diogo Cristiano Muniz', childrenCount: 1, initials: 'DC' },
  ];

  const handleSelect = (id) => {
    router.push('/children');
  };

  return (
    <DashboardLayout>
      <View className="flex-1 bg-[#FDFFF1]">
        <ScrollView className="flex-1 px-8 pt-12" showsVerticalScrollIndicator={false}>
          <View className="max-w-[800px] w-full self-center">
            <View className="mb-10">
              <Text className="text-[32px] font-extrabold text-[#212134] mb-2">
                Selecione a mãe/paciente
              </Text>
              <Text className="text-[16px] text-[#6B7280]">
                Escolha uma mãe para visualizar suas crianças
              </Text>
            </View>

            <SearchInput placeholder="Buscar mãe/paciente..." />

            <View className="pb-20">
              {patients.map((patient) => (
                <PatientCard 
                  key={patient.id}
                  name={patient.name}
                  initials={patient.initials}
                  childrenCount={patient.childrenCount}
                  onPress={() => handleSelect(patient.id)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
        <Footer />
      </View>
    </DashboardLayout>
  );
}
