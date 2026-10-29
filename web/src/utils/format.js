export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim());

export function maskPhone(value) {
  const d = String(value || '').replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('') || 'AT';

const csvCell = (v) => {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const REACAO = { 1: 'Aceitou', 2: 'Rejeitou', 3: 'Neutro' };

/** CSV dos registros alimentares. Com `anonimizar`, remove o nome da criança. */
export function logsToCsv(logs, child, { anonimizar = true } = {}) {
  const header = ['Paciente', 'Data/Hora', 'Alimento', 'Categoria', 'Textura', 'Cor', 'Reação', 'Origem'];
  const paciente = anonimizar ? 'Anonimizado' : child?.nome || '';
  const rows = logs.map((log) => [
    paciente,
    log.timestamp ? new Date(log.timestamp).toLocaleString('pt-BR') : '',
    log.alimento?.nome,
    log.alimento?.categoria,
    log.alimento?.textura,
    log.alimento?.cor,
    REACAO[log.reacao] || '',
    log.origem,
  ]);
  return [header, ...rows].map((r) => r.map(csvCell).join(';')).join('\n');
}
