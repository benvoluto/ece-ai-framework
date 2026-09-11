import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/lib/site.js';
import { rehypeAccessibleTables } from './src/lib/rehype-tables.mjs';

export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap({ filter: () => SITE.indexable })],
  markdown: { rehypePlugins: [rehypeAccessibleTables] },
  build: { format: 'directory', inlineStylesheets: 'auto' },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'mixed-decls', 'slash-div', 'color-functions'],
          loadPaths: ['node_modules'],
        },
      },
    },
  },
});
