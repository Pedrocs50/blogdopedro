import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/conteudo';
import { SITE_DESCRICAO, SITE_NOME, url } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE_NOME,
    description: SITE_DESCRICAO,
    site: new URL(url('/'), context.site!),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: url(`/posts/${p.id}/`),
    })),
  });
}
