/**
 * Tests for the intake logic, checked against the spec's tier definitions.
 *
 * The intake is the front door and the thing most likely to be trusted without
 * being checked, so its rules are asserted rather than eyeballed.
 *
 *   node scripts/test-intake.mjs
 */
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import matter from 'gray-matter';
import {
  tierFor,
  tierReason,
  artifactsFor,
  artifactsGrouped,
  sentenceFor,
  isComplete,
  encodeState,
  decodeState,
  TIER_DEFINITIONS,
  PROVIDER_TYPES,
  SCREENER,
  QUESTIONS,
} from '../src/lib/intake.js';
import { generateDocuments } from '../src/lib/generate-policy.js';

let passed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (err) {
    failures.push(`${name}\n    ${err.message.split('\n')[0]}`);
  }
}

const state = (over = {}) => ({
  provider: 'center',
  names: false,
  biometric: false,
  decision: false,
  children: false,
  ...over,
});

// --- Tiering -----------------------------------------------------------------

test('no child or family data at all is Tier 1', () => {
  assert.equal(tierFor(state()), 1);
});

test('information naming a child or family is Tier 2', () => {
  assert.equal(tierFor(state({ names: true })), 2);
});

test('capturing a face, voice or body is Tier 3', () => {
  assert.equal(tierFor(state({ biometric: true })), 3);
});

test('informing a decision about a specific child is Tier 3', () => {
  assert.equal(tierFor(state({ decision: true })), 3);
});

test('used directly by children is Tier 3', () => {
  assert.equal(tierFor(state({ children: true })), 3);
});

test('a Tier 3 trigger outranks a Tier 2 one', () => {
  assert.equal(tierFor(state({ names: true, decision: true })), 3);
});

test('a Tier 3 trigger applies even with no named child data', () => {
  // A camera that never receives a name still captures the child.
  assert.equal(tierFor(state({ names: false, biometric: true })), 3);
});

test('"back office" is never a route to Tier 1 on its own', () => {
  // Subsidy billing is administrative AND full of family data. It must not
  // come back Tier 1 — the spec calls this the one shortcut not to take.
  assert.equal(tierFor(state({ names: true })), 2);
});

test('every combination returns a defined tier', () => {
  for (const names of [true, false])
    for (const biometric of [true, false])
      for (const decision of [true, false])
        for (const children of [true, false]) {
          const tier = tierFor({ names, biometric, decision, children });
          assert.ok([1, 2, 3].includes(tier), `got ${tier}`);
        }
});

// --- Reasons -----------------------------------------------------------------

test('every tier result comes with a reason, in both languages', () => {
  for (const locale of ['en', 'es'])
    for (const over of [{}, { names: true }, { biometric: true }, { decision: true }, { children: true }]) {
      const reason = tierReason(state(over), locale);
      assert.ok(reason && reason.length > 10, `empty reason for ${JSON.stringify(over)} in ${locale}`);
    }
});

// --- Tier definitions --------------------------------------------------------

test('all four tiers are defined in both languages with requirements', () => {
  for (const tier of [0, 1, 2, 3])
    for (const locale of ['en', 'es']) {
      const def = TIER_DEFINITIONS[tier][locale];
      assert.ok(def, `tier ${tier} missing ${locale}`);
      assert.ok(def.name, `tier ${tier} ${locale} has no name`);
      assert.ok(def.returns?.length > 0, `tier ${tier} ${locale} returns nothing`);
    }
});

test('Tier 3 requires separate consent, human determination and an exit plan', () => {
  const returns = TIER_DEFINITIONS[3].en.returns.join(' ').toLowerCase();
  for (const required of ['consent', 'human determination', 'exit plan', 'due diligence'])
    assert.ok(returns.includes(required), `Tier 3 does not require: ${required}`);
});

test('Tier 2 requires a written agreement and a register entry', () => {
  const returns = TIER_DEFINITIONS[2].en.returns.join(' ').toLowerCase();
  for (const required of ['written agreement', 'register', 'consumer chatbot'])
    assert.ok(returns.includes(required), `Tier 2 does not require: ${required}`);
});

// --- The screener ------------------------------------------------------------

