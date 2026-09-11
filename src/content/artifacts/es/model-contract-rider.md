---
title: Model Contract Rider
locale: es
audience: Multi-site · Chain · Grantee
summary: Drop-in vendor terms for buyers who actually have leverage — no training on our data including internally, no biometric or affect processing, deletion that reaches embeddings and backups, subprocessor notice with a right to object, DLL-disaggregated validation evidence, and a notification commitment with a clock on it.
lastUpdated: '2026-09-10'
order: 13
length: long
forWhom: ['multi-site']
tiers: [2, 3]
governs: ['custody', 'consequence', 'language', 'standing', 'currency']
phase: 1
translationPending: true
---

**This is drafted contract language in an unreviewed working draft. It has not
been reviewed by counsel — not ours, and not yours. It is not legal advice. Have
your own counsel read it before you send it to a vendor, and change what your
counsel tells you to change.**

## Why this document exists

A single child care center has no negotiating leverage with a major vendor. What
it can do is ask the ten questions, write down the answers, and choose. That is
worth doing, and it is all a single site can do.

A fourteen-site organization is in a different position. So is a Head Start
grantee with delegate agencies, and so is any buyer whose signature covers
hundreds of children. A buyer that size does not have to ask. It can require.

That capacity is worth more than the deal it wins. Vendors build one product and
sell it to everyone. If the field's larger buyers converge on the same terms,
the vendor changes the default — and the changed default reaches the family
child care provider who will never negotiate anything, because it is now simply
how the product ships. That is a public good only large operators can supply,
and supplying it costs them almost nothing beyond using this language instead of
language they would have had to write anyway.

So: use these words rather than your own. Convergence is the whole mechanism.
The more buyers send the same rider, the less any one of them has to argue.

## How to use it

Send it as a rider or addendum to the vendor's own agreement rather than asking
for edits inside their paper. The text below is written to be pasted whole.

Text in [SQUARE BRACKETS] is yours to set. Most of the brackets are numbers that
are genuinely negotiable — notice periods, deletion windows, the notification
clock. The obligations themselves are not written to be negotiated, and the
short note under each clause tells you, in plain English, what you would be
giving up if you let it go.

---

## AI and Children's Data Rider

This Rider is entered into as of [DATE] between [PROGRAM LEGAL NAME]
("**Program**") and [VENDOR LEGAL NAME] ("**Vendor**") and is incorporated into
and made part of [AGREEMENT NAME], dated [AGREEMENT DATE] (the "**Agreement**").

Where this Rider conflicts with the Agreement, with any online or click-through
terms, with any acceptable use policy, or with any documentation Vendor
incorporates by reference, this Rider controls. Vendor may not modify this Rider
by updating terms posted on a website. This Rider survives termination of the
Agreement as to Sections 5, 8, 9 and 10.

### Definitions

**Program Data** means all data Program, its staff, its families, or its
children provide to Vendor or that Vendor collects, generates, or observes in
the course of providing the services, in any form.

**Child Personal Information** means Program Data that identifies or is
reasonably linkable to an individual child, including name, image, video, audio,
voice, work product, assessment and screening records, health records,
attendance, family and household information, and any biometric identifier.

**Derived Artifacts** means anything Vendor creates from Program Data that is
not a literal copy of it, including embeddings and other vector representations,
model weights and adapters produced by training or fine-tuning, indexes, caches,
logs, aggregates, transcripts, summaries, labels, scores, and backups.

**Biometric Identifier** means a measurement or template computed from a
person's body, including face geometry, a facial template, a voiceprint, a
fingerprint, an iris or retina scan, or gait.

**Subprocessor** means any third party, including any affiliate of Vendor and
any provider of a model or hosting service, that processes Program Data on
Vendor's behalf.

### 1. Roles. Program is the controller; Vendor is a processor.

