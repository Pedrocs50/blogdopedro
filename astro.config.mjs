// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// O repositorio se chama "blogdopedro" (e nao "pedrocs50.github.io"), entao o
// site fica em um subcaminho: https://pedrocs50.github.io/blogdopedro/
// Se um dia usar dominio proprio ou renomear o repo para pedrocs50.github.io,
// apague a linha `base` e deixe BASE = '/'.
const SITE = 'https://pedrocs50.github.io';
const BASE = '/blogdopedro';

/**
 * Em Markdown, links internos escritos como [texto](/posts/outro/) ganham o
 * prefixo BASE automaticamente. Assim voce escreve o link sem pensar nisso.
 */
function rehypeBase() {
  const prefixo = BASE.replace(/\/$/, '');
  /** @param {any} no */
  const visita = (no) => {
    const href = no.type === 'element' && no.tagName === 'a' ? no.properties?.href : undefined;
    if (
      typeof href === 'string' &&
      href.startsWith('/') &&
      !href.startsWith('//') &&
      !href.startsWith(prefixo + '/')
    ) {
      no.properties.href = prefixo + href;
    }
    no.children?.forEach(visita);
  };
  return visita;
}

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [react(), mdx()],
  markdown: {
    // O MDX herda este processador, entao as formulas $...$ funcionam
    // tanto em .md quanto em .mdx.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeBase],
    }),
  },
});
