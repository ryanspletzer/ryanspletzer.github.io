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

There's a running joke in the fast food industry about Burger King's real estate strategy:
find out where McDonald's is building, and set up shop next door.

Sounds lazy. Maybe parasitic. But it's genius.
McDonald's spends millions on site analysis—traffic patterns, demographics, parking lot geometry, the whole nine yards.
Why wouldn't you draft off their homework?

I grew up down the street from one of these pairings:
a McDonald's with a Burger King _literally_ adjacent to it.
(My childhood diet is between me and my cardiologist. The 90's were a different time.)

Lately, I've been thinking about this dynamic in a different context: AI developer tools.

![Ronald McDonald and the Burger King sit side by side at a shared desk in a modern office, each wearing headphones and smiling while coding on laptops. Ronald, in his yellow-and-red striped outfit and clown makeup, works on a laptop labeled “Claude Code,” while the Burger King, dressed in a crown and fur-trimmed robe, uses a laptop labeled “GitHub Copilot.” Code is visible on both screens, with coffee cups and monitors in the background, creating a playful contrast between fast-food mascots and serious software development.](/assets/images/ronald-and-the-king-vibe-coding.png)

## Startups Scout Ahead, Big Companies Follow

This is the Innovator's Dilemma in miniature, playing out in real-time.

[Clayton Christensen's thesis](https://en.wikipedia.org/wiki/The_Innovator%27s_Dilemma)
wasn't that big companies are dumb or poorly managed—it's
that they're _rationally constrained_.
They listen to their best customers.
They invest in high-margin products.
They optimize for existing business models.
And in doing so, they systematically ignore the small, scrappy markets where disruption begins.

Startups don't have quarterly earnings calls or enterprise sales teams to placate.
So they scout the next problem domain.
They run experiments, poke at the edges of what's possible,
figure out what people actually want before anyone has a playbook.

Then the big companies show up.

Sometimes they eat the startup's lunch.
Sometimes there's room for both.
And sometimes—the interesting case—the big company can't reproduce the magic, even with all their resources.

## The Timeline Tells the Story

[GitHub Copilot launched as a technical preview](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) in June 2021—earlier than most people remember.
It was genuinely pioneering, the first major AI pair programmer.
General availability came a year later. For a moment, they owned the category. Market share: 100%.

Then [Cursor showed up](https://en.wikipedia.org/wiki/Cursor_(code_editor)) in March 2023.
Four MIT grads with a VS Code fork
and a bet that AI shouldn't be bolted onto an existing editor—it should _be_ the editor.
Co-founder Sualeh Asif [explained](https://newsletter.pragmaticengineer.com/p/cursor):
"We needed to own our editor and could not 'just' be an extension, because we wanted to change the way people program."[^cursor-irony]

The feature gap opened fast.
Cursor shipped with chat integration at launch;
[GitHub Copilot Chat didn't reach GA](https://github.blog/news-insights/product-news/github-copilot-chat-now-generally-available-for-organizations-and-individuals/) until December 2023—nine months later.
Cursor had codebase-wide context from day one.
Agent mode? Cursor shipped it in late 2024; [GitHub's version landed in February 2025](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode).
[One analysis noted](https://medium.com/@Arihant15/cursor-vs-copilot-let-the-results-speak-413f1ad48c99) that Copilot's multi-file edits were "heavily inspired by another editor called Cursor."

The pattern repeated in the terminal.
[Aider](https://github.com/paul-gauthier/aider) pioneered CLI-based agentic coding in 2023.[^aider-shame]
Claude Code launched in February 2025 and
[hit $1 billion run-rate in six months](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone).

The scoreboard shifted fast. [GitHub Copilot's market share dropped](https://www.secondtalent.com/resources/github-copilot-statistics/) from near-100% to roughly 42% in a year.
[Cursor crossed $1 billion ARR faster](https://www.saastr.com/cursor-hit-1b-arr-in-17-months-the-fastest-b2b-to-scale-ever-and-its-not-even-close/) than any B2B software company in history.

## The Copycats 😼

Amjad Masad, Replit's CEO, [described the dynamic](https://www.vanta.com/resources/replit-future-of-code) with candor:
"I used to feel really bad. I take it for granted now that it'll happen.
It's still annoying—especially when people don't know we innovated that.
A lot of Microsoft products are designed by Replit."

He added: "Within a week we see competitors copying UI innovations.
It's sad because we have a great design team and stress over every pixel."

What _can't_ be copied quickly?
"Things that are trial through fire," Masad said. "Things with a lot of pain associated with them, especially on the infrastructure side."

That's the startup's moat: not features, but scar tissue from shipping fast and learning hard.

## Why Giants Move Slow

Bureaucracy isn't a bug—it's a feature. (Sometimes.) Just not one that helps you innovate.

Microsoft's own leadership knows this.
Satya Nadella reportedly told employees that [Microsoft's size is a "massive disadvantage."](https://www.windowscentral.com/microsoft/satya-nadella-calls-microsofts-size-a-massive-disadvantage-in-ai)
In a December 2025 internal email, he [criticized Copilot programs](https://the-decoder.com/microsoft-ceo-nadella-tells-managers-copilots-gmail-and-outlook-integrations-dont-really-work-and-steps-in-to-fix-them/) as not "really work[ing]" and being "not smart."

Former GitHub CEO Thomas Dohmke [admitted](https://sequoiacap.com/podcast/training-data-thomas-dohmke/):
"You can always move faster and be more convicted.
In the beginning we kept the team intentionally small. Small teams can move fast."

Jeff Bezos went to great lengths to keep Amazon nimble—edicts like the [API mandate](https://konghq.com/blog/enterprise/api-mandate) forced teams to expose service APIs to each other, preserving startup-style independence even at scale.

[Research suggests](https://www.signium.com/news/breaking-down-barriers-transforming-bureaucracy-into-agility/) approval processes and org complexity delay innovation timelines by 30-50%.
[Technical debt may represent 40%](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/tech-debt-reclaiming-tech-equity) of tech estate in large enterprises.
Startups don't have legacy architecture to protect.
Microsoft has to weigh every decision against Azure, Office, Windows, and existing Copilot pricing baked into the code.

The big-company strategy often boils down to: "Add AI to the thing we already have."

That's not nothing. Microsoft has [20 million Copilot users and 90% of Fortune 100 companies](https://techcrunch.com/2025/07/30/github-copilot-crosses-20-million-all-time-users/) as customers.
The distribution moat is real.

But it's a different motion than "start from scratch with AI as the foundation."

## The Current Scoreboard

**GitHub Copilot → Cursor → GitHub Copilot.**
Copilot pioneered AI autocomplete.
Cursor bet developers would want an AI-native IDE—one where the AI isn't a plugin, it's the point.
They shipped agent mode, multi-file editing, and model choice
(making a big deal about [Merkle Trees](https://cursor.com/blog/secure-codebase-indexing))
months before GitHub followed with similar features.
Cursor now serves the majority of Fortune 500 companies and has reportedly rejected acquisition approaches from Big Tech.
But focus has shifted to a new tool...

**Claude Code → Everyone else's CLI.**
Anthropic ships a command-line coding agent.
Six months later: $1 billion run-rate.
Dario Amodei says some Anthropic engineers "don't write any code anymore"—they just let the model do it.
Suddenly everyone's got a CLI story.
The devs I know who ride every wave have moved to Claude Code; those less terminal-inclined stay parked on Cursor.

**ChatGPT → M365 Copilot.**
Not a dev tools example, but relevant: OpenAI scouted the terrain of "just talk to an AI."
Microsoft followed with Copilot everywhere.

The next frontier is orchestration—factories of agents coordinating work across codebases.
Bleeding-edge community approaches exist now (bring your checkbook),
but the minute a big player ships something polished, everyone copies it.
Anthropic already borrows community ideas and brings them into Claude Code.
The first-party tasks feature is evidence: the community invented persistent memory hacks for agents, and Anthropic productized it.

Commoditization has never moved this fast.

At some point, you're just deciding: Quarter Pounder or Whopper?

## They're All Burgers 🍔

Once the market matures, the differences shrink.

The startups that scouted the territory proved it was real.
Now everyone's competing on execution, distribution, and brand loyalty—not fundamental product vision.

In a very real way, all these companies are figuring this all out together,
and it will all converge into very similar sets of features over time.

[Golder and Tellis](https://www.ideatovalue.com/inno/nickskillicorn/2022/04/first-mover-or-fast-follower-which-is-the-right-innovation-strategy-for-you/) analyzed 500 companies across 50 product categories: 47% of first movers failed versus 8% of fast followers.
[Steve Blank](https://steveblank.com/2010/10/04/why-pioneers-are-the-ones-with-the-arrows-in-their-backs/) put it bluntly:
"The jury is in. There's no advantage to being first.
Astute fast-followers learn from first-movers by looking at the arrows in their backs."

But in platform markets with ecosystem lock-in, incumbents can recover.
Developer tools sit in between—individuals choose freely, but enterprises face procurement friction favoring established vendors.
[VS Code still holds 75.9% market share](https://survey.stackoverflow.co/2025/).
GitHub is still where the code lives.

I used to work at a company that was a Microsoft shop, full stop.
They chose the Microsoft option first; you only ventured outside the ecosystem with a compelling reason.

Some people are picky and only eat McDonald's.[^amazon-fanbois]

The burger wars didn't end with one chain winning and the others going home.
They ended with multiple billion-dollar franchises serving similar food to different customer segments.

## So What?

The Innovator's Dilemma isn't about bad companies.
It's about structural forces that constrain even excellent companies from responding to disruption.

If you're a startup, your job is to be McDonald's—do the hard work of scouting, figure out what the market wants before the fast followers arrive.
Ship features. Accumulate scar tissue. Build things that can't be copied in a week.

If you're a big company, maybe the honest move is to admit you're playing Burger King's game.
Drafting off good ideas isn't shameful—it's a different strategy.
But your size is, as Nadella put it, a "massive disadvantage" when the technology itself is shifting fast.

Cursor CEO [Michael Truell](https://www.maginative.com/article/anysphere-raises-60m-for-ai-powered-coding-tool-cursor/) articulated the bet:
"The goal is to replace coding with something much better.
Our aim is to build a magical tool that will one day write all the world's software."

That's not acquisition-speak. That's someone who thinks they're McDonald's.

Competition has been unambiguously good for developers.
[GitHub Copilot has a free tier now](https://github.blog/news-insights/product-news/github-copilot-in-vscode-free/).
[Amazon CodeWhisperer](https://aws.amazon.com/codewhisperer/) is free for individuals.
Pricing pressure has driven Pro tiers down while features accelerate.[^chatgpt-ad-supported]
Whether Cursor's momentum compounds or GitHub's integration depth reasserts dominance,
developers capture the surplus.[^wardley-maps]

The burger wars didn't produce a winner. They produced an industry.

Pick your burger. They're all pretty good now.[^my-preferred-burger]

## Footnotes

[^cursor-irony]: There's irony in that statement. Being a VS Code fork, Cursor will always be tracking upstream and stuck with an alternate extension marketplace. They also don't own any models or have advantageous positions around them like the cloud providers do. That puts them in a precarious spot, IMO. But I digress!
[^amazon-fanbois]: I've also seen the opposite: Amazon fanbois who have an unending, irrational hatred of Microsoft. Can't we all just agree to hate Oracle?
[^aider-shame]: I'm ashamed to say I had never heard of Aider before researching this post.
[^chatgpt-ad-supported]: All signs are pointing to you being able to use more features of ChatGPT free soon, [supported by ads](https://openai.com/index/our-approach-to-advertising-and-expanding-access/)—one of the final stops of commodization in various markets having services driven to free means inevitably _you_ become the product. So don't be surprised if Mickey D's shows up in your sidebar on ChatGPT touting their newest scientific advances in the Egg McMuffin. (And now this blog post has truly come full circle.)
[^wardley-maps]: Go read [Wardley Maps](https://medium.com/wardleymaps) if you want to understand the forces behind why commoditization comes for everything eventually.
[^my-preferred-burger]: I prefer the [Bacon King](https://www.burgerking.ee/en/menu/flame-grilled-burgers/bacon-king/), and my current Bacon King is Claude Code. But I also like some modifiers. No ketchup, light mayo, add light mustard, add pickles. (Fun fact: I have a former manager who cannot tolerate anything in the cucumber based—hello, Augusto—in almost violent ways where he'd flip over the restaurant table and walk out if you serve him this particular strand of gourd. We've had to restrain him several times.) I'm currently working on modifying Claude Code to my liking, and figuring out if I want regular fries or chicken fries (flavors of orchestration) and my choice of dipping sauce, probably ranch (my personal taste injected into these tools). I wish Burger King had caffeine free Diet Dr Pepper, then everything would be perfect. Where did Dr Pepper get his PhD from? Ok this ADHD footnote is getting weird. Bye!
