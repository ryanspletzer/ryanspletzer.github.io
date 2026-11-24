---
layout: post
title: Rediscovering Small Batch Flow
date: 2026-11-02 00:00:00
description: >
  Whether it's Toyota's factory floor or the laundry or releasing software features,
  working in small batches is more relevant than ever
  even as AI has made large batches of code cheap and easy to produce.
tags:
  - ai
  - devops
  - software-engineering
header: /assets/images/small-batch-flow.jpg
---

![A farmhouse-style sign hanging on a beige wall:
a long white board in a rustic weathered-wood frame,
with the words "SMALL BATCH FLOW" in thin, hand-lettered capitals.](
    /assets/images/small-batch-flow.jpg)
*The sign in our laundry room.*

Our house isn't exactly plastered with farmhouse-style word art signs like "Live, Laugh, Love,"
but we do have this slightly tongue-in-cheek one pictured above hanging in our laundry room.

For those who don't know,
if you do let your clothes pile up over many days or, God forbid, *weeks*,
you will find yourself in the unfortunate situation
of doing laundry for an entire day,
and you're going to have a bad time.
(Ask me how I know.)

I [previously wrote](/2026/06/its-the-devops-handbook-all-over-again/) about
how many years ago our team read *The DevOps Handbook* together.
The "working in small batches" concept always resonated with me,
and at some point I jokingly connected it
to keeping the wash on a regular schedule,
resulting in this custom-made sign as a gift one year
to serve as an ever-present reminder to not let our clothes pile up.

Outside of the laundry room,
I see a lot of people get into trouble lately
when they don't follow the DevOps principle of small batch flow.[^small-batch-flow]

I see it most in product management discussions.
When AI makes code this fast to produce,
adding one more thing to a release feels free,
so more scope gets tossed in,
the release date slips,
and all the while you aren't getting feedback from actual users of your system.
In effect you're pushing out 20 "guesses" at once
as to what people want
as opposed to a handful that you're rather sure about
based on solid prior feedback.

