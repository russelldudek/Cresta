import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('brand package contains official identity and source-derived tokens', async () => {
  const [logo, tokens, intelligence] = await Promise.all([
    readFile('assets/brand/cresta-logo.svg', 'utf8'),
    readFile('assets/brand/brand-tokens.css', 'utf8'),
    readFile('brand-intelligence.md', 'utf8'),
  ]);

  assert.match(logo, /<svg/i);
  for (const value of ['#205AE3', '#A8C5FF', '#25252A', '#3D3D47', '#F4F6F9', '#EBF0F5']) {
    assert.match(tokens.toUpperCase(), new RegExp(value.toUpperCase()));
  }
  assert.match(intelligence, /cdn\.prod\.website-files\.com/);
  assert.match(intelligence, /Independent candidate vision/i);
});

test('candidate vision exposes identity, thesis, interaction, evidence, and artifacts', async () => {
  const html = await readFile('index.html', 'utf8');
  assert.match(html, /assets\/brand\/cresta-logo\.svg/);
  assert.match(html, /Independent candidate vision by Russell Dudek/);
  assert.match(html, /Go-live is a date\. Value is an operating state\./);

  for (const id of ['activation-boundary', 'activation-diagnosis', 'activation-status']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }

  for (const route of [
    'resume.html',
    'cover-letter.html',
    'interview-brief.html',
    '90-day-plan.html',
    'activation-review.html',
  ]) {
    assert.match(html, new RegExp(route.replace('.', '\\.')));
  }
});

test('resume and cover letter preserve contact and reciprocal navigation', async () => {
  const [resume, cover] = await Promise.all([
    readFile('resume.html', 'utf8'),
    readFile('cover-letter.html', 'utf8'),
  ]);

  for (const html of [resume, cover]) {
    for (const contact of [
      '412.287.8640',
      'russelldudek@gmail.com',
      'linkedin.com/in/russelldudek',
      'Pittsburgh, Pennsylvania',
    ]) {
      assert.match(html, new RegExp(contact.replaceAll('.', '\\.')));
    }
    assert.match(html, /class=["'][^"']*download-pdf/);
  }

  assert.equal((resume.match(/class=["'][^"']*resume-page/g) || []).length, 2);
  assert.match(resume, /View Cover Letter/);
  assert.match(cover, /View Resume/);
});

test('supporting artifacts expose required argument and real PDF targets', async () => {
  const contracts = {
    'interview-brief.html': [/Actual mandate/i, /Decision rights/i, /Hard objection/i, /Executive questions/i],
    '90-day-plan.html': [/Days 1.?30/i, /Days 31.?60/i, /Days 61.?90/i, /Hypotheses for discovery/i],
    'activation-review.html': [/Outcome/i, /Readiness/i, /Adoption/i, /Evidence/i, /Ownership/i, /Review notes \/ next check-in/i],
  };

  for (const [path, patterns] of Object.entries(contracts)) {
    const html = await readFile(path, 'utf8');
    for (const pattern of patterns) assert.match(html, pattern);
    assert.match(html, /docs\/[^"']+\.pdf/);
  }
});
