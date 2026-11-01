# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Static landing site for aiogram (Python Telegram Bot API framework) at https://aiogram.dev — **Astro 7**, static output, deployed to GitHub Pages by GitHub Actions. `docs/site-reference.md` is the reference for pages, SEO, performance and accessibility budgets.

## Commands

Node ≥ 22.23 is required (`.nvmrc` says 26: `nvm use`). Package manager is pnpm. TypeScript is 7.x, which `astro check` does not support yet — there is intentionally no `check` script.

```bash
pnpm install
pnpm dev              # dev server on http://localhost:4321
pnpm build            # static build into dist/, then runs scripts/check-site.mjs (postbuild)
pnpm preview          # serve dist/ on :4321
pnpm screenshots      # Playwright screenshots of a running server into docs/_local/review/ (gitignored)
```

There are no unit tests. The quality gate is `pnpm build` (the postbuild check validates titles, descriptions, canonicals, OG tags, sitemap contents and the third-party allow-list).

## Architecture

- `astro.config.mjs` — `site`, `trailingSlash: 'always'`, i18n (`en` only, `prefixDefaultLocale: false`), `redirects` for legacy `/blog/*` URLs → Telegram channel (Astro emits meta-refresh stubs; GitHub Pages cannot 301), `@astrojs/sitemap` (filters out `/blog/` and 404), `@astrojs/partytown` (GA4 runs in a web worker).
- `src/i18n/en.ts` — **all** user-visible copy and external URLs. Pages import from here; never hard-code strings in templates. Adding a locale = new file + `locales` entry.
- `src/layouts/Base.astro` — html shell: `<Head>` (per-page title/description/canonical/OG/JSON-LD), skip link, header, footer, theme pre-paint script, copy-button script. Every page uses it.
- `src/styles/global.css` — design tokens on `:root` (dark default) and `[data-theme="light"]`; plain CSS, no framework. Brand accent `#009cfb` is only used on dark backgrounds; light mode uses a darker blue for AA contrast.
- `src/components/Icon.astro` — inline SVG from `lucide-static` / `simple-icons` (build-time only, no icon font).
- `src/content.config.ts` + `src/data/*.yml` — content collections (`ecosystem`, `showcase`, `sponsors`) loaded with Astro's `file()` loader and zod-validated; community PRs add entries there. Empty lists are valid and the corresponding sections hide themselves.
- `src/pages/` — `index`, `ecosystem`, `showcase`, `community`, `sponsors`, `policy`, `404`. Shiki highlights the quick-start code at build time (`Code` from `astro:components`, dual themes).
- `public/` — `CNAME`, `robots.txt`, favicons, `site.webmanifest`, `og.png` (1200×630).
- `scripts/` — `check-site.mjs` (postbuild gate), `screenshots.mjs` (Playwright), `og.mjs` (regenerates `public/og.png` and icons from `src/assets/logo.svg`).
- `.github/workflows/deploy.yml` — PR: check + build; push to `main`: build + deploy to Pages.

## Conventions

- Zero client JS beyond: theme pre-paint/toggle, mobile menu toggle, copy buttons, the hero logo pointer-tilt (`Hero.astro`, pointer:fine + no-reduced-motion only), Partytown/GA. Anything else needs a reason in the PR.
- External links: no `target="_blank"`. Icon-only links need `aria-label`. Respect `prefers-reduced-motion`.
- `.editorconfig`: 2-space indent, LF.
- Content policy is published at `/policy/`; its source is `policyPage`/`policy` in `src/i18n/en.ts`. Entry fields are in `CONTRIBUTING.md`.
