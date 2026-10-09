---
title: "Olá, mundo"
date: 2026-10-09
description: "Como escrever neste blog em 30 segundos."
tags: [blog]
status: maduro
---

Este post é também a cola de como escrever aqui. Apague quando não precisar mais.

## Criar um post

No terminal, dentro da pasta do projeto:

```bash
npm run novo "Título do meu post"
```

Isso cria um arquivo em `src/content/posts/` já com o cabeçalho preenchido e abre no VS Code. É só escrever embaixo.

## Escrever

O texto é Markdown comum:

- **negrito**, *itálico*, [link](https://astro.build)
- listas, citações, tabelas e blocos de código
- fórmulas: $E = mc^2$ no meio do texto, ou em bloco:

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$

## Publicar

```bash
npm run publicar
```

Valida o site, faz o commit e envia para o GitHub. Em um minuto ele está no ar.

## Quando quiser algo interativo

Troque a extensão do arquivo para `.mdx` e use os componentes `<Aviso>`, `<Matematica>`, `<Exercicio>` ou um simulador. O post [Como dividir o crédito entre variáveis](/posts/como-dividir-o-credito/) é um exemplo.
