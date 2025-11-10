---
layout: post
title: 'Visualizing the OAuth & OpenID Connect Spec Graph'
date: 2025-11-09 00:00:00
description: >
  I created an OpenID Connect and OAuth spec graph in a Mermaid diagram in a GitHub repository.
tags:
 - openid-connect
 - oauth
 - jwt
---

I have a solid grasp of OAuth 2.0 and OpenID Connect (OIDC) from past projects,
notably from going heads-down and reading the core specs for those protocols
to implement a federated identity provider with open-source frameworks. (It was a doozy.)

But then along came the Model Context Protocol (MCP)—an emerging standard for AI agents
that leans on OAuth 2.1 and various OAuth extensions.

Suddenly I was up to my eyeballs in specs again: dynamic client registration, PKCE, you name it.
Each spec I opened would reference two more that I "should" go read.

Before long, I had a cascade of browser tabs open
and was struggling to keep track of how all these documents fit together.

If you've ever tried to implement OIDC/OAuth, you probably know the feeling—a specification sprawl
where every RFC and spec points to another,
and you're left juggling a dozen tabs in search of the full picture.

In my case, the trigger was MCP.
It adopts OAuth 2.1 for authorization, which meant revisiting the OAuth core spec (RFC 6749) and many related ones.
Reading the MCP spec led me to open the OAuth Dynamic Client Registration spec (RFC 7591),
which led me to the OAuth 2.0 Authorization Server Metadata spec (RFC 8414),
which led me back to OIDC Discovery… you get the picture.

Even experienced developers can find this overwhelming—it's easy to lose track of which specs are fundamental,
which are optional extensions, and where to even begin.

Trying to navigate the OAuth/OIDC ecosystem through official specs alone often results in "browser tab explosion."
For example, you start with the OpenID Connect Core spec,
which tells you it's built on OAuth 2.0 (so off you go to read RFC 6749).
OAuth 2.0 in turn mentions bearer tokens (RFC 6750), so open that too.
OIDC also relies on JSON Web Tokens (JWT, RFC 7519),
which themselves rely on JOSE specs like JWS, JWE, and JWK—there go three more tabs.

Pretty soon you've got 10+ spec documents open side by side,
and you're doing a lot of mental context-switching to piece together how they all relate.

This spec overload isn't just an academic problem; it hits practical questions:

- **Understanding dependencies:** Which specs build on which others?
  (e.g. does implementing feature X require reading another spec?)
- **Finding the right document:** If you need to implement Proof Key for Code Exchange (PKCE),
  do you read the OAuth 2.0 core spec, an extension RFC, or something in OIDC?
- **Not missing anything important:** Are there security best-practice specs (like OAuth 2.0 Security BCP) or
  extension drafts that you should be aware of?
- **Teaching or documentation:** How do you explain this tangle of specs to someone else
  without their eyes glazing over?

In short, the OAuth/OIDC standard family is rich but complex, and it's easy to get lost in the cross-references.
I personally hit a point where I knew there had to be a better way to see "the big picture"
than control-tabbing between RFCs.

![A dark-themed diagram titled “OpenID Connect and OAuth Specification Graph,” showing how OAuth 2.0, OpenID Connect, and JOSE/JWT specifications connect through references. Boxes for each RFC (e.g., 6749, 7519, 9068) are grouped by category and linked with lines to illustrate their relationships.](/assets/images/oidc-oauth-spec-graph.png)

## The Solution: A Visual Map of the Specs

