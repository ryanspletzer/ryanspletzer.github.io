---
layout: post
title: A Tale of Acceleration and Compound Engineering
date: 2026-02-28 00:00:00
description: >
  A dev machine setup script practice I carried across jobs for years
  took me months to modernize with GitHub Copilot last summer.
  This year, Claude Code wrapped it in CI in ninety minutes
  and added a new distro in under an hour.
  The speedup isn't just better models—it's
  the compounding effect of practices like testing and CI
  that AI helps you put in place.
header: /assets/images/johnson-hobbyhorse-1819.jpg
tags:
  - programming
  - ai
---

![A hand-colored print of a gentleman in a top hat and tailcoat riding an early two-wheeled hobbyhorse, with another rider visible in the distance.](/assets/images/johnson-hobbyhorse-1819.jpg)
*"Johnson, the First Rider on the Pedestrian Hobbyhorse" — published 1819 by R. Ackermann, London. Public domain.*

Last summer I spent about a week or two
(or three? Or four?
I can't remember,
but the
[git history](https://github.com/ryanspletzer/dev-machine-setup/commits/main?since=2025-06-07&until=2025-08-10)
knows, though,
and turns out it was a few *months* that I iterated on it,
funny how the brain does that)
creating new dev machine setup scripts / approaches
based on a practice I have done for years in my career,
and which I wanted to modernize with AI assistance
and put out there for others to use
(and selfishly, for myself to use as well).

Quick story time:
at my old company,
in research every summer there would be like 15-20 interns that would show up
(maybe I'm exaggerating, it's hard to recall, again brains are weird!),
and what I noticed the first summer
is that they would take a couple of days
to set up their freshly re-imaged Alienware dev box.

Now, when you're in an internship,
every day is precious,
and interns spending two days on this mundane task
always felt a bit silly to me.

PowerShell to the rescue.

At that time I coded something by hand
(raw PowerShell, no frills)
that would automate the setup of their machines,
and as a practice when they joined I'd walk around with a thumb drive
(yes, you heard that right)
and plug it into the intern's machine,
dump the script off, and
run it while we got to have coffee
and got to know the newest group of folks coming in that summer.

We got a *lot* of leverage out of this little script,
and it was a practice that I took with me in my career
when I wrote a new (and enhanced) version
at my new company
(again, by hand!)
and this practice has endured to this day.

Now, I wanted to have a version of this that I could create as open source
for not just me to use but others out there.
There were also things that could be improved upon
like a YAML config file to better parameterize the setup.
But the inertia usually always held me back from doing that.

However once AI hit and I got access to GitHub Copilot,
it was time to try my hand at this.

Now keep in mind, last summer, 2025,
even with GitHub Copilot in hand,
I still had to iterate on this for a while.
In hindsight I should have set up CI from the get-go,
but in the initial pass I really needed to be "close to the metal"
to run things in virtual machines to work out repeatable setups for macOS, Windows, and Ubuntu.

Contrast that with now:
With Claude Code
I was able to wrap the whole thing in CI with GitHub Actions
[in an hour and a half](https://github.com/ryanspletzer/dev-machine-setup/pull/10),
and further add
[Fedora support in an hour](https://github.com/ryanspletzer/dev-machine-setup/pull/14).

This last week,
[I added Debian support in an hour](https://github.com/ryanspletzer/dev-machine-setup/pull/18)
(or less—who's really counting at this point).

Now, one might say:

"Well Ryan, you've been compounding your engineering practices over time."

And yes, yes I have.

I think this is one of those things that makes developer productivity gains so hard to measure:
depending on where you come in and start measuring,
you may not have a great reference point of having done something in the past,
but further as you go along you build compounding wins *beyond* just using AI for coding,
by using certain techniques and practices
like rigorous testing and linting
that allow you to move so much faster.

(It turns out the TDD people were right.)

In fact compound engineering practices are so powerful
that they have been codified into a
[Claude Code plugin](https://github.com/EveryInc/compound-engineering-plugin)
that I encourage people to check out.

The tools and the models have gotten better,
but it's hard to account for practices
that an AI tool helps you put in place to go *even faster*.

It's not all just about code throughput—often
it's about the practices you set up.

You also need a platform like GitHub
where CI is easy to get going for fast iteration
and the pit of success is very easy to fall into;
the virtuous cycle of feedback is real.

It truly feels like the future—like
when
[Doc Brown](https://64.media.tumblr.com/7154b389bddd7ca20048df4876adcbfb/a53a9c3a07649ba5-f2/s540x810/b093fac9d0ef5c2b05217b7c36ff927cb463a399.gif)
said,
"I'm sure in 1985 plutonium is available at every corner drug store."

I feel like I have plutonium and I'm blowing up all of my backlog.
I'm going to have no retirement projects when I'm old now.
I might have to pick up fishing.