The principle is much older than AI, and older than software for that matter.
Small batch flow traces its origins back to the
[Toyota Production System](https://global.toyota/en/company/vision-and-philosophy/production-system/) (TPS)
in Japan after World War II.
Instead of stamping out a huge lot of one part because the machine is already set up for it,
you make only what the next step needs, when it needs it,
and you move each piece through every step to done before starting the next one.
Toyota called the ideal "one-piece flow."
The point of TPS was never *only* speed:
a small batch also means a small pile of inventory sitting between steps,
and a defect gets caught after one part instead of after a thousand.

If you swap car parts and assembly for code changes, the same logic holds.
*The DevOps Handbook* sums this up:

> "Small batch sizes result in less WIP, faster lead times, faster detection of errors, and less rework."
>
> \- *[The DevOps Handbook](https://itrevolution.com/book/the-devops-handbook/), p. 23*

A smaller pile means a shorter wait even when nobody works any faster.
The laundry pile is WIP (work in progress), and our washer's throughput isn't changing.

Anyone who has been on call also knows the part about errors.
When a deploy with one change in it breaks something, you already know where to look;
when a deploy with two hundred changes in it breaks something,
you spend most of the outage figuring out which change did it.

Small batches only pay off, though, once each one is cheap to process.
At Toyota that meant making die changeovers quick;
for us it means automated tests and deployments.

When Eric Ries
[wrote about working in small batches](https://www.startuplessonslearned.com/2009/02/work-in-small-batches.html)
in 2009, the expensive part of a batch of code was writing it.
Writing is now the cheap part, and the batches have grown to match,
in pull requests as much as in releases.

The 2024 DORA report found that delivery stability dropped an estimated 7.2%
for every 25% increase in AI adoption, and it offered a hypothesis as to why:

> "...the fundamental paradigm shift that AI has produced in terms of respondent productivity and code generation speed
> may have caused the field to forget one of DORA's most basic principles—the importance of small batch sizes."
>
> \- *[2024 DORA Report](https://dora.dev/research/2024/dora-report/2024-dora-accelerate-state-of-devops-report.pdf),
> p. 40*

What the field forgets, it can also rediscover.
Earlier this year, engineers at Bloomberg and researchers at University College London
published a paper on [Pomona](https://arxiv.org/html/2606.06752v3),
an agentic tool that scans a codebase for quality improvements
and then opens deliberately tiny pull requests.
Over a three-month deployment, one team merged 32 of Pomona's 39 pull requests,
with a median time-to-close of just over two hours.
The authors conclude that "human review bandwidth is a far greater bottleneck
in AI-driven development than code-generation speed,"
which is another way of saying that the pile between steps is what hurts.

The part I enjoy most is that the paper never mentions batch size, the Handbook, or DORA.
The authors cite Kaizen as their inspiration instead,
the continuous improvement practice that Toyota made famous,
so they arrived at small batch flow by going back to the same factory floor everyone else did.

I think it is worth all of us looking at our own work
and asking where the batches have gotten too big,
whether the batch is a pull request, a product release, or a hamper of dirty clothes.

## The Lineage

For anyone who wants to follow the idea from Toyota to today, this is the trail as I traced it:

- [Toyota Production System](https://global.toyota/en/company/vision-and-philosophy/production-system/)
  (Taiichi Ohno, postwar Japan) — just-in-time, one-piece flow, and inventory as waste
- [Lean Thinking](https://www.lean.org/store/book/lean-thinking-2nd-edition/)
  (James Womack and Daniel Jones, 1996) — the envelope-stuffing race that one-at-a-time wins
- [The Principles of Product Development Flow](https://www.goodreads.com/book/show/6278270-the-principles-of-product-development-flow)
  (Donald Reinertsen, 2009) — batch size as an economic trade-off
- [Work in small batches](https://www.startuplessonslearned.com/2009/02/work-in-small-batches.html)
  (Eric Ries, 2009) — the idea applied to code and continuous deployment
- [10+ Deploys Per Day](https://www.slideshare.net/slideshow/10-deploys-per-day-dev-and-ops-cooperation-at-flickr/1628368)
  (John Allspaw and Paul Hammond, 2009) — "small frequent changes" as a deploy practice at Flickr
- [FrequencyReducesDifficulty](https://martinfowler.com/bliki/FrequencyReducesDifficulty.html)
  (Martin Fowler, 2011) — "if it hurts, do it more often"
- [The DevOps Handbook](https://itrevolution.com/book/the-devops-handbook/)
  (2016) — reducing batch sizes as a principle of flow
- [The Small Batches Principle](https://queue.acm.org/detail.cfm?id=2945077)
  (Tom Limoncelli, 2016) — the same principle for operations work
- [Accelerate](https://itrevolution.com/product/accelerate/) (2018)
  and [DORA](https://dora.dev/capabilities/working-in-small-batches/) —
  deployment frequency as the measurable proxy for batch size
- [2024 DORA Report](https://dora.dev/research/2024/dora-report/2024-dora-accelerate-state-of-devops-report.pdf) —
  AI adoption correlating with worse delivery stability
- [2025 DORA Report](https://dora.dev/research/2025/dora-report/) —
  working in small batches as one of seven capabilities that AI's benefits depend on
- [Where Do AI Coding Agents Fail?](https://arxiv.org/abs/2601.15195)
  (Ramtin Ehsani et al., 2026) — across 33,000 agent-authored pull requests,
  the ones that never merged were larger and touched more files
- [When AI Teammates Meet Code Review](https://arxiv.org/abs/2602.19441)
  (Costain Nachuma and Minhaz Zibran, 2026) — larger agent changes are less likely to merge
- [Pomona](https://arxiv.org/html/2606.06752v3) (2026) — small batches, rediscovered for agents

## Footnotes

[^small-batch-flow]: "Working in small batches" is a bit of a mouthful,
    so somewhere along the way I started calling this "small batch flow,"
    as the title of this post suggests,
    because that phrasing seemed to have a better... *flow*.
