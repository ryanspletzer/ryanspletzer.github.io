---
layout: post
title: MCP is a USB Port, Not a Hard Drive
date: 2025-08-03 00:00:00
description: >
  Or: why your "just grab every Slack link since 2017" request is going to hurt.
tags:
 - ai
 - mcp
---

*Or:*

*Why your "just grab every message in this Slack channel since 2017" request is going to hurt.*

---

A funny thing happens any time a new standard or protocol lands in the AI world:
people assume it magically solves everything upstream and downstream of it.
Anthropic's Model Context Protocol (MCP) is the latest occurrence of this.
I keep hearing versions of:

> "Sweet, so with Slack MCP I can just ask Claude to give me all links anyone ever posted in the #eng channel, right?"

Sure. This is like saying you "just" drink from a firehose with a paper straw.

This post is my attempt to de-hype MCP—not because it's bad (it's actually great!),
but because it's being asked to do jobs it was never designed for,
and we are collectively "hallucinating" that it can give us lots of things "for free"
without a lot of elbow grease behind-the-scenes.
Think of this as a sanity guide for folks building AI integrations,
and a reminder that protocols don't magically turn rate‑limited APIs into data lakes.
It's all about the difference between operational vs. analytical use cases...

![A minimalist graphic with the phrase “MCP is a USB port, not a hard drive” in bold black text on a light blue gradient background. Below the text are two black icons: a USB port on the left and a hard drive on the right, separated by a “not equal to” (≠) symbol, emphasizing the conceptual difference.](
  /assets/images/mcp-is-a-usb-port-not-a-hard-drive.png)

---

## What MCP Actually Is

MCP is a **protocol**:
a JSON-RPC 2.0 contract over stdio or WebSocket that lets an LLM client discover and call "tools"
exposed by separate processes ("servers").
That's it.
It's a clean, low-level "USB port" for your LLM to understand and direct your agent software process
to talk to something else—files, databases, ticketing systems, whatever.

**What MCP gives you:**

* A standard handshake to list tools, resources, and prompts
* A way to call those tools and stream back results, logs, and progress
* A boundary between the model client and the side-effectful world (permissions, isolation, auditing)

**What MCP does *not* give you:**

* Indexing, caching, or search
* Pagination or resumable jobs semantics
* Faster upstream APIs
* Infinite context windows (or cheap ones)

It's closer to `fetch()` than it is to "Snowflake + Airflow + dbt".

---

## Where the Pain Actually Lives

When someone asks for scraping "all the links since the beginning of time," MCP is just the messenger.
The real bottlenecks are:

1. **Source API limits**
   Slack, Jira, Confluence, you name it—these APIs paginate, throttle, and often cap historical access.
   MCP can't negotiate you a higher rate limit with downstream services.

2. **Network & serialization overhead**
   Every page of 200 messages gets marshaled into JSON, shipped over the wire, unmarshaled,
   and then—if you're unlucky—stuffed into the model's context. That's a lot of busywork for everyone involved.

3. **Token budgets**
   "Just dump it into the model" is how you burn through a 200k context window in one shot.
   You'll end up chunking and summarizing anyway.
   Better to design for that from the start.

4. **Lack of long-running job semantics**
   MCP doesn't define a job queue, checkpoints, or retry policies.
   If you need to crawl 8 years of chat logs, do it like a grown-up:
   in a background job with state, not an interactive REPL loop with a model.

---

## A Rubric: Good vs. Bad Fits for MCP

### Great Uses

* **Small, deterministic calls**: "Create a Jira ticket with these fields."
* **Scoped reads**: "Grab and summarize the last 50 messages from the #design channel."
* **Controlled writes**: "Rotate this credential," "Run this Terraform plan (and show me the diff)."
* **Thin indexing facades**: "Search the issue index for 'SPIR-V error' (the heavy lifting was precomputed elsewhere)."

### Terrible Uses

* **Bulk export / ETL**: "Give me every Confluence page created since 2015 and summarize."
* **Analytics scans**: "Compute the average time-to-close for 400k tickets."
* **Multi-GB artifacts**: "Send the full build logs for the last 10,000 pipelines."
* **Anything that needs orchestration**: map/reduce, long-running jobs, backoff retries, partial failure handling.

If a human engineer would script it to run overnight with a cron job and some careful retry logic,
don't expect MCP + a chat loop to brute-force it interactively.

---

## Patterns That Actually Work

When you *do* need big-ish data or repeated access, pattern your MCP servers like this:

### 1. **Precompute and Index Elsewhere**

Nightly ETL Slack → S3 → Snowflake (or a vector store).
Then expose a **search** tool over that index through MCP.
The model sees a fast query surface—not the raw firehose.

### 2. **Server-side Summaries & Pagination Links**

Have your tool return: `{ summary: "...", next_cursor: "abc123" }` instead of 10,000 raw rows.
Let the model decide if it needs page 2.

### 3. **Background Jobs + Job IDs**

Expose a `start_export` tool that kicks off a real background job (queue, cron, whatever) and returns a job ID.
Provide `get_status(job_id)` and `get_results(job_id)` tools.
MCP stays snappy; heavy lifting lives elsewhere.

### 4. **Advertise Limits Up Front**

During capability discovery, include metadata: `max_rows`, `max_bytes`, `max_duration`.
If the model knows it only gets 1,000 rows at a time, it can plan a more efficient strategy.

### 5. **Shard Large Tasks**

Instead of "export all messages", expose tools like `get_channel_links(channel_id, start_ts, end_ts, limit)`.
The model can iterate by month or by cursor token, not by "hope and pray."

---

## Snappy Lines for Slide Decks & Exec Briefings

Feel free to steal these:

* **"MCP doesn't turn rate‑limited APIs into data lakes."**
* **"It's a function-call adapter, not a data pipeline."**
* **"Your throughput is min(slowest upstream API, model token budget)."**
* **"If you wouldn't do it in a single `curl` call, don't try to do it in a single MCP call."**

---

## A Tiny Visual

```
User → LLM Client ──(MCP)──> Tool Server ──> Real System (Slack/Jira/DB)
               ^              ^
           Protocol        All the speed, limits,
                            and pain live here
```

---

## So… How Do I Pitch MCP Without the Hype?

Try this analogy:

> **"MCP is a USB port. It standardizes the plug.**
> **It doesn't make the disk spin faster, increase its capacity, or magically reorganize your files."**

Then follow with a practical recipe:

1. **Use MCP to wire the model into well-scoped actions.**
2. **Do heavy data work outside the loop.** Precompute, cache, index.
3. **Expose smart, limited endpoints that a model can compose.**
4. **Instrument and log everything.** (You'll need to debug the LLM's tool usage.)

Finish with a reality check:
"Yes, we can hook Claude up to Slack.
No, it will not be your compliance archive or analytics warehouse.
Different problems, different tools."

---

## Closing Thought

Protocols are boring on purpose. That's their value.
MCP gives us a boring, predictable way for models to poke the world.
Treat it like a stable connector—and build the real data plumbing where it belongs.
That's how you get something reliable *and* fast, without selling fantasy bandwidth to your stakeholders.
