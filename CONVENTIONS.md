# Build conventions

Read this before writing anything. Every agent working on this repo builds to
this contract so that fifteen people produce one site rather than fifteen.

The source of truth for content is `docs/spec/site-plan-v2.txt` — the extracted
text of the working-draft site plan. Section numbers below refer to it.

---

## 1. What this site is

A neutral field resource for early childhood providers on the ethical and
constructive use of AI. The reader is a director of a single child care centre
or a family child care provider, reading this between nap time and pickup, with
no lawyer, no IT department and about twenty minutes. A second, smaller reader
is a multi-site operator or Head Start grantee who does have counsel and needs a
governance structure rather than a longer policy.

Posture: neutral field resource. Not advocacy, not a vendor, not a law firm.

**Everything on this site is an unreviewed working draft.** Nothing has been
through counsel. Never write in a register that implies otherwise.

---

## 2. Voice rules, from the spec's own design constraints

These are not style preferences. They come from Section 01 and they are the
reason the site exists in this shape.

1. **Assume no legal review.** Ship completed language, never instructions to
   draft it. Never write "have your counsel review this" as guidance to a
   single-site provider. (The multi-site track is the one exception, and even
   there give them the language first.)
2. **Assume the reader is the whole organisation.** No RACI charts, no "convene
   your AI governance committee", no "work with your IT department". One person
   is reading this and she is all of those departments.
3. **Assume twenty minutes, not twenty hours.** Short. A policy someone reads,
   signs and dates gets adopted; a forty-page framework gets downloaded once.
4. **Plain language.** Family-facing artifacts sit at a middle-school reading
   level. Prefer short sentences and concrete nouns. Expand every acronym on
   first use in a given page.
5. **Tier by provider capacity as well as by risk.** The same guidance becomes a
   one-page signed document for a family child care home, a six-page policy for
   a centre, and a governance charter with contract riders for a multi-site
   operator. The principles and the bright lines do not change across those
   three. Everything else does.

### Things never to write

- Never name a specific vendor product as good or bad. Section 17 is explicit:
  several AI feature descriptions in the spec come from vendor marketing and
  must be confirmed directly with the vendor before appearing on a public page.
  Describe categories of tool ("an observation and documentation app"), not
  brands.
- Never invent people. No member names, no chair, no funders, no advisers, no
  legal partner. Section 16 leaves who convenes unresolved. Where the spec calls
  for a name, write the structure and leave it visibly unfilled.
- Never invent a statistic, a citation, a docket number or a date. If the spec
  supplies it, use it exactly as given. If it does not, do not reach for one.
- Never present a machine translation as final Spanish. See §7.
- Never overclaim a source. Section 17 names the 2016 Yale eye-tracking study
  specifically: cite it *only* for the attention finding, never for a disparity
  in suspension or expulsion recommendations. Getting this wrong is the easiest
  way to be discredited in front of an audience that knows the literature.

### Provenance is mandatory

Every prohibition and every legal claim carries the statute, regulation or
evidence that makes it defensible, because a director will have to justify it to
an owner or a board. Put it in the `authorities` frontmatter array and state it
in the prose. Where Section 17 flags something as needing re-verification before
publication, set `verifyBeforePublishing` with a one-line note saying what to
check.

---

## 3. Repository layout

```
src/
  content/                 Content collections. Schemas in src/content.config.ts.
    principles/<locale>/<slug>.md
    bright-lines/<locale>/<slug>.md
    good-uses/<locale>/<slug>.md
    cases/<locale>/<slug>.md
    faq/<locale>/<slug>.md
    vendor-questions/<locale>/<slug>.md
    artifacts/<locale>/<slug>.md
    law/<locale>/<slug>.md
    multi-site/<locale>/<slug>.md
    pages/<locale>/<slug>.md      Long-form prose for a route
  pages/                   Astro routes. English at /x, Spanish at /es/x.
  components/              Shared .astro components. See §5.
  layouts/BaseLayout.astro
  lib/site.js              Site identity, version, tiers. Single source of truth.
  lib/i18n.js              UI chrome strings and locale path helpers.
  lib/nav.js               The navigation order.
  styles/main.scss         GOV.UK entry point, configured.
  styles/_app.scss         Site-specific CSS only.
scripts/build-artifacts.mjs   One source → page + .docx + .md.
docs/spec/site-plan-v2.txt    The spec.
```

**The locale is a directory, not a suffix.** `bright-lines/en/emotion-recognition.md`
and `bright-lines/es/emotion-recognition.md` are the same bright line in two
languages and **must share a slug**. The entry `id` is therefore
`en/emotion-recognition`. Code that needs the locale splits on the first `/`.

---

## 4. Frontmatter

`src/content.config.ts` is the contract and it is enforced at build time — a
missing or misspelled field fails the build, so read the schema for your
collection before you write. Every collection shares:

```yaml
title: string          # Required
locale: en | es        # Required, must match the directory
lastUpdated: '2026-09-10'   # Required, quoted, ISO
order: number          # Display order within the collection
translationPending: bool    # Spanish only. See §7.
```

Quote all dates. Use `'2026-09-10'` unless the spec gives a different date for
that item.

Principle ids are a fixed set: `relationship`, `development`, `standing`,
`custody`, `consequence`, `language`, `currency`. Bright lines are numbered
1–8 in the spec's order. Tiers are `0 | 1 | 2 | 3`, where 0 means do not adopt.

---