To tackle this, I decided to map out the spec ecosystem
[visually](https://github.com/ryanspletzer/oidc-oauth-spec-graph/blob/main/graph.md).

Instead of manually drawing boxes and arrows (and inevitably forgetting some),
I leveraged AI coding assistance to help build a Mermaid diagram of the specifications
and their references to each other.

Mermaid lets you write text-based diagrams, and GitHub can render them natively.
I fed my assistant (think ChatGPT/Copilot) an initial list of the OAuth, OIDC, and JWT specs,
and asked it to help generate an initial graph definition,
then continued to add more ancillary specs from there.

The result is an "OpenID Connect and OAuth Specification Graph"
that now lives in a [GitHub repo](https://github.com/ryanspletzer/oidc-oauth-spec-graph).

This visual graph shows most of the major specifications in the OAuth/OIDC universe
and draws arrows to represent their reference relationships.
I grouped the nodes by category to make it clearer:

- **OAuth 2.0 Core & Extensions** – the base framework (RFC 6749) and its many RFC extensions
  (PKCE, token revocation, device flow, etc.).
- **JOSE/JWT specs** – the JSON Web Signature/Encryption/Key standards and JWT itself,
  which provide the cryptographic backbone for tokens.
- **OpenID Connect** – the identity layer specs (OIDC Core, Discovery, Dynamic Client Registration)
  built on top of OAuth 2.0.
- **UMA (User-Managed Access)** – an OAuth-based protocol for user-controlled resource sharing.
- **Miscellaneous/Modern** – newer drafts and best practices (OAuth 2.1, Security BCP, DPoP, etc.)
  that integrate or update the above.

Crucially, each node in the graph is clickable, linking directly to the official spec document or RFC text.

By visualizing the web of specs, this fun weekend project aims to turn that intimidating tangle into a navigable map.
For me, this has already been a huge help in regaining context quickly when diving back into OAuth land
to read up on the dynamic client registration and other specs referenced by MCP,
after having read the core OIDC and OAuth and JWT specs many years ago...

## Building the Spec Graph (with a Little AI Help)

One fun aspect of this project was using AI pair-programming to build the graph.

Hand-coding a Mermaid diagram with ~50 nodes and dozens of arrows would be tedious (and error-prone) to do solo.

Instead, I iteratively prompted a coding assistant to help generate the Mermaid markup.

Using AI in this way felt like having a knowledgeable co-author:
it could recall obscure RFC numbers and the relationships mentioned in their text,
which saved me a ton of manual cross-checking.

This was a great reminder that LLMs didn't make understanding specs obsolete—but
they did make assembling reference materials faster.
Instead of manually collating references from dozens of documents,
I could focus on validating and fine-tuning the output.

The AI assistance turned a daunting documentation task into something almost fun.

## Mapping the OAuth/OIDC Ecosystem: Key Relationships

So what does our spec graph reveal?

At a high level, it confirms the layered architecture of modern auth standards.
Here are some of the key relationships visualized:

- **OAuth 2.0 is the foundation** – Nearly every other spec extends or references
  the core OAuth 2.0 framework (RFC 6749).
  If you're dealing with tokens or authorization flows, OAuth2 is the base context.
- **JOSE is the crypto backbone** – JSON Web Signature, Encryption, Keys, etc., and JWT
  all provide the security underpinnings.
  Many higher-level specs depend on these for signing/encrypting tokens.
- **OpenID Connect builds on OAuth + JWT** – OIDC uses OAuth 2.0 for its authentication flows
  (delegating login via authorization code, etc.)
  and uses JWT as the format for ID Tokens (the bit that carries user identity).
  In other words, OIDC is an identity layer over OAuth.
- **UMA extends OAuth** – The User-Managed Access 2.0 specs build on OAuth 2.0 (and use bearer tokens)
  to enable a resource owner consent workflow that goes beyond simple scopes,
  allowing users to delegate fine-grained access to their data.
- **Newer extensions mix and match** – Recent drafts and extensions often combine pieces of the above.
  For example, JWT access tokens (OAuth RFC 9068) marry OAuth with JWT/JOSE,
  and the upcoming OAuth 2.1 consolidates core OAuth 2.0 with required security best practices.

These relationships help illustrate why certain specs exist.
Some fill gaps in the core OAuth 2.0 spec
(like additional security, token management, or special flows for devices),
while others build higher-level functionality on top of OAuth
(like federated identity in OIDC or user-mediated sharing in UMA).

With one glance at the graph, you can glean which specs are core vs. peripheral,
and how they logically group together.
This is super helpful when planning what to implement or what to study next.
Instead of treating the specs like an amorphous laundry list,
you start to see an architecture emerge: a few foundational layers, and many optional modules on top.

## Beyond Tabs: Gaining Insight and Context

Ultimately, this spec graph isn't just about avoiding browser tab overload – it's about building a mental model of the OAuth/OIDC landscape.

Instead of treating each RFC or spec as an isolated piece of the puzzle, you start to see how the whole puzzle fits together.
This has several benefits:

- **Faster learning:** If you're new to these standards, a visual map helps you decide where to begin (perhaps start with OIDC to see a full use-case, then drill down into OAuth 2.0, then JWT... rather than reading specs in a random order).
- **Implementing with confidence:** When working on a feature (say, adding device login to your app), you can consult the map to ensure you've pulled in all the relevant specs (Device Authorization Grant, PKCE, maybe OAuth Security Best Practices) and understand their dependencies.
- **Better communication:** As a developer or architect, you can use this diagram to explain the ecosystem to colleagues. It's a lot easier to justify "we need to support spec X" when you can show how X connects to the standards you already use.
- **Keeping up to date:** The OAuth/OIDC world is still evolving (OAuth 2.1, new best practices, etc.). A living graph can be updated, so you can visually track new additions or changes in the framework over time.

I open-sourced the OIDC/OAuth Spec Graph with the hope that it will be a useful reference for others, not just myself.
If you think I missed an important spec or got a relationship wrong,
I'm all ears—feel free to open an issue or PR on the [repo](https://github.com/ryanspletzer/oidc-oauth-spec-graph).

What started as a personal exercise to manage my own spec overload has turned into a shareable artifact.

I've found that understanding OAuth, OIDC, and their related specs
becomes much easier when you can see the forest rather than just the trees.

After all, the goal is to make this stuff accessible—it shouldn't require a PhD in browser tab management
to learn web authentication standards.

Sometimes the best way to untangle complexity is to visualize it.
