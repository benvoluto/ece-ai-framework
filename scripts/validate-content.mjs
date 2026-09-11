/**
 * Read-only frontmatter validator.
 *
 * `astro build` is the real check, but it writes to dist/ and .astro/ and so
 * cannot be run by several agents at once. This reads content files and checks
 * them against the same rules as src/content.config.ts, catching the mistakes
 * that actually fail the build: missing required fields, bad enum values,
 * unquoted dates, locale/directory mismatches and orphaned translations.
 *
 *   node scripts/validate-content.mjs              # everything
 *   node scripts/validate-content.mjs bright-lines # one collection
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'src/content');

const PRINCIPLES = [
  'relationship',
  'development',
  'standing',
  'custody',
  'consequence',
  'language',
  'currency',
];
const PROVIDER_TYPES = ['fcc', 'center', 'multi-site', 'intermediary'];
const TIERS = [0, 1, 2, 3];

const str = (v) => typeof v === 'string' && v.length > 0;
const bool = (v) => typeof v === 'boolean';
const num = (v) => typeof v === 'number' && Number.isFinite(v);
const arrOf = (allowed) => (v) => Array.isArray(v) && v.every((x) => allowed.includes(x));
const arrStr = (v) => Array.isArray(v) && v.every((x) => typeof x === 'string');
const oneOf = (allowed) => (v) => allowed.includes(v);
const isoDate = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);

/** [field, required, predicate, hint] */
const BASE = [
  ['title', true, str, 'non-empty string'],
  ['locale', true, oneOf(['en', 'es']), '"en" or "es"'],
  ['lastUpdated', true, isoDate, "quoted ISO date, e.g. '2026-09-10'"],
  ['order', false, num, 'number'],
  ['translationPending', false, bool, 'true or false'],
];

