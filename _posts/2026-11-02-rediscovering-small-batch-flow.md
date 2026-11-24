---
layout: post
title: Rediscovering Small Batch Flow
date: 2026-11-02 00:00:00
description: >
  Whether it's Toyota's factory floor or the laundry or releasing software features,
  working in small batches in more relevant than ever
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
but we do have this slightly tongue-in-cheek one pictured above hanging in our laundry room,
custom-made as a gift one year
to serve as an ever-present reminder to not let our clothes pile up.

For those who don't know,
if you do let your clothes pile up over many days or, God forbid, *weeks*,
you will find yourself in the unfortunate situation
of doing laundry for an entire day,
and you're going to have a bad time.
(Ask me how I know.)

I [previously wrote](/2026/06/its-the-devops-handbook-all-over-again/) about
how many years ago our team read *The DevOps Handbook* together,
and the "working in small batches" concept
always resonated with me,
and I jokingly made the connection between the "working in small batches" concept
to keeping the wash on a regular schedule,
resulting in this custom-made sign as a gift one year
to serve as an ever-present reminder to not let our clothes pile up.

Outside of the laundry room,
I see a lot of people get into trouble lately
when they don't follow the DevOps principle of small batch flow.[^small-batch-flow]

AI may have increased our ambitions, yes,
but I see this notion playing out in product management spaces
where rather than getting something smaller released at a regular cadence,
the speed of AI coding produces a tendency to over-analyze what should be included in a release,
and thus more scope gets tossed in,
which then requires more communication out to end users and stakeholders
(who can only absorb so much in one sitting),
which then further pushes out release dates...
all the while not getting more frequent feedback from actual users of your system.

Small batch flow traces its origins back to the
[Toyota Production System](https://global.toyota/en/company/vision-and-philosophy/production-system/) (TPS)
in Japan after World War II,
and I first learned about it in Supply Chain classes in college;
though I wound up going down a different career path in software engineering,
I've been surprised at just how applicable this concept is to so many aspects of life and work.

The general principle behind small batch flow in TPS meant,
instead of stamping out a huge lot of one part because the machine is already set up for it,
you make only what the next step needs, when it needs it,
and you move each piece through every step to done before starting the next one.
Toyota called the ideal "one-piece flow."
The point was never *only* speed:
A small batch also meant a small pile of inventory sitting between steps[^accounting],
and a defect gets caught after one part instead of after a thousand.

If you swap manufacturing parts for a car with writing code, the same logic holds.

*The DevOps Handbook* sums up the payoff nicely:

> "Small batch sizes result in less WIP, faster lead times, faster detection of errors, and less rework."
>
> \- *[The DevOps Handbook](https://itrevolution.com/book/the-devops-handbook/), p. 23*

[Little's law](https://en.wikipedia.org/wiki/Little%27s_law) says
the average time work spends in a system equals the amount of work in the system
divided by the rate at which work gets finished,
so a smaller pile means a shorter wait even when nobody works any faster.
The laundry pile is WIP, and our washer's throughput isn't changing.

> "This validates our common experience that the larger the change going into production,
> the more difficult the production errors are to diagnose and fix, and the longer they take to remediate."
>
> \- *[The DevOps Handbook](https://itrevolution.com/book/the-devops-handbook/), p. 24*

Anyone who has been on call knows this one.
When a deploy with one change in it breaks something, you already know where to look;
when a deploy with two hundred changes in it breaks something,
you spend most of the outage figuring out which change did it.

> "The equivalent to single piece flow in the technology value stream is realized with continuous deployment,
> where each change committed to version control is integrated, tested, and deployed into production."
>
> \- *[The DevOps Handbook](https://itrevolution.com/book/the-devops-handbook/), p. 24*

Single-piece flow is the theoretical limit, though, and not a target every team has to hit.
Donald Reinertsen describes batch size as
"[an economic tradeoff between holding cost and transaction cost](http://leanmagazine.net/issues/issue-6/getting-flow-into-your-product-development/)":
every batch costs something to process and costs something more while it sits waiting,
so small batches only pay off once the cost of processing each one is low.
At Toyota that meant making die changeovers quick;
for us it means automated tests and a one-step deploy.

> "The batch size is the unit at which work-products move between stages in a development [or DevOps] process.
> For software, the easiest batch to see is code.
> Every time an engineer checks in code, they are batching up a certain amount of work."
>
> \- *Eric Ries, [Startup Lessons Learned](https://www.startuplessonslearned.com/2009/02/work-in-small-batches.html),
> as quoted in [The DevOps Handbook](https://itrevolution.com/book/the-devops-handbook/), p. 24*

Eric wrote that in 2009, when the expensive part of a batch of code was writing it.
Writing is now the cheap part, and the batches have grown to match.
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
and then opens deliberately tiny pull requests, targeting about ten lines of diff each.
Over a three-month deployment, one team merged 32 of Pomona's 39 pull requests,
with a median time-to-close of just over two hours.
The authors conclude that "human review bandwidth is a far greater bottleneck
in AI-driven development than code-generation speed,"
which is another way of saying that the pile between steps is what hurts.
The team later raised the limit to 100 lines,
which is exactly the kind of tuning Reinertsen's trade-off predicts.

The part I enjoy most is that the paper never mentions batch size, the Handbook, or DORA.
The authors cite Kaizen as their inspiration instead,
the continuous improvement practice that Toyota made famous,
so they arrived at small batch flow by going back to the same factory floor everyone else did.

I think it is important for us all to think about our work
and consider where to apply this thinking
about working in smaller batches,
whether the batch is a pull request, a product release, or a hamper of clothes.
The sign is still hanging in our laundry room, and I still need the reminder.

## The Lineage

For anyone who wants to follow the idea from Toyota to today, this is the trail as I traced it:

- **Toyota Production System** (Taiichi Ohno, postwar Japan) — just-in-time, one-piece flow, and inventory as waste
- ***Lean Thinking*** (James Womack and Daniel Jones, 1996) — the envelope-stuffing race
  that one-at-a-time wins
- ***The Principles of Product Development Flow*** (Donald Reinertsen, 2009) — batch size as an economic trade-off
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
- ***Accelerate*** (2018) and [DORA](https://dora.dev/capabilities/working-in-small-batches/) —
  deployment frequency as the measurable proxy for batch size
- [2024 DORA Report](https://dora.dev/research/2024/dora-report/2024-dora-accelerate-state-of-devops-report.pdf) —
  AI adoption correlating with worse delivery stability
- [Pomona](https://arxiv.org/html/2606.06752v3) (2026) — small batches, rediscovered for agents

## Footnotes

[^small-batch-flow]: "Working in small batches" is a bit of a mouthful,
    so somewhere along the way I started calling this "small batch flow,"
    as the title of this post suggests,
    because that phrasing seemed to have a better... *flow*.

[^accounting]: This also had the side benefit of having less inventory on the balance sheet.
