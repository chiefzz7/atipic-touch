import React from 'react';

import {
  View,
  Text,
  TextInput,
} from 'react-native';

import {
  Feather,
} from '@expo/vector-icons';

import {
  calcularIdade,
  calcularResumo,
  calcularMetricas,
  calcularMatrizSensorial,
  calcularFatoresComportamentais,
  calcularRepertorio,
} from '../../utils/reports';

const getFoodEmoji = (
  category
) => {
  if (!category) {
    return '🍽️';
  }

  const normalized =
    category
      .trim()
      .toLowerCase();

  const emojis = {
    fruta: '🍎',
    frutas: '🍎',
    cereal: '🌾',
    cereais: '🌾',
    laticínio: '🥛',
    laticinios: '🥛',
    legume: '🥕',
    legumes: '🥕',
    verdura: '🥬',
    verduras: '🥬',
    proteína: '🍗',
    proteina: '🍗',
    carnes: '🍗',
    carne: '🍗',
    bebida: '🥤',
    bebidas: '🥤',
    doce: '🍰',
    doces: '🍰',
  };

  return (
    emojis[
      normalized
    ] || '🍽️'
  );
};

export const ReportCard = ({
  title,
  children,
  flexClass = 'flex-1',
}) => (
  <View
    className={`bg-white border border-[#C6BB9A] rounded-[10px] p-5 ${flexClass}`}
  >
    {title ? (
      <Text className="text-[15px] font-extrabold text-[#4D9B43] mb-4 uppercase tracking-wide">
        {title}
      </Text>
    ) : null}

    {children}
  </View>
);

