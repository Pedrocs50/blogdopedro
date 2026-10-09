// Uso:  npm run novo "Titulo do post"          -> cria um .md
//       npm run novo "Titulo do post" -- --mdx  -> cria um .mdx (para componentes e simuladores)
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const mdx = args.includes('--mdx');
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

fs.mkdirSync(pasta, { recursive: true });
fs.writeFileSync(
  arquivo,
  `---
title: ${JSON.stringify(titulo)}
date: ${hoje}
description: ""
tags: []
status: rascunho
---

Escreva aqui.
`,
);

console.log(`Criado: ${arquivo}`);
console.log('Dica: status pode ser rascunho, crescimento ou maduro. Apague a linha se nao quiser mostrar.');

// tenta abrir no VS Code (se o comando "code" existir)
spawnSync(`code "${arquivo}"`, { shell: true, stdio: 'ignore' });
