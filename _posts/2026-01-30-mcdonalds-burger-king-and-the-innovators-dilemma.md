---
layout: post
title: McDonald's, Burger King, and the Innovator's Dilemma
date: 2026-01-30 00:00:00
description: >
  Startups scout, big companies follow.
  The AI developer tools market is playing out the Innovator's Dilemma in real-time—and
  we're all just deciding between Quarter Pounders and Whoppers.
tags:
 - ai
 - coding
---

There's this running joke in the fast food industry about Burger King's real estate strategy:
find out where McDonald's is building, and set up shop next door.

It sounds lazy.
Maybe even a little parasitic.
But here's the thing—it's genius.
McDonald's spends millions on site analysis:
traffic patterns, demographics, parking lot geometry, the whole nine yards.
Why wouldn't you just draft off their homework?

I grew up down the street from one of these pairings:
a McDonald's with a Burger King _literally_ immediately adjacent to it.
(My childhood diet is between me and my cardiologist—the
90's were a different time, man)

But lately, I've been thinking about this dynamic in a different context: the AI developer tools market.

![Ronald McDonald and the Burger King sit side by side at a shared desk in a modern office, each wearing headphones and smiling while coding on laptops. Ronald, in his yellow-and-red striped outfit and clown makeup, works on a laptop labeled “Claude Code,” while the Burger King, dressed in a crown and fur-trimmed robe, uses a laptop labeled “GitHub Copilot.” Code is visible on both screens, with coffee cups and monitors in the background, creating a playful contrast between fast-food mascots and serious software development.](/assets/images/ronald-and-the-king-vibe-coding.png)

## Startups Scout, Big Companies Follow

This is the Innovator's Dilemma in miniature form, and we're watching it play out in real-time.

[Clayton Christensen's thesis](https://en.wikipedia.org/wiki/The_Innovator%27s_Dilemma)
wasn't that big companies are dumb or poorly managed—it's
that they're _rationally constrained_.
They listen to their best customers.
They invest in high-margin products.
They optimize for existing business models.
And in doing so, they systematically ignore the small, scrappy markets where disruption begins.

Startups—the ones without quarterly earnings calls or enterprise sales teams to placate—they're
the ones who scout the next problem domain.
They're running experiments.
They're poking around at the edges of what's possible,
figuring out what people actually want to do with this new technology before anyone has a playbook.

Then the big companies show up.

Sometimes they eat the startup's lunch.
Sometimes there's room for both.
And sometimes—this is the interesting one—the big company can't quite reproduce the magic,
even with all their resources.

## The Timeline Tells the Story

Let's look at who actually shipped what first in AI coding tools, shall we?

[GitHub Copilot launched as a technical preview](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) in June 2021.
(Sidenote: this was way shockingly earlier than I realized or recalled.)
It was genuinely pioneering—the first major AI pair programmer.
General availability came in June 2022.
For a moment, they owned the category.
Market share: effectively 100%.

Then [Cursor showed up](https://en.wikipedia.org/wiki/Cursor_(code_editor)) in March 2023.
Four MIT grads with a VS Code fork
and a bet that AI shouldn't be bolted onto an existing editor—it should be the foundation.
Co-founder Sualeh Asif [explained](https://newsletter.pragmaticengineer.com/p/cursor):
"We needed to own our editor and could not 'just' be an extension, because we wanted to change the way people program."
(The irony of that statement is that they don't really own the editor...
Being a VS Code fork, they'll always be tracking upstream
and having to accept an alternate community extension marketplace,
and they also don't own any models or have an advantageous positions around models like some of the cloud providers,
which I think puts them in a precarious position right now...
But I digress!)

The feature gaps started piling up immediately.
Cursor shipped with chat integration at launch;
[GitHub Copilot Chat didn't reach general availability](https://github.blog/news-insights/product-news/github-copilot-chat-now-generally-available-for-organizations-and-individuals/) until December 2023—nine months later.
Cursor had codebase-wide context from day one.
Cursor introduced agent mode in late 2024; [GitHub's version landed in February 2025](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode).
[One analysis noted](https://medium.com/@Arihant15/cursor-vs-copilot-let-the-results-speak-413f1ad48c99) that Copilot's multi-file edits feature was "heavily inspired by another editor called Cursor."

The pattern repeats in terminal tools.
[Aider](https://github.com/paul-gauthier/aider) pioneered CLI-based agentic coding in 2023.
(I am embarrassed to say I had never even heard of them until I researched this blog post.)
Claude Code launched in February 2025—and
[hit $1 billion in run-rate revenue in six months](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone).

Meanwhile, [GitHub Copilot's market share collapsed](https://www.secondtalent.com/resources/github-copilot-statistics/) from near-100% to roughly 42% in twelve months.
[Cursor crossed $1 billion ARR faster](https://www.saastr.com/cursor-hit-1b-arr-in-17-months-the-fastest-b2b-to-scale-ever-and-its-not-even-close/) than any B2B software company in history.

## The Copying Game

Amjad Masad, Replit's CEO, [described the dynamic](https://www.vanta.com/resources/replit-future-of-code) with remarkable candor:
"I feel really bad, actually I used to feel really bad.
I think I take it for granted now that it'll happen.
It's still annoying.
It's especially annoying when people do not know that we innovated that.
A lot of Microsoft products are designed by Replit."

He added: "Immediately within a week we see competitors copying UI innovations that we do,
which is sad because we have a really great design team
and we really spend a lot of time and energy stressing every pixel."

What _can't_ be copied quickly?
According to Masad: "Things that are trial through fire or things that have a lot of pain associated with them,
especially on the infrastructure side, those tend to be harder to copy."

This is the startup's moat they hope to dig: not features, but the scar tissue from shipping fast and learning hard.

## Big Companies Are Laden

Here's the thing about bureaucracy: it's not a bug, it's a feature. (Sometimes.)
But it is not generally a feature for innovation.

Microsoft's own leadership acknowledges the challenge.
Satya Nadella reportedly told employees that [Microsoft's size is a "massive disadvantage."](https://www.windowscentral.com/microsoft/satya-nadella-calls-microsofts-size-a-massive-disadvantage-in-ai)
In a December 2025 internal email, he [criticized Copilot programs](https://the-decoder.com/microsoft-ceo-nadella-tells-managers-copilots-gmail-and-outlook-integrations-dont-really-work-and-steps-in-to-fix-them/) as not "really work[ing]" and being "not smart."

Thomas Dohmke, GitHub's CEO, [admitted in hindsight](https://sequoiacap.com/podcast/training-data-thomas-dohmke/):
"You can always move faster and be more convicted of those ideas.
I think in the beginning we kept the team intentionally small.
Small teams can move fast."

Jeff Bezos traditionally went to great lengths at Amazon to allow teams to move independently,
and put out various edicts like the [API mandate](https://konghq.com/blog/enterprise/api-mandate) that forced all teams have service APIs that others can use,
presumably in part as an effort to keep the company lean and mean
and preserve as much of the startup mentality as possible.

[Research suggests](https://www.signium.com/news/breaking-down-barriers-transforming-bureaucracy-into-agility/) innovation timelines are delayed 30-50% on average
by approval processes and organizational complexity.
[Technical debt may represent up to 40%](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/tech-debt-reclaiming-tech-equity) of technology estate in large enterprises.
When you're a startup, you don't have legacy architecture to protect.
When you're Microsoft, every decision has to account for how it affects Azure,
Office, Windows, and the existing Copilot pricing model embedded down to the code level.

The big company strategy often boils down to: "Add AI to the thing we already have."

And look, that's not nothing.
It can work.
Microsoft has [20 million Copilot users and 90% of Fortune 100 companies](https://techcrunch.com/2025/07/30/github-copilot-crosses-20-million-all-time-users/) as customers.
That distribution moat is real.

But it's a fundamentally different motion than "start from scratch with AI as the foundation."

## The Current Scoreboard

**GitHub Copilot → Cursor → GitHub Copilot.**
GitHub Copilot was first to the scene with AI auto-completion.
Then Cursor bet that developers would want an "AI-native" IDE
(whatever the heck that means)—one where the AI isn't a plugin bolted on, but the whole point.
They shipped agent mode, multi-file editing, and model choice
(and made a big deal about [Merkle Trees](https://cursor.com/blog/secure-codebase-indexing))
months before GitHub followed suit with very similar features.
Cursor now serves the majority of Fortune 500 companies and reportedly rejected acquisition approaches from Big Tech.
But much of the tech world has shifted its focus on to a new CLI-based tool...

**Claude Code → Everyone else's CLI.**
Anthropic ships a command-line agent for coding.
Six months later: $1 billion run-rate.
Dario Amodei says he has engineers at Anthropic who "don't write any code anymore" and just let the model write it.
Suddenly, everyone's got a CLI story.
(And everyone that I know who is following the waves has gone to Claude Code lately;
many others I know who are less terminal-oriented are staying parked on Cursor the full IDE.)

**ChatGPT → M365 Copilot.**
Though this is not a dev tools example, it is relevant:
OpenAI scouted the terrain of "what does it look like to just talk to an AI?"
Microsoft followed suit with Copilot everywhere.

The next frontier (which is happening right now) is orchestration
and factories of agents coordinating work around codebases,
and though there are bleeding-edge community-based approaches to this now
(get out your checkbooks if you're ambitious enough to try them)
the minute one of the big players has something in this realm,
everyone else will copy that, too.
Anthropic has already been borrowing ideas born in the community
and bringing them directly into Claude Code;
the introduction of first-party tasks is evidence of that,
where the community went out on limbs with their own approaches for
having some sort of persistent easily-accessible memory for agents to work with.

I've never seen commoditization of approaches happening this quickly before.

At some point in all of this, you're just deciding: do I want a Quarter Pounder with Cheese, or do I want a Whopper?

## They're All Burgers

Here's the uncomfortable truth: once the market matures, the differences start to feel... smaller.

The startups that scouted the territory?
They found out the territory was real.
They proved the market.
And now everyone's competing on execution, distribution, and brand loyalty more than on fundamental product vision.

[Research by Golder and Tellis](https://www.ideatovalue.com/inno/nickskillicorn/2022/04/first-mover-or-fast-follower-which-is-the-right-innovation-strategy-for-you/), analyzing 500 companies across 50 product categories, found that 47% of first movers failed versus only 8% of fast followers.
[Steve Blank put it bluntly](https://steveblank.com/2010/10/04/why-pioneers-are-the-ones-with-the-arrows-in-their-backs/):
"The jury is in. There's no advantage [to being first].
Astute fast-followers recognize that part of Customer Discovery is learning from the first-mover
by looking at the arrows in their backs."

But here's the nuance: in platform markets with ecosystem lock-in, incumbents can recover.
Developer tools sit somewhere in between—individuals choose tools freely,
but enterprises face procurement friction favoring established players.
[VS Code still holds 75.9% market share](https://survey.stackoverflow.co/2025/) among developers.
GitHub is still where all the code lives.

I used to work at a company that was very firmly a Microsoft shop where, no matter what,
it was always the Microsoft option first,
and only if there was a compelling reason did we go outside of that ecosystem.
(This is analogous to someone who is picky and only like McDonald's.)

The burger wars didn't end with one chain winning and the others going home.
They ended with multiple billion-dollar franchises serving roughly similar food to different customer segments.

## So What?

The Innovator's Dilemma isn't about bad companies.
It's about structural forces that constrain even excellent companies from responding effectively to disruption.

If you're a startup, your job is to be McDonald's—to do the hard work of scouting,
of figuring out what the market actually wants, before the fast followers show up.
Ship the features.
Accumulate the scar tissue.
Build the things that can't be copied in a week.

If you're a big company, maybe the honest move is to admit that you're playing Burger King's game, and that's okay.
Drafting off good ideas isn't shameful.
It's just a different kind of strategy.
But know that your size is, as Nadella put it, a "massive disadvantage" when the technology itself is changing rapidly.

[Michael Truell](https://www.maginative.com/article/anysphere-raises-60m-for-ai-powered-coding-tool-cursor/), Cursor's CEO, articulated the bet:
"The goal with the company is to replace coding with something that's much better...
Our aim with Cursor is to continue to lead this shift,
by building a magical tool that will one day write all the world's software."

That's not the language of someone planning to get acquired.
That's the language of someone who thinks they're McDonald's.

Competition has unambiguously benefited developers and pushed commoditization faster than I thought conceivable.
(Go read [Wardley Maps](https://medium.com/wardleymaps) to understand that commoditization comes for us all.)
[GitHub Copilot now has a free tier](https://github.blog/news-insights/product-news/github-copilot-in-vscode-free/).
[Amazon CodeWhisperer](https://aws.amazon.com/codewhisperer/) is free for individuals.
Pricing pressure has driven Pro tiers down while features have accelerated.
Whether Cursor's momentum compounds or GitHub's integration depth eventually reasserts dominance,
developers capture the surplus.

Maybe the lesson is simpler: no matter who wins, we're all going to wind up eating a lot of burgers.
And right now, there are a lot of cooks in the kitchen trying to convince you their burger is the one.
