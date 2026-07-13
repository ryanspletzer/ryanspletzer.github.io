---
layout: post
title: The Markdown Tamer
date: 2026-07-04 00:00:00
description: >
  AI coding tools are fast,
  but they emit feral Markdown—300-character lines, mangled lists,
  headings that skip levels, jagged tables,
  and more idiosyncrasies that I can't stand.
  Here are the practices I use to tame it:
  a linter as the feedback loop, semantic line breaks,
  and teaching the agent to clean up after itself.
tags:
 - markdown
 - ai
 - tooling
header: /assets/images/Lion_tamer_(LOC_pga.03749).jpg
---

![A colorful 19th-century chromolithograph of a lion tamer standing calmly inside a circus cage, surrounded by two lions, a lioness, and two tigers posed on pedestals around him.](/assets/images/Lion_tamer_(LOC_pga.03749).jpg)
*Gibson & Co., publisher, Public domain, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Lion_tamer_(LOC_pga.03749).jpg).*

AI coding tools have gotten remarkably good at a great many things.

Producing tidy Markdown is not one of them.

Ask one to write a README and the prose might be good,
but it arrives wrapped in 300-character lines,
a mix of `-` and `*` bullet markers,
headings that leap from `##` straight to `####`,
and tables that render correctly but sit jagged in the source,
their columns wandering out of alignment.
The content is likely fine.
But the formatting is feral.

Somewhere along the way Markdown became the lingua franca of working with AI.
Prompts, plans, design docs, the rule files that steer the agents:
the overwhelmingly vast majority of it is Markdown,
read by machines and by humans in equal measure.
And I am the human.
I want the stuff I read all day to be pleasant to read
and clean to diff.

Over time I've assembled a small kit of practices to keep the beast on a leash.
None of them are clever.
Together they are the difference between Markdown I enjoy
and Markdown that makes my eyes bleed.

Taming Markdown was the very first thing I did
when I started working seriously with Claude Code.
Before any real project, before a single line of code,
I sat down and instructed the agent to stop handing me horrendous Markdown output,
because I could not stand reading what it produced.

## A linter is the source of truth

The foundation is [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2),
and the house rule is deliberately blunt:
Markdown output must pass the linter, and issues get fixed automatically.
I never want to be asked whether to lint.

This turns a fuzzy, bikeshed-prone question ("does this look okay?")
into deterministic feedback the model can handle.
Consistent list markers, heading increments, blank lines around fences,
the dreaded ordered-list renumbering:
all of it stops being a matter of taste and becomes a check that either passes or doesn't.

And this rule isn't really about Markdown.
Making a linter the source of truth is the right posture for every language the agent touches;
Markdown is just the one where the rule often implicitly and lazily gets skipped.
Nobody ships unlinted TypeScript on purpose,
yet somehow prose gets a pass.
It shouldn't.

## One config, checked in

I keep a `.markdownlint.yaml` at the repo root, committed alongside the code.[^vscode]

One customization I opt for is a longer line length:

```yaml
MD013:
  line_length: 120
```

The default of 80 characters is a relic of punch cards and hardware terminals.[^eighty]
On a modern screen it forces prose into a cramped little gutter
and, worse, fights the next practice on this list.
120 gives sentences room to breathe.[^one-twenty]

## Semantic line breaks

This is the habit I would keep if I had to give up all the others,
and it is the one AI tools never adopt on their own:
write one sentence per line,
and add a break after a clause when it aids readability,
which mostly means keeping the line length in check.
The habit is older than the robots
and even has a [formal specification][sembr].[^spec-eighty]

These breaks change the *source*, not the *rendered output*.
Markdown collapses single newlines into flowing paragraphs,
so the reader on the web sees no difference at all.
But the reader in the diff sees everything.

Edit one sentence or clause and the diff is one line,
not a re-wrapped paragraph where every line shifted
and the reviewer has to squint to find the actual change.
Prose reviews start to feel closer to code reviews:
tighter, more local, and more obvious.
Once you have read a pull request this way,
the sheer length of the wall-of-text alternative feels hostile.

## Teach the agent instead of cleaning up after it

A linter catches sloppiness after the fact.
It is better not to emit the mess in the first place.

So I put the rules where the agent actually reads them:
in the instruction files it loads at the start of every session.
A short house rule goes in the always-on file,
and the full conventions live in a path-scoped rule
that only is triggered when there's a Markdown file to work on,
so a session spent editing TypeScript never has to load them.
The agent then tends to write clean Markdown from the start
and even if it doesn't, it fixes its own lint findings without stopping to ask.

Both of these live in my [dotfiles repo][dotfiles], out in the open.[^secrets]
The [always-loaded house rule][house-rule] is short enough to quote whole:

