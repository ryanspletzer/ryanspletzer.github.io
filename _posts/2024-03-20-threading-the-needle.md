---
layout: post
title: Threading the Needle
date: 2024-03-20 00:00:00
description: >
  Back in the early part of my career, I found myself thrust into an environment that in retrospect was entirely
  predicated upon a waterfall design methodology. We would do big design up front, in excruciating detail, often without
  understanding the implications of what was even feasible, with the usual overruns that would happen in terms of time
  and money to go along with that.

tags:
 - waterfall
 - proof-of-concepts
 - experimentation
 - agile
---

Back in the early part of my career, I found myself thrust into an environment that in retrospect was entirely
predicated upon a waterfall design methodology. We would do big design up front, in excruciating detail, often without
understanding the implications of what was even feasible, with the usual overruns that would happen in terms of time
and money to go along with that.

Of course, this way of working seems silly today, but back then in that environment, when we were still dealing with the
very real constraints of data centers, it was somewhat the reality, as the activation energy it took to get even a
development virtual machine going on limited hardware to prove out some theories was very high.

I distinctly remember going out of my way with my own approaches to setting up local VMs to prove things out. I didn’t
understand it at the time, but looking back this was my gut instinct and natural reaction to de-risk situations so that
I knew that what we had on paper would line up with reality. It also sparked my interest in infrastructure automation,
so I could do this easily on a repeatable basis.

Fast forward to today, and there are so many more options for doing experiments and proofs of concept. Between the cloud
providers and SaaS services, many of which offer various free trial options or perpetually free sandboxes, there are
numerous ways to spin up even short lived ephemeral environments to test theories and reinforce approaches.

Coming up with solid system designs is a little bit of luck and heuristics and leaning on past experiences, but to truly
“thread the needle” and wind up with resilient designs that are not only achievable but also _desirable_, and to meet
both your technological and experience goals (amongst others), I believe that experimentation and proofs of concept are
essential.

Too often I still see, even in this day and age, a desire to design on paper and “hope for the best” and leave things to
fate, to some degree. In my experience, the devil is still truly in the details, and while that first 90% of your design
on paper may go just fine, it is that last often unexpected 10% that you wind up toiling over at the worst time in a
project cycle, near the end… Interestingly, that last 10% can often be not a technical constraint, but a human one:
sure, your design meets all the requirements, but it turns out it creates a terrible UX for the end user in some
unacceptable way to stakeholders, be that an engineer or business user at your company, or even an external customer.

In order to deliver high risk systems, you need to spend time in low risk environments.

You often don’t even need to spend time implementing the whole system in those low risk environments — often just
building select parts of a system can help answer key open questions that keeps everyone comfortable in the direction of
the project.

Spending more time in experimentation and proofs of concept not only helps to de-risk your technology decisions, it can
also help to ensure that you wind up in a more strategic destination that not only meets your technology goals, but your
stakeholder experience expectations as well.
