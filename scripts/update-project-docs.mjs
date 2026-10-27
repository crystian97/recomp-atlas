// Index installation links from official READMEs. Never publish or execute README code.
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url)),context=vm.createContext({URL,document:{},localStorage:{getItem:()=>null}});
for(const file of ['curated','browser-projects'])vm.runInContext(await fs.readFile(root+'dist/'+file+'.js','utf8'),context);
vm.runInContext((await fs.readFile(root+'dist/app.js','utf8')).split('// Catalog page bootstrap')[0],context);
context.data=JSON.parse(await fs.readFile(root+'dist/catalog.json','utf8'));
const games=vm.runInContext('normalized(data)',context).filter(g=>g.repo&&!g.browser);
const cache=root+'.sites-runtime/project-readmes/';await fs.mkdir(cache,{recursive:true});
const records={},topics=[[/install|quick.?start|getting.?started|how.to.(run|play)|running|usage|download/i,'Instalação e primeiros passos'],[/requirements|prerequisites|dependencies/i,'Requisitos'],[/build|compil/i,'Compilação'],[/known.issues|troubleshoot|faq/i,'Dúvidas e limitações']];
let cursor=0,done=0;
await Promise.all(Array.from({length:8},async()=>{while(cursor<games.length){const g=games[cursor++],repo=g.repo.toLowerCase(),file=cache+repo.replace('/','--')+'.json';let doc;
try{doc=JSON.parse(await fs.readFile(file,'utf8'))}catch{}
if(!doc){for(const name of ['README.md','readme.md','README.MD','README.rst']){try{const r=await fetch(`https://raw.githubusercontent.com/${g.repo}/HEAD/${name}`,{signal:AbortSignal.timeout(10000)});if(r.ok){doc={text:await r.text(),name,checked:new Date().toISOString()};await fs.writeFile(file,JSON.stringify(doc));break}}catch{}}}
if(doc){const links=[],seen=new Set();const add=(label,url)=>{try{const u=new URL(url);if(u.protocol==='https:'&&!seen.has(label)){seen.add(label);links.push({label,url:u.href})}}catch{}};
 const headings=[...doc.text.matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>m[1].replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/[*`]/g,''));
 for(const heading of headings){const topic=topics.find(([pattern])=>pattern.test(heading));if(topic){const anchor=heading.toLowerCase().replace(/<[^>]+>/g,'').replace(/[^\p{L}\p{N}_\- ]/gu,'').trim().replace(/ /g,'-');add(topic[1],g.url+'#'+anchor)}}
 for(const m of doc.text.matchAll(/(?<!!)\[([^\]\n]+)\]\(([^\s)]+)(?:\s+[^)]*)?\)/g)){const topic=topics.find(([pattern])=>pattern.test(m[1]));if(!topic)continue;let url=m[2];if(url.startsWith('#'))url=g.url+url;else if(!/^https?:/i.test(url))url=url.startsWith('/')?g.url+'/blob/HEAD'+url:new URL(url,g.url+'/blob/HEAD/').href;add(topic[1],url)}
 records[repo]={readme:g.url+'#readme',checked:doc.checked,links:links.slice(0,4)};
}
done++;if(done%200===0)console.log(`${done}/${games.length} READMEs consultados`);
}}));
await fs.writeFile(root+'dist/project-docs.json',JSON.stringify({generated_at:new Date().toISOString(),projects:records},null,2)+'\n');
console.log('Documentação indexada: '+Object.keys(records).length+' projetos.');
