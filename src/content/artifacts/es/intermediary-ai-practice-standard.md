---
title: Intermediary AI Practice Standard
locale: es
audience: CDFI · R&R · T&TA
summary: The standard an intermediary adopts for its own AI — in lending and underwriting, in portfolio monitoring and coaching triage, and in analysis of coaching notes — plus what it may and may not change when it delivers the provider artifacts under its own name.
lastUpdated: '2026-09-10'
order: 16
length: long
forWhom: ['intermediary']
tiers: [1, 2, 3]
governs: ['consequence', 'standing', 'custody', 'language', 'currency']
phase: 2
translationPending: true
---

**This is an unreviewed working draft. It has not been reviewed by counsel. It is
not legal advice, and it is not a compliance opinion about fair lending. It is
adoptable language: sign it, date it, publish it, and change what your counsel
tells you to change.**

Adopted by [ORGANIZATION NAME] on [DATE]. Published at [WEB ADDRESS]. Reviewed
every [12 MONTHS].

## 1. Scope, and why we need our own standard

[ORGANIZATION NAME] sits on both sides of this. We are a user of AI in our own
lending, portfolio management, and coaching, and we are a channel through which
guidance about AI reaches the providers we serve. This standard covers the first.
Section 7 covers the second.

The distinction that makes a separate standard necessary is this: a provider's AI
makes decisions about children. Our AI makes decisions about providers. Those are
different risks and they do not share a remedy. A framework written to keep an
observation app from scoring a three-year-old says nothing useful about an
underwriting model scoring a family child care business — and we are the ones
holding the underwriting model.

This standard applies to every use of AI, machine learning, or automated
decision support by [ORGANIZATION NAME], its staff, and its contractors, in:

- lending, underwriting, credit scoring, pricing, and servicing;
- portfolio monitoring, risk rating, and coaching or technical assistance triage;
- analysis of coaching notes, assessment reports, and other narrative records;
- grantmaking, subaward decisions, and applicant screening; and
- routine business operations — drafting, translation, scheduling, research.

We apply the same three-tier classification we ask providers to use. Tier 1 is
work touching no provider-identifying or family-identifying data. Tier 2 touches
identified provider business data. Tier 3 is anything that informs a decision
affecting a provider's money, standing, or participation. Tier 3 requires
written approval by [NAMED ROLE] before adoption and again before any change to
the model behind it.

## 2. What we will not do

These hold across every use, and they are not waivable by a pilot, a vendor
agreement, or a funder request.

- **No automated denial.** No model, score, or ranking is the sole or presumptive
  basis for denying credit, denying a grant, exiting a provider from our
  portfolio, or imposing any sanction. See Section 3.
- **No inference about children.** We do not adopt, fund, or resell any tool that
  infers emotion, affect, or engagement about children, and we do not analyze
  children's images, video, voice, or assessment records in any AI system.
- **No hidden scoring of providers.** We do not maintain a model-generated rating
  of a provider that the provider cannot see. See Section 4.
- **No child or family identifiers in general-purpose tools.** Narrative records
  that name a child or family do not go into a consumer AI account, ever.
- **No machine translation for high-stakes conversations.** Loan closings,
  adverse action explanations, workout and default conversations, and any
  conversation about a provider's continued participation use a qualified
  interpreter. Machine translation is for routine operational communication —
  newsletters, deadline reminders, opportunity alerts — and we say on the face of
  those communications that they were machine-translated and name a person to
  call.

## 3. Lending and underwriting

**The risk, stated plainly.** Our borrowers are disproportionately women of
color running micro-businesses. The data available to score them encodes the
sector's existing inequities: home-based providers, newer providers, and
providers in child care deserts have thin files, irregular documentation, and
histories that look like risk to a model and look like the sector to anyone who
knows it. A model trained on who we have lent to before will reproduce who we
have lent to before. This is the most consequential AI decision in our building
and we treat it that way.

**What we commit to.**

