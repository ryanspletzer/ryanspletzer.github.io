---
layout: post
title: The Markdown Tamer
date: 2026-07-04 00:00:00
description: >
  AI coding tools are fast, but they emit feral Markdown—
  300-character lines, mangled lists, headings that skip levels,
  trailing whitespace everywhere.
  Here are the practices I use to tame it:
  a linter as the source of truth, semantic line breaks,
  and teaching the agent to clean up after itself.
tags:
 - markdown
 - ai
 - tooling
---

<!-- TODO: hero image + italic caption, per site convention. -->

AI coding tools have gotten remarkably good at a great many things.

Producing tidy Markdown is not one of them.

Ask one to write a README and the prose might be excellent,
but it arrives wrapped in 300-character lines,
a mix of `-` and `*` bullet markers,
headings that leap from `##` straight to `####`,
and trailing whitespace lurking at the end of half the lines.
The content is fine.
The formatting is feral.

That matters more than it might sound,
because Markdown has quietly become the lingua franca of working with AI.
Prompts, plans, design docs, commit bodies, the very rule files that steer the agents—
an enormous amount of it is Markdown,
read by machines and by humans in equal measure.
And I am the human.
I want the stuff I read all day to be pleasant to read
and clean to diff.

So over time I've assembled a small kit of practices to keep the beast on a leash.
None of them are clever.
Together they are the difference between Markdown I enjoy
and Markdown I merely tolerate.

## A linter is the source of truth

The foundation is [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2),
and the house rule is deliberately blunt:
Markdown output must pass the linter, and issues get fixed automatically—
I never want to be asked whether to lint.

This turns a fuzzy, bikeshed-prone question ("does this look okay?")
into a boolean the machine can answer.
Consistent list markers, heading increments, blank lines around fences,
the dreaded ordered-list renumbering—
all of it stops being a matter of taste and becomes a check that either passes or doesn't.

## One config, checked in

I keep a `.markdownlint.yaml` at the repo root, committed alongside the code.
Two opinions travel in it everywhere.

First, YAML, not JSONC.
A linting config is prose about prose;
it should be as readable as the thing it governs.

Second, I raise the line length:

```yaml
MD013:
  line_length: 120
```

The default of 80 columns is a relic of punch cards and hardware terminals.[^eighty]
On a modern screen it forces prose into a cramped little gutter
and, worse, fights the next practice on this list.
120 gives sentences room to breathe.

## Semantic line breaks

This is the single highest-leverage habit I have,
and it is the one AI tools never adopt on their own:
write one sentence per line,
and add a break after a clause when it aids readability.

The trick is that these breaks change the *source*, not the *rendered output*—
Markdown collapses single newlines into flowing paragraphs,
so the reader on the web sees no difference at all.
But the reader in the diff sees everything.

Edit one sentence and the diff is one line,
not a re-wrapped paragraph where every line shifted
and the reviewer has to squint to find the actual change.
Prose reviews start to feel like code reviews:
tight, local, obvious.
Once you have read a pull request this way,
the wall-of-text alternative feels genuinely hostile.

## Teach the agent, don't just clean up after it

A linter catches sloppiness after the fact.
It is better not to emit it in the first place.

So I put the rules where the agent actually reads them—
in the instruction files it loads at the start of every session—
and let a path-scoped rule carry the full Markdown conventions
so they surface exactly when a Markdown file is in play.
The agent writes clean Markdown from the start
and fixes its own lint findings without stopping to ask.

Notably, I enforce this with *instructions*, not a hard commit-blocking hook.
A hook fires regardless of intent,
and every good rule has the occasional case where breaking it on purpose is correct:
a vendored file I should leave untouched,
a deliberately long line in a table,
matching the existing style of a file I don't own.
Rules keep my judgment in the loop.
A hook takes it out.
For a house style, I want the leash, not the cage.

## The gotcha that bit me

One war story, because it cost me a genuinely confusing half hour.

`markdownlint-cli2` discovers its config by searching from the file being linted
*up to the directory you invoked it from*—and never any higher.
Run it from a subfolder whose config lives at the repo root,
and it silently forgets your carefully chosen 120
and reverts to the built-in 80,
happily "fixing" your lines to the wrong width.

The fix is to lint from the directory that holds the config (usually the repo root),
pass `--config` explicitly,
or drop a config file at whatever level the linter tends to run.
Put the rules where the tool will actually look for them.

## The payoff

None of this is exotic.
It is a linter, one config file, a writing habit, and a few lines of instruction.
But the compounded result is Markdown that reads like a person wrote it,
diffs that review cleanly,
and a set of very capable, very fast tools
kept firmly on their leash.

The beast, it turns out, is quite tamable.
You just have to hand it the rulebook—
and keep the whip within reach.

[^eighty]:
    Eighty columns is the width of an IBM punch card,
    which became the width of a terminal,
    which became the default nobody ever questioned.
    Your Markdown does not run on a punch card.