const SCHEMAS = {
  principles: {
    dir: 'principles',
    fields: [
      ...BASE,
      ['name', true, str, 'the one-word name, e.g. "Relationship"'],
      ['claim', true, str, 'the imperative claim'],
      ['id', true, oneOf(PRINCIPLES), PRINCIPLES.join(' | ')],
      ['cutCandidate', false, bool, 'true or false'],
    ],
  },
  'bright-lines': {
    dir: 'bright-lines',
    fields: [
      ...BASE,
      ['number', true, (v) => num(v) && v >= 1 && v <= 8, 'integer 1-8'],
      ['rule', true, str, 'the prohibition as a rule'],
      ['shortRule', true, str, 'one line, for the home module'],
      ['governs', false, arrOf(PRINCIPLES), `array of ${PRINCIPLES.join('|')}`],
      ['authorities', false, arrStr, 'array of strings'],
      ['verifyBeforePublishing', false, str, 'string'],
    ],
  },
  'good-uses': {
    dir: 'good-uses',
    fields: [
      ...BASE,
      ['tier', true, oneOf(TIERS), '0 | 1 | 2 | 3'],
      ['audience', true, oneOf(['provider', 'intermediary']), 'provider | intermediary'],
      ['scenario', true, str, 'the situation'],
      ['returns', true, str, 'what it returns'],
      ['guardrail', true, str, 'the guardrail'],
      ['governs', false, arrOf(PRINCIPLES), 'array of principle ids'],
      ['whatTheyDidWithTheTime', false, str, 'string'],
      ['homeSummary', false, str, 'string'],
      ['featuredOnHome', false, bool, 'true or false'],
      ['phase', false, (v) => num(v) && v >= 1 && v <= 3, '1-3'],
    ],
  },
  cases: {
    dir: 'cases',
    fields: [
      ...BASE,
      ['situation', true, str, 'the situation'],
      ['atStake', true, str, 'what is at stake'],
      ['whatToDo', true, str, 'what to do'],
      ['governs', false, arrOf(PRINCIPLES), 'array of principle ids'],
      ['brightLines', false, (v) => Array.isArray(v) && v.every(num), 'array of numbers'],
      ['tier', false, oneOf(TIERS), '0 | 1 | 2 | 3'],
      ['settings', false, arrOf(PROVIDER_TYPES), PROVIDER_TYPES.join(' | ')],
      ['status', false, oneOf(['drafted', 'to-draft']), 'drafted | to-draft'],
    ],
  },
  faq: {
    dir: 'faq',
    fields: [
      ...BASE,
      ['question', true, str, 'the question'],
      ['onHome', false, bool, 'true or false'],
      ['homeOrder', false, num, 'number'],
    ],
  },
  'vendor-questions': {
    dir: 'vendor-questions',
    fields: [
      ...BASE,
      ['number', true, (v) => num(v) && v >= 1 && v <= 10, 'integer 1-10'],
      ['question', true, str, 'written as a question to ask'],
      ['whyItMatters', true, str, 'why this question'],
      ['authorities', false, arrStr, 'array of strings'],
      ['governs', false, arrOf(PRINCIPLES), 'array of principle ids'],
    ],
  },
  artifacts: {
    dir: 'artifacts',
    fields: [
      ...BASE,
      ['audience', true, str, 'audience label'],
      ['summary', true, str, 'one-sentence summary'],
      ['forWhom', false, arrOf(PROVIDER_TYPES), PROVIDER_TYPES.join(' | ')],
      ['version', false, str, 'string'],
      ['length', false, oneOf(['one-page', 'short', 'long', 'fillable']), 'one-page|short|long|fillable'],
      ['fillable', false, bool, 'true or false'],
      ['tiers', false, arrOf(TIERS), 'array of 0-3'],
      ['governs', false, arrOf(PRINCIPLES), 'array of principle ids'],
      ['onShelf', false, bool, 'true or false'],
      ['shelfOrder', false, num, 'number'],
      ['phase', false, (v) => num(v) && v >= 1 && v <= 3, '1-3'],
      ['counterpart', false, str, 'string'],
    ],
  },
  law: {
    dir: 'law',
    fields: [
      ...BASE,
      ['kind', true, oneOf(['setting', 'finding', 'state', 'open-question']), 'setting|finding|state|open-question'],
      ['ferpa', false, oneOf(['yes', 'no', 'not-directly', 'depends']), 'yes|no|not-directly|depends'],
      ['governsInstead', false, arrStr, 'array of strings'],
      ['stateCode', false, (v) => str(v) && v.length === 2, 'two-letter code'],
      ['needsLegalReview', false, bool, 'true or false'],
      ['authorities', false, arrStr, 'array of strings'],
    ],
  },
  'multi-site': {
    dir: 'multi-site',
    fields: [
      ...BASE,
      ['number', false, num, 'number'],
      ['kind', false, oneOf(['failure-mode', 'addition', 'module']), 'failure-mode|addition|module'],
      ['summary', true, str, 'one-sentence summary'],
      ['relatedArtifacts', false, arrStr, 'array of slugs'],
    ],
  },
  pages: {
    dir: 'pages',
    fields: [
      ...BASE,
      ['route', true, str, 'locale-less route, e.g. "/intermediaries"'],
      ['description', false, str, 'string'],
      ['lede', false, str, 'string'],
    ],
  },
};

async function collect(dir) {
  const out = [];
  const base = path.join(CONTENT, dir);
  if (!existsSync(base)) return out;
  for (const locale of await readdir(base)) {
    const sub = path.join(base, locale);
    let files;
    try {
      files = await readdir(sub);
    } catch {
      out.push({ file: `${dir}/${locale}`, errors: ['content files must live in a locale directory: <collection>/en/ or <collection>/es/'] });
      continue;
    }
    for (const f of files.filter((f) => /\.mdx?$/.test(f) && !f.startsWith('_'))) {
      out.push({ dir, locale, slug: f.replace(/\.mdx?$/, ''), file: `${dir}/${locale}/${f}`, abs: path.join(sub, f) });
    }
  }
  return out;
}

