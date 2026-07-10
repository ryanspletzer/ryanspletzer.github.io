---
layout: post
title: Don't Put an LLM Behind an MCP Server
date: 2026-07-09 00:00:00
description: >
  MCP took off because it solved a real problem:
  getting context out of external systems and into your agent.
  Then parts of the ecosystem discovered a new trick—putting
  an entire LLM behind the tool call.
  It's slow, it's opaque, and it inverts the point of the protocol.
  Here's why the pattern fails and what to build instead:
tags:
 - ai
 - agents
 - mcp
---

![The smallest doll in a set of floral-painted Russian matryoshka nesting dolls, standing nested inside the open lower half of the next doll, with the remaining larger doll halves arranged around it.](/assets/images/Floral_matryoshka_set_2_smallest_doll_nested.JPG)
*BrokenSphere, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Floral_matryoshka_set_2_smallest_doll_nested.JPG).*

I've had enough.

I recently tried a CLI tool from a vendor
(who shall not be named, but you have definitely heard of them).
I used Claude Code to call said CLI
(which was a *recommended* way to use this tool).
I asked a simple question about some simple data that comes from the vendor's system behind all this,
the kind of lookup that any reasonable API answers
in a few hundred milliseconds
(and which the vendor's native direct API's are actually exceedingly good at responding to quickly).
Instead, the CLI's request to its backing MCP server vanished into a hidden inference loop,
as I sat there watching one AI wait for another AI to think,
in the double digits of seconds that gives one enough time to ponder the entirety of the meaning of life.

When you put an LLM *behind* an MCP server,
and further call it from an MCP client that is itself an agent with its own LLM,
what you are inherently doing is breaking a social contract
of what MCP was originally designed for
and was supposed to be for users of these tools:
a way for agent MCP clients to query data provide context to the model.
It was never intended for it to facilitate communication to yet another model/agent.
(There have since been protocols that have come up that do this, like A2A, ACP,
however once again the UX expectation of someone using Claude Code over a CLI/MCP
is NOT one that where people are expecting an LLM on the other end.)

Somewhere along the way, some of us in this industry lost our minds.
I sure hope we find them.

Don't do this.
Don't put an LLM behind an MCP server.

## The pattern

The anti-pattern looks like this:
an MCP server exposes a tool,
but the tool's implementation is a prompt to another model.
Your agent calls something like `get_insights(question)`,
and behind the curtain a second model—one you didn't choose,
running a system prompt you can't read,
over context you can't see—generates prose
and returns it as the tool result.
Sometimes it goes further,
and the "tool" is a whole agent with its own loop, tools, and retries.

It's matryoshka architecture:
you open the tool and there's another model inside.

It doesn't help that people confuse MCP servers with agents.
AI hype swirls,
and in a weird way it works itself into real architecture:
a leader erroneously asks for an "MCP agent,"
a development team living under a rock vibe codes the misinterpretation,
and now they have a Frankenagent on their hands.

On a slide, this looks sophisticated.
Why settle for a dumb pipe when the server itself can think?
In practice it breaks the contract that makes MCP useful in the first place.
Ian Malcolm had the diagnosis back in 1993:
your engineers were so preoccupied with whether or not they could,
they didn't stop to think if they should.[^malcolm]

## MCP delivers data, not decisions

