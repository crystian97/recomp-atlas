// Resumos editoriais em português, conferidos nos READMEs oficiais em 27/10/2026.
const PROJECT_GUIDES = {
 'oaleex/shaolinmonksrecomp': {
  source:'https://github.com/OAleex/OpenShao#install', checked:'2026-10-27',
  requirements:['Uma cópia própria de Shaolin Monks para Xbox, versão USA ou Europa.','Windows 10 1903+ ou Linux com glibc 2.38+. CPU x64 com SSE4.2 e POPCNT.','GPU com Direct3D 12 ou Vulkan 1.2, conforme os requisitos oficiais.'],
  steps:[['Baixe o OpenShao','O projeto agora se chama OpenShao. Baixe a versão para seu sistema na página oficial de releases e extraia o pacote.'],['Selecione sua cópia do jogo','Abra o OpenShao e indique a ISO, XISO, ZIP, pasta extraída ou o arquivo default.xbe da sua cópia compatível.'],['Inicie a partida','Selecione Play. Mantenha a imagem ou a pasta do jogo no local escolhido: o programa lê os arquivos diretamente dali.'],['Ajuste os controles','Use Konfigure Recompilation para ajustar gráficos, controles e áudio. O launcher também oferece mods e atualizações.']],
  links:[['Releases do OpenShao','https://github.com/OAleex/OpenShao/releases/latest']],
  note:'Mortal Kombat II e a demonstração de The Suffering não funcionam. A primeira exibição de uma cena pode pausar brevemente para compilar shaders.'
 },
 'diasurgical/devilutionx': {
  source:'https://github.com/diasurgical/DevilutionX#how-to-install',checked:'2026-10-27',
  requirements:['Os arquivos da sua cópia de Diablo. A expansão Hellfire exige arquivos adicionais.','Escolha o pacote correspondente ao seu sistema na release oficial.'],
  steps:[['Baixe e extraia','Baixe a release do DevilutionX para seu sistema e extraia o conteúdo em uma pasta.'],['Adicione os dados do Diablo','Copie DIABDAT.MPQ do CD ou da instalação do Diablo para a pasta do DevilutionX.'],['Configure Hellfire, se tiver','Para a expansão, copie também hellfire.mpq, hfmonk.mpq, hfmusic.mpq e hfvoice.mpq.'],['Consulte a instalação do seu sistema','Abra as instruções detalhadas antes de executar: a forma de iniciar e os diretórios podem variar entre plataformas.']],
  links:[['Instalação detalhada','https://github.com/diasurgical/DevilutionX/blob/HEAD/docs/installing.md']],
  note:'O README também oferece uma alternativa shareware com spawn.mpq, limitada ao conteúdo da demonstração.'
 },
 'harbourmasters/shipwright': {
  source:'https://github.com/HarbourMasters/Shipwright#quick-start',checked:'2026-10-27',
  requirements:['Uma ROM própria de Ocarina of Time compatível com o projeto.','Confira a compatibilidade antes de iniciar a extração dos dados.'],
  steps:[['Verifique sua ROM','Use o verificador de compatibilidade indicado pelo projeto para conferir sua cópia do jogo.'],['Baixe o Ship of Harkinian','Escolha o pacote para seu sistema na página de releases. No Windows, extraia o ZIP.'],['Abra o programa','No Windows, execute soh.exe; no Linux, soh.appimage; no macOS, soh.app. Indique a cópia compatível do jogo quando solicitado.'],['Aguarde e configure','Aguarde o processamento dos arquivos. Depois, ajuste controles e opções gráficas no menu do jogo.']],
  links:[['Verificador de compatibilidade','https://ship.equipment/']],
  note:'No Linux, o AppImage pode precisar de permissão de execução. Os arquivos do jogo não acompanham o projeto.'
 },
 'zelda64recomp/zelda64recomp': {
  source:'https://github.com/Zelda64Recomp/Zelda64Recomp#plug-and-play',checked:'2026-10-27',
  requirements:["Uma cópia própria da versão norte-americana de Majora’s Mask.",'GPU e CPU compatíveis com os requisitos do README. No PC x64, há exigência de SSE4.1.'],
  steps:[['Confira os requisitos','Leia System Requirements no README e confira se seu computador atende aos requisitos gráficos e de CPU.'],['Baixe a release','Escolha o pacote do Zelda 64: Recompiled para seu sistema e extraia os arquivos.'],['Indique o jogo','Abra o programa e forneça sua cópia norte-americana do jogo no menu principal. Os dados são carregados automaticamente.'],['Personalize a experiência','Configure controles, câmera, resolução e taxa de quadros nos menus do projeto.']],
  note:'O README informa que os arquivos originais do jogo são necessários e não estão incluídos no download.'
 },
 'hedge-dev/unleashedrecomp': {
  source:'https://github.com/hedge-dev/UnleashedRecomp#how-to-install',checked:'2026-10-27',
  requirements:['Arquivos não modificados da sua cópia USA ou Europa de Sonic Unleashed para Xbox 360, com Title Update. A versão japonesa não é aceita.','CPU com AVX, pelo menos 8 GB de RAM e GPU compatível com Direct3D 12 ou Vulkan 1.2. Confira os requisitos completos.'],
  steps:[['Prepare seus arquivos','Siga os guias oficiais de extração da sua cópia do Xbox 360, listados no README.'],['Baixe e extraia','Baixe a release de Unleashed Recompiled para Windows ou Linux e extraia o pacote.'],['Abra o instalador','Execute o programa e siga o assistente. Use Add Files para contêineres/imagens extraídos do Xbox 360, ou Add Folder para os arquivos já extraídos.'],['Conclua a configuração','Forneça os dados solicitados e conclua o assistente. Depois, ajuste gráficos, áudio e controles no menu do jogo.']],
  note:'Add Folder não procura conteúdo compatível dentro de subpastas. DLCs são opcionais; arquivos modificados impedem a instalação.'
 },
 'openrct2/openrct2': {
  source:'https://github.com/OpenRCT2/OpenRCT2#2-downloading-the-game-pre-built',checked:'2026-10-27',
  requirements:['Os arquivos originais de RollerCoaster Tycoon 2 de uma cópia sua.','Escolha o instalador, pacote portátil ou launcher para o seu sistema.'],
  steps:[['Prepare o RollerCoaster Tycoon 2','Tenha os arquivos da sua instalação original do RCT2 disponíveis no computador.'],['Escolha o download','A página oficial oferece instaladores, pacotes portáteis e launcher. Para Linux, o README também recomenda o Flatpak.'],['Siga a configuração','Instale ou extraia o pacote escolhido e siga as instruções oficiais para localizar os dados originais do jogo.'],['Mantenha atualizado','O launcher pode atualizar o OpenRCT2 automaticamente. Consulte as notas da versão antes de trocar entre builds estáveis e de desenvolvimento.']],
  links:[['Downloads oficiais','https://openrct2.io/download']],
  note:'Os dados de RollerCoaster Tycoon 1 e suas expansões são opcionais e permitem carregar os cenários originais, conforme o guia do projeto.'
 },
 'openmw/openmw': {
  source:'https://github.com/OpenMW/openmw#the-data-path',checked:'2026-10-27',
  requirements:['Uma cópia própria de Morrowind e seus arquivos de dados.','O README lista Windows 10+, macOS 14.8+ e Linux; plataformas de 32 bits não são suportadas.'],
  steps:[['Tenha o Morrowind instalado','Deixe os arquivos da sua cópia do jogo disponíveis. O OpenMW é a engine e precisa desses dados.'],['Instale o OpenMW','Use o guia oficial de instalação para escolher o pacote e o procedimento do seu sistema.'],['Abra o launcher','O launcher tenta localizar automaticamente os arquivos quando Morrowind e OpenMW estão instalados corretamente. Confira o caminho dos dados.'],['Confira conteúdo e mods','Verifique os arquivos de conteúdo antes de iniciar. Consulte a compatibilidade dos seus mods com OpenMW.']],
  links:[['Guia de instalação','https://openmw.readthedocs.io/en/latest/manuals/installation/index.html']],
  note:'Mods criados para a engine original podem exigir ajustes ou não funcionar no OpenMW.'
 },
 'openra/openra': {
  source:'https://github.com/OpenRA/OpenRA#play',checked:'2026-10-27',
  requirements:['Consulte o site e a documentação oficial para escolher a distribuição do seu sistema.'],
  steps:[['Conheça os jogos disponíveis','O README apresenta as recriações de Red Alert, Tiberian Dawn e Dune 2000 distribuídas pelo OpenRA.'],['Acesse o site oficial','Escolha o download correspondente ao seu sistema e siga as instruções disponibilizadas pelo projeto.'],['Siga o guia para jogar','Use o guia Playing the Game, indicado no README, para conhecer os controles e as partidas.'],['Tire dúvidas na documentação','Consulte o FAQ oficial se precisar resolver problemas de instalação ou execução.']],
  links:[['Site oficial','https://www.openra.net'],['Guia para jogar','https://github.com/OpenRA/OpenRA/wiki/Playing-the-game'],['Perguntas frequentes','https://github.com/OpenRA/OpenRA/wiki/FAQ']]
 }
};
