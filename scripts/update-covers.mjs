// Rebuild a verified local cover index from Libretro, matching titles exactly after
// punctuation/region normalization. Never guess by substring or nearest title.
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=fileURLToPath(new URL('../',import.meta.url));
const systems={
 'Xbox 360':'Microsoft_-_Xbox_360','Xbox':'Microsoft_-_Xbox','og xbox':'Microsoft_-_Xbox',
 'PS1':'Sony_-_PlayStation','PS2':'Sony_-_PlayStation_2','PS3':'Sony_-_PlayStation_3',
 'PS4':'Sony_-_PlayStation_4','PlayStation 4':'Sony_-_PlayStation_4','PSP':'Sony_-_PlayStation_Portable',
 'N64':'Nintendo_-_Nintendo_64','GameCube':'Nintendo_-_GameCube','Wii':'Nintendo_-_Wii','Wii U':'Nintendo_-_Wii_U',
 'SNES':'Nintendo_-_Super_Nintendo_Entertainment_System','NES':'Nintendo_-_Nintendo_Entertainment_System',
 'GBA':'Nintendo_-_Game_Boy_Advance','Game Boy':'Nintendo_-_Game_Boy','Game Boy Color':'Nintendo_-_Game_Boy_Color',
 'DS':'Nintendo_-_Nintendo_DS','3DS':'Nintendo_-_Nintendo_3DS','Dreamcast':'Sega_-_Dreamcast',
 'Genesis':'Sega_-_Mega_Drive_-_Genesis','DOS':'DOS',
 'ZX Spectrum':'Sinclair_-_ZX_Spectrum','Commodore 64':'Commodore_-_64',
 'Atari 2600':'Atari_-_2600','Atari Jaguar':'Atari_-_Jaguar',
 'Saturn':'Sega_-_Saturn','Game Gear':'Sega_-_Game_Gear','Master System':'Sega_-_Master_System_-_Mark_III',
 'Sega CD':'Sega_-_Mega-CD_-_Sega_CD','32X':'Sega_-_32X','Virtual Boy':'Nintendo_-_Virtual_Boy'
};
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\([^)]*\)|\[[^\]]*\]/g,'').replace(/\.png$/,'').replace(/\bthe\b/g,'').replace(/&/g,'and').replace(/[^a-z0-9]/g,'');
const cache=path.join(root,'.sites-runtime','cover-cache');await fs.mkdir(cache,{recursive:true});
const headers={'User-Agent':'RePlay-Cover-Catalog',...(process.env.GITHUB_TOKEN?{Authorization:'Bearer '+process.env.GITHUB_TOKEN}:{})};
async function json(url){const r=await fetch(url,{headers,signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(`HTTP ${r.status}: ${url}`);return r.json()}
async function files(repo,folder){const p=path.join(cache,repo+(folder==='Named_Boxarts'?'':'-'+folder)+'.json');try{return JSON.parse(await fs.readFile(p,'utf8'))}catch{}
 const tree=await json(`https://api.github.com/repos/libretro-thumbnails/${repo}/git/trees/master`);
 const box=tree.tree.find(x=>x.path===folder);if(!box)return [];
 const content=await json(box.url);if(content.truncated){console.log('Pasta omitida por índice incompleto: '+repo+'/'+folder);return []}
 const names=content.tree.filter(x=>x.type==='blob'&&x.path.endsWith('.png')).map(x=>x.path);
 await fs.writeFile(p,JSON.stringify(names));return names;
}
const data=JSON.parse(await fs.readFile(path.join(root,'dist/catalog.json'),'utf8'));
const ctx=vm.createContext({});vm.runInContext(await fs.readFile(path.join(root,'dist/browser-projects.js'),'utf8'),ctx);
const games=[...data.games,...vm.runInContext('BROWSER_PROJECTS',ctx)];
const index={},sources={},missing=[];
for(const repo of new Set(Object.values(systems))){
 let count=0;
 for(const folder of ['Named_Boxarts','Named_Snaps']){
 const names=await files(repo,folder);const byTitle=new Map();
 // Prefer USA/World covers, then Europe, and avoid beta/prototype variants.
 const rank=n=>/Beta|Proto|Demo|Sample/i.test(n)?10:/\(USA\)|\(USA,|\(World\)/.test(n)?0:/Europe/.test(n)?1:2;
 for(const n of names.sort((a,b)=>rank(a)-rank(b)||a.localeCompare(b))){const key=normalize(n);if(!byTitle.has(key))byTitle.set(key,n)}
 for(const game of games){
  const platform=(game.platform||'').split(/\s*\/\s*/).find(p=>systems[p]===repo);if(!platform)continue;
  const title=normalize(game.title);if(index[platform+'|'+title])continue;const name=byTitle.get(title);if(!name)continue;
  const url=`https://raw.githubusercontent.com/libretro-thumbnails/${repo}/master/${folder}/${encodeURIComponent(name)}`;
  const local='covers/libretro-'+crypto.createHash('sha256').update(url).digest('hex').slice(0,16)+'.png';
  const dest=path.join(root,'dist',local);
  try{await fs.access(dest)}catch{
   const r=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!r.ok){missing.push({url,status:r.status});continue}
   let bytes=Buffer.from(await r.arrayBuffer()),resolved=url;
   // Git symlinks are served by raw.githubusercontent.com as a filename, not PNG bytes.
   for(let hop=0;hop<3&&bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a';hop++){
    const target=bytes.toString('utf8').trim();if(bytes.length>300||!/^[^/\\\r\n]+\.png$/i.test(target))break;
    resolved=new URL(encodeURIComponent(target),resolved).href;
    const linked=await fetch(resolved,{signal:AbortSignal.timeout(20000)});if(!linked.ok)break;bytes=Buffer.from(await linked.arrayBuffer());
   }
   if(bytes.length>2000000||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'){missing.push({url,status:'invalid image'});continue}
   await fs.writeFile(dest,bytes);
  }
  index[platform+'|'+title]=local;sources[local]=url;count++;
 }
 }
 console.log(repo+': '+count+' registros com capa');
}
await fs.writeFile(path.join(root,'dist/cover-index.js'),'// Generated by scripts/update-covers.mjs; see COVER-SOURCES.json.\nconst COVER_INDEX = '+JSON.stringify(index,null,2)+';\n');
await fs.writeFile(path.join(root,'COVER-SOURCES.json'),JSON.stringify({checked_at:new Date().toISOString(),sources,failed:missing},null,2)+'\n');
console.log(JSON.stringify({keys:Object.keys(index).length,images:Object.keys(sources).length,failed:missing.length}));
