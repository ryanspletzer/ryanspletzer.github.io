---
layout: post
title: Don't Put an LLM Behind an MCP Server
date: 2026-07-11 00:00:00
description: >
  MCP took off because it solved a real problem:
  getting context out of external systems and into your agent.
  Then people started hiding entire LLMs behind a tool call.
  It's slow, it's opaque, and it inverts the point of the protocol.
  Don't do this.
tags:
 - ai
 - agents
 - mcp
---

![Giovanni Domenico Tiepolo's 18th-century painting of the giant wooden Trojan horse
being hauled through a breach in the walls of Troy by a straining crowd,
with citizens celebrating around it beneath a cloudy sky.](
    /assets/images/Giovanni_Domenico_Tiepolo_-_The_Procession_of_the_Trojan_Horse_in_Troy_-_WGA22382.jpg)
*Giovanni Domenico Tiepolo, Public domain, via [Wikimedia Commons](
    https://commons.wikimedia.org/wiki/File:Giovanni_Domenico_Tiepolo_-_The_Procession_of_the_Trojan_Horse_in_Troy_-_WGA22382.jpg).*

Hi-diddly-ho, neighborino!
Greetings from the AI ice cream shop,
where I'm sad to say they're all out of the tokenmaxxing flavor,
and the new flavor of the day is tokenomics.[^the-ai-kind]

But tokenomics is the subject of another blog post.

Today's post is about some nerdy technical stuff,
so if that's not your jam,[^ice-cream]
feel free to bop around to another part of the internet,
but I promise you there is a gem here worth considering,
as well as several solid pop culture references, as usual.

With that, let's dig in...

***

Suffice it to say,
I've had enough of some of the shenanigans
people have gotten up to
with MCP servers lately.

I recently tried a CLI tool from a vendor
(who shall not be named, but you have definitely heard of them),
which essentially wraps an MCP server
(so you can either use this tool via CLI or via MCP directly).
I called the CLI from Claude Code,
which is a *recommended* way to use this tool.
I asked a simple question about some simple data
that lives in the vendor's system behind it all,
the kind of lookup that any reasonable API answers
in a few hundred milliseconds
(and the vendor's own native APIs are exceedingly good at answering quickly).
Instead, the CLI's request to its backing MCP server
waited on a hidden thinking loop,
and I sat there watching one model wait for another model to think,
for double-digit seconds,
long enough to ponder the entirety of the meaning of life.

The frustrating part is that I saw this coming.
Many months ago I was writing an engineering strategy,
and in it I warned our teams that putting an LLM behind an MCP server
was the wrong impulse,
because it would be hella slow.[^orchestration]
At the time I could only predict the issue on paper.
This vendor's CLI confirmed my fears in practice,
and now I point to it as a live example of what *not* to do.

Putting an LLM *behind* a Model Context Protocol (MCP) server,
then calling it from an MCP client that is itself an agent with its own LLM,
breaks the social contract of what MCP was designed to be for users of these tools:
a way for agent clients to query data and provide context to the model.
It was never meant to facilitate communication with yet another model or agent.
Protocols for exactly that have since emerged—[A2A](https://a2a-protocol.org/latest/)
and [ACP](https://agentcommunicationprotocol.dev/introduction/welcome) among them—but
nobody driving Claude Code over a CLI and an MCP server
is expecting an LLM on the other end.

Somewhere along the way, some of us in this industry lost our minds.
I sure hope we find them.

Don't do this.
Don't put an LLM behind an MCP server.

## The anti-est of patterns

The anti-pattern looks like this:
an MCP server exposes a tool,
but the tool's implementation is feeding a prompt to another model.
Your agent calls something like `get_insights(question)`,
and behind the curtain a second model—one you didn't choose,
running a system prompt you can't read,
over context you can't see—generates prose
and returns it as the tool result.
Sometimes it goes further,
and the "tool" is a whole agent with its own loop, tools, and retries.

It's matryoshka nesting-doll architecture (and not in a good way):
you open the tool and there's another model inside.

It doesn't help that people confuse MCP servers with agents.
AI hype swirls,
and in a weird way it works itself into real architecture:
a leader erroneously asks for an "MCP agent,"
a development team living under a rock vibe codes the misinterpretation,
and now they have a Frankenagent on their hands.

On a slide, this looks and sounds sophisticated.
Why settle for a dumb pipe when the server itself can think?
In practice it breaks the contract that makes MCP useful in the first place.
Ian Malcolm had the diagnosis back in 1993:
your engineers
[were so preoccupied with whether or not they could, they didn't stop to think if they should](
    https://youtu.be/_oNgyUAEv0Q?si=anwzFPky6Vzy9tdL&t=52).

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
A hidden model's summary is an opinion wearing data's clothes,
and your agent will treat it as ground truth,
because tool results land in the context window
with the authority of being a "fact."[^prompt-injection]

## Two models, compounding failure

Egon Spengler's rule applies here:
[don't cross the streams](https://youtu.be/wyKQe_i9yyo?si=IqzJpws8Az8bLIB3&t=47).
You accepted one stream of probabilistic inference
when you built your agent on an LLM.
An LLM behind a tool crosses it with a second one,
and the failure modes multiply.
When the final answer is wrong,
was it the caller misreading a good tool result,
or the hidden model making up a bad one?
You can't tell,
because you can't see the inner model's prompt,
its version, its context,
or the data it actually retrieved.
You're paying for inference twice
to get an answer you can debug zero times.

And then there's the speed.
An LLM call inside a tool call turns a subsecond lookup
into a ten-, twenty-, thirty-second (or more[^or-more]) wait,
inside your calling agent's loop,
and this could happen several times during the course of your agent
performing what you asked it to do.
The agent can't do anything with a slow tool except wait on it,
and neither can you.
Every question I put to that big-vendor CLI
cost me a coffee break's worth of "noodling"
(or whatever verb Claude Code decided to come up with),
and whatever the answer quality,
the wait was not worth it,
*especially* when I knew that going directly to the vendor's native API
would get me answers pretty much instantly.

## The 1% exception

I'll allow that a carve-out might exist.
If a tool returns large blobs of unstructured data,
a small, *genuinely fast* model that condenses them before they hit the wire
*could* earn its place—emphasis on genuinely fast,
and on serving a purpose that the client agent for some reason can't serve itself.

Even then,
I'm highly skeptical about this.
A semantic search index that returns the relevant chunks is cheaper and faster.
It's also more honest,
because the client model sees actual source material
instead of a paraphrase.
If your justification for embedding a model is "the data is messy,"
the better fix is almost always improving retrieval
rather than hiding a summarizer in the middle.

## What to do instead

Do what MCP is supposed to do:
provide the context.
You know, the *Context* in Model *Context* Protocol.
Build tools that query, search, filter, and fetch,
and return structured results or relevant chunks.
Let the calling model do the reasoning.
It's the most capable component in the whole stack,
and it's the only one holding the user's full conversation,
which your MCP server will never see.

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
This is typically the realm of elaborate systems that you've built completely yourself.
So again,
ask yourself,
outside of the scenario of owning everything end-to-end:
are the UX expectations of someone using an off-the-shelf client agent
to call your MCP server's tools
really in line with wanting any of that type of behavior?

## Context, not conclusions

MCP took off because it gives agents clean access
to context that lives elsewhere.
That is the entire job:
deliver the data, take the parameters, and let the client's model think.
An MCP server should hand your agent context, not conclusions.

The misguided approach of putting an LLM behind an MCP server
gives you the opposite on every dimension:
slower answers, less visibility,
increased cost,[^increased-cost]
and an agent reasoning over another model's opinions
instead of over your data.

I sincerely hope you're reading this as a smart person
and thinking,
"My God, who on earth would do such a thing in the first place?"
But to quote Roy Batty:
[I've seen things you people wouldn't believe](https://youtu.be/NoAzpa1x7jU?si=k4z50eEFEoz0yvDd&t=108).

So the next time you see this type of slowness in the wild
from an LLM behind an MCP server,
you'll know what happened.

Somebody [crossed the streams](https://www.youtube.com/watch?v=TEq24JyFWzo).

## Footnotes

[^the-ai-kind]: The AI kind, not the crypto kind.

[^ice-cream]: Get it?
    In ice cream?
    I'm here till Thursday!

[^orchestration]: In our case the potential idea was worse,
    as it was an impulse in the name of putting some potential agentic orchestration
    behind the MCP server,
    which would have made things even slower than doing something like a simple summarization
    of some retrieved content.
    Also, "hella slow" is the correct technical term here.

[^determinism]: I realize a search endpoint isn't perfectly deterministic either—indexes update,
    rankings shift—but its results are inspectable
    and traceable back to sources.
    The distinction that matters is "verifiable" versus "generated."

[^prompt-injection]: You've also obliquely widened the prompt-injection surface:
    the tool result is now generated text from a model you don't control,
    ingested directly as if it were data.
    You put an awful lot of trust in the upstream tool when you're doing this,
    and hopefully that trust is not misplaced.

[^or-more]: I was seeing 40 to 60 seconds
    in the case of the vendor I was alluding to in the intro!

[^sampling]: Sampling is part of the
    [MCP specification](https://modelcontextprotocol.io/specification/2025-11-25/client/sampling):
    the server sends a `sampling/createMessage` request
    and the client's model produces the completion,
    with the user able to review and approve it.
    As of the 2025-11-25 revision, sampling even supports tool use,
    so a server can run a full agentic loop through the *client's* model—with
    the user having the option to approve each step—rather than hiding its own.

[^increased-cost]: Especially in the event that you deplete credits and/or pay consumption for said MCP server
    to cover its backing model's expenses.
