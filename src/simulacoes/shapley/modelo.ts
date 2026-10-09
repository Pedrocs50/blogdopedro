// Modelo de brinquedo do ensaio "Como dividir o credito entre variaveis".
// VALORES ILUSTRATIVOS: nao vem de um modelo treinado nem de dados reais.

export type Variavel = {
  id: string;
  nome: string; //   botao do simulador
  sensor: string; // o que a variavel mede
  longo: string; //  rotulo da barra de resultado
};

export const VARIAVEIS: Variavel[] = [
  { id: 'bz', nome: 'Bz sul', sensor: 'campo magnético', longo: 'Bz sul (campo magnético)' },
  { id: 'vel', nome: 'Velocidade', sensor: 'vento solar', longo: 'Velocidade do vento solar' },
  { id: 'den', nome: 'Densidade', sensor: 'plasma', longo: 'Densidade do plasma' },
];

const chave = (ids: string[]) =>
  VARIAVEIS.filter((v) => ids.includes(v.id))
    .map((v) => v.id)
    .join(',');

// Previsao (nT) quando so as variaveis da coalizao sao conhecidas.
// Repare na interacao: Bz e Velocidade juntas valem muito mais que a soma
// de cada uma sozinha.
const PREVISAO: Record<string, number> = {
  '': 10, //                 nenhuma variavel: o valor base
  bz: 50,
  vel: 12.5,
  den: 12.5,
  'bz,vel': 120,
  'bz,den': 60,
  'vel,den': 22.5,
  'bz,vel,den': 130, //      modelo completo
};

export const BASE = PREVISAO[''];
export const COMPLETA = PREVISAO[chave(VARIAVEIS.map((v) => v.id))];

/** Previsao do modelo quando apenas `ids` sao conhecidas. */
export const previsao = (ids: string[]): number => PREVISAO[chave(ids)];

/** Todas as ordens possiveis de entrada das variaveis. */
function permutacoes<T>(xs: T[]): T[][] {
  if (xs.length <= 1) return [xs];
  return xs.flatMap((x, i) =>
    permutacoes([...xs.slice(0, i), ...xs.slice(i + 1)]).map((p) => [x, ...p]),
  );
}

/**
 * Valor de Shapley de cada variavel: a media da contribuicao marginal
 * dela sobre todas as ordens possiveis de entrada.
 */
export function valoresShapley(): Record<string, number> {
  const ordens = permutacoes(VARIAVEIS.map((v) => v.id));
  const soma: Record<string, number> = Object.fromEntries(VARIAVEIS.map((v) => [v.id, 0]));
  for (const ordem of ordens) {
    const antes: string[] = [];
    for (const id of ordem) {
      soma[id] += previsao([...antes, id]) - previsao(antes);
      antes.push(id);
    }
  }
  return Object.fromEntries(Object.entries(soma).map(([id, s]) => [id, s / ordens.length]));
}

const nf = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
/** "37,5" */
export const numero = (n: number) => nf.format(n);
/** "+37,5 nT" */
export const comSinal = (n: number) => `${n >= 0 ? '+' : '−'}${numero(Math.abs(n))} nT`;
