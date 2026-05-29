const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

const BASE = 'http://localhost:3001';

async function waitForServer(url, timeout = 60000) {
  const start = Date.now();
  const http = require('http');
  while (Date.now() - start < timeout) {
    try {
      await new Promise((res, rej) => {
        const req = http.get(url, (r) => { r.resume(); res(); });
        req.on('error', rej);
        req.setTimeout(3000, () => { req.destroy(); rej('timeout'); });
      });
      return true;
    } catch { await new Promise(r => setTimeout(r, 1000)); }
  }
  throw new Error('Server did not start');
}

async function run() {
  const server = spawn('node.exe', [
    path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next'),
    'dev', '-p', '3001'
  ], {
    cwd: path.join(__dirname, '..'),
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }
  });

  server.stderr.on('data', d => process.stderr.write(d));
  await waitForServer(BASE);
  console.log('Server ready\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Track all 404s
  const failures = new Map();
  page.on('response', response => {
    if (response.status() === 404) {
      const url = response.url();
      failures.set(url, (failures.get(url) || 0) + 1);
    }
  });

  const pages = ['/', '/discover', '/categories', '/saved', '/profile', '/settings',
    '/daily-wisdom', '/continue-listening', '/playlist', '/search', '/onboarding',
    '/discourse/1', '/discourse/2', '/discourse/3'];

  for (const p of pages) {
    try {
      await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 15000 });
    } catch {}
    await page.waitForTimeout(1000);
  }

  await browser.close();
  server.kill();

  console.log('\n=== 404 RESOURCES ===');
  for (const [url, count] of failures) {
    console.log(`  [${count}x] ${url}`);
  }
}

run().catch(console.error);
