---
layout: post
title: Fake Risk, Paranoia, and the Fear of the Unknown
date: 2026-02-13 00:00:00
description: >
  Enterprise security teams are blocking AI coding agents
  based on fear of the unknown while ignoring fundamental
  controls that actually reduce blast radius.
  The real risk isn't the agent — it's the policy friction
  that lets competitors ship while you debate.
tags:
  - ai
  - technology
  - security
---

"What if aliens arrived and grabbed our documents from this repository?"

I wish I could tell you this wasn't a real from a real professional.

But I woke up one morning while drafting this blog post
and this core memory came back to me from over a decade ago.

Now, I love the X-Files just as much as the next person,
and I hope this person someday is able to find Mulder and Scully,
because "The truth is out there."

Maybe we could afford this type of paranoia in a previous era of inefficiency.

But there's no place for it anymore.

---

In the last 30 days,
I [refactored my entire blog](/2026/02/one-day-nine-phases-93-percent-less-css/)—nine
phases, 93% CSS reduction, Bootstrap removal,
WCAG accessibility compliance—all
in a single day of focused work with an AI coding agent.

In the same stretch,
I wrote an elaborate PowerShell script with unit tests,
integration tests, and documentation
for gathering information from deployed Azure OpenAI model deployments
so my team could plan for model retirements.

Both of these happened in my spare time.
Not dedicated sprints, not hackathon weeks—margins.
The kind of time you get between meetings
and after the kids go to bed.

So when someone asks whether we can accept the risks associated with these tools,
I posit a different question:
*can we afford not to?*

## Unknown Does Not Equal Unsafe

The core misconception I keep running into:
people equate "things I don't understand" with "risky."

That's not risk.
That's fear.

And fear is a perfectly valid human emotion.
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

There's fake mint flavored ice cream,
and there's ice cream with real mint in it.
You can taste the difference.
Apply the same palate to risk evaluation.

I keep thinking about that old line:
"A system that has not been specified cannot be incorrect;
it can only be surprising."
When organizations refuse to *articulate*
a concrete threat model—when the objection
is just "but what if?"—then any behavior from the agent
isn't "wrong."
It's just *surprising* to people who never specified what they expected.
That's a specification problem, not a security problem.

The most absurd example of fake risk I've encountered:
refusing to connect AI tools to content sources
because of fear of the agent *finding things*.
Things that are already accessible to the humans using those same systems.
The data is already there.
The risk exists with or without the agent.
Blocking the tool doesn't reduce the exposure;
it just makes it harder to do the work.

An earlier working title for this post was
"Fake Risk, Paranoia, and the Fear of the Unknown."
I want to be direct about this:
the fear, the paranoia, the anxiety about things
we don't fully understand—those
feelings are real and I don't dismiss them.
But they don't belong in your risk model.

## The Controls That Actually Matter

This inversion drives me crazy:
teams obsess over friction-heavy hardening theater
while ignoring foundational controls
that actually reduce blast radius.

**Real controls** that reduce blast radius, likelihood,
or detection time:

- **Phishing-resistant auth** (YubiKeys)—nearly
  eliminates phishing[^smishing]
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
  from the one that touches prod
- **Diff-based code review + protected branches +
  mandatory human approval**—the
  agent writes the code,
  a human reviews and merges it

**Theater controls** that increase friction
without improving security:

- Arbitrary blanket blocks on entire categories of tools
- Allowlisting strategies that block everything by default[^allowlisting]
- Endless review rituals that don't change outcomes
  and exist to produce a paper trail
- "Secure by inconvenience"—the
  belief that if something is hard to use,
  it must be safe
