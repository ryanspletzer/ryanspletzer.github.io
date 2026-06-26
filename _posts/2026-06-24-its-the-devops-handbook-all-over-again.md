---
layout: post
title: It's the DevOps Handbook All Over Again
date: 2026-06-24 00:00:00
description: >
  The lessons from the DevOps Handbook are even more relevant today than they were in 2018.
tags:
 - devops
 - vibe-coding
 - ai
---

![A colorized 1920s postcard photograph of an automobile perched on a narrow ridge road in Los Angeles County, with a wooden guardrail along the precipitous edge; a caption at the bottom reads "Guard rails sometimes save careless drivers."](/assets/images/Car_accident_in_the_1920s_(38083620606).png)
*Cassowary Colorizations, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0),
via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Car_accident_in_the_1920s_(38083620606).png)*

Back in 2018 when I just started my new job,
my manager took the team through the exercise of reading
[*The DevOps Handbook*](https://itrevolution.com/book/the-devops-handbook/).[^second-edition]

I had actually already read it once before,
but was happy to do it again as a team exercise,
because the lessons contained within those pages were quite important,
and essential to some of the key initiatives the team was trying to accomplish around that time.

Fast-forward to 2026 and I just finished reading a new book
I'd been meaning to get to since its release in October 2025:
[*Vibe Coding*](https://itrevolution.com/product/vibe-coding-book/),
by Gene Kim and Steve Yegge.
The time since its publication seems like forever ago in AI years.
Some things have changed:
engineers frivolously spent way too much money
[gaming the token leaderboards](https://blog.pragmaticengineer.com/the-pulse-tokenmaxxing-as-a-weird-new-trend/)
at their companies
("tokenmaxxing," as it came to be called),
which in hindsight was more than a bit short-sighted.
Some things have evolved:
coding agent orchestrators can be true "gas guzzlers" in their own right when it comes to token spend.
But almost all the guidance is deeply foundational, and remains true now.

I bought it in January 2026 but didn't pick it up right away.
On a skim, the altitude it was aiming at seemed like old hat for me ("I already know that"),
when what I was actually hunting for was concrete guidance on how to make my Claude Code setup better.
That was me missing the forest for the trees.
The book re-instilled some key lessons
that will continue to shape my approaches for a very long time.
Much to the surprise of some folks who still take that term, "Vibe Coding,"
at what could be a pejorative face value,
this is a quite serious engineering book
that further underscores the need for many of the practices of *The DevOps Handbook*, especially
around establishing fast feedback loops.

I'm no stranger to vibe coding[^software-engineering],
and like many others I dove in head-first over the 2025-2026 holiday break
with Claude Code and Opus 4.5.
But it was comforting reading this book and knowing that my intuition was on the right track,
and realizing that I wasn't alone (and I wasn't crazy)
in thinking that the core engineering discipline the DevOps movement
spent a decade trying to establish
(and that other parallel movements like SRE have tried to instill)
is more important right now than it has ever been.

The difference in 2026 is that we are moving at a million miles an hour
and you are several orders of magnitude more likely to "crash the car" than you were in 2018,
and potentially needlessly burn a ton of cash in the process.

There's a recent line from Gergely Orosz that resonated with me,
from his Craft Conference 2026 talk,
[written up in The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/slow-down-to-speed-up):
*individual productivity is up, but team productivity is flat.*
Everyone feels faster;
the team isn't necessarily shipping any more than before.
I'll come back to why that isn't the paradox it sounds like,
but it's more or less the whole problem in a single sentence.

These lessons need reinforcing more than ever—and not just for engineers.

## It Turns Out This Is Still a DevOps Problem

*The DevOps Handbook* aggregated and distilled a set of ideas that were already understood
in the best engineering organizations of the time:
get things flowing fast from idea to production;
build feedback loops so that your systems tell you quickly when something is wrong;
foster a culture of continual learning and experimentation.

These weren't novel ideas on their own.
The hard part was always execution.
The book existed because the gap between where teams *were* and where they *needed to be* was enormous.

The *Vibe Coding* book doesn't discard this thinking; it doubles down on it.
The throughline is very similar:
fast flow, fast feedback, and the discipline to actually look at what's coming out the other end.
What's new is the speed at which you're now operating
and the scale at which mistakes compound when you're not watching.

I wrote about this compounding effect in practice earlier this year
in [A Tale of Acceleration and Compound Engineering](/2026/02/a-tale-of-acceleration-and-compound-engineering/):
the same CI workflows I used to wire up by hand over days or weeks
are now things I can stand up in a fraction of the time with AI assistance.
But the practices themselves—the tests, the linting, the repeatable pipelines—are
what made the speed possible in the first place.
The tools and models have gotten better,
but the engineering practices are the compounding force that *really* multiplies them.

And to be perfectly clear,
much like compounding financial investments,
compound engineering can go in one of two directions:
upward 📈, or downward 📉...

## The 100mph Crash

Instead of crashing the car at 30 miles per hour,
you're going to crash it at 100 miles per hour.
Or perhaps drive it backwards out the window and crash it into the trees,
like [Cameron in *Ferris Bueller's Day Off*](https://youtu.be/FVqqVlW1a34?si=SybyrNVI8TdZrZNZ&t=290), except
instead of a vintage Ferrari,
the collateral damage is a production system and someone's data.

Steve Yegge's cautionary tales in the book make this viscerally concrete.
In "The Vanishing Tests" story,
his AI silently deleted 80% of his test files.
There was no warning,
and no confirmation prompt;
it was just... gone.
In "The Vanishing Repository" story,
the AI nearly wiped his entire codebase,
with only an open terminal window containing the last unsaved copy standing between him
and losing weeks of work.

These aren't edge cases invented for dramatic effect.
They're war stories about what happens when you take your eyes off the road
and let the system drive at super highway speeds without any verification or validation or sanity checking.[^guardrails]
Based on my own experience,
I can confidently say we are quite a ways off from "self-driving" in the vibe coding era,
and even if we aren't,
it may mean you can do *semi*-autonomous self-driving with vibe coding
*only because you took the time and care to put all of these best practices and validation in place*.

None of this means everything needs the full ceremony.
If you're spiking a throwaway prototype,
exploring an unfamiliar API,
or sketching an idea you'll delete by Friday,
move fast and loose;
that's exactly the right speed.
The discipline isn't something you need on every line of code;
it's what you put in place once the code stops being an experiment.
The failure mode is forgetting which mode you're in,
and letting the weekend prototype quietly graduate into production
without ever stopping to add the things production demands.

I've [written about this from my own experience](/2025/09/pinocchio-is-not-a-real-boy/).
When I contributed a fix to a React frontend in an area where I'm not strong,
the AI output looked *great*—polished, confident, complete.
And that was exactly the problem.
Left to my own devices I would never have attempted this;
rather, I would have explored the codebase and handed off guidance to a dev who knew the terrain.
Instead the AI wrote it quickly,
and I had to study the output 10x more carefully,
slow down to ask "why did it do *that*,"
and ultimately catch a couple of mistakes
that only my gut feeling ("something is not right here") would have flagged.[^durable-files]
Tasting the soup matters—not just the final dish,
but also as it cooks.

The tools have democratized code generation to the point where a director of marketing
can genuinely commit to Git.[^ive-seen-it-happen]
But when their "intern" helping them is an AI model embedded in a non-engineering workflow,
the mistakes don't get caught in code review.
They get caught in production.[^if-they-have-help]

## The CFO Is Side-Eyeing Your Tokens 👀

Something else has shifted in the last few months
since *Vibe Coding* was published.
Finance departments up until now have been much like the Ents of Fangorn[^ents-of-fangorn]:
slow to wake,
slow to rouse,
not quite convinced anything was urgent enough to march on.
Then Saruman (us engineering wizards) started burning their forest (their cash) at an alarming rate.
Now, Finance is awake.[^finance-is-awake]
(As is a certain CEO.)[^as-is-a-certain-ceo]

The AI bills are real and visible,
and the question CFOs are asking—*where is the impact?*—is
a fair one that deserves a better answer than "trust the process."[^measuring-ai-value]

The instinct that got us here,
namely "reach for the biggest, most capable model, fire away,"
is the right instinct if you're trying to maximize quality on a single critical output
and cost is genuinely no object.
But most organizations aren't in that position,
and most *tasks* don't warrant firing up a top-tier model:
summarizing a Jira ticket,
drafting a quick email,
wiring up some glue code.[^model-selection]
These don't need the heaviest model available; they need a fast, cheap one
that you can iterate on quickly within tight feedback loops.

In many ways, token efficiency *is* the ROI story.
I wish we could say it's as simple as an instrumentation problem,
but even if you wanted to
you can't realistically observe someone
reflexively reaching for the most powerful model in a chat window or an IDE plugin.
A lot of that usage is opaque by design,
and even trying to observe it all will likely create a larger bill just from that effort alone.
What you *can* control is what your tooling defaults look like.
The DevOps parallel isn't observability—it's provisioning policy.
You don't stop over-provisioned EC2 instances by monitoring them after the fact;
you change the defaults,
set controls at the provisioning layer,
and build a culture around right-sizing.
That's the same problem here: steer toward the right-sized model at the point of configuration,
not at the point of observation.

The hardware frontier is worth watching here, too.
Local inference on Apple Silicon—M5 Max and above—is
becoming increasingly capable,
and there's an argument hiding in plain sight:
most developers are getting new laptops periodically anyway.
Speccing up to hardware that can run a solid open-source model locally
costs incrementally more than a baseline machine,
but could vastly reduce the API bill for that developer entirely,
or give them an escape hatch when they hit their monthly limit with frontier models
with vendor coding agent tools.
Contrast that with standing up OSS model hosting on cloud compute,
which trades the API bill for GPU instance and cloud infra costs and an ops burden.
There is no free lunch.[^ram-prices]
But there is likely a *right-sized* one that fits within your proverbial AI per diem.

## Slow Down to Speed Up

Back to that Orosz line—*individual productivity is up, but team productivity is flat.*

It's not a paradox if you've read *The DevOps Handbook*.
An individual moving faster through a system without feedback loops
doesn't make the *system* faster; it creates more in-flight work,
more unverified assumptions,
and more places for things to quietly go wrong.
You're shipping code faster.
You're not necessarily shipping *better* code faster—not
quality code,
not the kind of modular, decoupled architecture
that gives you optionality and room to evolve.
*Vibe Coding* surfaces an old maxim that fits here: "You can't un-blend two frogs."
Move fast without the feedback infrastructure
and you're just as likely to end up with a big ball of mud
that even AI will struggle with, and cost you a small fortune to untangle.

The missing ingredient is the feedback infrastructure:
tests that run on every commit,
CI that catches regressions before they hit main,
observability so you know when something breaks in the dark.

*The DevOps Handbook* said this years ago.
*Vibe Coding* says it again for the AI era.
The practices don't care what year it is.

They *enable* speed, the kind that compounds over time
rather than the kind that quietly accretes debt
until the car drives itself backwards out the window.

## Read the Books, But Do the Work

Reading a book doesn't change behavior on its own.
If it did, we wouldn't have needed a decade of DevOps books covering the same ideas in different clothes.

But if you haven't read [*The DevOps Handbook*](https://itrevolution.com/book/the-devops-handbook/),
there's no better time.
And if you haven't read [*Vibe Coding*](https://itrevolution.com/product/vibe-coding-book/),
set aside whatever the name might conjure—it earns the serious treatment.

The real takeaway, though,
is that the practices—tests, CI, fast feedback loops, observability—are the thing.
Not the books, not the tools, not the models.
The practices are what let you drive at 100mph
without ending up like Cameron's Ferrari mangled on the forest floor.

The weeks where I personally moved *fastest* were always the ones
where I had the feedback infrastructure already in place.
Tests caught what the model got confidently wrong.
CI ran in minutes and I knew before I merged.
The loop was tight enough that the AI's mistakes
were a course correction, not a production incident.

That's the lesson.
Tokens cost money, but as *Vibe Coding* reminds us,
*time* is the resource you can't recover.
You can optimize your spend and right-size your models.
You cannot get back the time spent untangling a codebase
that was shipped fast but built without guardrails.
It was the lesson in 2018,
and it's the lesson now.

## Footnotes

[^second-edition]:
    It wasn't even the second edition when we read it as a team; the second edition came out in 2021,
    and I'm sure it's a great update.

[^software-engineering]:
    Or as I like to often provocatively call it, "Software Engineering,"
    because I believe what we're witnessing is the natural evolution of the craft.

[^guardrails]:
    I almost used the term "Guardrails" here but decided to take it out.
    The problem with the term "Guardrails" is much like the term "Governance,"
    in that they mean 12 different things to 12 different people,
    and some folks often bandy these terms about glibly
    without actually articulating what they mean;
    or worse, just to sound smart.
    I'm a much bigger fan of the concrete terms behind these terms,
    like "testing" and "linting" and "verification" and "validation" and "evaluation."
    Otherwise it's an exercise in
    ["What do you mean?"](https://www.youtube.com/shorts/uU16hjqpcHc).
    But I digress...
    Watch out for another blog post on these overloaded pet peeve terms in the future,
    because I haven't gotten it out of my system yet.
    (And yes, I see the irony that the photo up top literally praises "guard rails."
    The physical kind, the sort that stops a careless driver from sailing off a cliff,
    is exactly the concrete thing I have in mind;
    it's the vague buzzword version I'm allergic to.)

[^durable-files]:
    One pattern worth building into your workflow:
    when you work through unfamiliar terrain with an AI and come out the other side with newly captured understanding,
    capture those learnings in a durable reference file in the repo.
    Future agents—and future you—can pull from that context rather than deriving it from scratch.

[^ive-seen-it-happen]:
    I've seen it happen.

[^if-they-have-help]:
    That is, if anyone even has the time or attention or energy or incentive or willingness to help a non-engineer take
    what could be a very tangled mess with likely no auth to production...
    I've become convinced that this type of thing is possible,
    but only with the help of very streamlined platforms and approaches and best practices talked about here,
    which even us actual software engineers often struggle to get completely in place organizationally for ourselves,
    let alone non-engineering folks;
    and even then non-engineers are going to need the hand-holding of at least a junior engineer to help them get there.

[^ents-of-fangorn]:
    (To my Finance partners, understand that this is a light-hearted blog post
    and I respect you way more than talking trees in a fantasy book.)
    In Tolkien's *The Lord of the Rings*, the Ents are ancient, deliberate tree-herders who dwell in Fangorn Forest.
    The most cardinal sin in their eyes is being *hasty*.
    In *The Two Towers*, Saruman's forces had been cutting and burning Fangorn to fuel the forges of Isengard—a
    fact the Ents were slow to notice, and slower still to act on.
    When they finally decided something must be done,
    they marched on Isengard and tore it apart stone by stone.
    The moral, for our purposes: don't burn the forest of whoever controls the budget.
    They will notice.
    They will march.
    Gandalf on the other hand controlled the Flame of Anor,
    and we can probably all learn a thing or two from him about using some restraint.
    Maybe you only fire up Fable 5 (if we ever get it back)
    when you encounter the software engineering equivalent of a Balrog
    or one of the Nazgûl.

[^finance-is-awake]:
    [Uber burned through its entire 2026 AI budget in four months.](
    https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/)
    After rolling out Claude Code to engineers in December 2025,
    per-engineer costs ran between $500–$2,000 per month,
    and by April the budget was gone.
    Uber's COO admitted he couldn't connect the token spend to anything customers could actually see.
    The company has since capped individual spending at $1,500 per tool per month.
    Microsoft quietly cancelled internal Claude Code licenses around the same time.
    Uber is not alone.

[^as-is-a-certain-ceo]:
    It's been reported that a certain CEO just recently
    [yanked all AI out of their company](
    https://ehandbook.com/the-first-company-wide-ai-ban-just-hit-my-inbox-heres-what-it-means-00bf365fa48d)
    due to an extreme deluge of AI slop,
    some of which went out in customer-facing emails
    and wound its way back to said CEO via a customer support agent.
    Yikes.

[^measuring-ai-value]:
    Far be it from me to be one of those folks who suggest some harebrained endeavor
    to measure the ROI and/or value of AI,
    which I believe to be a fool's errand to do in the micro sense
    (and the realm of fancy suit-and-tie management consultants who need something to do),
    but in the macro sense I think you can measure it in the more oblique way
    that we're used to measuring strategic goals and KPIs and OKRs and outcomes, etc.
    Though I'd caveat even that:
    the cadence we run these on often feels too antiquated and long-horizon for the pace technology moves at now.
    Some still make sense, like quarterly or annual sales targets,
    but I've watched plenty of KPIs and OKRs go irrelevant inside of six weeks
    as the industry lurches forward and the business circumstances underneath them shift just as fast.
    Put simply, are you achieving the strategic intent and strategic scope you're after?
    Used effectively, AI should be the grease on the wheels to help you achieve your goals.
    I wasn't old enough to know,
    but I hear stories about people trying to quantify the value of spellcheck in word processors back in the day.
    As silly as that sounds now,
    the value of spellcheck is inherently obvious
    in any public-facing document you've ever published from your company...

[^model-selection]:
    Tight feedback loops, linting, and validation practices
    are exactly what can make smaller models wildly effective:
    you don't need the biggest model when you have a fast enough correction signal.
    A practical habit when spinning up a coding agent: ask the model itself which model is best suited for the task.
    More often than not, it won't recommend the largest one.
    For helping me edit and review this post, Claude Code recommended Sonnet, not Opus—and it was the right call.
    This point was reinforced concretely when Anthropic's Fable 5 model experienced a period of unavailability in
    mid-2026, and is still unavailable at the writing of this post:
    anyone who had defaulted to routing all their AI work through the newest top-tier model found themselves
    blocked, underscoring the value of workflows that can fall back to a smaller, always-available model rather than
    depending on any single one.

[^ram-prices]:
    Especially with today's RAM prices, jeez.
