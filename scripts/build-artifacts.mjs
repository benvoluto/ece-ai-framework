/**
 * One source, three outputs.
 *
 * Reads every artifact in src/content/artifacts/<locale>/*.md and emits, into
 * public/artifacts/, a .md copy (frontmatter stripped, fill-in markers intact)
 * and a .docx a director can open in Word or Google Docs and edit. The page
 * itself is rendered by Astro from the same source, so the three cannot drift.
 *
 * Run by `npm run build` before `astro build`.
 */
import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from 'docx';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src/content/artifacts');
const OUT = path.join(ROOT, 'public/artifacts');

const STRINGS = {
  en: {
    fillIn: 'Text in [SQUARE BRACKETS] is for you to replace with your own programme details.',
    draft: 'WORKING DRAFT — NOT REVIEWED BY COUNSEL. This is not legal advice.',
    version: 'Version',
    updated: 'Last updated',
    forWhom: 'For',
  },
  es: {
    fillIn: 'El texto [ENTRE CORCHETES] es para que usted lo reemplace con los datos de su programa.',
    draft: 'BORRADOR DE TRABAJO — NO REVISADO POR UN ABOGADO. No constituye asesoría legal.',
    version: 'Versión',
    updated: 'Última actualización',
    forWhom: 'Para',
  },
};

/** Flatten inline markdown tokens to a docx TextRun list, preserving bold/em and [FILL IN]. */
function inlineRuns(tokens, inherited = {}) {
  const runs = [];
  for (const tok of tokens ?? []) {
    switch (tok.type) {
      case 'strong':
        runs.push(...inlineRuns(tok.tokens, { ...inherited, bold: true }));
        break;
      case 'em':
        runs.push(...inlineRuns(tok.tokens, { ...inherited, italics: true }));
        break;
      case 'codespan':
        runs.push(new TextRun({ text: tok.text, font: 'Consolas', ...inherited }));
        break;
      case 'link':
        runs.push(...inlineRuns(tok.tokens, { ...inherited, style: 'Hyperlink' }));
        break;
      case 'br':
        runs.push(new TextRun({ text: '', break: 1 }));
        break;
      case 'text':
      case 'escape':
      default: {
        const text = decode(tok.raw ?? tok.text ?? '');
        // Highlight [FILL IN] markers so they are impossible to miss in Word.
        const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
        for (const part of parts) {
          const isMarker = /^\[[^\]]+\]$/.test(part);
          runs.push(
            new TextRun({
              text: part,
              ...inherited,
              ...(isMarker ? { highlight: 'yellow', bold: true } : {}),
            }),
          );
        }
      }
    }
  }
  return runs;
}

function decode(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

const HEADINGS = {
  1: HeadingLevel.HEADING_1,
  2: HeadingLevel.HEADING_2,
  3: HeadingLevel.HEADING_3,
  4: HeadingLevel.HEADING_4,
  5: HeadingLevel.HEADING_5,
  6: HeadingLevel.HEADING_6,
};

function blockToDocx(tok, out, depth = 0) {
  switch (tok.type) {
    case 'heading':
      out.push(
        new Paragraph({
          heading: HEADINGS[tok.depth] ?? HeadingLevel.HEADING_3,
          spacing: { before: 240, after: 120 },
          children: inlineRuns(tok.tokens),
        }),
      );
      break;
    case 'paragraph':
      out.push(new Paragraph({ spacing: { after: 160 }, children: inlineRuns(tok.tokens) }));
      break;
    case 'list':
      tok.items.forEach((item, i) => {
        const kids = [];
        for (const sub of item.tokens ?? []) {
          if (sub.type === 'text') kids.push(...inlineRuns(sub.tokens ?? [{ type: 'text', raw: sub.text }]));
          else if (sub.type === 'list') blockToDocx(sub, out, depth + 1);
          else if (sub.type === 'paragraph') kids.push(...inlineRuns(sub.tokens));
        }
        if (item.task) {
          kids.unshift(new TextRun({ text: item.checked ? '[x] ' : '[  ] ', bold: true }));
        }
        out.push(
          new Paragraph({
            children: kids,
            spacing: { after: 80 },
            ...(item.task
              ? { indent: { left: 360 + depth * 360 } }
              : tok.ordered
                ? { numbering: undefined, indent: { left: 360 + depth * 360 }, children: [new TextRun({ text: `${(tok.start || 1) + i}. `, bold: true }), ...kids] }
                : { bullet: { level: depth } }),
          }),
        );
      });
      break;
    case 'blockquote': {
      for (const sub of tok.tokens ?? []) {
        const before = out.length;
        blockToDocx(sub, out, depth);
        for (let i = before; i < out.length; i++) {
          // Visually set quotes apart with an indent.
        }
      }
      break;
    }
    case 'table': {
      const border = { style: BorderStyle.SINGLE, size: 4, color: 'B1B4B6' };
      const borders = { top: border, bottom: border, left: border, right: border };
      const rows = [
        new TableRow({
          tableHeader: true,
          children: tok.header.map(
            (cell) =>
              new TableCell({
                borders,
                shading: { fill: 'F3F2F1' },
                children: [new Paragraph({ children: inlineRuns(cell.tokens, { bold: true }) })],
              }),
          ),
        }),
        ...tok.rows.map(
          (row) =>
            new TableRow({
              children: row.map(
                (cell) =>
                  new TableCell({
                    borders,
                    children: [new Paragraph({ children: inlineRuns(cell.tokens) })],
                  }),
              ),
            }),
        ),
      ];
      out.push(new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } }));
      out.push(new Paragraph({ text: '', spacing: { after: 160 } }));
      break;
    }
    case 'hr':
      out.push(new Paragraph({ text: '', border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'B1B4B6' } }, spacing: { after: 200 } }));
      break;
    case 'space':
      break;
    case 'html':
      break;
    default:
      if (tok.tokens) out.push(new Paragraph({ children: inlineRuns(tok.tokens) }));
      else if (tok.text) out.push(new Paragraph({ text: decode(tok.text) }));
  }
}

