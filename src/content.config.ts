import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const LOCALE = z.enum(['en', 'es']);
const TIER = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]);
const PRINCIPLE = z.enum([
  'relationship',
  'development',
  'standing',
  'custody',
  'consequence',
  'language',
  'currency',
]);
const PROVIDER_TYPE = z.enum(['fcc', 'center', 'multi-site', 'intermediary']);

/** Every content file carries these. Provenance is not optional on this site. */
const base = {
  title: z.string(),
  locale: LOCALE.default('en'),
  /** Set when the Spanish draft still needs a native-speaker pass. */
  translationPending: z.boolean().default(false),
  lastUpdated: z.string(),
  order: z.number().default(99),
};

/** Seven named principles: one word plus a claim in the imperative. */
const principles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/principles' }),
  schema: z.object({
    ...base,
    /** The one-word name, e.g. "Relationship". */
    name: z.string(),
    /** The imperative claim, e.g. "Use AI to return adult attention to children." */
    claim: z.string(),
    id: PRINCIPLE,
    /** Spec flags Currency as the cut candidate if seven feels long. */
    cutCandidate: z.boolean().default(false),
  }),
});

/** Eight prohibited uses. Each pairs a rule with its legal or evidentiary basis. */
const brightLines = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/bright-lines' }),
  schema: z.object({
    ...base,
    number: z.number().int().min(1).max(8),
    /** The prohibition itself, stated as a rule. Kept quotable. */
    rule: z.string(),
    /** Shown on the home page module and in the /start screener. */
    shortRule: z.string(),
    governs: z.array(PRINCIPLE).default([]),
    /** Where the prohibition comes from: statute, regulation, or evidence. */
    authorities: z.array(z.string()).default([]),
    /** Spec Section 17: items whose vintage must be re-checked before publishing. */
    verifyBeforePublishing: z.string().optional(),
  }),
});

/** Twelve constructive uses, with the tier and the guardrail on every one. */
const goodUses = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/good-uses' }),
  schema: z.object({
    ...base,
    tier: TIER,
    audience: z.enum(['provider', 'intermediary']),
    /** The situation, in one or two sentences of concrete scene-setting. */
    scenario: z.string(),
    /** What it returns: hours, dollars, or both. */
    returns: z.string(),
    guardrail: z.string(),
    governs: z.array(PRINCIPLE).default([]),
    /**
     * The rule that keeps the page honest: what the programme actually did
     * with the time. Must come from a real pilot, never a vendor case study.
     */
    whatTheyDidWithTheTime: z.string().optional(),
    /** One-line version for the home page module. */
    homeSummary: z.string().optional(),
    featuredOnHome: z.boolean().default(false),
    /** Spec Section 15: six of the twelve ship in phase 1. */
    phase: z.number().int().min(1).max(3).default(1),
  }),
});

/** Worked vignettes: the situation, what is at stake, what to do, what governs. */
const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: z.object({
    ...base,
    /** The situation, as a director would encounter it. */
    situation: z.string(),
    atStake: z.string(),
    whatToDo: z.string(),
    governs: z.array(PRINCIPLE).default([]),
    brightLines: z.array(z.number().int()).default([]),
    tier: TIER.optional(),
    settings: z.array(PROVIDER_TYPE).default([]),
    status: z.enum(['drafted', 'to-draft']).default('drafted'),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/faq' }),
  schema: z.object({
    ...base,
    question: z.string(),
    /** Four of thirteen surface as the home page preview module. */
    onHome: z.boolean().default(false),
    homeOrder: z.number().optional(),
  }),
});

const vendorQuestions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/vendor-questions' }),
  schema: z.object({
    ...base,
    number: z.number().int().min(1).max(10),
    /** Written as a question to ask, never as a criterion to score. */
    question: z.string(),
    /** Why this question, and what a real answer looks like. */
    whyItMatters: z.string(),
    authorities: z.array(z.string()).default([]),
    governs: z.array(PRINCIPLE).default([]),
  }),
});

/** The sixteen artifacts. Each renders as a page, a .docx and a .md. */
const artifacts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/artifacts' }),
  schema: z.object({
    ...base,
    /** Audience label, e.g. "Family child care · Single site". */
    audience: z.string(),
    forWhom: z.array(PROVIDER_TYPE).default([]),
    summary: z.string(),
    version: z.string().default('Working draft v2'),
    /** Physical target, so print CSS and the docx generator agree. */
    length: z.enum(['one-page', 'short', 'long', 'fillable']).default('short'),
    /** Fillable artifacts render as a form/table rather than prose. */
    fillable: z.boolean().default(false),
    tiers: z.array(TIER).default([]),
    governs: z.array(PRINCIPLE).default([]),
    /** Surfaced in the home page shelf module. Four artifacts do the most work. */
    onShelf: z.boolean().default(false),
    shelfOrder: z.number().optional(),
    phase: z.number().int().min(1).max(3).default(1),
    /** The Spanish counterpart's id, if one exists. */
    counterpart: z.string().optional(),
  }),
});

/** The regulatory crosswalk: setting by setting, then the state layer. */
const law = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/law' }),
  schema: z.object({
    ...base,
    kind: z.enum(['setting', 'finding', 'state', 'open-question']),
    /** For kind: "setting" — does FERPA apply here? */
    ferpa: z.enum(['yes', 'no', 'not-directly', 'depends']).optional(),
    /** What governs instead. */
    governsInstead: z.array(z.string()).default([]),
    /** For kind: "state" — the two-letter code. */
    stateCode: z.string().length(2).optional(),
    needsLegalReview: z.boolean().default(false),
    authorities: z.array(z.string()).default([]),
  }),
});

/** The nine additions that only make sense above a certain size. */
const multiSite = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/multi-site' }),
  schema: z.object({
    ...base,
    number: z.number().int().optional(),
    kind: z.enum(['failure-mode', 'addition', 'module']).default('addition'),
    summary: z.string(),
    relatedArtifacts: z.array(z.string()).default([]),
  }),
});

/** Long-form prose pages: home intro, about, recommendations, intermediaries, etc. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    ...base,
    /** Locale-less route this page's prose belongs to, e.g. "/intermediaries". */
    route: z.string(),
    description: z.string().default(''),
    lede: z.string().optional(),
  }),
});

export const collections = {
  principles,
  brightLines,
  goodUses,
  cases,
  faq,
  vendorQuestions,
  artifacts,
  law,
  multiSite,
  pages,
};
