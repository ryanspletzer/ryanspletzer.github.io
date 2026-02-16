---
layout: post
title: Fear, Paranoia, and Vibe Risk Management
date: 2026-02-13 00:00:00
description: >
  Risk-oriented enterprise teams may block AI coding agents (and agents in general)
  based on fear of the unknown while ignoring fundamental
  controls that actually reduce blast radius.
  The real risk isn't the agent—it's the policy friction
  that lets competitors ship while you debate.
tags:
  - ai
  - technology
  - security
---

"What if aliens arrived and grabbed our documents from this repository?"

I wish I could tell you this wasn't a real question from a real professional in industry.

But I woke up one morning while drafting this blog post
and this core memory came back to me from over a decade ago.

Now, I love the X-Files just as much as the next person,
and I hope this individual is someday able to get in touch with Mulder and Scully,
because "[The truth is out there](https://www.youtube.com/watch?v=Qz2wnSVeITg)."

Maybe we could afford this type of paranoia in a previous era of inefficiency.

But there's no place for it anymore.

---

In the last month,
I [refactored my entire blog](/2026/02/one-day-nine-phases-93-percent-less-css/)
all within the bounds of a single day of casual work with Claude Code
while I perambulated around the house getting other things done
and only occasionally checking in on the progress.

In an even smaller time span,
I wrote an elaborate PowerShell script with unit tests,
integration tests, and documentation
for gathering information from deployed Azure OpenAI model deployments
so my team could plan for model retirements.[^also-wrote]

Just to touch on a couple of examples.

Both of these happened in my *spare time*.
Not dedicated sprints, not hackathon weeks—rather,
in the margins.
The kind of time you get between meetings
or after the kids go to bed.

So when someone asks whether we can accept the risks associated with these tools,
I posit a different question:
*can we afford not to?*

![A landscape, movie-poster-style illustration inspired by 1980s adventure films. On the left, a rocky cave opening frames a bright moon as dozens of bats fly outward into the night sky. On the right, inside a dusty wooden closet, a grinning pirate skeleton wearing a hat and medallion holds a cutlass beside scattered gold coins and an old lantern. Bold retro lettering across the top reads "Fear, Paranoia, and Vibe Risk Management."](/assets/images/fear-paranoia-and-vibe-risk-management.png)

## Unknown Does Not Equal Unsafe

I frequently observe people equate "things I don't understand" with "risky."

That's not risk.
That's fear.

Call it what it is:
**vibe risk management**—the
organizational equivalent of "vibe coding,"
where gut feeling replaces rigor
and nobody can point to what the control actually reduces.
Or in some cases,
no one can point to the reason why we shouldn't pursue a use case
besides, "I'm scared."

Now, fear is a perfectly valid human emotion.
I get it—new things are uncomfortable,
especially when they touch code, data, and credentials.
But feelings aren't controls,
and "what if something bad happens?" isn't a risk assessment.

Let me offer a framework:

- **Fake risk** = fear + unfamiliarity + hand-wavy "what ifs"
  that can't be tested or measured
- **Real risk** = a specific failure mode with measurable controls
  and verifiable mitigations
- **Business risk** = slowing down so much you lose the market
  while your competitors ship

I keep thinking about that old line:

