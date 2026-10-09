# blogdopedro

Blog pessoal, simples e estático. Qualquer assunto. Feito com [Astro](https://astro.build): o texto
é Markdown e, quando quiser, dá para colocar fórmulas e simulações interativas dentro do próprio post.

**Resumo do dia a dia (depois de colocar no ar uma vez):**

```bash
npm run novo "Título do meu post"   # cria o arquivo e abre no VS Code
# escreva, salve
npm run dev                         # (opcional) ver como ficou em http://localhost:4321/blogdopedro/
npm run publicar                    # confere, salva e envia: o site atualiza sozinho
```

Site publicado: https://pedrocs50.github.io/blogdopedro/ · Repositório: https://github.com/Pedrocs50/blogdopedro

---

## Sumário

1. [Primeira vez: colocar o site no ar](#1-primeira-vez-colocar-o-site-no-ar)
2. [Escrever um post](#2-escrever-um-post)
3. [Formatar o texto](#3-formatar-o-texto)
4. [Fórmulas, avisos, exercícios e simuladores (.mdx)](#4-fórmulas-avisos-exercícios-e-simuladores-mdx)
5. [Imagens](#5-imagens)
6. [Publicar e atualizar](#6-publicar-e-atualizar)
7. [Criar um simulador novo](#7-criar-um-simulador-novo)
8. [Mudar o visual, o nome e o menu](#8-mudar-o-visual-o-nome-e-o-menu)
9. [Quando algo dá errado](#9-quando-algo-dá-errado)
10. [Mapa das pastas](#10-mapa-das-pastas)
11. [Ideias para depois](#11-ideias-para-depois)

---

## 1. Primeira vez: rodar e colocar o site no ar

Precisa de Node 22.12+ e Git instalados, e de uma conta no GitHub (ative a autenticação em dois
fatores: a sua conta é a chave do site).

**Rodar no computador**

1. Clone (ou abra a pasta, se já estiver aqui) e instale: `npm install`
2. Rode: `npm run dev` e abra **http://localhost:4321/blogdopedro/** (com a barra no final;
   Ctrl+C para parar). O `/blogdopedro/` existe porque o repositório se chama `blogdopedro`: no
   GitHub Pages o site fica em um subcaminho.

**Colocar o site no ar (uma vez só, no site do GitHub)**

O código já está no repositório https://github.com/Pedrocs50/blogdopedro. Faltam dois ajustes no
GitHub, que só você pode fazer (exigem a sua conta):

3. **Repositório público.** O GitHub Pages grátis só publica a partir de repositório **público**
   (em repositório privado exige um plano pago). Em Settings, General, role até **Danger Zone**,
   **Change repository visibility**, **Change to public**. Antes de fazer isso, lembre que tudo
   que está no repositório fica visível para qualquer pessoa, inclusive posts em rascunho.
4. **Ligar o Pages.** Em Settings, **Pages**, em *Build and deployment*, **Source: GitHub
   Actions**.
5. **Disparar a publicação.** Aba **Actions**, clique na execução mais recente (a do último envio)
   e em **Re-run all jobs**. Ela monta o site e publica; leva 1 a 3 minutos. Quando ficar verde,
   o site está em **https://pedrocs50.github.io/blogdopedro/**.

Se a execução ficar vermelha, clique nela e abra o passo que falhou: o erro é o mesmo que você
veria rodando `npm run build` no seu computador. Se a mensagem falar de Pages não habilitado, o
passo 4 ainda não foi feito.

Dali em diante é só o dia a dia: escrever e rodar `npm run publicar` (seção 6). Cada envio
republica o site sozinho.

> **Domínio/endereço:** o endereço e o subcaminho estão em `astro.config.mjs` (`SITE` e `BASE`).
> Se um dia renomear o repositório para `pedrocs50.github.io` ou usar domínio próprio, deixe
> `BASE = '/'`. Links como `[texto](/posts/outro/)` escritos nos posts ganham o `/blogdopedro`
> sozinhos, então não precisam mudar.

> Em repositório público, **tudo é público**, inclusive rascunhos. `draft: true` só tira o post do
> site publicado, mas o arquivo continua visível no GitHub. Coisa privada fica fora do repositório.

---

## 2. Escrever um post

### Criar

```bash
npm run novo "Título do meu post"
```

Cria `src/content/posts/titulo-do-meu-post.md` com o cabeçalho pronto e abre no VS Code. Escreva
embaixo do `---`. O nome do arquivo vira o endereço: `/posts/titulo-do-meu-post/`.

**O post nasce como rascunho** (`draft: true` no cabeçalho): enquanto você escreve, ele aparece só
no seu computador (`npm run dev`, com uma etiqueta "rascunho") e **não vai para o site**, mesmo
que você rode `npm run publicar` por outro motivo. Quando terminar, **apague a linha
`draft: true`** e publique. Só o que não tem essa linha aparece para as pessoas.

Para um post com componentes e simuladores, crie como `.mdx`:

```bash
npm run novo "Título do meu post" -- --mdx
```

**Não quer lembrar a sintaxe de nada?** Crie um post-modelo, que já vem com todos os recursos
montados (fórmula no texto e em bloco, aviso, matemática recolhida, simulador e exercício com
gabarito). Você só troca os textos e **apaga o que não for usar**:

```bash
npm run novo "Título do meu post" -- --modelo
```

Ou crie o arquivo na mão: na pasta `src/content/posts/`, novo arquivo `.md`, digite `post` e
aperte Tab (atalho do VS Code que monta o cabeçalho).

### Qual extensão: `.md` ou `.mdx`?

| | `.md` | `.mdx` |
|---|---|---|
| Texto, listas, links, imagens, código | sim | sim |
| Fórmulas `$...$` | sim | sim |
| Avisos, exercícios, simuladores | não | **sim** |
| Cuidado | nenhum | `{` e `<` soltos no texto precisam de cuidado (veja abaixo) |

**Regra prática:** comece em `.md`. Se um dia quiser colocar um aviso ou simulador, mude a extensão
do arquivo para `.mdx` (é só renomear).

Em `.mdx`, o caractere `{` solto é lido como código. Para escrever chaves no texto, use
`\{` e `\}`, ou coloque entre crases: `` `{x}` ``. Dentro de fórmulas `$...$` use `\{` normalmente
(é a sintaxe do LaTeX).

### O cabeçalho (frontmatter)

```md
---
title: "Título do post"
date: 2026-10-09
description: "Uma frase que aparece em links e no RSS."
tags: [matematica, estudo]
draft: true
---
```

(`draft: true` é o que o `npm run novo` coloca. Apague essa linha para publicar.)

| Campo | Obrigatório | O que faz |
|---|---|---|
| `title` | sim | Título. **Use aspas** se tiver `:` no meio. |
| `date` | sim | `AAAA-MM-DD`, ou com hora `AAAA-MM-DD HH:MM`. A lista do início é ordenada por ela, do mais novo para o mais antigo. A hora só serve para desempatar posts do mesmo dia (o site mostra só a data); o `npm run novo` já preenche com a hora de agora. |
| `description` | não | Frase de apoio, aparece no topo do post, em links e no RSS. |
| `tags` | não | `[a, b]`. Cada tag aparece ao lado do post na lista (e no fim do post) e ganha a página `/tags/a/`. Evite acentos. |
| `draft` | não | `true` = rascunho: o post **não** vai para o site (aparece só no `npm run dev`). Para publicar, apague a linha. |

Se esquecer ou errar algum campo, o build diz qual arquivo e qual campo.

### Como a página inicial organiza os posts

Tudo é automático, a partir da `date` de cada post:

- **Do mais novo para o mais antigo.** Dois posts no mesmo dia: o de hora mais tarde vem
  primeiro (por isso o `npm run novo` grava a hora). Se ainda empatar, vale a ordem alfabética.
- **Agrupado por ano e, dentro dele, por mês**, cada um com a quantidade de posts. Clique no
  ano ou no mês para recolher ou abrir. Por padrão só o ano mais recente começa aberto.
- **Busca ao vivo** no topo: filtra enquanto você digita. Procura no título, na descrição, nas
  tags **e no texto do post**, sem diferenciar maiúsculas nem acentos (`calculo` acha "Cálculo"),
  e várias palavras significam "todas elas". Durante a busca os anos e meses com resultado abrem
  sozinhos e os sem resultado somem; `Esc` limpa e volta ao que estava. A tecla `/` leva o cursor
  para a busca de qualquer lugar da página.

A busca usa um arquivo `search.json` que o site gera sozinho a cada publicação (e só é baixado
quando você clica na busca). Posts com `draft: true` não entram nele no site publicado.

### Conferir antes de publicar

`npm run dev` e abra http://localhost:4321/blogdopedro/. A página atualiza sozinha quando você salva.

---

## 3. Formatar o texto

Markdown comum. No VS Code, `Ctrl+Shift+V` abre a pré-visualização ao lado.
(A extensão "Markdown All in One", recomendada pelo projeto, adiciona `Ctrl+B` para negrito e
`Ctrl+I` para itálico.)

| Quero | Escrevo |
|---|---|
| Título de seção | `## Título` (use `##` e `###`; o `#` é o título do post) |
| **Negrito** | `**negrito**` |
| *Itálico* | `*itálico*` |
| Link | `[texto](https://endereco.com)` |
| Link para outro post | `[texto](/posts/nome-do-arquivo/)` |
| Lista | linhas começando com `- ` |
| Lista numerada | linhas começando com `1. ` |
| Citação | linha começando com `> ` |
| Código no meio da frase | `` `codigo` `` |
| Linha divisória | `---` sozinho numa linha |
| Tabela | `\| a \| b \|` com a linha `\|---\|---\|` embaixo |

Bloco de código (digite `cod` e Tab no VS Code):

````md
```python
print("olá")
```
````

---

## 4. Fórmulas, avisos, exercícios e simuladores (.mdx)

### Fórmulas (funciona em `.md` e `.mdx`)

No meio do texto: `$E = mc^2$`. Em bloco (digite `form` e Tab):

```md
$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$
```

A sintaxe é LaTeX, renderizada pelo KaTeX.

#### Escrever fórmulas sem decorar LaTeX

Existem quatro jeitos, do mais visual ao mais rápido. Use o que preferir em cada momento:

1. **Ferramenta visual (recomendada para começar).** Com `npm run dev` rodando, abra
   **http://localhost:4321/blogdopedro/ferramentas/formulas/**. Monte a fórmula no campo (digitando
   ou pelo teclado matemático que aparece ao clicar no ícone de teclado), veja como o site vai
   mostrá-la e clique em **"Copiar para o meio do texto"** ou **"Copiar em bloco"**. Depois é só
   colar (`Ctrl+V`) no post. A página também aceita o caminho inverso: cole um LaTeX e veja o
   resultado. Embaixo dela há a **cola rápida** com as fórmulas mais comuns (fração, raiz, soma,
   integral, limite, matriz, letras gregas...).
2. **Atalhos no VS Code** (digite e aperte Tab):

   | Atalho | Resultado |
   |---|---|
   | `fm` | `$ ... $` no meio da frase |
   | `form` | bloco `$$ ... $$` |
   | `fracao` | `\frac{a}{b}` |
   | `somatorio` | `\sum_{i=1}^{n} x_i` |
   | `matriz2` | matriz 2×2 |
   | `partes` | função definida por partes |

3. **Pedir para o Claude.** Descreva a fórmula em palavras ("soma de i de 1 até n de x_i ao
   quadrado, dividido por n") e peça o LaTeX. Cole o resultado na ferramenta para conferir.
4. **Escrever na mão**, com a cola rápida da ferramenta aberta ao lado.

Cuidados que valem para os quatro:
- Use sempre `$...$` (sem espaço logo depois do primeiro `$` nem antes do último).
- Chaves `{ }` agrupam: `x^{10}` é x elevado a 10, mas `x^10` é x elevado a 1 seguido de 0.
- Para escrever texto dentro da fórmula, use `\text{...}`.
- Se a fórmula estiver errada, o site mostra o código em vermelho em vez de quebrar.

A ferramenta de fórmulas **vai para o site publicado também** (em `/ferramentas/formulas/`, sem
link no menu e pedindo aos buscadores para não indexar). Ela é útil para você de qualquer
computador, mas se preferir que só exista no seu computador, apague `src/pages/ferramentas/`.

### Componentes (só em `.mdx`, sem precisar importar nada)

No VS Code, digite o atalho e aperte Tab:

| Atalho | Resultado |
|---|---|
| `sim` | `<Simulador id="shapley" />` |
| `aviso` | caixa de aviso |
| `mat` | bloco **"Mostrar a matemática"** recolhido (a matemática só aparece se o leitor pedir) |
| `ex` | exercício numerado com **"Mostrar gabarito"** recolhível |

**Aviso**

```mdx
<Aviso>

Com variáveis muito correlacionadas, o resultado pode enganar.

</Aviso>
```

Troque o rótulo com `<Aviso rotulo="Dica">`. **Deixe uma linha em branco** entre a tag e o texto,
senão o Markdown dentro dela não é interpretado.

**Matemática recolhida**

```mdx
<Matematica>

Aqui entra a fórmula $\phi_i = \dots$ e a explicação.

</Matematica>
```

**Exercício** (a numeração 1., 2., ... é automática dentro de cada post)

```mdx
<Exercicio pergunta="Quanto vale 2 + 2?">

4. Porque somar 2 duas vezes dá 4.

</Exercicio>
```

A pergunta vai entre aspas (sem fórmulas); o gabarito, entre as tags, aceita Markdown e fórmulas.

**Simulador**

```mdx
<Simulador id="shapley" />
```

É só isso: a moldura, o título, o aviso de "valores ilustrativos" e o carregamento sob demanda
(o simulador só carrega quando aparece na tela) já vêm prontos. Simuladores existentes:

| `id` | O que é |
|---|---|
| `shapley` | Escolha variáveis e veja a previsão de um modelo de brinquedo mudar |
| `shapley-resultado` | Barras com o valor de Shapley de cada variável |

O post `src/content/posts/como-dividir-o-credito.mdx` usa tudo isso: copie dele.

---

## 5. Imagens

1. **Na mão (sempre funciona):** coloque o arquivo em `src/content/posts/img/` e escreva
   `![descrição da imagem](img/nome.png)` no texto. Testado com `.md` e `.mdx`.
2. **Atalho no VS Code:** copie uma imagem e dê `Ctrl+V` dentro do texto do post, ou arraste o
   arquivo para o texto. As configurações do projeto mandam o arquivo para
   `src/content/posts/img/` e inserem o link. (Esse atalho depende de recursos do VS Code que eu
   não consegui abrir para testar; se não funcionar, use o passo 1.)

Escreva sempre a descrição entre os colchetes: ela ajuda quem usa leitor de tela. O Astro
otimiza a imagem sozinho (converte para webp e define o tamanho). Funciona em `.md` e `.mdx`.

---

## 6. Publicar e atualizar

Como funciona o caminho do seu computador até o site:

```
você escreve  →  npm run publicar  →  GitHub (repositório)  →  Actions monta o site  →  Pages publica
   (VS Code)      confere + envia        recebe os arquivos      (npm run build)          (~1 a 3 min)
```

Cada envio para a branch `main` republica o site inteiro. O que está no ar é sempre o que está no
repositório: um post novo aparece na lista, e um post editado muda, depois que a execução do
Actions fica verde.

```bash
npm run publicar
```

Faz, nesta ordem:

1. **Confere** se o site monta (`npm run build`). Se houver erro, **nada é enviado** e a mensagem
   aponta o arquivo.
2. **Mostra o que vai enviar** (`A` = novo, `M` = alterado, `D` = apagado) e salva tudo com um
   commit (mensagem padrão: "atualiza o blog"). **Leia essa lista**: se aparecer um rascunho ou
   teste que você não quer no ar, ponha `draft: true` nele (ou apague) e rode de novo.
3. **Envia** para o GitHub. O Actions publica sozinho; em cerca de 1 minuto o site atualiza.

Com mensagem própria: `npm run publicar -- "post sobre Shapley"`.

Para acompanhar: aba **Actions** do repositório (verde = no ar, vermelho = clique para ver o erro).

**Editar um post publicado:** abra o arquivo, mude, `npm run publicar`.
**Tirar um post do ar:** ponha `draft: true` no cabeçalho e `npm run publicar` (o arquivo continua
no GitHub) ou apague o arquivo.

Sem terminal (celular, outro computador): no repositório do GitHub, aperte a tecla `.`. Abre um
editor no navegador; edite os arquivos de `src/content/posts/` e faça o commit. O site atualiza
sozinho.

---

## 7. Criar um simulador novo

Um simulador é um componente React em uma pasta própria. Passos:

1. Crie `src/simulacoes/meu-simulador/MeuSimulador.tsx` (veja `src/simulacoes/shapley/Shapley.tsx`
   como modelo).
2. Abra `src/components/Simulador.astro` e siga o comentário do topo: importe o componente,
   acrescente uma entrada em `INFO` (título, aviso, descrição para leitor de tela) e uma linha
   `{id === 'meu-simulador' && <MeuSimulador client:visible />}`.
3. Use no post: `<Simulador id="meu-simulador" />`.

Regras para manter os simuladores bons:

- Depois de carregado, funciona **sem internet** e **não grava nada** no navegador do leitor.
- Números que aparecem na tela são **calculados no código** (veja `shapley/modelo.ts`), nunca
  escritos à mão: assim não ficam inconsistentes.
- Botões e campos reais, com rótulo e descrição em texto do que a simulação mostra.
- Se os valores não vêm de dados reais, avise ("valores ilustrativos").

---

## 8. Mudar o visual, o nome e o menu

| Quero mudar | Onde |
|---|---|
| Cores, fontes, tema escuro | topo de `src/styles/global.css` (tokens `--fundo`, `--texto`...) |
| Nome do site, frase da página inicial, menu, link do GitHub | `src/lib/site.ts` |
| Texto da página "sobre" | `src/pages/sobre.astro` |
| Aparência de um componente | `src/components/NomeDoComponente.astro` |

**Menu com "simulações":** já dá para ter. Os posts que levam a tag `simulacao` aparecem em
`/tags/simulacao/`. Para pôr no menu, acrescente uma linha em `NAV` no `src/lib/site.ts`:

```ts
{ href: '/tags/simulacao/', rotulo: 'simulações' },
```

(só depois de existir ao menos um post com essa tag, senão a página não existe).

---

## 9. Quando algo dá errado

| Sintoma | Causa provável e solução |
|---|---|
| `npm run publicar` diz que não está ligado ao GitHub | Falta o passo 6 da seção 1 (`git remote add ...`) |
| Build falha com `title: Required` ou `date: Required` | Campo faltando no cabeçalho do post indicado na mensagem |
| Build falha com `date: use o formato AAAA-MM-DD` | Escreva a data como `2026-10-09` ou `2026-10-09 14:30` (ano-mês-dia, hora opcional). Formatos como `10/01/2026` são recusados de propósito, porque dariam 1º de outubro em vez de 10 de janeiro. Dias que não existem (`2026-02-31`) também são recusados |
| Dois posts do mesmo dia na ordem errada | Coloque a hora na `date` do mais novo: `2026-10-09 18:30` |
| A busca não acha uma palavra que está no post | Confirme que o post não está com `draft: true` (no site publicado ele fica fora da busca) e que a palavra está no texto: fórmulas `$...$`, código e links só entram pelo texto visível |
| Erro longo com `YAMLParseError` ou `at Composer...` | Cabeçalho mal formado, quase sempre um `title` com `:` sem aspas. Use `title: "Assim: com aspas"` |
| `Simulador "x" nao existe` | `id` errado ou simulador não registrado (seção 7). A mensagem lista os ids que existem |
| Post `.md` mostra o texto de um `<Aviso>` mas sem a caixa | Componentes só funcionam em `.mdx`: renomeie o arquivo |
| Erro `ReferenceError: ... is not defined` em `.mdx` | Um `{texto}` solto no meio do texto, lido como código. Escreva `\{texto\}` ou use crases |
| Ação no GitHub fica vermelha | Aba Actions, clique na execução: o erro é o mesmo do `npm run build` local |
| Site no ar mostra a versão antiga | Espere 1 a 2 minutos e recarregue com `Ctrl+F5` |
| Post não aparece na lista | Tem `draft: true`, ou a `date` está errada |

Dica geral: **rode `npm run build` antes de publicar** quando mexer em algo além de texto. Ele
acusa quase todo erro em segundos.

---

## 10. Mapa das pastas

```
src/content/posts/       seus textos (.md ou .mdx) e a pasta img/ com as imagens
src/pages/               rotas do site: início, post, tags, sobre, rss
src/pages/ferramentas/   ferramenta de fórmulas (visual), fora do menu
src/components/          peças: Header, Footer, Aviso, Exercicio, Matematica, Simulador...
src/simulacoes/          simuladores interativos, um por pasta
src/styles/global.css    cores e fontes
src/lib/site.ts          nome, menu, link do GitHub
src/content.config.ts    campos aceitos no cabeçalho dos posts
scripts/                 novo.mjs e publicar.mjs (os dois comandos do dia a dia)
.vscode/                 atalhos (sim, aviso, mat, ex...) e configurações de escrita
.github/workflows/       publicação automática no GitHub Pages
```

---

## 11. Ideias para depois

- **Editor visual de verdade** (clicar em botões em vez de digitar). Hoje não existe um bom
  editor "o que você vê é o que você tem" para `.mdx`. Opções: escrever os posts simples em `.md`
  no Obsidian (que mostra o texto formatado enquanto você digita), ou, mais adiante, um CMS no
  navegador como o Decap ou o Keystatic. O custo é configurar login com o GitHub.
- **Busca** (Pagefind roda depois do build, sem servidor).
- **Versão em inglês.**
- **Python no navegador** (Pyodide) para simuladores que precisem de NumPy/SciPy.
