// All user-visible copy and external URLs. Templates import from here; never hard-code strings.
// Adding a locale = a sibling file with the same shape + a `locales` entry in astro.config.mjs.

const docs = 'https://docs.aiogram.dev';
const docsLatest = `${docs}/en/latest`;
const github = 'https://github.com/aiogram/aiogram';
const githubBlob = `${github}/blob/dev-3.x`;

export const links = {
  docs,
  install: `${docsLatest}/install.html`,
  changelog: `${docsLatest}/changelog.html`,
  routers: `${docsLatest}/dispatcher/router.html`,
  magicFilters: `${docsLatest}/dispatcher/filters/magic_filters.html`,
  fsm: `${docsLatest}/dispatcher/finite_state_machine/index.html`,
  middlewares: `${docsLatest}/dispatcher/middlewares.html`,
  types: `${docsLatest}/api/types/index.html`,
  webhook: `${docsLatest}/dispatcher/webhook.html`,
  github,
  issues: `${github}/issues`,
  discussions: `${github}/discussions`,
  releases: `${github}/releases`,
  examples: `${github}/tree/dev-3.x/examples`,
  contributing: `${githubBlob}/CONTRIBUTING.md`,
  security: `${githubBlob}/SECURITY.md`,
  license: `${githubBlob}/LICENSE`,
  pypi: 'https://pypi.org/project/aiogram/',
  chat: 'https://t.me/aiogram',
  channel: 'https://t.me/aiogram_live',
  openCollective: 'https://opencollective.com/aiogram',
  siteRepo: 'https://github.com/aiogram/site',
  editEcosystem: 'https://github.com/aiogram/site/edit/main/src/data/ecosystem.yml',
  editShowcase: 'https://github.com/aiogram/site/edit/main/src/data/showcase.yml',
} as const;

export const site = {
  name: 'aiogram',
  url: 'https://aiogram.dev',
  locale: 'en_US',
  themeColor: '#0b1220',
  gaId: 'G-X0CZ79CMH4',
  ogImage: {
    url: 'https://aiogram.dev/og.png',
    width: 1200,
    height: 630,
    alt: 'aiogram — Telegram Bot API framework for Python',
  },
  /** Page title pattern for inner pages. */
  title: (page: string) => `${page} | aiogram`,
} as const;

/** Small UI strings shared by components. */
export const ui = {
  skipLink: 'Skip to content',
  copy: 'Copy',
  copied: 'Copied',
  themeToggle: 'Toggle color theme',
  menu: 'Menu',
} as const;

export const nav = {
  label: 'Main',
  items: [
    { label: 'Ecosystem', href: '/ecosystem/' },
    { label: 'Showcase', href: '/showcase/' },
    { label: 'Community', href: '/community/' },
    { label: 'Sponsors', href: '/sponsors/' },
  ],
  docs: { label: 'Documentation', short: 'Docs', href: links.docs },
  github: { label: 'aiogram on GitHub', href: links.github },
} as const;