Program is the data controller for all Program Data. Vendor is a processor and
acts only on Program's documented instructions. Vendor acquires no ownership,
license, or other right in Program Data or in Child Personal Information except
the limited right to process it to deliver the services described in the
Agreement to Program. Vendor is not a controller of Program Data for any
purpose, does not process Program Data for its own purposes, and will not sell,
rent, license, or share Program Data. Vendor's status as a processor does not
change because Vendor de-identifies, aggregates, or transforms Program Data.

**What this does.** It settles who is in charge of the data before any argument
about a specific use starts. Nearly every clause below depends on this one: if
the vendor is a processor acting on your instructions, then anything you did not
instruct is outside the contract. If the vendor is a controller in its own
right, it can point to its own privacy policy for authority and you are
negotiating from behind.

### 2. No training on our data, including internally.

Vendor shall not use Program Data or any Derived Artifact to train, fine-tune,
pre-train, align, evaluate, benchmark, red-team, or otherwise develop or improve
any machine learning or artificial intelligence model, feature, or dataset. This
prohibition applies to:

- models developed by Vendor for Vendor's own use or for any other customer, and
  not only to models developed by a third party;
- models developed by any Subprocessor, affiliate, or model provider;
- Program Data that has been de-identified, anonymized, aggregated, synthesized,
  or otherwise transformed, and to any Derived Artifact of it; and
- human review of Program Data for the purpose of labeling, annotating,
  evaluating, or improving model outputs, except where Program has given
  separate written instruction for a specific, time-limited purpose.

Vendor shall configure every Subprocessor and model provider to the equivalent
of a no-training, no-retention setting and shall state in writing, on request,
which setting is in effect for each. Vendor shall not condition access to any
part of the services on Program's agreement to model training.

**What this does.** This is the clause to fight for. The amended COPPA Rule
requires separate verifiable parental consent before a child's personal
information is disclosed to a third party for AI development, and the Federal
Trade Commission has said such a disclosure is not integral to the nature of the
service, so it cannot ride on the general consent a family signs at enrollment.
That is real protection, and it is protection against disclosure. The Rule is
much quieter about a vendor training its *own* models on data it already holds
lawfully. That is the gap. A law you can cite does not close it; a term you
write does. Note also that "we only train on de-identified data" is not an
answer — the de-identified copy and the embedding built from it are both covered
here, on purpose.

### 3. No biometric processing without our written instruction.

Vendor shall not collect, compute, extract, store, compare, or otherwise process
any Biometric Identifier of any child, family member, or staff member from
Program Data without Program's prior written instruction identifying the
specific purpose. This prohibition expressly includes:

- computing face geometry or a facial template to tag, group, sort, or search
  photographs and video, including features described as "find photos of this
  child," "auto-tagging," "smart albums," or "grouping by person";
- face-based or voice-based check-in, check-out, attendance, or identity
  verification;
- voiceprint extraction from recordings of children or adults; and
- any biometric processing performed by a Subprocessor or by a device or
  platform feature Vendor enables.

If any such capability exists in the product, Vendor shall deliver it disabled
and shall not enable it by default, by update, or by migration. Vendor shall
give Program [60 DAYS] written notice before releasing any feature that would
process a Biometric Identifier.

**What this does.** Photo auto-tagging is biometric processing that does not
look like biometric processing, and it is usually on by default. State biometric
statutes reach private centers and nonprofit grantees directly — Illinois BIPA
applies to private entities and expressly excludes state and local government
agencies, which means a private operator carries more exposure here than a
public school district does, with a private right of action attached. The
amended COPPA Rule expressly counts voiceprints and facial templates as personal
information. The "delivered disabled" sentence is doing quiet work: the usual way
this goes wrong is a product update, not a purchase decision.

### 4. No emotion, affect, or engagement inference about children. At all.

Vendor shall not infer, score, classify, predict, or report any emotional state,
affect, mood, attention, engagement, distress, temperament, behavioral risk,
social-emotional status, or similar internal state of any child, from any
source, including video, audio, images, text, gaze, movement, posture, facial
expression, vocal tone, or interaction logs. This prohibition applies whether
the output is presented to Program, to a family, to a staff member, or only to
Vendor, and whether it is labeled as an inference, a score, a signal, an insight,
a flag, a wellness indicator, or a suggestion.

