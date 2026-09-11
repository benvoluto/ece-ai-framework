---
title: Incident & Discontinuation Protocol
locale: en
audience: Director
summary: A runbook for when a tool fails, leaks, or turns out to do something it did not disclose — what counts as an incident, the first hour, who to notify and when families must be told, how to stop using a tool and get the data back, and the record to keep.
lastUpdated: '2026-09-10'
order: 11
length: short
forWhom: ['fcc', 'center', 'multi-site', 'intermediary']
tiers: [1, 2, 3]
governs: ['custody', 'standing', 'consequence', 'currency']
phase: 2
---

## 1. What counts as an incident

Start the protocol on any of these. You need not be sure it is serious.

- The vendor reports a breach, unauthorized access, or lost data.
- Children's or families' information went somewhere it should not have —
  including a staff member pasting a child's name or observation into a free
  consumer chatbot.
- A bright line was crossed: an AI output used in a decision about a child,
  emotion or engagement inference, anything in a child-protection report, or
  machine translation in a screening-result, IFSP, IEP or eligibility
  conversation.

The quiet ones are the ones you will actually meet:

- **A feature turned on by default** — an app you already use adds AI summaries,
  photo auto-tagging or "insights" in an update. You did not approve it. Still
  an incident.
- **An output that was wrong about a child** and reached a file, a family or a
  referral.
- **A subprocessor or terms change** — who holds the data, where, or what they
  may train on.
- **Use outside the register** — an unregistered tool in use, or a registered
  tool used beyond its entry.

## 2. The first hour

1. **Stop the use.** *"Please stop using [TOOL NAME] for anything with a child's
   name in it until I say otherwise. Nothing you did is in trouble — I need an
   hour."*
2. **Delete nothing.** Not the output, not the chat history, not the email. Save
   or screenshot it.
3. **Write the facts down**: what happened, when you learned it, who was
   involved, what the tool did.
4. **Turn the feature off** or suspend the accounts.
5. **Scope it**: which children, which families, what information, over what
   period. An estimate is fine if you label it one.
6. **Send nothing to families yet.** You have an hour to get the facts straight.
   You do not have a week.

## 3. Who to notify, in order

**1. The vendor, in writing, the same day** — email, so there is a record.

> Subject: Incident involving [TOOL NAME] — written response requested
>
> On [DATE] we identified [WHAT HAPPENED] involving [TOOL NAME]. We have
> suspended use. Please respond in writing by [DATE] with: what happened; what
> information about children or families was involved; which subprocessors held
> or processed it; what has been deleted and what remains, including anything
> derived from our data; and the name and direct contact of the person handling
> this. — [YOUR NAME], [ROLE], [PROGRAM NAME]

**2. Staff**, with the stop instruction and a plain statement that reporting this
is what we wanted them to do.

**3. Your board or owner**, for anything involving children's information leaving
the program, any bright-line use, or any tool you are stopping.

**4. Families**, when any of these is true: information about their child went to
someone not authorized to have it; their child's images, voice, work or records
may have been used to train a vendor's AI without separate written consent; an AI
output that was wrong about their child reached a file, a referral or a decision;
or you would want to be told if it were your child. Write in their home language,
say what you do not yet know, and do not ask them to do anything.

> Dear [FAMILY NAME], I am writing about a problem with a computer tool our
> program uses for [PURPOSE]. On [DATE] we learned that [WHAT HAPPENED, IN ONE
> SENTENCE]. Information about [CHILD NAME] may have been involved. What we have
> done: we stopped using the tool on [DATE], asked the company for a written
> answer, and asked them to delete our information. What we do not know yet:
> [WHAT YOU DO NOT KNOW]. I will write again by [DATE] even if I have nothing
> new. Reach me at [PHONE] or [EMAIL] with any question. — [NAME], [ROLE]

**5. Head Start programs.** If information about a child went to a third party,
enter it in the disclosure log required by 45 CFR §1303.24 — whether or not the
disclosure was authorized, and whether or not anything leaked. Under §1303.23(e)
any parent may ask to review your written agreements with third parties, so
expect to be asked for the vendor agreement. If the child was referred to or
found eligible under IDEA, IDEA Part B or Part C confidentiality governs that
record instead of Subpart C.

**6. Licensing, your funder, or your insurer**, if your licensing agreement,
subsidy contract or policy requires reporting a data incident. Fill this in once,
now, so you are not looking it up mid-incident: [AGENCY OR CONTACT], [WHAT MUST
BE REPORTED], [BY WHEN].

## 4. How to stop using a tool

Cancelling the subscription is the last step, not the first.

1. **Export your data while you still have access** — records, notes, photos,
   attachments — and check the export opens.
2. **Send written notice.** *"Effective [DATE], [PROGRAM NAME] is discontinuing
   use of [TOOL NAME] and withdraws any instruction to process information about
   our children and families."*
3. **Ask for deletion, and name the scope.** *"Please delete all information
   about our children and families, including copies held by your subprocessors,
   backups, search indexes, embeddings, and any model, index or analysis derived
   from our data. Confirm in writing by [DATE] what was deleted, what was
   retained, on what basis, and when any remaining copy expires."* Deletion that
   does not reach derived artifacts is not deletion: the record can go while
   everything built from it stays.
4. **Cut off access** — accounts, sign-in connections to your other systems,
   shared folders.
5. **File the confirmation** with your register entry. If none arrives by your
   date, ask once more and record the non-response. A non-answer is a finding.
6. **Update the Approved Tools Register**: discontinued, date, reason, deletion
   confirmed yes or no.
7. **Tell staff what to use instead.** A discontinuation with no replacement is
   how unregistered use starts.

## 5. What to document

One record per incident, vendor emails attached, kept as long as your other
licensing records.

| Field | Entry |
| --- | --- |
| Incident number · date opened |  |
| Tool and vendor |  |
| How we found out |  |
| What happened, in two sentences |  |
| Children or families affected (number; estimate?) |  |
| Information involved |  |
| Bright line engaged? Which? |  |
| Use suspended (date) |  |
| Vendor notified (date) · by whom |  |
| Vendor written response received (date) |  |
| Families notified (date) · how · languages |  |
| Board or owner notified (date) |  |
| Head Start disclosure log entry (date) |  |
| Licensing, funder or insurer notified (date) |  |
| Tool discontinued (date) |  |
| Data exported (date) |  |
| Deletion confirmed in writing (date) · derived data included? |  |
| Register updated (date) |  |
| What we changed so it does not happen again |  |
| Closed (date) · by |  |

Every incident should produce exactly one change: a register entry, a new
question for vendors, a setting turned off, or a line in the staff one-pager.
Write it down before you close the record, or the next incident is this one
again.
