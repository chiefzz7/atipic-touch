import React from 'react';

import {
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';

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
    dataSet={{ printCard: '1' }}
    className={`bg-white border border-[#DCE7D2] rounded-[16px] p-5 shadow-card ${flexClass}`}
  >
    {title ? (
      <Text className="text-[15px] font-extrabold text-[#528F33] mb-4 uppercase tracking-wide">
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
    <View className="flex-col md:flex-row bg-[#FFFFFF] border border-[#A3C78B] rounded-[10px] mb-4">
      <View className="md:flex-1 p-5 border-b md:border-b-0 md:border-r border-[#A3C78B] flex-row items-center">
        <View className="w-16 h-16 bg-[#A3C78B] rounded-full items-center justify-center mr-4 border-2 border-white overflow-hidden">
          <Feather
            name="user"
            size={24}
            color="#FFFFFF"
          />
        </View>

        <View>
          <Text className="text-[12px] font-bold text-[#528F33] uppercase tracking-wider mb-1">
            Dados do paciente
          </Text>

          <Text className="text-[18px] font-extrabold text-[#212134]">
            {child?.nome ||
              'Paciente'}
          </Text>

          <Text className="text-[13px] text-[#6B6554] mt-0.5">
            Idade: {idade}
          </Text>
        </View>
      </View>

      <View className="md:flex-1 p-5 flex-row items-start">
        <Feather
          name="activity"
          size={20}
          color="#528F33"
          className="mr-3 mt-1"
        />

        <View className="flex-1">
          <Text className="text-[12px] font-bold text-[#528F33] uppercase tracking-wider mb-1">
            Evolução Global
          </Text>

          {resumo.total >
          0 ? (
            <Text className="text-[13px] text-[#212134] leading-relaxed">
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
            <Text className="text-[13px] text-[#212134] leading-relaxed">
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
            className="w-full md:w-[47%] flex-row items-center bg-[#FFFFFF] p-2 rounded-[10px] border border-[#DCE7D2]"
          >
            <View className="w-8 h-8 rounded-full bg-[#EEF5E8] items-center justify-center mr-2">
              <Feather
                name={item.icon}
                size={14}
                color="#528F33"
              />
            </View>

            <View className="flex-1">
              <Text className="text-[10px] text-[#6B6554] uppercase font-bold">
                {item.label}
              </Text>

              <Text className="text-[15px] font-extrabold text-[#212134]">
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
      <View className="flex-row border-b border-[#A3C78B] pb-2 mb-2 bg-[#EEF5E8] p-2 rounded-t-[10px]">
        <Text className="flex-[1.5] text-[11px] font-bold text-[#528F33] uppercase">
          Textura
        </Text>

        <Text className="flex-1 text-[11px] font-bold text-[#528F33] uppercase text-center">
          Exposição
        </Text>

        <Text className="flex-1 text-[11px] font-bold text-[#528F33] uppercase text-center">
          Aceitação
        </Text>

        <Text className="flex-1 text-[11px] font-bold text-[#528F33] uppercase text-center">
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
              className="flex-row border-b border-[#DCE7D2] py-2 px-2 last:border-0 hover:bg-[#FFFFFF] transition-colors"
            >
              <Text className="flex-[1.5] text-[12px] font-bold text-[#212134]">
                {row.tex}
              </Text>

              <Text className="flex-1 text-[12px] text-[#6B6554] text-center">
                {row.exp}
              </Text>

              <Text className="flex-1 text-[12px] text-[#6B6554] text-center">
                {row.aceit}
              </Text>

              <Text className="flex-1 text-[12px] font-bold text-center text-[#528F33]">
                {row.taxa}
              </Text>
            </View>
          )
        )
      ) : (
        <Text className="text-[13px] text-[#6B6554] py-4 text-center">
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
            <View className="flex-row items-center w-28">
              <Text className="text-[14px] mr-2">
                {getFoodEmoji(
                  item.category
                )}
              </Text>

              <Text className="text-[12px] font-medium text-[#212134]">
                {item.name}
              </Text>
            </View>

            <View className="flex-1 mx-3 h-2.5 bg-[#F3F7EE] rounded-full overflow-hidden">
              <View
                className={`h-full ${
                  positive
                    ? 'bg-[#528F33]'
                    : 'bg-[#D9534F]'
                }`}
                style={{
                  width:
                    item.value,
                }}
              />
            </View>

            <Text className="text-[11px] font-bold text-[#6B6554] w-14 text-right">
              {item.value}
            </Text>
          </View>
        )
      )
    ) : (
      <Text className="text-[13px] text-[#6B6554] text-center py-4">
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
      <Text className="text-[13px] text-[#6B6554] text-center py-4">
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
              : 'bg-[#528F33]';

          return (
            <View
              key={index}
              className="flex-row items-start"
            >
              <View
                className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${dotClass}`}
              />

              <Text className="text-[13px] text-[#212134] flex-1">
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
      <View className="flex-1 bg-[#FFFFFF] p-4 rounded-[10px] border border-[#DCE7D2]">
        <Text className="text-[11px] font-bold text-[#212134] uppercase mb-3">
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
                  className="bg-[#EEF5E8] px-3 py-1.5 rounded-[8px] border border-[#A3C78B]"
                >
                  <Text className="text-[11px] font-bold text-[#528F33]">
                    {getFoodEmoji(
                      food.category
                    )}{' '}
                    {food.name}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text className="text-[11px] text-[#6B6554]">
              Nenhum alimento com aceitação total.
            </Text>
          )}
        </View>
      </View>

      <View className="flex-1 bg-[#FFFFFF] p-4 rounded-[10px] border border-[#DCE7D2]">
        <Text className="text-[11px] font-bold text-[#212134] uppercase mb-3">
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
                  className="bg-[#FFFCEF] px-3 py-1.5 rounded-[8px] border border-[#A3C78B]"
                >
                  <Text className="text-[11px] font-bold text-[#212134]">
                    {getFoodEmoji(
                      food.category
                    )}{' '}
                    {food.name}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text className="text-[11px] text-[#6B6554]">
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
            <Text className="text-[11px] text-[#6B6554]">
              Nenhum alimento rejeitado em todas as exposições.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export const EditableNotesWidget = ({ value, onChangeText, status }) => (
  <View className="flex-1">
    <View className="flex-row items-center justify-between mb-3 print-hide">
      <View className="flex-row items-center">
        <Feather name="edit-3" size={16} color="#528F33" />
        <Text className="text-[12px] font-bold text-[#528F33] uppercase ml-2">Parecer clínico e conduta</Text>
      </View>
      <Text className="text-[11px] text-[#9A9279]">
        {status === 'saving' ? 'Salvando...' : status === 'saved' ? 'Salvo automaticamente' : ''}
      </Text>
    </View>

    <Text className="hidden print-only text-[12px] font-bold text-[#528F33] uppercase mb-2">Parecer clínico e conduta</Text>

    <TextInput
      multiline
      numberOfLines={6}
      value={value}
      onChangeText={onChangeText}
      accessibilityLabel="Parecer clínico e conduta"
      placeholder="Digite suas observações e o plano terapêutico. O texto é salvo automaticamente para este paciente e período."
      placeholderTextColor="#9A9279"
      className="bg-[#FFFCEF] border border-[#DCE7D2] rounded-[12px] p-4 text-[13px] leading-relaxed text-[#212134] min-h-[150px] outline-none focus:border-[#528F33] transition-colors"
      textAlignVertical="top"
    />
  </View>
);

export const SignatureWidget = ({ professional, profile, assinatura }) => {
  const nome = profile?.nome || professional?.nome || professional?.name || 'Profissional não identificado';

  return (
    <View className="items-center w-full">
      {assinatura ? (
        <Image source={{ uri: assinatura }} resizeMode="contain" style={{ width: 180, height: 64, marginBottom: 4 }} />
      ) : (
        <Feather name="check-circle" size={30} color="#528F33" className="mb-3" />
      )}

      <View className={`items-center ${assinatura ? 'border-t border-[#212134] pt-1 w-44' : ''}`}>
        <Text className="text-[14px] font-bold text-[#212134] text-center">{nome}</Text>
        {profile?.especialidade ? <Text className="text-[12px] text-[#6B6554] text-center">{profile.especialidade}</Text> : null}
        {profile?.registro ? <Text className="text-[12px] font-bold text-[#528F33] text-center mt-0.5">{profile.registro}</Text> : null}
      </View>

      {!assinatura ? (
        <Text className="text-[11px] text-[#9A9279] mt-2 text-center print-hide">
          Envie sua assinatura em Configurações para exibi-la aqui.
        </Text>
      ) : null}
    </View>
  );
};

/** Cabeçalho exibido apenas na impressão / PDF. */
export const PrintHeader = ({ clinic, profile, periodo, geradoEm }) => (
  <View className="hidden print-only flex-row items-center justify-between border-b-2 border-[#528F33] pb-3 mb-5">
    <View className="flex-row items-center">
      <View className="w-11 h-11 bg-[#528F33] rounded-[12px] items-center justify-center mr-3">
        <Text className="text-white font-extrabold">AT</Text>
      </View>
      <View>
        <Text className="text-[16px] font-extrabold text-[#212134]">{clinic?.nome || 'Relatório clínico'}</Text>
        {clinic?.endereco ? <Text className="text-[11px] text-[#6B6554]">{clinic.endereco}</Text> : null}
        {profile?.telefone || profile?.email ? (
          <Text className="text-[11px] text-[#6B6554]">{[profile.telefone, profile.email].filter(Boolean).join(' · ')}</Text>
        ) : null}
      </View>
    </View>
    <View className="items-end">
      <Text className="text-[13px] font-bold text-[#212134]">Relatório clínico alimentar</Text>
      <Text className="text-[11px] text-[#6B6554]">Período: {periodo}</Text>
      <Text className="text-[11px] text-[#6B6554]">Emitido em {geradoEm}</Text>
    </View>
  </View>
);

/** Rodapé de autenticidade (hash e QR Code), conforme Configurações > Documentos. */
export const AuthFooter = ({ hash, qr, clinic }) => {
  if (!hash && !qr) return null;
  return (
    <View className="flex-row items-center justify-between bg-white border border-[#DCE7D2] rounded-[16px] p-4 mt-1">
      <View className="flex-1 pr-4">
        <View className="flex-row items-center mb-1">
          <Feather name="shield" size={14} color="#528F33" />
          <Text className="ml-2 text-[11px] font-bold text-[#528F33] uppercase">Autenticidade do documento</Text>
        </View>
        {hash ? (
          <Text selectable className="text-[11px] text-[#6B6554]" style={{ fontFamily: 'monospace' }}>
            SHA-256: {hash.match(/.{1,16}/g).join(' ')}
          </Text>
        ) : null}
        {clinic?.nome ? <Text className="text-[11px] text-[#9A9279] mt-1">{clinic.nome}{clinic.endereco ? ` · ${clinic.endereco}` : ''}</Text> : null}
      </View>
      {qr ? <Image source={{ uri: qr }} style={{ width: 84, height: 84 }} accessibilityLabel="QR Code de validação" /> : null}
    </View>
  );
};
