// Uso:  npm run novo "Titulo do post"             -> cria um .md simples
//       npm run novo "Titulo do post" -- --mdx     -> cria um .mdx (para componentes e simuladores)
//       npm run novo "Titulo do post" -- --modelo  -> cria um .mdx ja com TODOS os recursos
//                                                     montados (formula, aviso, matematica
//                                                     recolhida, simulador, exercicio): e so
//                                                     preencher e apagar o que nao quiser
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const modelo = args.includes('--modelo');
const mdx = args.includes('--mdx') || modelo;
const titulo = args.filter((a) => !a.startsWith('--')).join(' ').trim();

if (!titulo) {
  console.error('Faltou o titulo.  Exemplo:  npm run novo "Meu primeiro post"');
  process.exit(1);
}

const slug = titulo
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

// data de hoje no fuso do computador (AAAA-MM-DD)
const hoje = new Date().toLocaleDateString('sv-SE');

const pasta = path.join('src', 'content', 'posts');
const arquivo = path.join(pasta, `${slug}.${mdx ? 'mdx' : 'md'}`);

if (fs.existsSync(arquivo)) {
  console.error(`Ja existe: ${arquivo}`);
  process.exit(1);
}

const cabecalho = `---
title: ${JSON.stringify(titulo)}
date: ${hoje}
description: ""
tags: []
status: rascunho
---

`;

// Cada bloco abaixo e um recurso do site. Apague os que nao for usar.
const corpoModelo = `Escreva aqui a introdução do post.

## Uma seção

Texto normal, com **negrito**, *itálico* e [um link](https://exemplo.com).
Fórmula no meio da frase: $x^2 + y^2 = r^2$.

Fórmula em bloco (monte em http://localhost:4321/blogdopedro/ferramentas/formulas/):

$$
\\frac{a}{b}
$$

<Aviso>

Um aviso para chamar a atenção do leitor.

</Aviso>

<Matematica>

A matemática detalhada fica aqui, recolhida: só aparece se o leitor clicar.

$$
\\sum_{i=1}^{n} x_i
$$

</Matematica>

<Simulador id="shapley" />

## Exercícios

<Exercicio pergunta="Escreva a pergunta aqui.">

Escreva o gabarito aqui. Ele fica escondido até o leitor clicar.

</Exercicio>
`;

fs.mkdirSync(pasta, { recursive: true });
fs.writeFileSync(arquivo, cabecalho + (modelo ? corpoModelo : 'Escreva aqui.\n'));

console.log(`Criado: ${arquivo}`);
console.log('Dica: status pode ser rascunho, crescimento ou maduro. Apague a linha se nao quiser mostrar.');

// tenta abrir no VS Code (se o comando "code" existir)
spawnSync(`code "${arquivo}"`, { shell: true, stdio: 'ignore' });
