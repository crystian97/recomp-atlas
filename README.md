# Re:Play

**O jogo continua. No PC.**

Catálogo em português de recompilações, ports nativos e recriações de engines. HTML, CSS e JavaScript, sem dependências de instalação ou etapa de build.

## Recursos

- Busca por jogo, projeto e desenvolvedor.
- Filtros por plataforma original, tipo, release e favoritos.
- Ordenação por destaque, atividade, estrelas e nome.
- Título e capa com links para o GitHub.
- Favoritos locais no navegador.
- Base comunitária atualizada ao abrir e a cada 30 minutos enquanto a página estiver visível.
- Lista complementar de projetos verificados, com consulta de versões diretamente ao GitHub.

## Rodar localmente

Requer Node.js 22 ou superior (CI usa Node.js 24). Não é necessário executar `npm install`.

```sh
npm run dev
```

Se o seu ambiente disponibilizar Node sem npm, use `node scripts/serve.mjs`.

Abra `http://127.0.0.1:4173`. Para verificar o código e os testes:

```sh
npm run check
```

Sem npm, execute `node --check dist/app.js`, `node --check dist/curated.js` e `node check.cjs`.

## Organização

| Caminho | Função |
| --- | --- |
| `dist/` | Site pronto para hospedagem; estes são os arquivos editáveis |
| `dist/app.js` | Busca, filtros, favoritos e atualização |
| `dist/catalog.json` | Cópia da base para carregamento inicial e fallback |
| `dist/curated.js` | Projetos complementares verificados |
| `dist/covers/` | Capas locais |
| `check.cjs` | Testes do catálogo e mesclagem |
| `scripts/serve.mjs` | Servidor de desenvolvimento |
| `.github/workflows/` | Validação e publicação manual no GitHub Pages |
| `.openai/hosting.json` | Identidade da hospedagem existente no Sites; não é uma credencial |

## Repositório no GitHub

O nome sugerido é `replay`. A conta/organização e a visibilidade devem ser escolhidas pelo responsável. Faça o primeiro envio pela raiz deste projeto, não pela pasta que o contém. Não envie tokens ou arquivos `.env`.

O workflow **Validar projeto** executa em pushes e pull requests. A publicação não ocorre automaticamente ao enviar o código.

## Publicar no GitHub Pages quando estiver pronto

1. No repositório, abra **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Abra **Actions → Publicar site → Run workflow** e escolha a branch padrão.
3. Aguarde a preparação e publicação. A URL aparece no ambiente `github-pages` e no resultado do deploy.

Somente `dist/` é enviado à hospedagem. Os caminhos relativos funcionam em domínio próprio e no endereço de projeto do GitHub Pages. Cada atualização pública exige executar novamente o workflow.

O Pages está disponível para repositórios públicos no GitHub Free; repositórios privados exigem plano compatível. A visibilidade do código e a do site são decisões distintas. Consulte a [documentação do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Qualquer hospedagem estática também pode publicar `dist/`. Nenhum segredo de servidor é necessário. A versão privada existente no Sites permanece independente.

## Atualização e limites

O cliente lê [awesome-decomp-games](https://github.com/SubmitGame/awesome-decomp-games), conserva uma cópia local e mostra a data de geração da fonte. Novos registros elegíveis da fonte entram automaticamente. Para renovar o snapshot versionado, substitua `dist/catalog.json` pelo JSON de `data/games.json` desse repositório e execute as verificações antes de enviar.

Projetos de `dist/curated.js` permanecem após a sincronização e são deduplicados por repositório. Para esses registros, a API pública do GitHub é consultada ao atualizar; falhas ou limites preservam os dados anteriores, com aviso na interface.

Não existe descoberta universal de lançamentos nem atualização agendada enquanto o site está fechado. A base pode ter atrasos, lacunas e erros de classificação. Uma release não certifica compatibilidade, qualidade ou completude. Muitos ports exigem arquivos da própria cópia do jogo. Sem imagem, o card exibe iniciais.

## Contribuições e créditos

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) e [CREDITS.md](CREDITS.md). A licença do código próprio está pendente de escolha pelo responsável.

## Projetos no navegador

`dist/browser-projects.js` contém curadoria persistente de projetos web, separada dos metadados automáticos. Os filtros “Projetos de navegador” e “Com link para jogar” combinam com plataforma, tipo e favoritos. Jogar aponta para uma página de acesso, sem garantir gameplay; Vídeo, Notícia e Código aparecem apenas quando há fonte. Código pode ser do runtime compartilhado, conforme nota no card.

Consulte [VERIFICACAO-NAVEGADOR.md](VERIFICACAO-NAVEGADOR.md) para evidências e pendências. `node check-browser.cjs` cobre persistência, deduplicação, classificações e links. `npm run check` executa todas as verificações, incluindo `node check-refresh.cjs`.

## Capas e filtros visuais — 22/10/2026

O filtro agrupa plataformas por família, com ícones, contagens, seleção múltipla e busca. A seleção é preservada durante a atualização do catálogo.

600 capas locais adicionais foram obtidas de Libretro Thumbnails, com 602 associações por título normalizado e plataforma original. A origem de cada arquivo está em `COVER-SOURCES.json`. O script `scripts/update-covers.mjs` permite reconstruir o índice; falhas de obtenção ficam registradas, sem substituir uma imagem por uma capa de outro jogo. Nem todos os títulos possuem correspondência no acervo. O índice local permanece disponível após a atualização da fonte comunitária.

## Domínio próprio e monetização futura

O domínio `jogosrecompilados.com.br` está reservado para a migração quando estiver liberado. A configuração de DNS, HTTPS e domínio personalizado será feita nessa etapa; até lá, o site público continua no GitHub Pages.

A estrutura é estática e pode receber monetização depois. Antes de ativar publicidade, escolheremos o provedor, criaremos espaços responsivos sem cobrir filtros nem capas e adicionaremos os arquivos de verificação exigidos pelo provedor. Analytics, cookies não essenciais e scripts de terceiros só devem entrar quando forem escolhidos e acompanhados das informações de privacidade e consentimento apropriadas. Nenhuma rede de anúncios ou rastreamento está ativa agora.
