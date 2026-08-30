import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  Feather,
} from '@expo/vector-icons';


function formatDate(dateString) {
  if (!dateString) {
    return '-';
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}


function getReaction(reacao) {

  switch (reacao) {
    case 1:
      return {
        label: 'Aceitou',
        background: 'bg-green-100',
        text: 'text-green-700',
      };

    case 2:
      return {
        label: 'Rejeitou',
        background: 'bg-red-100',
        text: 'text-red-700',
      };

    case 3:
      return {
        label: 'Crise',
        background: 'bg-blue-100',
        text: 'text-blue-700',
      };

    default:
      return {
        label: `Reação ${reacao}`,
        background: 'bg-gray-100',
        text: 'text-gray-700',
      };
  }
}


export default function LogsTableWidget({
  logs = [],
}) {

  const [search, setSearch] =
    useState('');


  const filteredLogs = useMemo(() => {

    const term =
      search.trim().toLowerCase();

    if (!term) {
      return logs;
    }

    return logs.filter((log) => {

      const foodName =
        log.alimento?.nome || '';

      const color =
        log.alimento?.cor || '';

      const texture =
        log.alimento?.textura || '';

      return (
        foodName
          .toLowerCase()
          .includes(term) ||
        color
          .toLowerCase()
          .includes(term) ||
        texture
          .toLowerCase()
          .includes(term)
      );

    });

  }, [logs, search]);


  return (
    <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
      <View className="flex-row justify-between items-center mb-5">
        <View>
          <Text className="text-[20px] font-bold text-[#212134]">
            Registros de Interação
          </Text>

          <Text className="text-[12px] text-[#9CA3AF] mt-1">
            Eventos sensoriais registrados pelo sistema.
          </Text>
        </View>

        <TouchableOpacity
          className="flex-row items-center bg-gray-50 px-3 py-2 rounded-lg"
        >

          <Feather
            name="download"
            size={14}
            color="#6B7280"
          />

          <Text className="ml-2 text-[12px] font-bold text-[#6B7280]">
            Exportar CSV
          </Text>

        </TouchableOpacity>
      </View>

      <View className="flex-col md:flex-row gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
        <View className="flex-row items-center bg-white border border-gray-200 px-3 py-2.5 rounded-lg flex-1 shadow-sm">

          <Feather
            name="search"
            size={16}
            color="#9CA3AF"
          />

          <TextInput
            placeholder="Pesquisar por alimento, cor ou textura..."
            value={search}
            onChangeText={setSearch}
            className="ml-2 flex-1 text-[13px] text-[#212134] outline-none bg-transparent"
            placeholderTextColor="#9CA3AF"
          />

        </View>
      </View>


      <View className="hidden md:flex flex-row border-b border-gray-200 pb-3 mb-2 px-2 bg-white">
        <Text className="flex-[1.5] text-[12px] font-bold text-[#6B7280] uppercase">
          Data/Hora
        </Text>

        <Text className="flex-1 text-[12px] font-bold text-[#6B7280] uppercase">
          Alimento
        </Text>

        <Text className="flex-1 text-[12px] font-bold text-[#6B7280] uppercase">
          Cor
        </Text>

        <Text className="flex-1 text-[12px] font-bold text-[#6B7280] uppercase">
          Textura
        </Text>

        <Text className="flex-[1.5] text-[12px] font-bold text-[#6B7280] uppercase text-center">
          Reação
        </Text>
      </View>


      {filteredLogs.length === 0 ? (

        <View className="items-center py-10">
          <Feather
            name="inbox"
            size={32}
            color="#9CA3AF"
          />

          <Text className="text-[14px] font-bold text-[#6B7280] mt-3">
            Nenhum registro encontrado
          </Text>
        </View>

      ) : (

        <View className="flex-col gap-3 md:gap-0">

          {filteredLogs.map((log) => {

            const reaction =
              getReaction(log.reacao);

            const food =
              log.alimento;


            return (
              <View
                key={log.id}
                className="flex-col md:flex-row border border-gray-100 md:border-t-0 md:border-x-0 md:border-b-gray-100 p-4 md:py-3 md:px-2 rounded-xl md:rounded-none bg-white"
              >

                <View className="flex-[1.5] flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0">
                  <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">
                    Data/Hora
                  </Text>

                  <Text className="text-[14px] text-[#4B5563] md:mt-1">
                    {formatDate(log.timestamp)}
                  </Text>
                </View>

                <View className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0">
                  <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">
                    Alimento
                  </Text>

                  <Text className="text-[14px] font-bold text-[#212134] md:mt-1">
                    {food?.nome || 'Alimento não encontrado'}
                  </Text>
                </View>

                <View className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0">
                  <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">
                    Cor
                  </Text>

                  <Text className="text-[14px] text-[#6B7280] md:mt-1">
                    {food?.cor || '-'}
                  </Text>
                </View>

                <View className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-3 md:mb-0">
                  <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">
                    Textura
                  </Text>

                  <Text className="text-[14px] text-[#6B7280] md:mt-1">
                    {food?.textura || '-'}
                  </Text>
                </View>

                <View className="flex-[1.5] flex-row md:flex-col justify-between items-center border-t border-gray-100 md:border-0 pt-3 md:pt-0">
                  <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">
                    Reação Sensorial
                  </Text>

                  <View
                    className={`px-4 py-1.5 rounded-full ${reaction.background}`}
                  >

                    <Text
                      className={`text-[12px] font-bold ${reaction.text}`}
                    >
                      {reaction.label}
                    </Text>

                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
