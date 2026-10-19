import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }
  let filename;
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    filename = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
    const relative = path.relative(root, filename);
    if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Invalid path');
  } catch { res.writeHead(400); return res.end('Invalid path'); }
  try {
    const content = await readFile(filename);
    res.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Re:Play: http://127.0.0.1:${server.address().port}`));
