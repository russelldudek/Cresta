import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { extractLocalTargets, PDF_EXPECTATIONS } from './audit-helpers.mjs';

const require = createRequire(import.meta.url);
const { PDFDocument } = require('pdf-lib');
const root = process.cwd();
const failures = [];
const passes = [];
const notes = [];

async function check(name, operation) {
  try {
    await operation();
    passes.push(name);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
  }
}

async function listPublicFiles(directory = root) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['.git', '.worktrees', 'node_modules'].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await listPublicFiles(path));
    else output.push(path);
  }
  return output;
}

const htmlFiles = ['index.html', 'resume.html', 'cover-letter.html', 'interview-brief.html', '90-day-plan.html', 'activation-review.html'];
const requiredFiles = [
  ...htmlFiles,
  ...Object.keys(PDF_EXPECTATIONS),
  'brand-intelligence.md',
  'sources.md',
  'assets/brand/cresta-logo.svg',
  'assets/brand/brand-tokens.css',
  'assets/brand/fonts.css'
];

await check('required campaign manifest', async () => {
  for (const path of requiredFiles) assert.equal((await stat(resolve(root, path))).isFile(), true, `missing ${path}`);
});

await check('internal links and embedded assets resolve', async () => {
  for (const htmlPath of htmlFiles) {
    const html = await readFile(resolve(root, htmlPath), 'utf8');
    for (const target of extractLocalTargets(html)) {
      assert.equal((await stat(resolve(root, target))).isFile(), true, `${htmlPath} → ${target}`);
    }
  }
});

await check('candidate identity and confidentiality qualifiers', async () => {
  for (const htmlPath of htmlFiles) {
    const html = await readFile(resolve(root, htmlPath), 'utf8');
    assert.match(html, /Russell Dudek/i, `${htmlPath} lacks candidate identity`);
    assert.match(html, /Independent candidate/i, `${htmlPath} lacks independence qualifier`);
  }
});

await check('resume and cover contact contract', async () => {
  for (const htmlPath of ['resume.html', 'cover-letter.html']) {
    const html = await readFile(resolve(root, htmlPath), 'utf8');
    for (const contact of ['412.287.8640', 'russelldudek@gmail.com', 'linkedin.com/in/russelldudek', 'Pittsburgh, Pennsylvania']) {
      assert.ok(html.includes(contact), `${htmlPath} lacks ${contact}`);
    }
  }
});

await check('PDF page-count contract', async () => {
  for (const [path, expectedPages] of Object.entries(PDF_EXPECTATIONS)) {
    const bytes = await readFile(resolve(root, path));
    const pdf = await PDFDocument.load(bytes);
    assert.equal(pdf.getPageCount(), expectedPages, `${path} expected ${expectedPages} pages`);
  }
});

await check('PDF selectable-text and contact contract', async () => {
  for (const path of Object.keys(PDF_EXPECTATIONS)) {
    const text = execFileSync('pdftotext', [resolve(root, path), '-'], { encoding: 'utf8' });
    assert.ok(text.trim().length > 200, `${path} lacks selectable text`);
  }
  for (const path of ['docs/russell-dudek-cresta-resume.pdf', 'docs/russell-dudek-cresta-cover-letter.pdf']) {
    const text = execFileSync('pdftotext', [resolve(root, path), '-'], { encoding: 'utf8' });
    assert.match(text, /412\.287\.8640/);
    assert.match(text, /russelldudek@gmail\.com/);
  }
});

await check('source provenance', async () => {
  const sources = await readFile(resolve(root, 'sources.md'), 'utf8');
  assert.match(sources, /job-boards\.greenhouse\.io\/cresta\/jobs\/5078921008/);
  assert.match(sources, /cresta\.com\/press\/cresta-launches-conductor/);
  assert.match(sources, /cresta\.com\/press\/cresta-telus-digital-partnership/);
});

const forbiddenTerm = process.env.FORBIDDEN_PUBLIC_TERM?.trim();
if (forbiddenTerm) {
  await check('candidate-facing confidentiality zero-match scan', async () => {
    const loweredTerm = forbiddenTerm.toLocaleLowerCase();
    const textExtensions = new Set(['.css', '.html', '.js', '.json', '.md', '.mjs', '.svg', '.txt', '.yaml', '.yml']);
    for (const path of await listPublicFiles()) {
      if (path.includes(`${join(root, 'audit')}/`)) continue;
      let searchable = '';
      if (extname(path).toLowerCase() === '.pdf') {
        searchable = execFileSync('pdftotext', [path, '-'], { encoding: 'utf8' });
        searchable += execFileSync('pdfinfo', [path], { encoding: 'utf8' });
      } else if (textExtensions.has(extname(path).toLowerCase())) {
        searchable = await readFile(path, 'utf8');
      }
      assert.equal(searchable.toLocaleLowerCase().includes(loweredTerm), false, `restricted internal label found in ${path.slice(root.length + 1)}`);
    }
  });
} else {
  notes.push('Confidentiality scan was not run because FORBIDDEN_PUBLIC_TERM was not supplied.');
}

for (const pass of passes) process.stdout.write(`PASS  ${pass}\n`);
for (const note of notes) process.stdout.write(`NOTE  ${note}\n`);
for (const failure of failures) process.stderr.write(`FAIL  ${failure}\n`);

process.stdout.write(`\n${passes.length} passed · ${failures.length} failed\n`);
if (failures.length) process.exitCode = 1;