export const home = {
  title: 'aiogram - Python Telegram Bot API framework (asyncio)',
  description:
    'aiogram is a modern, fully asynchronous Python framework for the Telegram Bot API, built on asyncio and aiohttp. Routers, filters, FSM and typed models.',
  hero: {
    title: 'aiogram',
    subtitle: 'asynchronous Python framework for the Telegram Bot API',
    lead:
      'A modern, fully asynchronous framework for the Telegram Bot API, built on asyncio and aiohttp. Typed end to end, with routers, magic filters, a finite-state machine and middlewares that keep your bot code small and testable.',
    primaryCta: { label: 'Read the documentation', href: links.docs },
    secondaryCta: { label: 'Source on GitHub', href: links.github },
  },
  install: {
    command: 'pip install -U aiogram',
    note: 'Python 3.10+ · MIT license',
    copyLabel: 'Copy pip install command',
    installUv: 'uv add aiogram',
    copyLabelUv: 'Copy uv add command',
    pmLegend: 'Package manager',
    pmPip: 'pip',
    pmUv: 'uv',
    docsLink: { label: 'Installation guide', href: links.install },
  },
  /** shields.io badges; width/height are approximate so the row can reserve space (no CLS). */
  badges: [
    { src: 'https://img.shields.io/pypi/v/aiogram?style=flat-square', alt: 'Latest aiogram version on PyPI', href: links.pypi, width: 86, height: 20 },
    { src: 'https://img.shields.io/pypi/pyversions/aiogram?style=flat-square', alt: 'Supported Python versions', href: links.pypi, width: 234, height: 20 },
    { src: 'https://img.shields.io/github/stars/aiogram/aiogram?style=flat-square', alt: 'GitHub stars', href: links.github, width: 72, height: 20 },
    { src: 'https://img.shields.io/pypi/l/aiogram?style=flat-square', alt: 'License: MIT', href: links.license, width: 78, height: 20 },
  ],
  quickStart: {
    title: 'Quick start',
    intro: 'An echo bot in about 30 lines. Set BOT_TOKEN and run it with Python 3.10 or newer.',
    filename: 'bot.py',
    copyLabel: 'Copy example code',
    docsLink: { label: 'More examples on GitHub', href: links.examples },
    code: `import asyncio
import logging
from os import getenv

from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message

dp = Dispatcher()


@dp.message(CommandStart())
async def start(message: Message) -> None:
    await message.answer(f"Hello, {message.from_user.full_name}!")


@dp.message()
async def echo(message: Message) -> None:
    try:
        await message.send_copy(chat_id=message.chat.id)
    except TypeError:
        await message.answer("Nice try!")


async def main() -> None:
    bot = Bot(token=getenv("BOT_TOKEN"))
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())
`,
  },
  features: {
    title: 'Why aiogram',
    items: [
      { icon: 'route', title: 'Routers', text: 'Split handlers into nested routers by feature and include them where you need them.', href: links.routers },
      { icon: 'filter', title: 'Filters & magic filters', text: 'Match updates declaratively, from commands and chat types to F.text.startswith("hi").', href: links.magicFilters },
      { icon: 'git-branch', title: 'Finite-state machine', text: 'Build multi-step dialogs with states and pluggable storages like memory or Redis.', href: links.fsm },
      { icon: 'layers', title: 'Middlewares', text: 'Wrap updates and handlers with outer and inner middlewares for auth, i18n or throttling.', href: links.middlewares },
      { icon: 'braces', title: 'Fully typed (pydantic models)', text: 'Every Telegram type is a pydantic model, so your IDE completes and checks it.', href: links.types },
      { icon: 'send', title: 'Complete Bot API', text: 'Polling or webhooks, payments, inline mode and Mini Apps, tracking each Bot API release.', href: links.webhook },
    ],
  },
  trustedBy: {
    title: 'Trusted by',
    more: { label: 'See the showcase', href: '/showcase/' },
  },
  community: {
    title: 'Community & support',
    tiles: [
      { icon: 'telegram', title: 'Telegram chat', handle: '@aiogram', text: 'Ask questions and get help from other aiogram developers.', href: links.chat },
      { icon: 'megaphone', title: 'News channel', handle: '@aiogram_live', text: 'Releases, announcements and Bot API updates.', href: links.channel },
      { icon: 'github', title: 'GitHub', handle: 'Issues & discussions', text: 'Report bugs, request features and discuss ideas.', href: links.discussions },
    ],
    sponsor: {
      text: 'aiogram is free, open source and maintained by volunteers.',
      link: { label: 'Support the project', href: '/sponsors/' },
    },
  },
} as const;

export const ecosystem = {
  title: site.title('Ecosystem'),
  description:
    'Curated community libraries built on aiogram: dialogs and UI, i18n, storages, testing tools, integrations and project templates.',
  heading: 'Ecosystem',
  intro:
    'Libraries built by the community on top of aiogram.',
  add: { label: 'Add your library', href: links.editEcosystem },
  empty: 'No libraries are listed yet. Be the first to add yours.',
  filter: { legend: 'Filter by category', all: 'All' },
  categories: {
    ui: 'UI & dialogs',
    i18n: 'Internationalization',
    storage: 'Storage & FSM backends',
    testing: 'Testing',
    integrations: 'Integrations',
    utilities: 'Utilities',
    templates: 'Project templates',
  },
  labels: { repo: 'Repository', pypi: 'PyPI', maintainer: 'Maintained by' },
} as const;

export const showcase = {
  title: site.title('Showcase'),
  description:
    'Companies, products and Telegram bots built with aiogram, the asynchronous Python framework for the Telegram Bot API.',
  heading: 'Showcase',
  intro: 'Companies, products and bots that run aiogram in production.',
  add: { label: 'Add your product', href: links.editShowcase },
  empty: 'No products are listed yet. Running aiogram in production? Add yours.',
  labels: { bot: 'Bot', since: 'Listed since', visit: 'Visit' },
} as const;

/** Submission policy, verbatim from docs/spec.md § 7. Rendered by <Policy />. */
export const policy = {
  title: 'Submission policy',
  intro: 'Accepted entries must:',
  rules: [
    'Be about aiogram: a library built on it (ecosystem), or a company, product or bot that uses it in production (showcase). Showcase entries may be private companies with closed-source projects; open source is not required there.',
    'Ecosystem libraries must be open source (GitHub/GitLab) and published on PyPI, with a release in the last 12 months or a clearly maintained status.',
    'Not be developed, owned or operated by russian, belarusian or iranian individuals, companies or state entities (list may be extended). This applies equally to ecosystem libraries and to showcase companies and their products.',
    'Not be involved in scams, crypto/token schemes, gambling-style "earning" bots or similar.',
    'Not be a fork/duplicate of an already listed project without a distinct purpose.',
    'Submit via PR adding one YAML entry (+ optional logo for showcase). Maintainers may decline or remove entries at their discretion, including entries that stop meeting the policy.',
  ],
} as const;

