import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Posts publicados, do mais novo para o mais antigo. Drafts so aparecem no `npm run dev`. */
export async function getPosts(): Promise<Post[]> {
  const todos = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return todos.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
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
