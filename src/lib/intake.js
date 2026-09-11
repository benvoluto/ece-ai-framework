import { ARTIFACTS } from './artifact-index.js';

/**
 * The four-question intake.
 *
 * A mad-lib rather than a questionnaire: the user completes one sentence from
 * dropdowns, and the guidance behind it stays locked until the sentence is
 * done. Four toggles do the entire tiering job, and every one is answerable
 * without knowing anything about AI.
 *
 * The bright-line screener runs FIRST, before the tiering questions, so a
 * program that lands on a prohibited use never sees implementation guidance
 * at all.
 *
 * Everything here is pure. It runs identically at build time and in the
 * browser, and no answer ever leaves the page.
 */

/** Provider types. The first dropdown matters most for adoption: it tiers by
 *  provider capacity as well as by risk, so the same answer set returns a
 *  one-page document for a home-based provider and a six-page one for a grantee. */
export const PROVIDER_TYPES = [
  {
    id: 'fcc',
    en: 'family child care home',
    es: 'hogar de cuidado infantil familiar',
  },
  {
    id: 'center',
    en: 'center',
    es: 'centro',
  },
  {
    id: 'multi-site',
    en: 'multi-site or Head Start grantee',
    es: 'organización con varias sedes o concesionario de Head Start',
  },
  {
    id: 'intermediary',
    en: 'intermediary',
    es: 'intermediario',
  },
];

/**
 * The four toggles. Each is phrased so that the answer is a fact about the
 * tool, not a judgment about risk.
 */
export const QUESTIONS = [
  {
    id: 'names',
    en: { yes: 'does', no: 'does not' },
    es: { yes: 'sí', no: 'no' },
    enClause: 'see or receive information naming an individual child or family',
    esClause: 've ni recibe información que identifique a un niño o a una familia',
    esClauseYes: 've o recibe información que identifica a un niño o a una familia',
  },
  {
    id: 'biometric',
    en: { yes: 'does', no: 'does not' },
    es: { yes: 'sí', no: 'no' },
    enClause: "capture a child's face, voice, or body",
    esClause: 'capta la cara, la voz ni el cuerpo de un niño',
    esClauseYes: 'capta la cara, la voz o el cuerpo de un niño',
  },
  {
    id: 'decision',
    en: { yes: 'will', no: 'will not' },
    es: { yes: 'sí', no: 'no' },
    enClause: 'inform a decision about a specific child',
    esClause: 'informará ninguna decisión sobre un niño en particular',
    esClauseYes: 'informará una decisión sobre un niño en particular',
  },
  {
    id: 'children',
    en: { yes: 'will', no: 'will not' },
    es: { yes: 'sí', no: 'no' },
    enClause: 'be used directly by children',
    esClause: 'será usado directamente por niños',
    esClauseYes: 'será usado directamente por niños',
  },
];

/**
 * The eight bright lines, as a screener. Short, answerable phrasing; the full
 * rule and its legal basis live on /bright-lines.
 */
export const SCREENER = [
  {
    number: 1,
    en: "Does it infer emotion, affect, engagement, or behavioral risk about a child? Ask directly — this is often buried under the word “insights”.",
    es: '¿Infiere emociones, afecto, nivel de participación o riesgo de conducta sobre un niño? Pregunte directamente: esto suele estar escondido bajo la palabra «insights» o «análisis».',
  },
  {
    number: 2,
    en: 'Would its output be used to expel, suspend, disenroll, or deny enrollment to a child?',
    es: '¿Se usaría su resultado para expulsar, suspender, dar de baja o negar la inscripción de un niño?',
  },
  {
    number: 3,
    en: 'Would its output be the basis for a special education or early intervention referral, without a person independently reviewing the underlying evidence?',
    es: '¿Sería su resultado la base de una referencia a educación especial o intervención temprana, sin que una persona revise de forma independiente la evidencia?',
  },
  {
    number: 4,
    en: 'Would it be used anywhere in mandated-reporter documentation?',
    es: '¿Se usaría en cualquier parte de la documentación de un reporte obligatorio de sospecha de maltrato?',
  },
  {
    number: 5,
    en: 'Would child or family personal information go into it without a written agreement in place — a free or consumer chatbot, for example?',
    es: '¿Entraría información personal de un niño o de una familia sin un acuerdo por escrito, por ejemplo en un chatbot gratuito o de consumo?',
  },
  {
    number: 6,
    en: 'Would it machine-translate an IFSP or IEP meeting, a screening-result conversation, a child-protection conversation, or an eligibility determination?',
    es: '¿Traduciría automáticamente una reunión de IFSP o IEP, una conversación sobre resultados de una evaluación, una conversación de protección infantil o una determinación de elegibilidad?',
  },
  {
    number: 7,
    en: "Would it identify children by face or voice — check-in and out, photo auto-tagging, search — without express, separate, revocable parental consent?",
    es: '¿Identificaría a los niños por su cara o su voz —entrada y salida, etiquetado automático de fotos, búsqueda— sin un consentimiento de los padres expreso, separado y revocable?',
  },
  {
    number: 8,
    en: "Would the vendor train models on children's images, voices, work, or records without separate verifiable parental consent?",
    es: '¿Entrenaría el proveedor sus modelos con imágenes, voces, trabajos o registros de niños sin un consentimiento verificable y separado de los padres?',
  },
];

