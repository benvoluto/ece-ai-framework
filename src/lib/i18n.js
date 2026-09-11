import { DEFAULT_LOCALE, LOCALES } from './site.js';

/** UI chrome strings. Page content lives in src/content, not here. */
export const ui = {
  en: {
    'nav.skip': 'Skip to main content',
    'nav.menu': 'Menu',
    'nav.home': 'Home',
    'nav.start': 'Start here',
    'nav.principles': 'Principles',
    'nav.goodUses': 'Where AI helps',
    'nav.brightLines': 'Bright lines',
    'nav.law': 'What the law says',
    'nav.policies': 'Policies to adopt',
    'nav.multiSite': 'For larger operators',
    'nav.cases': 'Cases',
    'nav.vendors': 'Vendors',
    'nav.intermediaries': 'For intermediaries',
    'nav.recommendations': 'Policy recommendations',
    'nav.faq': 'FAQ',
    'nav.about': 'About & changelog',
    'lang.switch': 'En español',
    'lang.label': 'Language',
    'banner.phase': 'Working draft',
    'banner.text':
      'This is an unreviewed working draft. Nothing here has been reviewed by counsel and it is not legal advice.',
    'tier.0': 'Do not adopt',
    'tier.1': 'Tier 1',
    'tier.2': 'Tier 2',
    'tier.3': 'Tier 3',
    'tier.0.name': 'Do not adopt',
    'tier.1.name': 'Back office, no child or family data',
    'tier.2.name': 'Operations touching child or family data',
    'tier.3.name': 'About an individual child, or used by a child',
    'label.governs': 'Which principle governs',
    'label.atStake': 'What is at stake',
    'label.do': 'What to do',
    'label.returns': 'What it returns',
    'label.guardrail': 'Guardrail',
    'label.basis': 'The basis',
    'label.authority': 'Authority',
    'label.verify': 'Verify before publishing',
    'label.lastUpdated': 'Last updated',
    'label.version': 'Version',
    'label.download': 'Download',
    'label.downloadWord': 'Download for Word (.docx)',
    'label.downloadMd': 'Download as Markdown (.md)',
    'label.print': 'Print or save as PDF',
    'label.spanish': 'Español',
    'label.english': 'English',
    'label.onThisPage': 'Contents',
    'label.relatedArtifacts': 'Take what you need',
    'label.for': 'For',
    'label.readingTime': 'minutes to read',
    'label.translationPending': 'Draft translation, pending review by a native speaker.',
    'artifact.sampleNote':
      'Text in [SQUARE BRACKETS] is for you to replace with your own program details.',
  },
  es: {
    'nav.skip': 'Ir al contenido principal',
    'nav.menu': 'Menú',
    'nav.home': 'Inicio',
    'nav.start': 'Empiece aquí',
    'nav.principles': 'Principios',
    'nav.goodUses': 'Dónde ayuda la IA',
    'nav.brightLines': 'Límites infranqueables',
    'nav.law': 'Lo que dice la ley',
    'nav.policies': 'Políticas para adoptar',
    'nav.multiSite': 'Para operadores grandes',
    'nav.cases': 'Casos',
    'nav.vendors': 'Proveedores',
    'nav.intermediaries': 'Para intermediarios',
    'nav.recommendations': 'Recomendaciones de política pública',
    'nav.faq': 'Preguntas frecuentes',
    'nav.about': 'Acerca de y registro de cambios',
    'lang.switch': 'In English',
    'lang.label': 'Idioma',
    'banner.phase': 'Borrador de trabajo',
    'banner.text':
      'Este es un borrador de trabajo sin revisar. Nada de lo aquí publicado ha sido revisado por un abogado y no constituye asesoría legal.',
    'tier.0': 'No adoptar',
    'tier.1': 'Nivel 1',
    'tier.2': 'Nivel 2',
    'tier.3': 'Nivel 3',
    'tier.0.name': 'No adoptar',
    'tier.1.name': 'Administración interna, sin datos de niños ni familias',
    'tier.2.name': 'Operaciones que tocan datos de niños o familias',
    'tier.3.name': 'Sobre un niño en particular, o usado por un niño',
    'label.governs': 'Qué principio rige',
    'label.atStake': 'Qué está en juego',
    'label.do': 'Qué hacer',
    'label.returns': 'Qué devuelve',
    'label.guardrail': 'Salvaguarda',
    'label.basis': 'El fundamento',
    'label.authority': 'Base legal o evidencia',
    'label.verify': 'Verificar antes de publicar',
    'label.lastUpdated': 'Última actualización',
    'label.version': 'Versión',
    'label.download': 'Descargar',
    'label.downloadWord': 'Descargar para Word (.docx)',
    'label.downloadMd': 'Descargar como Markdown (.md)',
    'label.print': 'Imprimir o guardar como PDF',
    'label.spanish': 'Español',
    'label.english': 'English',
    'label.onThisPage': 'Contenido',
    'label.relatedArtifacts': 'Tome lo que necesite',
    'label.for': 'Para',
    'label.readingTime': 'minutos de lectura',
    'label.translationPending':
      'Traducción preliminar, pendiente de revisión por un hablante nativo.',
    'artifact.sampleNote':
      'El texto [ENTRE CORCHETES] es para que usted lo reemplace con los datos de su programa.',
  },
};

export function t(locale, key) {
  const table = ui[locale] ?? ui[DEFAULT_LOCALE];
  return table[key] ?? ui[DEFAULT_LOCALE][key] ?? key;
}

/** Build a locale-correct href from a locale-less path such as "/bright-lines". */
export function localePath(locale, path = '/') {
  const clean = `/${String(path).replace(/^\/+|\/+$/g, '')}`;
  if (locale === DEFAULT_LOCALE) return clean === '/' ? '/' : clean;
  return clean === '/' ? '/es' : `/es${clean}`;
}

/** Derive the locale from an Astro URL pathname. */
export function localeFromPath(pathname) {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : DEFAULT_LOCALE;
}

/** Strip the locale prefix, so the language switcher can swap sides. */
export function stripLocale(pathname) {
  if (pathname === '/es') return '/';
  if (pathname.startsWith('/es/')) return pathname.slice(3) || '/';
  return pathname || '/';
}


/** Site title in the given locale. Falls back to the English working title. */
export function siteTitle(site, locale) {
  return locale === 'es' ? (site.titleEs ?? site.title) : site.title;
}

/** Version label in the given locale. */
export function siteVersion(site, locale) {
  return locale === 'es' ? (site.versionEs ?? site.version) : site.version;
}

/** Posture line in the given locale. */
export function sitePosture(site, locale) {
  return locale === 'es' ? (site.postureEs ?? site.posture) : site.posture;
}

export { LOCALES, DEFAULT_LOCALE };
