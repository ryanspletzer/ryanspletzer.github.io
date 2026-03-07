---
layout: post
title: Shedding Dead Context
date: 2026-03-14 00:00:00
description: >
  More plugins, more extensions, more context doesn't mean better results.
  It often means worse.
  Your AI's context window is finite memory,
  and most people are wasting it before they've typed a real prompt.
tags:
 - ai
 - programming
---

![A crowd of ghostly, pale-faced figures in dark clothing and top hats walk along a pier against a turbulent, swirling sky of deep blues and oranges, their hollow expressions conveying collective dread and unease.](/assets/images/1024px-Edvard_Munch_-_Anxiety_-_Google_Art_Project.jpg)
*Edvard Munch, Anxiety, 1894. Munch Museum, Oslo. Public domain,
via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Anxiety_-_Google_Art_Project.jpg)*

I have an
[oh-my-posh](https://ohmyposh.dev/blog/oh-my-posh-claude-code-integration)
segment in my terminal that shows Claude Code's context window usage
as a little gauge—five bars that tick down as the session fills up.

The other day I opened a fresh session,
typed one simple prompt,
and watched two of the five bars vanish instantly.

40% of my 200K context window—gone—before I'd done any real work.

That was the moment I realized I had a problem.

## What's Eating Your Context Window

If you use Claude Code (or any AI coding tool with a plugin ecosystem),
you've probably done what I did:
installed every promising MCP server,
enabled a bunch of skills,
added a global `CLAUDE.md` packed with instructions,
and bolted on project-level configs on top of that.

Each one felt like a small addition.
Together, they were a tax I was paying on every single session.

Every plugin, every skill, every line in your `CLAUDE.md`
occupies space in the context window.
Even "lazy-loaded" tools that aren't fully active still carry a footprint—the
model needs to keep a manifest of what's available,
their descriptions,
their trigger conditions,
their tool schemas.
None of that is free.

I call this *dead context*:
instructions, tool definitions, and metadata
sitting in the context window that aren't contributing to the task at hand.

## Your Context Window Is RAM

The analogy that made this click for me is simple.

The context window is like memory on a classical computer—RAM, specifically.
It's the finite working space
where the model holds everything it needs to reason about your problem.

And plugins are like running programs.

One VS Code window with all your extensions
(I checked mine recently—105)
is fine on its own.
The extension host process balloons a bit,
language servers spawn,
but modern hardware handles it.
Now open five or six of those windows,
each with their own extension host and language servers,
add five or six Claude Code terminals,
and a browser with a hundred-plus tabs
organized into tab groups
just to keep yourself sane—and
suddenly your machine is sluggish,
spending more resources managing the tools
than doing the work.

The same thing happens to an LLM.
Every plugin and every instruction competes for the same finite resource
the model needs to actually think about your code.

Dex Horthy of [HumanLayer](https://humanlayer.dev/)
has talked about what he calls the
"[dumb zone](https://devinterrupted.substack.com/p/dex-horthy-on-ralph-rpi-and-escaping)"—the
middle 40-60% of a large context window
where model reasoning starts to degrade.
Information placed there is more likely to be ignored or misinterpreted.
The model drifts, forgets its own instructions, or, *gasp*, hallucinates.
(I don't like to anthropomorphize models,
so instead I'd just like to say it starts to lose details and relevant context
and generates output without the relevant grounding and background.
Hallucinations are reserved for those people taking things like peyote.)

If 40% of your context is consumed by dead weight before you start,
you're beginning every session in the "dumb zone.""

## Bit Flips in the Context Window

The memory analogy goes further than just running out of space.

Think about
[rowhammer attacks](https://en.wikipedia.org/wiki/Row_hammer)
on non-ECC memory:
repeatedly accessing one row of physical memory
causes electrical interference
that flips bits in adjacent rows.
The data doesn't just disappear—it *corrupts*.
Values that were correct become wrong,
and the system doesn't know it happened.
This is perhaps fine for your gaming PC—oh
no you crashed during your last Cyberpunk 2077 session,
no big deal—but
it's a lot more concerning for critical workloads.
You don't want to lose your video project mid-render,
or as Linus Torvalds [notes](https://lkml.iu.edu/hypermail/linux/kernel/2210.1/00691.html),
you don't want to mistake flaky hardware for a kernel bug.

Something similar occurs when you overload a context window.
The dead context doesn't just sit there inertly, taking up space.
It dilutes the signal.
The model's attention is spread across everything in the window,
so the more irrelevant context you pack in,
the less weight the relevant context carries.
Instructions get misapplied,
tool descriptions bleed into each other,
and the model can confidently act on the wrong context
without any indication that something went sideways.

It's not just forgetting. It's degradation—and
like a bad DIMM,
you might not realize it's happening
until the output is already wrong.

## The Bigger-Window Trap

Now much like Police Chief Brody in [Jaws](https://www.youtube.com/watch?v=2I91DJZKRxs),
you might be thinking:

"You're gonna need a bigger ~~boat~~ context window."

Opus with 1M tokens is available now.
Maybe the extra usage pricing becomes built into Claude Max plans soon.
Problem solved, right?

No.

A bigger context window is more RAM on a machine with a memory leak.
It delays the symptoms without fixing the cause.
And worse,
it removes the pressure to be disciplined.

With 200K you're forced to be thoughtful about what you load.
With 1M you can be sloppy,
and it *appears* to work—until
it doesn't.
When it fails with a million tokens of context,
the failures are harder to diagnose
because you can't easily pinpoint
which of your million tokens caused the corruption.

There's also a well-documented phenomenon
of LLMs losing coherence in very large context windows.
Research like
"[Lost in the Middle](https://arxiv.org/abs/2307.03172)"
(Liu et al.) shows that models struggle to use information
placed in the middle of long contexts,
and a
[2025 EMNLP finding](https://aclanthology.org/2025.findings-emnlp.1264.pdf)
demonstrated that context length *alone* hurts performance
even when the extra context is relevant.
More capacity does not mean better reasoning.
Sometimes I wish I had something like 300K—a
modest buffer beyond 200K.
But 1M, at this stage,
feels like a guaranteed scenario where you push too far
and things break down in ways you can't predict.

Between the research and people's own hands-on experience,
the *vibe* is that the dumb zone is real,
and the *vibe* is that longer context windows
may not necessarily yield better results—at
least not at this point in history.
That may change,
but discipline is a better bet than hope.

## Three Layers of the Same Problem

When I stepped back,
I realized I was fighting the same battle on three fronts.

It started with my editor.
I had VS Code loaded with dozens of extensions—linters,
formatters, language packs, themes, tools I tried once and forgot about.
Each one adds overhead to the extension host process,
and many spawn their own language server processes on top of that.
I was carrying weight for projects I wasn't even working on.

Then there was the AI harness itself.
My global CLAUDE.md had grown into a sprawling instruction manual.
I had plugins enabled globally that only mattered for specific projects.
Skills had accumulated without pruning.

But the uncomfortable one was me.
I had five Claude Code instances running simultaneously,
five VS Code windows open,
and a browser with a mountain of tabs.
I was doing to my own brain
exactly what I was doing to the model:
overloading my own context window with competing demands,
and wondering why I feel like I needed to take a nap.
Steve Yegge has [recently written](https://steve-yegge.medium.com/the-ai-vampire-eda6e4f07163)
about this vampiric effect
of using so much AI and functioning at a high cognitive level
and context switching so much that it saps your energy.

## The Plugin Paradox

Before you go uninstalling everything,
there's an important nuance.

Not all plugins are dead context.
Some actually *reduce* overall token consumption
by fetching precisely what the model needs
without dumping everything into the window.

Think of it this way:
a plugin that `cat`s an entire file into context is expensive.
A plugin that searches for the relevant function
and returns just that? It *saves* context.

The question isn't "how many plugins do I have?"
It's "what's the ROI of each one?"

Some plugins add a small overhead to the context
but prevent the model from doing expensive,
wasteful exploration on its own.
Those are keepers.
The ones sitting there occupying space
for a capability you use once a month? Dead context.

## Memory Management Strategies

If the context window is RAM,
then optimizing it is memory management.
Here are the strategies I've landed on.

### Scope your editor per project

I have a `code` wrapper function in my `.zshrc`
[here](https://github.com/ryanspletzer/macos-dotfiles/blob/main/.zshrc#L162-L228)
and in my other terminal's dot files
that launches VS Code with only the extensions
listed in a project's `.vscode/extensions.json`.
Everything else gets disabled for that session.

You don't need to copy mine.
Ask Claude to generate one for your shell and your preferences.
(I'm likely to iterate on my own `code` wrapper
based on new conveniences I want to add to it over time.)
The point is: each project only loads what it actually needs.

I've also started looking at editors with a lower memory footprint altogether—Neovim
(via LazyVim), Emacs, and Zed.
They're leaner by default than VS Code,
which matters when you have multiple editor windows open alongside
multiple Claude Code sessions.
Zed still has an extension ecosystem you need to be mindful of,
but the baseline overhead is smaller.

### Audit your CLAUDE.md

Your global and project-level `CLAUDE.md` files
are prime candidates for dead context.
Instructions that made sense three months ago
might be irrelevant now.

I periodically ask Claude itself to audit my config
with something like:
*"Review my `CLAUDE.md` and identify anything that could be removed,
consolidated, or moved to a skill that only loads when needed."*

Skills are the equivalent of swapping to disk.
The full instructions only load when invoked,
instead of sitting in memory on every session.

### Scope your plugins per project

Not every project needs every MCP server.
I set project-level `.claude/settings.json` files
that enable only the plugins relevant to that codebase.
A Jekyll blog doesn't need a database plugin.
An API project doesn't need a Playwright plugin.

### Revisit regularly

This isn't a one-time cleanup.
Context cruft accumulates the way clutter accumulates in a house.
You install a new skill, try a new MCP server,
add a line to your `CLAUDE.md`.
Each one is small.
Over time they add up,
and one day you notice 40% of your context is gone
before you've said "hello."

## The Compaction Dread

If you've used Claude Code in a long session,
you know the feeling.

You're watching the status bar tick down.
Each prompt costs tokens.
Each response costs more.
You start doing mental math—can
I fit one more big ask in,
or will it push me over?

You start rationing.
You shorten your prompts.
You avoid follow-up questions you'd otherwise ask.
You stop kicking off ambitious tasks
because you know there isn't enough room
for the model to do them well.

Eventually the session compacts—the
system compresses prior messages
to free up space—and
you lose fidelity.
The thread of what you were building together gets thinner.

Every token of dead context in your session
is a token stolen from this budget.
All those plugin manifests and stale instructions
are crowding out the space you need
for the actual back-and-forth of getting work done.

The irony is that the dead context was supposed to *help*.

## Use AI to Fix Your AI

This is the part I find satisfying:
the best tool for shedding dead context is the very AI
you're trying to optimize.

Ask Claude to generate your `.vscode/extensions.json` for a project.
Ask it to review your `CLAUDE.md` and suggest what to cut
or optimize
or push into a skill that can be loaded on-demand
(or in some cases explicitly disables when you don't need it).
Ask it to set up a scoped `.claude/settings.json`
with only the plugins you need.
Ask it to create skills for instructions
that don't need to be loaded every session.

There's a nice recursion to it:
the model, operating within its own constrained context window,
helping you make that context window less constrained
for the next session.

It won't tell you to install fewer things.
You have to bring the philosophy.
But once you know what you want to shed,
it's remarkably good at doing the shedding.

## Less Is More

It's easy to think that
having the most sophisticated setup—the
most plugins, the most context, the most tools at your disposal.

However, being a power user means understanding the constraints
of the system you're working with
and operating within them deliberately.
It means knowing that a 200K context window
is a budget,
and that every token of dead context
is a token you can't spend on the work that matters.

Shed the dead context.
Your AI will think more clearly.
You'll ration your prompts less.
The status bar won't give you as much anxiety.
And when you do hit compaction,
it'll be because you did real work—not
because your plugins got there first.

And you need to manage your own context window as a human, too.
Please everyone on this AI roller coaster,
give yourself some grace and space,
and go take a nap.