1. **Fair lending review before any pilot.** Before an AI or machine-learning
   model touches a live credit decision — including in shadow mode alongside
   human underwriting — we complete a written fair lending review covering the
   input variables, the proxies among them, the training population, and the
   expected effect on protected classes. The review is dated, signed by
   [NAMED ROLE], and retained. No pilot begins without it.

2. **A human decision on every denial.** Every declination is made by a named
   underwriter who has reviewed the underlying file, not by a model and not by an
   underwriter confirming a model. The underwriter's reasons are recorded in her
   own words. A model output may inform that decision; it may never be the
   decision, and "the system declined it" is not an acceptable answer to anyone —
   a borrower, a funder, an examiner, or us.

3. **Adverse action explainability.** We do not use a model whose contribution to
   a decision we cannot explain. Every adverse action notice states the specific
   principal reasons for the decision in plain language a borrower can act on,
   and those reasons are the actual reasons, not a generic list. If we cannot
   state why a model treated an applicant as it did, we do not use that model in
   credit decisions.

4. **Disparate impact testing on our actual portfolio.** Before deployment and at
   least every [12 MONTHS] after, we test outcomes — approval rate, pricing,
   amount approved against amount requested, and time to decision — disaggregated
   by race and ethnicity, gender, and language where lawfully available to us,
   and by provider characteristics that carry disparate impact in this sector:
   home-based versus center-based, years in operation, and location in a child
   care desert. Testing is on our own portfolio and our own applicants, not on the
   vendor's benchmark. A vendor's fairness audit is not a substitute and we do not
   accept one as such.

5. **A stop condition, written before we start.** Every model pilot names in
   advance the disparity threshold, error rate, or unexplainable-outcome pattern
   at which we stop. [NAMED ROLE] may stop it without convening anyone. We write
   the stop condition down before the pilot begins, because nobody has ever
   written one during.

6. **The applicant knows.** Our application materials say, in plain language,
   whether automated tools are used in evaluating an application, what they look
   at, and that a person decides. An applicant may ask for the reasons behind a
   decision and receive them.

## 4. Portfolio monitoring and coaching triage

Ranking where to send eight coaches across four hundred providers is a defensible
use of the data we already hold — enrollment trends, subsidy billing patterns,
licensing history, time since last contact. It is also the closest thing in our
operation to a decision about who deserves help, so it carries our strongest
guardrail.

1. **It may route support. It may never route consequences.** A triage model's
   output may be used to prioritize outreach, offer coaching, or target a
   resource. It may not be used, directly or indirectly, as a basis for a
   sanction, a funding denial, a rate change, a covenant call, a portfolio exit,
   a referral to a licensor or funder, or any adverse report about a provider. A
   provider's position in a triage ranking does not enter her credit file, and
   the ranking is not visible to underwriting.

2. **Every provider can see what the system says about her, and contest it.** On
   request, we tell a provider her current risk rating or triage position, the
   main factors producing it, and when it was last updated. She may submit a
   correction or an explanation; a person reviews it within [15 BUSINESS DAYS],
   records the outcome, and tells her what changed. Corrections are applied to the
   underlying data, not only to the narrative about it.

3. **We test the model for the bias it is most likely to have.** At least every
   [12 MONTHS] we test whether the model systematically ranks home-based
   providers, newer providers, or providers in child care deserts as less worth
   helping, and we publish the result of that test in our annual report under
   Section 6. The thin-file problem is real here and it points the wrong way: the
   providers with the least documentation are frequently the ones most in need of
   a coach. Where we find the pattern, we correct the model or we stop using it —
   we do not annotate around it.

4. **Coaches are told what the ranking is and what it is not.** A triage output
   arrives to a coach labeled as a suggestion with its main factors attached and
   with the date of the data behind it. A coach may disregard it and does not have
   to justify doing so. We track how often coaches override the model, because a
   model nobody overrides is a model nobody is checking.

## 5. Analysis of coaching and technical assistance notes

Years of coaching notes across hundreds of providers are the richest program
design input we hold, and reading them as a set is work that was never affordable
before. It is also free text containing provider identities, business
difficulties, and sometimes family and child information disclosed in confidence.