This Section admits no exception, opt-in, pilot, research use, or beta. Vendor
shall notify Program in writing before releasing any feature within the scope of
this Section and shall not make such a feature available to Program.

**What this does.** This is a bright line on this framework and it is written
without a safety valve on purpose, because every version of this capability
arrives labeled as something else — "insights," "engagement analytics,"
"wellness signals." Ask directly, in the contract, and the label stops mattering.
Note the scope: it covers outputs the vendor keeps for itself, because an
affect model that is only used to tune the product is still an affect model
running on three-year-olds who cannot object.

### 5. Deletion that reaches derived artifacts.

On Program's written request, on a family's request forwarded by Program, or on
termination of the Agreement, Vendor shall delete the identified Program Data
and every Derived Artifact of it within [30 DAYS], including copies held by
Subprocessors, in caches, in logs, in indexes, in embedding or vector stores, in
backups, and in any model weights or adapters. Where a Derived Artifact cannot be
deleted without retraining or rebuilding, Vendor shall retrain or rebuild it,
and cost is Vendor's. Vendor shall confirm completion in writing, identifying
what was deleted, from which systems, and on what date, within [10 DAYS] of
completion.

Backup deletion may follow Vendor's documented backup cycle, not to exceed
[90 DAYS], during which the data shall be isolated from all processing and
shall not be restored into production. Vendor shall not retain Program Data
under a general "aggregate and improve our services" or "de-identified analytics"
exception. Any retention Vendor asserts is required by law shall be identified
in writing, by legal authority and by category of data, before this Rider is
signed.

**What this does.** Deletion clauses usually mean the row in the database. They
do not mean the embedding built from the row, and an embedding of an IFSP
narrative still carries the child. This matters legally and not only ethically:
IDEA gives parents a right to have records destroyed when they are no longer
needed — a right FERPA alone does not confer — and in a Head Start grantee that
IDEA standard displaces the Part 1303 confidentiality subpart for any child
referred to or found eligible under IDEA. A vendor that has ingested that text
into a retained vector store cannot honor the right you are obligated to honor.
Asking for written confirmation, with a date, is what turns the promise into a
record you can show a monitor or a parent.

### 6. Subprocessor notice, with a right to object.

Vendor shall maintain a current written list of all Subprocessors, identifying
each one's name, function, and the country in which it processes Program Data,
and shall furnish it to Program on request. Vendor shall give Program
[30 DAYS] written notice before adding or replacing any Subprocessor.

Program may object in writing within that notice period. If Program objects,
Vendor shall not disclose Program Data to the proposed Subprocessor, and if
Vendor cannot provide the services without it, Program may terminate the
affected services without penalty and receive a pro-rata refund of prepaid fees.
Vendor remains fully responsible for each Subprocessor's compliance with this
Rider and shall bind each one to terms no less protective, including Sections 2,
3, 4 and 5.

**What this does.** The model behind the feature is almost always somebody
else's, and it changes without anyone telling you. Notice makes the change
visible; the right to object is what makes the notice more than a courtesy. For
a Head Start grantee this also feeds the disclosure log that 45 CFR 1303.24
already requires you to keep — you cannot log a disclosure you were never told
about.

### 7. Validation evidence, disaggregated for dual language learners.

For any feature that produces a judgment, score, ranking, flag, recommendation,
or classification about an individual child, Vendor shall provide to Program on
request, within [30 DAYS] and at no charge, a written description of:

- what the feature was validated on, including the size, age range, and
  composition of the validation population;
- how performance was measured, and the measured performance overall; and
- performance analyzed separately for children who are dual language learners,
  by home language where available, and for children with disabilities or
  developmental delays.

Where Vendor has not conducted such an analysis, Vendor shall say so in writing
rather than substituting a general statement about fairness, accuracy, or bias
testing. Vendor shall provide updated evidence within [30 DAYS] after any
material change to the model behind the feature.

