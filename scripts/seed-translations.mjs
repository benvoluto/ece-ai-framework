/**
 * Seed a Spanish file for every English content file.
 *
 * The Spanish copy starts as the English one with `locale: es` and
 * `translationPending: true`, so the routes build and translators have a file
 * to work in. It is NOT a translation, and shipping one of these as if it were
 * would be the exact failure the Language principle warns about — so
 * `scripts/validate-content.mjs` treats a Spanish file whose body still matches
 * its English counterpart as an error.
 *
 *   node scripts/seed-translations.mjs          # only create what is missing
 *   node scripts/seed-translations.mjs --force  # overwrite existing Spanish files
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'src/content');
const FORCE = process.argv.includes('--force');

function toSpanishFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return null;
  let fm = match[1];
  const body = source.slice(match[0].length);

  fm = fm.replace(/^locale:.*$/m, 'locale: es');
  if (!/^locale:/m.test(fm)) fm = `locale: es\n${fm}`;

  if (/^translationPending:.*$/m.test(fm)) {
    fm = fm.replace(/^translationPending:.*$/m, 'translationPending: true');
  } else {
    fm = `${fm}\ntranslationPending: true`;
  }

  return `---\n${fm}\n---\n${body}`;
}

async function main() {
  const collections = (await readdir(CONTENT, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let created = 0;
  let skipped = 0;

  for (const collection of collections) {
    const enDir = path.join(CONTENT, collection, 'en');
    const esDir = path.join(CONTENT, collection, 'es');
    if (!existsSync(enDir)) continue;
    await mkdir(esDir, { recursive: true });

    for (const file of (await readdir(enDir)).filter((f) => f.endsWith('.md'))) {
      const target = path.join(esDir, file);
      if (existsSync(target) && !FORCE) {
        skipped++;
        continue;
      }
      const source = await readFile(path.join(enDir, file), 'utf8');
      const seeded = toSpanishFrontmatter(source);
      if (!seeded) {
        console.error(`✗ ${collection}/en/${file}: no frontmatter found`);
        process.exitCode = 1;
        continue;
      }
      await writeFile(target, seeded, 'utf8');
      created++;
    }
  }

  console.log(`Seeded ${created} Spanish file(s); left ${skipped} existing file(s) alone.`);
  if (created) {
    console.log('These are placeholders, not translations. validate-content.mjs will fail');
    console.log('any Spanish file whose body still matches its English counterpart.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
