import { getPosts, normalizar, textoParaBusca, dataISO } from '../lib/conteudo';
import { url } from '../lib/site';

// Indice da busca da pagina inicial. Gerado no build, carregado so quando
// a pessoa comeca a digitar. Ja vem sem acento e em minusculas.
export async function GET() {
  const posts = await getPosts();
  const indice = posts.map((p) => ({
    id: p.id,
    href: url(`/posts/${p.id}/`),
    titulo: p.data.title,
    data: dataISO(p.data.date),
    texto: normalizar(
      [p.data.title, p.data.description ?? '', p.data.tags.join(' '), textoParaBusca(p.body ?? '')].join(' '),
    ),
  }));
  return new Response(JSON.stringify(indice), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
