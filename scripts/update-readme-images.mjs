// Cache verified project README images locally; keep provenance outside the app data.
import fs from 'node:fs/promises';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const ctx=vm.createContext({});
for(const name of ['cover-index','curated','browser-projects'])vm.runInContext(await fs.readFile(root+'dist/'+name+'.js','utf8'),ctx);
const data=JSON.parse(await fs.readFile(root+'dist/catalog.json','utf8'));
const known=['harbourmasters/shipwright','harbourmasters/2ship2harkinian','coop-deluxe/sm64coopdx','opengoal/jak-project','harbourmasters/starship'];
const candidates=[...data.games,...vm.runInContext('CURATED_PROJECTS',ctx),...vm.runInContext('BROWSER_PROJECTS',ctx)];
const covers=vm.runInContext('COVER_INDEX',ctx);
const key=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\([^)]*\)|\[[^\]]*\]/g,'').replace(/\bthe\b/g,'').replace(/&/g,'and').replace(/[^a-z0-9]/g,'');
const games=[...new Map(candidates.filter(g=>g.repo&&/^https:\/\/github.com\//i.test(g.url)&&(['static-recomp','source-port','engine-remake'].includes(g.type)||known.includes(g.repo.toLowerCase())||g.browser)).map(g=>[g.repo.toLowerCase(),g])).values()].filter(g=>!g.cover&&!(g.platform||'').split(/\s*\/\s*/).some(p=>covers[p+'|'+key(g.title)]));
let manifest={sources:{},unresolved:[]};try{manifest=JSON.parse(await fs.readFile(root+'README-IMAGE-SOURCES.json','utf8'))}catch{}
const sources=manifest.sources,index={},unresolved=[],rejected=manifest.rejected||[];
const rejectedURLs=new Set(rejected.map(item=>item.image_url));
for(const [repo,item]of Object.entries(sources))index[repo]=item.local;
async function request(url,options={}){try{return await fetch(url,{...options,signal:AbortSignal.timeout(12000),headers:{'User-Agent':'JogosRecompilados-Images'}})}catch{return null}}
function resolveImage(raw,base){try{let u=new URL(raw.replace(/&amp;/g,'&'),base);if(u.hostname==='github.com'&&u.pathname.includes('/blob/')){u.hostname='raw.githubusercontent.com';u.pathname=u.pathname.replace('/blob/','/')}return u.protocol==='https:'?u.href:null}catch{return null}}
function imageInfo(b){if(b.subarray(0,8).toString('hex')==='89504e470d0a1a0a')return {ext:'png',w:b.readUInt32BE(16),h:b.readUInt32BE(20)};if(b[0]===255&&b[1]===216){let i=2;while(i<b.length-9){if(b[i]!==255){i++;continue}const m=b[i+1];if([192,193,194,195,197,198,199,201,202,203,205,206,207].includes(m))return {ext:'jpg',w:b.readUInt16BE(i+7),h:b.readUInt16BE(i+5)};if(m===216||m===217){i+=2;continue}const n=b.readUInt16BE(i+2);if(n<2)break;i+=2+n}}if(b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP')return {ext:'webp',w:300,h:200};return null}
let done=0,found=0;
async function processGame(g){const repo=g.repo.toLowerCase();if(index[repo])return;
 // Already working source screenshots do not need replacing.
 const existing=g.screenshot?'https://raw.githubusercontent.com/SubmitGame/awesome-decomp-games/main/'+g.screenshot:g.thumb_src||g.og_image;
 if(existing){const r=await request(existing,{method:'HEAD'});if(r?.ok)return}
 let readme,base;
 for(const name of ['README.md','readme.md','README.MD','README.rst']){base=`https://raw.githubusercontent.com/${g.repo}/HEAD/${name}`;const r=await request(base);if(r?.ok){readme=await r.text();break}}
 if(!readme){unresolved.push({repo:g.repo,reason:'README não encontrado'});return}
 const refs=[];
 for(const m of readme.matchAll(/!\[([^\]]*)\]\(\s*(<[^>]+>|[^\s)]+)(?:\s+[^)]*)?\)|<img\b[^>]*>/gi)){if(m[2])refs.push({alt:m[1],url:m[2].replace(/^<|>$/g,'')});else{const src=/\bsrc\s*=\s*["']([^"']+)["']/i.exec(m[0]);if(src)refs.push({alt:m[0],url:src[1]})}}
 const unique=[...new Map(refs.map(r=>[r.url,r])).values()].filter(r=>!/(badge|shields\.io|workflow|githubusercontent.com\/.*\/avatars|\.svg(?:\?|$)|discord|buymeacoffee|ko-fi|sponsor|paypal)/i.test(r.url+' '+r.alt)).sort((a,b)=>Number(/screenshot|gameplay|screen|cover/i.test(b.alt+' '+b.url))-Number(/screenshot|gameplay|screen|cover/i.test(a.alt+' '+a.url)));
 for(const ref of unique.slice(0,10)){const url=resolveImage(ref.url,base);if(!url||rejectedURLs.has(url))continue;const r=await request(url);if(!r?.ok)continue;if(Number(r.headers.get('content-length'))>4000000)continue;const bytes=Buffer.from(await r.arrayBuffer());if(bytes.length<8000||bytes.length>4000000)continue;const info=imageInfo(bytes);if(!info||info.w<250||info.h<140||info.w/info.h>4)continue;
 const local='covers/readme-'+crypto.createHash('sha256').update(url).digest('hex').slice(0,16)+'.'+info.ext;await fs.writeFile(root+'dist/'+local,bytes);index[repo]=local;sources[repo]={title:g.title,local,image_url:url,readme_url:base,checked_at:new Date().toISOString()};found++;console.log('Imagem: '+g.title);return}
 unresolved.push({repo:g.repo,reason:'Sem imagem adequada e verificável no README'});
}
let cursor=0;await Promise.all(Array.from({length:8},async()=>{while(cursor<games.length){const g=games[cursor++];await processGame(g);done++;if(done%50===0)console.log(`${done}/${games.length} projetos verificados; ${found} imagens adicionadas`)}}));
await fs.writeFile(root+'dist/readme-images.js','// Verified local README images; provenance: README-IMAGE-SOURCES.json\nconst README_IMAGES = '+JSON.stringify(index,null,2)+';\n');
await fs.writeFile(root+'README-IMAGE-SOURCES.json',JSON.stringify({checked_at:new Date().toISOString(),sources,unresolved,rejected},null,2)+'\n');
console.log(JSON.stringify({checked:games.length,added:found,total:Object.keys(index).length,unresolved:unresolved.length}));
