---
layout: post
title: The Time I Accidentally Dropped a Database
date: 2026-04-04 00:00:00
description: >
  A story about accidentally dropping a shared dev database,
  asking a DBA to revoke my own permissions,
  and why the principle of least privilege matters more than ever
  in the age of AI agents.
tags:
 - ai
 - security
---

![A pastoral landscape with a farmer plowing in the foreground, a shepherd gazing upward, and ships in a harbor, while in the lower right corner a pair of legs disappears into the sea — the fall of Icarus, unnoticed by all.](/assets/images/Pieter_Bruegel_the_Elder_-_Landscape_with_the_Fall_of_Icarus_-_Brussels,_Royal_Museums_of_Fine_Arts_of_Belgium_-_Google_Arts_&_Culture.jpg)
*"Landscape with the Fall of Icarus," after Pieter Bruegel the Elder, c. 1560s.
Royal Museums of Fine Arts of Belgium.
Via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Landscape_with_the_Fall_of_Icarus_-_Brussels,_Royal_Museums_of_Fine_Arts_of_Belgium_-_Google_Arts_%26_Culture.jpg).*

Around 2014,
I was working on a web application at my old company,
a platform that let customers securely view high-resolution images
of exterior paint test panels from exposure stations at what we called "the paint farm."
The backend was ASP.NET Web API with Entity Framework and SQL Server,
and I was working on that part of the stack,
iterating on the database schema
and its OData based API.
(Sidebar: [OData](https://www.odata.org/) is awesome,
an actual standard for REST.
But I digress.)

If you've worked with Entity Framework code-first migrations,
you know the drill.
You're iterating on your data model,
running migrations,
and occasionally it's helpful to just blow away your LocalDB
and let EF recreate it from scratch.
Clean slate,
fresh seed data
(where it's usually helpful to add at least one record or more
to each table for testing),
move on with your day.

The thing about SQL Server Management Studio is that it's very easy
to be connected to more than one server at a time.
LocalDB sits right there in your Object Explorer,
and so does your shared dev instance,
the one that a large handful of other developers rely on
for testing their own applications against your API.

I can't recall every detail of exactly how it happened.
But the part that lodged itself into my amygdala—where
it remains to this day—was
the moment I realized I had just dropped the dev database.

Not *my* LocalDB.
The *shared* dev database.

## The Aftermath

I noticed immediately.
That particular flavor of dread is unmistakable,
the kind where your stomach drops faster than the database did.

I went hat in hand to our DBA,
explained what happened,
and asked for a restore.
Fortunately,
he had hourly incremental backups running,
and we were able to get the database back up quickly.
Nobody gave me a hard time about it.

Nobody except myself.

## The Corrective Action

Here's the part of the story that surprised even the DBA.

I went back to him and said:
"Can you revoke my permission to drop databases on the dev server?"

He was taken aback.
Even for a dev environment,
voluntarily asking for *fewer* permissions isn't something
people typically do.

But I thought about it,
and the answer was obvious:
I literally *never* needed to drop that database.
Not once.
Not ever.
I could still connect,
run queries,
migrate schemas,
do everything my actual work required.
The ability to drop the database was a permission I held
but had zero legitimate use for.
So why keep it?

This was very much an SRE mindset.
When an incident happens,
even a low-stakes one,
you take corrective action so it doesn't happen again.
You don't just say "I'll be more careful next time."
You change the system.

## It Happened Again (Sort Of)

Fast forward to more recent times.
My team and I had stood up an Azure OpenAI sandbox
that many folks across the organization were using day-to-day
for proofs of concept.

The Azure Portal has an undesirable UI paradigm
where the "Delete resource group" button lives dangerously in the same position
to the "Delete resource" button.
You can probably see where this is going.

I clicked the wrong one at the wrong screen.
And immediately realized what I'd done.

(You may be asking why we weren't using IaC—well,
we were, but in those early days of Azure OpenAI
things could get quite finnicky,
and sometimes we'd need to intervene manually.)

Luckily,
we were able to recreate the resource group
and restore the exact same resources inside it with some scripting
(which, there's nothing like scripting under pressure)
before it caused too much disruption.
But the outcome was the same as before:
we didn't just move on and hope it wouldn't happen again.
We introduced resource locks on the critical resources in Azure
to prevent accidental deletion going forward.

## So what does this have to do with AI?

I keep thinking about these experiences
now that we're handing AI agents the keys to real systems.

The principle of least privilege isn't new.
From when I first started working with AWS,
we've always stressed crafting IAM roles
with only the permissions a service actually needs.
But there's something worth stating plainly:
if there's a permission you don't ever want
an AI agent to use,
then simply don't grant it.

That's it.
Same lesson I learned the hard way in 2014.

What's different now is that AI can actually help you
craft those tightly scoped IAM roles with infrastructure as code.
And it's going to matter a lot more
when the services using those roles
are themselves running AI agents.

Sandboxing for AI is still being iterated on.
But the principle is the same one
I stumbled into with a dropped dev database:
don't give yourself, or your agents,
permissions you don't really need.
