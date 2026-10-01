import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
} from 'react-native';

import {
  Feather,
} from '@expo/vector-icons';

export default function LogsTableWidget({
  logs = [],
}) {
  const [
    search,
    setSearch,
  ] = useState('');

  const [
    reactionFilter,
    setReactionFilter,
  ] = useState('all');

  const [
    showReactionModal,
    setShowReactionModal,
  ] = useState(false);

  const getReaction =
    (reacao) => {
      switch (reacao) {
        case 1:
          return {
            label:
              'Gostou',
            backgroundClass:
              'bg-[#EDF6E8]',
            textClass:
              'text-[#4D9B43]',
          };

        case 2:
          return {
            label:
              'Não gostou',
            backgroundClass:
              'bg-[#FCEBE8]',
            textClass:
              'text-[#D9534F]',
          };

        case 3:
          return {
            label:
              'Neutro',
            backgroundClass:
              'bg-[#F8F0D9]',
            textClass:
              'text-[#C29424]',
          };

        default:
          return {
            label:
              'Desconhecida',
            backgroundClass:
              'bg-[#E5DCC4]',
            textClass:
              'text-[#80775C]',
          };
      }
    };

  const formatDate =
    (timestamp) => {
      if (!timestamp) {
        return '-';
      }

      return new Date(
        timestamp
      ).toLocaleString(
        'pt-BR',
        {
          day: '2-digit',
          month:
            '2-digit',
          year:
            'numeric',
          hour:
            '2-digit',
          minute:
            '2-digit',
        }
      );
    };

  const getFeedback =
    (
      log,
      atributo
    ) => {
      const feedback =
        log.feedbacks?.find(
          (item) =>
            item.atributo?.toUpperCase() ===
            atributo
        );

      if (!feedback) {
        return '-';
      }

      return feedback.gostou
        ? 'Gostou'
        : 'Não gostou';
    };

  const logsFiltrados =
    useMemo(() => {
      const termo =
        search
          .trim()
          .toLowerCase();

      return logs.filter(
        (log) => {
          const alimento =
            log.alimento?.nome?.toLowerCase() ||
            '';

          const cor =
            log.alimento?.cor?.toLowerCase() ||
            '';

          const textura =
            log.alimento?.textura?.toLowerCase() ||
            '';

          const matchesSearch =
            !termo ||
            alimento.includes(
              termo
            ) ||
            cor.includes(
              termo
            ) ||
            textura.includes(
              termo
            );

          const matchesReaction =
            reactionFilter ===
              'all' ||
            log.reacao ===
              Number(
                reactionFilter
              );

          return (
            matchesSearch &&
            matchesReaction
          );
        }
      );
    }, [
      logs,
      search,
      reactionFilter,
    ]);

  const getReactionFilterLabel =
    () => {
      switch (
        reactionFilter
      ) {
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

  const selecionarReacao =
    (value) => {
      setReactionFilter(
        value
      );

      setShowReactionModal(
        false
      );
    };

  const exportarCSV =
    () => {
      if (
        logsFiltrados.length ===
        0
      ) {
        Alert.alert(
          'Exportação',
          'Não existem registros para exportar com os filtros atuais.'
        );

        return;
      }

      if (
        Platform.OS !==
        'web'
      ) {
        Alert.alert(
          'Exportação',
          'A exportação CSV está disponível na versão web.'
        );

        return;
      }

      const escapeCSV =
        (value) => {
          const text =
            String(
              value ?? ''
            );

          return `"${text.replace(
            /"/g,
            '""'
          )}"`;
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

      const rows =
        logsFiltrados.map(
          (log) => {
            const reaction =
              getReaction(
                log.reacao
              );

            return [
              formatDate(
                log.timestamp
              ),
              log.alimento
                ?.nome ||
                `Alimento #${log.alimentoId}`,
              log.alimento
                ?.cor ||
                '-',
              log.alimento
                ?.textura ||
                '-',
              getFeedback(
                log,
                'SABOR'
              ),
              getFeedback(
                log,
                'CHEIRO'
              ),
              log.alimento
                ?.temperatura ||
                '-',
              reaction.label,
            ];
          }
        );

      const csv = [
        headers
          .map(
            escapeCSV
          )
          .join(','),
        ...rows.map(
          (row) =>
            row
              .map(
                escapeCSV
              )
              .join(',')
        ),
      ].join('\n');

      const blob =
        new Blob(
          [
            `\uFEFF${csv}`,
          ],
          {
            type:
              'text/csv;charset=utf-8;',
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          'a'
        );

      link.href =
        url;

      link.download =
        'registros-alimentares.csv';

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      URL.revokeObjectURL(
        url
      );
    };

  return (
    <View className="bg-[#F7F0DC] p-6 rounded-[10px] border border-[#DDD3B9] mb-10">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-[20px] font-bold text-[#554B41]">
            Registros de Interação
          </Text>

          <Text className="text-[12px] text-[#80775C] mt-1">
            Eventos alimentares registrados pelo sistema
          </Text>
        </View>

        <TouchableOpacity
          onPress={
            exportarCSV
          }
          activeOpacity={0.85}
          className="flex-row items-center bg-[#83BF6E] px-4 py-2.5 rounded-[10px] hover:bg-[#4D9B43] transition-colors"
        >
          <Feather
            name="download"
            size={15}
            color="#FFFFFF"
          />

          <Text className="ml-2 text-[13px] font-bold text-white">
            Exportar CSV
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-col md:flex-row gap-3 mb-6 bg-[#E5DCC4] p-3 rounded-[10px] border border-[#DDD3B9]">
        <View className="flex-row items-center bg-[#FFFCEF] border border-[#DDD3B9] px-3 py-2.5 rounded-[10px] flex-1">
          <Feather
            name="search"
            size={16}
            color="#80775C"
          />

          <TextInput
            value={search}
            onChangeText={
              setSearch
            }
            placeholder="Pesquisar por alimento, cor ou textura..."
            className="ml-2 flex-1 text-[13px] text-[#554B41] outline-none bg-transparent"
            placeholderTextColor="#A3987B"
          />
        </View>

        <TouchableOpacity
          onPress={() =>
            setShowReactionModal(
              true
            )
          }
          className="flex-row items-center bg-[#FFFCEF] border border-[#DDD3B9] px-3 py-2.5 rounded-[10px]"
        >
          <Feather
            name="filter"
            size={14}
            color="#80775C"
          />

          <Text className="ml-2 text-[13px] text-[#554B41] mr-2">
            {
              getReactionFilterLabel()
            }
          </Text>

          <Feather
            name="chevron-down"
            size={14}
            color="#A3987B"
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={
          showReactionModal
        }
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowReactionModal(
            false
          )
        }
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            setShowReactionModal(
              false
            )
          }
          className="flex-1 bg-black/30 items-center justify-center p-6"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            className="bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] w-full max-w-[420px] p-6"
          >
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-[18px] font-bold text-[#554B41]">
                Filtrar por reação
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setShowReactionModal(
                    false
                  )
                }
              >
                <Feather
                  name="x"
                  size={20}
                  color="#80775C"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() =>
                selecionarReacao(
                  'all'
                )
              }
              className={`flex-row items-center justify-between p-4 rounded-[10px] border mb-3 ${
                reactionFilter ===
                'all'
                  ? 'bg-[#EDF6E8] border-[#83BF6E]'
                  : 'bg-[#F7F0DC] border-[#DDD3B9]'
              }`}
            >
              <Text className="text-[14px] font-bold text-[#554B41]">
                Todas as Reações
              </Text>

              {reactionFilter ===
              'all' ? (
                <Feather
                  name="check"
                  size={18}
                  color="#4D9B43"
                />
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                selecionarReacao(
                  1
                )
              }
              className={`flex-row items-center justify-between p-4 rounded-[10px] border mb-3 ${
                reactionFilter ===
                1
                  ? 'bg-[#EDF6E8] border-[#83BF6E]'
                  : 'bg-[#F7F0DC] border-[#DDD3B9]'
              }`}
            >
              <Text className="text-[14px] font-bold text-[#554B41]">
                Gostou
              </Text>

              {reactionFilter ===
              1 ? (
                <Feather
                  name="check"
                  size={18}
                  color="#4D9B43"
                />
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                selecionarReacao(
                  2
                )
              }
              className={`flex-row items-center justify-between p-4 rounded-[10px] border mb-3 ${
                reactionFilter ===
                2
                  ? 'bg-[#FCEBE8] border-[#E7B8B2]'
                  : 'bg-[#F7F0DC] border-[#DDD3B9]'
              }`}
            >
              <Text className="text-[14px] font-bold text-[#554B41]">
                Não gostou
              </Text>

              {reactionFilter ===
              2 ? (
                <Feather
                  name="check"
                  size={18}
                  color="#D9534F"
                />
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                selecionarReacao(
                  3
                )
              }
              className={`flex-row items-center justify-between p-4 rounded-[10px] border ${
                reactionFilter ===
                3
                  ? 'bg-[#F8F0D9] border-[#DFC77B]'
                  : 'bg-[#F7F0DC] border-[#DDD3B9]'
              }`}
            >
              <Text className="text-[14px] font-bold text-[#554B41]">
                Neutro
              </Text>

              {reactionFilter ===
              3 ? (
                <Feather
                  name="check"
                  size={18}
                  color="#C29424"
                />
              ) : null}
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <View className="hidden md:flex flex-row border-b border-[#DDD3B9] pb-3 mb-2 px-2 bg-[#E5DCC4] rounded-t-[10px] pt-3">
        {[
          [
            'Data/Hora',
            'flex-[1.5]',
          ],
          [
            'Alimento',
            'flex-1',
          ],
          [
            'Sabor',
            'flex-1',
          ],
          [
            'Textura',
            'flex-1',
          ],
          [
            'Cheiro',
            'flex-1',
          ],
        ].map(
          ([
            label,
            flexClass,
          ]) => (
            <Text
              key={label}
              className={`${flexClass} text-[12px] font-bold text-[#80775C] uppercase`}
            >
              {label}
            </Text>
          )
        )}

        <Text className="flex-[1.5] text-[12px] font-bold text-[#80775C] uppercase text-center">
          Reação
        </Text>
      </View>

      <View className="flex-col gap-3 md:gap-0">
        {logsFiltrados.map(
          (log) => {
            const reaction =
              getReaction(
                log.reacao
              );

            return (
              <View
                key={log.id}
                className="flex-col md:flex-row border border-[#DDD3B9] md:border-t-0 md:border-x-0 p-4 md:py-3 md:px-2 rounded-[10px] md:rounded-none bg-[#FFFCEF] hover:bg-[#FAF7E9] transition-colors"
              >
                <View className="flex-[1.5] flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0">
                  <Text className="md:hidden text-[11px] font-bold text-[#A3987B] uppercase">
                    Data/Hora
                  </Text>

                  <Text className="text-[14px] text-[#80775C] md:mt-1">
                    {formatDate(
                      log.timestamp
                    )}
                  </Text>
                </View>

                <View className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0">
                  <Text className="md:hidden text-[11px] font-bold text-[#A3987B] uppercase">
                    Alimento
                  </Text>

                  <Text className="text-[14px] font-bold text-[#554B41] md:mt-1">
                    {log.alimento
                      ?.nome ||
                      `Alimento #${log.alimentoId}`}
                  </Text>
                </View>

                {[
                  [
                    'Sabor',
                    'SABOR',
                  ],
                  [
                    'Textura',
                    'TEXTURA',
                  ],
                  [
                    'Cheiro',
                    'CHEIRO',
                  ],
                ].map(
                  ([
                    label,
                    attribute,
                  ]) => (
                    <View
                      key={
                        attribute
                      }
                      className="flex-1 flex-row md:flex-col justify-between items-center md:items-start mb-2 md:mb-0"
                    >
                      <Text className="md:hidden text-[11px] font-bold text-[#A3987B] uppercase">
                        {label}
                      </Text>

                      <Text className="text-[14px] text-[#80775C] md:mt-1">
                        {getFeedback(
                          log,
                          attribute
                        )}
                      </Text>
                    </View>
                  )
                )}

                <View className="flex-[1.5] flex-row md:flex-col justify-between items-center border-t border-[#DDD3B9] md:border-0 pt-3 md:pt-0">
                  <Text className="md:hidden text-[11px] font-bold text-[#A3987B] uppercase">
                    Reação
                  </Text>

                  <View
                    className={`px-4 py-1.5 rounded-full ${reaction.backgroundClass}`}
                  >
                    <Text
                      className={`text-[12px] font-bold ${reaction.textClass}`}
                    >
                      {
                        reaction.label
                      }
                    </Text>
                  </View>
                </View>
              </View>
            );
          }
        )}

        {logsFiltrados.length ===
        0 ? (
          <View className="py-10 items-center">
            <Feather
              name="inbox"
              size={32}
              color="#A3987B"
            />

            <Text className="text-[14px] text-[#80775C] mt-3">
              Nenhum registro encontrado.
            </Text>
          </View>
        ) : null}
      </View>

      <View className="mt-4 items-end">
        <Text className="text-[11px] text-[#A3987B]">
          Exibindo{' '}
          {
            logsFiltrados.length
          }{' '}
          de {logs.length}{' '}
          registros
        </Text>
      </View>
    </View>
  );
}
