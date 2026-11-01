# Contributing

## Adding an ecosystem or showcase entry

Add one YAML entry per pull request:

- Ecosystem library: `src/data/ecosystem.yml`
- Showcase product: `src/data/showcase.yml` (+ logo in `src/assets/showcase/`)

Entries are validated by the build (zod schemas in `src/content.config.ts`); a PR with an invalid entry fails CI.

### `ecosystem.yml` fields

| Field | Required | Notes |
|---|---|---|
| `id` | yes | lowercase letters, digits, dashes |
| `name` | yes | |
| `repo` | yes | `https://` URL |
| `pypi` | no | PyPI project name |
| `description` | yes | up to 140 characters |
| `category` | yes | `ui`, `i18n`, `storage`, `testing`, `integrations`, `utilities` or `templates` |
| `maintainer` | no | |
| `added` | yes | date, `YYYY-MM-DD` |

### `showcase.yml` fields

| Field | Required | Notes |
|---|---|---|
| `id` | yes | lowercase letters, digits, dashes |
| `name` | yes | |
| `url` | yes | `https://` URL |
| `logo` | no (recommended) | path to the image file, relative to the YAML file |
| `logo_dark` | no | variant for the dark theme (`logo` is shown on light) |
| `description` | yes | up to 120 characters |
| `bot` | no | bot handle, e.g. `@my_bot` |
| `added` | yes | date, `YYYY-MM-DD` |

### Logo requirements

If you provide a logo:

- SVG preferred; otherwise PNG at least 400 px wide.
- Transparent background, at most 50 KB.
- Must look fine on both dark and light backgrounds (or provide `logo_dark`, which only applies together with `logo`).

## Submission policy

Every entry must meet the submission policy: https://aiogram.dev/policy/#listings — read it before opening a PR.