/** What each tier is, and what it returns. Taken from spec section 04. */
export const TIER_DEFINITIONS = {
  0: {
    en: {
      name: 'Do not adopt',
      scope: 'The tool does something on the bright-lines list.',
      examples: [],
      returns: [
        'Do not adopt this tool, or require in writing that the prohibited function is turned off and cannot be turned back on without your written instruction.',
        'If the function is already running, treat it as an incident: stop the use, document it, and work through the Incident & Discontinuation Protocol.',
        'If a vendor tells you the function is harmless, ask them to put that in writing alongside the bright line it crosses.',
      ],
    },
    es: {
      name: 'No adoptar',
      scope: 'La herramienta hace algo que está en la lista de límites infranqueables.',
      examples: [],
      returns: [
        'No adopte esta herramienta, o exija por escrito que la función prohibida esté desactivada y que no pueda reactivarse sin su instrucción escrita.',
        'Si la función ya está activa, trátelo como un incidente: detenga el uso, documéntelo y siga el Protocolo de Incidentes y Descontinuación.',
        'Si un proveedor le dice que la función es inofensiva, pídale que lo ponga por escrito junto al límite que cruza.',
      ],
    },
  },
  1: {
    en: {
      name: 'Back office, no child or family data',
      scope: 'The tool never sees information naming a child or a family.',
      examples: [
        'Marketing copy',
        'Menus',
        'Newsletters naming no child',
        'Professional development',
        'General grant boilerplate',
        'Staff scheduling against ratio requirements',
      ],
      returns: [
        'Adopt the staff acceptable-use one-pager.',
        'Disclose when AI drafted family-facing text.',
        'A person reviews anything before it is sent.',
      ],
    },
    es: {
      name: 'Administración interna, sin datos de niños ni familias',
      scope: 'La herramienta nunca ve información que identifique a un niño o a una familia.',
      examples: [
        'Textos de mercadeo',
        'Menús',
        'Boletines que no nombran a ningún niño',
        'Desarrollo profesional',
        'Texto general de solicitudes de subvención',
        'Horarios del personal según los requisitos de proporción',
      ],
      returns: [
        'Adopte la hoja de uso aceptable para el personal.',
        'Informe cuando la IA haya redactado un texto dirigido a las familias.',
        'Una persona revisa todo antes de enviarlo.',
      ],
    },
  },
  2: {
    en: {
      name: 'Operations touching child or family data',
      scope: 'The tool sees information naming a child or a family, but produces nothing about an individual child.',
      examples: [
        'Subsidy billing',
        'Enrollment records',
        'Licensing documentation',
        'CACFP reconciliation',
        'Grant narratives containing child vignettes',
        'Family communication and translation',
      ],
      returns: [
        'A written agreement is required before any child or family information goes in.',
        'Enter the tool in your Approved Tools Register.',
        'No consumer chatbots.',
        'Retention and deletion terms in writing.',
        'A disclosure log entry where Head Start applies.',
      ],
    },
    es: {
      name: 'Operaciones que tocan datos de niños o familias',
      scope: 'La herramienta ve información que identifica a un niño o a una familia, pero no produce nada sobre un niño en particular.',
      examples: [
        'Facturación de subsidios',
        'Registros de inscripción',
        'Documentación de licencias',
        'Conciliación de CACFP',
        'Narrativas de subvenciones que contienen viñetas sobre niños',
        'Comunicación con las familias y traducción',
      ],
      returns: [
        'Se requiere un acuerdo por escrito antes de que entre cualquier información de un niño o una familia.',
        'Registre la herramienta en su Registro de Herramientas Aprobadas.',
        'Nada de chatbots de consumo.',
        'Términos de retención y eliminación por escrito.',
        'Una entrada en el registro de divulgaciones donde aplique Head Start.',
      ],
    },
  },
  3: {
    en: {
      name: 'About an individual child, or used by a child',
      scope: 'The tool produces something about a specific child, captures a child, or a child uses it.',
      examples: [
        'Screening and assessment support',
        'Observation narratives',
        'Photo and video portfolios',
        'Behavior tracking',
        'Referral routing',
        'Classroom cameras',
        'Anything a child interacts with',
      ],
      returns: [
        'Full vendor due diligence — all ten questions, answers recorded with dates.',
        'Separate parental consent, not folded into enrollment paperwork or a photo release.',
        'DLL-disaggregated performance evidence from the vendor.',
        'A documented human determination before any output affects a child.',
        'An exit plan agreed before adoption, including what deletion reaches.',
      ],
    },
    es: {
      name: 'Sobre un niño en particular, o usado por un niño',
      scope: 'La herramienta produce algo sobre un niño específico, capta a un niño, o un niño la usa.',
      examples: [
        'Apoyo a evaluaciones y tamizajes',
        'Narrativas de observación',
        'Portafolios de fotos y videos',
        'Seguimiento de conducta',
        'Enrutamiento de referencias',
        'Cámaras en el salón',
        'Cualquier cosa con la que un niño interactúe',
      ],
      returns: [
        'Diligencia debida completa con el proveedor: las diez preguntas, con las respuestas y sus fechas anotadas.',
        'Consentimiento parental separado, no incluido en los papeles de inscripción ni en una autorización de fotos.',
        'Evidencia de desempeño desglosada por estudiantes de dos idiomas (DLL), provista por el proveedor.',
        'Una determinación humana documentada antes de que cualquier resultado afecte a un niño.',
        'Un plan de salida acordado antes de adoptar, incluyendo qué alcanza la eliminación.',
      ],
    },
  },
};