async function buildOne(locale, file) {
  const raw = await readFile(path.join(SRC, locale, file), 'utf8');
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, '');
  const s = STRINGS[locale] ?? STRINGS.en;

  // --- .md output (editable plain text, frontmatter stripped) ---
  const mdHeader = [
    `# ${data.title}`,
    '',
    `${s.forWhom}: ${data.audience ?? ''}`,
    `${s.version}: ${data.version ?? 'Working draft v2'} · ${s.updated}: ${data.lastUpdated ?? ''}`,
    '',
    `> ${s.draft}`,
    `> ${s.fillIn}`,
    '',
    '---',
    '',
  ].join('\n');
  await writeFile(path.join(OUT, locale, `${slug}.md`), mdHeader + content.trim() + '\n', 'utf8');

  // --- .docx output ---
  const tokens = marked.lexer(content);
  const children = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      spacing: { after: 120 },
      children: [new TextRun({ text: data.title, bold: true, size: 36 })],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: `${s.forWhom}: ${data.audience ?? ''}`, size: 20, color: '505A5F' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: `${s.version}: ${data.version ?? 'Working draft v2'}  ·  ${s.updated}: ${data.lastUpdated ?? ''}`,
          size: 20,
          color: '505A5F',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      shading: { fill: 'FFF7BF' },
      children: [new TextRun({ text: s.draft, bold: true, size: 20 })],
    }),
    new Paragraph({
      spacing: { after: 240 },
      children: [new TextRun({ text: s.fillIn, size: 20, italics: true })],
    }),
  ];
  for (const tok of tokens) blockToDocx(tok, children);

  const doc = new Document({
    creator: 'A Framework for Ethical and Constructive Use of AI in Early Childhood Education',
    title: data.title,
    description: data.summary ?? '',
    styles: {
      default: {
        document: { run: { font: 'Calibri', size: 22 }, paragraph: { spacing: { line: 276 } } },
        heading1: { run: { size: 30, bold: true, color: '0B0C0C' } },
        heading2: { run: { size: 26, bold: true, color: '0B0C0C' } },
        heading3: { run: { size: 24, bold: true, color: '0B0C0C' } },
      },
    },
    sections: [
      {
        properties: { page: { margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
        children,
      },
    ],
  });
  const buf = await Packer.toBuffer(doc);
  await writeFile(path.join(OUT, locale, `${slug}.docx`), buf);
  return slug;
}

async function main() {
  if (existsSync(OUT)) await rm(OUT, { recursive: true, force: true });
  const manifest = {};
  for (const locale of ['en', 'es']) {
    const dir = path.join(SRC, locale);
    if (!existsSync(dir)) continue;
    await mkdir(path.join(OUT, locale), { recursive: true });
    const files = (await readdir(dir)).filter((f) => /\.mdx?$/.test(f));
    manifest[locale] = [];
    for (const file of files) {
      try {
        manifest[locale].push(await buildOne(locale, file));
      } catch (err) {
        console.error(`  ✗ ${locale}/${file}: ${err.message}`);
        process.exitCode = 1;
      }
    }
    console.log(`artifacts: ${locale} → ${manifest[locale].length} × (.md + .docx)`);
  }
  await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
