# aiogram.dev — Site reference

## Purpose & scope

Static landing site for aiogram (Python Telegram Bot API framework), built with Astro and hosted on GitHub Pages at https://aiogram.dev. Framework documentation lives at docs.aiogram.dev; this site links to it. There is no blog and no on-site search.

## Routes

| Route | Purpose | Title pattern |
|---|---|---|
| `/` | Landing: what it is, install, quick start, features, community | `aiogram - Python Telegram Bot API framework (asyncio)` |
| `/ecosystem/` | Curated libraries built on aiogram | `Ecosystem \| aiogram` |
| `/showcase/` | Products built with aiogram | `Showcase \| aiogram` |
| `/community/` | Chat, channel, how to contribute | `Community \| aiogram` |
| `/sponsors/` | Supporting the project | `Sponsors \| aiogram` |
| `/policy/` | Published policies | `Policies \| aiogram` |
| `/404.html` | Not found (`noindex`) | `Page not found \| aiogram` |
| `/blog/*` (legacy URLs) | Redirect stubs to https://t.me/aiogram_live (meta refresh + canonical; not in sitemap) | n/a |
| `/sitemap-index.xml`, `/robots.txt`, `/site.webmanifest` | Infrastructure | n/a |

Header navigation is identical on every page; on mobile it collapses into a menu.

## Content model

Three YAML collections in `src/data/`, schemas in `src/content.config.ts`, validated at build (a bad entry fails the build):

- `ecosystem.yml` — libraries built on aiogram.
- `showcase.yml` — products built with aiogram.
- `sponsors.yml` — sponsors.

Logos go in `src/assets/` (optimized by `astro:assets`). Data-driven sections render nothing, heading included, when their list is empty. Field reference, logo requirements and the submission process are in [CONTRIBUTING.md](../CONTRIBUTING.md).

Listing and community policy: published at `/policy/`; source of truth is `policyPage` / `policy` in `src/i18n/en.ts`; CONTRIBUTING.md links to it.

## Copy & i18n

All user-visible strings and URLs live in `src/i18n/en.ts`; pages import from it and contain no hard-coded copy. Astro i18n is configured with `defaultLocale: 'en'` and no prefix for the default locale. To add a locale: add it to `locales` in `astro.config.mjs`, add a translation file mirroring `en.ts`, and add the localized pages.

## Design

- Dark-first theme tokens on `:root`; light theme under `[data-theme="light"]`; manual toggle stored in `localStorage`, applied before first paint. All token pairs meet WCAG AA.
- Accent colour is for links, primary buttons and icons only; the brand blue is decorative on light backgrounds.
- System font stacks only; no font files, no icon fonts. Icons are inline SVG components.
- Motion only inside `prefers-reduced-motion: no-preference`; it never hides content.
- Layout: 1120 px max width, 16 px gutters, phone-first; interactive targets at least 44 px; visible focus rings; skip link.
- No page JavaScript, with these exceptions: theme pre-paint and toggle, mobile menu, copy buttons, the hero logo pointer tilt (`Hero.astro`, fine-pointer and no-reduced-motion only), and Partytown for analytics. The site works without JS.

## SEO requirements

- Unique `<title>` and description (50–160 chars) per page; self-canonical absolute URL with trailing slash; `lang="en"`; one `<h1>` per page.
- Open Graph and Twitter tags on every page, with the 1200×630 `og.png`.
- JSON-LD `@graph` on the home page (Organization, WebSite, SoftwareApplication).
- `sitemap` lists exactly the six real pages; `robots.txt` allows all and points to the sitemap; `404` is `noindex`.
- Legacy `/blog/*` URLs serve redirect stubs.
- Valid `site.webmanifest`, favicons and apple-touch-icon.

## Performance & accessibility budgets

- Lighthouse mobile performance ≥ 95, accessibility 100.
- First-party CSS+JS ≤ 25 KB gzip; LCP ≤ 2 s; CLS ≤ 0.02.
- LCP element is text, not an image. Badge images are lazy, with explicit dimensions.
- Third parties allowed: `img.shields.io`, Google Analytics (via Partytown, production only, never render-blocking).
- Accessibility: landmarks, `aria-label` on icon-only links, `aria-hidden` on decorative SVGs, keyboard-operable controls.

## Quality gates

`pnpm build` runs the build and then `scripts/check-site.mjs` against `dist/`. The script enforces, for every built page:

- exactly one `<h1>`, a non-empty title, `<html lang="en">`, no `target="_blank"`;
- `og:image` and `twitter:card`;
- non-404 pages: description of 50–160 chars, canonical equal to the page URL, unique title and description across pages; the 404 page has `noindex`;
- script/link/img/iframe hosts limited to `aiogram.dev`, `img.shields.io`, `www.googletagmanager.com`.

Site-wide it checks that the sitemap lists exactly the six pages, that `robots.txt`, `CNAME`, `404.html` and `og.png` exist, and that every `/blog/` stub redirects to the Telegram channel.

`scripts/screenshots.mjs` (Playwright) captures pages for visual review.

## Ops notes

- Custom domain via `public/CNAME`.
- GitHub Pages deploys from Actions (`.github/workflows/deploy.yml`): PRs build and check, pushes to `main` deploy.
- After the first deploy: verify the domain in Google Search Console and submit `/sitemap-index.xml`.
