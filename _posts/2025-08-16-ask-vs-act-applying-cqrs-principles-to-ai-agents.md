---
layout: post
title: "Ask vs Act: Applying CQRS Principles to AI Agents"
date: 2025-08-16 00:00:00
description: >
  Asking an AI agent a question is a whole different ballgame from letting it take action.
tags:
 - ai
 - cqrs
---

Asking an AI agent a question is a whole different ballgame from letting it take action.

Imagine chatting with an AI assistant that not only answers your questions but can also perform tasks on your behalf.
For example, you ask, "What's our PTO policy?" and get a helpful answer—and then you say,
"Please submit my PTO request for next week," and the agent actually goes off to do it.
These two requests might seem similar (both are things you ask the AI),
but under the hood they are very different operations.
In software architecture, we have a name for recognizing and handling this difference:
**CQRS**, which stands for *Command Query Responsibility Segregation*.
CQRS essentially says we should split the world into **queries** (reads) and **commands** (writes)
and handle each with its own pathdev.to.
In this post, we'll explore how CQRS concepts apply to building AI agents—and
why retrieving information (think of Retrieval-Augmented Generation, or RAG)
versus taking actions (executing some operation)
need to be treated differently at every step.

![A conceptual diagram titled "Ask vs Act: Applying CQRS Principles to AI Agents." The diagram has two halves. On the left, a blue bubble labeled "Reading" connects downward to a smaller bubble labeled "RAG," which points to an icon representing documents and a database. On the right, an orange bubble labeled "Writing" connects downward to a smaller bubble labeled "Actions," which points to icons of a checkmark in a speech bubble and a gear. The two halves are connected side by side, visually contrasting how AI agents handle reading (retrieval) versus writing (actions).](
  /assets/images/ask-vs-act-applying-cqrs-principles-to-ai-agents.png)

## What is CQRS?

CQRS is an architectural pattern that separates the responsibility of reading data from writing data.
In traditional systems, you often have one architectural stacks or service handling both reads and writes,
which can lead to all sorts of issues—performance bottlenecks, scaling difficulties,
and conflicts between read and write workloads
dev.to
. CQRS addresses this by using different architectural stacks (or even different services and data stores)
for writes versus reads
dev.to
. In other words, the part of your system that processes commands (things that change state)
is kept separate from the part that handles queries (things that only retrieve data).
This allows each side to be optimized and scaled independently.
For example, the write side (commands) can focus on transactional integrity and business logic,
ensuring every change follows the rules and is consistent,
while the read side (queries) can be optimized for fast lookups and flexible querying,
often using techniques like caching or denormalized view models
dev.to
. The result is a more robust system: each half does one job and does it well, without stepping on the other's toes.

