/**
 * Generate src/lib/artifact-index.js from the artifacts' own frontmatter.
 *
 * The intake tool runs in the browser and cannot read content collections, so
 * it used to carry its own hardcoded list of which artifact applies to whom.
 * That list drifted from the frontmatter the artifact pages and /policies
 * render, and the site started handing readers documents whose own header said
 * they did not apply.
 *
 * Generating the index removes the second source of truth. The frontmatter is
 * the only place applicability is declared; everything else reads this file.
 *
 *   node scripts/build-artifact-index.mjs
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src/content/artifacts');
const OUT = path.join(ROOT, 'src/lib/artifact-index.js');

async function main() {
  const index = {};

  for (const locale of ['en', 'es']) {
    const dir = path.join(SRC, locale);
    if (!existsSync(dir)) continue;
    for (const file of (await readdir(dir)).filter((f) => f.endsWith('.md'))) {
      const slug = file.replace(/\.md$/, '');
      const { data } = matter(await readFile(path.join(dir, file), 'utf8'));
      index[slug] ??= { slug, title: {}, audience: {} };
      index[slug].title[locale] = data.title;
      index[slug].audience[locale] = data.audience;
      // Applicability is declared once, in the English file, and shared.
      if (locale === 'en') {
        index[slug].forWhom = data.forWhom ?? [];
        index[slug].tiers = data.tiers ?? [];
        index[slug].order = data.order ?? 99;
        index[slug].onShelf = data.onShelf ?? false;
        index[slug].shelfOrder = data.shelfOrder ?? 99;
        index[slug].phase = data.phase ?? 1;
      }
    }
  }

  const entries = Object.values(index).sort((a, b) => a.order - b.order);

  const body = `/**
 * GENERATED FILE — do not edit.
 *
 * Written by scripts/build-artifact-index.mjs from the frontmatter of
 * src/content/artifacts/<locale>/*.md. Change applicability there, not here.
 *
 * This exists so the intake tool, which runs in the browser and cannot read
 * content collections, routes readers using the same declarations that
 * /policies and the artifact pages render.
 */
export const ARTIFACTS = ${JSON.stringify(entries, null, 2)};

/** Look up one artifact by slug. */
export function artifact(slug) {
  return ARTIFACTS.find((a) => a.slug === slug);
}

/** The artifact's title in a locale, falling back to English then the slug. */
export function artifactTitle(slug, locale = 'en') {
  const found = artifact(slug);
  return found?.title?.[locale] ?? found?.title?.en ?? slug;
}
`;

  await writeFile(OUT, body, 'utf8');
  console.log(`artifact index: ${entries.length} artifacts → src/lib/artifact-index.js`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
