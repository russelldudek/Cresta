import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { startStaticServer } from './static-server.mjs';
import { getChromiumLaunchOptions } from './chromium-runtime.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const documents = [
  ['resume.html', 'russell-dudek-cresta-resume.pdf'],
  ['cover-letter.html', 'russell-dudek-cresta-cover-letter.pdf'],
  ['interview-brief.html', 'russell-dudek-cresta-interview-brief.pdf'],
  ['90-day-plan.html', 'russell-dudek-cresta-90-day-plan.pdf'],
  ['activation-review.html', 'russell-dudek-cresta-activation-review.pdf']
];

await mkdir(resolve(projectRoot, 'docs'), { recursive: true });
const server = await startStaticServer(projectRoot);
const browser = await chromium.launch(await getChromiumLaunchOptions());

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const [source, output] of documents) {
    await page.goto(`${server.origin}/${source}`, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: resolve(projectRoot, 'docs', output),
      format: 'Letter',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
    process.stdout.write(`Generated docs/${output}\n`);
  }
} finally {
  await browser.close();
  await server.close();
}
