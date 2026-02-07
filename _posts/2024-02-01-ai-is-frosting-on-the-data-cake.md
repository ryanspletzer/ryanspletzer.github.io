---
layout: post
title: AI is Frosting on the Data Cake
date: 2024-02-01 00:00:00
description: >
  Chefs have a saying: mise en place, or "putting in place." This is a great analogy and philosophy for data in an
  enterprise as well...
tags:
 - ai
 - data-engineering
---

Chefs have a saying: _mise en place_, or "putting in place," which means to organize your ingredients and tools before
cooking begins, and not just in any generic way, but in a specific way that allows for the maximization of efficiency
and movement for the individual so they can produce dishes at a desired cadence and speed.

This is a great analogy and philosophy for data in an enterprise as well, as data's proper placement and movement is key
to "baking" the right data architecture "cake" to facilitate the ever-so-craved AI/ML "frosting" that can be piped atop.

The GPT models alone and products like ChatGPT have created a lot of hype (rightfully so) for the abilities of these
very capable technologies -- but as the hype of the models themselves wanes a bit, there lies a very real challenge for
all of us: the hard data engineering work that is involved to take your company's data and make meaningful organization
and use of it, in conjunction with these models and other forms of AI.

I would venture to guess that many organizations have put off some form of rigorous data engineering, data architecture,
and data platform efforts in their ecosystems for quite some time. In the past, AI/ML was unapproachable to many, in
large part due to the mountainous effort that is wrangling your organization's data in a way that it can be consumed by
ML (not to mention the scarcity of the highly sought after skills of AI/ML practitioners that logically followed that).
The advent of various generative AI technologies has re-ignited the interest of AI to many organizations, and as a
result there has never been a better time to dust off those data initiatives and get them going to enrich your AI
efforts.

You will only be as successful as you can be with AI, to a point, unless you get your data house in order. (Or, to keep
the analogy going: unless you get your data _kitchen_ in order.)

In that vein, one key thing does need to be pointed out: if data is the ingredients for this bake, realize that not all
ingredients are "fresh." Data can not only be non-authoritative, but it also has a "best by" date that you need to be
aware of, and therefore tossing _all_ your possible data ingredients into a given bake is going to lead to some
weird-tasting results.

To that end, it's really important to think about which data is ripe for the plucking, and come up with systems to
ensure freshness and evict stale items, or at a minimum provide some heuristics or approaches to signal to downstream
data pipelines when certain items shouldn't be incorporated into the mix.

This freshness problem has interesting ramifications when it comes to training models: if you train a model on data that
becomes stale, what are the consequences of that? Will it entail retraining? Can you train over what's been previously
trained? These are important considerations to take into account.

If data is the ingredients, then data pipelines, lakes, and platforms (and more) are the tools, and following that you
should start to think about the overall data architecture at your company -- that is, the makeup of data sources, and
data lake(s) and/or platform(s); and downstream analytics, AI/ML training, and reverse ETL to other potential data
products and use cases, like for example vector search indices for knowledge retrieval applications using the
retrieval-augmented generation (RAG) pattern.

It's not possible to get into the depths and nuance of thinking about the entire data engineering space in one blog
post, so for those interested, a very interesting read for those looking to get a grasp of the data engineering
landscape is
[Fundamentals of Data Engineering](https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/).

There is no one size fits all for data architecture. Below is a non-complete set of questions you could ask about your
own organization to get a sense of what types of data architectures for different organizations make sense:

* How small or large is your company?
* How many customers do you have?
* How much budget do you have to spend on data engineering solutions?
* Do you sell physical goods or services, or purely online services?
* How long has your company been around?
* How many products do you sell?
* Is your set of technologies that make up your products largely homogenous, or more of a heterogenous mix?
* What do your company's existing skill sets look like?

All of these factors have an impact on your scale and complexity and overall technology ecosystem, and by extension your
data ecosystem, and any resulting data architectures that may result.
