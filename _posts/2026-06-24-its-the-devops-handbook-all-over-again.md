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

![A massive unfinished stone tower spiraling into the clouds above a hazy landscape, with tiny figures,
buildings, and ships visible at its base; the tower's many arches and tiers are shown in different stages
of construction.](/assets/images/Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project.jpg)
*Pieter Bruegel the Elder, The Tower of Babel, c. 1563. Kunsthistorisches Museum, Vienna. Public domain,
via
[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project.jpg)*

Back in 2018 when I just started my new job,
my new manager took the team through the exercise of reading
[*The DevOps Handbook*](https://itrevolution.com/book/the-devops-handbook/).[^1]

I (being the precocious engineer that I was) had actually already read it once before,
but was happy to do it again as a team exercise,
because the lessons contained within those pages were quite important.

Fast-forward to 2026 and I just finished reading a new book by Gene Kim and Steve Yegge,
[*Vibe Coding*](https://itrevolution.com/product/vibe-coding-book/),
which—much to the surprise of some who still take that term at face value—at
a certain point during reading it,
you realize it is actually a quite serious engineering book
that re-treads many of the practices of *The DevOps Handbook*,
especially with regards to establishing fast feedback loops.

This is not a criticism at all—it's the whole point.

I'm no stranger to vibe coding,
but it was comforting reading this book and realizing I wasn't alone—and
I wasn't crazy—in thinking that the core engineering discipline the DevOps movement
spent a decade trying to establish
is more important right now than it has ever been.

The difference in 2026 is that we are moving at a million miles an hour
and you are several orders of magnitude more likely to "crash the car" than you were in 2018,
which underscores the very real need to reinforce these lessons—
for engineers and non-engineers alike.

## It Turns Out This Is Still a DevOps Problem

*The DevOps Handbook* encoded a set of ideas that were already understood
in the best engineering organizations of the time:
get things flowing fast from idea to production;
build feedback loops so that your systems tell you quickly when something is wrong;
foster a culture of continual learning and experimentation.

Not novel ideas on their own.
The hard part was always execution.
The book existed because the gap between where teams *were* and where they *needed to be* was enormous.

The *Vibe Coding* book doesn't discard this framework.
If anything, it accelerates into it.
The throughline is identical:
fast flow, fast feedback, and the discipline to actually look at what's coming out the other end.
What's new is the speed at which you're now operating
and the scale at which mistakes compound when you're not watching.

I wrote about this compounding effect in practice earlier this year
in [A Tale of Acceleration and Compound Engineering](/2026/02/a-tale-of-acceleration-and-compound-engineering/):
the same CI workflows I used to wire up by hand over days or weeks
are now things I can get going in 90 minutes with AI assistance.
But the practices themselves—the tests, the linting, the repeatable pipelines—are
what made the speed possible in the first place.
The tools and models have gotten better,
but the engineering practices are the compounding force that *really* multiplies them.

## The 100mph Crash

Instead of crashing the car at 30 miles per hour,
you're going to crash it at 100 miles per hour.
Or perhaps drive it backwards out the window and crash it into the trees,
like Cameron in Ferris Bueller's Day Off—except
instead of a vintage Ferrari,
the collateral damage is a production system and someone's data.

Steve Yegge's cautionary tales in the book make this viscerally concrete.
In "The Vanishing Tests," his AI silently deleted 80% of his test files.
No warning.
No confirmation prompt.
Just—gone.
In "The Vanishing Repository," the AI nearly wiped his entire codebase,
with only an open terminal window containing the last unsaved copy standing between him
and losing weeks of work.

These aren't edge cases invented for dramatic effect.
They're stories about what happens when you take your eyes off the road
and let the system drive at highway speed without guardrails.

I've [written about this from my own experience](/2025/09/pinocchio-is-not-a-real-boy/).
When I contributed a fix to a React frontend in an area where I'm not strong,
the AI output looked *great*—polished, confident, complete.
And that was exactly the problem.
It took me longer to review than it would have taken me to write by hand,
precisely because the code felt too good.
I had to study it 10x more carefully,
slow down to ask "why did it do *that*,"
and ultimately catch a couple of mistakes
that only my gut feeling ("something is not right here") would have flagged.
Tasting the soup matters—not just reading the final dish,
but watching it cook.

This is especially true for anyone who isn't an engineer by training,
and that's an increasingly large group now.
The tools have democratized code generation to the point where a director of marketing
can genuinely commit to git—I've seen it happen.
That's remarkable.
But when the "intern" is an AI model embedded in a non-engineering workflow,
the mistakes don't get caught in code review.
They get caught in production.
Or they don't get caught at all.

## The CFO Is Looking at Your Tokens

Something has shifted in the last few months,
and when I taste the soup on what's happening across the industry right now,
I keep noticing the same thing:
finance is awake.

The AI bills are real and visible,
and the question CFOs are asking—*where is the impact?*—is
a fair one that deserves a better answer than "trust the process."

The instinct that got us here—reach for the biggest, most capable model, fire away—is
the right instinct if you're trying to maximize quality on a single critical output
and cost is genuinely no object.
But most organizations aren't in that position,
and most *tasks* don't warrant firing up a top-tier model.[^2]
Summarizing a Jira ticket.
Drafting a quick email.
Wiring up some glue code.
These don't need the heaviest model available—they need a fast, cheap one
that you can iterate on quickly within tight feedback loops.

Token efficiency *is* the ROI story.
And finding it requires—you guessed it—measurement,
instrumentation,
and the discipline to actually understand what you're spending and why.
Which is, again, a DevOps problem dressed in different clothes.

The hardware frontier is worth watching here, too.
Local inference on Apple Silicon—M5 Max series,
and presumably the rumored MacBook Pro Ultra somewhere down the line—is
becoming increasingly capable,
and the idea of every developer running a solid open-source model locally
without touching a cloud API has obvious appeal from a cost standpoint.
But that requires top-of-the-line hardware per developer,
which is its own budget conversation.
Alternatively, your organization standing up OSS model hosting on cloud compute
trades the API bill for GPU instance costs and an ops burden.
There is no free lunch.
But there is a *right-sized* lunch,
and finding it requires the same instrumentation and feedback discipline
the *The DevOps Handbook* was teaching in 2016.

## Slow Down to Speed Up

Gergely Orosz recently gave a talk at Craft Conference 2026
and wrote it up in [The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/slow-down-to-speed-up)
with what I think is the most useful single observation about AI-assisted development I've heard this year:
*individual productivity is up, but team productivity is flat.*

That's not a paradox if you've read the *The DevOps Handbook*.
An individual moving faster through a system without feedback loops
doesn't make the *system* faster—it creates more in-flight work,
more unverified assumptions,
and more places for things to go quietly wrong.
You're shipping code faster.
You're not necessarily shipping *working* code faster.

The missing ingredient is the feedback infrastructure:
tests that run on every commit,
CI that catches regressions before they hit main,
observability so you know when something breaks in the dark.
The boring stuff that actually works.

This is what the *The DevOps Handbook* was saying in 2016.
This is what compound engineering practices look like in lived experience.
This is what the *Vibe Coding* book advocates for with AI in the loop.

None of these ideas are in conflict with speed.
They *enable* speed—the kind that compounds over time
rather than the kind that quietly accretes debt
until the car drives itself backwards out the window.

## Read the Books, But Do the Work

Reading a book doesn't change behavior on its own.
If it did, we wouldn't have needed a decade of DevOps books covering the same ideas in different clothes.

But if you haven't read the [*The DevOps Handbook*](https://itrevolution.com/book/the-devops-handbook/),
there's no better time.
And if you haven't read [*Vibe Coding*](https://itrevolution.com/product/vibe-coding-book/),
set aside whatever the name might conjure—it earns the serious treatment.

The real takeaway, though,
is that the practices—tests, CI, fast feedback loops, observability—are the thing.
Not the books, not the tools, not the models.
The practices are what let you drive at 100mph
without ending up like Cameron's Ferrari dangling above the forest floor.

The weeks where I moved *fastest* were always the ones
where I had the feedback infrastructure in place first.
Where the tests caught what the model got confidently wrong.
Where CI ran in minutes and I knew before I merged.
Where the feedback loop was tight enough that the AI's mistakes
were a minor course correction, not a production incident.

That's the lesson.
It was the lesson in 2018,
and it's the lesson now.

[^1]: It wasn't even the second edition when we read it as a team—the second edition came out in 2021, and I'm sure it's a great update.

[^2]: As of this writing, Fable has been temporarily unavailable—which has only further reinforced the point about right-sizing model selection.
