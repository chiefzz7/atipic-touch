export const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return '—';

  const nascimento = new Date(
    `${dataNascimento}T00:00:00`
  );

  const hoje = new Date();

  let anos =
    hoje.getFullYear() -
    nascimento.getFullYear();

  let meses =
    hoje.getMonth() -
    nascimento.getMonth();

  if (hoje.getDate() < nascimento.getDate()) {
    meses -= 1;
  }

  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }

  return `${anos} ${
    anos === 1 ? 'Ano' : 'Anos'
  } e ${meses} ${
    meses === 1 ? 'mês' : 'meses'
  }`;
};

export const calcularResumo = (logs = []) => {
  const total = logs.length;

  const aceitos = logs.filter(
    (log) => log.reacao === 1
  ).length;

  const rejeitados = logs.filter(
    (log) => log.reacao === 2
  ).length;

  const neutros = logs.filter(
    (log) => log.reacao === 3
  ).length;

  const taxaAceitacao =
    total > 0
      ? ((aceitos / total) * 100).toFixed(1)
      : '0.0';

  return {
    total,
    aceitos,
    rejeitados,
    neutros,
    taxaAceitacao,
  };
};

export const calcularMetricas = (logs = []) => {
  const total = logs.length;

  const aceitos = logs.filter(
    (log) => log.reacao === 1
  ).length;

  const feedbacksTextura = logs.flatMap(
    (log) =>
      (log.feedbacks || []).filter(
        (feedback) =>
          feedback.atributo?.toUpperCase() ===
          'TEXTURA'
      )
  );

  const texturaNaoGostou =
    feedbacksTextura.filter(
      (feedback) => feedback.gostou === false
    ).length;

  const taxaAceitacao =
    total > 0
      ? ((aceitos / total) * 100).toFixed(1)
      : '0.0';

  const taxaRejeicaoTextura =
    feedbacksTextura.length > 0
      ? (
          (texturaNaoGostou /
            feedbacksTextura.length) *
          100
        ).toFixed(1)
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
      label: 'Rejeição de Textura',
      value: `${taxaRejeicaoTextura}%`,
    },
  ];
};

export const calcularMatrizSensorial = (
  logs = []
) => {
  const stats = {};

  logs.forEach((log) => {
    const textura =
      log.alimento?.textura?.trim();

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
      taxa:
        data.exposure > 0
          ? `${(
              (data.accepted /
                data.exposure) *
              100
            ).toFixed(1)}%`
          : '0.0%',
    }))
    .sort((a, b) => b.exp - a.exp);
};

export const calcularFoodStats = (logs = []) => {
  const stats = {};

  logs.forEach((log) => {
    const food = log.alimento;

    if (!food?.id) return;

    if (!stats[food.id]) {
      stats[food.id] = {
        name: food.nome,
        category: food.categoria,
        total: 0,
        accepted: 0,
        rejected: 0,
      };
    }

    stats[food.id].total += 1;

    if (log.reacao === 1) {
      stats[food.id].accepted += 1;
    }

    if (log.reacao === 2) {
      stats[food.id].rejected += 1;
    }
  });

  return Object.values(stats);
};

export const calcularMaisAceitos = (
  foodStats = []
) => {
  return foodStats
    .filter((food) => food.accepted > 0)
    .map((food) => ({
      name: food.name,
      value: `${(
        (food.accepted / food.total) *
        100
      ).toFixed(1)}%`,
      category: food.category,
    }))
    .sort(
      (a, b) =>
        parseFloat(b.value) -
        parseFloat(a.value)
    )
    .slice(0, 3);
};

export const calcularMenosAceitos = (
  foodStats = []
) => {
  return foodStats
    .filter((food) => food.rejected > 0)
    .map((food) => ({
      name: food.name,
      value: `${(
        (food.rejected / food.total) *
        100
      ).toFixed(1)}%`,
      category: food.category,
    }))
    .sort(
      (a, b) =>
        parseFloat(b.value) -
        parseFloat(a.value)
    )
    .slice(0, 3);
};

export const calcularPeriodo = (logs = []) => {
  if (!logs.length) {
    return 'Sem registros';
  }

  const datas = logs
    .map((log) => new Date(log.timestamp))
    .filter(
      (date) => !Number.isNaN(date.getTime())
    )
    .sort((a, b) => a - b);

  if (!datas.length) {
    return 'Período indisponível';
  }

  const formatarMes = (date) =>
    date.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });

  const inicio = formatarMes(datas[0]);
  const fim = formatarMes(
    datas[datas.length - 1]
  );

  if (inicio === fim) {
    return (
      inicio.charAt(0).toUpperCase() +
      inicio.slice(1)
    );
  }

  return `${inicio} — ${fim}`;
};

