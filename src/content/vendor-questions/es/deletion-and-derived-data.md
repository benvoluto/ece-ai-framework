---
title: Deletion, including derived data
locale: es
number: 4
order: 4
lastUpdated: '2026-09-10'
question: "If a family asks us to delete their child's records, what exactly gets deleted — and does that include anything derived from those records?"
whyItMatters: "IDEA gives parents a right to have records destroyed once they are no longer needed — a right FERPA alone does not confer, and one that most model architectures cannot honor. A vendor that has ingested IFSP text into a retained embedding store cannot give a family back what it has already learned from the child's file. For a Head Start grantee, 45 CFR 1303.21(b) displaces the Head Start privacy subpart with IDEA Part B or Part C confidentiality for any child referred to or found eligible under IDEA, in any grantee — so this right can attach to a program that assumed it was outside IDEA entirely."
authorities:
  - "IDEA confidentiality — parental right to destruction of records no longer needed"
  - "45 CFR 1303.21(b) — IDEA Part B/C confidentiality displaces Head Start Subpart C for any child referred to or eligible under IDEA"
  - "45 CFR 1303 Subpart C — parent inspection, amendment and destruction"
governs: ['custody', 'standing']
translationPending: true
---

A real answer walks the data: the record in the database, the copies in backups and
on what schedule those expire, the exports already sent to other systems, and
anything the record was used to build — embeddings, indexes, model weights, cached
summaries. It ends with a timeframe and a written confirmation you can hand a family.

A dodge stops at the user interface. "Deleted records are removed from your account"
describes what you can see, not what the company still holds. "Anonymised" and
"aggregated" are the two words to press on: ask whether the derived artifact can be
traced back to the child, and if the answer is that it cannot, ask how they verified
that.

Note the date the vendor gave this answer. Deletion behavior changes with
architecture, and the answer you were given in 2026 is not self-renewing.