## 5. Components

Import from `src/components/`. Do not re-implement these.

| Component | Use |
| --- | --- |
| `BaseLayout.astro` | Every page. Props: `title`, `description`, `locale`, `showNav`, `fullWidth`. |
| `PageHeader.astro` | Page title block with caption, lede, version and date stamp. |
| `TierTag.astro` | Any mention of a tier. Props: `tier`, `locale`, `withName`, `link`. |
| `Annotation.astro` | The labelled block used for Returns / Guardrail / At stake / What to do / The basis. Prop: `label`. |
| `PrincipleRefs.astro` | "Governs: Custody · Standing". Props: `ids`, `brightLines`, `locale`. |

Get UI strings from `t(locale, key)` in `src/lib/i18n.js`. Build internal links
with `localePath(locale, '/bright-lines')` — never hardcode `/es/`. If you need
a UI string that does not exist yet, add it to **both** `en` and `es` tables.

---

## 6. Using the GOV.UK Design System

We use `govuk-frontend@6.5.0`. Reach for a design system class before writing
CSS. The common ones: `govuk-heading-l/m/s`, `govuk-body`, `govuk-body-l/s`,
`govuk-list govuk-list--bullet`, `govuk-inset-text`, `govuk-warning-text`,
`govuk-details`, `govuk-accordion`, `govuk-table`, `govuk-tag`, `govuk-button`,
`govuk-summary-list`, `govuk-notification-banner`, `govuk-grid-row` with
`govuk-grid-column-*`, and the `govuk-!-margin-*` / `govuk-!-padding-*` spacing
overrides.

Components with behaviour (`govuk-accordion`, `govuk-details`, `govuk-tabs`,
`govuk-button`) need their `data-module` attribute; `initAll()` already runs in
the layout.

**Rules:**

- Custom CSS goes in `src/styles/_app.scss` under an `app-` prefix, never inline
  `style=` attributes and never a new stylesheet.
- The type scale has **no size 14** in v6. Valid: 16, 19, 24, 27, 36, 48, 80.
- The colour names `light-grey` and `dark-grey` are deprecated. Use
  `govuk-colour("black", $variant: "tint-95")` and `tint-25`.
- Never signal meaning by colour alone. Every tier tag carries its number in
  text so it survives greyscale printing.
- One `<h1>` per page. Do not skip heading levels.

### Licence constraint — read this one twice

`govuk-frontend` is MIT and may be used outside UK government. **The GOV.UK
brand is not.** This site must never display:

- the Royal Arms crest or any crown device (`.govuk-footer__copyright-logo` is
  neutralised in `_app.scss` — do not re-enable it),
- the GOV.UK wordmark or the `govuk-header` component's branding,
- the GDS Transport typeface (we override `$govuk-font-family` with a system
  stack, which also drops the `@font-face` rules),
- the Open Government Licence footer text, or anything implying UK government
  affiliation.

Do not copy `govuk-frontend`'s image assets into `public/`.

---

## 7. Spanish

Spanish is not a later phase. A third of children ages 0–5 are dual language
learners, and the Language principle makes shipping English-only a
self-contradiction on day one.

- Every English file gets a Spanish counterpart at the same slug.
- Write real Spanish, not a gloss. Target US Spanish as spoken by families in
  child care, at a middle-school reading level. Keep US legal and programme
  terms recognisable: leave *Head Start*, *CACFP*, *IFSP*, *IEP*, *COPPA*,
  *FERPA* and *QRIS* untranslated, and gloss them in Spanish on first use.
- Every Spanish file sets `translationPending: true`. The site renders a visible
  note saying the translation awaits review by a native speaker. This is a draft
  translation and must be labelled as one — that honesty is the point.
- Keep `[FILL IN]` markers in Spanish artifacts in Spanish
  (`[NOMBRE DEL PROGRAMA]`), and keep them in square brackets.

---

## 8. Artifacts

Sixteen artifacts, each one source file producing three outputs: the web page,
a `.docx` and a `.md`. `scripts/build-artifacts.mjs` generates the downloads at
build time, so **never** hand-write a file into `public/artifacts/`.

- Fill-in text goes in `[SQUARE BRACKETS], IN CAPITALS`. The generator
  highlights these yellow in Word so they are impossible to miss.
- Write the artifact body as clean Markdown: `##` headings, bullets, ordered
  lists and tables all convert. Avoid raw HTML — it is dropped from the `.docx`.
- Respect the declared `length`. `one-page` means one side of one sheet: roughly
  450 words including headings. If it does not fit, cut it.
- Ship completed language. `[PROGRAM NAME]` is a blank to fill; "describe your
  approach here" is not.

---

## 9. Do not touch

These are owned centrally. Changing them in parallel work causes conflicts:

`src/lib/site.js`, `src/lib/nav.js`, `src/content.config.ts`,
`src/layouts/BaseLayout.astro`, `src/styles/main.scss`, `package.json`,
`astro.config.mjs`, `vercel.json`, `scripts/build-artifacts.mjs`.

Adding keys to `src/lib/i18n.js` and rules to `src/styles/_app.scss` is fine —
append, never restructure.

Do not run `npm install`, and do not add dependencies. Everything needed is
installed.

---

## 10. Verify before you finish

```bash
node scripts/build-artifacts.mjs   # if you touched artifacts
npx astro build                    # must pass with no errors
```

A schema violation fails the build with the file and field named. Fix it rather
than loosening the schema.