```markdown
When creating or editing any Markdown — including brand-new files —
the output must pass markdownlint-cli2 (fix issues automatically, never ask)
and use semantic line breaks (one sentence per line).
Full conventions live in `~/.claude/rules/markdown.md`,
loaded automatically when working with existing `.md` files.
```

The last two lines point at the [path-scoped rule file][markdown-rule],
which spells out the rest:
one sentence per line, where to break a clause, a preferred `line_length` of 120,
and a note to self about the config-discovery trap I am about to describe.[^pinned]

Notably, I enforce this with *instructions*, not a hard commit-blocking hook.
A hook fires regardless of intent.
It's the electrified perimeter fence at Jurassic Park:
it can't tell a raptor testing the wire for weak spots
from a human who needs to scale it intentionally.
And every good rule has the occasional case where breaking it on purpose is correct:
a vendored file I should leave untouched,
a deliberately long line in a table,
matching the existing style of a file I don't own.
Rules keep my judgment in the loop.
A hook takes it out.
For a house style, I want the leash, not the cage.

## A small gotcha

One tiny war story deserves its own section,
because it cost me a confusing half hour.

`markdownlint-cli2` discovers its config by searching from the file being linted
*up to the directory you invoked it from*, and never any higher.
Run it from a subfolder whose config lives at the repo root,
and it silently forgets your carefully chosen 120
and reverts to the built-in 80,
happily "fixing" your lines to the wrong width.

The fix is to lint from the directory that holds the config (usually the repo root),
pass `--config` explicitly,
or drop a config file at whatever level the linter tends to run.
Put the rules where the tool will actually look for them.

## The payoff

None of this is all that exotic.
It is a linter, one config file, a writing habit, and a few lines of instruction.
But the practices compound.
The Markdown reads more like a human being wrote it,
the diffs review cleanly,
and the very capable, very fast AI coding tools stay firmly on their leash.

The beast was never the Markdown;
text has no will of its own.
The beast is the agent doing the writing,
and that beast is tamable.

## Footnotes

[^vscode]:
    The agent is not the only one writing Markdown around here.
    For the stretches where I am the one typing,
    the same David Anson behind `markdownlint-cli2` ships a
    [markdownlint extension for VS Code][vscode-markdownlint],
    which picks up the same checked-in `.markdownlint.yaml` with no extra configuration
    and squiggles problems in real time, with quick fixes a keystroke away.
    I add it to each repo's recommended extensions in `.vscode/extensions.json`,
    so the same rules follow the humans too.

[^eighty]:
    Eighty columns is the width of an IBM punch card,
    which became the width of a terminal,
    which became the default nobody questioned for half a century.
    Your Markdown does not run on a punch card.

[^one-twenty]:
    This is not an argument for endless lines;
    I still try to stay within 120 characters.
    GitHub used to make you scroll sideways to read a long line,
    and though that old annoyance has been resolved,
    a side-by-side diff or a default-sized terminal still rewards shorter lines.
    (Apple's Terminal opened at 80×24 out of the box for decades,
    keeping the punch card alive well past its funeral,
    but as of macOS Tahoe it opens at 120×30,
    the same size Windows Terminal has shipped for years.
    It seems like the new defaults are converging on 120.)
    Raw text aside, even rendered output in a browser is easier to read
    when it does not stretch the full width of a monitor;
    human eyes benefit from a modest line length.

[^spec-eighty]:
    My fellow pedants in the audience will note that the specification
    recommends a maximum line length of 80 characters,
    the very default the previous section dismissed as a punch-card relic.
    It is a SHOULD, not a MUST,
    and I am exercising my right to disagree with the optional part.

[^secrets]:
    A public dotfiles repo is also a marvelous forcing function for keeping your disk honest.
    Nothing concentrates the mind like knowing the whole world can read your home directory:
    zero secrets on disk, zero secrets in git.
    I pull the ngrok token, the npm token, and their friends
    from the macOS Keychain,
    like a real adult.

[^pinned]:
    Both file links are pinned to a specific commit,
    because a dotfiles repo is a living thing
    and mine may have drifted by the time you are reading this.

[dotfiles]: https://github.com/ryanspletzer/macos-dotfiles
[vscode-markdownlint]: https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint
[sembr]: https://sembr.org/
[house-rule]: https://github.com/ryanspletzer/macos-dotfiles/blob/81a6ce7bfeb462c2367fd610ca140e9a427aa43c/AGENTS.md?plain=1#L9-L15
[markdown-rule]: https://github.com/ryanspletzer/macos-dotfiles/blob/81a6ce7bfeb462c2367fd610ca140e9a427aa43c/.claude/rules/markdown.md?plain=1
