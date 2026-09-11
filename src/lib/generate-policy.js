/**
 * Document generation from the intake answers.
 *
 * Produces two documents, assembled from the answers: a program-specific AI
 * policy, and a matching family notice. The two are generated together and
 * deliberately kept separate — notice is not consent, and conflating them is
 * how programs get into trouble.
 *
 * Output is Markdown. The page renders it for preview, offers it as a .md, and
 * converts it to .docx in the browser on demand. Nothing is sent anywhere; the
 * answers never leave the page.
 */
import { PROVIDER_TYPES, TIER_DEFINITIONS, tierFor, sentenceFor } from './intake.js';

const L = {
  en: {
    policyTitle: 'AI Use Policy',
    noticeTitle: 'Family Notice: How We Use AI',
    draft:
      'WORKING DRAFT — generated from an unreviewed framework. Nothing here has been reviewed by counsel and it is not legal advice.',
    fillIn:
      'Text in [SQUARE BRACKETS] is for you to replace with your own program details.',
    generated: 'Generated',
    forTool: 'This policy covers',
    scope: 'What this covers',
    scopeBody:
      'This policy covers [TOOL OR CATEGORY OF TOOL] at [PROGRAM NAME]. It sits alongside our existing family handbook, staff handbook and privacy commitments, and does not replace them.',
    yourAnswers: 'What we told the framework',
    tierHeading: 'What this means',
    requirements: 'What we will do before and during use',
    neverHeading: 'What we will never use AI for',
    never: [
      'No AI output decides anything about a child. No tool decides enrollment, removal from the program, discipline, or a referral for special services. A person decides, on evidence a person has reviewed.',
      "We do not use tools that infer emotion, affect, or engagement from a child's face, voice, or body.",
      'We do not use AI anywhere in mandated-reporter documentation.',
      'We do not use machine translation for screening-result conversations, IFSP or IEP meetings, child-protection conversations, or eligibility determinations. Those go to a qualified interpreter.',
      'We do not put information naming a child or a family into a tool we have no written agreement with.',
    ],
    reviewHeading: 'Review',
    reviewBody:
      'This policy is reviewed every [12 MONTHS], and again whenever a tool we use ships a new feature. A vendor feature release is an adoption event: we register it and tier it like any other adoption.',
    whoHeading: 'Who to ask',
    whoBody: 'Questions about this policy go to [NAME], [ROLE], at [PHONE] or [EMAIL].',
    signed: 'Signed',
    date: 'Date',
    noticeIntro:
      'We want you to know how [PROGRAM NAME] uses AI tools, what information they touch, and what we will never use them for. This is a notice, not a consent form. If we ever need your permission for something, we will ask you separately and in writing.',
    noticeUse: 'What we use AI for',
    noticeInfo: "What happens to your child's information",
    noticeNever: 'What we never use AI for',
    noticeAsk: 'Questions',
    noticeAskBody:
      'You can ask to see the list of tools we use and the written agreement we have with any of them. Ask [NAME] at [PHONE] or [EMAIL]. Asking will never affect your child’s care.',
    noticeReceipt:
      'Receipt (optional): I received this notice on [DATE]. Signing here records receipt only. It is not permission for anything.',
  },
  es: {
    policyTitle: 'Política de uso de IA',
    noticeTitle: 'Aviso para las familias: cómo usamos la IA',
    draft:
      'BORRADOR DE TRABAJO — generado a partir de un marco sin revisar. Nada de esto ha sido revisado por un abogado y no constituye asesoría legal.',
    fillIn:
      'El texto [ENTRE CORCHETES] es para que usted lo reemplace con los datos de su programa.',
    generated: 'Generado',
    forTool: 'Esta política cubre',
    scope: 'Qué cubre esta política',
    scopeBody:
      'Esta política cubre [HERRAMIENTA O TIPO DE HERRAMIENTA] en [NOMBRE DEL PROGRAMA]. Acompaña a nuestro manual para familias, nuestro manual del personal y nuestros compromisos de privacidad existentes, y no los reemplaza.',
    yourAnswers: 'Lo que le dijimos al marco',
    tierHeading: 'Qué significa esto',
    requirements: 'Qué haremos antes y durante el uso',
    neverHeading: 'Para qué nunca usaremos la IA',
    never: [
      'Ningún resultado de IA decide nada sobre un niño. Ninguna herramienta decide la inscripción, la salida del programa, la disciplina ni una referencia a servicios especiales. Decide una persona, con evidencia que una persona ha revisado.',
      'No usamos herramientas que infieran emociones, afecto o nivel de participación a partir de la cara, la voz o el cuerpo de un niño.',
      'No usamos IA en ninguna parte de la documentación de un reporte obligatorio de sospecha de maltrato.',
      'No usamos traducción automática para conversaciones sobre resultados de evaluaciones, reuniones de IFSP o IEP, conversaciones de protección infantil ni determinaciones de elegibilidad. Esas van con un intérprete calificado.',
      'No ponemos información que identifique a un niño o a una familia en una herramienta con la que no tengamos un acuerdo por escrito.',
    ],
    reviewHeading: 'Revisión',
    reviewBody:
      'Esta política se revisa cada [12 MESES], y otra vez cada vez que una herramienta que usamos lance una función nueva. El lanzamiento de una función por parte de un proveedor es un evento de adopción: lo registramos y lo clasificamos por nivel como cualquier otra adopción.',
    whoHeading: 'A quién preguntar',
    whoBody:
      'Las preguntas sobre esta política van a [NOMBRE], [PUESTO], al [TELÉFONO] o [CORREO ELECTRÓNICO].',
    signed: 'Firma',
    date: 'Fecha',
    noticeIntro:
      'Queremos que usted sepa cómo [NOMBRE DEL PROGRAMA] usa herramientas de IA, qué información tocan y para qué nunca las usaremos. Esto es un aviso, no un formulario de consentimiento. Si alguna vez necesitamos su permiso para algo, se lo pediremos por separado y por escrito.',
    noticeUse: 'Para qué usamos la IA',
    noticeInfo: 'Qué pasa con la información de su hijo o hija',
    noticeNever: 'Para qué nunca usamos la IA',
    noticeAsk: 'Preguntas',
    noticeAskBody:
      'Usted puede pedir ver la lista de herramientas que usamos y el acuerdo por escrito que tenemos con cualquiera de ellas. Pregúntele a [NOMBRE] al [TELÉFONO] o [CORREO ELECTRÓNICO]. Preguntar nunca afectará el cuidado de su hijo o hija.',
    noticeReceipt:
      'Acuse de recibo (opcional): recibí este aviso el [FECHA]. Firmar aquí solo deja constancia de que lo recibí. No es permiso para nada.',
  },
};

