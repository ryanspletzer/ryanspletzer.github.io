---
layout: post
title: Tidying Your Home for Your AI Guests
date: 2026-01-15 00:00:00
description: >
  I want you to imagine the place that you live in.
tags:
 - ai
 - data
---

I want you to imagine the place that you live in.

Are your papers in a tidy pile, with the ones you want to keep cleanly filed in some kind of filing cabinet?

Are your books scattered throughout the house on disparate shelves?

Are your clothes organized with a certain strategy (by type, by season)… or is it a free-for-all?
(I'm going to guess at minimum you have a sock drawer.)

At our last place, we had the hand drill sitting in the coat closet,
with other tools scattered in different places throughout the house...
so trust me, we are not saints in this regard.

Now imagine if you invited someone into your house and asked them to categorize your belongings,
or even just figure out how to live and take care of things in your place;
maybe you're starting an Airbnb!

If the frying pan is in the upstairs bedroom closet, then people will have a hard time finding it...

This is not an advocacy post for pursuing a [Marie Kondo](https://konmari.com/) level of tidiness at your house
(although shout out to my awesome mentor
whose [books](https://www.amazon.com/Spark-Joy-Illustrated-Organizing-Changing/dp/1607749726/)
finally taught me as a full-grown human how to
[fold clothes](https://www.amazon.com/Life-Changing-Magic-Tidying-Decluttering-Organizing/dp/1607747308/) properly).

This drawn-out analogy gets us to this point:

The way you work in an enterprise is likely much like an untidy house,
and trying to bring AI into the mix to provide value atop that untidiness is going to have challenges.

![A digital illustration of a cluttered living room with piles of papers, books on crowded shelves, and tools scattered on the floor. Two friendly, futuristic AI robots stand just inside the open front door holding suitcases, looking into the disorganized space as sunlight streams in from outside, suggesting AI arriving as a guest in an untidy home.](/assets/images/robots-untidy-data-house.png)
*"[All your base are belong to us](https://en.wikipedia.org/wiki/All_your_base_are_belong_to_us)—OMG!"*

## Living With the Clutter

I've seen many scenarios over the last few years where there is a desire to implement AI to solve some type of problem,
but an unwillingness to address any of the data untidiness,
or further, the systems or ways of working that grew up around it.

A quick note on "tidy data":
there's a [definition](https://www.jstatsoft.org/article/view/v059i10)
for [tidy data](https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html)
that revolves around rows and columns,
which isn't *necessarily* what I'm referring to here
(although it is a great principle to abide by for structured data).

What I mean is how datasets and documents and artifacts are organized among systems,
and within systems,
and especially the boundaries we create around organization and access.

Maybe you have duplicative tools that different folks are using to store similar kinds of data.

Maybe you are all within the same tool,
but have organized your data along boundaries in a way that is not conducive to consumption,
either by AI, and honestly, sometimes by end users, too.

Some business requirements and processes around how data is created and used are hard and fast and unmovable.

But many are not, and could be re-oriented to be not only more friendly for AI,
but also more friendly for the people operating within these environments.

This is where things get expensive in a very predictable way...

I've encountered several concrete examples where there was a desire to set up an AI RAG approach as a "band-aid"
to accommodate the scattered nature of unstructured data across various systems (and within those systems)
when, in actuality, a "house tidying" effort would have more readily allowed
for using AI tools—some of which are off-the-shelf and readily available—to accommodate the desired outcomes.

The intention is not to dunk on RAG (retrieval augmented generation),
but it becomes telling when the primary purpose for rolling up your sleeves
and taking the time to populate a vector database is:

"We don't want to change anything about how we work... just make the AI deal with it."

In one case I saw, there was a desire to provide RAG
for data that people *didn't have access to* in the source systems...
but could allow for folks request access "on demand"
when linked to the source through an LLM answer backed by retrieved data.

The interesting thing about this scenario was: the data was *not sensitive*; access could have been easily granted,
or the data could have been reorganized so it lived in one place, with boundaries aligned to the use case.

But the ask was catered around a desire to not change the way that people were currently working.

If we took a moment to reorganize the data so people did have access to it,
not only would it have been an improved way of working that benefited everyone,
but AI—and particularly in this case, existing off-the-shelf AI capabilities—could
have accommodated the approach with far less bespoke infrastructure.

## A Bigger House Isn't a Cleaner One

One might argue at this point: is this not where a data platform comes in to save the day?

Sometimes, yes.

But the issue with that thought process is that it often just shifts the problem:
You still have to decide what to ingest,
concern yourself with security trimming from the source,
and you may still have to tidy and organize the data when things hit the platform.

Also, if the current ways of working lend themselves to new sources of data springing up all the time,
you're going to be constantly doing repeat trips to the folks responsible for ingestion...
or you may decide to ingest every new source that appears blindly and figure it out later,
which can get costly and unwieldy and unapproachable very quickly.

(That is, unless you have ascended to the most elite levels
of [Data Mesh](https://www.datamesh-architecture.com/) implementation,
at a maturity level where a business user can simply click a button to onboard a new data source to your data platform
for downstream consumption;
if this is you, you are in an enviable position in the corporate landscape,
and I'd like to have a chat with you.)

This is analogous to adding on a new room or wing to your home,
and having to decide what from the various piles should go there...

You aren't really avoiding the mess.

You're sifting through it.

## The Life-Changing Magic of Tidying Up

Can you implement AI with untidy data spread across disparate systems?

Yes, you can, but it winds up being vastly more expensive to implement.

Worse, it can lock you into a way of working that you didn't actually want to cement for the next several years.

Don't let AI become the reason you never address any of your problematic processes or data organization.

In fact, AI is the perfect opportunity to take a long, hard look at your systems and tools landscape
and decide if this is how you want your AI guests to see your house.

Also: you're going to have multiple AI house guests over time...
the ones that are here today will be totally different in the future.

The costs of not dealing with untidy data and processes now
are only going to be repeatedly borne out and compound over time
when you decide you want to switch models, tools, vendors, or strategies later.

Tidy the house.

Then, [invite the robots in](https://www.bbc.com/news/articles/clyg63e3mq4o).