/** Sentence appended to the lead on /ecosystem/ and /showcase/. */
export const policyNote = {
  before: 'The list is curated — read the ',
  link: { label: 'submission policy', href: '/policy/#listings' },
  after: ' before opening a pull request.',
} as const;

/** A paragraph is a list of parts: plain strings and links. */
type Part = string | { readonly t: string; readonly href: string };

export const policyPage = {
  title: site.title('Policies'),
  description:
    "aiogram's rules for ecosystem and showcase listings, sponsorship, use of the name and logo, community spaces, and licensing.",
  heading: 'Policies',
  intro:
    "How aiogram's lists, sponsorship, brand and community spaces are run. The code itself is MIT-licensed and these rules never restrict using the library.",
  submit: {
    title: 'How to submit',
    items: [
      ['Add a library: open a pull request adding one entry to the ', { t: 'ecosystem list', href: links.editEcosystem }, '.'],
      ['Add a company or product: open a pull request adding one entry to the ', { t: 'showcase list', href: links.editShowcase }, '.'],
    ] as readonly (readonly Part[])[],
    fields: { label: 'Field reference and logo requirements', href: `${links.siteRepo}/blob/main/CONTRIBUTING.md` },
  },
  /** Section 1 (listings) is rendered from `policy` + `submit`; its paragraphs are empty. */
  sections: [
    { id: 'listings', nav: 'Listings', title: 'Ecosystem and showcase listings', paragraphs: [] as readonly (readonly Part[])[] },
    {
      id: 'sponsorship',
      nav: 'Sponsorship',
      title: 'Sponsorship',
      paragraphs: [
        [
          'aiogram accepts sponsorship through ',
          { t: 'Open Collective', href: links.openCollective },
          '. Sponsors are listed on the ',
          { t: 'Sponsors page', href: '/sponsors/' },
          ' by name, with a logo when one is provided.',
        ],
        ['Sponsorship buys no influence: it gives no priority on issues or features, and it is not an endorsement of the sponsor or its products.'],
        ['Maintainers may decline or refund a sponsorship at their discretion, without explanation.'],
      ],
    },
    {
      id: 'brand',
      nav: 'Name and logo',
      title: 'Name and logo',
      paragraphs: [
        [
          "You may use the aiogram name and logo to say that something is built with or compatible with aiogram \u2014 in a tech-stack section, a \u201cbuilt with aiogram\u201d badge, a talk or an article \u2014 as long as the logo is unmodified and links to ",
          { t: 'https://aiogram.dev', href: 'https://aiogram.dev' },
          '.',
        ],
        ['Do not alter the logo, combine it with your own mark, or use it in a way that implies endorsement, partnership or official status.'],
        ['The name and logo may not be used by the individuals, companies or state entities excluded under the community rules below.'],
        ['Logo files: ', { t: 'favicon.svg', href: '/favicon.svg' }],
      ],
    },
    {
      id: 'community',
      nav: 'Community',
      title: 'Community spaces',
      paragraphs: [
        [
          'The Telegram chat, the news channel, GitHub issues and discussions are run by the aiogram maintainers. Be respectful, search before asking, and keep discussions on topic; see the ',
          { t: 'Code of Conduct', href: `${github}/blob/dev-3.x/CODE_OF_CONDUCT.md` },
          ' in the aiogram repository.',
        ],
        ['The same exclusion as for listings applies to participation and support in aiogram-run spaces: individuals, companies and state entities from russia, belarus and iran (list may be extended) are not welcome, and maintainers may remove them without discussion.'],
        ['Security issues go through the ', { t: 'security policy', href: links.security }, ', not the public chat.'],
      ],
    },
    {
      id: 'license',
      nav: 'License',
      title: 'License and contributing',
      paragraphs: [
        [
          'aiogram is released under the ',
          { t: 'MIT License', href: links.license },
          "; these policies govern aiogram's own resources and never restrict how you use the library.",
        ],
        [
          'Code and documentation contributions follow the ',
          { t: 'contributing guide', href: links.contributing },
          ' in the aiogram repository; listing contributions follow the rules above.',
        ],
      ],
    },
  ],
} as const;

