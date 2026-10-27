const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx=vm.createContext({URL,document:{},localStorage:{getItem:()=>null}});
vm.runInContext(fs.readFileSync('dist/readme-images.js','utf8'),ctx);
const index=vm.runInContext('README_IMAGES',ctx);
const manifest=JSON.parse(fs.readFileSync('README-IMAGE-SOURCES.json','utf8'));
for(const [repo,path] of Object.entries(index)){
 assert.match(path,/^covers\/readme-[a-f0-9]+\.(png|jpg|webp)$/);
 const bytes=fs.readFileSync('dist/'+path);
 assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');
 assert.equal(manifest.sources[repo].local,path);
 assert.match(manifest.sources[repo].image_url,/^https:\/\//);
 assert.match(manifest.sources[repo].readme_url,/^https:\/\/raw.githubusercontent.com\//);
}
vm.runInContext(fs.readFileSync('dist/app.js','utf8').split("$('#search').addEventListener")[0],ctx);
const repo=Object.keys(index)[0];ctx.game={repo:repo.toUpperCase(),title:'Example',platform:'PC',screenshot:'screenshots/example.jpg',thumb_src:'https://example.com/thumb.png'};
assert.equal(vm.runInContext('picture(game)',ctx),index[repo]);
ctx.future={generated_at:'2026-12-01',games:[{...ctx.game,id:'example',url:'https://github.com/'+repo,type:'source-port'}]};
assert.equal(vm.runInContext('picture(normalized(future)[0])',ctx),index[repo],'Image association survives catalog refresh');
let handler;const img={src:index[repo],classList:{remove(){}},getAttribute(){return this.src},addEventListener(event,fn){handler=fn}};ctx.img=img;
vm.runInContext('bindImageFallback(img,game)',ctx);
handler();assert.match(img.src,/screenshots\/example.jpg$/);
handler();assert.equal(img.src,ctx.game.thumb_src);
handler();assert.match(img.src,/^data:image\/svg\+xml/);
console.log('PASS: '+Object.keys(index).length+' imagens locais de README; fontes, atualização e alternativas em caso de falha.');
