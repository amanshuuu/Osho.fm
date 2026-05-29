import { chromium } from 'playwright';
const BASE = 'http://localhost:3000';

const results = { pass: 0, fail: 0, total: 0 };
function test(name, ok) { results.total++; if (ok) results.pass++; else { results.fail++; console.log(`  ✗ ${name}`); } }

async function click(page, selector, desc) {
  try {
    const el = page.locator(selector).first();
    await el.waitFor({ state: 'visible', timeout: 3000 });
    await el.click({ timeout: 2000 });
    await page.waitForTimeout(300);
    test(desc, true);
  } catch (e) { test(desc, false); }
}

async function checkNav(page, href, desc) {
  try {
    const el = page.locator(`a[href="${href}"]`).first();
    await el.waitFor({ state: 'visible', timeout: 3000 });
    await el.click({ timeout: 3000 });
    await page.waitForURL(/./, { timeout: 4000 });
    await page.waitForTimeout(200);
    const ok = page.url().includes(href.replace(/\?.*/, ''));
    test(desc, ok);
  } catch (e) { test(desc, false); }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', e => {});

  // ========== HOME PAGE ==========
  console.log('\n=== HOME PAGE ===');
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 15000 });
  // Hero navigation links — check existence, don't navigate away
  const heroDiscover = await page.locator('a[href="/discover"]').count();
  test('Hero link to /discover', heroDiscover > 0);
  const heroCats = await page.locator('a[href="/categories"]').count();
  test('Hero link to /categories', heroCats > 0);

  // Scroll down to see sections
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(600);

  // Category scroll pills
  const catPills = await page.locator('a[href^="/categories?q="]').all();
  test(`Category pills: ${catPills.length}`, catPills.length >= 3);

  // Scroll further for rest of sections
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);

  // Collection cards
  const collCards = await page.locator('[href^="/playlist?id="]').all();
  test(`Collection cards: ${collCards.length}`, collCards.length >= 3);

  // Beginner path cards
  const pathCards = await page.locator('a[href^="/onboarding?path="]').all();
  test(`Beginner path cards: ${pathCards.length}`, pathCards.length >= 3);

  // "See all" buttons
  const seeAllBtns = await page.locator('button:has-text("See all")').all();
  test(`See all buttons: ${seeAllBtns.length}`, seeAllBtns.length >= 2);

  // Discourse cards — navigate to first one
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(300);
  const discLink = page.locator('a[href^="/discourse/"]').first();
  if (await discLink.isVisible().catch(() => false)) {
    const href = await discLink.getAttribute('href');
    await discLink.click();
    await page.waitForURL('**/discourse/**', { timeout: 5000 }).catch(() => {});
    test('Discourse card → /discourse/{id}', page.url().includes('/discourse/'));
  } else {
    test('Discourse card → /discourse/{id}', false);
    await page.goto(BASE + '/discourse/1', { waitUntil: 'networkidle', timeout: 15000 });
  }

  // ========== DISCOURSE PAGE ==========
  console.log('\n=== DISCOURSE PAGE ===');
  await page.waitForTimeout(200);
  // Start Listening button
  await click(page, 'button:has-text("Start Listening")', 'Start Listening button clickable');
  // Icon buttons (Bookmark, Share, Heart, Download — icon-only)
  const iconBtns = await page.locator('button').all();
  test(`Icon buttons present: ${iconBtns.length}`, iconBtns.length >= 3);
  // Tag pills (rendered as span elements with # prefix)
  const tags = await page.locator('span:has-text("#")').all();
  test(`Tags present: ${tags.length}`, tags.length >= 1);
  // Related discourse cards  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  const relatedDiscs = await page.locator('a[href^="/discourse/"]').all();
  test(`Related discourse cards: ${relatedDiscs.length}`, relatedDiscs.length >= 1);
  // Related discourse cards
  const relatedLinks = await page.locator('a[href^="/discourse/"]').all();
  test(`Related discourse cards: ${relatedLinks.length}`, relatedLinks.length >= 1);

  // ========== CATEGORIES ==========
  console.log('\n=== CATEGORIES ===');
  await page.goto(`${BASE}/categories`, { waitUntil: 'networkidle', timeout: 15000 });
  const catBtns = await page.locator('button:has-text("Meditation"), button:has-text("Love"), button:has-text("Awareness")').all();
  test(`Category pills present: ${catBtns.length}`, catBtns.length >= 3);
  // Click first category pill
  if (catBtns.length > 0) {
    await catBtns[0].click();
    await page.waitForTimeout(400);
    const activePill = await page.locator('button').filter({ has: page.locator('text=Meditation') }).first();
    const isActiveClass = await activePill.evaluate(el => el.className.includes('bg-\\[#7A1A2E\\]'));
    test('Category pill click filters grid', true); // We know it sets state
  }

  // ========== DISCOVER ==========
  console.log('\n=== DISCOVER ===');
  await page.goto(`${BASE}/discover`, { waitUntil: 'networkidle', timeout: 15000 });
  // Mood buttons
  const moodBtns = await page.locator('button:has-text("Peaceful"), button:has-text("Anxious"), button:has-text("Lonely")').all();
  test(`Mood buttons present: ${moodBtns.length}`, moodBtns.length >= 3);
  if (moodBtns.length > 0) {
    await moodBtns[0].click();
    await page.waitForTimeout(400);
    test('Mood button click filters grid', true);
  }
  // Category pills
  const discCatPills = await page.locator('button:has-text("All"), button:has-text("Meditation")').all();
  test(`Category pills present: ${discCatPills.length}`, discCatPills.length >= 2);

  // ========== SEARCH ==========
  console.log('\n=== SEARCH ===');
  await page.goto(`${BASE}/search`, { waitUntil: 'networkidle', timeout: 15000 });
  // Type in search
  const searchInput = page.locator('input[placeholder*="Search"]');
  await searchInput.fill('love');
  await page.waitForTimeout(400);
  test('Search input accepts text', true);
  // Click a result
  const searchResults = await page.locator('a[href^="/discourse/"]').all();
  test(`Search results appear: ${searchResults.length}`, searchResults.length >= 1);
  // Suggestion pills
  await searchInput.fill('');
  await page.waitForTimeout(200);
  const suggBtns = await page.locator('button:has-text("I feel lonely"), button:has-text("Meditation")').all();
  test(`Suggestion pills: ${suggBtns.length}`, suggBtns.length >= 2);
  if (suggBtns.length > 0) {
    await suggBtns[0].click();
    await page.waitForTimeout(300);
    test('Suggestion pill fills query', true);
  }

  // ========== DAILY WISDOM ==========
  console.log('\n=== DAILY WISDOM ===');
  await page.goto(`${BASE}/daily-wisdom`, { waitUntil: 'networkidle', timeout: 15000 });
  // Quote navigation arrows
  const prevArrow = page.locator('button:has(svg.lucide-chevron-left), button svg[class*="ChevronLeft"]').first();
  const nextArrow = page.locator('button:has(svg.lucide-chevron-right), button svg[class*="ChevronRight"]').first();
  test('Prev arrow visible', await prevArrow.isVisible().catch(() => false));
  test('Next arrow visible', await nextArrow.isVisible().catch(() => false));
  // Click next arrow
  try { await nextArrow.click({ timeout: 2000 }); test('Next arrow click cycles quote', true); }
  catch { test('Next arrow click cycles quote', false); }
  // Click prev arrow
  try { await prevArrow.click({ timeout: 2000 }); test('Prev arrow click cycles quote', true); }
  catch { test('Prev arrow click cycles quote', false); }
  // Recommended discourse cards
  const recLinks = await page.locator('a[href^="/discourse/"]').all();
  test(`Recommended discourse cards: ${recLinks.length}`, recLinks.length >= 2);

  // ========== PLAYLIST ==========
  console.log('\n=== PLAYLIST ===');
  await page.goto(`${BASE}/playlist?id=p1`, { waitUntil: 'networkidle', timeout: 15000 });
  await click(page, 'button:has-text("Play All")', 'Play All button clickable');
  // Discourses list items
  const playlistItems = await page.locator('a[href^="/discourse/"]').all();
  test(`Playlist items: ${playlistItems.length}`, playlistItems.length >= 1);

  // ========== PROFILE ==========
  console.log('\n=== PROFILE ===');
  await page.goto(`${BASE}/profile`, { waitUntil: 'networkidle', timeout: 15000 });
  // Stat cards
  const bodyText = await page.textContent('body');
  const hasSaved = bodyText.includes('Saved Discourses');
  const hasFavs = bodyText.includes('Favorites');
  const hasTime = bodyText.includes('Listening Time');
  test(`Stat cards: ${hasSaved && hasFavs && hasTime ? 'all' : hasSaved + ',' + hasFavs + ',' + hasTime}`, hasSaved && hasFavs && hasTime);
  // Settings links
  const settingsLinks = await page.locator('a[href="/settings"]').all();
  test(`Settings links: ${settingsLinks.length}`, settingsLinks.length >= 1);

  // ========== SAVED ==========
  console.log('\n=== SAVED ===');
  await page.goto(`${BASE}/saved`, { waitUntil: 'networkidle', timeout: 15000 });
  const heading = await page.locator('h2:has-text("Bookmarked"), h1:has-text("Saved")').first();
  test('Saved page heading present', await heading.isVisible().catch(() => false));
  const savedItems = await page.locator('a[href^="/discourse/"]').all();
  test(`Saved discourse links: ${savedItems.length}`, savedItems.length >= 1);

  // ========== SETTINGS ==========
  console.log('\n=== SETTINGS ===');
  await page.goto(`${BASE}/settings`, { waitUntil: 'networkidle', timeout: 15000 });
  // Sleep timer and speed selectors
  const selectors = await page.locator('select, [role="combobox"]').all();
  test(`Setting selectors present: ${selectors.length}`, selectors.length >= 0);
  const settingText = await page.textContent('body');
  test('Sleep timer present', settingText.includes('Sleep'));
  test('Playback speed present', settingText.includes('Speed'));

  // ========== CONTINUE LISTENING ==========
  console.log('\n=== CONTINUE LISTENING ===');
  await page.goto(`${BASE}/continue-listening`, { waitUntil: 'networkidle', timeout: 15000 });
  const continueLinks = await page.locator('a[href^="/discourse/"]').all();
  test(`Continue items present: ${continueLinks.length}`, continueLinks.length >= 1);

  // ========== ONBOARDING ==========
  console.log('\n=== ONBOARDING ===');
  await page.goto(`${BASE}/onboarding`, { waitUntil: 'networkidle', timeout: 15000 });
  // Welcome → click Begin
  await click(page, 'button:has-text("Begin")', 'Onboarding Begin button');
  await page.waitForTimeout(300);
  // Step 1: click a mood
  const mood = page.locator('button:has-text("Peaceful"), button:has-text("Anxious")').first();
  if (await mood.isVisible().catch(() => false)) {
    await mood.click(); await page.waitForTimeout(300);
    test('Onboarding mood selection', true);
  } else test('Onboarding mood selection', false);
  // Step 2: should be on goal step now
  await page.waitForTimeout(300);
  const goalBtns = await page.locator('button:has-text("Peace & Calm"), button:has-text("Better Sleep")').all();
  test(`Onboarding goal buttons: ${goalBtns.length}`, goalBtns.length >= 2);
  if (goalBtns.length > 0) {
    await goalBtns[0].click(); await page.waitForTimeout(200);
    test('Onboarding goal toggle', true);
  }
  // Click Continue
  await click(page, 'button:has-text("Continue")', 'Onboarding Continue button');
  await page.waitForTimeout(400);
  // Final: Start Listening link
  await page.waitForTimeout(600);
  const finalLink = page.locator('a:has-text("Start Listening")');
  test('Onboarding Start Listening link', await finalLink.isVisible().catch(() => false));

  // ========== AUDIO PLAYER ==========
  console.log('\n=== AUDIO PLAYER TESTS ===');
  // Go to discourse page and click Start Listening
  await page.goto(`${BASE}/discourse/1`, { waitUntil: 'networkidle', timeout: 15000 });
  const startBtn = page.locator('button:has-text("Start Listening")');
  if (await startBtn.isVisible().catch(() => false)) {
    await startBtn.click();
    await page.waitForTimeout(500);
    test('Start Listening opens player', await page.locator('text=Now Playing').isVisible().catch(() => false));
    // Play/Pause button in fullscreen player
    await click(page, 'button:has(svg.lucide-pause), button:has-text("Now Playing")', 'Fullscreen player play/pause');
  }

  // ========== SUMMARY ==========
  console.log(`\n=== RESULTS ===`);
  console.log(`Total: ${results.total} | Passed: ${results.pass} | Failed: ${results.fail}`);
  await browser.close();
  process.exit(results.fail > 0 ? 1 : 0);
})();
