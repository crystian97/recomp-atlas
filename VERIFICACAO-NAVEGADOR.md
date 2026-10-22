# Conferência dos projetos de navegador — 22/10/2026

Referências iniciais: `REFERENCIAS-NAVEGADOR.md`. Conferência de páginas e documentação, não execução completa dos jogos. HTTP 200 não certifica gameplay, desempenho ou disponibilidade futura.

| Registro | Classificação e evidência | Acesso e limites |
| --- | --- | --- |
| FIFA Street 2 | Recompilação estática; o rodapé de fifastreet2.fun cita `snuri00/ps2-web-recomp`, confirmado também em fifastreet2.org/about. O runtime recompila código e emula componentes do PS2. | Página acessível. Experimental, com falhas gráficas e instabilidade reportadas. Código é do runtime compartilhado. |
| NFS Underground 2 | Recompilação estática; nfsunderground2.site cita o mesmo runtime. Não confundido com `codepdbh/nfsu2-recompiled` para PC. | Página acessível, WebGPU, desempenho variável e online experimental. |
| Budokai Tenkaichi 3 | Port web; dragonballbt3.online cita `stufno102/Tenkaichi3Decomp`. README distingue o port de emulação e documenta versão web experimental. | Página acessível. Código exige disco próprio PS2 EUA. Não fundido com o projeto distinto `z3xox/BT3-Recomp`. |
| Morrowind | Port web da engine recriada OpenMW, `Virtastic/openmw-web`. | Página final morrowind.virtastic.app mostra login e convite para novos usuários. Chrome/Edge 133+ desktop, dados próprios; Firefox, Safari e celular não suportados. Vídeo confirmado pelo oEmbed do YouTube (Virtastic). |
| Half-Life 2 | Port web reportado pela PC Gamer; sem código identificado. | hl2.slqnt.dev retorna 404; sem “Jogar”. Variação de FPS e animações com problemas reportadas. |
| Portal | Port web reportado pela PC Gamer. | yikes.pw/portal retorna página de carregamento e launcher; link de acesso, sem certificação de gameplay completo. |
| GTA Vice City | Port web de reVC, confirmado por dos.zone/revcdos e `Carter54git/revcdos`. | Exige dados próprios após reformulação. FPS desbloqueado pode afetar a física. |
| GTA III | Port web de reGTA3, identificado por dos.zone/regta3dos. | Página acessível; cobertura indica fornecimento dos arquivos próprios. Código específico não identificado com segurança. |
| GTA V | Somente notícia/demonstração, técnica não verificada independentemente. | Sem “Jogar” ou release; notícia relata indisponibilidade após divulgação. |

FIFA 18 não incluído: falta fonte confiável. Links do X não puderam ser confirmados diretamente, por isso não ganharam botões de vídeo. O clipe de GTA V continua acessível pela notícia. SpaceMoney retornou 403; foram usadas as fontes alternativas do arquivo. Nenhum dos nove registros foi classificado como emulação pura sem evidência. A categoria existe separadamente para futuros registros confirmados.

## Persistência e identidade

`dist/browser-projects.js` mantém os nove registros fora do snapshot remoto. A mesclagem roda em toda sincronização e deduplica por ID, repositório dedicado ou URL de acesso normalizada/alias. Código compartilhado e notícia compartilhada não são chaves de identidade. Ports distintos do mesmo jogo continuam separados. IDs dos registros existentes e chave de favoritos permanecem iguais.

Metadados remotos não substituem classificação, links, requisitos e estado editorial. Releases de um repositório não viram prova de disponibilidade web. Somente os registros nativos de `curated.js` são consultados pela rotina de releases do GitHub; as fontes web exigem nova conferência editorial.

## Verificações

- Sintaxe de app.js, curated.js e browser-projects.js.
- Testes existentes de catálogo, filtros, favoritos, mesclagem e recuperação de atualização.
- Novos testes de nove registros web, links HTTPS, tipos, filtros, ausência de FIFA 18, GTA V/HL2 sem “Jogar”, mesclagem repetida e com fonte futura, persistência de favoritos em atualização e offline.
- Inspeção visual em 1440 × 1000 e 390 × 844, com leitura dos requisitos e ausência de overflow horizontal.
- Nenhum teste envolve arquivos comerciais ou autenticação nos jogos.

## Validação adicional de filtros e capas
- Desktop 1440 × 1000 e celular 390 × 844: busca e seleção PS2 retornam 41 projetos; layout sem rolagem horizontal.
- 602 associações de capa verificadas, com 600 arquivos PNG locais válidos.
- `check.cjs`, `check-refresh.cjs`, `check-browser.cjs` e `check-covers.cjs`: aprovados.
- Domínio jogosrecompilados.com.br reservado para migração futura; publicação atual continua no GitHub Pages.