export const community = {
  title: site.title('Community'),
  description:
    'Join the aiogram community: Telegram chat and news channel, GitHub discussions and issues, and how to contribute to the framework.',
  heading: 'Community',
  intro: 'aiogram is built in the open. Here is where to ask, follow along and contribute.',
  channels: [
    { icon: 'telegram', title: 'Telegram chat', text: 'Questions, help and discussion with other developers.', href: links.chat },
    { icon: 'megaphone', title: 'News channel', text: 'Releases, announcements and Bot API updates.', href: links.channel },
    { icon: 'message-circle', title: 'GitHub Discussions', text: 'Ideas, proposals and longer-form questions.', href: links.discussions },
    { icon: 'bug', title: 'Issues', text: 'Bug reports and feature requests.', href: links.issues },
    { icon: 'lightbulb', title: 'Contributing guide', text: 'How to set up the project and send a pull request.', href: links.contributing },
    { icon: 'shield', title: 'Security policy', text: 'How to report a vulnerability privately.', href: links.security },
  ],
  ask: {
    title: 'How to ask a good question',
    items: [
      'Search the documentation and the chat history first.',
      'Include your aiogram and Python versions, a minimal code sample and the full traceback.',
      'Describe what you expected to happen and what happened instead.',
    ],
  },
  contribute: {
    title: 'How to contribute',
    items: [
      'Docs: fix typos, clarify guides and add examples.',
      'Translations: help translate the documentation.',
      'Code: pick an issue, read the contributing guide and open a pull request.',
    ],
  },
} as const;

export const sponsors = {
  title: site.title('Sponsors'),
  description:
    'Support aiogram, the open source Python framework for the Telegram Bot API, through Open Collective and help keep it maintained.',
  heading: 'Sponsors',
  why:
    'aiogram is developed by volunteers in their free time. Sponsorship pays for maintenance, keeping up with every Bot API release, documentation and infrastructure, and tells us the framework matters to you.',
  cta: { label: 'Support on Open Collective', href: links.openCollective },
  /** Further sponsorship links, to be provided by the owner. Empty = hide. */
  other: [] as ReadonlyArray<{ label: string; href: string }>,
  listTitle: 'Our sponsors',
} as const;

export const notFound = {
  title: site.title('Page not found'),
  description: 'This page does not exist on aiogram.dev. Head to the documentation or back to the home page.',
  heading: 'Page not found',
  text: 'The page you are looking for does not exist or has moved. Old blog posts now live in the @aiogram_live Telegram channel.',
  home: { label: 'Go to the home page', href: '/' },
  docs: { label: 'Read the documentation', href: links.docs },
} as const;

export const footer = {
  columns: [
    {
      title: 'Project',
      links: [
        { label: 'Documentation', href: links.docs },
        { label: 'GitHub', href: links.github },
        { label: 'PyPI', href: links.pypi },
        { label: 'Releases', href: links.releases },
        { label: 'Changelog', href: links.changelog },
        { label: 'Examples', href: links.examples },
      ],
    },
    {
      title: 'Site',
      links: [
        { label: 'Ecosystem', href: '/ecosystem/' },
        { label: 'Showcase', href: '/showcase/' },
        { label: 'Community', href: '/community/' },
        { label: 'Sponsors', href: '/sponsors/' },
        { label: 'Policies', href: '/policy/' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Telegram chat', href: links.chat },
        { label: 'News channel', href: links.channel },
        { label: 'Discussions', href: links.discussions },
        { label: 'Contributing', href: links.contributing },
        { label: 'Security', href: links.security },
        { label: 'Open Collective', href: links.openCollective },
      ],
    },
  ],
  copyright: 'aiogram',
  license: { label: 'MIT License', href: links.license },
  madeIn: 'Proudly developed in Ukraine 🇺🇦',
  source: { label: 'Site source', href: links.siteRepo },
} as const;

/** Extra page copy for /community/ and /sponsors/ (appended). */
export const pagesExtra = {
  community: {
    talk: { title: 'Talk', text: 'Ask for help and follow what is happening.' },
    contribute: { title: 'Contribute', text: 'Report problems, send fixes and help keep the project safe.' },
  },
  sponsors: {
    cta: 'Sponsor on Open Collective',
    currentTitle: 'Current sponsors',
    thanks: 'Thank you to everyone who supports aiogram.',
    more: 'More ways to sponsor will be listed here soon.',
  },
} as const;

/** Extra landing-page strings and structured-data URLs (used by src/pages/index.astro and src/components/home/). */
export const homeExtra = {
  githubOrg: 'https://github.com/aiogram',
  licenseUrl: 'https://opensource.org/licenses/MIT',
  logoPath: '/favicon.svg',
  badgesLabel: 'Project badges',
  quickStartFull: { label: 'Full quick start in the docs', href: links.docs },
  schema: {
    appDescription: 'Asynchronous Python framework for the Telegram Bot API, built on asyncio and aiohttp.',
  },
} as const;
