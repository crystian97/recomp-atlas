# Re:Play

Catálogo em português de recompilações, ports nativos e recriações de engines. Site estático sem dependências de build.

Sirva `dist/` por HTTP. A página carrega a cópia local de `catalog.json`, consulta a base pública awesome-decomp-games e repete a consulta a cada 30 minutos enquanto visível. A data da fonte é mostrada; falhas conservam a cópia disponível. Novos registros compatíveis são incorporados automaticamente. Não há job de descoberta independente nem promessa de cobertura exaustiva.

Filtros por plataformas originais, tipo e release, busca, ordenação, paginação e favoritos locais. Source ports classificados pela fonte como decompilações têm uma lista explícita em `knownPorts`. Uma release não certifica compatibilidade com PC, qualidade ou completude. A fonte deve ser auditada editorialmente para um catálogo estritamente curado.

Dados: https://github.com/SubmitGame/awesome-decomp-games (CC0). Capas: https://github.com/libretro-thumbnails. Imagens de jogos e marcas pertencem a seus titulares. Sem imagem, o card mostra iniciais. Somente quatro capas locais são fornecidas; demais cards usam imagens da fonte quando disponíveis.

Atualização do snapshot: baixar https://raw.githubusercontent.com/SubmitGame/awesome-decomp-games/main/data/games.json para dist/catalog.json. Credenciais não são necessárias no cliente.

Projetos complementares: editar dist/curated.js com fonte oficial, classificação, capa e data da verificação. A mesclagem deduplica por repositório, mantém identidade e curadoria, e usa metadados mais recentes. A API pública do GitHub atualiza somente os projetos complementares, com fallback e cache; não faz descoberta universal.
