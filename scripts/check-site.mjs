// Post-build sanity checks on dist/. Node >= 22, no dependencies.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist', ORIGIN = 'https://aiogram.dev';
const ALLOW = ['aiogram.dev', 'img.shields.io', 'www.googletagmanager.com'];
const PAGES = ['/', '/ecosystem/', '/showcase/', '/community/', '/sponsors/', '/policy/'];
const results = [];
const check = (where, what, ok, detail = '') => results.push({ where, what, ok, detail });

const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'))?.slice(2).find((v) => v !== undefined);
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
const meta = (html, key) => tags(html, 'meta').find((t) => [attr(t, 'name'), attr(t, 'property')].includes(key));

const titles = new Map(), descs = new Map();
for (const file of walk(DIST).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  const path = '/' + relative(DIST, file).replace(/index\.html$/, '');
  if (path.startsWith('/~partytown/') || /http-equiv=["']?refresh/i.test(html)) continue;
  const is404 = path === '/404.html';
  const t = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim();
  check(path, 'one <h1>', tags(html, 'h1').length === 1, `${tags(html, 'h1').length} found`);
  check(path, 'title ok', !!t && t !== 'aiogram - aiogram', t);
  check(path, '<html lang="en">', attr(tags(html, 'html')[0] ?? '', 'lang') === 'en');
  check(path, 'no target=_blank', !/target\s*=\s*["']?_blank/i.test(html));
  check(path, 'og:image + twitter:card', !!meta(html, 'og:image') && !!meta(html, 'twitter:card'));
  if (is404) {
    check(path, 'noindex', /<meta[^>]+name=["']robots["'][^>]+content=["']noindex/i.test(html));
  } else {
    const d = attr(meta(html, 'description') ?? '', 'content') ?? '';
    check(path, 'description 50-160', d.length >= 50 && d.length <= 160, `${d.length} chars`);
    const canon = attr(tags(html, 'link').find((l) => attr(l, 'rel') === 'canonical') ?? '', 'href');
    check(path, 'canonical', canon === ORIGIN + path, canon);
    titles.set(t, [...(titles.get(t) ?? []), path]);
    descs.set(d, [...(descs.get(d) ?? []), path]);
  }
  const urls = [...tags(html, 'script').map((s) => attr(s, 'src')), ...tags(html, 'link').map((l) => attr(l, 'href')),
    ...tags(html, 'img').map((i) => attr(i, 'src')), ...tags(html, 'iframe').map((i) => attr(i, 'src'))].filter(Boolean);
  const bad = urls.map((u) => { try { return /^(https?:)?\/\//.test(u) ? new URL(u, ORIGIN).host : null; } catch { return u; } })
    .filter((h) => h && !ALLOW.includes(h));
  check(path, 'hosts allowed', !bad.length, [...new Set(bad)].join(', '));
}
for (const [name, m] of [['title unique', titles], ['description unique', descs]]) {
  const dup = [...m].filter(([, p]) => p.length > 1).map(([, p]) => p.join('+'));
  check('(all)', name, !dup.length, dup.join('; '));
}

const read = (f) => (existsSync(join(DIST, f)) ? readFileSync(join(DIST, f), 'utf8') : '');
const locs = [...(read('sitemap-index.xml') + read('sitemap-0.xml')).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  .filter((u) => !u.endsWith('.xml'));
const want = PAGES.map((p) => ORIGIN + p);
check('sitemap', 'exactly 6 pages', locs.length === 6 && want.every((u) => locs.includes(u)), locs.join(' '));
for (const f of ['robots.txt', 'CNAME', '404.html', 'og.png']) check(f, 'exists', existsSync(join(DIST, f)));
const stubs = existsSync(join(DIST, 'blog')) ? walk(join(DIST, 'blog')).filter((f) => f.endsWith('.html')) : [];
check('blog/', 'stubs found', stubs.length > 0);
for (const f of stubs) {
  check('/' + relative(DIST, f), 'redirects to t.me/aiogram_live',
    /http-equiv=["']?refresh["']?[^>]*url=https:\/\/t\.me\/aiogram_live["']/i.test(readFileSync(f, 'utf8')));
}

const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.where.padEnd(22)} ${r.what}${r.ok ? '' : `  -> ${r.detail}`}`);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
