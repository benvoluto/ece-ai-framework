/**
 * The eleven destinations, in the spec's deliberate order:
 * the front door is a tool, not a manifesto.
 */
export const NAV = [
  { path: '/', key: 'nav.home', inHeader: false },
  { path: '/start', key: 'nav.start' },
  { path: '/principles', key: 'nav.principles' },
  { path: '/good-uses', key: 'nav.goodUses' },
  { path: '/bright-lines', key: 'nav.brightLines' },
  { path: '/law', key: 'nav.law' },
  { path: '/policies', key: 'nav.policies' },
  { path: '/multi-site', key: 'nav.multiSite' },
  { path: '/cases', key: 'nav.cases' },
  { path: '/vendors', key: 'nav.vendors' },
  { path: '/intermediaries', key: 'nav.intermediaries' },
  { path: '/recommendations', key: 'nav.recommendations' },
  { path: '/faq', key: 'nav.faq' },
  { path: '/about', key: 'nav.about' },
];

export const HEADER_NAV = NAV.filter((item) => item.inHeader !== false);
