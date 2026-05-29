const { chromium } = require('playwright');
const { execSync, spawn } = require('child_process');
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

const RESULTS = [];
function report(page, element, status, detail = '') {
  RESULTS.push({ page, element, status, detail });
  const icon = status === 'OK' ? '✅' : status === 'SKIP' ? '⏭️' : '❌';
  process.stdout.write(`${icon} ${page} › ${element} › ${status}${detail ? ` › ${detail}` : ''}\n`);
}

async function run() {
  console.log('Starting dev server...');
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
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // Collect all interactive elements from all pages
  const pages = [
    { name: 'Home', url: '/' },
    { name: 'Discover', url: '/discover' },
    { name: 'Categories', url: '/categories' },
    { name: 'Saved', url: '/saved' },
    { name: 'Profile', url: '/profile' },
    { name: 'Settings', url: '/settings' },
    { name: 'Daily Wisdom', url: '/daily-wisdom' },
    { name: 'Continue Listening', url: '/continue-listening' },
    { name: 'Playlist', url: '/playlist' },
    { name: 'Search', url: '/search' },
    { name: 'Onboarding', url: '/onboarding' },
    { name: 'Discourse 1', url: '/discourse/1' },
    { name: 'Discourse 2', url: '/discourse/2' },
    { name: 'Discourse 3', url: '/discourse/3' },
  ];

  function elementId(el) {
    return `${el.tagName}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''}[text="${(el.textContent || '').trim().slice(0, 30)}"]`;
  }

  for (const p of pages) {
    try {
      await page.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 15000 });
    } catch (err) {
      report(p.name, 'PAGE LOAD', '❌', err.message?.slice(0, 100));
      continue;
    }

    // Check for console errors
    const consoleErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

    // Click every interactive element
    const selectors = [
      'a', 'button', 'input', 'select', 'textarea',
      '[role="button"]', '[role="link"]', '[role="tab"]', '[role="menuitem"]',
      '[onclick]', 'label[tabindex]', '[tabindex]:not([tabindex="-1"])'
    ];

    let allElements = [];
    for (const sel of selectors) {
      try {
        const els = await page.$$(sel);
        allElements.push(...els);
      } catch {}
    }

    // Deduplicate
    const seen = new Set();
    const unique = [];
    for (const el of allElements) {
      const box = await el.boundingBox().catch(() => null);
      if (!box) continue;
      const key = `${box.x.toFixed(0)}-${box.y.toFixed(0)}-${box.width.toFixed(0)}-${box.height.toFixed(0)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(el);
    }

    for (const el of unique) {
      const tag = await el.evaluate(e => e.tagName).catch(() => '?');
      const text = await el.evaluate(e => (e.textContent || '').trim().slice(0, 60)).catch(() => '?');
      const id = await el.evaluate(e => e.id).catch(() => '');
      const href = await el.evaluate(e => e.getAttribute('href')).catch(() => '');
      const type = await el.evaluate(e => e.getAttribute('type')).catch(() => '');
      const label = text || id || href || `${tag} ${type || ''}` || 'unknown';

      // Skip invisible/disabled
      const visible = await el.isVisible().catch(() => false);
      if (!visible) { report(p.name, label, 'SKIP', 'not visible'); continue; }
      const disabled = await el.evaluate(e => e.disabled).catch(() => false);

      try {
        await el.click({ timeout: 3000, force: false });
        await page.waitForTimeout(300);
        // Check if page crashed or navigation failed
        const url = page.url();
        if (url.includes('_error') || url.includes('500')) {
          report(p.name, label, '❌', `navigated to ${url}`);
        } else {
          report(p.name, label, 'OK', href || '');
        }
        // Go back if navigation happened
        if (url !== BASE + p.url && !url.includes(BASE + p.url)) {
          await page.goBack({ timeout: 5000 }).catch(() => {});
          await page.waitForTimeout(200);
        }
      } catch (err) {
        const msg = err.message?.slice(0, 100) || '';
        if (msg.includes('detached') || msg.includes('detached')) {
          report(p.name, label, 'OK', 'page changed');
        } else {
          report(p.name, label, '❌', msg);
        }
      }
    }

    if (consoleErrors.length) {
      report(p.name, 'CONSOLE ERRORS', '⚠️', consoleErrors.slice(0, 3).join(' | '));
    }
  }

  await browser.close();
  server.kill();

  console.log('\n\n========== SUMMARY ==========');
  const fails = RESULTS.filter(r => r.status === '❌');
  const skips = RESULTS.filter(r => r.status === 'SKIP');
  const warns = RESULTS.filter(r => r.status === '⚠️');
  console.log(`Total: ${RESULTS.length} | OK: ${RESULTS.filter(r => r.status === 'OK').length} | ❌ Fails: ${fails.length} | SKIP: ${skips.length} | ⚠️ Warnings: ${warns.length}`);

  if (fails.length) {
    console.log('\n--- FAILED ---');
    fails.forEach(f => console.log(`  ❌ ${f.page} › ${f.element} › ${f.detail}`));
  }
  if (warns.length) {
    console.log('\n--- WARNINGS ---');
    warns.forEach(f => console.log(`  ⚠️ ${f.page} › ${f.element} › ${f.detail}`));
  }
}

run().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
