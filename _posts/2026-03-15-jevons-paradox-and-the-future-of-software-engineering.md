---
layout: post
title: "Jevons Paradox and the Future of Software Engineering"
date: 2026-03-07 00:00:00
description: >
  When things get cheaper, we use more of them, not less.
  William Stanley Jevons figured this out about coal in 1865.
  The cloud proved him right. AI will too,
  and that's good news for software engineers.
tags:
  - ai
  - economics
  - software-engineering
---

![Portrait of William Stanley Jevons.](/assets/images/William_Stanley_Jevons_portrait_extract.jpg)
*[William Stanley Jevons (via University of Manchester Libraries)](https://commons.wikimedia.org/wiki/File:William_Stanley_Jevons_portrait_extract.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0"), via Wikimedia Commons.*

Here's something that shouldn't be true but is:
when things get cheaper, we often spend more on them.

Think about lemons.

In the 1800s,
a lemon was an exotic luxury,
a tropical fruit shipped from far away at great expense.
Only the wealthy could afford them regularly.
As shipping and agriculture improved,
the price per lemon plummeted.

And did we buy fewer lemons? Did we spend less on them?

Of course not.
We put them in everything.
Lemonade, lemon meringue pie, lemon zest on fish,
lemon in our water, lemon-scented cleaning products.
The cheaper lemons got,
the more uses we found for them,
and the more we spent on them in aggregate.

This is Jevons Paradox,
and it's one of those ideas in economics
that sounds wrong until you see it everywhere.
Most people who invoke it do so in passing,
a quick reference to sound clever in a meeting.
But the man behind it and his original argument
deserve a deeper look,
because the pattern he identified in 1865
is playing out right now with AI
and software engineering.

## The Man Behind the Paradox

William Stanley Jevons was born in Liverpool in 1835,
the ninth of eleven children
in a family of iron merchants and hardware manufacturers.
He was,
by any measure,
a polymath.

Jevons studied chemistry and mathematics at University College London,
then spent five years in Sydney, Australia
as an assayer at the Royal Mint,
testing the purity of gold during the Australian gold rush.
It was during those years in Sydney
that he turned his attention to economics and meteorology,
and began developing the ideas
that would change economic theory.

He returned to England
and became one of the founders
of the [marginalist revolution](https://en.wikipedia.org/wiki/Marginalism) in economics,
which changed how economists think about value.
Before marginalism,
the dominant theory (from Adam Smith and David Ricardo)
held that the value of a good
was determined by the labor required to produce it.
Jevons argued instead that value comes from *marginal utility*,
the satisfaction a person gets from one additional unit of a good.
This seems obvious now,
but at the time nobody was thinking this way.

He was also a logician
who built a mechanical reasoning machine
called the
["logic piano"](https://old.maa.org/press/periodicals/convergence/mathematical-treasure-jevons-pure-logic-logic-piano),
essentially an early mechanical computer
that could solve logical syllogisms.
This was decades before anything resembling modern computing.

Jevons died in 1882 at the age of 46,
drowning while swimming near Hastings.
He left behind a body of work
that economists and logicians still reference today.

But the thing most people know him for,
if they know him at all,
is a book he published in 1865 at the age of 29.

## The Coal Question

In 1865,
Jevons published
[*The Coal Question: An Inquiry Concerning the Progress of the Nation, and the Probable Exhaustion of Our Coal Mines*](https://en.wikipedia.org/wiki/The_Coal_Question).

The prevailing wisdom at the time
was reassuring:
James Watt's far more efficient steam engine
would *reduce* Britain's coal consumption.
After all,
if each engine uses less coal per unit of work,
the nation should need less coal overall.
Simple math, right?

Jevons saw it differently.

He argued that Watt's improvements
made coal-powered industry so much more economical
that it opened up entirely new applications.
Before the efficient steam engine,
coal powered a narrow set of uses,
mostly pumping water out of mines.
After Watt,
coal powered factories, locomotives, steamships, and heating.
The efficiency gains didn't reduce demand;
they *exploded* it.

As Jevons wrote in his book:

> "It is wholly a confusion of ideas to suppose
> that the economical use of fuel is equivalent
> to a diminished consumption.
> The very contrary is the truth."

This is the paradox:
technological improvements
that increase the efficiency of resource use
tend to *increase* the total consumption of that resource,
not decrease it.
The more efficiently you can use something,
the more uses you find for it,
and the more of it you consume.

Watt's steam engine wasn't a conservation device.
It was an *unlocking* device.

## The Cloud Proved Him Right

I've watched this paradox play out firsthand
over a decade of working with cloud computing.

Earlier in my career,
I had a manager who would side-eye me
about the cost of a single thickly provisioned API gateway.
It was a meaningful line item,
the kind of thing that showed up in budget reviews
and required justification.

A few years later,
that same offering became serverless:
consumption-based, pay-per-call, scaling to actual demand.
The cost per unit fell so far
that the side-eye went away.

And what could I do with that newfound freedom,
if I had the time and space and acceleration to do so?

I wouldn't run one API gateway more cheaply.
I would run *a hundred of them* for different use cases,
produce far more value,
spend roughly *the same amount of money*,
and nobody would bat an eye.

This is Jevons Paradox in the real world.

The broader cloud story follows the same pattern.
Year after year,
the cost per compute unit has dropped.
Serverless architectures and managed services emerged
that scale to demand
(you only pay for what you use).
Spot instances, reserved capacity, autoscaling.
All of these drove the unit economics down.

And yet,
cloud bills across the industry went *up*,
not down.

Not because companies were being wasteful
(although some were),
but because cheaper compute unlocked use cases
that weren't viable before.
Workloads that couldn't justify the infrastructure cost
at $X per hour
suddenly made perfect sense at $X/10 per hour.
So companies ran more workloads.
And more.
And more.

The cloud got cheaper.
We used more of it.
Jevons was right.

## AI Is the Next Steam Engine

I see the same pattern emerging with AI
and software engineering,
and I want to take a clear stance here:

**AI will increase the demand for software engineers,
not decrease it.**

I know that's not the dominant narrative right now.
The headlines are full of layoffs and hiring slowdowns.
Jack Dorsey laid off a large portion of Block's workforce,
ostensibly in an AI-driven efficiency push.
But look closer at these stories
and the picture gets murkier.
Block has reportedly had
[other issues](https://www.theguardian.com/technology/2026/mar/03/jack-dorsey-block-ai-worker-jobs#:~:text=The%20CEO%2C%20and,peak%20in%20October.),
and it's hard to separate
"AI made us more efficient"
from
"we needed to cut costs anyway and AI is a convenient narrative."

Correlation is not causation,
and a convenient story is not evidence.

There will be an initial period
(we may be in it now)
where
some companies look at AI-assisted engineering
and see an opportunity to do the same work with fewer people.
And some of those companies will be right,
for a time.

But businesses are *always* insatiable.
They always have a backlog that stretches to the horizon,
features they can't build,
markets they can't enter,
technical debt they can't address,
experiments they can't run.
The bottleneck has always been
the cost and availability of engineering talent.

When AI makes each engineer significantly more productive,
when it turns a task that took a week into one that takes a day,
businesses
won't say
"great, we can cut 80% of our engineers."
They'll say
"great, now we can finally build that thing
we've been putting off for three years."

Just like Watt's steam engine
didn't make Britain say
"wonderful, we need less coal."
It made Britain say
"what *else* can we power with this?"

## I've Seen This in My Own Work

I wrote recently about
[acceleration and compound engineering](/2026/02/a-tale-of-acceleration-and-compound-engineering/),
how
a dev machine setup practice I've carried across jobs for years
took me *months* to modernize with GitHub Copilot last summer,
but this year,
Claude Code wrapped it in CI in ninety minutes
and added a new Linux distro in under an hour.

Here's the thing:
I didn't take those efficiency gains and go sit on a beach
(although that sounds really nice).
I immediately turned around and did *more*.
More distros. More CI. More polish.
Things that weren't worth the effort before
became trivially achievable,
so I did them.

My backlog didn't get smaller.
It got *different*.
Projects that I'd mentally filed under
"someday when I have a free month"
became "I can knock that out this afternoon."
And when those were done,
I found new things to build that I hadn't even considered before,
because the cost of attempting them had dropped below the threshold
where they were worth thinking about.

This is exactly what Jevons described.
The efficiency of the steam engine
didn't reduce coal consumption.
It unlocked new applications
that nobody had previously considered viable.

## The Counterarguments

It's worth noting
that Jevons Paradox doesn't *always* hold.
Economists have identified cases
where efficiency improvements really do reduce total consumption.
Economists Harry Saunders and Daniel Khazzoom
formalized this idea as the
[Khazzoom-Brookes postulate](https://en.wikipedia.org/wiki/Khazzoom%E2%80%93Brookes_postulate),
which says that yes,
sometimes efficiency gains really do just save you money
and you move on with your life.

The key variable is *elasticity of demand*.
If demand for a resource is relatively inelastic,
if people don't actually want much more of it
even when it's cheap,
then
efficiency gains can reduce total consumption.
LED lightbulbs may have actually reduced total electricity
used for lighting,
because there's only so much light people want in their homes.

But software?
Software demand is about as elastic as it gets.
Every business wants more of it.
Every industry is being reshaped by it.
The backlog of software that the world wants built
is effectively infinite.

When the constraint is demand,
efficiency gains can reduce consumption.
When the constraint is *supply*,
efficiency gains blow the doors off.
Software engineering is firmly in the latter camp.

## Token Budgets Are the New Cloud Bills

Here's my prediction for how this plays out:

The engineers who learn to wield AI effectively,
who build the compound practices
(testing, CI, structured prompting, agentic workflows,
or even find brand new techniques for delivering software
that go beyond our traditional concepts of software delivery
and better suit AI-native workflows),
will be the ones everyone wants to hire.
There will be *more to build* than ever before.

And businesses won't spend less on software engineering.
They'll spend *differently*.
Where today the cost is primarily headcount,
tomorrow (or who am I kidding, *right now*) a meaningful chunk will be token budgets,
the cost of the AI compute
that amplifies each engineer's output.
We saw the same thing happen in cloud computing as well,
where engineers who learned how to use the cloud effectively
by automating it with infrastructure as code and various new techniques
were greatly sought after for these new skills.

Just like cloud bills replaced data center CapEx
and then grew beyond what anyone expected,
token budgets will become a major line item
that grows year over year
as companies find more and more uses
for AI-assisted engineering,
and as the cost per token comes down over time,
our consumption will go up.

William Stanley Jevons figured this out
about coal 161 years ago.
The cloud proved him right.
AI will prove him right again.

The paradox endures:
when something gets cheaper,
we don't use less.
We use more.

This is not a threat to software engineers,
but there's an uncomfortable flip side.
If the cost per token keeps dropping
and engineers around you are multiplying their output with these tools,
then choosing not to use them
makes *you* the expensive resource per unit of output.
You don't want to be the coal-fired pump
in a world full of steam engines.

We have the greatest of power tools now,
and it's up to us to use them.
