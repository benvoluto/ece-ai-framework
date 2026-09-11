# A Framework for Ethical and Constructive Use of AI in Early Childhood Education

A field resource for early childhood providers: what AI can be used for, what it
must never be used for, which law actually governs the data in a given program,
and the documents a provider can adopt today.

**This is an unreviewed working draft.** Nothing on the site has been reviewed by
counsel, no standards body has been convened, and it is not legal advice. The
site says so on every page, and several claims are flagged for verification
against primary sources before publication. See `/about`.

Built from `docs/spec/site-plan-v2.txt`, the extracted text of the site plan and
content specification (working draft v2, 10 September 2026).

---

## Stack

| | |
| --- | --- |
| Framework | [Astro](https://astro.build) 5, static output, Vite |
| Design system | [GOV.UK Design System](https://design-system.service.gov.uk/) via `govuk-frontend` 6 |
| Content | Markdown files in `src/content`, schema-validated at build time |
| Hosting | Vercel |
| Client JS | The intake tool and the GOV.UK component behaviours. Nothing else. |

### On the GOV.UK Design System

`govuk-frontend` is MIT licensed and may be used outside UK government. **The
GOV.UK brand is not.** This site therefore uses the design system's layout,
components, colour palette, grid, focus states and typographic scale, and none
of its brand assets:

- no Royal Arms crest or crown device — the footer rule that would draw one is
  neutralised in `src/styles/_app.scss`, and the asset is never copied into `public/`;
- no GOV.UK wordmark and no `govuk-header` branding;
- no GDS Transport typeface — `$govuk-font-family` is overridden with a system
  stack, which also drops the `@font-face` rules and means providers on poor
  connections download no fonts at all;
- no Open Government Licence text, and nothing implying UK government affiliation.

`scripts/check-build.mjs` fails the build if any of these appear in the output.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # generates artifacts, then builds to dist/
npm run preview      # serve dist/
```

### Checks

```bash
node scripts/validate-content.mjs            # frontmatter, locales, translations
node scripts/validate-content.mjs bright-lines   # one collection
node scripts/check-build.mjs                 # run after a build: links, empty
                                             # pages, brand assets, a11y basics
```

`validate-content.mjs` is read-only and safe to run concurrently, which
`astro build` is not.

---

## Layout

```
src/
  content/          Content collections, one directory per locale:
                    <collection>/en/<slug>.md and <collection>/es/<slug>.md.
                    The two locales of one item MUST share a slug.
  content.config.ts The enforced schema. A bad field fails the build.
  pages/            Routes. English at /x, Spanish at /es/x — both are thin
                    wrappers around src/components/pages/<x>.astro.
  components/pages/ The actual pages, each taking a `locale` prop.
  components/       Shared components (TierTag, Annotation, PrincipleRefs…).
  lib/site.js       Site identity, version, indexability. One place.
  lib/i18n.js       UI chrome strings and locale-aware path helpers.
  lib/intake.js     Tiering logic for the four-question intake. Pure.
  lib/generate-policy.js  Document generation from the intake answers. Pure.
scripts/            Build and check scripts (see above).
docs/spec/          The source specification.
CONVENTIONS.md      The build contract: voice rules, schema rules, licence rules.
```

### Artifacts: one source, three outputs

Each of the sixteen adoptable documents is a single Markdown file in
`src/content/artifacts/<locale>/`. At build time `scripts/build-artifacts.mjs`
generates, into `public/artifacts/`:

- a **`.docx`** a director can open in Word or Google Docs, with every
  `[FILL-IN MARKER]` highlighted yellow so none is missed;
- a **`.md`** for anything else.

Astro renders the same file as the web page, with a print stylesheet so
"save as PDF" produces the document rather than a screenshot of a web page.
The three cannot drift apart, because there is only one source.

`public/artifacts/` is generated and git-ignored. Never hand-write a file there.

---

## Bilingual

Spanish is not a later phase: a third of children ages 0–5 are dual language
learners, and the Language principle makes an English-only launch a
self-contradiction.

Every English file has a Spanish counterpart at the same slug. Spanish files
carry `translationPending: true` and the site renders a visible note saying the
translation awaits review by a native speaker — these are drafts, and saying so
is the point.

`scripts/seed-translations.mjs` creates a Spanish file from the English one as a
placeholder. **A placeholder is not a translation**, so `validate-content.mjs`
fails any Spanish file whose body still matches its English counterpart. No
untranslated file can ship unnoticed.

---

## Before this goes public

1. **Legal review of `/law`.** The crosswalk is the site's most valuable page and
   cannot ship on inference. Two state readings in particular are unresolved:
   whether New York Ed Law 2-d reaches community-based organizations delivering
   publicly funded pre-K, and whether Illinois SOPPA reaches preschool at all.
   State-layer cells the spec does not establish are published empty and flagged
   `needsLegalReview` rather than filled by inference — keep it that way.
2. **Re-verify the short-shelf-life claims** listed on `/about`: the COPPA
   AI-consent boundary, Colorado's statutory churn, the AAP 5 C's framework,
   Head Start rulemaking status, and the vintage of the expulsion data.
3. **Native-speaker review of the Spanish.**
4. **Decide the open questions** in the spec's Section 16 — who convenes, whether
   vendors sit on the body, and what the site's own name is. Until then the home
   page's STANDING module stays absent, because there is nothing truthful to
   put in it.
5. **Then make it findable.** Set `SITE.indexable = true` in `src/lib/site.js`,
   replace `public/robots.txt`, and drop the `X-Robots-Tag` header from
   `vercel.json`. Until then the site is deployed with `noindex`.
