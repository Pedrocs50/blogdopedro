import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Data no formato AAAA-MM-DD, com hora opcional (AAAA-MM-DD HH:MM). Aceitar so este formato
// evita que 10/01/2026 seja lido como 1o de outubro (formato americano) em vez de 10 de janeiro.
// A hora serve para ordenar dois posts do mesmo dia (o mais novo aparece primeiro).
// Tudo e lido "como escrito" (sem fuso), entao a data mostrada e sempre a que voce digitou.
const MSG_DATA = 'use o formato AAAA-MM-DD (ou AAAA-MM-DD HH:MM), ex.: 2026-10-09 14:30';
const dataEscrita = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2})?$/, MSG_DATA)
  .transform((s) => {
    const [dia, hora = '00:00'] = s.split(/[ T]/);
    return { dia, data: new Date(`${dia}T${hora}:00Z`) };
  })
  // recusa dias que nao existem (2026-02-31, 2026-13-45, 25:00)
  .refine(({ dia, data }) => !isNaN(data.getTime()) && data.toISOString().slice(0, 10) === dia, MSG_DATA)
  .transform(({ data }) => data);

const dataDoPost = z.union([
  z.date(), // o YAML ja converte 2026-10-09 (e 2026-10-09T14:30:00Z) em data
  dataEscrita,
]);

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
  }),
});

export const collections = { posts };
