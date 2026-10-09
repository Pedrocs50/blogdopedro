export const SITE_NOME = 'blogdopedro';
export const SITE_DESCRICAO = 'O que eu aprendo, escrevo e testo.';
export const GITHUB_URL = 'https://github.com/Pedrocs50/blogdopedro';

export const NAV = [
  { href: '/tags/', rotulo: 'tags' },
  { href: '/sobre/', rotulo: 'sobre' },
  { href: '/rss.xml', rotulo: 'rss' },
] as const;

/** Monta um link interno respeitando `base` (se um dia o site nao ficar na raiz). */
export const url = (caminho: string) =>
  import.meta.env.BASE_URL.replace(/\/$/, '') + caminho;

// Estagio opcional de um post: mostra ao leitor o quao "pronto" ele esta.
export type Estagio = 'rascunho' | 'crescimento' | 'maduro';

export const ESTAGIO_ROTULO: Record<Estagio, string> = {
  rascunho: 'rascunho',
  crescimento: 'em crescimento',
  maduro: 'maduro',
};
