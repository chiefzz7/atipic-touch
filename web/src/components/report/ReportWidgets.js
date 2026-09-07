import React, { useMemo } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { normalizeFoodColor } from '../../utils/food';

export const ReportCard = ({ title, children, flexClass = "flex-1" }) => (
  <View className={`bg-white border border-[#A3C78B] rounded-2xl p-5 shadow-sm ${flexClass}`}>
    {title && <Text className="text-[15px] font-extrabold text-[#528F33] mb-4 uppercase tracking-wide">{title}</Text>}
    {children}
  </View>
);

export const PatientSummaryWidget = ({ child, logs = [] }) => {
  const idade = useMemo(() => {
    if (!child?.dataNascimento) return '—';

    const nascimento = new Date(`${child.dataNascimento}T00:00:00`);
    const hoje = new Date();

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();

    if (hoje.getDate() < nascimento.getDate()) {
      meses -= 1;
    }

    if (meses < 0) {
      anos -= 1;
      meses += 12;
    }

    return `${anos} ${anos === 1 ? 'Ano' : 'Anos'} e ${meses} ${meses === 1 ? 'mês' : 'meses'}`;
  }, [child]);

  const resumo = useMemo(() => {
    const total = logs.length;
    const aceitos = logs.filter((log) => log.reacao === 1).length;
    const rejeitados = logs.filter((log) => log.reacao === 2).length;
    const neutros = logs.filter((log) => log.reacao === 3).length;

    const taxaAceitacao = total > 0
      ? ((aceitos / total) * 100).toFixed(1)
      : '0.0';

    return {
      total,
      aceitos,
      rejeitados,
      neutros,
      taxaAceitacao,
    };
  }, [logs]);

  return (
    <View className="flex-col md:flex-row bg-[#F2F7ED] border border-[#A3C78B] rounded-2xl mb-4 shadow-sm">
      <View className="flex-1 p-5 border-b md:border-b-0 md:border-r border-[#A3C78B] flex-row items-center">
        <View className="w-16 h-16 bg-gray-300 rounded-full items-center justify-center mr-4 border-2 border-white shadow-sm overflow-hidden">
          <Feather name="user" size={24} color="#fff" />
        </View>

        <View>
          <Text className="text-[12px] font-bold text-[#528F33] uppercase tracking-wider mb-1">
            Dados do paciente
          </Text>

          <Text className="text-[18px] font-extrabold text-[#212134]">
            {child?.nome || 'Paciente'}
          </Text>

          <Text className="text-[13px] text-[#4B5563] mt-0.5">
            Idade: {idade}
          </Text>
        </View>
      </View>

      <View className="flex-1 p-5 flex-row items-start">
        <Feather name="activity" size={20} color="#528F33" className="mr-3 mt-1" />

        <View className="flex-1">
          <Text className="text-[12px] font-bold text-[#528F33] uppercase tracking-wider mb-1">
            Evolução Global
          </Text>

          {resumo.total > 0 ? (
            <Text className="text-[13px] text-[#4B5563] leading-relaxed">
              Foram registrados {resumo.total} {resumo.total === 1 ? 'registro' : 'registros'} no período, com {resumo.aceitos} {resumo.aceitos === 1 ? 'aceitação' : 'aceitações'}, {resumo.rejeitados} {resumo.rejeitados === 1 ? 'rejeição' : 'rejeições'} e {resumo.neutros} {resumo.neutros === 1 ? 'registro neutro' : 'registros neutros'}. A taxa geral de aceitação foi de {resumo.taxaAceitacao}%.
            </Text>
          ) : (
            <Text className="text-[13px] text-[#4B5563] leading-relaxed">
              Não existem registros alimentares no período selecionado.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export const QuickMetricsGrid = ({ logs = [] }) => {
  const metrics = useMemo(() => {
    const total = logs.length;
    const aceitos = logs.filter((log) => log.reacao === 1).length;

    const feedbacksTextura = logs.flatMap((log) =>
      (log.feedbacks || []).filter(
        (feedback) => feedback.atributo?.toUpperCase() === 'TEXTURA'
      )
    );

    const texturaNaoGostou = feedbacksTextura.filter(
      (feedback) => feedback.gostou === false
    ).length;

    const taxaAceitacao = total > 0
      ? ((aceitos / total) * 100).toFixed(1)
      : '0.0';

    const taxaRejeicaoTextura = feedbacksTextura.length > 0
      ? ((texturaNaoGostou / feedbacksTextura.length) * 100).toFixed(1)
      : '0.0';

    return [
      {
        icon: 'calendar',
        label: 'Registros',
        value: total,
      },
      {
        icon: 'clock',
        label: 'Tempo Médio',
        value: '—',
      },
      {
        icon: 'check-circle',
        label: 'Aceitação',
        value: `${taxaAceitacao}%`,
      },
      {
        icon: 'alert-triangle',
        label: 'Rejeição Tátil',
        value: `${taxaRejeicaoTextura}%`,
      },
    ];
  }, [logs]);

  return (
    <View className="flex-row flex-wrap gap-4 h-full content-center">
      {metrics.map((item, i) => (
        <View key={i} className="w-[45%] flex-row items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
          <View className="w-8 h-8 rounded-full bg-[#EAF3E2] items-center justify-center mr-2">
            <Feather name={item.icon} size={14} color="#528F33" />
          </View>

          <View>
            <Text className="text-[10px] text-[#6B7280] uppercase font-bold">
              {item.label}
            </Text>

            <Text className="text-[15px] font-extrabold text-[#212134]">
              {item.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export const SensoryMatrixWidget = ({ logs = [] }) => {
  const rows = useMemo(() => {
    const stats = {};

    logs.forEach((log) => {
      const textura = log.alimento?.textura?.trim();

      if (!textura) return;

      if (!stats[textura]) {
        stats[textura] = {
          exposure: 0,
          accepted: 0,
        };
      }

      stats[textura].exposure += 1;

      if (log.reacao === 1) {
        stats[textura].accepted += 1;
      }
    });

    return Object.entries(stats)
      .map(([textura, data]) => ({
        tex: textura,
        exp: data.exposure,
        aceit: data.accepted,
        taxa: data.exposure > 0
          ? `${((data.accepted / data.exposure) * 100).toFixed(1)}%`
          : '0.0%',
      }))
      .sort((a, b) => b.exp - a.exp);
  }, [logs]);

  return (
    <View className="flex-col w-full">
      <View className="flex-row border-b border-[#A3C78B] pb-2 mb-2 bg-[#F2F7ED] p-2 rounded-t-lg hidden md:flex-row">
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

      {rows.length > 0 ? (
        rows.map((row, i) => (
          <View
            key={i}
            className="flex-col md:flex-row border-b border-gray-100 py-2 px-2 last:border-0 hover:bg-gray-50 transition-colors"
          >
            <Text className="flex-[1.5] text-[12px] font-bold text-[#4B5563]">
              {row.tex}
            </Text>

            <Text className="flex-1 text-[12px] text-[#6B7280] text-center">
              {row.exp}
            </Text>

            <Text className="flex-1 text-[12px] text-[#6B7280] text-center">
              {row.aceit}
            </Text>

            <Text className="flex-1 text-[12px] font-bold text-center text-[#528F33]">
              {row.taxa}
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-[13px] text-[#6B7280] py-4 text-center">
          Não existem dados sensoriais no período.
        </Text>
      )}
    </View>
  );
};

export const HorizontalBarChart = ({ data = [], positive }) => (
  <View className="flex-col gap-3">
    {data.length > 0 ? (
      data.map((item, i) => (
        <View key={i} className="flex-row items-center justify-between">
          <View className="flex-row items-center w-20">
            <Text className="text-[14px] mr-2">{item.emoji}</Text>

            <Text className="text-[12px] font-medium text-[#4B5563]">
              {item.name}
            </Text>
          </View>

          <View className="flex-1 mx-3 h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <View
              className={`h-full ${positive ? 'bg-[#528F33]' : 'bg-[#D9534F]'}`}
              style={{ width: item.value }}
            />
          </View>

          <Text className="text-[11px] font-bold text-[#6B7280] w-8 text-right">
            {item.value}
          </Text>
        </View>
      ))
    ) : (
      <Text className="text-[13px] text-[#6B7280] text-center py-4">
        Não existem dados suficientes no período.
      </Text>
    )}
  </View>
);

export const RepertoireWidget = ({ logs = [] }) => {
  const repertoire = useMemo(() => {
    const foods = {};

    logs.forEach((log) => {
      const food = log.alimento;

      if (!food?.nome) return;

      if (!foods[food.id]) {
        foods[food.id] = {
          name: food.nome,
          accepted: 0,
          rejected: 0,
          total: 0,
        };
      }

      foods[food.id].total += 1;

      if (log.reacao === 1) {
        foods[food.id].accepted += 1;
      }

      if (log.reacao === 2) {
        foods[food.id].rejected += 1;
      }
    });

    return Object.values(foods);
  }, [logs]);

  const conforto = repertoire.filter(
    (food) => food.total > 0 && food.accepted === food.total
  );

  const rejeitados = repertoire.filter(
    (food) => food.rejected === food.total
  );

  return (
    <View className="flex-col lg:flex-row gap-4 mt-2">
      <View className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <Text className="text-[11px] font-bold text-[#4B5563] uppercase mb-3">
          Conforto
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {conforto.length > 0 ? (
            conforto.map((food) => (
              <View
                key={food.name}
                className="bg-[#EAF3E2] px-3 py-1.5 rounded-lg border border-[#A3C78B]"
              >
                <Text className="text-[11px] font-bold text-[#528F33]">
                  {food.name}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-[11px] text-[#6B7280]">
              Nenhum alimento com aceitação total.
            </Text>
          )}
        </View>
      </View>

      <View className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <Text className="text-[11px] font-bold text-[#4B5563] uppercase mb-3">
          Alimentos registrados
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {repertoire.length > 0 ? (
            repertoire.map((food) => (
              <View
                key={food.name}
                className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
              >
                <Text className="text-[11px] font-bold text-blue-600">
                  {food.name}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-[11px] text-[#6B7280]">
              Nenhum alimento registrado.
            </Text>
          )}
        </View>
      </View>

      <View className="flex-1 bg-red-50 p-4 rounded-xl border border-red-100">
        <Text className="text-[11px] font-bold text-[#D9534F] uppercase mb-3">
          Rejeição total
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {rejeitados.length > 0 ? (
            rejeitados.map((food) => (
              <View
                key={food.name}
                className="bg-white px-3 py-1.5 rounded-lg border border-red-200"
              >
                <Text className="text-[11px] font-bold text-[#D9534F]">
                  {food.name}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-[11px] text-[#6B7280]">
              Nenhum alimento rejeitado em todas as exposições.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export const EditableNotesWidget = () => (
  <View className="flex-1">
    <View className="flex-row items-center mb-3">
      <Feather name="edit-3" size={16} color="#528F33" />

      <Text className="text-[12px] font-bold text-[#528F33] uppercase ml-2">
        Parecer Clínico e Conduta
      </Text>
    </View>

    <TextInput
      multiline
      numberOfLines={6}
      placeholder="Digite suas observações e o plano terapêutico aqui..."
      className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-[13px] text-[#212134] min-h-[140px] outline-none focus:border-[#A3C78B] transition-colors"
      textAlignVertical="top"
    />
  </View>
);
