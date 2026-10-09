## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Este projeto

blogdopedro: blog pessoal estático (Astro 7 + Markdown/MDX + KaTeX; React só em simuladores opcionais), em português do Brasil.
Sobre qualquer assunto: não amarrar o site a um tema. Prioridade: simplicidade, visual minimalista, escrever fácil.

- Um único tipo de conteúdo: `src/content/posts/*.{md,mdx}` (campos em `src/content.config.ts`; só `title` e `date` obrigatórios).
- Fluxo do dono: `npm run novo "Título"` e `npm run publicar` (scripts em `scripts/`). Mantenha esses dois comandos simples.
- Cores e fontes só em `src/styles/global.css`. Cantos retos, sem sombras, fonte mono nos títulos. Não escreva cor fixa em componente.
- Textos do site em pt-BR com acentos; nomes de arquivos, pastas e slugs sem acento.
- Valores YAML com `:` precisam de aspas.
- Simulador = pasta em `src/simulacoes/` + registro em `src/components/Simulador.astro`; o post usa só `<Simulador id="..." />` (sem import). Valores calculados no código, não escritos à mão.
- Componentes de post (.mdx, sem import): `Simulador`, `Aviso`, `Matematica`, `Exercicio` (numeração automática por CSS), `Cartao`. Atalhos de digitação em `.vscode/blog.code-snippets`; mantenha-os em sincronia com os componentes.
- Imagens ficam em `src/content/posts/img/` e são referenciadas de forma relativa (`img/x.png`); o Astro otimiza.
- README.md é a documentação do dono (como escrever, publicar, resolver erros): atualize junto com qualquer mudança de fluxo e só escreva mensagens de erro que você reproduziu.
- `date` do post só aceita AAAA-MM-DD (de propósito: evita 10/01/2026 virar 1º de outubro).
- Fórmulas: `unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] })` em `astro.config.mjs`.
- No Windows PowerShell 5.1, `Set-Content -Encoding utf8` grava BOM e quebra `package.json` e frontmatter: use a ferramenta Write/Edit, ou grave sem BOM.
- Antes de dizer que algo funciona: `npm run build` e olhar no navegador.
- Repositório: github.com/Pedrocs50/blogdopedro (privado até o dono torná-lo público; Pages grátis exige público). Endereço do site, quando no ar: https://pedrocs50.github.io/blogdopedro/, ou seja, com `base: '/blogdopedro'` em `astro.config.mjs`. Em código use sempre `url('/caminho/')` de `src/lib/site.ts` para links internos; em Markdown o plugin `rehypeBase` prefixa links `/...` sozinho. Dev: http://localhost:4321/blogdopedro/.
- Fórmulas: o dono não quer decorar LaTeX. Ferramenta visual em `src/pages/ferramentas/formulas.astro` (MathLive + KaTeX, noindex, fora do menu; carrega ~1 MB só nessa página), atalhos de matemática em `.vscode/blog.code-snippets` e `npm run novo "Titulo" -- --modelo` (post com todos os recursos). Ao criar um recurso novo de post, atualize o modelo em `scripts/novo.mjs`, os atalhos e a seção 4 do README.
- Se o dev server já estiver rodando na 4321 (o dono costuma deixar aberto), não o derrube; depois de instalar dependência nova ele precisa ser reiniciado.
- Teste de hidratação em aba oculta do navegador de preview: `client:visible` não dispara (IntersectionObserver). Force com um IntersectionObserver falso antes de concluir que algo quebrou.
- Página inicial: posts do mais novo ao mais antigo (desempate por hora na `date`, depois título), agrupados por ano e mês em `<details>` (só o ano mais recente aberto), com busca ao vivo (`src/pages/index.astro` + índice `src/pages/search.json.ts`, sem acento e com o texto do post). Mudou o formato de `date`? Atualize `content.config.ts`, `scripts/novo.mjs` e a tabela do README.
- Publicação: `npm run publicar` faz build, mostra a lista de arquivos, commit e push; o Actions publica. Pages grátis exige repositório público.
