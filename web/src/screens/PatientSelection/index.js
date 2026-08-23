import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DashboardLayout from '../../components/layout/DashboardLayout';
import PatientCard from '../../components/ui/PatientCard';
import SearchInput from '../../components/ui/SearchInput';
import Footer from '../../components/ui/Footer';

const API_URL = 'http://localhost:8000';

export default function PatientSelectionScreen() {
  const router = useRouter();

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = async () => {
    try {
      setLoading(true);
      setError('');

      const token = await AsyncStorage.getItem('@atipictouch:token');

      if (!token) {
        setError('Sessão não encontrada. Faça login novamente.');
        return;
      }

      const response = await fetch(
        `${API_URL}/api/professionals/patients`,
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
          data.detail || 'Não foi possível carregar os pacientes.'
        );
      }

      setPatients(data);
    } catch (err) {
      console.error('Erro ao carregar pacientes:', err);
      setError(err.message || 'Erro ao carregar pacientes.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return patients;
    }

    return patients.filter((patient) =>
      patient.nome.toLowerCase().includes(normalizedSearch)
    );
  }, [patients, search]);

  const handleSelect = async (patient) => {
    try {
      await AsyncStorage.setItem(
        '@atipictouch:selected_responsavel',
        JSON.stringify({
          id: patient.id,
          nome: patient.nome,
          childrenCount: patient.childrenCount,
        })
      );

      router.push('/children');
    } catch (err) {
      console.error('Erro ao selecionar paciente:', err);
    }
  };

  return (
    <DashboardLayout>
      <View className="flex-1 bg-[#FDFFF1]">
        <ScrollView
          className="flex-1 px-8 pt-12"
          showsVerticalScrollIndicator={false}
        >
          <View className="max-w-[800px] w-full self-center">

            <View className="mb-10">
              <Text className="text-[32px] font-extrabold text-[#212134] mb-2">
                Selecione a mãe/paciente
              </Text>

              <Text className="text-[16px] text-[#6B7280]">
                Escolha uma mãe para visualizar suas crianças
              </Text>
            </View>

            <SearchInput
              placeholder="Buscar mãe/paciente..."
              value={search}
              onChangeText={setSearch}
            />

            {loading && (
              <View className="items-center py-10">
                <ActivityIndicator
                  size="large"
                  color="#528F33"
                />

                <Text className="text-[#6B7280] mt-3">
                  Carregando pacientes...
                </Text>
              </View>
            )}

            {!loading && error !== '' && (
              <View className="bg-white border border-red-200 rounded-2xl p-6 mb-6">
                <Text className="text-red-600 font-semibold text-center">
                  {error}
                </Text>
              </View>
            )}

            {!loading &&
              !error &&
              filteredPatients.length === 0 && (
                <View className="bg-white border border-gray-100 rounded-2xl p-8">
                  <Text className="text-[#6B7280] text-center">
                    Nenhum paciente encontrado.
                  </Text>
                </View>
              )}

            <View className="pb-20">
              {!loading &&
                !error &&
                filteredPatients.map((patient) => {
                  const initials = patient.nome
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((name) => name[0])
                    .join('')
                    .toUpperCase();

                  return (
                    <PatientCard
                      key={patient.id}
                      name={patient.nome}
                      initials={initials}
                      childrenCount={patient.childrenCount}
                      onPress={() => handleSelect(patient)}
                    />
                  );
                })}
            </View>

          </View>
        </ScrollView>

        <Footer />
      </View>
    </DashboardLayout>
  );
}
