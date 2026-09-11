/**
 * Single source of truth for site identity, version and posture.
 * Change SITE.shortName here if a short public name is chosen later
 * (the spec's candidate was "Birth to Five AI Standards").
 */
export const SITE = {
  /** Working title, per decision to keep the descriptive title for now. */
  title: 'A Framework for Ethical and Constructive Use of AI in Early Childhood Education',
  /** Used in the masthead where the full title will not fit. */
  shortName: 'AI in Early Childhood',
  /** Placeholder production origin. Update when a domain is registered. */
  url: 'https://ece-ai-framework.vercel.app',
  /**
   * Working draft: nothing on this site has been reviewed by counsel.
   * Set to true only after legal review and a naming/standing decision.
   */
  indexable: false,
  version: 'Working draft v2',
  lastReviewed: '2026-09-10',
  phase: 'Working draft',
  posture: 'Neutral field resource',
  /** Global disclaimer. Rendered in the phase banner and every artifact. */
  disclaimer:
    'This is an unreviewed working draft. Nothing here has been reviewed by counsel and it is not legal advice.',
};

export const LOCALES = ['en', 'es'];
export const DEFAULT_LOCALE = 'en';

/** Tier vocabulary shared by the intake tool, the artifacts and every page. */
export const TIERS = {
  0: { id: 0, key: 'tier-0', colour: 'red' },
  1: { id: 1, key: 'tier-1', colour: 'green' },
  2: { id: 2, key: 'tier-2', colour: 'yellow' },
  3: { id: 3, key: 'tier-3', colour: 'orange' },
};

/** The seven principles, referenced by name across the whole site. */
export const PRINCIPLE_IDS = [
  'relationship',
  'development',
  'standing',
  'custody',
  'consequence',
  'language',
  'currency',
];
