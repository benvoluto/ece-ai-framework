---
title: Emotion and engagement inference
locale: en
number: 3
order: 3
lastUpdated: '2026-09-10'
question: "Does your product infer emotion, affect, engagement, or behavioral risk about a child?"
whyItMatters: "Ask this one directly; it is often buried under \"insights.\" Emotion inference on children is the framework's first bright line, and the mechanism is documented rather than theoretical: Halberstadt et al. (2020) found prospective teachers 1.36 times more likely to show racialized anger bias toward Black children's faces. Human raters carry that bias, training labels carry it, and models learn it. EU AI Act Article 5(1)(f) prohibits emotion inference in education institutions outright, and it reaches placing on the market and putting into service, not only end use, so it binds vendors as well as programs. There is no United States analogue to that prohibition, which is precisely why the field should ask."
authorities:
  - "EU AI Act Art. 5(1)(f) — prohibits emotion inference in education institutions, binding on placing on the market and putting into service"
  - "Halberstadt et al. (2020) — prospective teachers 1.36 times more likely to show racialized anger bias toward Black children's faces"
  - "45 CFR 1302.33 — screening and assessment may not be used to rank, compare or evaluate individual children"
governs: ['development', 'consequence', 'standing']
---

A real answer is a plain yes or no about the underlying computation, followed by a
list of every screen where it appears. If the product scores engagement, flags
children for behavioral follow-up, or ranks a classroom by mood, that is a yes even
if no screen ever uses the word emotion.

A dodge hides the capability inside a product word. "Insights," "wellbeing signals,"
"engagement analytics," "sentiment," "climate" and "risk indicators" are all worth a
follow-up question: what is computed, from what input, about which child. Ask whether
the output is ever attributed to a named child, because an aggregate classroom
measure and a per-child score are different products.

If the answer is yes about individual children, that is a do-not-adopt, not a
negotiation. Write down the answer and the date anyway — a later version may drop it.
