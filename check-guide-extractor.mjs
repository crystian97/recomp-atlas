import assert from 'node:assert/strict';
import fs from 'node:fs';
import {extractBuildGuide} from './scripts/guide-extractor.mjs';
const meta={repo:'owner/game',checked:'2026-10-27'};
const readme='# Building\n## Windows\n```powershell\ncmake --build windows-build\n```\n## Linux\n```sh\ncmake --build linux-build\n```';
const guide=extractBuildGuide(readme,meta);
assert.deepEqual(guide.variants.map(v=>v.label),['Windows','Linux']);
assert(!JSON.stringify(guide.variants[0]).includes('linux-build'));
assert(!JSON.stringify(guide.variants[1]).includes('windows-build'));
assert(guide.variants.every(v=>v.steps[0][2].includes('git clone https://github.com/owner/game.git')));
assert.equal(extractBuildGuide('# Build\n```sh\nrm -rf /\nmake\n```',meta),null);
assert.equal(extractBuildGuide('# Tests\n```sh\nmake test\n```',meta),null);
assert.equal(extractBuildGuide('# Build\n```cpp\nmake(a, b);\n```',meta),null);
assert.equal(extractBuildGuide('# Build\nNo instructions yet.',meta),null);
const data=JSON.parse(fs.readFileSync('dist/build-guides.json','utf8'));
for(const [repo,g]of Object.entries(data.projects)){assert.equal(g.source,'https://github.com/'+repo+'#readme');assert(g.variants.length);for(const variant of g.variants){assert(variant.steps.length);for(const step of variant.steps)assert(step[2]?.trim())}}
console.log('PASS: extração de comandos, opções de sistema isoladas, fontes e ausência de tutoriais inventados.');