1. **De-identify before analysis, or work inside an agreement.** Either strip
   provider names, business names, addresses, and any child or family identifiers
   before the text reaches an AI tool, or perform the analysis in an approved
   environment covered by a written agreement that forbids training on our data —
   including the vendor's own internal training — and that provides deletion
   reaching embeddings, caches, and backups. There is no third option, and a free
   consumer account is not either of the two.

2. **Findings describe patterns, never people.** Output from this work describes
   what recurs across a portfolio: which topics cluster, where the coaching model
   repeats itself, what providers keep asking for that we do not offer. A finding
   never quietly becomes a score attached to an individual provider, is never
   joined back to a provider record, and is never used in a credit or portfolio
   decision about anyone whose notes were in the corpus.

3. **The people who wrote the notes are told.** Coaches know their notes are
   analyzed, for what purposes, and what the findings were. Providers are told, in
   the engagement materials they already receive, that notes from our work
   together are used in aggregate to improve our programs.

4. **A person verifies before anything is published or funded.** A qualitative
   finding produced by a model is a hypothesis. Before it appears in a report, a
   funding proposal, or a program redesign, a staff member reads enough of the
   underlying text to confirm the finding is there.

## 6. We publish this standard

We publish this standard in full, at a stable web address, in English and in
Spanish, and we tell providers where to find it in our loan application
materials, our engagement letters, and our coaching agreements.

We publish annually: the AI tools we use by tier, the results of the disparate
impact testing required by Section 3.4, the results of the triage bias testing
required by Section 4.3, the number of provider contests received under Section
4.2 and how they were resolved, and any incident in which a tool produced
something materially wrong about a provider.

The reason is simple and we state it plainly: we ask providers to be transparent
with families about AI that affects their children. We cannot ask for that while
being opaque about the AI that affects their businesses. A provider being
underwritten is entitled to read the standard she is being underwritten against.

Questions about this standard go to [NAME], [ROLE], at [EMAIL] or [PHONE]. A
provider who believes a tool of ours produced a wrong result about her may say so
to that contact and will receive a written answer within [15 BUSINESS DAYS].

## 7. Co-branding the provider artifacts

When we deliver the provider-facing artifacts from this framework under our own
name — in a training, a toolkit, a coaching packet, or on our website — the
following holds.

**What we may change.**

- Add our logo, our organization name, and our contact information.
- Add a cover page or a short introduction explaining why we are distributing it.
- Insert local specifics: our state's licensing contact, our state's interpreter
  line, our state's child care resource and referral numbers, the state privacy
  statutes that apply in our footprint.
- Adjust formatting, typography, and file format for our house style, and combine
  artifacts into a packet.
- Translate into languages our providers speak, provided a qualified human
  reviews the translation and the document says who reviewed it.
- Delete a whole artifact that does not apply to our providers.

**What we may not change.**

- The seven principles and the eight bright lines. These do not change across
  provider size, across tier, or across intermediary. They are the part that
  makes the rest coherent, and an intermediary that softens one has produced a
  different document that should not carry this framework's name.
- The legal basis stated for any prohibition. If we cannot verify a citation, we
  remove the passage rather than restate it in our own words.
- The working-draft and not-reviewed-by-counsel notice. Co-branding does not
  convert a draft into reviewed guidance, and putting our logo on it does not
  either.
- Each artifact's own date and version stamp. These stay on the document we
  distribute, unchanged, alongside our own branding. A provider needs to know
  which version she adopted, and we need to be able to tell her when it has moved.

**What we add rather than remove.** Where we disagree with something in an
artifact, we say so in our own voice, in our own introduction, signed — rather
than editing the artifact until it agrees with us. Providers can tell the
difference and the field is better served by a visible disagreement than an
invisible edit.

**We do not name products.** We do not add a recommended tool, a preferred
vendor, or a partner product to any artifact we distribute. Our providers treat a
recommendation from us as an endorsement, because it is one, and we do not have
the evidence to give one.

---

Adopted by: [NAME], [TITLE], [ORGANIZATION NAME]

Date: [DATE]

Approved by the board of directors on [DATE]. Next review: [DATE].
