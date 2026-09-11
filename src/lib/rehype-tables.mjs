/**
 * Markdown tables, made accessible and phone-safe at build time.
 *
 * Markdown gives no way to set a header cell's scope or to wrap a table in a
 * scroll container, and the fillable registers run to eight columns — wide
 * enough to scroll the whole page sideways on a phone without one.
 *
 * Doing this in rehype rather than in client script means it works with
 * JavaScript turned off, which matters for the audience this site is for.
 *
 * CACHE TRAP. Astro's content layer caches rendered markdown in
 * node_modules/.astro/data-store.json. Editing this file does NOT invalidate
 * that cache, so a change here appears to do nothing until you run
 * `npm run clean` (or delete node_modules/.astro) and rebuild.
 */
import { visit } from 'unist-util-visit';

export function rehypeAccessibleTables() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === null) return;

      // Already wrapped (a second pass, or hand-authored markup).
      if (parent.type === 'element' && parent.properties?.className?.includes?.('app-table-wrapper')) {
        return;
      }

      // Header cells need a scope to be unambiguous to a screen reader.
      visit(node, 'element', (cell, _i, cellParent) => {
        if (cell.tagName !== 'th') return;
        if (cell.properties?.scope) return;
        const inHead = cellParent?.type === 'element' && cellParent.tagName === 'tr';
        cell.properties = { ...cell.properties, scope: inHead ? 'col' : 'row' };
      });

      // A focusable container, scrollable from the keyboard.
      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: {
          // tabindex makes the container scrollable from the keyboard, which is
          // the whole point. No role or aria-label: Astro gives content files no
          // vfile path, so the locale cannot be resolved here, and an English
          // label on a Spanish page is worse than no label at all.
          className: ['app-table-wrapper'],
          tabIndex: 0,
        },
        children: [node],
      };
      return ['skip'];
    });
  };
}

export default rehypeAccessibleTables;
