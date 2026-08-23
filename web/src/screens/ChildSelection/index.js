import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DashboardLayout from '../../components/layout/DashboardLayout';
import ChildCard from '../../components/ui/ChildCard';

const API_URL = 'http://localhost:8000';

export default function ChildSelectionScreen() {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState(null);
  const [responsavel, setResponsavel] = useState(null);
  const [childrenList, setChildrenList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const calcularIdade = (dataNascimento) => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();

    if (hoje.getDate() < nascimento.getDate()) {
      meses--;
    }

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    return `${anos} ${anos === 1 ? 'Ano' : 'Anos'} e ${meses} ${
      meses === 1 ? 'mês' : 'meses'
    }`;
  };

  const obterNivelTea = (temasPreferidos = []) => {
    const nivel = temasPreferidos.find((tema) =>
      tema.toUpperCase().includes('TEA')
    );

    return nivel || 'TEA';
  };

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError('');

      const token = await AsyncStorage.getItem('@atipictouch:token');

      if (!token) {
        setError('Sessão não encontrada. Faça login novamente.');
        return;
      }

      const responsavelStorage = await AsyncStorage.getItem(
        '@atipictouch:selected_responsavel'
      );

      if (!responsavelStorage) {
        setError('Nenhum responsável foi selecionado.');
        return;
      }

      const responsavelData = JSON.parse(responsavelStorage);

      setResponsavel(responsavelData);

      const response = await fetch(
        `${API_URL}/api/professionals/patients/${responsavelData.id}/children`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Não foi possível carregar as crianças.'
        );
      }

      setChildrenList(data);
    } catch (err) {
      console.error('Erro ao carregar crianças:', err);
      setError(err.message || 'Erro ao carregar crianças.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (child) => {
    setSelectedId(child.id);

    await AsyncStorage.setItem(
      '@atipictouch:selected_child',
      JSON.stringify({
        id: child.id,
        nome: child.nome,
        dataNascimento: child.dataNascimento,
        usuarioId: child.usuarioId,
      })
    );

    setTimeout(() => {
      router.push('/dashboard');
    }, 400);
  };

  return (
    <DashboardLayout>
      <View className="flex-1 bg-[#FDFFF1]">

        <ScrollView
          className="flex-1 p-4 md:p-6 lg:p-8 pt-8 md:pt-16"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-[600px] self-center">

            <Text className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#4A4238] text-center mb-2 md:mb-4 tracking-tight">
              Selecione a criança
            </Text>

            {responsavel && (
              <Text className="text-[14px] md:text-[16px] text-[#6B7280] text-center mb-8 md:mb-12">
                Crianças de{' '}
                <Text className="font-bold text-[#212134]">
                  {responsavel.nome}
                </Text>
              </Text>
            )}

            {loading && (
              <View className="items-center py-10">
                <ActivityIndicator
                  size="large"
                  color="#528F33"
                />

                <Text className="text-[#6B7280] mt-3">
                  Carregando crianças...
                </Text>
              </View>
            )}

            {!loading && error !== '' && (
              <View className="bg-white border border-red-200 rounded-2xl p-6">
                <Text className="text-red-600 font-semibold text-center">
                  {error}
                </Text>
              </View>
            )}

            {!loading &&
              !error &&
              childrenList.length === 0 && (
                <View className="bg-white border border-gray-100 rounded-2xl p-8">
                  <Text className="text-[#6B7280] text-center">
                    Nenhuma criança encontrada.
                  </Text>
                </View>
              )}

            <View className="pb-20 flex-col gap-4">
              {!loading &&
                !error &&
                childrenList.map((child) => (
                  <ChildCard
                    key={child.id}
                    name={child.nome}
                    age={calcularIdade(child.dataNascimento)}
                    teaLevel={obterNivelTea(child.temasPreferidos)}
                    selected={selectedId === child.id}
                    onPress={() => handleSelect(child)}
                  />
                ))}
            </View>

          </View>
        </ScrollView>

      </View>
    </DashboardLayout>
  );
}
