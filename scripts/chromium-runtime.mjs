import { createRequire } from 'node:module';
import { rm, stat } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const chromiumRuntime = require('@sparticuz/chromium').default;

async function removeInvalidPartialExtraction() {
  try {
    const executableStats = await stat('/tmp/chromium');
    if (executableStats.size !== 0) return;
    await Promise.all([
      rm('/tmp/chromium', { force: true }),
      rm('/tmp/fonts', { force: true, recursive: true })
    ]);
  } catch {
    // A missing temporary executable is the normal first-run state.
  }
}

export async function getChromiumLaunchOptions() {
  await removeInvalidPartialExtraction();

  const originalGetuid = process.getuid;
  if (originalGetuid?.() === 0) process.getuid = () => 1000;
  try {
    return {
      executablePath: await chromiumRuntime.executablePath(),
      headless: true,
      args: chromiumRuntime.args
    };
  } finally {
    if (originalGetuid) process.getuid = originalGetuid;
  }
}
