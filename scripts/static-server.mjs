import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.woff2': 'font/woff2'
};

export async function startStaticServer(root = process.cwd(), port = 0) {
  const absoluteRoot = resolve(root);
  const server = createServer((request, response) => {
    const requestUrl = new URL(request.url ?? '/', 'http://localhost');
    const decodedPath = decodeURIComponent(requestUrl.pathname);
    const relativePath = decodedPath === '/' ? 'index.html' : decodedPath.slice(1);
    const filePath = resolve(absoluteRoot, relativePath);

    if (filePath !== absoluteRoot && !filePath.startsWith(`${absoluteRoot}${sep}`)) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    try {
      const stats = statSync(filePath);
      if (!stats.isFile()) throw new Error('Not a file');
      response.writeHead(200, {
        'Content-Type': TYPES[extname(filePath)] ?? 'application/octet-stream',
        'Cache-Control': 'no-store'
      });
      createReadStream(filePath).pipe(response);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
    }
  });

  await new Promise((accept, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', accept);
  });

  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Could not resolve server address');

  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((accept, reject) => server.close(error => error ? reject(error) : accept()))
  };
}
