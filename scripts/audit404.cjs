const { chromium } = require('playwright');
const BASE = 'http://localhost:3001';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const failures = {};
  page.on('response', r => {
    if (r.status() === 404) {
      const u = r.url().replace(BASE, '');
      failures[u] = (failures[u] || 0) + 1;
    }
  });

  const urls = ['/', '/discover', '/categories', '/saved', '/profile', '/settings',
    '/daily-wisdom', '/continue-listening', '/playlist', '/search', '/onboarding',
    '/discourse/1', '/discourse/2'];

  for (const u of urls) {
    try { await page.goto(BASE + u, { waitUntil: 'networkidle', timeout: 10000 }); } catch {}
    await page.waitForTimeout(800);
  }

  if (Object.keys(failures).length === 0) {
    console.log('No 404s found');
  } else {
    for (const [u, c] of Object.entries(failures).sort((a,b) => b[1]-a[1])) {
      console.log(`${c}x\t${u}`);
    }
  }

  await browser.close();
}

run().catch(console.error);
