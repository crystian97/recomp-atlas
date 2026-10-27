const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');const ctx=vm.createContext({});vm.runInContext(fs.readFileSync('dist/cover-index.js','utf8'),ctx);const index=vm.runInContext('COVER_INDEX',ctx);for(const p of new Set(Object.values(index))){assert(/^covers\/libretro-[a-f0-9]+\.png$/.test(p));assert.equal(fs.readFileSync('dist/'+p).subarray(0,8).toString('hex'),'89504e470d0a1a0a')}console.log('PASS: '+Object.keys(index).length+' associações e '+new Set(Object.values(index)).size+' capas locais válidas.');

assert(index["ZX Spectrum|manicminer"],"Manic Miner precisa de uma imagem real");
assert(index["PS1|syphonfilter2"],"Capas publicadas como referência de arquivo precisam ser resolvidas");
