import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ChildCard from '../../components/ui/ChildCard';
import Footer from '../../components/ui/Footer';

export default function ChildSelectionScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(null);

  const childrenList = [
    { id: '1', name: 'Erick Silva', age: '3 Anos e 3 meses', teaLevel: 'TEA - Nível 2' },
    { id: '2', name: 'Ana Maria Medeiros', age: '5 Anos e 3 meses', teaLevel: 'TEA - Nível 2' },
    { id: '3', name: 'Lucas Ferreira', age: '6 Anos e 3 meses', teaLevel: 'TEA - Nível 1' },
  ];

  const handleSelect = (id) => {
    setSelectedId(id);
    setTimeout(() => {
      router.push('/dashboard');
    }, 400);
  };

  return (
    <DashboardLayout>
      <View className="flex-1 bg-[#FDFFF1]">
        <ScrollView className="flex-1 px-8 pt-16" showsVerticalScrollIndicator={false}>
          <View className="max-w-[700px] w-full self-center">

            <Text className="text-[36px] font-extrabold text-[#4A4238] text-center mb-12 tracking-tight">
              Selecione a criança para análise
            </Text>

            <View className="pb-20">
              {childrenList.map((child) => (
                <ChildCard
                  key={child.id}
                  name={child.name}
                  age={child.age}
                  teaLevel={child.teaLevel}
                  selected={selectedId === child.id}
                  onPress={() => handleSelect(child.id)}
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
