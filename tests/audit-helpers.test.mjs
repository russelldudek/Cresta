import test from 'node:test';
import assert from 'node:assert/strict';

test('extracts only local file targets from HTML', async () => {
  const { extractLocalTargets } = await import('../scripts/audit-helpers.mjs');
  const html = '<a href="resume.html#top">Résumé</a><img src="assets/logo.svg"><a href="mailto:test@example.com">Mail</a><a href="https://example.com">External</a>';
  assert.deepEqual(extractLocalTargets(html), ['resume.html', 'assets/logo.svg']);
});

test('declares exact recruiter-facing PDF page contracts', async () => {
  const { PDF_EXPECTATIONS } = await import('../scripts/audit-helpers.mjs');
  assert.deepEqual(PDF_EXPECTATIONS, {
    'docs/russell-dudek-cresta-resume.pdf': 2,
    'docs/russell-dudek-cresta-cover-letter.pdf': 1,
    'docs/russell-dudek-cresta-interview-brief.pdf': 4,
    'docs/russell-dudek-cresta-90-day-plan.pdf': 3,
    'docs/russell-dudek-cresta-activation-review.pdf': 1
  });
});
