/**
 * One-time mechanical refactor: turn single-locale pages into bilingual ones.
 *
 * Each src/pages/<name>.astro becomes src/components/pages/<name>.astro taking
 * a `locale` prop, with two thin wrappers routing to it:
 *
 *   src/pages/<name>.astro      → <Page locale="en" />
 *   src/pages/es/<name>.astro   → <Page locale="es" />
 *
 * This only moves the mechanism. The English prose sitting inside each page
 * still has to be translated by hand — that is the next pass, not this one.
 *
 *   node scripts/localise-pages.mjs --check   # report, change nothing
 *   node scripts/localise-pages.mjs
 */
import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PAGES = path.join(ROOT, 'src/pages');
const COMPONENTS = path.join(ROOT, 'src/components/pages');
const ES = path.join(PAGES, 'es');
const CHECK = process.argv.includes('--check');

/** index is the home page; its wrapper names differ. */
const SKIP = new Set([]);

function rewrite(source, name) {
  let out = source;
  const notes = [];

  // 1. The locale becomes a prop.
  if (/const locale = ['"]en['"];?/.test(out)) {
    out = out.replace(
      /const locale = ['"]en['"];?/,
      "const { locale = 'en' } = Astro.props;",
    );
  } else {
    notes.push('no `const locale = \'en\'` found — locale prop added manually?');
  }

  // 2. Imports move up one directory, except component imports which move down.
  out = out
    .replace(/from '\.\.\/layouts\//g, "from '../../layouts/")
    .replace(/from '\.\.\/lib\//g, "from '../../lib/")
    .replace(/from '\.\.\/components\//g, "from '../");

  // 3. Collection filters hardcoded to English follow the locale instead.
  const before = out;
  out = out
    .replace(/\.id\.startsWith\(['"]en\/['"]\)/g, '.id.startsWith(`${locale}/`)')
    .replace(/\.id === ['"]en\/([a-z0-9-]+)['"]/g, '.id === `${locale}/$1`')
    .replace(/\.replace\(\/\^en\\\/\/, ['"]{2}\)/g, '.replace(new RegExp(`^${locale}/`), "")');
  if (before !== out) notes.push('collection filters now follow the locale');

  // 4. Artifact download paths are per-locale on disk.
  const beforePaths = out;
  out = out
    .replace(/\/artifacts\/en\/\$\{/g, '/artifacts/${locale}/${')
    .replace(/`\/artifacts\/en\//g, '`/artifacts/${locale}/');
  if (beforePaths !== out) notes.push('artifact download paths now per-locale');

  // 5. A hardcoded Spanish cross-link inside the page would fight the switcher.
  if (/localePath\(['"]es['"]/.test(out)) {
    notes.push("contains a hardcoded localePath('es', …) — check it still makes sense in the Spanish page");
  }

  return { out, notes };
}

function wrapper(name, locale, componentName) {
  const rel = locale === 'en' ? '../components/pages' : '../../components/pages';
  return `---\nimport ${componentName} from '${rel}/${name}.astro';\n---\n<${componentName} locale="${locale}" />\n`;
}

function pascal(name) {
  return (
    name
      .split(/[-_]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Page'
  );
}

async function main() {
  const files = (await readdir(PAGES))
    .filter((f) => f.endsWith('.astro'))
    .map((f) => f.replace(/\.astro$/, ''))
    .filter((n) => !SKIP.has(n));

  if (!CHECK) {
    await mkdir(COMPONENTS, { recursive: true });
    await mkdir(ES, { recursive: true });
  }

  const report = [];
  for (const name of files) {
    const src = path.join(PAGES, `${name}.astro`);
    const source = await readFile(src, 'utf8');
    const componentName = pascal(name);
    const { out, notes } = rewrite(source, name);

    report.push({ name, notes });
    if (CHECK) continue;

    await writeFile(path.join(COMPONENTS, `${name}.astro`), out, 'utf8');
    await writeFile(src, wrapper(name, 'en', componentName), 'utf8');
    await writeFile(path.join(ES, `${name}.astro`), wrapper(name, 'es', componentName), 'utf8');
  }

  // The artifact route already handles both locales itself; leave it alone.
  for (const { name, notes } of report) {
    console.log(`${CHECK ? '·' : '✓'} ${name}${notes.length ? `\n    ${notes.join('\n    ')}` : ''}`);
  }
  console.log(`\n${report.length} page(s) ${CHECK ? 'inspected' : 'localised'}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
