# Frontend guide

See also [site-reference.md](../site-reference.md). Prefer page-local `<style>` over editing shared files.

## Build

```bash
pnpm build      # build + quality gate; output in dist/
pnpm dev        # http://localhost:4321
```

## Rules

- **No client JS.** No `<script>` in pages or components, no framework islands. The only scripts live in `Base.astro` (theme, menu, copy) plus the hero tilt below. Use the `data-*` hooks for interactivity.
- **No hard-coded copy or URLs.** Import from `src/i18n/en.ts` (`links`, `site`, `ui`, `nav`, `home`, `ecosystem`, `showcase`, `policy`, `community`, `sponsors`, `notFound`, `footer`). Missing a string? Add it there.
- External links: plain `<a href>`, **never** `target="_blank"`. Icon-only links/buttons need `aria-label`.
- One `<h1>` per page, no heading-level skips (the footer uses `h2`).
- Internal links end with `/` (`trailingSlash: 'always'`).
- Images: `<Image>` from `astro:assets` with `width`/`height`; badges get `loading="lazy" decoding="async"` + their `width`/`height` from `home.badges`.
- Motion only inside `@media (prefers-reduced-motion: no-preference)`.

## Layout: `src/layouts/Base.astro`

Add a page: create `src/pages/<name>.astro` wrapping content in `<Base title description>` with a `<section class="section"><div class="container">`, add its copy to `src/i18n/en.ts`, and add the route to `PAGES` in `scripts/check-site.mjs`.

Props (passed straight to `Head.astro`):

| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | Full `<title>`. Inner pages: `site.title('X')` → `X \| aiogram` (already in each page's i18n block). |
| `description` | `string` | ≤ 160 chars, unique per page. |
| `noindex?` | `boolean` | Adds `robots noindex` (404 only). |
| `jsonLd?` | `object` | Serialized into `<script type="application/ld+json">` (home `@graph`, inner `BreadcrumbList`). |

Base already renders: canonical (from URL), OG/Twitter tags, icons, skip link, `<header>`, `<main id="main">`, `<footer>`, GA (production only). Put page content directly in the slot.

## Design tokens (`src/styles/global.css`)

Dark is the default (`:root`); `[data-theme="light"]` overrides. Use tokens, never raw colors.

Tokens: `--bg --surface --surface-2 --border --text --muted --accent --accent-hover --accent-contrast --brand --focus` (`--brand` is decorative only). All token pairs meet WCAG AA. Also: `--font-sans`, `--font-mono`, `--radius` (12px), `--radius-sm` (8px), `--space-1…7` (0.25, 0.5, 1, 1.5, 2, 3, 4.5 rem), `--container` (1120px), `--gutter` (16px), `--header-h` (64px), `--shadow`.

## Classes

| Class | What it does |
|---|---|
| `.container` | Centered, max 1120px + 16px side gutters. |
| `.section` | Vertical section padding (48px, 72px ≥ 960px); consecutive sections don't double up. |
| `.section-head` | Heading block above a section's content (max 65ch, bottom margin). |
| `.stack` | Vertical rhythm: 1rem between children. |
| `.row` | Wrapping horizontal flex row with gaps (button groups, badges). |
| `.grid .grid-2` / `.grid .grid-3` | Responsive grid: 1 col → 2 cols ≥ 640px → 3 cols ≥ 960px (`grid-3`). |
| `.eyebrow` | Small uppercase accent label above a heading. |
| `.lead` | Larger muted intro paragraph (max 60ch). |
| `.muted` | Secondary text color. |
| `.prose` | Readable text block (70ch, spacing, list indent). |
| `.btn` + `.btn-primary` / `.btn-secondary` | Buttons/links ≥ 44px tall; add `.btn-lg` for hero CTAs (52px). |
| `.icon-btn` | 44×44 icon-only button/link (needs `aria-label`). |
| `.card` | Surface box with border + radius; on an `<a class="card">` it gets a hover state. |
| `.codeblock` / `.codeblock-head` | Framed code block; head row holds the filename + `CopyButton`. |
| `.install` | Inline install-command box (`<code>` gets a `$ ` prompt) + `CopyButton`. |

## Components (`src/components/`)

- **`Icon.astro`** — `<Icon name="route" class="…" />`. Decorative (`aria-hidden`), sized by `font-size`. Unknown names fail the build.
  Lucide: `arrow-up-right book-open braces bug check copy filter git-branch globe heart layers lightbulb megaphone menu message-circle moon package route send shield sun x`.
  Brands: `github telegram pypi opencollective`.
  Need another? Add an import line in `Icon.astro` (any `lucide-static/icons/<name>.svg`).
- **`CopyButton.astro`** — `<CopyButton target="#install-cmd" label={home.install.copyLabel} />` copies the `textContent` of the element matched by `target`; or `text="pip install -U aiogram"` copies a literal. Shows "Copy" → "Copied" for 1.5s. Hidden when JS is off (the text stays selectable).
- **`Policy.astro`** — `<Policy />` renders the submission policy card (`h2` + six rules) from `policy` in i18n. Use on ecosystem and showcase.
- `Header.astro`, `Footer.astro`, `ThemeToggle.astro`, `Head.astro` — used by `Base`; don't include them in pages.

## Code highlighting

Use `<Code>` from `astro:components` with themes `github-light` / `github-dark-default` and `defaultColor={false}` (`global.css` switches the Shiki variables per theme).

## Content collections

Schemas are in `src/content.config.ts`, data in `src/data/*.yml` (`ecosystem`, `showcase`, `sponsors`). Field reference: [CONTRIBUTING.md](../../CONTRIBUTING.md). To add an entry, append to the YAML file (logos in `src/assets/`); the build validates it.

```astro
---
import { getCollection } from 'astro:content';
const libs = (await getCollection('ecosystem')).sort((a, b) => a.data.name.localeCompare(b.data.name));
---
{libs.length > 0 ? (…list…) : <p class="muted">{ecosystem.empty}</p>}
```

**Hide-when-empty rule:** a data-driven section renders nothing (not even its heading) when its list is empty: sponsors list on `/sponsors/`, "Trusted by" on home (needs ≥ 4 showcase entries). The ecosystem/showcase pages themselves stay, showing the `empty` copy + the "Add your …" link. Ecosystem categories with no entries are skipped; label = `ecosystem.categories[cat]`.

Showcase logos with `logo_dark`: render both `<Image>`s and hide one per theme in page CSS (`[data-theme="light"] .logo-dark { display: none }` and vice versa).

## Theming / JS hooks (handled by Base, no page JS)

- `<html data-theme="dark|light" class="js">` is set before paint; style light-only tweaks with `[data-theme="light"] …`.
- `[data-copy]`, `[data-theme-toggle]`, `[data-menu-toggle]` are hidden when JS is off (`html:not(.js)`).

## Known exception to the no-client-JS rule

`src/components/home/Hero.astro` ships a ~25-line inline script for the pointer-driven "coin" tilt of the hero logo. It runs only on `(pointer: fine)` devices with `prefers-reduced-motion: no-preference`, one update per animation frame. Do not add further page scripts without a reason.
