/**
 * Post-build checks on dist/.
 *
 * Catches the failures that do not fail `astro build`: a page that rendered but
 * is empty because a collection name was wrong, an internal link pointing at a
 * route that was never generated, a download link with no file behind it, a
 * missing Spanish counterpart, or a UK government brand asset that slipped in.
 *
 *   node scripts/check-build.mjs
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

/** A rendered page below this many characters of body text is almost certainly broken. */
const MIN_TEXT = 600;

const problems = [];
const warnings = [];

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function routeOf(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, '/');
  return '/' + rel.replace(/index\.html$/, '').replace(/\/$/, '');
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('dist/ does not exist. Run `npm run build` first.');
    process.exit(2);
  }

  const files = await walk(DIST);
  const htmlFiles = files.filter((f) => f.endsWith('.html'));
  const routes = new Set(htmlFiles.map(routeOf).map((r) => (r === '' ? '/' : r)));
  const assets = new Set(
    files.map((f) => '/' + path.relative(DIST, f).replace(/\\/g, '/')),
  );

  const pages = [];

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const route = routeOf(file) || '/';
    const text = textOf(html);
    pages.push({ route, text, html });

    // --- Empty or near-empty pages ---
    if (text.length < MIN_TEXT) {
      problems.push(`${route} rendered only ${text.length} characters of text — likely an empty collection or a failed render`);
    }

    // --- Astro / template leakage ---
    if (/\[object Object\]|undefined<\/|>undefined</.test(html)) {
      problems.push(`${route} contains "undefined" or "[object Object]" in the rendered output`);
    }

    // --- UK government brand assets ---
    // The licence-notices page names these deliberately, to state that the site
    // does not use them. Naming them there is the opposite of displaying them,
    // so that one route is exempt from the text check. It is NOT exempt from the
    // asset check below, which is what would actually catch a crest being served.
    const isLicensePage = /^\/(es\/)?licenses$/.test(route);
    if (
      !isLicensePage &&
      /govuk-crest|govuk-logotype|GDS Transport|Open Government Licence|nationalarchives\.gov\.uk/i.test(html)
    ) {
      problems.push(`${route} references a UK government brand asset — we have no right to display these`);
    }
    // An actual crest or logotype file being referenced is a problem anywhere,
    // including on the licence page.
    if (/src=["'][^"']*(govuk-crest|govuk-logotype)[^"']*["']|url\(["']?[^)"']*(govuk-crest|govuk-logotype)/i.test(html)) {
      problems.push(`${route} loads a UK government brand image file`);
    }

    // --- Accessibility basics ---
    const h1s = (html.match(/<h1[\s>]/g) || []).length;
    if (h1s === 0) problems.push(`${route} has no <h1>`);
    if (h1s > 1) warnings.push(`${route} has ${h1s} <h1> elements`);
    if (!/<html[^>]+lang=/.test(html)) problems.push(`${route} has no lang attribute on <html>`);
    const imgs = html.match(/<img(?![^>]*\balt=)[^>]*>/g);
    if (imgs) warnings.push(`${route} has ${imgs.length} <img> without alt`);

    // --- Internal links ---
    for (const match of html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
      const href = match[1].replace(/\/$/, '') || '/';
      if (href.startsWith('/_astro/')) continue;
      const isAsset = /\.[a-z0-9]{2,5}$/i.test(href);
      if (isAsset) {
        if (!assets.has(href)) problems.push(`${route} links to a missing file: ${href}`);
      } else if (!routes.has(href)) {
        problems.push(`${route} links to a route that was not built: ${href}`);
      }
    }
  }

  // --- Bilingual coverage ---
  const enRoutes = [...routes].filter((r) => !r.startsWith('/es') && r !== '/');
  for (const route of enRoutes) {
    if (route.startsWith('/artifacts/')) continue;
    if (!routes.has(`/es${route}`)) warnings.push(`no Spanish counterpart for ${route}`);
  }
  if (!routes.has('/es')) warnings.push('no Spanish home page at /es');

  // --- Artifact downloads ---
  const docx = files.filter((f) => f.endsWith('.docx'));
  const md = files.filter((f) => f.endsWith('.md'));
  if (docx.length === 0) problems.push('no .docx artifacts were generated');
  for (const file of docx) {
    const { size } = await stat(file);
    if (size < 4000) problems.push(`${path.relative(DIST, file)} is only ${size} bytes — probably empty`);
  }

  // --- Report ---
  console.log(`Checked ${htmlFiles.length} page(s), ${docx.length} .docx, ${md.length} .md\n`);
  if (warnings.length) {
    console.log('Warnings:');
    for (const w of [...new Set(warnings)]) console.log(`  ! ${w}`);
    console.log('');
  }
  if (problems.length) {
    console.error('Problems:');
    for (const p of [...new Set(problems)]) console.error(`  ✗ ${p}`);
    console.error(`\n${new Set(problems).size} problem(s).`);
    process.exit(1);
  }
  console.log('✓ No problems found.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
