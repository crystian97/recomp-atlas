import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {extractBuildGuide} from './guide-extractor.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),cache=root+'.sites-runtime/project-readmes/',projects={};
for(const name of await fs.readdir(cache)){if(!name.endsWith('.json'))continue;const repo=name.replace(/\.json$/,'').replace('--','/'),doc=JSON.parse(await fs.readFile(cache+name,'utf8'));const guide=extractBuildGuide(doc.text,{repo,checked:doc.checked});if(guide)projects[repo]=guide}
await fs.writeFile(root+'dist/build-guides.json',JSON.stringify({generated_at:new Date().toISOString(),projects},null,2)+'\n');
console.log('Tutoriais com comandos publicados pelo autor: '+Object.keys(projects).length);
