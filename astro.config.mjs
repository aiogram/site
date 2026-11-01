// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// Legacy Jekyll blog URLs. GitHub Pages can't 301, so Astro emits meta-refresh stubs.
const channel = 'https://t.me/aiogram_live';
const legacyBlog = [
  '/blog/',
  '/blog/2025/03/08/introducing-new-site/',
  '/blog/tags/',
  '/blog/tag/news/',
  '/blog/tag/update/',
  '/blog/tag/community/',
];

// https://astro.build/config
export default defineConfig({
  site: 'https://aiogram.dev',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },
  redirects: Object.fromEntries(legacyBlog.map((path) => [path, channel])),
  integrations: [
    sitemap({ filter: (page) => !page.includes('/blog/') && !page.includes('/404') }),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
});
