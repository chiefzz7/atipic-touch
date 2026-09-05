export function normalizeFoodColor(color) {
  if (!color) return 'Desconhecida';

  const normalized = color
    .trim()
    .toLowerCase();

  const colors = {
    branco: 'Branco',
    branca: 'Branco',
    vermelho: 'Vermelho',
    vermelha: 'Vermelho',
    amarelo: 'Amarelo',
    amarela: 'Amarelo',
    verde: 'Verde',
    azul: 'Azul',
    roxo: 'Roxo',
    roxa: 'Roxo',
    rosa: 'Rosa',
    marrom: 'Marrom',
    preto: 'Preto',
    preta: 'Preto',
    laranja: 'Laranja',
  };

  return colors[normalized] || color.trim();
}
