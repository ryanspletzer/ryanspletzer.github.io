---
layout: post
title: It's the DevOps Handbook All Over Again
date: 2026-06-27 00:00:00
description: >
  Gene Kim and Steve Yegge's Vibe Coding makes the case
  that the DevOps Handbook's teachings—fast flow, fast feedback, discipline—matter
  more in the AI era, not less.
tags:
 - devops
 - vibe-coding
 - ai
---

![A colorized 1920s postcard photograph of an automobile perched on a narrow ridge road in Los Angeles County, with a wooden guardrail along the precipitous edge; a caption at the bottom reads "Guard rails sometimes save careless drivers."](/assets/images/Car_accident_in_the_1920s_(38083620606).png)
*Cassowary Colorizations, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0),
via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Car_accident_in_the_1920s_(38083620606).png)*.

Back in 2018 when I just started my new job,
my manager took the team through the exercise of reading
[*The DevOps Handbook*](https://itrevolution.com/book/the-devops-handbook/).[^second-edition]

I had actually already read *The DevOps Handbook* once before,
but was happy to do it again as a team exercise,
because the practices contained within those pages were quite important,
and essential to some of the key initiatives that the team was trying to accomplish around that time.

Fast-forward to 2026,
and I just finished reading a new book
I'd been meaning to get to since its release in October 2025:
[*Vibe Coding*](https://itrevolution.com/product/vibe-coding-book/),
by Gene Kim and Steve Yegge.
October 2025 feels like forever ago in AI years.
Some things have changed:
engineers frivolously spent way too much money
[gaming the token leaderboards](https://blog.pragmaticengineer.com/the-pulse-tokenmaxxing-as-a-weird-new-trend/)
at some companies
(a form of "tokenmaxxing," as it came to be called),
which in hindsight was more than a bit short-sighted.
Some things have evolved:
higher-level coding agent orchestrators[^orchestrators]
can be true "gas guzzlers" in their own right when it comes to token spend.
But almost all the guidance from this new book is deeply foundational, and remains true now.

I bought *Vibe Coding* in January 2026 but didn't pick it up and read it right away.
On my first flip-through, the altitude it was aiming at seemed like old hat for me ("I already know that"),
when what I was actually hunting for was concrete guidance on how to make my Claude Code setup better.
That was me missing the forest for the trees.
The book re-instilled several core principles
that will continue to shape my approaches for a very long time.
Much to the surprise of some folks who still take that term, "vibe coding,"
at what could be a pejorative face value,
this is a quite serious engineering book
that further underscores the need for many of the practices of *The DevOps Handbook*, especially
around establishing fast feedback loops.

I'm no stranger to vibe coding[^software-engineering],
and like many others I dove in head-first over the 2025-2026 holiday break
with Claude Code and Opus 4.6.[^first-time-trying-claude-code]
But it was comforting reading *Vibe Coding* and knowing that my intuition was on the right track,
realizing that I wasn't alone (and I wasn't crazy)
in thinking that the core engineering discipline the DevOps movement
spent a decade trying to establish
(and that other parallel movements like SRE have tried to instill)
is more important right now than it has ever been,
in order to use these approaches effectively and safely.

The difference in 2026 is that we are moving at a million miles an hour
and you are several orders of magnitude more likely to "crash the car" than you were in 2018,
and potentially needlessly burn a ton of cash in the process.
And there's an added dimension to all this: the individual versus the team.
A line from Gergely Orosz's recent Craft Conference 2026 talk,
[written up in The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/slow-down-to-speed-up),
really resonated with me:
*individual productivity is up, but team productivity is flat.*
Everyone feels faster,
but the team isn't necessarily shipping any more than before.

These DevOps lessons need reinforcing more than ever,
for everyone now in the driver's seat, engineer and non-engineer alike.

## It Turns Out This Is Still a DevOps Problem 🧑‍💻

*The DevOps Handbook* aggregated and distilled a set of ideas that were already understood
in the best engineering organizations and high-performing companies of the time:
get things flowing fast from idea to production;
build feedback loops so that your systems tell you quickly when something is wrong;
foster a culture of continual learning and experimentation.

These weren't novel ideas on their own.
The hard part was always execution.
The gap between where teams *were* and where they *needed to be* was enormous,
and the know-how lived in the heads of a set of elite teams at certain companies.
*The DevOps Handbook*'s job was to distill and crystallize that knowledge
into one place the rest of us could learn from.

*Vibe Coding* doesn't discard this thinking; rather, it leans into it.
The throughline is very similar:
fast flow, fast feedback, and the discipline to actually look at what's coming out the other end.
What's new is the speed at which you're now operating
and the scale at which mistakes compound when you're not watching.

I wrote about this compounding effect in practice earlier this year
in [A Tale of Acceleration and Compound Engineering](/2026/02/a-tale-of-acceleration-and-compound-engineering/):
the same CI workflows that I used to wire up by hand over days or weeks
are now things I can stand up in a fraction of the time with AI assistance.
But the practices themselves—the tests, the linting, the repeatable pipelines—are
what made the speed benefits durable.
The tools and models have gotten better,
but the engineering practices are the compounding force that *really* multiplies them.

And to be perfectly clear,
much like compounding financial investments,
compound engineering can go in one of two directions:
upward 📈, or downward 📉...

## The 100mph Crash 💥

Instead of crashing the car at 30 miles per hour,
you're going to crash it at 100 miles per hour.
Or perhaps drive it backwards out the window and crash it into the trees,
like [Cameron in *Ferris Bueller's Day Off*](https://youtu.be/FVqqVlW1a34?si=SybyrNVI8TdZrZNZ&t=290), except
instead of a vintage Ferrari,
the collateral damage is a production system and someone's data.

Steve Yegge's cautionary tales in *Vibe Coding* make this viscerally concrete.
In "The Vanishing Tests" story,
his agent silently deleted 80% of his test files.
There was no warning,
and no confirmation prompt;
it was just... gone.
In "The Vanishing Repository" story,
a branch cleanup exercise with his agent nearly tossed his codebase history going back many weeks,
with only an open terminal window containing the last unsaved copy standing between him
and losing his entire TypeScript client he was writing.

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
The discipline isn't something you need on every line of code in every single endeavor, however small it might be;
the discipline is what you put in place once the code stops being an experiment.
The failure mode is forgetting which mode you're in,
and letting the weekend prototype quietly graduate into production
without ever stopping to add the things production demands.

I've [written about this from my own experience](/2025/09/pinocchio-is-not-a-real-boy/).
When I contributed a fix to a React frontend in an area where I'm not strong,
the AI output looked *great*.
And that was exactly the problem.
Left to my own devices I maybe wouldn't have attempted this in the first place;
rather, I would have searched around docs online,
explored the codebase a bit to try to find the related files,
attempted to make a minimal viable edit on a branch,
but ultimately would have handed off guidance to a fellow engineer who better knew the terrain
of this project and of frontend engineering with React.
Instead the AI wrote it quickly,
more than was needed, actually,
and I had to study the output 10x more carefully,
slow down to ask "why did it do *that*,"
and ultimately catch a couple of mistakes
that only my gut feeling ("something is not right here") would have flagged.[^durable-files]
Tasting the soup matters—not just the final dish,
but also as it simmers.

The tools have democratized code generation to the point where a director of marketing
can genuinely commit to Git.[^ive-seen-it-happen]
But when their "intern" helping them is an AI model embedded in a non-engineering workflow,
the mistakes don't get caught in code review.
They get caught in production.[^if-they-have-help]

## The CFO Is Side-Eyeing Your Tokens 👀

Production incidents are one kind of expensive.
There's another bill coming due,
and it's the literal one.

This shift is recent,
landing in the months since *Vibe Coding* was published.
Finance departments up until now have been much like the Ents of Fangorn[^ents-of-fangorn]:
slow to wake,
slow to rouse,
not quite convinced anything was urgent enough to march on.
Then Saruman (us engineering wizards) started burning their forest (their cash) at an alarming rate.
Now, Finance is awake.[^finance-is-awake]
(As is a certain CEO.)[^as-is-a-certain-ceo]

The AI bills are real and visible,
and CFOs are asking a fair question: *where is the impact?*
It deserves a better answer than "trust the process."[^measuring-ai-value]

There's a historical echo here.
From roughly 2020 to 2022,
cheap capital and a growth-at-all-costs mood pushed a lot of companies to over-hire,
treating headcount as a proxy for ambition.
The correction arrived as layoffs and a sudden corporate religion of "efficiency" and "doing more with less."
The last six months or so have echoed that arc,
except this time maybe we over-hired *AI*:
we provisioned maximum horsepower for everything,
treated raw token spend as a proxy for being "AI-native,"
and only later started asking what all of it actually shipped.
Right-sizing your model usage may be part of that same type of correction,
just applied to compute instead of people.

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
A practical habit: ask the agent itself which model is best suited for the task;
more often than not, it won't recommend the largest one.
It's the same judgment as knowing which mode you're in:
the discipline that tells you when a prototype has graduated and earned real tests
is the discipline that tells you when a task has earned the bigger model.

This judgment compounds the moment you're delegating to subagents rather than prompting one at a time.
A tool like Claude Code will sometimes hand the lighter, more mechanical steps—say, a codebase search—to
a smaller, faster model on its own,
the way its built-in Explore subagent runs read-only searches on Haiku,
but the defaults only get you so far.
Deciding which subagent runs on which model,
with the heavy reasoning on the top tier and the search, summarization, and boilerplate on something cheap,
is a deliberate design choice, and one of the bigger levers you have on token efficiency.
That said, fanning out a dozen subtasks to a dozen subagents,
each using a top-tier model,
is exactly the kind of gas guzzler that can empty the tank;
and that's just with subagents...
Higher-order coding agent orchestrators can guzzle even quicker.

In many ways, token efficiency *is* the ROI story.
I wish we could say it's as simple as an instrumentation problem,
but even if you wanted to,
you can't realistically observe someone
reflexively reaching for the most powerful model in their terminal or an IDE plugin.
A lot of that usage is opaque by design,
and even trying to observe it all will likely create a larger bill just from that effort alone.

And there's a deeper problem than cost or observability:
you simply cannot micromanage the way people use AI,
prescribing which model for which task, prompt by prompt and person by person.[^goodhart]
There are too many people, too many tasks,
and the terrain shifts by the week.
It is far better to set reasonable caps,
give people real guidance on how to be efficient,
and trust them to work within them.
To put this AI usage micromanaging in terms we've used for a long time: *it doesn't scale.*

What you *can* control is what your tooling defaults look like.
The DevOps parallel isn't observability—it's provisioning policy.
You don't stop over-provisioned EC2 instances by monitoring them after the fact;
you change the defaults,
set controls at the provisioning layer,
and build a culture around right-sizing.
Models are quite similar: steer toward the right-sized one at the point of configuration,
not at the point of observation.[^provisioning-analogy]

Step back, and it's clear we're still in the stick-shift era of these tools.
You choose the model, dial in the effort, sometimes explicitly route to the subagents—shifting gears by hand
every time the road changes.
The automatic hasn't arrived yet:
tooling that quietly picks the right-sized model and effort for the moment
and lets you keep your eyes on the road, your hands upon the wheel.[^roadhouse-blues-the-doors]
(Full self-driving, where you just state where you want to go and hand over the keys entirely, is further off still.)
For now, knowing how to drive stick is part of the job.[^driving-stick]

There's a psychological shift underneath all of this that we haven't fully absorbed:
we are not yet used to paying for software by consumption.
Enterprises have made their peace with it through cloud,
where you provision a database or a fleet of instances
and more or less know you're paying for what you actually use to host something, within reason.
But day-to-day AI usage is a different animal:
jagged, unpredictable, and driven by the individual rather than steady infrastructure,
which makes it much harder to forecast and requires sensible budgets and limits.
(Ask me how I know...)
Consumers have even less intuition for any of this.
Imagine paying for Netflix by the minute;
the meter running in the background would change how it feels to press play.
That's roughly the discomfort of watching a token counter tick up while you work.

For me that sets a concrete threshold.
A flat monthly subscription, even a pricey one, keeps the meter out of sight,
and right now it's a great subsidy:
the labs are still eating a lot of the true compute cost to win the land grab,
so a flat plan buys far more than the same dollars would at metered rates.
I'll happily spend $100 or $200 a month[^dial-up-and-down] while the subsidy lasts,
because renting at that price makes more sense than amortizing the cost of my own hardware.
Even after it ends I'd keep spending something with the frontier labs;
they'll still be the sharpest tools for the hardest problems.
But some months I'd sail well past that number,
and that's exactly when I'd want a local fallback of my own.
The minute consumer plans move to pure consumption pricing
is the minute my calculus flips to "okay, when do I build my next tower PC to run models locally?"
A local model is also how I'd want to first try a token-hungry agent orchestrator like
[Gas Town](https://github.com/gastownhall/gastown),
dipping a toe in without one runaway experiment blowing the whole month's budget.

The hardware frontier is worth watching here, too.
Local inference on Apple Silicon—M5 Max and above—is
becoming increasingly capable,
and there's an argument hiding in plain sight:
most developers are getting new laptops periodically anyway.
Speccing up to hardware that can run a solid open-source model locally
costs incrementally more than a baseline machine,
but could vastly reduce the API bill for that developer entirely,
or give them an escape hatch when they hit their reasonable monthly limit on frontier models
in vendor coding agent tools.
Contrast that with standing up your own OSS model hosting,
which trades the API bill for GPU instances and cloud infra costs and an ops burden.
This is really the old build-versus-buy question wearing new clothes,
the same spectrum we already know from the rest of cloud:
consumption-priced serverless at one end
(call a frontier API, pay per token, run no infrastructure of your own),
a managed middle
(a service like Amazon SageMaker that hosts an open model for you),
and rolling it entirely yourself at the other
(VMs or Kubernetes in the cloud, or bare metal in your own datacenter).
Each tier trades dollars for control and operational burden in a different ratio.
There is no free lunch.[^ram-prices]
But there is likely a *right-sized* lunch that fits within your proverbial AI per diem.

To be honest, the target keeps moving.
The best open-source models are already outgrowing what a laptop can hold,
and they have started outgrowing modest self-hosting too.
GLM-5.2, released in June 2026 under a permissive MIT license,
is a 744-billion-parameter mixture-of-experts model that
[beats GPT-5.5 on several long-horizon coding benchmarks at a sixth of the cost](https://venturebeat.com/technology/z-ais-open-weights-glm-5-2-beats-gpt-5-5-on-multiple-long-horizon-coding-benchmarks-for-1-6th-the-cost).
It activates only about 40 billion parameters per token,
but you still have to keep all 744 billion resident in memory to serve it—and
none of that fits on a laptop, or on a single modest GPU box.
Open weights does not mean locally runnable,
and the OSS frontier is drifting toward the same "someone else has to host this" reality as the closed models,
which folds it right back into that build-versus-buy spectrum.

Even so, don't count the laptop out.
The open models small enough to run locally today
are already very capable across a wide range of everyday tasks,
and the efficiency techniques that keep landing—quantization, distillation, smarter sparsity—pull
more capability down onto hardware you already own.
The locally feasible ceiling is rising even as the frontier sprints away from it.

## Slow Down 🐢 to Speed Up 🐇

Back to that Gergely Orosz line—*individual productivity is up, but team productivity is flat.*

It's not a paradox if you've read *The DevOps Handbook*.
An individual moving faster through a system without feedback loops
doesn't make the *system* faster; it creates more in-flight work,
more unverified assumptions,
and more places for things to quietly go wrong.
You're shipping code faster.
You're not necessarily shipping *better* code faster—not
quality code,
and not the kind of modular, decoupled architecture
that gives you optionality and room to evolve.
That same modularity is increasingly what lets multiple agents, like humans, work on a codebase in parallel
without stepping on each other and colliding in major merge conflicts;
the cleaner the boundaries between components, the more safely that parallel work scales.
The fast-but-careless path does the opposite:
it quietly backs you into an architectural corner,
where every decision forecloses the next one
and each later change costs more than the one before it.
*Vibe Coding* surfaces an old maxim, which I had never heard before, but fits aptly here:
"You can't un-blend two frogs."
Move fast without the feedback infrastructure
and you're just as likely to end up with a big ball of mud
that even AI will struggle with and will cost you a small fortune to untangle.[^untangle]

The missing ingredient is the feedback infrastructure:
tests that run on every commit (or perhaps even every file save operation),
ideally as close to the developer as possible,
and CI that catches issues (perhaps even with additional structured AI review) before they hit main,
and, for live systems,
observability so you know when something breaks in the dark.[^all-you-need-is-traces]

None of this is free.
A single engineer can pick up the tools and feel faster almost overnight.
Building the feedback infrastructure that makes the *team* faster is a different kind of work—slower,
less glamorous,
and impossible to do alone.
It takes a real investment of time and energy,
and leadership willing to buy in and protect that time when the pressure is to just ship.[^pressure-to-ship]
That asymmetry is the gap behind Gergely's line:
the individual gains are cheap,
and the team gains are expensive.

*The DevOps Handbook* said this years ago.
*Vibe Coding* says it again for the AI era.
The practices don't care what year it is.

That's the speed these practices enable:
the kind that compounds in your favor,
not the kind that compounds debt until the car drives itself backwards out the window.

## Read the Books 📚, But Do the Work 🛠️

Reading a book doesn't change behavior on its own.
If it did, this post wouldn't need to exist,
and neither would the long line of books that keep (rightfully) restating the same lessons for each new era.

But if you haven't read [*The DevOps Handbook*](https://itrevolution.com/book/the-devops-handbook/),
there's no better time.
And if you haven't read [*Vibe Coding*](https://itrevolution.com/product/vibe-coding-book/),
set aside whatever the name might conjure—it earns the serious treatment.

The real takeaway, though,
is that the practices—tests, CI, fast feedback loops, observability—are the thing.
Not the books, not the tools, not the models.
The practices are what let you drive at 100mph
without ending up like Cameron's dad's Ferrari mangled on the forest floor.

The weeks where I moved *fastest* with my own personal projects were always the ones
where I had the feedback infrastructure already in place.
Tests caught what the model got confidently wrong.
CI ran in minutes and I knew before I merged.
The loop was tight enough that the AI's mistakes
were a course correction, not a production incident.

Tokens cost money,
but misspent tokens cost you something you truly can't get back: time.
As *Vibe Coding* reminds us,
time is the one resource you can't recover, even for personal projects.
You can right-size your models to rationalize your token spend;
the same tight loops from DevOps are what make the cheaper models viable to lean on.
You can't, however, buy back the *hours* spent untangling an untested and architecturally jumbled codebase
that was shipped fast but built without the feedback infrastructure—both
automated loops and manual inputs from skilled practitioners—to
keep things on the rails;[^security]
it's the guiding hands of humans with good judgment
that keep the codebase testable and in an architecturally sound state where it can actually be iterated on
by AI, and humans, in the future.

We keep hearing that code is "free" now.

It is so, so not.

## Footnotes

[^second-edition]:
    It wasn't even the second edition when we read it as a team; the second edition came out in 2021,
    and I'm sure it's a great update.

[^orchestrators]:
    [Ruflo](https://github.com/ruvnet/ruflo),
    [Gas Town](https://github.com/gastownhall/gastown),
    Claude Code's [Agent Teams](https://code.claude.com/docs/en/agent-teams),
    Codex's [Symphony](https://github.com/openai/symphony),
    and [the like](https://rywalker.com/research/autonomous-agentic-engineering-tools).

[^software-engineering]:
    Or as I often provocatively like to call it, "Software Engineering,"
    because I believe what we're witnessing is the natural evolution of the craft.

[^first-time-trying-claude-code]:
    My first time trying out Claude Code was very briefly near when it was released in general availability
    in May 2025,
    when the tool itself was more limited compared to its much more evolved version today.
    I remember thinking "What is this thing?" followed by
    "Oh my God, this is a very different way of looking at the software engineering world."
    I knew that for some, getting out of the IDE and the comfort of tools like Cursor would feel unnatural,
    but it's been worth the leap for me.

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
    (And yes, I see the irony that the photo up top literally praises "guard rails,"
    the physical kind, the sort that stops a careless driver from sailing off a cliff,
    is exactly the concrete thing I have in mind.
    It's the vague buzzword version I'm allergic to.)

[^durable-files]:
    One pattern worth building into your workflow:
    when you work through unfamiliar terrain with an AI and come out the other side with newly captured understanding,
    capture those learnings in a durable reference file in the repo.
    Future agents—and future you—can pull from that context rather than deriving it from scratch.

[^ive-seen-it-happen]:
    I've seen it happen.

[^if-they-have-help]:
    That is, if anyone even has the time or attention or energy or incentive or willingness to help a non-engineer take
    what could be a very tangled mess with likely no auth (or flawed auth) to production...
    I've become convinced that this type of thing is possible,
    but only with the help of very streamlined platforms and approaches and best practices talked about here,
    which even us actual software engineers often struggle to get completely in place organizationally for ourselves,
    let alone for non-engineering folks;
    and even then non-engineers are going to need the hand-holding of at least a junior engineer,
    who has a solid set of practices and tooling, etc. to operate on,
    to help them get there.

[^ents-of-fangorn]:
    (To my Finance partners, understand that this is a light-hearted reference in a blog post
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
    Maybe you only fire up Fable 5
    ([if we ever get it back](https://decrypt.co/372004/leaked-code-anthropic-preparing-fable-5-subscription))
    when you encounter the software engineering equivalent of a Balrog
    or one of the Nazgûl.

[^finance-is-awake]:
    As one example, [Uber burned through its entire 2026 AI budget in four months.](
    https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/)
    After rolling out Claude Code to engineers in December 2025,
    per-engineer costs ran between $500–$2,000 per month,
    and by April the budget was gone.
    Uber's COO admitted he couldn't connect the token spend to anything customers could actually see.
    The company has since capped individual spending at $1,500 per tool per month.
    Microsoft
    [quietly cancelled internal Claude Code licenses](https://thenextweb.com/news/microsoft-claude-code-retreat-ai-cost)
    around the same time.
    Uber is not alone.

[^as-is-a-certain-ceo]:
    It's been reported that a certain unnamed CEO just recently
    [yanked all AI out of their company](
    https://ehandbook.com/the-first-company-wide-ai-ban-just-hit-my-inbox-heres-what-it-means-00bf365fa48d)
    due to an extreme deluge of AI slop,
    some of which went out in customer-facing emails
    and wound its way back to said CEO via a (human) customer support agent.
    Yikes.

[^measuring-ai-value]:
    Far be it from me to be one of those folks who suggest some harebrained endeavor
    to measure the ROI and/or value of AI,
    which I believe to be a fool's errand in the micro sense
    (and the realm of fancy suit-and-tie management consultants who need something to do).
    In the macro sense, I think you can judge it in the same oblique way we judge any strategic bet:
    are you achieving the strategic intent and scope you're after?
    I'd steer away from the granular instruments, though.
    Additionally, the cadence we run strategic planning on
    often feels too antiquated and long-horizon for the pace technology moves at now;
    I've watched plenty of specific KPIs and OKRs go irrelevant inside of six weeks
    as the industry lurches forward and the business circumstances underneath them shift just as fast.
    Some plans still hold, like quarterly or annual sales targets,
    but the durable question is the high-level one, not the quarterly metrics.
    Used effectively, AI should be grease on the wheels toward your goals.
    I wasn't old enough to remember it firsthand,
    but I have heard stories about people trying to quantify the value of spellcheck in word processors back in the day.
    As silly as that sounds now,
    the value of spellcheck is inherently obvious,
    especially in any public-facing document you've ever published from your company...

[^model-selection]:
    Tight feedback loops, linting, and validation practices
    are exactly what can make smaller models more effective:
    you don't need the biggest model when you have a fast enough correction signal.
    The same point landed concretely when Anthropic's Fable 5 model experienced a period of unavailability in
    mid-2026, and is still unavailable at the writing of this post:
    anyone who had defaulted to routing all their AI work through the newest top-tier model found themselves
    blocked, underscoring the value of workflows that can fall back to a smaller, always-available model rather than
    depending on the top tier all the time.
    And it isn't only Anthropic:
    OpenAI's GPT-5.6 launched into a
    [deliberately staggered rollout at the U.S. government's request](https://www.engadget.com/2202129/openai-will-initially-only-release-chatgpt-5-6-to-government-approved-customers/),
    with federal officials approving access one customer at a time before any wider release.
    The newest, most capable model isn't always the one you can actually get,
    and it will be interesting to see how this plays out in the future in the U.S. with further model releases.

[^goodhart]:
    Heavy-handed measurement tends to backfire here for a related reason,
    one often boiled down to [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law):
    when a measure becomes a target, it stops being a good measure.
    (That crisp phrasing is actually Marilyn Strathern's restatement of economist Charles Goodhart's original.)
    Put a number on each person's token use,
    and you tend to get people managing the number rather than using AI well—gaming
    it, hoarding budget, or quietly routing around it—not
    the judicious efficiency you were after.

[^provisioning-analogy]:
    Notably, spinning up an EC2 instance is a relatively infrequent, deliberate act,
    whereas choosing a model happens far more often and far more dynamically,
    sometimes many times within a single working session.
    The major tools have also drifted toward explicit model selection rather than automatic routing.
    When GPT-5 launched in ChatGPT in August 2025,
    it shipped with an automatic router
    that picked the underlying model and reasoning depth on your behalf,
    pitched by Sam Altman as a way to retire the confusing model menu.
    The [backlash was swift, and OpenAI restored manual model selection within days](
    https://techcrunch.com/2025/08/12/chatgpts-model-picker-is-back-and-its-complicated/).
    And the compute angle isn't just folklore:
    The Register read the whole design as a [cost-cutting exercise](
    https://www.theregister.com/2025/08/13/gpt_5_cost_cutting/),
    since routing the bulk of traffic to smaller models and toggling reasoning off by default
    generates fewer tokens and costs less to run;
    Altman himself noted the router had pushed reasoning-model usage among free users from under 1% to 7%.
    Automatic routing lingered for the lower tiers, though,
    and by December 2025 OpenAI was
    [removing it for the Free plan and ChatGPT Go plan too](
    https://www.storyboard18.com/digital/chatgpt-free-users-shifted-to-gpt-5-2-instant-as-openai-scraps-automatic-model-switching-86042.htm)
    (ChatGPT Go being its cheaper paid plan
    introduced in August 2025 in certain markets and expanded to the U.S. and other countries in January 2026),
    defaulting them to GPT-5.2 Instant unless they deliberately reached for the heavier Thinking model—framed
    publicly as handing control back to users, though the reduced compute sure didn't hurt.
    As of this writing, ChatGPT exposes effort levels—Instant, Medium, High—and
    lets you drop from GPT-5.5 down to 5.4, 5.3, or o3,
    while Codex surfaces additional narrower options for small models like gpt-5.4-mini and gpt-5.3-codex-spark.
    Anthropic doesn't auto-route either:
    Claude Code has what they believe are sensible defaults
    but allows you to choose the model—Opus, Sonnet, or Haiku—and the reasoning effort yourself.
    Codex can also point directly at a local model;
    Claude Code currently expects you to stand up a compatible local proxy to do the same.
    The bottom line, at least for now, is that model and effort selection is very much a real, hands-on decision—unless
    you wrap them in your own routing layer,
    or skip these tools and go straight to the API with third-party tools,
    where the per-token pricing is yours to manage.
    (Enterprises are already feeling the per-token consumption pricing.)

[^roadhouse-blues-the-doors]:
    ["Roadhouse Blues" by the Doors](https://www.youtube.com/watch?v=n2_X4VTCoEo).

[^driving-stick]:
    I realize I say this as someone who is not at all versed in driving an actual manual automobile IRL.
    And I feel no need to, really.
    It feels like a solved problem...

[^dial-up-and-down]:
    The way I do this concretely is I ride the $20/mo Claude Pro plan
    and upgrade to the $100/mo Claude Max plan as needed,
    then immediately cancel Claude Max,
    and re-evaluate when to next upgrade when the plan downgrades the next month.
    If a particular period ever gets really heavy I can go up to $200
    (and similarly cancel right away).
    But there are inevitably lighter months where I don't need all the spend,
    and just riding a higher tier plan thus becomes wasteful.

[^ram-prices]:
    Especially with today's RAM prices, jeez.

[^untangle]:
    Or it could cost you a small fortune to start over.

[^all-you-need-is-traces]:
    This is the subject of a different, future blog post,
    but the tl;dr on Observability these days from the thought leaders in the space like Charity Majors and others
    is simply this:
    All you need is traces,
    aka OpenTelemetry spans, which are essentially wide events.
    I'm slightly over-simplifying, but if you have that, then the world is your oyster
    and you can slice and dice and report on those wide events to your heart's content.

[^pressure-to-ship]:
    And if you are feeling pressure to ship,
    I recommend carving off a subset of the team to focus on greasing the wheels with better practices
    while the rest continue to focus on delivery.

[^security]:
    And I didn't even mention the implications of security issues
    which I decided to not delve into in this particular post,
    as it's already a pretty lengthy one.
    Really though, security issues are another form of missed issues from feedback loops that should be in place,
    namely structured security reviews built into these practices.