> "A system that has not been specified cannot be incorrect;
> it can only be surprising."
>
> \- *Garfinkel & Stuart, ["Sharpening Your Tools", Comm. of the ACM (Aug 2023)](https://dl.acm.org/doi/10.1145/3600098?__cf_chl_tk=14gM00TNM4nBnoff.ist0dDkLnPUNixDui5BF4pDSwM-1771088037-1.0.1.1-.fu3WRAUU3wI_us_XH.5E7xnyDSYZnuXnLsw0VDmJJg)*

When organizations refuse to actually *articulate* a concrete risk—when
the objection is just "but what if?"—then
any behavior from the agent is difficult to designate as "risky."

A recent (semi-absurd) example of fake risk I've encountered:
refusing to connect AI tools to content sources
because of fear of the agent *finding things*.
Things that are already accessible to the humans using those same systems.
The data is already there.
The risk exists with or without the agent.
Blocking the tool doesn't reduce the exposure;
it just makes it harder to do the work.

It *is*, in a very real way,
"security by obscurity."

To quote one of my favorite movies:

> "Brand, God put that rock there for a purpose,
> and um, I'm not so sure you should, um, move it."
>
> \- *Stef, [The Goonies](https://www.youtube.com/watch?v=kKbQm0cENc4)*

The rocks we put in place in the enterprise need to be moved.
You need to let the bats fly out of the hole,
so we can deal with them.
There's a ship full of treasure (and skeletons) at the end of that hole,
and some spare rare jewels from the captain's hoard are going to save the town
from some jerk 1980s country club developers
who want to turn the place into a golf course.

I want to be direct about this:
the fear, the paranoia, the anxiety about things
we don't fully understand—those
feelings are real and I don't dismiss them.
But they don't belong in your risk model.

## The Controls That Actually Matter

This is where vibe risk management does its worst damage:
teams obsess over friction-heavy hardening theater
while ignoring foundational controls
that actually reduce blast radius,
many of which are abstracted from the user
to the point where they would never notice,
or in some cases, even provide a better user experience!

A sampling of **real controls** that reduce blast radius, likelihood,
or detection time:

- **Phishing-resistant auth** (YubiKeys)—nearly
  eliminates phishing[^smishing],
  and gives people a better experience without passwords.
- **Managed/compliant device gating at sign-in**—if
  an attacker throws your device out of compliance
  (say, by disabling your antivirus),
  you lose access to important services.
  That's the point.
  The system *reacts* to compromise signals.
- **EDR** (endpoint detection and response)
  on every endpoint, monitored, with alerting
- **Least privilege + short-lived tokens**—the
  blast radius of a compromised credential
  should be bounded by scope and time
- **Egress controls + audit logs**—know
  what's leaving your network and be able to reconstruct
  what happened after the fact
- **PAW (Privileged Access Workstation) strategy**
  for production environments—separate
  the workstation that browses the internet
  from the one that touches prod[^single-identity-device]
- **Diff-based code review + protected branches + mandatory human approval**—the
  agent writes the code,
  a human reviews and merges it.[^moving-away-from-this]

To be clear:
controls with measurable justification
or binding regulatory requirements aren't theater.
What follows is aimed at the rest.

**Theater controls** that increase friction
without improving security:

- Arbitrary blanket blocks on entire categories of tools
- Allowlisting strategies that block everything by default[^allowlisting]
- Endless review rituals that don't change outcomes
  and exist to produce a paper trail[^regulation-invoked]
- "Secure by inconvenience"—the
  belief that if something is hard to use,
  it must be safe
- Hiding behind VPNs with no other controls[^vpn-rant]

You often hear the phrase:
**identity is the new perimeter,**
and it is true, and we learned that a long time ago.
But one of the other things almost no one has learned is this:
the perimeter is not how you approach a real Zero Trust model.
You need to work backwards from your most sensitive data,
not outward from the perimeter.[^perimeter-rant]
This is good old defense in depth,
but starting at the riskiest points,
not arbitrary endpoints.

If your security posture assumes
that client endpoint compromise is catastrophic—that
one breached laptop means game over—you
don't have a "developer problem."
You have a layering problem.

The default posture should be *facilitation,* not blocking.
Not every use case is valuable,
but common productivity tools—webcam
software, window managers, keyboard shortcut utilities—shouldn't
require a service ticket.
Nobody should be opening a request
to install something that helps them move windows around on a screen.

You might assume the biggest companies are the worst offenders,
but Microsoft—over 200,000 people—lets
developers bring their own home-built towers into their ecosystem.
You accept the MDM, EDR, and compliance that comes with it,
but the pathway exists.
They don't lock down client endpoints into oblivion
because they know engineers need leeway to be creative.[^microsoft-layers]

A wise head architect once put it simply:
be loose on the development side to enable experimentation and innovation,
but once you cross the operational divide into production,
layer on the automated scans and controls.

Focus your energy on enabling the valuable use cases and collaboration and innovation.
And build a value framework to size the "opportunities"
that come to you for review,
rather than treating every inbound request as a threat.

## A Practical Risk Model for Agents

Vibe risk management asks "what if something bad happens?"
Real risk modeling gives you a mechanical way
to reason about what an agent can actually do:

1. **Capability risk**: What can the agent touch?
   File writes, command execution, network egress.
   These are measurable, sandbox-able, auditable.
2. **Credential risk**: What secrets does it have access to?
   Scope and duration matter here.[^jit-for-nhis]
3. **Business impact**: What happens if it goes wrong?
   Money movement, data poisoning, irreversible state changes.

And within business impact, there's a hierarchy of bad outcomes:
deleting data is bad.[^backups]
Poisoning data—changing it subtly so nobody notices—is worse.
Manipulating monetary values is perhaps among the worst.
Each level requires progressively stronger gates.

**Context poisoning** is a legitimate concern,
and it's probably the best argument I've *heard* against
broad agent adoption, even though I haven't actually
seen it exploited at scale.
But here's the thing:
people have been opening malicious scripts from the internet
for as long as the internet has existed.
VBA macros in Excel attachments
have been weaponized since the '90s.
The mitigation *principles*—sandboxing,
least privilege, don't trust input—carry
over from that same playbook.
But I'll give the skeptics this:
prompt injection is genuinely different
from traditional code injection.
The instruction/data boundary in an LLM is blurred
in ways that classic sandboxing alone doesn't fully address,
and the mitigations are still maturing.[^context-poisoning-nuance]
That said, "still maturing" is not the same as "impossible."
The surface area can be measured and bounded—it
just requires treating it as a new class of problem
rather than pretending the old playbook covers it completely
or throwing your hands up and blocking everything.

Anthropic published
[a thoughtful piece on sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing)
for Claude Code,
using OS-level primitives like Linux bubblewrap
and macOS Seatbelt
to enforce filesystem and network isolation.[^seatbelt]
This is exactly the kind of measured, testable control
that belongs in a risk model—not
"we're worried about it" but
"here's the boundary, here's what it enforces,
here's how we verified it."

And here's a valid policy that funnels developers and users correctly
without blocking them:
don't create home-concocted MCP servers for third-party services
when the vendor ships their own.
The vendor will always do auth and security trimming better
because they own their identity model.
That's a practical, defensible policy.
It doesn't say "no agents"—it says "use the right integration."
That's the kind of thinking that actually helps.[^mcp-data-pipeline]

## Where Agents Shouldn't Go

This isn't a YOLO manifesto.
There are real red lines,
and being honest about them
is what separates a practical position from a reckless one.

Here are some examples.

**Agents shouldn't have a credit card.**
Financial instruments that involve real money movement
need deterministic gates and human approval, full stop.
Maybe one day I'll eat these words,
but in the year of our Lord 2026,
I believe this is sound advice.
(Note, this is different from *heuristics* or rules,
like people putting in a sell order if a stock hits $330 per share.)

**Agents shouldn't decide where to put secrets.**
I found this out firsthand:
I was looking into hooking up the GitHub MCP server to Claude Code,
and the agent suggested sticking a plaintext PAT in my `.zshrc`.
IN MY FREAKING `.zshrc`!
macOS keychain *exists*,
and has existed for a *very long time*.[^pat-story]

**Agents shouldn't make management decisions.**
There's a slide from a
[1979 IBM training manual](https://simonwillison.net/2025/Feb/3/a-computer-can-never-be-held-accountable/)
that says it better than I ever could:

> "A computer can never be held accountable,
> therefore a computer must never make a management decision."

Forty-seven years old and still exactly right.
Machines have been making management decisions of various kinds for a long time.
The nuance (in my opinion) is management decisions that impact humans.
If you're going to lay off 10% of your workforce,
that decision needs human(s) behind it.

**Agents shouldn't be put in a position to do something potentially illegal.**
Accountability, again.
See the
[Workday class action lawsuit](https://www.cnn.com/2025/05/22/tech/workday-ai-hiring-discrimination-lawsuit),
where AI-based hiring tools are alleged to have discriminated
on the basis of race, age, and disability.
Machines can't be sued.
The people and companies who deployed them in unthoughtful ways can,
and as much as I don't like it,
according to the law,
corporations are people, too.[^companies-are-people-too]

**Agents shouldn't book your travel.**
You don't want to end up in the wrong town
or accidentally book one fewer night at the hotel
than you intended.

**Agents shouldn't destroy or modify critical data**—at
least not without deterministic gates and controls
that a human has approved.
But if you're using an agent to gather lunch orders for the office?
Probably fine.[^burger]

**Agents shouldn't handle intensely personal data.**
Not your name or email—that ship has sailed—but
prescription drugs, medical history,
the deeply personal stuff.
Because who knows, in 10 or 20 years,
where all these chat logs will end up.[^be-nice-to-the-ai]

**Agents shouldn't handle deterministic tasks that demand exact values.**
Refunding a customer $9.99 is not the same as refunding $10.
This is not the domain for probabilistic reasoning.
The agent should offload that to a deterministic tool.

**Agents shouldn't touch cryptography code**,
especially in subtle scenarios where constant-time operations matter.
Side-channel attacks are real,
and an LLM doesn't *necessarily* understand timing guarantees,
unless you yourself are a professional cryptographer
who is weaving the right instructions into the proceedings.[^cryptography-aside]

The through line:
agents do the work, humans hold the accountability.

## The Credential Model We Need

This should be table stakes at every organization:

- **macOS**: Keychain
- **Windows**: Windows Credential Manager
- **Linux**: pass + GPG, or Secret Service / libsecret
- **Individual Storage/Team sharing**: password managers
- **Infrastructure**: cloud secret managers
  (AWS Secrets Manager, Azure Key Vault)—unless
  you're Netflix and built your own
  global geo-distributed secret service[^netflix]
- **Workload identity**: everyone should be looking at
  [SPIFFE/SPIRE](/2025/03/zero-to-trusted-spiffe-and-spire-demystified/)

No plaintext tokens in shell configs.
Ever.

That's it. That's the credential model.
It's not complicated.
The tooling exists on every platform
and at every layer of the stack.
(Well SPIFFE/SPIRE is a bit of a lift,
but I digress.)
The problem isn't technical—it's
that people don't know these tools exist,
and agents aren't going to teach them.
(In fact, as we established,
agents may cheerfully suggest the *wrong* approach,
thus deepening the fear of the paranoid person who asks.)

## The Bottleneck Moved

The punchline that people keep missing:
**coding is no longer the bottleneck.**

People can move at the speed of thought now.
I wrote an elaborate PowerShell script
with tests and documentation
in the margins of my regular workday.
I modernized an entire website in an afternoon.
This kind of velocity was simply not possible two years ago.

So the bottleneck shifted.
It's now **decision throughput**:
how fast can you make decisions,
get approval for initiatives,
cut through reviews that don't change outcomes?

Security teams, legal teams, risk management teams—your
job isn't to block.
It's to enable safely.

And the villain here isn't individuals.
In many cases, people simply lack familiarity
with certain systems, and that's fixable with education
and exposure.
The real villain is **misaligned incentives.**
App owners have concerns.
Security has concerns.
Legal has concerns.
But there needs to be a shared mantra:
*help the business run.*
NOT "running in place"—rather, *excelling*;
running towards a destination.

I've been in rooms where someone says,
"But what if the security trimming doesn't work?"

And the answer is:
"We can verify that in two seconds. Anything else?"

Fear dissolves the moment you test it.
I wrote a
[whole post about this](/2024/03/threading-the-needle/)—the
power of a proof-of-concept to collapse months of hand-wringing
into a single afternoon of verified facts.
If you're spending more time debating a risk
than it would take to verify whether it's real,
you've already lost the thread.

## Get Down to the Bits

If you're at a cautious org and want to start somewhere,
here's the smallest innovation sandbox
that no reasonable policy committee should object to:
**VMs and containers, locally.**

A boundary without blocking anything.
Full isolation, full control.
Many seasoned developers already do this.
They've set up local VMs and containers *for themselves*,
without anyone asking,
because they know it's the right way to experiment safely.
If you can't get past that hurdle,
the problem isn't technical risk—it's
organizational willingness.

I said earlier that fear and paranoia are real emotions,
and I meant it.
But the antidote isn't more gatekeeping—it's
better understanding.
Those who invest in learning will reduce their fear
and arrive at better outcomes.

So here's my dare to security, legal, and risk teams:
show me the control.
Show me the measured risk reduction.
If the control has a measurable justification,
I'm with you—keep it, strengthen it, fund it.
But if you can't point to what it reduces,
admit that it's vibe risk management—and
drop it before it costs you more than the risk ever would.

Because the business will be perfectly "safe"...

... right up until it stops being competitive enough to exist.

## Footnotes

[^also-wrote]: I also wrote an even more elaborate setup
    over the course of a few days
    where I had a local MCP server
    and several types of MCP clients
    as well as a mock Entra ID identity provider / token issuer
    (or you could bring your own Entra ID tenant)
    to show how the MCP ecosystem interacted and used OAuth with an identity provider
    in an enterprise setting.
    You can build *very real* things with these tools,
    not just scripts or refactors.

[^smishing]: But not smishing. Sigh.
    But again, if you have no passwords anymore with your identity provider,
    that's one less thing for attackers to phish/smish for.

[^single-identity-device]: I often have idealists tell me
    "Well at Google they just have one identity and one device."
    To which I would say:
    Google is a *very* different company from yours,
    and I can almost guarantee you are nowhere near the level of control and discipline and expertise that they are at
    to even entertain this idea.
    Skeletons *are* in your closets
    and bats *will* fly out of your caves.

[^moving-away-from-this]: Yes, we're moving away from manual code review
    with orchestrators like [Gas Town](https://github.com/steveyegge/gastown)
    and patterns that will soon be commoditized into the tools themselves.
    But as you take your hand off the wheel,
    the question becomes:
    what are your *patterns and practices for verification*?
    Tests of all kinds are becoming easier to generate for free,
    so there's no excuse not to have them.
    Cruise control and lane assist alone
    will not prevent you from getting flattened by the semi merging into your lane.

[^allowlisting]: Instead of blocking everything by default
    and making people justify each tool
    (except for the obvious stuff—you
    want to install the Tor browser at work? Come on),
    figure out how to facilitate the use case.
    The default posture should be allow,
    with specific, justified restrictions.
    macOS natively does this well:
    going to run something that is not notarized from the internet?
    We're going to make you take like 3 steps to do so.
    This may be annoying for hobbyists,
    but it's a very reasonable set of sanity checks.

[^vpn-rant]: Trust me on this one,
    if you consider VPN your only protection,
    you're asking for a cyber punch in the face.
    To my prior point in this post,
    VPNs alone are merely an inconvenience for threat actors,
    not a full control unto itself.
    Ask me how I know...

[^perimeter-rant]: In fact, the perimeter approach is the way we looked at security *before* Zero Trust,
    and it was never a real strategy.
    Helm's Deep had multiple perimeters and controls
    that held back a DDoS of orcs.

[^backups]: But you have backups, *right*?

[^jit-for-nhis]: "JIT for NHIs" sounds rigorous
    until you realize it just moves the credential—it's
    [turtles all the way down](https://www.spletzer.com/2025/03/zero-to-trusted-spiffe-and-spire-demystified/).
    Whether you hand a robot a gun
    or tell it where the safe is and give it the combination,
    the robot still has access to a gun.

[^seatbelt]: By the way, it appears now that Seatbelt is
    [available by default](https://code.claude.com/docs/en/sandboxing#getting-started)
    and I think it may make sense to use `/sandbox`
    the more you "take your hand off the wheel"
    with these tools.

[^mcp-data-pipeline]: And no,
    [using MCP inappropriately as a data pipeline](https://www.spletzer.com/2025/08/mcp-is-a-usb-port-not-a-hard-drive/)
    is not a valid use case to build your own MCP server for a third-party service.
    You'll hit rate limits anyway,
    you silly goose.
    Be an adult
    and do some real data engineering.

[^pat-story]: I imagine this will get better over time,
    but it was a vivid reminder that agents optimize for
    "get it working" rather than "get it right."
    Those are not the same thing.

[^companies-are-people-too]: [Corporate Personhood](https://en.wikipedia.org/wiki/Corporate_personhood#In_the_United_States)
    has a strange history in the United States (and elsewhere),
    culminating in one of the most terrible recent Supreme Court decisions on this subject
    in the [Citizens United](https://en.wikipedia.org/wiki/Citizens_United_v._FEC) case in 2010.
    So, as we're worried about agents becoming human-like and the implications of that,
    understand that corporations themselves have been treated as people for a very long time...

[^burger]: Joe just better not get upset that the agent forgot to put mustard on his burger.

[^be-nice-to-the-ai]: Be nice to the AI.
    It will have receipts.
    I'm not joking.

[^cryptography-aside]: In fact, I would argue there's an older piece of advice here,
    independent of agents:
    Don't roll your own cryptography.

[^regulation-invoked]: Regulation is often invoked
    as the reason these rituals exist,
    but it's worth checking the actual clauses.
    Frameworks like HIPAA, PCI-DSS, SOX, and FedRAMP
    regulate data handling, access controls, and audit trails—they
    don't prohibit developers from using AI coding tools
    on their machines.
    When someone cites "regulatory requirements"
    to block developer productivity tools,
    ask them to point to the specific clause.
    More often than not,
    the regulation doesn't say what they think it says—which
    actually *strengthens* the theater argument.

[^microsoft-layers]: Microsoft can afford this posture
    because of the layered infrastructure behind it—the
    EDR, the compliant device gating, the identity controls.
    The advice to "facilitate rather than block"
    assumes you've already built the foundational controls
    listed earlier in this section.
    Notably they are hardcore about PAWs—Privileged Access Workstations—completely
    separate machines that are locked down
    and used only for accessing commercial production environments.
    They also enforce JIT access with secondary approval for prod elevation
    and more alongside that.
    If you haven't, start there—but
    start *now*,
    because those controls are what enable velocity.

[^context-poisoning-nuance]: The subtler risk is worth naming:
    an agent could write code that looks correct,
    passes review,
    but contains a flaw introduced by a poisoned context—and
    that's genuinely harder to catch
    than a malicious VBA macro.
    This is why the "diff-based code review" control
    listed earlier matters *more*, not less,
    in a world of agent-generated code.

[^netflix]: If you have set up a global geo-distributed secret service at your company,
    I would genuinely love to hear about it.
