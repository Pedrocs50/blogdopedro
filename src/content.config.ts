import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Data no formato AAAA-MM-DD. Aceitar so este formato evita que 10/01/2026 seja lido
// como 1o de outubro (formato americano) em vez de 10 de janeiro.
const dataDoPost = z
  .union([
    z.date(), // o YAML ja converte 2026-10-09 em data
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'use o formato AAAA-MM-DD, ex.: 2026-10-09'),
  ])
  .pipe(z.coerce.date());

// Um unico tipo de conteudo: o post. So `title` e `date` sao obrigatorios.
// Use `npm run novo "Titulo"` e o arquivo ja nasce com tudo preenchido.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: dataDoPost,
    // frase que aparece em links e no RSS (opcional)
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // true = nao vai para o site publicado (so aparece no `npm run dev`)
    draft: z.boolean().default(false),
    // opcional: mostra o quao "pronto" o post esta
    status: z.enum(['rascunho', 'crescimento', 'maduro']).optional(),
  }),
});

export const collections = { posts };
