// Uso:  npm run publicar                      -> mensagem padrao
//       npm run publicar -- "novo post sobre X"
// Valida o site (build), faz o commit de tudo e envia para o GitHub.
// O GitHub Actions publica sozinho depois do push.
import { spawnSync } from 'node:child_process';

const mensagem = process.argv.slice(2).join(' ').trim() || 'atualiza o blog';

// git e um executavel de verdade: nao precisa de shell
const git = (...args) => spawnSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
const gitVisivel = (...args) => spawnSync('git', args, { stdio: 'inherit' });

if (!git('remote').stdout.trim()) {
  console.error(
    'Este projeto ainda nao esta ligado ao GitHub. Veja "Publicar" no README (passos 1 a 4).',
  );
  process.exit(1);
}

console.log('1/3  conferindo se o site monta...');
// npm no Windows e um .cmd, entao este (e so este) comando precisa de shell
if (spawnSync('npm run build', { stdio: 'inherit', shell: true }).status !== 0) {
  console.error('\nO build falhou, nada foi enviado. Corrija o erro acima e rode de novo.');
  process.exit(1);
}

console.log('\n2/3  salvando...');
gitVisivel('add', '-A');
const mudancas = git('status', '--porcelain').stdout.trimEnd();
if (!mudancas) {
  console.log('Nada novo para publicar.');
  process.exit(0);
}
// Mostra o que vai ser enviado (A = novo, M = alterado, D = apagado), para voce
// notar se algum rascunho ou teste esta indo junto.
console.log('Vai enviar:');
for (const linha of mudancas.split('\n')) console.log('  ' + linha);
console.log('(para um post nao ir ao ar, ponha "draft: true" nele ou apague o arquivo)\n');
if (gitVisivel('commit', '-m', mensagem).status !== 0) process.exit(1);

console.log('\n3/3  enviando...');
const branch = git('branch', '--show-current').stdout.trim() || 'main';
if (gitVisivel('push', '-u', 'origin', branch).status !== 0) process.exit(1);

console.log('\nPronto. Em cerca de um minuto o site e atualizado (acompanhe na aba Actions do GitHub).');
