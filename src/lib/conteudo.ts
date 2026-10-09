import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/**
 * Posts publicados, do mais novo para o mais antigo. Drafts so aparecem no `npm run dev`.
 * Empate (mesma data e hora): ordem alfabetica do titulo, para a ordem ser sempre a mesma.
 */
export async function getPosts(): Promise<Post[]> {
  const todos = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return todos.sort(
    (a, b) =>
      b.data.date.getTime() - a.data.date.getTime() ||
      a.data.title.localeCompare(b.data.title, 'pt-BR'),
  );
}

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

export type GrupoMes = { mes: number; nome: string; posts: Post[] };
export type GrupoAno = { ano: number; total: number; meses: GrupoMes[] };

/**
 * Agrupa posts (ja ordenados do mais novo para o mais antigo) por ano e mes.
 * E automatico: basta o post ter `date` no cabecalho.
 */
export function agruparPorAnoMes(posts: Post[]): GrupoAno[] {
  const anos: GrupoAno[] = [];
  for (const p of posts) {
    const ano = p.data.date.getUTCFullYear();
    const mes = p.data.date.getUTCMonth();
    let a = anos.find((x) => x.ano === ano);
    if (!a) anos.push((a = { ano, total: 0, meses: [] }));
    let m = a.meses.find((x) => x.mes === mes);
    if (!m) a.meses.push((m = { mes, nome: MESES[mes], posts: [] }));
    m.posts.push(p);
    a.total++;
  }
  return anos;
}

/** Minusculas e sem acento, para a busca achar "calculo" em "Cálculo". */
export const normalizar = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Texto simples de um post (sem marcacao), usado so pelo indice de busca. */
export function textoParaBusca(markdown: string): string {
  return markdown
    .replace(/^import .*$/gm, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]*\$/g, ' ')
    .replace(/[#>*_`~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 20000);
}

const fmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });

/** "09/10/2026" */
export const formatarData = (d: Date) => fmt.format(d);

/** "2026-10-09" */
export const dataISO = (d: Date) => d.toISOString().slice(0, 10);

/** Tempo de leitura em minutos (200 palavras por minuto). */
export function minutosDeLeitura(post: Post): number {
  const palavras = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

/** Slug de URL para uma tag ("clima-espacial"). */
export const slugTag = (tag: string) =>
  tag
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/** Conta quantos posts usam cada tag. */
export function contarTags(posts: Post[]) {
  const mapa = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) mapa.set(t, (mapa.get(t) ?? 0) + 1);
  return [...mapa.entries()]
    .map(([tag, n]) => ({ tag, n }))
    .sort((a, b) => b.n - a.n || a.tag.localeCompare(b.tag, 'pt-BR'));
}
