import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function LogsTableWidget({ logs = [] }) {
  const [search, setSearch] = useState('');
  const [reactionFilter, setReactionFilter] = useState('all');
  const [showReactionModal, setShowReactionModal] = useState(false);

  const getReaction = (reacao) => {
    switch (reacao) {
      case 1:
        return { label: 'Gostou', color: 'bg-green-100 text-green-700' };
      case 2:
        return { label: 'Não gostou', color: 'bg-red-100 text-red-700' };
      case 3:
        return { label: 'Neutro', color: 'bg-yellow-100 text-yellow-700' };
      default:
        return { label: 'Desconhecida', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';

    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFeedback = (log, atributo) => {
    const feedback = log.feedbacks?.find(
      item => item.atributo?.toUpperCase() === atributo
    );

    if (!feedback) return '-';

    return feedback.gostou ? 'Gostou' : 'Não gostou';
  };

  const logsFiltrados = useMemo(() => {
    const termo = search.trim().toLowerCase();

    return logs.filter(log => {
      const alimento = log.alimento?.nome?.toLowerCase() || '';
      const cor = log.alimento?.cor?.toLowerCase() || '';
      const textura = log.alimento?.textura?.toLowerCase() || '';

      const matchesSearch =
        !termo ||
        alimento.includes(termo) ||
        cor.includes(termo) ||
        textura.includes(termo);

      const matchesReaction =
        reactionFilter === 'all' ||
        log.reacao === Number(reactionFilter);

      return matchesSearch && matchesReaction;
    });
  }, [logs, search, reactionFilter]);

  const getReactionFilterLabel = () => {
    switch (reactionFilter) {
      case 1:
        return 'Gostou';
      case 2:
        return 'Não gostou';
      case 3:
        return 'Neutro';
      default:
        return 'Todas as Reações';
    }
  };

  const selecionarReacao = (value) => {
    setReactionFilter(value);
    setShowReactionModal(false);
  };

  const exportarCSV = () => {
    if (logsFiltrados.length === 0) {
      Alert.alert(
        'Exportação',
        'Não existem registros para exportar com os filtros atuais.'
      );
      return;
    }

    if (Platform.OS !== 'web') {
      Alert.alert(
        'Exportação',
        'A exportação CSV está disponível na versão web.'
      );
      return;
    }

    const escapeCSV = (value) => {
      const text = String(value ?? '');
      return `"${text.replace(/"/g, '""')}"`;
    };

    const headers = [
      'Data/Hora',
      'Alimento',
      'Cor',
      'Textura',
      'Sabor',
      'Cheiro',
      'Temperatura',
      'Reação',
    ];

    const rows = logsFiltrados.map(log => {
      const reaction = getReaction(log.reacao);

      return [
        formatDate(log.timestamp),
        log.alimento?.nome || `Alimento #${log.alimentoId}`,
        log.alimento?.cor || '-',
        log.alimento?.textura || '-',
        getFeedback(log, 'SABOR'),
        getFeedback(log, 'CHEIRO'),
        log.alimento?.temperatura || '-',
        reaction.label,
      ];
    });

    const csv = [
      headers.map(escapeCSV).join(','),
      ...rows.map(row => row.map(escapeCSV).join(',')),
    ].join('\n');

    const blob = new Blob(
      [`\uFEFF${csv}`],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'registros-alimentares.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-[20px] font-bold text-[#212134]">
            Registros de Interação
          </Text>

          <Text className="text-[12px] text-[#6B7280] mt-1">
            Eventos alimentares registrados pelo sistema
          </Text>
        </View>

        <TouchableOpacity
          onPress={exportarCSV}
          className="flex-row items-center bg-[#528F33] px-4 py-2.5 rounded-xl"
        >
          <Feather name="download" size={15} color="#fff" />

          <Text className="ml-2 text-[13px] font-bold text-white">
            Exportar CSV
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-col md:flex-row gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
        <View className="flex-row items-center bg-white border border-gray-200 px-3 py-2.5 rounded-lg flex-1 shadow-sm">
          <Feather name="search" size={16} color="#9CA3AF" />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Pesquisar por alimento, cor ou textura..."
            className="ml-2 flex-1 text-[13px] text-[#212134] outline-none bg-transparent"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <TouchableOpacity
          onPress={() => setShowReactionModal(true)}
          className="flex-row items-center bg-white border border-gray-200 px-3 py-2.5 rounded-lg shadow-sm"
        >
          <Feather name="filter" size={14} color="#6B7280" />

          <Text className="ml-2 text-[13px] text-[#4B5563] mr-2">
            {getReactionFilterLabel()}
          </Text>

          <Feather name="chevron-down" size={14} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showReactionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReactionModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowReactionModal(false)}
          className="flex-1 bg-black/30 items-center justify-center p-6"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            className="bg-white rounded-2xl w-full max-w-[420px] p-6 shadow-lg"
          >
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-[18px] font-bold text-[#212134]">
                Filtrar por reação
              </Text>

              <TouchableOpacity
                onPress={() => setShowReactionModal(false)}
              >
                <Feather
                  name="x"
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => selecionarReacao('all')}
              className={`flex-row items-center justify-between p-4 rounded-xl border mb-3 ${
                reactionFilter === 'all'
                  ? 'bg-[#F1F7EC] border-[#528F33]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text className="text-[14px] font-bold text-[#212134]">
                Todas as Reações
              </Text>

              {reactionFilter === 'all' && (
                <Feather
                  name="check"
                  size={18}
                  color="#528F33"
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => selecionarReacao(1)}
              className={`flex-row items-center justify-between p-4 rounded-xl border mb-3 ${
                reactionFilter === 1
                  ? 'bg-[#F1F7EC] border-[#528F33]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text className="text-[14px] font-bold text-[#212134]">
                Gostou
              </Text>

              {reactionFilter === 1 && (
                <Feather
                  name="check"
                  size={18}
                  color="#528F33"
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => selecionarReacao(2)}
              className={`flex-row items-center justify-between p-4 rounded-xl border mb-3 ${
                reactionFilter === 2
                  ? 'bg-red-50 border-red-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text className="text-[14px] font-bold text-[#212134]">
                Não gostou
              </Text>

              {reactionFilter === 2 && (
                <Feather
                  name="check"
                  size={18}
                  color="#D9534F"
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => selecionarReacao(3)}
              className={`flex-row items-center justify-between p-4 rounded-xl border ${
                reactionFilter === 3
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text className="text-[14px] font-bold text-[#212134]">
                Neutro
              </Text>

              {reactionFilter === 3 && (
                <Feather
                  name="check"
                  size={18}
                  color="#F59E0B"
                />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <View className="hidden md:flex flex-row border-b border-gray-200 pb-3 mb-2 px-2 bg-white">
        <Text className="flex-[1.5] text-[12px] font-bold text-[#6B7280] uppercase">
          Data/Hora
        </Text>

        <Text className="flex-1 text-[12px] font-bold text-[#6B7280] uppercase">
          Alimento
        </Text>

        <Text className="flex-1 text-[12px] font-bold text-[#6B7280] uppercase">
          Sabor
        </Text>

        <Text className="flex-1 text-[12px] font-bold text-[#6B7280] uppercase">
          Textura
        </Text>

        <Text className="flex-1 text-[12px] font-bold text-[#6B7280] uppercase">
          Cheiro
        </Text>

        <Text className="flex-[1.5] text-[12px] font-bold text-[#6B7280] uppercase text-center">
          Reação
        </Text>
      </View>

      <View className="flex-col gap-3 md:gap-0">
        {logsFiltrados.map(log => {
          const reaction = getReaction(log.reacao);

          return (
            <View
              key={log.id}
              className="flex-col md:flex-row border border-gray-100 md:border-t-0 md:border-x-0 md:border-b-gray-100 p-4 md:py-3 md:px-2 rounded-xl md:rounded-none bg-white hover:bg-gray-50 transition-colors shadow-sm md:shadow-none"
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
                  {log.alimento?.nome || `Alimento #${log.alimentoId}`}
                </Text>
              </View>

              <View className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0">
                <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">
                  Sabor
                </Text>

                <Text className="text-[14px] text-[#6B7280] md:mt-1">
                  {getFeedback(log, 'SABOR')}
                </Text>
              </View>

              <View className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0">
                <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">
                  Textura
                </Text>

                <Text className="text-[14px] text-[#6B7280] md:mt-1">
                  {getFeedback(log, 'TEXTURA')}
                </Text>
              </View>

              <View className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-3 md:mb-0">
                <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">
                  Cheiro
                </Text>

                <Text className="text-[14px] text-[#6B7280] md:mt-1">
                  {getFeedback(log, 'CHEIRO')}
                </Text>
              </View>

              <View className="flex-[1.5] flex-row md:flex-col justify-between items-center border-t border-gray-100 md:border-0 pt-3 md:pt-0">
                <Text className="md:hidden text-[11px] font-bold text-[#9CA3AF] uppercase">
                  Reação
                </Text>

                <View
                  className={`px-4 py-1.5 rounded-full ${reaction.color}`}
                >
                  <Text
                    className={`text-[12px] font-bold ${reaction.color.split(' ')[1]}`}
                  >
                    {reaction.label}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        {logsFiltrados.length === 0 && (
          <View className="py-10 items-center">
            <Feather name="inbox" size={32} color="#9CA3AF" />

            <Text className="text-[14px] text-[#6B7280] mt-3">
              Nenhum registro encontrado.
            </Text>
          </View>
        )}
      </View>

      <View className="mt-4 items-end">
        <Text className="text-[11px] text-[#9CA3AF]">
          Exibindo {logsFiltrados.length} de {logs.length} registros
        </Text>
      </View>
    </View>
  );
}
