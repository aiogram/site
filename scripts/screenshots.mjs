// Full-page screenshots of every route, both themes and viewports.
// Usage: BASE=http://localhost:4321 LABEL=my-change node scripts/screenshots.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4321';
const OUT = `docs/_local/review/${process.env.LABEL || 'latest'}`; // docs/_local is gitignored
const PATHS = ['/', '/ecosystem/', '/showcase/', '/community/', '/sponsors/', '/policy/', '/nonexistent/'];
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const slug = (p) => (p.replaceAll('/', '') || 'home');

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const problems = [];
let shots = 0;
for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
  for (const theme of ['dark', 'light']) {
    const ctx = await browser.newContext({ viewport, colorScheme: theme });
    await ctx.addInitScript((t) => { try { localStorage.setItem('theme', t); } catch {} }, theme);
    for (const path of PATHS) {
      const page = await ctx.newPage();
      const tag = `${path} [${vpName}/${theme}]`;
      page.on('console', (m) => m.type() === 'error' && !(path === '/nonexistent/' && /404/.test(m.text())) && problems.push(`console error ${tag}: ${m.text()}`));
      page.on('pageerror', (e) => problems.push(`page error ${tag}: ${e.message}`));
      const res = await page.goto(new URL(path, BASE).href, { waitUntil: 'networkidle' });
      if (res.status() >= 400 && path !== '/nonexistent/') problems.push(`HTTP ${res.status()} ${tag}`);
      await page.screenshot({ path: `${OUT}/${slug(path)}-${vpName}-${theme}.png`, fullPage: true });
      shots++;
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();
console.log(`${shots} screenshots -> ${OUT}`);
problems.forEach((p) => console.log(`  ${p}`));
console.log(problems.length ? `FAIL: ${problems.length} problem(s)` : 'OK: no console errors, no bad responses');
process.exit(problems.length ? 1 : 0);