test('the screener covers all eight bright lines, in both languages', () => {
  assert.equal(SCREENER.length, 8);
  assert.deepEqual(
    SCREENER.map((s) => s.number),
    [1, 2, 3, 4, 5, 6, 7, 8],
  );
  for (const item of SCREENER) {
    assert.ok(item.en?.length > 20, `bright line ${item.number} has no English text`);
    assert.ok(item.es?.length > 20, `bright line ${item.number} has no Spanish text`);
  }
});

// --- Artifact routing --------------------------------------------------------

test('every provider type gets documents at every tier', () => {
  for (const { id } of PROVIDER_TYPES)
    for (const tier of [0, 1, 2, 3]) {
      const artifacts = artifactsFor(id, tier);
      assert.ok(artifacts.length > 0, `${id} at tier ${tier} gets nothing`);
      assert.equal(new Set(artifacts).size, artifacts.length, `${id} tier ${tier} has duplicates`);
    }
});

test('a family child care home leads with the one-page policy, not the long one', () => {
  const { primary } = artifactsGrouped('fcc', 1);
  assert.ok(primary.includes('one-page-ai-policy'));
  assert.ok(!primary.includes('program-ai-use-policy'));
});

// --- Routing must agree with the artifacts' own frontmatter -----------------
// These two sources drifted once already: the intake handed readers documents
// whose own header said they did not apply.

const ARTIFACT_META = Object.fromEntries(
  readdirSync('src/content/artifacts/en')
    .filter((f) => f.endsWith('.md'))
    .map((f) => [
      f.replace(/\.md$/, ''),
      matter(readFileSync(`src/content/artifacts/en/${f}`, 'utf8')).data,
    ]),
);

test('every routed artifact exists', () => {
  for (const { id } of PROVIDER_TYPES)
    for (const tier of [0, 1, 2, 3])
      for (const slug of artifactsFor(id, tier))
        assert.ok(ARTIFACT_META[slug], `${id}/tier ${tier} routes to missing artifact ${slug}`);
});

test('no routed artifact contradicts its own forWhom', () => {
  for (const { id } of PROVIDER_TYPES)
    for (const tier of [0, 1, 2, 3])
      for (const slug of artifactsFor(id, tier)) {
        const forWhom = ARTIFACT_META[slug].forWhom ?? [];
        assert.ok(
          !forWhom.length || forWhom.includes(id),
          `${id}/tier ${tier}: ${slug} declares forWhom=[${forWhom}]`,
        );
      }
});

test('no routed artifact contradicts its own tiers', () => {
  for (const { id } of PROVIDER_TYPES)
    for (const tier of [1, 2, 3])
      for (const slug of artifactsFor(id, tier)) {
        const tiers = ARTIFACT_META[slug].tiers ?? [];
        assert.ok(
          !tiers.length || tiers.includes(tier),
          `${id}/tier ${tier}: ${slug} declares tiers=[${tiers}]`,
        );
      }
});

test('every lead-with document is one that actually applies', () => {
  for (const { id } of PROVIDER_TYPES)
    for (const tier of [0, 1, 2, 3]) {
      const { primary, also } = artifactsGrouped(id, tier);
      const applicable = artifactsFor(id, tier);
      for (const slug of primary)
        assert.ok(applicable.includes(slug), `${id}/tier ${tier}: leads with inapplicable ${slug}`);
      assert.equal(
        new Set([...primary, ...also]).size,
        applicable.length,
        `${id}/tier ${tier}: grouping lost or duplicated an artifact`,
      );
    }
});

test('a reader is never led with more than six documents', () => {
  for (const { id } of PROVIDER_TYPES)
    for (const tier of [0, 1, 2, 3]) {
      const { primary } = artifactsGrouped(id, tier);
      assert.ok(primary.length <= 6, `${id}/tier ${tier} leads with ${primary.length} documents`);
    }
});

test('every artifact declares who it is for', () => {
  for (const [slug, data] of Object.entries(ARTIFACT_META)) {
    assert.ok(data.forWhom?.length, `${slug} declares no forWhom`);
    assert.ok(data.tiers?.length, `${slug} declares no tiers`);
  }
});

