import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { startStaticServer } from '../scripts/static-server.mjs';
import { getChromiumLaunchOptions } from '../scripts/chromium-runtime.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

test('candidate vision stays usable across target viewports', async () => {
  const server = await startStaticServer();
  const browser = await chromium.launch(await getChromiumLaunchOptions());
  const viewports = [
    { width: 1440, height: 1000 },
    { width: 1280, height: 800 },
    { width: 820, height: 1180 },
    { width: 390, height: 844 }
  ];

  try {
    const page = await browser.newPage({ viewport: viewports[0] });
    const runtimeErrors = [];
    page.on('pageerror', error => runtimeErrors.push(error.message));
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(server.origin, { waitUntil: 'networkidle' });

      assert.equal(await page.title(), 'Cresta AI Deployment | Russell Dudek');
      assert.equal(await page.evaluate(() => document.fonts.check('12px "DM Sans"')), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true, `horizontal overflow at ${viewport.width}px`);
      assert.deepEqual(runtimeErrors, []);
    }
  } finally {
    await browser.close();
    await server.close();
  }
});

test('scenario repair and keyboard navigation expose the phase change', async () => {
  const server = await startStaticServer();
  const browser = await chromium.launch(await getChromiumLaunchOptions());

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(server.origin, { waitUntil: 'networkidle' });

    assert.equal(await page.locator('#activation-boundary').getAttribute('data-status'), 'stalled');
    await page.locator('[data-condition="evidence"]').click();
    assert.equal(await page.locator('#activation-boundary').getAttribute('data-status'), 'realized');
    await assert.doesNotReject(async () => page.getByText(/crosses the boundary/i).waitFor());

    const assist = page.locator('[data-scenario="agent-assist"]');
    await assist.click();
    assert.equal(await page.locator('#activation-boundary').getAttribute('data-weak-condition'), 'adoption');
    await assist.focus();
    await assist.press('ArrowRight');
    assert.equal(await page.locator('[data-scenario="conversation-intelligence"]').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#activation-boundary').getAttribute('data-weak-condition'), 'outcome');
  } finally {
    await browser.close();
    await server.close();
  }
});

test('reduced-motion preference suppresses looping packets', async () => {
  const server = await startStaticServer();
  const browser = await chromium.launch(await getChromiumLaunchOptions());

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    await page.goto(server.origin, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.signal-packet').first().evaluate(node => getComputedStyle(node).animationName), 'none');
  } finally {
    await browser.close();
    await server.close();
  }
});