const PROVIDER_EXTRAS = {
  en: {
    fcc: [
      'Because this program is one person, the approval step in this policy is the same person who signs it. That is intentional, and it is not a weakness — it means every adoption decision has a name on it.',
    ],
    center: [
      'The director approves any tool that touches child or family information before it is used, and records the decision in the Approved Tools Register.',
    ],
    'multi-site': [
      'Approval authority is delegated: site directors approve Tier 1 tools without asking. A named role approves Tier 2. A small group approves Tier 3 in writing, with the regulatory crosswalk in front of them. Delegation is not a loosening — without it, everything queues behind one person and staff route around the queue.',
      'No site adopts a Tier 2 or Tier 3 tool that is not on the single organization-wide register.',
      'A named role is the escalation point when a tool does something unexpected. The name is [NAME], reachable at [PHONE].',
      'Where this organization has delegate agencies, the register, the contract terms and the escalation path reach across that boundary.',
    ],
    intermediary: [
      "This organization's own AI use makes decisions about providers, not about children, and carries its own standard. AI may route support. It may never determine sanctions, funding denials, or portfolio exits, and every provider can see what a system says about them and contest it.",
    ],
  },
  es: {
    fcc: [
      'Como este programa es una sola persona, el paso de aprobación de esta política es la misma persona que la firma. Es intencional y no es una debilidad: significa que cada decisión de adopción tiene un nombre.',
    ],
    center: [
      'La directora o el director aprueba cualquier herramienta que toque información de niños o familias antes de usarla, y anota la decisión en el Registro de Herramientas Aprobadas.',
    ],
    'multi-site': [
      'La autoridad de aprobación está delegada: los directores de cada sede aprueban las herramientas de Nivel 1 sin pedir permiso. Un puesto designado aprueba el Nivel 2. Un grupo pequeño aprueba el Nivel 3 por escrito, con el mapa regulatorio a la vista. Delegar no es aflojar: sin delegación todo se acumula detrás de una sola persona y el personal busca la manera de esquivar la fila.',
      'Ninguna sede adopta una herramienta de Nivel 2 o Nivel 3 que no esté en el registro único de toda la organización.',
      'Un puesto designado es el punto de escalamiento cuando una herramienta hace algo inesperado. El nombre es [NOMBRE], y se le localiza al [TELÉFONO].',
      'Donde esta organización tenga agencias delegadas, el registro, los términos del contrato y la ruta de escalamiento cruzan esa frontera.',
    ],
    intermediary: [
      'El uso de IA de esta organización toma decisiones sobre proveedores, no sobre niños, y tiene su propio estándar. La IA puede dirigir apoyo. Nunca puede determinar sanciones, negaciones de financiamiento ni salidas del portafolio, y cada proveedor puede ver lo que un sistema dice sobre él y refutarlo.',
    ],
  },
};

