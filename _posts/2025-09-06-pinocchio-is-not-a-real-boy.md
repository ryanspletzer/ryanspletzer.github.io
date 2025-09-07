---
layout: post
title: Pinocchio is Not a Real Boy
date: 2025-09-06 00:00:00
description: >
  LLMs didn't make code literacy optional—they raised the bar for what you need to learn
  so that you can effectively steer these AI assisted tools.
tags:
 - vibe-coding
 - ai
---


LLMs didn't make code literacy optional—in fact, quite the opposite:
they raised the bar for what you need to learn
so that you can effectively steer these AI assisted tools.

If anything, you're going to have to study programming languages,
frameworks,
and systems design **more** going forward,
not less.

Because when a model spits out a slick-looking solution,
you still need to actually understand it.

And if you're going to ship that solution,
you need to be able to reason about it when something breaks at 2 A.M.

Or worse, when it
[gets hacked](https://pivot-to-ai.com/2025/03/18/guys-im-under-attack-ai-vibe-coding-in-the-wild/).

And when that happens,
you'll have no one to point the finger at except yourself.

![A wooden marionette with a long nose sits at a developer’s desk, strings tied to floating "PROMPT" and code icons, facing a monitor where a flow diagram ends at a glowing "DEPLOY" button; a loose cable and a shelf labeled "TOYS" underscore the fragile, toy-like nature of the build.](
  /assets/images/pinocchio-is-not-a-real-boy.png)

## "This shouldn't be possible"… and yet, *it is*

I'm not a frontend specialist.[^1]

I know HTML, CSS and enough raw JavaScript
with accompanying design patterns to be dangerous,
and I know enough about the fundamentals of the web
and about tracing down errors and bugs with browser web developer tools
to even to identify and fix a problem;
but most of my web work is from 12+ years ago—back
when [SPA](https://en.wikipedia.org/wiki/Single-page_application) frameworks were
still figuring themselves out.[^2]

And yet, despite my limited hands-on expertise in frontend development,
I recently used LLM-assisted development to contribute fixes
around unnecessary auth redirects to the identity provider from `msal.js`
in a team's React/TypeScript frontend project,
and got them past the issue.[^3]

That ability to contribute to something
where I don't even have strong enough expertise nor muscle memory
to do it by hand—with or without a lot of googling—is the magic of
AI-assisted code generation.

And it is also the trap.

This generated code came (largely) from an LLM-enabled software process,
that was carrying out my directives.

It didn't come from an intern or a junior developer or a non-technical person,
but it could have easily also come from anyone with any background,
provided they knew the right questions to ask...

Despite knowing those right questions to ask,
and despite my very careful crafting of the prompt to describe precisely what I wanted,
and despite giving the tool a "short leash" by doing scoped edits in the relevant files,
I still found myself spending an undue amount of time reviewing the diff of the output
that came out of my prompt for this issue.

I realized through this process that suddenly, *I* was my own worst enemy.

I had to study the output ~10x more carefully precisely because it felt "too good."

It turns out, the assistant made a couple of mistakes—of course it did—and
only by reading the code,
asking the right questions,
and generally just having a gut feeling that "something is not right here"
("Why did it do *that*?"),
did I catch the issues involved.

The lesson here is:
AI coding assistance accelerates you very quickly into terrain you don't fully know or understand.

And because of that,
your only safety net is your willingness to continuously learn fast and verify everything.

## You vibe it, you run it

There's a line I like
from a [recent blog post from Uptime Labs](https://uptimelabs.io/you-vibe-it-you-run-it/):
*"You vibe it, you run it."*

I'm not here to out-write nor out-research that original essay;
I'm here to double down on the core points with lived experience.

If you "vibe code" something you don't understand and then hand it off,
**no one** truly understands it.

At best,
the next team inherits a black box with nice comments.

At worst,
they inherit a fire.

Yes,
you can ask an LLM to explain a codebase to you.

You can be diligent with Cursor or GitHub Copilot rules,
ensuring that it always generate docstrings and Mermaid diagrams (token consumption galore).

Some people will do that.

Most inexperienced vibe coders won't—at least, not yet.

The folks who will do well and enjoy continued success in this era
aren't the ones who ship the first demo
(which will become, on some level, commoditized to the point where anyone can do that);
they're the ones with **endless curiosity** who keep learning between prompts and after the demo.

Because of this, I would really discourage using Max / YOLO Mode for everything
and not taking the time to understand what has been generated afterwards.

I've dabbled in digital photography in the past,
and I'll never forget what my friend's dad (a professional photographer) said to me once:
"You know, the thing is, the more shots you take,
the more you have to go through and review later."

I learned that lesson early on when I was shooting photos with my DSLR,
and it's even more of a prescient lesson now as I'm a few years older
and generally have less time to afford to give to endlessly reviewing and editing photos;
whether it's a nice mirrorless camera or my phone's camera,
I'm much more deliberate about what I snap a photo of now.

In that vein, I recommend being much more deliberate about the "shots" you're
taking with these coding tools.

There are times when you want to generate something quickly from scratch as a starting point,
and letting the agent take over the whole project may be warranted in that initial prompt.[^4]

Maybe the thing you're generating is just for you and is simply a tool you're going to run locally
and may even throw away later—fine.

When things get "real" though, it's a different story.

You have to understand that the universe has enough entropy as it is,
and you're not helping the situation by "pooping out" drivel and nonsense.[^5]

When you're trying to bring something to life that may be used by others
and perhaps eventually put into a production setting,
I recommend orchestrating the LLM with a **sliding scale of autonomy**:
ask relevant questions to the tool first to gain an understanding,
then based on that understanding try some approaches that tightly scope the autonomy of
the agent as possible for the problem at hand,
commit often so you have coherent states to roll back to
(and you can leverage the tools here by craft more detailed commit messages, too),
take some suggestions from the tools;
but sometimes,
you need to let the tool sit their quietly while you read.

In any case,
**you** own the responsibility of comprehension afterwards.

## The toy that went to production

Every day I see vibe-coded projects deployed to the open internet with:

* no authentication
* no authorization
* unvalidated inputs
* secrets in plain text
* no TLS termination at the edge
* no proper LB/WAF/DDOS protections
* zero observability (no logs, no metrics, no traces)
* no rollback plan

In toy cases with silly frontends,
maybe this doesn't matter.

The problem is people are treating toys like production.

**Pinocchio is not a real boy**,
and his nose gets longer every time he promises you
that his created puppet show is "good enough for prod."

Your creation will gather dust on a shelf—or worse,
you and Pinocchio will get swallowed by a whale,
in the form of your neighborhood friendly script kiddie
that's taken over your website just for the lulz.

## Study more, not less

I'm going to keep studying languages,
frameworks,
auth,
networking,
zero trust,
systems design patterns—because the work that actually matters isn't a weekend toy.

It's lived in the messy world of legacy constraints,
enterprise identity,
real users,
and uptime.

Knowing what you want counts for a lot.

Knowing **what it takes** to make it real counts for everything.

## Quality is recognizable—even to your contractor

You've likely had a contractor open a wall at your home residence at some point and say,
"what the f— happened here?"

That's the sound of shortcuts and cut corners hitting their expiration date.

You also know the feeling of opening a new iPhone and everything just… works.

There's a gap between "assembled parts" and "integrated product."

This is analogous to asking your buddy to build you a tower PC
when you have zero knowledge of how to build one yourself:
it sounds like a great idea and looks wonderful,
until a random part dies,
then suddenly you're dependent on that one friend—or a repair shop—because
you don't know how to replace the part yourself.

A family member of mine is a commercial pilot with decades of experience,
and in recent years he has taken up the hobby of flying small drones,
and while he knows it is on some level a fun toy,
on another level he takes the FAA rules around drones very seriously.

Further, he will likely never lose his drone in a lake
like you've see in those many funny YouTube videos.

He enjoys flying drones, but at the same time
he does **not** trust them like a real aircraft.

He understands capability versus consequence.

We should, too.

## The enterprise "intern effect"

Even before the AI craze and hype hit,
at multiple companies,
I've long seen non-software engineering business teams hire a summer intern to build something the org won't prioritize—and on the surface, this is often a perfectly reasonable move to explore.

And the intern might do a great job for their level.

But because the team around them has no software engineering experience,
they don't understand the company's ecosystem,
identity model,
deployment standards,
data policies, etc.

When the internship ends,
so does ownership of the project.

And the team is left holding the bag,
desperately asking other teams if they can take what the intern built
(which due to lack of guidance is *nowhere* near being production-ready)
and "host" it somewhere besides the local laptop it was built on...

That pattern is now widespread—a director of marketing with no programming experience
can now vibe code a solution into reality
(and even commit it to git—I've seen it happen!)
and the "handoff" from the coding tool to person with the idea is immediate.[^6]

It's like everyone now has their own personal intern,
who can do an entire intern project in a day.

But it turns out,
the intern is a model,
and much like a real-life software engineering intern
embedded in a team of non-software engineers,
there probably wasn't the right guidance available
during those vibe coding sessions...

If you don't build the **muscle** of understanding,
you get all of the demo and none of the durability.

## Yes, you still have to study

Notice the wave of new O'Reilly-style books and courses popping up:
"Build X with Y,"
"Web Apps with Bolt,"
"Secure LLM Apps on Z."

If you thought "AI means I don't have to study,"
think again.

The material is evolving because the **work** is evolving,
and the work still rewards people who can read code,
reason about systems,
and make good trade-offs.

---

We can all experiment.

And we should.

But experiments don't relieve us from the burden of understanding.[^7]

Pinocchio can sing,
dance,
and put on a great demo.

Just remember:
he's not a real boy.

He's not even a puppet with sentience—just
a wooden marionette where you are pulling the strings
and telling him the songs to perform.

And his nose grows longer with every lie he tells you
about the production-worthiness of the things you are vibing into existence.

If the songs he sings are poorly written and out of tune,
no one will be willing to pay for the puppet show
(or give you the time of day to put the show on in the first place),
and you will have no one to blame but yourself.

In this way, vibe coding (and to some degree, using AI in general)
is very much like holding a mirror up to yourself.

Yes, it will allow you to do things you never thought possible.

But it will also reflect back the gaps in your own understanding,
especially if you are lack the self-awareness to recognize your own weaknesses
that prevent you from asking the right questions.

Just because you can will something into existence,
does not mean that you are absolved of personal responsibility over what you created.

If you want to build something you can trust,
you still have to do the work—study harder,
continuously learn,
stay curious,
give the AI a shorter leash (when possible),
and **own what you vibe**.

## Footnotes

[^1]: But I'm working on it.

[^2]: Sidebar, for the continous learners out there, [Scalable and Modular Architecture for CSS](https://smacss.com/) will change your life. It certainly might not be the most modern tome on CSS best practices, but it certainly changed my entire perspective on what maintainable CSS could look like when I read it a number of years ago.

[^3]: Really, a large part of contribution to that frontend fix was in large part my deep, years-long expertise in OpenID Connect/OAuth 2.0/JWT tokens, etc., but I digress.

[^4]: I find spec-driven development fascinating in this regard, because the act of forcing yourself to write out a spec goes a long way towards helping to craft your understanding of the problem, and the code that follows—but this still doesn't absolve you of understanding the generated output.

[^5]: I didn't invent the "pooping out code" phrase—many years ago, far before the dawn of AI coding assistance, I had a colleague who enjoyed scaffolding tools a *lot* and wanted the tools to just "poop out the code for me."

[^6]: I've seen these patterns play out before, too, with low-code/no-code tools and the notion of "citizen developers"—even if something is created that is well-done, at a certain point I have often observed that the citizen developer doesn't want to maintain the thing they have built indefinitely, and really wants to hand it off to some other group to run and maintain.

[^7]: [What's so funny 'bout peace, love, and understanding?](https://www.youtube.com/watch?v=Ssd3U_zicAI)