Why does this matter for AI?
Modern AI agents are, at their core, software systems that both answer questions and take actions.
If we draw a parallel, an AI agent answering your question ("What's the PTO policy?") is akin to a query—it's
reading from some knowledge source and returning information.
But when that agent performs an action ("Submit PTO request"),
it's like a command—it's trying to change the state of some system (your HR system in this case).
The CQRS principle tells us it's wise to handle those two types of operations separately.
Just as in a well-architected app we wouldn't use the exact same process to both fetch data and update a database,
in an AI agent we shouldn't treat information retrieval the same as we treat action execution.
We'll delve into exactly how to separate these in an AI context,
but first let's break down the two sides:
the read path (our AI agent's knowledge retrieval, often using RAG)
and the write path (the agent's action-taking via tools or APIs).

## The Read Path: Retrieval-Augmented Generation (RAG)

When an AI agent answers questions or gathers context,
it's operating on the read side of the world—no different from a user running a search or query.
A popular approach for AI agents to answer user questions is Retrieval-Augmented Generation (RAG).
RAG is essentially a two-step process:
first retrieve relevant content from your knowledge sources,
then have the AI model generate an answer using that content
spletzer.com
.
In practice, this means the agent might take your question, use it to look up documents or data
(for example, searching a vector database of internal docs, or hitting a knowledge base API),
and then compose a response based on what it found.
Crucially, this read process does not alter any system state—it's pulling information, not changing information.

Because reads are read-only, we have a lot of flexibility in where the data comes from.
An AI agent's retrieval step can tap into all sorts of sources:

Operational data sources: Sometimes the freshest or most authoritative info lives in operational systems (e.g. an airline reservation system for up-to-the-minute flight status). In fact, many real-world RAG setups use a hybrid approach that draws on structured operational data (like databases, CRMs, or transactional systems) to fetch precise facts (customer records, inventory levels, latest transactions) in addition to unstructured docs
seanfalconer.medium.com
.

Analytical or external knowledge bases: Other times the agent might query analytical data products or data warehouses – for example, to get aggregated metrics or historical trends – or use a vector search index populated with company documents for semantic search. The key is that for reads, it's fair game to pull from either operational or analytical stores. The agent could query a Snowflake dataset for last quarter's sales number and also query a vector DB for the latest policy document text. As long as the data is accessible (and not too stale to be relevant), the agent can use it.

One thing to keep in mind is that the quality of these read-side sources directly affects the agent's output. If the underlying knowledge is outdated or disorganized, the AI's answer will suffer – garbage in, garbage out. We saw this in one case where an AI confidently returned an outdated policy as an answer because an old document hadn't been marked obsolete in the knowledge index
spletzer.com
spletzer.com
. So, even though reads don't modify anything, they do require us to think about data curation and freshness (much like any search system). But from a system design perspective, reads are the "easy" part: they're fast, parallelizable, and forgiving. You can cache results, pre-compute indexes (like embeddings for vector search), and generally throw engineering tricks at making reads as efficient as possible. If a read query hits a slightly stale replica, usually no one dies – you might just get a slightly outdated answer, which can be corrected next time or with a refresh. This tolerance is one reason CQRS often allows the read model to be eventually consistent with the write model
dev.to
. The takeaway is that an AI agent's RAG-based retrieval is its query model – and we can scale and optimize that independently from any action-taking logic.

## The Write Path: Taking Actions (Commands with Consequences)

Now let's talk about the more consequential side of the house: when an AI agent takes an action that changes something in the world. This is the write path, analogous to the command side in CQRS. In an AI agent context, a "write" usually means invoking some tool or API call that performs an operation – booking a meeting, creating a support ticket, updating a database record, sending an email, you name it. Unlike a read, which might draw on multiple sources, a write typically must go to a specific operational system – the system of record that actually accepts the change. If our agent is to submit a PTO request, that needs to happen in the HR system (the authoritative operational source for PTO data), not in, say, a reporting data warehouse. Writes have to hit the source of truth so that the action is real and persistent.

Because these actions actually do things, they come with a lot more responsibility and required care:

Business Logic and Validation: Operational systems don't (and shouldn't) allow just any change willy-nilly. There are business rules and validations in place. For example, submitting a PTO request might require that the dates don't clash with a holiday, or that the user has enough PTO balance, etc. An AI agent needs to respect those rules. If you simply feed the LLM a text instruction "ensure the user has enough PTO days" and hope it does the right thing, you're taking a big risk. As industry experts have noted, relying on an LLM alone to enforce complex business policies is risky – the model might misunderstand the rule or be manipulated by a crafty prompt
moveworks.com
moveworks.com
. Therefore, the write path often involves explicit checks or calls to validation services. In a sense, the write model of our AI agent includes this deterministic guardrail logic to make sure the action is valid (just as a traditional write model in CQRS would encapsulate all the business rules for a transaction).

Confirmation and Safety: Another key difference with writes is the potential impact of getting it wrong. A bad read (e.g., mis-answering a question) might confuse or annoy a user, but a bad write could create real damage – think of an agent accidentally ordering 1000 units of something or deleting the wrong user account. 😬 For this reason, it's wise to confirm actions with a human before executing them, especially in a chat or interactive setting. Many agent frameworks build this in. For instance, Amazon's agent toolkit suggests requiring the user's explicit confirmation before an agent executes certain functions, precisely to safeguard against malicious or unintended commands
docs.aws.amazon.com
docs.aws.amazon.com
. In our PTO example, the agent should probably respond with "I can submit a PTO request for you from Sept 25 to Sept 29, 2025. Shall I go ahead and do that?" – only on a "Yes" should it actually call the PTO API. This aligns with a broader principle: no autonomous writes without user oversight (at least not until we're very confident in the agent's judgment). In non-chat scenarios, this might be implemented via a human-in-the-loop queue or approval workflow for agent-initiated actions.

Transactional Integrity: When the agent does perform the action, it needs to handle success or failure robustly. The operational system might reject the request (e.g., if the user didn't have enough PTO days, the HR API will return an error). The agent's write path has to be ready to catch errors, possibly roll back or try a different approach, and inform the user gracefully. This is analogous to how a well-designed command handler in a system ensures that either the transaction fully succeeds or it cleanly fails and reports back. In an agent, you don't want it to just silently fail or, worse, assume success when the operation actually didn't go through.

All these factors mean the write path is usually more complex and needs tighter control than the read path. In CQRS terms, the command side is optimized for correctness, consistency, and safeguards, not raw speed. We often accept a bit more latency or friction for writes (like an extra confirmation step or a validation call), because the priority is doing the right thing and maintaining system integrity. Indeed, one of the benefits of classic CQRS is that your write model can be built with all the heavy checks and balances needed, while your read model remains snappy for queries
dev.to
. We see the same in AI agents: the retrieval (reading) can be free-flowing and creative, but when it's time to execute an action, the agent should switch into a more controlled, rule-abiding mode.

## Designing AI Agent Architecture with Separate Read/Write Pipelines

Embracing CQRS in an AI agent doesn't necessarily mean you literally have two completely separate codebases,
but it does mean architecting the agent's "brain" to
have a clear split between reading from knowledge versus acting on the world.
Practically, this often translates to using different modules or components in your agent system. For example:

You might have a retriever module (or chain) that handles all RAG-related tasks: embedding the query, searching the vector database or other data sources, and returning supporting facts.

Then a separate action module (or planner/executor) that decides when and how to invoke tools or APIs to make changes, and handles the responses from those actions.

Some emerging frameworks make it easier to build this kind of separation. One example is LangGraph, an open-source library built on LangChain that lets you define agent workflows as graphs. With LangGraph, you can explicitly model the agent's decision process as nodes and edges – for instance, one branch of the graph could be a "Retrieve knowledge" step and another branch a "Perform action" step, each with its own logic. Crucially, LangGraph was designed with human-agent collaboration in mind: it enables agents to write drafts for review and await approval before acting, and makes it easy to insert human-in-the-loop checks for any action
langchain.com
langchain.com
. In other words, it provides a structured way to say "this part of the agent's workflow is a query (no approval needed), and this part is a command (pause and get approval)". Even if you don't use such a framework, the concept is clear – treat the action-taking part as a first-class concern, with its own state and control flow, separate from the Q&A part.

Another consideration is data flow between these components. Often the result of the read path will inform the write path. For example, if the user asks, "Order more laptops for the team," the agent might first do a read step: query an inventory or procurement knowledge base to see what the current stock and policy is. Based on that, it forms a plan and then triggers the write step: calling the procurement system's API to place the order. By separating these concerns, you can even choose to run them on different infrastructure – the retrieval might run on a vector search service or analytical database, whereas the action might run via a secure connector to the operational system. In a way, this mirrors the idea of having separate read and write databases in advanced CQRS implementations
learn.microsoft.com
learn.microsoft.com
 (for instance, a denormalized read store vs. a normalized transactional write store). In AI agents, you might have a vector DB + cache for reads and a set of authenticated API clients for writes.

## Key Differences Between Reading and Writing (RAG vs Actions) in Agents

To summarize the lessons of applying CQRS to AI agents, let's highlight the key differences and best practices when handling "reads" versus "writes" in an agent:

Data Sources and Freshness: Reads (RAG) can draw from a wide array of sources – from real-time operational databases to analytical warehouses or indexed documents – to gather context. Writes (actions) must target the authoritative operational system for the task at hand. If an agent needs to record or change data, it has to go through the system-of-record (be it an HR system, CRM, etc.), not a read-only cache or replica. This ensures the action is reflected in the source of truth. (In short: read from anywhere that makes sense, but write only to where it truly counts.)

Performance vs. Integrity: Reads are optimized for performance – low latency, high throughput, and often eventual consistency is acceptable. You might use denormalized data or stale indices to answer quickly. Writes prioritize integrity and correctness over raw speed. It's better for a write action to be a bit slower or go through checks than to be fast and wrong. The write path should include all necessary validation and follow the business process exactly (e.g., a "Book hotel room" command goes through all the steps a proper booking requires)
learn.microsoft.com
learn.microsoft.com
.

Business Logic Enforcement: Reads typically involve minimal business logic – mostly filtering or formatting data – since they don't change anything. Writes carry the full weight of business rules. The agent's action module needs to enforce policies and rules either by invoking back-end validations or through explicit logic. As noted, don't trust the LLM to enforce all rules implicitly. Instead, encode critical rules in code or use external validators to ensure compliance (for example, require certain fields or approvals for specific actions)
moveworks.com
moveworks.com
. Some companies are even developing "policy engines" for AI agents to reliably translate high-level rules ("User must have VP approval to spend over $10k") into checks before an action executes.

Error Handling and Feedback: On the read side, if something goes wrong (say a data source is unreachable), the agent can often fail gracefully – maybe answer "I don't have that info right now," or just produce an answer with what it has. On the write side, failures need careful handling. The agent should catch errors from the tool/API (e.g., insufficient permissions, validation failed, network timeout) and decide on next steps: maybe ask the user for a different input, try an alternate method, or at least report the failure. In essence, write operations in an agent should be treated like transactions – with commit/rollback semantics or compensating actions if possible (this is analogous to how a robust CQRS command side might use techniques like sagas to handle failures).

User Confirmation and Trust: Reads can usually be executed automatically without user intervention – you don't need to ask permission to look something up (aside from access control concerns). Writes should earn trust. It's a good practice to involve the user when an agent is about to do something non-trivial or irreversible. As we discussed, a simple confirmation step ("Are you sure?") goes a long way. In more complex workflows, a human reviewer might need to approve a batch of actions the agent wants to perform. The goal is to keep a human in the loop for oversight, until we're as confident in the AI as we are in an autopilot flying a plane 😉. Even advanced frameworks encourage this – for example, LangGraph allows inserting moderation or approval nodes so that certain agent actions pause and wait for a human to OK them
langchain.com
langchain.com
. This not only prevents mistakes or mischief but also improves user confidence that the AI isn't running wild.

By acknowledging these differences, we essentially set up our AI agent with two mental models: one for retrieving knowledge and one for executing decisions. This duality is exactly what CQRS preaches, applied to the realm of AI-driven systems.

## Conclusion: Embracing the Separation of Reads and Writes in AI Agents

The main takeaway here is simple but profound: asking and acting are fundamentally distinct operations, and we should design AI agents with that distinction front and center. Borrowing the CQRS mindset helps because it reminds us to use the right tools and safeguards for each job. An AI agent leveraging RAG is fantastic at pulling in information (sometimes from all corners of your enterprise data), but that same agent needs a very different approach when it comes time to do something with that information. In practice, this means building agents that have clear "query modes" and "command modes," with appropriate pipelines for each. Reads can be liberal – grab whatever data might help, combine it, summarize it – while writes must be conservative – follow the rules, double-check, get approval, log everything.

As AI agents become more powerful and autonomous, this separation will only grow in importance. We've all seen the hype around agents that can plan and execute tasks; it's exciting, but without a grounded architecture it can also be a recipe for chaos. By treating reads and writes differently (like different species in the AI ecosystem), we ensure that our agents can be both useful and trustworthy. They'll give great answers and perform reliable actions, without confusing the two. In essence, we're teaching our AI agents a lesson that seasoned software architects have known for years: there's a time to observe, and a time to act – and handling each properly makes all the difference. Adopting a CQRS-like approach for AI won't stifle their abilities; on the contrary, it will let us scale up their knowledge powers and automation powers side by side, safely and effectively
merge.dev
. So the next time you design an AI agent, remember to ask yourself: Which parts of this are queries, and which are commands? By designing with that question answered, you'll be well on your way to an agent that can both speak intelligently and act responsibly – a winning combination in the era of AI.