function bullets(items) {
  return items.map((i) => `- ${i}`).join('\n');
}

/**
 * @param {object} state  the completed intake answers
 * @param {string} locale
 * @param {string} today  ISO date, passed in so this stays pure
 * @returns {{policy: string, notice: string, tier: 0|1|2|3}}
 */
export function generateDocuments(state, locale = 'en', today = '') {
  const s = L[locale] ?? L.en;
  const tier = tierFor(state);
  const def = (TIER_DEFINITIONS[tier][locale] ?? TIER_DEFINITIONS[tier].en) || {};
  const provider = PROVIDER_TYPES.find((p) => p.id === state.provider);
  const providerLabel = provider ? provider[locale] ?? provider.en : '';
  const extras = (PROVIDER_EXTRAS[locale] ?? PROVIDER_EXTRAS.en)[state.provider] ?? [];
  const stamp = today ? `${s.generated}: ${today}` : '';

  const policy = [
    `# ${s.policyTitle}`,
    '',
    `**[PROGRAM NAME]** — ${providerLabel}`,
    stamp,
    '',
    `> ${s.draft}`,
    `> ${s.fillIn}`,
    '',
    `## ${s.scope}`,
    '',
    s.scopeBody,
    '',
    `## ${s.yourAnswers}`,
    '',
    sentenceFor(state, locale),
    '',
    `## ${s.tierHeading}`,
    '',
    `**${def.name}.** ${def.scope}`,
    '',
    `## ${s.requirements}`,
    '',
    bullets([...(def.returns ?? []), ...extras]),
    '',
    `## ${s.neverHeading}`,
    '',
    bullets(s.never),
    '',
    `## ${s.reviewHeading}`,
    '',
    s.reviewBody,
    '',
    `## ${s.whoHeading}`,
    '',
    s.whoBody,
    '',
    '---',
    '',
    `${s.signed}: [__________________________]`,
    '',
    `${s.date}: [__________]`,
    '',
  ].join('\n');

  const useLines =
    tier === 1
      ? locale === 'es'
        ? ['Redactar textos de rutina, como boletines, menús y avisos.', 'Papeleo administrativo y horarios.']
        : ['Drafting routine writing such as newsletters, menus and notices.', 'Administrative paperwork and scheduling.']
      : locale === 'es'
        ? [
            'Redactar textos de rutina, como boletines, menús y avisos.',
            'Traducir comunicaciones de rutina al idioma de su hogar.',
            'Papeleo del programa que puede incluir el nombre de su hijo o hija, como facturación o registros de inscripción.',
          ]
        : [
            'Drafting routine writing such as newsletters, menus and notices.',
            "Translating routine communication into your family's home language.",
            "Program paperwork that may include your child's name, such as billing or enrollment records.",
          ];

  const infoLines =
    tier >= 2
      ? locale === 'es'
        ? [
            'Tenemos un acuerdo por escrito con cada herramienta que toca información sobre su hijo o hija. Usted puede pedir verlo.',
            'Las herramientas que usamos están en una lista que usted puede pedir en cualquier momento.',
            'No permitimos que ninguna empresa use las imágenes, la voz, los trabajos ni los registros de su hijo o hija para entrenar su IA. Si eso llegara a cambiar, se lo pediríamos primero, por separado y por escrito.',
          ]
        : [
            "We have a written agreement with every tool that touches information about your child. You may ask to see it.",
            'The tools we use are on a list you may ask to see at any time.',
            "We do not allow any company to use your child's images, voice, work, or records to train their AI. If that ever changes, we will ask you first, separately and in writing.",
          ]
      : locale === 'es'
        ? [
            'Las herramientas que usamos para este trabajo no reciben el nombre de su hijo o hija ni información sobre su familia.',
            'Las herramientas que usamos están en una lista que usted puede pedir en cualquier momento.',
          ]
        : [
            "The tools we use for this work do not receive your child's name or information about your family.",
            'The tools we use are on a list you may ask to see at any time.',
          ];

  const notice = [
    `# ${s.noticeTitle}`,
    '',
    `**[PROGRAM NAME]**`,
    stamp,
    '',
    `> ${s.draft}`,
    `> ${s.fillIn}`,
    '',
    s.noticeIntro,
    '',
    `## ${s.noticeUse}`,
    '',
    bullets(useLines),
    '',
    `## ${s.noticeInfo}`,
    '',
    bullets(infoLines),
    '',
    `## ${s.noticeNever}`,
    '',
    bullets(s.never.slice(0, 4)),
    '',
    `## ${s.noticeAsk}`,
    '',
    s.noticeAskBody,
    '',
    '---',
    '',
    s.noticeReceipt,
    '',
    `[__________________________]   [__________]`,
    '',
  ].join('\n');

  return { policy, notice, tier };
}