The whole point of MCP is to deliver context from external systems
and let the client agent drive:
the agent decides what it needs,
expresses that intent through tool parameters,
gets results back,
and does the reasoning itself.
Tools work best when they behave like queries and commands—parameterized,
predictable, and inspectable.
I've written before about
[applying CQRS's ask-versus-act split to agent tools](/2025/08/ask-vs-act-applying-cqrs-principles-to-ai-agents/),
and the same discipline applies here:
a tool should either fetch something or do something,
and in both cases the agent should be able to trust what came back.

An LLM behind the tool inverts that relationship.
The server now decides what your agent gets to know.
A database row is checkable.
A search result carries its source with it.[^determinism]
A hidden model's summary is opinion wearing data's clothes,
and your agent will treat it as ground truth,
because tool results land in the context window
with the authority of facts.
You've also widened the prompt-injection surface:
the tool result is now generated text from a model you don't control,
ingested directly as if it were data.

## Two models, compounding failure

Egon Spengler's rule applies here: don't cross the streams.[^egon]
You accepted one stream of probabilistic inference
when you built your agent on an LLM.
An LLM behind a tool crosses it with a second one,
and the failure modes multiply.
When the final answer is wrong,
was it the caller misreading a good tool result,
or the hidden model hallucinating a bad one?
You can't tell,
because you can't see the inner model's prompt,
its version, its context,
or the data it actually retrieved.
You're paying for inference twice
to get an answer you can debug zero times.

And then there's the speed.
An LLM call inside a tool call turns a subsecond lookup
into a ten-, twenty-, thirty-second wait,
serialized inside your agent's loop,
often several times per task.
The agent can't do anything with a slow tool except wait on it,
and neither can you.
Every question I put to that big-vendor CLI
cost me a coffee break's worth of spinner,
and no answer quality survives that.

## The 1% exception

I'll allow that a carve-out might exist.
If a tool returns large blobs of unstructured data,
a small, genuinely fast model that condenses them before they hit the wire
could earn its place—emphasis on genuinely fast,
and on serving a purpose the client model can't serve itself.
Even then I'm skeptical.
A semantic search index that returns the relevant chunks is cheaper and faster.
It's also more honest,
because the client model sees actual source material
instead of a paraphrase.
If your justification for embedding a model is "the data is messy,"
the better fix is almost always improving retrieval
rather than hiding a summarizer in the middle.

## What to do instead

Expose the data.
Build tools that query, search, filter, and fetch,
and return structured results or relevant chunks.
Let the calling model do the reasoning.
It's the most capable component in the whole stack,
and it's the only one holding the user's full conversation,
which your server will never see.

If your server really does need a model's help mid-request,
the protocol already has an answer: sampling.[^sampling]
With sampling, the server asks the *client's* model for a completion,
which points the dependency in the right direction.
The user keeps their choice of model, their visibility, and their bill.

And if what you actually want is to delegate work to another agent,
delegate deliberately.
Use a real multi-agent setup where handoffs, streaming,
and context sharing are designed in,
instead of smuggling an agent through a tool-shaped trapdoor.

## Context, not conclusions

MCP took off because it gives agents clean access
to context that lives elsewhere.
That is the entire job:
deliver the data, take the parameters, let the client's model think.
An MCP server should hand your agent context, not conclusions.

The nested-model version gives you the opposite on every axis:
slower answers, less visibility, doubled cost,
and an agent reasoning over another model's opinions
instead of over your data.

I hope you're reading this as a smart person
and thinking, "My God, who on earth would do this?"
But to quote Roy Batty:
I've seen things you people wouldn't believe.[^batty]

So the next time a tool call disappears into a hidden inference loop
and you find yourself watching one AI wait for another AI to think,
you'll know what got built.
Somebody crossed the streams.
Hand your agent context, not conclusions.

## Footnotes

[^malcolm]: Jeff Goldblum as Dr. Ian Malcolm in *Jurassic Park* (1993).
    The original line indicts scientists rather than engineers,
    but the failure mode generalizes.

[^determinism]: "Predictable" is doing some work here.
    A search endpoint isn't perfectly deterministic either—indexes update,
    rankings shift—but its results are inspectable
    and traceable back to sources.
    The distinction that matters is verifiable versus generated.

[^egon]: Harold Ramis as Dr. Egon Spengler in *Ghostbusters* (1984),
    on why you never point two proton streams at each other:
    "It would be bad."

[^sampling]: Sampling is part of the
    [MCP specification](https://modelcontextprotocol.io/specification/2025-06-18/client/sampling):
    the server sends a `sampling/createMessage` request
    and the client's model produces the completion,
    with the user able to review and approve it.

[^batty]: Rutger Hauer as Roy Batty in *Blade Runner* (1982),
    from the "tears in rain" monologue.
    He was talking about attack ships on fire off the shoulder of Orion.
    I'm talking about enterprise software demos.
    The pain is comparable.
