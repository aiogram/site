// Generates og.png, apple-touch-icon.png, icon-192/512.png from src/assets/logo.svg
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const logo = readFileSync(new URL('../src/assets/logo.svg', import.meta.url));
const uri = 'data:image/svg+xml;base64,' + logo.toString('base64');
const out = (f) => new URL('../public/' + f, import.meta.url).pathname;
const font = "-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0b1220"/>
  <image href="${uri}" x="80" y="165" width="300" height="300"/>
  <text x="430" y="315" font-family="${font}" font-weight="700" font-size="96" fill="#fff">aiogram</text>
  <rect x="430" y="345" width="120" height="4" rx="2" fill="#009cfb"/>
  <text x="430" y="415" font-family="${font}" font-size="38" fill="#9aa8bf">Telegram Bot API framework for Python</text>
</svg>`;
await sharp(Buffer.from(og)).png({ palette: true, compressionLevel: 9 }).toFile(out('og.png'));

const render = (size) => sharp(logo, { density: 300 }).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
const pad = Math.round(180 * 0.12);
const inner = await render(180 - 2 * pad).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#0b1220' } })
  .composite([{ input: inner, left: pad, top: pad }]).png().toFile(out('apple-touch-icon.png'));
for (const s of [192, 512]) await render(s).png().toFile(out(`icon-${s}.png`));
