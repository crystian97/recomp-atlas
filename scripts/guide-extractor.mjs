// Read documentation as data. Commands are displayed on the site, never executed.
const action=/^(?:sudo\s+)?(?:cmake\b|make(?:\s|$)|gmake\b|ninja\b|meson\s+(?:setup|compile|install)|cargo\s+(?:build|run)|dotnet\s+(?:build|run|restore)|npm\s+(?:install|ci|run)|pnpm\s+(?:install|build|run)|yarn(?:\s|$)|\.\/configure\b)/m;
const forbidden=/(?:\brm\s+-|\brmdir\b|\bdel\s+\/|\b(?:curl|wget)\b[^\n]*\|\s*(?:sh|bash)|\b(?:token|password|secret|credential)\b|\.ssh\b|\.env\b|--insecure)/i;
function titleFor(code){if(/(?:apt(?:-get)?|brew|dnf|pacman|zypper)\s+(?:install|-S)/.test(code))return ['Instale as dependências','Este bloco instala as dependências informadas pelo autor para esta opção.'];if(/cmake\s+--build|(?:^|\n)(?:make|gmake|ninja|cargo\s+build|dotnet\s+build)\b/.test(code))return ['Compile o projeto','Execute os comandos abaixo na pasta indicada. Eles configuram ou constroem os arquivos do projeto.'];if(/cmake|meson\s+setup|\.\/configure/.test(code))return ['Configure a compilação','Gere os arquivos de build com os parâmetros publicados pelo autor. Mantenha os caminhos e as opções desta sequência.'];if(/git\s+clone/.test(code))return ['Baixe o código-fonte','Clone o repositório e entre na pasta indicada pelos comandos.'];return ['Prepare e execute o projeto','Execute esta sequência publicada pelo autor para instalar as dependências e preparar o projeto.'];}
export function extractBuildGuide(text,{repo,checked}){
 const lines=text.split(/\r?\n/),headings=[],blocks=[];let fence=null,buffer=[],context=[];
 for(let i=0;i<lines.length;i++){
  const line=lines[i],match=/^(#{1,6})\s+(.+)$/.exec(line);
  if(!fence&&match){const level=match[1].length;while(headings.length&&headings.at(-1).level>=level)headings.pop();headings.push({level,title:match[2]});continue}
  if(!fence&&i+1<lines.length&&/^[-=]{3,}\s*$/.test(lines[i+1])&&line.trim()){headings.length=0;headings.push({level:1,title:line.trim()});i++;continue}
  const delimiter=/^\s*(`{3,}|~{3,})([\w+-]*)\s*$/.exec(line);
  if(delimiter){if(!fence){fence={char:delimiter[1][0],lang:delimiter[2].toLowerCase()};buffer=[];context=headings.map(h=>h.title)}else if(delimiter[1][0]===fence.char){const lang=fence.lang;fence=null;let code=buffer.join('\n').replace(/^\$\s+/gm,'').trim();const heading=context.join(' / ');
    if(!['','sh','bash','shell','console','zsh','cmd','bat','powershell','ps1','text','shell-session'].includes(lang)||!code||code.length>3500||code.split('\n').length>50||forbidden.test(code)||/test|benchmark|contribut|example|demo code/i.test(context.at(-1)||''))continue;
    const eligible=/install|compil|build|quick.?start|getting.?started|setup|running|usage|dependencies|requirements|prerequisites/i.test(heading);
    if(!eligible||!action.test(code)&&!/^git\s+clone\b/m.test(code))continue;
    let os=[];for(const h of context){const found=[];if(/\bwsl\b|windows subsystem/i.test(h)){os=['Windows (WSL)'];continue}if(/windows|mingw|msvc/i.test(h))found.push('Windows');if(/linux|ubuntu|debian|arch linux|fedora/i.test(h))found.push('Linux');if(/macos|mac os|os x|darwin/i.test(h))found.push('macOS');if(found.length)os=found}
    if(!os.length){if(/(?:^|\n)(?:sudo )?(?:apt(?:-get)?|dnf|pacman|zypper)\b/.test(code))os=['Linux'];else if(/(?:^|\n)brew\b/.test(code))os=['macOS'];else if(['powershell','ps1','cmd','bat'].includes(lang))os=['Windows']}
    blocks.push({code,os,build:action.test(code)});
   }continue}
  if(fence)buffer.push(line);
 }
 if(!blocks.some(b=>b.build))return null;
 const systems=[...new Set(blocks.flatMap(b=>b.os))];if(!systems.length)systems.push('Terminal');
 const variants=systems.map(label=>{const selected=blocks.filter(b=>!b.os.length||b.os.includes(label));if(!selected.some(b=>b.build))return null;const steps=selected.slice(0,6).map(({code})=>{const [title,explanation]=titleFor(code);return [title,explanation+(/<[^>]+>|YOUR_|path\/to\//i.test(code)?' Substitua os caminhos e valores de exemplo pelos do seu computador antes de executar.':''),code]});
 if(!selected.some(b=>new RegExp('git\\s+clone[^\\n]*'+repo.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(b.code)))steps.unshift(['Obtenha o código-fonte','Clone o repositório oficial. Os próximos comandos devem partir da pasta do projeto, salvo quando a sequência indicar outro diretório.',`git clone https://github.com/${repo}.git\ncd ${repo.split('/')[1]}`]);
 return {label,steps}}).filter(Boolean);
 if(!variants.length)return null;
 const all=blocks.map(b=>b.code).join('\n'),tools=[];for(const [pattern,name]of [[/\bgit\b/,'Git'],[/\bcmake\b/,'CMake'],[/\b(?:g?make)\b/,'Make e compilador compatível'],[/\bcargo\b/,'Rust e Cargo'],[/\bdotnet\b/,'.NET SDK'],[/\b(?:npm|pnpm|yarn)\b/,'Node.js e o gerenciador de pacotes indicado'],[/\bmeson\b/,'Meson'],[/\bninja\b/,'Ninja']])if(pattern.test(all))tools.push(name);
 return {extracted:true,source:'https://github.com/'+repo+'#readme',checked,requirements:tools.length?['Ferramentas usadas nos comandos: Git, '+tools.filter(x=>x!=='Git').join(', ')+'.']:['Git e ambiente de compilação compatível com a opção selecionada.'],variants,note:'A sequência de build usa os comandos publicados pelo autor no README, precedidos da obtenção do código quando necessário. A compilação e a execução não foram testadas pelo site. Use apenas a opção correspondente ao seu sistema.'};
}