const formatarOrigem = (origem) => {
  if (!origem) {
    return 'Origem não informada';
  }

  const normalized =
    origem.trim().toUpperCase();

  const labels = {
    MANUAL: 'Registro manual',
    IOT: 'Registro IoT',
    SENSOR: 'Registro por sensor',
  };

  return labels[normalized] || origem;
};

const formatarAtributo = (atributo) => {
  if (!atributo) {
    return 'Atributo não informado';
  }

  const normalized =
    atributo.trim().toUpperCase();

  const labels = {
    TEXTURA: 'Textura',
    SABOR: 'Sabor',
    CHEIRO: 'Cheiro',
    TEMPERATURA: 'Temperatura',
    COR: 'Cor',
  };

  return labels[normalized] || atributo;
};

export const calcularFatoresComportamentais = (
  logs = []
) => {
  const resultado = [];

  if (!logs.length) {
    return resultado;
  }

  const origemStats = {};

  logs.forEach((log) => {
    const origem =
      log.origem?.trim() ||
      'Não informada';

    if (!origemStats[origem]) {
      origemStats[origem] = {
        total: 0,
        rejected: 0,
      };
    }

    origemStats[origem].total += 1;

    if (log.reacao === 2) {
      origemStats[origem].rejected += 1;
    }
  });

  const origemComMaiorRejeicao =
    Object.entries(origemStats)
      .map(([origem, data]) => ({
        origem,
        taxa:
          data.total > 0
            ? (data.rejected /
                data.total) *
              100
            : 0,
      }))
      .sort(
        (a, b) => b.taxa - a.taxa
      )[0];

  if (
    origemComMaiorRejeicao &&
    origemComMaiorRejeicao.taxa > 0
  ) {
    resultado.push({
      color: 'red',
      text: `Maior taxa de rejeição na origem ${formatarOrigem(
        origemComMaiorRejeicao.origem
      )}: ${origemComMaiorRejeicao.taxa.toFixed(
        1
      )}%.`,
    });
  }

  const horarioStats = {};

  logs.forEach((log) => {
    if (log.reacao !== 2) return;

    const date = new Date(log.timestamp);

    if (Number.isNaN(date.getTime())) return;

    const hora = date.getHours();

    horarioStats[hora] =
      (horarioStats[hora] || 0) + 1;
  });

  const horarioMaiorRejeicao =
    Object.entries(horarioStats).sort(
      (a, b) => b[1] - a[1]
    )[0];

  if (horarioMaiorRejeicao) {
    const hora = Number(
      horarioMaiorRejeicao[0]
    );

    resultado.push({
      color: 'yellow',
      text: `Maior concentração de rejeições registrada por volta das ${String(
        hora
      ).padStart(2, '0')}h.`,
    });
  }

  const feedbackStats = {};

  logs.forEach((log) => {
    (log.feedbacks || []).forEach(
      (feedback) => {
        const atributo =
          feedback.atributo?.trim();

        if (!atributo) return;

        const key =
          atributo.toUpperCase();

        if (!feedbackStats[key]) {
          feedbackStats[key] = {
            total: 0,
            rejected: 0,
          };
        }

        feedbackStats[key].total += 1;

        if (feedback.gostou === false) {
          feedbackStats[key].rejected += 1;
        }
      }
    );
  });

  const maiorRejeicaoSensorial =
    Object.entries(feedbackStats)
      .map(([atributo, data]) => ({
        atributo,
        taxa:
          data.total > 0
            ? (data.rejected /
                data.total) *
              100
            : 0,
      }))
      .sort(
        (a, b) => b.taxa - a.taxa
      )[0];

  if (
    maiorRejeicaoSensorial &&
    maiorRejeicaoSensorial.taxa > 0
  ) {
    resultado.push({
      color: 'green',
      text: `O atributo sensorial com maior taxa de rejeição foi ${formatarAtributo(
        maiorRejeicaoSensorial.atributo
      )}, com ${maiorRejeicaoSensorial.taxa.toFixed(
        1
      )}%.`,
    });
  }

  return resultado.slice(0, 3);
};

export const calcularRepertorio = (
  logs = []
) => {
  const foods = {};

  logs.forEach((log) => {
    const food = log.alimento;

    if (!food?.id || !food?.nome) return;

    if (!foods[food.id]) {
      foods[food.id] = {
        name: food.nome,
        category: food.categoria,
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

  const repertoire =
    Object.values(foods);

  return {
    repertoire,
    conforto: repertoire.filter(
      (food) =>
        food.total > 0 &&
        food.accepted === food.total
    ),
    rejeitados: repertoire.filter(
      (food) =>
        food.total > 0 &&
        food.rejected === food.total
    ),
  };
};