**What this does.** This is not a new ask dressed up as a contract term. 45 CFR
1302.102(c)(2) already requires programs to analyze data disaggregated for dual
language learners, so a grantee that cannot get this evidence from a vendor
cannot meet an obligation it already has. There are 7.1 million dual language
learners ages 0–5 — a third of all young children — and speech and language
models perform measurably worse on accented and child speech, so "validated" with
no breakdown tells you very little about a third of the children in the room. The
sentence permitting the vendor to answer "we have not analyzed that" is
deliberate: a documented no is useful information, and it is far more likely to
be true than a yes.

### 8. Notification, with a clock on it.

Vendor shall notify Program's named contact in writing within
[48 HOURS] of becoming aware of any of the following:

- unauthorized access to, disclosure of, or loss of Program Data;
- any use or processing of Program Data inconsistent with this Rider, including
  by a Subprocessor;
- any output of the services that Vendor learns was materially wrong about an
  identified child;
- any release, update, or configuration change that would enable processing
  described in Sections 2, 3 or 4; and
- any government or third-party legal demand for Program Data, unless Vendor is
  legally prohibited from giving notice, in which case Vendor shall give notice
  as soon as permitted and shall challenge the prohibition where grounds exist.

Notice shall state what happened, when, which categories of data and
approximately how many children are affected, what Vendor has done, and what
Vendor recommends Program do. Vendor shall designate a named individual and a
monitored channel for this purpose and shall keep both current. A notification
obligation stated as "promptly," "without undue delay," or "as soon as
practicable" does not satisfy this Section.

**What this does.** "Promptly" is not a deadline; it is a word people argue
about afterwards. You need a number because your own clock starts when you learn,
not when the vendor decides to tell you — you have families to notify, a
disclosure log to update, and in most states a licensing relationship that does
not care whose fault it was. The last bullet is the one most riders miss: a
feature turning on is exactly as significant as a breach, and it happens far
more often.

### 9. Exit and export.

At any time during the term and for [90 DAYS] after termination, Vendor shall on
request export all Program Data to Program in a structured, machine-readable,
non-proprietary format, with a written description of the file structure and
fields sufficient for Program to use the export without Vendor's assistance, at
no charge. Export shall include documents, images, video, and audio in their
original formats and shall not be limited to a printable report.

Vendor shall not condition export, or the completeness of an export, on payment
of any disputed amount or on Program's agreement to any new terms. After the
export is delivered and confirmed, Section 5 applies to everything Vendor still
holds.

**What this does.** The practical cost of leaving a vendor is usually not the
contract — it is that four years of children's portfolios come out as a PDF, or
do not come out at all. Data you cannot take with you is data you do not really
control, and a program that cannot leave cannot enforce anything else in this
Rider.

### 10. Parent review of this Rider.

Vendor agrees that Program may disclose this Rider and the Agreement, in full,
to any parent or guardian who asks to see it, and may publish the fact of its
existence. Vendor shall not designate this Rider as confidential, and no
confidentiality provision of the Agreement limits the disclosure described in
this Section.

**What this does.** For Head Start grantees this is not optional to begin with:
45 CFR 1303.23(e) gives parents an unqualified right to review any written
agreement the program has with a third party, and the text is not limited to
agreements that name their child. That makes it the strongest existing hook for
a parent asking to see an AI vendor contract — and it is a problem if your
vendor's agreement says you may not show it to them. Every program should take
this clause, not only grantees, because being able to hand a family the actual
words is worth more than any assurance you could write about them.

---

## Signature

Agreed and accepted:

| | Program | Vendor |
| --- | --- | --- |
| Organization | [PROGRAM LEGAL NAME] | [VENDOR LEGAL NAME] |
| Signature | | |
| Name | [NAME] | |
| Title | [TITLE] | |
| Date | | |

Program's notification contact under Section 8: [NAME], [TITLE], [EMAIL],
[PHONE].

Vendor's notification contact under Section 8: [NAME], [TITLE], [EMAIL],
[PHONE].

---

This Rider carries the version and date stamped at the top of this document.
When you adopt it, record which version you used and the date you sent it — the
terms will change as the law does, and a vendor will ask which text it signed.