export const PatientSummaryWidget = ({
  child,
  logs = [],
}) => {
  const idade =
    calcularIdade(
      child?.dataNascimento
    );

  const resumo =
    calcularResumo(
      logs
    );

  return (
    <View className="flex-col md:flex-row bg-[#F7F0DC] border border-[#A3C78C] rounded-[10px] mb-4">
      <View className="flex-1 p-5 border-b md:border-b-0 md:border-r border-[#A3C78C] flex-row items-center">
        <View className="w-16 h-16 bg-[#C6BB9A] rounded-full items-center justify-center mr-4 border-2 border-white overflow-hidden">
          <Feather
            name="user"
            size={24}
            color="#FFFFFF"
          />
        </View>

        <View>
          <Text className="text-[12px] font-bold text-[#4D9B43] uppercase tracking-wider mb-1">
            Dados do paciente
          </Text>

          <Text className="text-[18px] font-extrabold text-[#554B41]">
            {child?.nome ||
              'Paciente'}
          </Text>

          <Text className="text-[13px] text-[#80775C] mt-0.5">
            Idade: {idade}
          </Text>
        </View>
      </View>

      <View className="flex-1 p-5 flex-row items-start">
        <Feather
          name="activity"
          size={20}
          color="#4D9B43"
          className="mr-3 mt-1"
        />

        <View className="flex-1">
          <Text className="text-[12px] font-bold text-[#4D9B43] uppercase tracking-wider mb-1">
            Evolução Global
          </Text>

          {resumo.total >
          0 ? (
            <Text className="text-[13px] text-[#554B41] leading-relaxed">
              Foram registrados{' '}
              {resumo.total}{' '}
              {resumo.total ===
              1
                ? 'registro'
                : 'registros'}{' '}
              no período, com{' '}
              {resumo.aceitos}{' '}
              {resumo.aceitos ===
              1
                ? 'aceitação'
                : 'aceitações'}
              ,{' '}
              {
                resumo.rejeitados
              }{' '}
              {resumo.rejeitados ===
              1
                ? 'rejeição'
                : 'rejeições'}{' '}
              e{' '}
              {resumo.neutros}{' '}
              {resumo.neutros ===
              1
                ? 'registro neutro'
                : 'registros neutros'}
              . A taxa geral de aceitação foi de{' '}
              {
                resumo.taxaAceitacao
              }
              %.
            </Text>
          ) : (
            <Text className="text-[13px] text-[#554B41] leading-relaxed">
              Não existem registros alimentares no período.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export const QuickMetricsGrid = ({
  logs = [],
}) => {
  const metrics =
    calcularMetricas(
      logs
    );

  return (
    <View className="flex-row flex-wrap gap-4 h-full content-center">
      {metrics.map(
        (
          item,
          index
        ) => (
          <View
            key={index}
            className="w-[45%] flex-row items-center bg-[#F7F0DC] p-2 rounded-[10px] border border-[#DDD3B9]"
          >
            <View className="w-8 h-8 rounded-full bg-[#EDF6E8] items-center justify-center mr-2">
              <Feather
                name={item.icon}
                size={14}
                color="#4D9B43"
              />
            </View>

            <View>
              <Text className="text-[10px] text-[#80775C] uppercase font-bold">
                {item.label}
              </Text>

              <Text className="text-[15px] font-extrabold text-[#554B41]">
                {item.value}
              </Text>
            </View>
          </View>
        )
      )}
    </View>
  );
};

export const SensoryMatrixWidget = ({
  logs = [],
}) => {
  const rows =
    calcularMatrizSensorial(
      logs
    );

  return (
    <View className="flex-col w-full">
      <View className="flex-row border-b border-[#A3C78C] pb-2 mb-2 bg-[#EDF6E8] p-2 rounded-t-[10px]">
        <Text className="flex-[1.5] text-[11px] font-bold text-[#4D9B43] uppercase">
          Textura
        </Text>

        <Text className="flex-1 text-[11px] font-bold text-[#4D9B43] uppercase text-center">
          Exposição
        </Text>

        <Text className="flex-1 text-[11px] font-bold text-[#4D9B43] uppercase text-center">
          Aceitação
        </Text>

        <Text className="flex-1 text-[11px] font-bold text-[#4D9B43] uppercase text-center">
          Sucesso
        </Text>
      </View>

      {rows.length >
      0 ? (
        rows.map(
          (
            row,
            index
          ) => (
            <View
              key={index}
              className="flex-row border-b border-[#DDD3B9] py-2 px-2 last:border-0 hover:bg-[#F7F0DC] transition-colors"
            >
              <Text className="flex-[1.5] text-[12px] font-bold text-[#554B41]">
                {row.tex}
              </Text>

              <Text className="flex-1 text-[12px] text-[#80775C] text-center">
                {row.exp}
              </Text>

              <Text className="flex-1 text-[12px] text-[#80775C] text-center">
                {row.aceit}
              </Text>

              <Text className="flex-1 text-[12px] font-bold text-center text-[#4D9B43]">
                {row.taxa}
              </Text>
            </View>
          )
        )
      ) : (
        <Text className="text-[13px] text-[#80775C] py-4 text-center">
          Não existem dados sensoriais no período.
        </Text>
      )}
    </View>
  );
};

export const HorizontalBarChart = ({
  data = [],
  positive,
}) => (
  <View className="flex-col gap-3">
    {data.length >
    0 ? (
      data.map(
        (
          item,
          index
        ) => (
          <View
            key={index}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center w-20">
              <Text className="text-[14px] mr-2">
                {getFoodEmoji(
                  item.category
                )}
              </Text>

              <Text className="text-[12px] font-medium text-[#554B41]">
                {item.name}
              </Text>
            </View>

            <View className="flex-1 mx-3 h-2.5 bg-[#E5DCC4] rounded-full overflow-hidden">
              <View
                className={`h-full ${
                  positive
                    ? 'bg-[#4D9B43]'
                    : 'bg-[#D9534F]'
                }`}
                style={{
                  width:
                    item.value,
                }}
              />
            </View>

            <Text className="text-[11px] font-bold text-[#80775C] w-8 text-right">
              {item.value}
            </Text>
          </View>
        )
      )
    ) : (
      <Text className="text-[13px] text-[#80775C] text-center py-4">
        Não existem dados suficientes no período.
      </Text>
    )}
  </View>
);

export const BehavioralFactorsWidget = ({
  logs = [],
}) => {
  const factors =
    calcularFatoresComportamentais(
      logs
    );

  if (!factors.length) {
    return (
      <Text className="text-[13px] text-[#80775C] text-center py-4">
        Não existem dados comportamentais suficientes para gerar indicadores.
      </Text>
    );
  }

  return (
    <View className="flex-col gap-3 mt-1">
      {factors.map(
        (
          factor,
          index
        ) => {
          const dotClass =
            factor.color ===
            'red'
              ? 'bg-[#D9534F]'
              : factor.color ===
                'yellow'
              ? 'bg-[#C29424]'
              : 'bg-[#4D9B43]';

          return (
            <View
              key={index}
              className="flex-row items-start"
            >
              <View
                className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${dotClass}`}
              />

              <Text className="text-[13px] text-[#554B41] flex-1">
                {
                  factor.text
                }
              </Text>
            </View>
          );
        }
      )}
    </View>
  );
};

export const RepertoireWidget = ({
  logs = [],
}) => {
  const {
    repertoire,
    conforto,
    rejeitados,
  } =
    calcularRepertorio(
      logs
    );

  return (
    <View className="flex-col lg:flex-row gap-4 mt-2">
      <View className="flex-1 bg-[#F7F0DC] p-4 rounded-[10px] border border-[#DDD3B9]">
        <Text className="text-[11px] font-bold text-[#554B41] uppercase mb-3">
          Conforto
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {conforto.length >
          0 ? (
            conforto.map(
              (food) => (
                <View
                  key={
                    food.name
                  }
                  className="bg-[#EDF6E8] px-3 py-1.5 rounded-[8px] border border-[#A3C78C]"
                >
                  <Text className="text-[11px] font-bold text-[#4D9B43]">
                    {getFoodEmoji(
                      food.category
                    )}{' '}
                    {food.name}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text className="text-[11px] text-[#80775C]">
              Nenhum alimento com aceitação total.
            </Text>
          )}
        </View>
      </View>

      <View className="flex-1 bg-[#F7F0DC] p-4 rounded-[10px] border border-[#DDD3B9]">
        <Text className="text-[11px] font-bold text-[#554B41] uppercase mb-3">
          Alimentos registrados
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {repertoire.length >
          0 ? (
            repertoire.map(
              (food) => (
                <View
                  key={
                    food.name
                  }
                  className="bg-[#FFFCEF] px-3 py-1.5 rounded-[8px] border border-[#C6BB9A]"
                >
                  <Text className="text-[11px] font-bold text-[#554B41]">
                    {getFoodEmoji(
                      food.category
                    )}{' '}
                    {food.name}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text className="text-[11px] text-[#80775C]">
              Nenhum alimento registrado.
            </Text>
          )}
        </View>
      </View>

      <View className="flex-1 bg-[#FCEBE8] p-4 rounded-[10px] border border-[#E7B8B2]">
        <Text className="text-[11px] font-bold text-[#D9534F] uppercase mb-3">
          Rejeição total
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {rejeitados.length >
          0 ? (
            rejeitados.map(
              (food) => (
                <View
                  key={
                    food.name
                  }
                  className="bg-[#FFFCEF] px-3 py-1.5 rounded-[8px] border border-[#E7B8B2]"
                >
                  <Text className="text-[11px] font-bold text-[#D9534F]">
                    {getFoodEmoji(
                      food.category
                    )}{' '}
                    {food.name}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text className="text-[11px] text-[#80775C]">
              Nenhum alimento rejeitado em todas as exposições.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export const EditableNotesWidget =
  () => (
    <View className="flex-1">
      <View className="flex-row items-center mb-3">
        <Feather
          name="edit-3"
          size={16}
          color="#4D9B43"
        />

        <Text className="text-[12px] font-bold text-[#4D9B43] uppercase ml-2">
          Parecer Clínico e Conduta
        </Text>
      </View>

      <TextInput
        multiline
        numberOfLines={6}
        placeholder="Digite suas observações e o plano terapêutico aqui..."
        placeholderTextColor="#A3987B"
        className="bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] p-4 text-[13px] text-[#554B41] min-h-[140px] outline-none focus:border-[#83BF6E] transition-colors"
        textAlignVertical="top"
      />
    </View>
  );

export const SignatureWidget = ({
  professional,
}) => {
  const nome =
    professional?.nome ||
    professional?.name ||
    'Profissional não identificado';

  return (
    <>
      <Feather
        name="check-circle"
        size={32}
        color="#4D9B43"
        className="mb-3"
      />

      <Text className="text-[14px] font-bold text-[#554B41] text-center">
        {nome}
      </Text>

      <Text className="text-[12px] text-[#80775C] mb-3 text-center">
        Profissional responsável
      </Text>

      <View className="bg-[#FFFCEF] px-3 py-1.5 rounded-[8px] border border-[#A3C78C]">
        <Text className="text-[10px] font-bold text-[#4D9B43]">
          AtipicTouch
        </Text>
      </View>
    </>
  );
};
