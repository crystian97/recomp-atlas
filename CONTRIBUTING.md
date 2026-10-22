# Contribuir com o Re:Play

1. Confirme o repositório oficial e se existe trabalho para rodar nativamente no PC. Uma decompilação isolada não comprova a existência de um port.
2. Inclua projetos ausentes em `dist/curated.js`, com `id` estável e caminho exato `organização/repositório`.
3. Informe plataforma original, tipo, release, links e data real da verificação em UTC. Uma release não garante jogo completo.
4. Registre a fonte de novas capas em `CREDITS.md`. Não inclua ROMs, ISOs, executáveis comerciais, chaves ou arquivos dos jogos.
5. Execute `npm run check` e confira busca, filtros, capa e links com `npm run dev`.
6. Descreva a mudança e a fonte no pull request.

Os dados complementares são mesclados por repositório. Preserve os IDs para manter os favoritos dos visitantes.

## Projetos web

Use `dist/browser-projects.js` para projetos de navegador: ID estável, URL principal, aliases de acesso, links tipados, data de conferência, requisitos e status. `repo` só identifica um repositório dedicado; código de runtime compartilhado vai em `links.code`. Não invente GitHub, release ou link Jogar. Ports da mesma obra mas de equipes ou plataformas diferentes não são duplicatas.

Diferencie recompilação estática, port web, emulação e demonstração. Confirme a tecnologia em fonte primária; com evidência apenas jornalística, identifique como reportado. Registre falhas de acesso e não ofereça demonstrações como jogáveis. Execute também `node check-browser.cjs`.
