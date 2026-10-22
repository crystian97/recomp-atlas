// Curadoria editorial: páginas e documentação conferidas em 22/10/2026.
// Link de acesso não certifica gameplay completo. Não guardar arquivos comerciais.
const BROWSER_PROJECTS = [
  {
    id: 'browser-fifa-street-2', title: 'FIFA Street 2 (Web)', platform: 'PS2',
    type: 'static-recomp', publisher: 'Slayoner · PS2 Web Recomp',
    url: 'https://fifastreet2.fun/pt.html', aliases: ['https://fifastreet2.fun/'],
    status: 'Experimental',
    description: 'Recompilação estática para WebAssembly com runtime de PS2. A página cita PS2 Web Recomp; não é um port do FIFA Street de 2012.',
    limitations: 'Pode apresentar instabilidade e falhas gráficas. Página de acesso verificada; partidas completas e desempenho no celular não testados pelo Re:Play.',
    cover: 'covers/fifa-street-2.png',
    links: {play: 'https://fifastreet2.fun/pt.html', code: 'https://github.com/snuri00/ps2-web-recomp', news: 'https://www.passadefase.com/fifa-street-2-e-nfs-underground-2-ganham-versoes-para-navegador/'},
    code_note: 'Código do runtime compartilhado, sem os dados do jogo.'
  },
  {
    id: 'browser-nfs-underground-2', title: 'Need for Speed Underground 2 (Web)', platform: 'PS2',
    type: 'static-recomp', publisher: 'Slayoner · PS2 Web Recomp',
    url: 'https://www.nfsunderground2.site/', aliases: ['https://nfsunderground2.site/'],
    status: 'Experimental',
    description: 'Versão de PS2 no navegador, com recompilação estática e runtime PS2 Web Recomp citado pelo projeto. Usa WebGPU.',
    limitations: 'Carregamento inicial demorado e desempenho variável. Online experimental: a sala para quando as partidas perdem a sincronização. Gameplay não testado pelo Re:Play.',
    cover: 'covers/nfs-underground-2.png',
    links: {play: 'https://www.nfsunderground2.site/', code: 'https://github.com/snuri00/ps2-web-recomp', news: 'https://www.newsdigitales.com/nota/347645/como-jugar-need-for-speed-underground-2-gratis-y-en-tu-navegador/'},
    code_note: 'Código do runtime compartilhado, sem os dados do jogo.'
  },
  {
    id: 'stufno102-tenkaichi3decomp', title: 'Dragon Ball Z: Budokai Tenkaichi 3 (Web)', platform: 'PS2',
    repo: 'stufno102/Tenkaichi3Decomp', type: 'browser-port', publisher: 'Slayoner · stufno102 e colaboradores',
    url: 'https://github.com/stufno102/Tenkaichi3Decomp', aliases: ['https://dragonballbt3.online/'],
    status: 'Experimental',
    description: 'Port web baseado em decompilação, com WebGL 2, teclado, controle e comandos táteis. O código citado pelo site distingue o port de um emulador.',
    limitations: 'Online experimental. Compilar o projeto requer sua própria imagem do disco de PS2 dos EUA. Página verificada; gameplay e compatibilidade móvel não testados pelo Re:Play.',
    cover: 'covers/tenkaichi-3.png',
    links: {play: 'https://dragonballbt3.online/', code: 'https://github.com/stufno102/Tenkaichi3Decomp', news: 'https://www.newsdigitales.com/nota/347645/como-jugar-need-for-speed-underground-2-gratis-y-en-tu-navegador/'}
  },
  {
    id: 'virtastic-openmw-web', title: 'Morrowind (OpenMW Web)', platform: 'PC',
    repo: 'Virtastic/openmw-web', type: 'browser-port', publisher: 'Virtastic · OpenMW',
    url: 'https://github.com/Virtastic/openmw-web', aliases: ['https://virtastic.app/openmw', 'https://morrowind.virtastic.app/'],
    status: 'Requer arquivos próprios',
    description: 'Adaptação da engine recriada OpenMW para WebAssembly. Oferece saves e configurações persistentes; multiplayer experimental.',
    limitations: 'Requer sua cópia de Morrowind e Chrome/Edge 133+ no desktop. Firefox, Safari e celular não são suportados. O serviço hospedado exige login e convite para novos usuários; gameplay não validado pelo Re:Play.',
    screenshot: 'screenshots/openmw-openmw.jpg',
    links: {play: 'https://morrowind.virtastic.app/', code: 'https://github.com/Virtastic/openmw-web', video: 'https://www.youtube.com/watch?v=iqZ20MtdD4I', news: 'https://www.pcgamer.com/games/the-elder-scrolls/you-can-now-play-morrowind-entirely-in-your-browser-honestly-just-wanted-to-see-if-it-could-be-done/'}
  },
  {
    id: 'browser-half-life-2', title: 'Half-Life 2 (Web)', platform: 'PC', type: 'browser-port',
    publisher: 'Slqnt e 98006 · projeto reportado',
    url: 'https://www.pcgamer.com/games/fps/web-port-wizards-produce-browser-versions-of-half-life-2-and-portal/',
    aliases: ['https://hl2.slqnt.dev/'], status: 'Acesso indisponível',
    description: 'Port para navegador reportado pela PC Gamer. O endereço citado, hl2.slqnt.dev, retornou HTTP 404 nesta verificação.',
    limitations: 'Sem link jogável confirmado atualmente. A reportagem relata variação de desempenho e animações com problemas.',
    links: {news: 'https://www.pcgamer.com/games/fps/web-port-wizards-produce-browser-versions-of-half-life-2-and-portal/'}
  },
  {
    id: 'browser-portal', title: 'Portal (Web)', platform: 'PC', type: 'browser-port',
    publisher: 'yikes.pw · port web', url: 'https://yikes.pw/portal/', status: 'Experimental',
    description: 'Port web de Portal, citado como base para o projeto de Half-Life 2. A página de carregamento está acessível.',
    limitations: 'O carregador acessível não confirma que o jogo completo funcione. Gameplay, desempenho e suporte a celular não validados pelo Re:Play.',
    links: {play: 'https://yikes.pw/portal/', news: 'https://www.pcgamer.com/games/fps/web-port-wizards-produce-browser-versions-of-half-life-2-and-portal/'}
  },
  {
    id: 'carter54git-revcdos', cover: 'covers/gta-vice-city.png', title: 'GTA Vice City (reVC DOS Web)', platform: 'PS2 / PC',
    repo: 'Carter54git/revcdos', type: 'browser-port', publisher: 'DOS.Zone · reVC',
    url: 'https://github.com/Carter54git/revcdos', aliases: ['https://dos.zone/revcdos/'],
    status: 'Requer arquivos próprios',
    description: 'Port de reVC para navegador. O projeto foi reformulado após remoção e agora pede os dados da sua cópia do jogo.',
    limitations: 'Disponibilidade já mudou no passado. FPS desbloqueado pode causar problemas de física; prefira o limite original. Gameplay não testado pelo Re:Play.',
    links: {play: 'https://dos.zone/revcdos/', code: 'https://github.com/Carter54git/revcdos', news: 'https://www.tomshardware.com/video-games/gta-vice-city-and-gta-iii-return-to-web-browsers-after-a-dmca-takedown-open-source-reverse-engineering-brings-the-classics-to-the-web-with-over-100-fps-performance'}
  },
  {
    id: 'browser-gta-iii-dos', cover: 'covers/gta-iii.png', title: 'GTA III (reGTA3 DOS Web)', platform: 'PS2 / PC',
    type: 'browser-port', publisher: 'DOS.Zone · reGTA3', url: 'https://dos.zone/regta3dos/',
    status: 'Requer arquivos próprios',
    description: 'Port de reGTA3 para navegador, conforme a página do projeto. A cobertura descreve o fornecimento dos arquivos do jogo no DOS.Zone.',
    limitations: 'Use os dados da sua própria cópia. Disponibilidade sujeita a mudanças; gameplay, desempenho e suporte móvel não testados pelo Re:Play.',
    links: {play: 'https://dos.zone/regta3dos/', news: 'https://www.tomshardware.com/video-games/gta-vice-city-and-gta-iii-return-to-web-browsers-after-a-dmca-takedown-open-source-reverse-engineering-brings-the-classics-to-the-web-with-over-100-fps-performance'}
  },
  {
    id: 'browser-gta-v-demo', title: 'GTA V (demonstração web)', platform: 'PC', type: 'browser-demo',
    publisher: 'Notícia · autoria técnica não confirmada', status: 'Somente notícia / demonstração',
    url: 'https://www.tomshardware.com/video-games/pc-gaming/gta-v-playable-in-browser-immediately-nuked-unofficial-webassembly-port-built-with-ai-gets-taken-down-within-hours-of-going-live',
    description: 'Notícia com clipe de uma suposta adaptação para WebAssembly. A matéria relata que o site ficou indisponível horas após a divulgação.',
    limitations: 'Sem versão jogável confirmada. Não listado como disponível para jogar; a técnica não foi verificada independentemente.',
    links: {news: 'https://www.tomshardware.com/video-games/pc-gaming/gta-v-playable-in-browser-immediately-nuked-unofficial-webassembly-port-built-with-ai-gets-taken-down-within-hours-of-going-live'}
  }
].map((g, i) => ({...g, browser: true, verified_at: '2026-10-22T13:08:54Z', top_pick: 10 + i}));
