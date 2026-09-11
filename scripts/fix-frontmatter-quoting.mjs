/**
 * Quote frontmatter scalars that YAML cannot parse unquoted.
 *
 * Spanish prose uses the colon far more freely than English does, and an
 * unquoted YAML scalar containing ": " is a parse error — so a perfectly good
 * translation fails the build on punctuation. This quotes those values and
 * leaves everything else alone.
 *
 *   node scripts/fix-frontmatter-quoting.mjs --check   # report only
 *   node scripts/fix-frontmatter-quoting.mjs
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'src/content');
const CHECK = process.argv.includes('--check');

/** Values needing quotes: contain ": ", end with ":", or start with a YAML indicator. */
function needsQuoting(value) {
  if (/^\s*['"[{|>]/.test(value)) return false; // already quoted, flow, or block scalar
  if (/:\s/.test(value)) return true;
  if (/:$/.test(value.trim())) return true;
  if (/^\s*[-?]\s/.test(value)) return true;
  if (/\s#\s/.test(value)) return true;
  return false;
}

function quote(value) {
  const trimmed = value.trim();
  // Single quotes are the least surprising in YAML; escape by doubling.
  return `'${trimmed.replace(/'/g, "''")}'`;
}

function repair(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { source, changed: [] };

  const lines = match[1].split('\n');
  const changed = [];
  let inBlock = false;

  const out = lines.map((line) => {
    // Leave block scalars and list items alone.
    if (inBlock) {
      if (/^\s/.test(line) || line === '') return line;
      inBlock = false;
    }
    if (/^\s+-\s/.test(line)) return line;

    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s(.+)$/);
    if (!kv) {
      if (/^[A-Za-z_][A-Za-z0-9_]*:\s*[|>]/.test(line)) inBlock = true;
      return line;
    }

    const [, key, value] = kv;
    if (!needsQuoting(value)) return line;

    changed.push(key);
    return `${key}: ${quote(value)}`;
  });

  const repaired = `---\n${out.join('\n')}\n---\n${source.slice(match[0].length)}`;
  return { source: repaired, changed };
}

async function main() {
  const collections = (await readdir(CONTENT, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let fixed = 0;
  let broken = 0;

  for (const collection of collections) {
    for (const locale of ['en', 'es']) {
      const dir = path.join(CONTENT, collection, locale);
      if (!existsSync(dir)) continue;

      for (const file of (await readdir(dir)).filter((f) => f.endsWith('.md'))) {
        const full = path.join(dir, file);
        const source = await readFile(full, 'utf8');

        // Only touch files that do not currently parse.
        const fm = source.match(/^---\n([\s\S]*?)\n---/);
        if (!fm) continue;
        try {
          yaml.load(fm[1]);
          continue;
        } catch {
          /* falls through to repair */
        }

        const { source: repaired, changed } = repair(source);
        let stillBroken = false;
        try {
          yaml.load(repaired.match(/^---\n([\s\S]*?)\n---/)[1]);
        } catch (err) {
          stillBroken = true;
          console.error(`✗ ${collection}/${locale}/${file} still will not parse: ${err.message.split('\n')[0]}`);
          broken++;
        }

        if (!stillBroken && changed.length) {
          console.log(`${CHECK ? '·' : '✓'} ${collection}/${locale}/${file} — quoted: ${changed.join(', ')}`);
          if (!CHECK) await writeFile(full, repaired, 'utf8');
          fixed++;
        }
      }
    }
  }

  console.log(`\n${fixed} file(s) ${CHECK ? 'would be' : ''} repaired${broken ? `, ${broken} still broken` : ''}.`);
  if (broken) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
