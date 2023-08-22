---
layout: post
title: Real Vendor Lock-in
date: 2023-08-21 00:00:00
description: >
  In a previous post, I discussed the topic of vendor lock-in with cloud providers, and why I thought it was
  over-emphasized. I'd like to further highlight my stance using a real-life example of actual vendor lock-in, which,
  in my opinion, is more concerning.
tags:
 - vendor-lock-in
 - build-vs-buy
---

In a previous post, I discussed the topic of
[vendor lock-in]([../2023-03-26-vendor-lock-in](https://www.spletzer.com/2023/03/vendor-lock-in/) with cloud providers,
and why I thought it was over-emphasized. I'd like to further highlight my stance using a real-life example of _actual_
vendor lock-in which, in my opinion, is more concerning.

We recently realized that a product we had in our environment was raising their prices to a point where it was
prohibitively expensive to run, and to divest from it we would need to do a good deal of software engineering.

We are doing that software engineering right now, and it's going to cost us a fraction of the price to run compared to
that product, with a very consistent and predictable cloud service pricing model.

The 'build vs. buy' thought process more often than not includes a sentiment of wanting to avoid the long-term costs and
engineering maintenance from building a solution in-house. However, there are assumptions here of consistent pricing and
good intent from vendors long-term – assumptions that aren't always valid.

Another factor is the skill set attached to a product. If your product expert(s) leave, is there a readily available
talent pool to fill the gap? Initially, it might seem easier to not hire developers or to not use your existing
development talent towards building a solution for this particular use case; but it's also important to keep in mind
that many products have a limited talent base behind them, if any.

Before purchasing a product, here's a test: Can you realistically advertise a job role specifically for that product?
For instance, "{Insert-Product-Name-Here} Engineer." If you can't, reconsider the decision. And even if you can, think
about the depth of that talent pool.

In the case of the product alluded to above, it merely added a layer on top of a cloud provider's services, and at
that, ones for which we well understood the predictable cost model. As mentioned previously, while many unnecessarily
fear price hikes from cloud providers themselves, it's the layers above that may pose more risk.
