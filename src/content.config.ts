import { defineCollection } from 'astro:content';
import { file, type Loader } from 'astro/loaders';
import { z } from 'astro/zod';

// ponytail: empty lists are valid (their sections hide), so silence file()'s "No items found" warning.
function data(name: string): Loader {
  const loader = file(`src/data/${name}.yml`);
  return {
    ...loader,
    load: (ctx) => {
      const logger = Object.create(ctx.logger);
      logger.warn = (msg: string) => msg.startsWith('No items found') || ctx.logger.warn(msg);
      return loader.load({ ...ctx, logger });
    },
  };
}

const id = z.string().regex(/^[a-z0-9][a-z0-9-]*$/, 'lowercase letters, digits and dashes');
const https = z.string().url().startsWith('https://');
const added = z.coerce.date();

const ecosystem = defineCollection({
  loader: data('ecosystem'),
  schema: z.object({
    id,
    name: z.string().min(1),
    repo: https,
    pypi: z.string().optional(),
    description: z.string().min(1).max(140),
    category: z.enum(['ui', 'i18n', 'storage', 'testing', 'integrations', 'utilities', 'templates']),
    maintainer: z.string().optional(),
    added,
  }),
});

const showcase = defineCollection({
  loader: data('showcase'),
  schema: ({ image }) =>
    z.object({
      id,
      name: z.string().min(1),
      url: https,
      logo: image().optional(),
      logo_dark: image().optional(),
      description: z.string().min(1).max(120),
      bot: z.string().optional(),
      added,
    }),
});

const sponsors = defineCollection({
  loader: data('sponsors'),
  schema: ({ image }) =>
    z.object({
      id,
      name: z.string().min(1),
      url: https,
      logo: image().optional(),
      tier: z.string().optional(),
    }),
});

export const collections = { ecosystem, showcase, sponsors };