- Hiding behind VPNs with no other controls.
  (Trust me on this one;
  if you consider VPN your only protection,
  you're asking for a cyber punch in the face.)

The framing that matters:
**identity is the new perimeter,**
and we learned that a long time ago.
Work backwards from your data,
not outward from the perimeter.
This is good old defense in depth.

If your security posture assumes
that endpoint compromise is catastrophic—that
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

Focus your energy on enabling the valuable use cases.
And build a value framework to size the "opportunities"
that come to you for review,
rather than treating every inbound request as a threat.

## A Practical Risk Model for Agents

If fake risk is "what if something bad happens,"
real risk modeling gives you a mechanical way
to reason about what an agent can actually do:

1. **Capability risk**: What can the agent touch?
   File writes, command execution, network egress.
   These are measurable, sandbox-able, auditable.
2. **Credential risk**: What secrets does it have access to?
   Secrets exposure, token replay, privilege escalation.
   Scope and duration matter here.
3. **Business impact**: What happens if it goes wrong?
   Money movement, data poisoning, irreversible state changes.

And within business impact, there's a hierarchy of bad outcomes:
deleting data is bad.
Poisoning data—changing it subtly so nobody notices—is worse.
Manipulating monetary values is worst.
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
The mitigation playbook—sandboxing,
least privilege, don't trust input—is
the same playbook we've been running.
The agent doesn't change the fundamentals;
it changes the surface area,
and that surface area can be measured and bounded.

Anthropic published
[a thoughtful piece on sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing)
for Claude Code,
using OS-level primitives like Linux bubblewrap
and macOS seatbelt
to enforce filesystem and network isolation.
This is exactly the kind of measured, testable control
that belongs in a risk model—not
"we're worried about it" but
"here's the boundary, here's what it enforces,
here's how we verified it."

And here's a valid policy that channels tools correctly
without blocking them:
don't homebrew MCP servers for third-party services
when the vendor ships their own.
The vendor will always do auth and security trimming better
because they own the identity model.
That's a practical, defensible policy.
It doesn't say "no agents"—it says "use the right integration."
That's the kind of thinking that actually helps.

## Where Agents Shouldn't Go

This isn't a YOLO manifesto.
There are real red lines,
and being honest about them
is what separates a practical position from a reckless one.

**Agents shouldn't have a credit card.**
Financial instruments that involve real money movement
need deterministic gates and human approval, full stop.

**Agents shouldn't decide where to put secrets.**
I found this out firsthand:
I was looking into hooking up the GitHub MCP server to Claude Code,
and the agent suggested sticking a plaintext PAT in my `.zshrc`.
My `.zshrc`!
macOS keychain *exists*.[^pat-story]

**Agents shouldn't make management decisions.**
There's a slide from a
[1979 IBM training manual](https://simonwillison.net/2025/Feb/3/a-computer-can-never-be-held-accountable/)
that says it better than I ever could:

> "A computer can never be held accountable,
> therefore a computer must never make a management decision."

Forty-seven years old and still exactly right.

**Agents shouldn't be put in a position to do something
potentially illegal.**
Accountability, again.
See the
[Workday class action lawsuit](https://www.cnn.com/2025/05/22/tech/workday-ai-hiring-discrimination-lawsuit),
where AI-based hiring tools are alleged to have discriminated
on the basis of race, age, and disability.
Machines can't be sued.
The people who deployed them in unthoughtful ways can.

**Agents shouldn't book your travel.**
Come on, who does that?
But also, practically:
you don't want to end up in the wrong town
or accidentally book one fewer night at the hotel
than you intended.

**Agents shouldn't destroy or modify data**—at
least not without deterministic gates and controls
that a human has approved.

**Agents shouldn't handle intensely personal data.**
Not your name or email—that ship has sailed—but
prescription drugs, medical history,
the deeply personal stuff.
Because who knows, in 10 or 20 years,
where all these chat logs will end up.
Be nice to the AI.
It will have receipts.
I'm not kidding.

**Agents shouldn't handle deterministic tasks
that demand exact values.**
Refunding a customer $9.99 is not the same as refunding $10.
This is not the domain for probabilistic reasoning.

**Agents shouldn't touch cryptography code**
where constant-time operations matter.
Side-channel attacks are real,
and an LLM doesn't understand timing guarantees.

The through line:
agents do the work, humans hold the accountability.

## The Credential Model We Need

This should be table stakes at every organization:

- **macOS**: osxkeychain
- **Windows**: Windows Credential Manager
- **Linux**: pass + GPG, or Secret Service / libsecret
- **Team sharing**: password managers
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
The problem isn't technical—it's
that people don't know these tools exist,
and agents aren't going to teach them.
(In fact, as we established,
agents will cheerfully suggest the wrong approach.)

## The Bottleneck Moved

The punchline that people keep missing:
**coding is no longer the bottleneck.**

People can move at the speed of thought now.
I wrote an elaborate PowerShell module
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
Not running in place—*excelling.*

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
Full isolation, full control,
no data leaving the machine.
If you can't get past that hurdle,
the problem isn't technical risk—it's
organizational willingness.

The fear, the paranoia,
the anxiety about things we don't fully understand—all
of that is real,
and I'm not asking anyone to pretend otherwise.
But we all need to be working hard right now
to build better understanding,
because those who invest in learning
will reduce their fear
and arrive at better outcomes.

So here's my dare to security, legal, and risk teams:
show me the control.
Show me the measured risk reduction.
Or admit it's vibes.

Companies that learn to parse real risk from theater
will experience the benefits of these tools firsthand.
The rest will have great job security—right
up until the business doesn't.

## Footnotes

[^smishing]: But not smishing. Sigh.

[^allowlisting]: Instead of blocking everything by default
    and making people justify each tool
    (except for the obvious stuff—you
    want to install the Tor browser at work? Come on),
    figure out how to facilitate the use case.
    The default posture should be open,
    with specific, justified restrictions.

[^pat-story]: I imagine this will get better over time,
    but it was a vivid reminder that agents optimize for
    "get it working" rather than "get it right."
    Those are not the same thing.

[^netflix]: If this is you, I would genuinely love to hear about it.
