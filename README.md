# aiogram.dev

Source of [aiogram.dev](https://aiogram.dev), the landing site of
[aiogram](https://github.com/aiogram/aiogram), the asynchronous Python framework for the Telegram Bot API.
Built with [Astro](https://astro.build), no client-side framework, hosted on GitHub Pages.

- Documentation: https://docs.aiogram.dev (hosted separately)
- GitHub: https://github.com/aiogram/aiogram
- Chat: https://t.me/aiogram, news: https://t.me/aiogram_live

## Local development

```bash
nvm use            # Node version from .nvmrc
pnpm install
pnpm dev           # dev server on http://localhost:4321
pnpm build         # static site into dist/, then post-build checks
pnpm screenshots   # full-page screenshots into docs/_local/review/ (needs a running dev/preview server)
```

`pnpm build` runs `scripts/check-site.mjs` afterwards (titles, descriptions, canonicals,
allowed external hosts, sitemap, redirect stubs) and fails the build on any violation.

## Deploy

`.github/workflows/deploy.yml` builds on every push and pull request. Pushes to `main`
(and manual runs) also publish `dist/` to GitHub Pages; pull requests only build.

## Adding ecosystem or showcase entries

Entries are data files under `src/data/`, validated at build time. See
[CONTRIBUTING.md](CONTRIBUTING.md) for the format and the submission policy.

## License

MIT