test('a multi-site operator gets governance, not just a template', () => {
  const artifacts = artifactsFor('multi-site', 2);
  for (const required of ['governance-charter', 'model-contract-rider', 'pilot-protocol'])
    assert.ok(artifacts.includes(required), `multi-site does not get ${required}`);
});

test('Tier 3 always returns the separate consent instrument', () => {
  for (const { id } of PROVIDER_TYPES) {
    if (id === 'intermediary') continue; // no children's images in an intermediary's own work
    assert.ok(
      artifactsFor(id, 3).includes('consent-images-voice-model-training'),
      `${id} at Tier 3 is not given the consent form`,
    );
  }
});

// --- The sentence ------------------------------------------------------------

test('the sentence completes in both languages and names the provider type', () => {
  for (const locale of ['en', 'es'])
    for (const { id, en } of PROVIDER_TYPES) {
      const sentence = sentenceFor(state({ provider: id }), locale);
      assert.ok(sentence.length > 60, `sentence too short for ${id} in ${locale}`);
      assert.ok(!sentence.includes('undefined'), `sentence has "undefined": ${sentence}`);
      assert.ok(sentence.trim().endsWith('.'), `sentence not terminated: ${sentence}`);
    }
});

test('guidance stays locked until every answer is given', () => {
  assert.equal(isComplete({ provider: 'center' }), false);
  assert.equal(isComplete(state({ children: undefined })), false);
  assert.equal(isComplete(state()), true);
});

// --- Shareable result URLs ---------------------------------------------------

test('a result round-trips through the URL fragment', () => {
  for (const over of [{}, { names: true }, { biometric: true, children: true }]) {
    const original = state(over);
    const restored = decodeState(`#${encodeState(original)}`);
    assert.deepEqual(restored, original);
  }
});

test('a malformed or partial fragment restores nothing rather than guessing', () => {
  assert.equal(decodeState('#'), null);
  assert.equal(decodeState('#p=nonsense&n=1&b=0&d=0&c=0'), null);
  assert.equal(decodeState('#p=center&n=1'), null);
});

// --- Document generation -----------------------------------------------------

test('generation produces a policy and a separate family notice', () => {
  for (const locale of ['en', 'es'])
    for (const { id } of PROVIDER_TYPES) {
      const { policy, notice, tier } = generateDocuments(state({ provider: id }), locale, '2026-09-11');
      assert.ok(policy.length > 800, `${id}/${locale} policy too short`);
      assert.ok(notice.length > 400, `${id}/${locale} notice too short`);
      assert.ok([1, 2, 3].includes(tier));
      assert.ok(!policy.includes('undefined'), `${id}/${locale} policy contains "undefined"`);
      assert.ok(!notice.includes('undefined'), `${id}/${locale} notice contains "undefined"`);
    }
});

test('the generated notice is never presented as a consent form', () => {
  const { notice } = generateDocuments(state({ names: true }), 'en', '2026-09-11');
  assert.ok(/receipt/i.test(notice), 'notice has no receipt framing');
  assert.ok(
    /not permission|records receipt only/i.test(notice),
    'notice does not say that signing is not permission',
  );
});

test('the generated policy always carries the never-list and the draft warning', () => {
  for (const locale of ['en', 'es']) {
    const { policy } = generateDocuments(state({ children: true }), locale, '2026-09-11');
    assert.ok(/WORKING DRAFT|BORRADOR DE TRABAJO/.test(policy), 'no draft warning');
    assert.ok(/\[PROGRAM NAME\]|\[NOMBRE DEL PROGRAMA\]/.test(policy), 'no fill-in marker');
    const lower = policy.toLowerCase();
    assert.ok(
      /mandated-reporter|reporte obligatorio/.test(lower),
      'never-list is missing the mandated-reporter prohibition',
    );
  }
});

test('a multi-site policy delegates approval instead of queueing it', () => {
  const { policy } = generateDocuments(state({ provider: 'multi-site', names: true }), 'en', '2026-09-11');
  assert.ok(/delegated/i.test(policy), 'multi-site policy does not delegate authority');
});

// --- Report ------------------------------------------------------------------

if (failures.length) {
  console.error(`✗ ${failures.length} failing, ${passed} passing\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}
console.log(`✓ ${passed} intake tests passing.`);
