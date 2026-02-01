---
layout: post
title: McDonald's, Burger King, and the Innovator's Dilemma
date: 2026-02-01 00:00:00
description: >
  Startups scout ahead, big companies follow.
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
(My childhood diet is between me and my cardiologist. The '90s were a different time.)

Lately, I've been thinking about this dynamic in a different context: AI developer tools.

![Ronald McDonald and the Burger King sit side by side at a shared desk in a modern office, each wearing headphones and smiling while coding on laptops. Ronald, in his yellow-and-red striped outfit and clown makeup, works on a laptop labeled “Claude Code,” while the Burger King, dressed in a crown and fur-trimmed robe, uses a laptop labeled “GitHub Copilot.” Code is visible on both screens, with coffee cups and monitors in the background, creating a playful contrast between fast-food mascots and serious software development.](/assets/images/ronald-and-the-king-vibe-coding.png)

## Startups Scout Ahead, Big Companies Follow

This is the Innovator's Dilemma, playing out in real-time.

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

## Beating the Lunch Rush 🍟

[GitHub Copilot launched as a technical preview](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) in June 2021—earlier than most people remember.
It was genuinely pioneering, the first major AI pair programmer.
General availability came a year later. For a moment, they owned the category. Market share: 100%.

Then [Cursor showed up](https://en.wikipedia.org/wiki/Cursor_(code_editor)) in March 2023.
Four MIT grads with a VS Code fork
and a bet that AI shouldn't be bolted onto an existing editor—it should _be_ the editor.
Co-founder Sualeh Asif [explained](https://newsletter.pragmaticengineer.com/p/cursor):
"We needed to own our editor and could not 'just' be an extension, because we wanted to change the way people program."[^cursor-irony]

What happened next is wild.
Cursor shipped chat integration at launch;
[GitHub Copilot Chat didn't reach GA](https://github.blog/news-insights/product-news/github-copilot-chat-now-generally-available-for-organizations-and-individuals/) until December 2023—nine months later.
Cursor had codebase-wide context from day one.
Agent mode? Cursor shipped it in late 2024;
[GitHub's version landed in February 2025](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode).
[One analysis noted](https://medium.com/@Arihant15/cursor-vs-copilot-let-the-results-speak-413f1ad48c99)
that Copilot's multi-file edits were "heavily inspired by another editor called Cursor."

Read that again:
Microsoft—one of the largest, most well-resourced technology companies on Earth—was,
for a time, trailing four guys with a fork.[^merkle-tree-secret-sauce]

The pattern repeated in the terminal.
[Aider](https://github.com/paul-gauthier/aider) pioneered CLI-based agentic coding in 2023.[^aider-shame]
Claude Code launched in February 2025 and
[hit $1 billion run-rate in six months](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone).
Dario Amodei says some Anthropic engineers "don't write any code anymore"—they just let the model do it.
The devs I know who ride every wave have moved to Claude Code;
those less terminal-inclined may stay parked on Cursor
(or wait until there's a GUI to accompany or wrap tools like Claude Code—something I don't recommend waiting for).

The result: [GitHub Copilot's market share dropped](https://www.secondtalent.com/resources/github-copilot-statistics/)
from near-100% to roughly 42% in a year.
[Cursor crossed $1 billion ARR faster](https://www.saastr.com/cursor-hit-1b-arr-in-17-months-the-fastest-b2b-to-scale-ever-and-its-not-even-close/)
than any B2B software company in history.

This is not normal. This is not how markets usually work.

## Why Can't Giants Keep Up? 🦕

So why can't a $3 trillion company stay ahead of four MIT grads?

Microsoft's own leadership has been asking the same question.

Satya Nadella reportedly told employees that
[Microsoft's size is a "massive disadvantage."](https://www.windowscentral.com/microsoft/satya-nadella-calls-microsofts-size-a-massive-disadvantage-in-ai)
In a December 2025 internal email, he
[criticized Copilot programs](https://the-decoder.com/microsoft-ceo-nadella-tells-managers-copilots-gmail-and-outlook-integrations-dont-really-work-and-steps-in-to-fix-them/)
as not "really work[ing]" and being "not smart."

Former GitHub CEO Thomas Dohmke [admitted](https://sequoiacap.com/podcast/training-data-thomas-dohmke/):
"You can always move faster and be more convicted.
In the beginning we kept the team intentionally small. Small teams can move fast."

Amjad Masad, Replit's CEO,
[described the copying dynamic](https://www.vanta.com/resources/replit-future-of-code) with candor:
"I used to feel really bad. I take it for granted now that it'll happen.
It's still annoying—especially when people don't know we innovated that.
A lot of Microsoft products are designed by Replit."

Within a week, he says, competitors copy UI innovations. A week!

What _can't_ be copied that fast?
"Things that are trial by fire," Masad said.
"Things with a lot of pain associated with them, especially on the infrastructure side."

Features copy in a week. Infrastructure knowledge doesn't.

[Research suggests](https://www.signium.com/news/breaking-down-barriers-transforming-bureaucracy-into-agility/)
approval processes and org complexity delay innovation timelines by 30-50%.
[Technical debt may represent 40%](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/tech-debt-reclaiming-tech-equity)
of tech estate in large enterprises.
Startups don't have legacy architecture to protect.
Microsoft has to weigh every decision
against Azure, Office, Windows, and existing Copilot pricing baked into the codebase.

The big-company playbook has largely been: "Add AI to the thing we already have."

That's not nothing. Microsoft has
[20 million GitHub Copilot users and 90% of Fortune 100 companies](https://techcrunch.com/2025/07/30/github-copilot-crosses-20-million-all-time-users/)
as customers.
The distribution moat is real.
Whether it outweighs being months behind on features—that's the key question,
and honestly it just might work.
I don't see every colleague I know flocking to Claude Code right now[^flock-to-claude-code],
and frankly it was pulling teeth to get folks to adopt the first wave of tools that came along.
(Some [dark matter developers](https://www.hanselman.com/blog/dark-matter-developers-the-unseen-99)
live under a rock.)

So some folks may happily stay put for a while,
and wait till the next wave of agentic coding innovation is taken out of the terminal
and wrapped up very neatly in a productized bow for them.
(I'm not waiting.
There are outsized gains to be had now,
and the Claude Code burger tastes way too good.
Addictive, I might say; there's extra salt and special sauce on this one, for sure.)

## They're All Burgers 🍔

The copying isn't slowing down.

The next frontier is orchestration—factories of agents coordinating work across codebases.
Bleeding-edge [community approaches](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) exist now
(bring your checkbook),
but the minute a big player ships something polished, everyone copies it.
Anthropic already borrows community ideas and brings them into Claude Code.
The first-party tasks feature is evidence:
the community invented persistent memory hacks for agents, and Anthropic productized it.

Commoditization has never moved this fast. At some point, you're just deciding: Quarter Pounder or Whopper?

Once the market matures, the differences shrink.
The startups that scouted the territory proved it was real.
Product vision and execution count for a lot,
but if the execution is readily clone-able,
then you find yourself competing to some degree on distribution and brand loyalty.

[Golder and Tellis](https://www.ideatovalue.com/inno/nickskillicorn/2022/04/first-mover-or-fast-follower-which-is-the-right-innovation-strategy-for-you/) analyzed 500 companies across 50 product categories: 47% of first movers failed versus 8% of fast followers.
[Steve Blank](https://steveblank.com/2010/10/04/why-pioneers-are-the-ones-with-the-arrows-in-their-backs/)
put it bluntly:
"The jury is in. There's no advantage to being first.
Astute fast-followers learn from first-movers by looking at the arrows in their backs."

So does that mean Microsoft wins in the end?
They have [VS Code at 75.9% market share](https://survey.stackoverflow.co/2025/).
GitHub is where all the code lives.
They have enterprise procurement on their side.

I used to work at a company that was a Microsoft shop, full stop.
They always chose the Microsoft option first; you only ventured outside the ecosystem with a compelling reason.
Some people only eat McDonald's.[^amazon-fanbois]

But here's what I think a lot of folks are missing: **the capability matters more than the wrapper.**

Cursor can ship the slickest editor in the world
(they don't),
but if Claude Code or Codex or whatever comes next is dramatically better,
it doesn't matter whose IDE you're using.
The intelligence is the product.
Everything else is a delivery vehicle.

That's why I think the real winners in this market aren't the tool makers—they're the model makers.[^google-advantage]
Cursor and GitHub Copilot are fighting over who gets to put the burger in your hand.
They don't control the beef.[^wheres-the-beef]

The burger wars didn't end with one chain winning.
They ended with multiple billion-dollar franchises serving similar food to different customer segments.
That's probably where we're headed.

## The Sodium Hangover 🧂

So what do you actually do with this information?

If you're a developer: stop worrying about picking the "right" tool.
(But seriously, look at Claude Code, right now.)
They're all converging.
Use whatever makes you productive today, switch when something better comes along,
and don't build your identity around your editor.
The tool wars are a spectator sport.

If you're building a startup in this space: you're in a foot race where the giants are many months behind you.
That's your window.
Ship fast, accumulate learnings, build the things that can't be copied in a week
(or even if they can, in a poor facsimile of what you did because you have the secret infra sauce).
And know that your real competition isn't Microsoft—it's the next startup that hasn't launched yet,
and will find a new angle that builds on prior learnings.

If you're at a big company: maybe the honest move is to admit you're playing Burger King's game.
Drafting off good ideas isn't shameful—it's a strategy.
But your size is, as Nadella put it, a "massive disadvantage" when the underlying technology is shifting this fast.
You're not going to out-innovate four people in a room who don't have to schedule a meeting to make a decision.

Cursor CEO [Michael Truell](https://www.maginative.com/article/anysphere-raises-60m-for-ai-powered-coding-tool-cursor/) articulated the startup bet:
"The goal is to replace coding with something much better.
Our aim is to build a magical tool that will one day write all the world's software."

That's not acquisition-speak. That's someone who thinks they're McDonald's.

And yet: competition has been unambiguously good for all of us.
[GitHub Copilot has a free tier now](https://github.blog/news-insights/product-news/github-copilot-in-vscode-free/).
[Amazon CodeWhisperer](https://aws.amazon.com/codewhisperer/) is free for individuals.
Pricing pressure has driven Pro tiers down while features accelerate.[^chatgpt-ad-supported]
Developers capture the surplus.[^wardley-maps]

The burger wars didn't produce a winner. They produced an industry,
and gave cardiologists lots of work for the rest of time.

Pick your burger. They're all pretty good now.[^my-preferred-burger]

## Footnotes

[^cursor-irony]: There's irony in that statement. Being a VS Code fork, Cursor will always be tracking upstream and stuck with an alternate extension marketplace. They also don't own any models or have advantageous positions around them like the cloud providers do. That puts them in a precarious spot, IMO. But I digress!
[^merkle-tree-secret-sauce]: Cursor's secret sauce seemed to revolved around [Merkle Trees](https://cursor.com/blog/secure-codebase-indexing) as an efficient way to index your codebase, which was cool, but ultimately an approach that can be copied, and we've quickly trotted past with Claude Code; though Claude Code doesn't do it directly built-in, it does have an extensive community and you can get code search going quickly with a [plugin](https://github.com/zilliztech/claude-context).
[^aider-shame]: I'm ashamed to say I had never heard of Aider before researching this post.
[^flock-to-claude-code]: Even though they should, since despite the fact that better things may come from well-known players, they're losing valuable time that could have helped them learn how to wrangle agents in higher-order potentially GUI-ful tools in the future.
[^amazon-fanbois]: I've also seen the opposite: Amazon fanbois who have an unending, irrational hatred of Microsoft. Can't we all just agree to hate Oracle?
[^google-advantage]: And perhaps after that, cloud providers that have an advantageous position of hosting models for them and deals to use those models in their own products; Google is in a _very_ interesting position of having both of those things, and while I don't think they have something rivaling Claude Code the tool, or Opus 4.5 the model, _yet_, you know how this cat and mouse game goes. We'll see!
[^wheres-the-beef]: And they need to ensure there is [enough beef](https://www.youtube.com/watch?v=Ug75diEyiA0) to begin with; anecdotally everyone has a CLI now like Claude Code, but some have pointed out to me how other CLI's don't have "the same taste" in terms of it providing as quality of output based on the techniques that are used.
[^chatgpt-ad-supported]: All signs are pointing to you being able to use more features of ChatGPT free soon, [supported by ads](https://openai.com/index/our-approach-to-advertising-and-expanding-access/)—one of the final stops of commoditization in various markets, having services driven to "Free," means inevitably _you_ become the product. So don't be surprised if Mickey D's shows up inline in your ChatGPT response touting their newest scientific advances in the Egg McMuffin. (And now this blog post has truly come full circle.)
[^wardley-maps]: Go read [Wardley Maps](https://medium.com/wardleymaps) if you want to understand the forces behind why commoditization comes for everything eventually.
[^my-preferred-burger]: I prefer the [Bacon King](https://www.burgerking.ee/en/menu/flame-grilled-burgers/bacon-king/), and my current Bacon King is Claude Code. But I also like some modifiers. No ketchup, light mayo, add light mustard, add pickles. (Fun fact: I have a former manager who cannot tolerate anything in the cucumber realm—hello, Augusto—in almost violent ways where he'd flip over the restaurant table and walk out if you serve him this particular strain of gourd. We've had to restrain him several times.) I'm currently working on modifying Claude Code to my liking, and figuring out if I want regular fries or chicken fries (flavors of orchestration) and my choice of dipping sauce, probably ranch (my personal taste injected into these tools). I wish Burger King had caffeine free Diet Dr Pepper, then everything would be perfect. Where did Dr Pepper get his PhD from? Ok this ADHD footnote is getting weird. Bye!