/**
 * The tiering rule.
 *
 * Note what this deliberately does NOT do: it never treats "administrative"
 * as a synonym for safe. Tier 1 is defined by the ABSENCE of child and family
 * data, because in early childhood the back office is where the child data
 * lives — subsidy billing contains family income, immigration-adjacent
 * documentation and custody information, and grant narratives routinely
 * contain child vignettes.
 *
 * @param {{names:boolean, biometric:boolean, decision:boolean, children:boolean}} answers
 * @returns {0|1|2|3}
 */
export function tierFor(answers) {
  if (answers.children || answers.decision || answers.biometric) return 3;
  if (answers.names) return 2;
  return 1;
}

/** Why that tier, in one sentence — so the result never reads as a black box. */
export function tierReason(answers, locale = 'en') {
  const en = {
    children: 'because a child will use it directly',
    decision: 'because it will inform a decision about a specific child',
    biometric: "because it captures a child's face, voice, or body",
    names: 'because it sees information naming an individual child or family',
    none: 'because it never sees information naming an individual child or family',
  };
  const es = {
    children: 'porque un niño lo usará directamente',
    decision: 'porque informará una decisión sobre un niño en particular',
    biometric: 'porque capta la cara, la voz o el cuerpo de un niño',
    names: 'porque ve información que identifica a un niño o a una familia',
    none: 'porque nunca ve información que identifique a un niño o a una familia',
  };
  const table = locale === 'es' ? es : en;
  if (answers.children) return table.children;
  if (answers.decision) return table.decision;
  if (answers.biometric) return table.biometric;
  if (answers.names) return table.names;
  return table.none;
}

/**
 * Which artifacts to hand back, for a provider type at a tier.
 *
 * Applicability is declared once, in each artifact's own frontmatter
 * (forWhom and tiers), and read here from the generated index. It used to be
 * a second hardcoded list, which drifted: the intake returned documents whose
 * own header said they did not apply to the reader.
 *
 * Tier 0 is the exception. A programme that lands on a bright line is not
 * being handed implementation documents — it gets the one document for
 * stopping, which is why that case is listed rather than derived.
 */
const TIER_0_ARTIFACTS = ['incident-discontinuation-protocol'];

/** @returns {string[]} artifact slugs, in the order the documents are numbered. */
export function artifactsFor(providerType, tier) {
  const applies = (a) => {
    // An empty forWhom means it applies to everyone; same for tiers.
    const forThem = !a.forWhom?.length || a.forWhom.includes(providerType);
    const atTier = !a.tiers?.length || a.tiers.includes(tier);
    return forThem && atTier;
  };

  if (tier === 0) {
    return TIER_0_ARTIFACTS.filter((slug) => {
      const found = ARTIFACTS.find((a) => a.slug === slug);
      return found && (!found.forWhom?.length || found.forWhom.includes(providerType));
    });
  }

  return ARTIFACTS.filter(applies).map((a) => a.slug);
}