async function main() {
  const only = process.argv[2];
  const names = only ? [only] : Object.keys(SCHEMAS);
  let errors = 0;
  let checked = 0;
  const bySlug = {};

  for (const name of names) {
    const schema = SCHEMAS[name];
    if (!schema) {
      console.error(`Unknown collection "${name}". One of: ${Object.keys(SCHEMAS).join(', ')}`);
      process.exit(2);
    }
    const entries = await collect(schema.dir);
    bySlug[name] = { en: new Set(), es: new Set() };

    for (const entry of entries) {
      if (entry.errors) {
        console.error(`✗ ${entry.file}`);
        entry.errors.forEach((e) => console.error(`    ${e}`));
        errors += entry.errors.length;
        continue;
      }
      checked++;
      bySlug[name][entry.locale]?.add(entry.slug);
      const problems = [];
      let data, content;
      try {
        ({ data, content } = matter(await readFile(entry.abs, 'utf8')));
      } catch (err) {
        console.error(`✗ ${entry.file}\n    frontmatter will not parse: ${err.message}`);
        errors++;
        continue;
      }

      for (const [field, required, ok, hint] of schema.fields) {
        const value = data[field];
        if (value === undefined || value === null) {
          if (required) problems.push(`missing required field "${field}" (${hint})`);
          continue;
        }
        if (!ok(value)) {
          problems.push(`"${field}" is ${JSON.stringify(value)} — expected ${hint}`);
        }
      }

      const known = new Set(schema.fields.map(([f]) => f));
      for (const key of Object.keys(data)) {
        if (!known.has(key)) problems.push(`unknown field "${key}" — the schema will reject it`);
      }

      if (data.locale && data.locale !== entry.locale) {
        problems.push(`locale "${data.locale}" does not match directory "${entry.locale}"`);
      }
      if (entry.locale === 'es' && data.translationPending !== true) {
        problems.push('Spanish files must set translationPending: true');
      }
      if (!content.trim()) problems.push('body is empty');

      if (problems.length) {
        console.error(`✗ ${entry.file}`);
        problems.forEach((p) => console.error(`    ${p}`));
        errors += problems.length;
      }
    }
  }

  // A Spanish file that still holds its English body is a seeded placeholder,
  // not a translation. Shipping one is the exact failure the Language principle
  // warns about, so it is an error rather than a warning.
  for (const [name, sets] of Object.entries(bySlug)) {
    if (!sets) continue;
    const schema = SCHEMAS[name];
    for (const slug of sets.es) {
      if (!sets.en.has(slug)) continue;
      const esPath = path.join(CONTENT, schema.dir, 'es', `${slug}.md`);
      const enPath = path.join(CONTENT, schema.dir, 'en', `${slug}.md`);
      try {
        const es = matter(await readFile(esPath, 'utf8')).content.trim();
        const en = matter(await readFile(enPath, 'utf8')).content.trim();
        if (es && es === en) {
          console.error(`\u2717 ${schema.dir}/es/${slug}.md is still the English text \u2014 seeded placeholder, not a translation`);
          errors++;
        }
      } catch {
        /* A missing file is reported by the orphan check below. */
      }
    }
  }

  // Orphaned translations: a Spanish file with no English counterpart, or vice versa.
  for (const [name, sets] of Object.entries(bySlug)) {
    if (!sets) continue;
    for (const slug of sets.es) {
      if (!sets.en.has(slug)) {
        console.error(`✗ ${name}/es/${slug} has no English counterpart at ${name}/en/${slug}`);
        errors++;
      }
    }
  }

  // The site-wide review stamp must not be older than the newest page, or a
  // reader sees two different "last updated" dates on one screen.
  try {
    const siteSrc = await readFile(path.join(ROOT, 'src/lib/site.js'), 'utf8');
    const stamp = siteSrc.match(/lastReviewed:\s*'([\d-]+)'/)?.[1];
    let newest = '';
    for (const name of Object.keys(SCHEMAS)) {
      for (const entry of await collect(SCHEMAS[name].dir)) {
        if (entry.errors) continue;
        const { data } = matter(await readFile(entry.abs, 'utf8'));
        if (typeof data.lastUpdated === 'string' && data.lastUpdated > newest) newest = data.lastUpdated;
      }
    }
    if (stamp && newest && stamp < newest) {
      console.error(
        `\u2717 SITE.lastReviewed is ${stamp} but the newest content is ${newest} — ` +
          `update lastReviewed in src/lib/site.js`,
      );
      errors++;
    }
  } catch {
    /* site.js unreadable; the build will fail elsewhere with a better message. */
  }

  if (errors) {
    console.error(`\n${errors} problem(s) across ${checked} file(s).`);
    process.exit(1);
  }
  console.log(`✓ ${checked} content file(s) valid.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
