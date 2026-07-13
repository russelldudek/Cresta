import test from 'node:test';
import assert from 'node:assert/strict';

test('provides a launchable bundled Chromium runtime', async () => {
  const { getChromiumLaunchOptions } = await import('../scripts/chromium-runtime.mjs');
  const options = await getChromiumLaunchOptions();

  assert.equal(options.headless, true);
  assert.match(options.executablePath, /chromium/);
  assert.ok(options.args.includes('--no-sandbox'));
});