/**
 * The two or three documents to lead with.
 *
 * artifactsFor() returns everything that applies, which at the larger end is a
 * dozen documents — and a reader with twenty minutes who is handed twelve
 * documents adopts none of them. These are the ones to put in front of her
 * first; the rest stay available behind a disclosure.
 *
 * Every slug here must also be returned by artifactsFor() for that provider
 * type and tier, or the reader is being offered something that does not apply.
 * scripts/test-intake.mjs asserts that.
 */
const LEAD_WITH = {
  fcc: ['one-page-ai-policy', 'staff-acceptable-use-one-pager', 'family-notice'],
  center: ['program-ai-use-policy', 'staff-acceptable-use-one-pager', 'family-notice'],
  'multi-site': ['governance-charter', 'model-contract-rider', 'program-ai-use-policy'],
  intermediary: ['intermediary-ai-practice-standard', 'vendor-question-sheet'],
};

/** Tier-specific documents that lead regardless of provider type. */
const LEAD_WITH_AT_TIER = {
  0: ['incident-discontinuation-protocol'],
  1: [],
  2: ['approved-tools-register', 'vendor-question-sheet'],
  3: ['consent-images-voice-model-training', 'vendor-question-sheet', 'approved-tools-register'],
};

/**
 * @returns {{primary: string[], also: string[]}} the documents to lead with,
 * and everything else that applies.
 */
export function artifactsGrouped(providerType, tier) {
  const applicable = artifactsFor(providerType, tier);
  const wanted = [
    ...(LEAD_WITH_AT_TIER[tier] ?? []),
    ...(LEAD_WITH[providerType] ?? []),
  ];
  const seen = new Set();
  const primary = [];
  for (const slug of wanted) {
    if (applicable.includes(slug) && !seen.has(slug)) {
      seen.add(slug);
      primary.push(slug);
    }
  }
  return { primary, also: applicable.filter((slug) => !seen.has(slug)) };
}

/** The completed sentence, for display and for the generated documents. */
export function sentenceFor(state, locale = 'en') {
  const provider = PROVIDER_TYPES.find((p) => p.id === state.provider);
  const providerLabel = provider ? provider[locale] ?? provider.en : '…';
  if (locale === 'es') {
    const clause = (q, value) =>
      value ? q.esClauseYes : `no ${q.esClause.replace(/^no /, '')}`;
    return (
      `Somos un ${providerLabel} considerando una herramienta que ` +
      `${clause(QUESTIONS[0], state.names)}, ` +
      `${clause(QUESTIONS[1], state.biometric)}, ` +
      `${clause(QUESTIONS[2], state.decision)} y ` +
      `${clause(QUESTIONS[3], state.children)}.`
    );
  }
  return (
    `We are a ${providerLabel} considering a tool that ` +
    `${state.names ? 'does' : 'does not'} ${QUESTIONS[0].enClause}, ` +
    `${state.biometric ? 'does' : 'does not'} ${QUESTIONS[1].enClause}, ` +
    `${state.decision ? 'will' : 'will not'} ${QUESTIONS[2].enClause}, and ` +
    `${state.children ? 'will' : 'will not'} ${QUESTIONS[3].enClause}.`
  );
}

/** True once every dropdown has been answered. Guidance stays locked until then. */
export function isComplete(state) {
  return (
    !!state.provider &&
    typeof state.names === 'boolean' &&
    typeof state.biometric === 'boolean' &&
    typeof state.decision === 'boolean' &&
    typeof state.children === 'boolean'
  );
}

/** Encode/decode the answer set for a shareable result URL. Nothing is sent anywhere. */
export function encodeState(state) {
  const b = (v) => (v ? '1' : '0');
  return `p=${state.provider}&n=${b(state.names)}&b=${b(state.biometric)}&d=${b(state.decision)}&c=${b(state.children)}`;
}

export function decodeState(hash) {
  const params = new URLSearchParams(String(hash || '').replace(/^#/, ''));
  const p = params.get('p');
  if (!p || !PROVIDER_TYPES.some((t) => t.id === p)) return null;
  const bit = (k) => (params.get(k) === '1' ? true : params.get(k) === '0' ? false : undefined);
  const state = {
    provider: p,
    names: bit('n'),
    biometric: bit('b'),
    decision: bit('d'),
    children: bit('c'),
  };
  return isComplete(state) ? state : null;
}
