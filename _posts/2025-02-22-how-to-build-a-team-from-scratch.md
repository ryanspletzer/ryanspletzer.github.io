---
layout: post
title: How to Build a Team from Scratch
date: 2025-02-22 00:00:00
description: >
  I have observed several avoidable missteps when people try to build a brand-new engineering team from scratch, and I
  believe there are a few rules of thumb that can help.

tags:
 - team-building
 - hiring
---

I have observed several avoidable missteps when people try to build a brand-new engineering team from scratch, and I
believe there are a few rules of thumb that can help. I work in the software engineering field, so I approach this
mostly from that perspective; however, this advice likely applies to other professional domains as well.

Opportunities to start a brand-new team from scratch can be rare. More often, a manager inherits an existing team
through various means like joining a new company where the team is already established, or perhaps even experiences a
reorg where folks from multiple teams are split off and merged together, or is handed a set of team members through some
other set of circumstances that are outside of their control. (As an aside: I believe as a management practice that
breaking up well-functioning, "jelled" teams should be a last resort -- unless the team's success and growth require
splitting it to accommodate another manager for ideal team sizes. More on that below.)

If you do find yourself with the golden opportunity to build a team from the ground up, this advice is for you.

This is not a post about the phases of "forming, storming, norming, and performing," nor about team camaraderie, nor
other management practices involved in forming new teams -- rather, it focuses on how a newly minted manager should
select and hire their first few team members for long-term success.

## Caveats on Constraints

I realize as I write this that this is an idealized take on this problem, and that every manager out there is dealing
with a set of constraints they have to work within, with the biggest one likely being budget. Understand that I am
sympathetic to those constraints, as I have witnessed them first-hand in hiring processes throughout the years. This
post serves as a sort of set of recommendations for engineering managers, who should consider adapting this advice their
own environment.

## Make Your First Hire a Senior Engineer

The most important point is that your first hire _should_ be a senior-level person. This is a strong statement, and frankly
an opinion of mine, but it is the number one misstep I see managers and organizations make when starting a new team. You
need someone who you can build the team around, and someone who will mentor early-career hires that come next.

Too often, managers begin by hiring entry-level engineers. This can work if the manager has a strong engineering
background and can effectively act as the team's Senior Engineer or Tech Lead, but even in that scenario, it can be more
of a burden than expected. Your first hire should help set the team's standards, establish essential processes (such as
CI/CD), and have both knowledge and opinions about infrastructure as code, the cloud, and more. It is unreasonable to
expect this from a single entry-level engineer on a brand-new team.

It is also important to note that your first hire will help set the tone and _will be responsible for interviewing and
hiring subsequent team members_. That is why the first hire on your team is so critical.

## Screen for "Learn-It-Alls" Instead of "Know-It-Alls"

As
[Satya Nadella](https://nextbigideaclub.com/magazine/conversation-microsofts-ceo-on-the-power-of-being-a-learn-it-all/17851/)
points out, it is best to seek out hires who are "learn-it-alls," instead of "know-it-alls." Avoid limiting your
searches to people who have hyper-specific skills with a single framework or tool. If someone is adept at learning, the
can pick up the tools you actually use.

The reality is that none of us uses the exact same tools and frameworks for years on end (and if you are, then I have a
Classic ASP Intranet to sell you) -- our industry changes too rapidly. With the advent of AI coding assistance, the
landscape will shift even more quickly. Look for people who are continuous learners, and ideally those who are eager to
become subject-matter experts in a problem domain.

## Manager Engineering Expertise is Ideal, but Not Required

Ideally, the manager building the team is a skilled engineer themselves (with bonus points if they once reached Senior
Engineer before moving into management). Such a manager can guide the team technically and mentor them in engineering
practices. That said, while being a former engineer is helpful, it is not a strict requirement. If you as a manager are
not a former engineer, then it is doubly important to make your first or second hire a Senior Engineer.

I have seen highly effective teams led by non-technical managers who rely on strong technical leads and extend a high
level of trust to them. The opposite scenario can also work: a team of mostly early-career engineers managed by a former
engineer who acts as the Tech Lead. That often works best for smaller teams, where a single manager/tech lead can handle
the guidance and mentorship needed.

## Aim for at Least Three Members to Form a "Team"

A group of one or two people cannot realistically function as a "team." Once you have three people working closely
together, you start to see the dynamics of a real team.

As the team grows, pay attention to the ratio of Senior vs. early-career roles. For example, in a typical team of eight
with levels like Software Engineer I, II, III, and Senior, you might aim for two people at each level (maybe with one
Senior at Staff level). If you grow to ten, add one more Senior and one more at one of the other levels.

Be careful when you bring on multiple entry-level hires at once. They will need substantial onboarding and mentorship,
and that takes time and focus from your senior team members. If you are not in a rush to scale quickly, pace your hiring
to avoid overwhelming your more experienced engineers.

The role level ratio guidance above is based on a team that is working in a typical software engineering capacity --
however, there are more "advanced problem domains" that may warrant skewing the team towards more senior roles versus
entry level roles. There are many such advanced problem domains out there, and I would expect you to know if you are
operating in one of them.

## Consider the "Two Pizza Team" Rule

I am a big believer in the "[two pizza team](https://aws.amazon.com/executive-insights/content/amazon-two-pizza-team/)"
rule: you should be able to feed your entire team with two pizzas, which generally translates to about eight people
(plus or minus two). (If you have a team of four that can wolf down two pizzas, then I am jealous of their metabolisms
and ability to not get heartburn.) Beyond this threshold, coordination costs rise significantly. If the team's size
exceeds this number, consider a team split with the addition of another manager, analogous to the way that cells grow
and divide.

If you reach that point of having enough engineers to consider a second engineering manager, congratulations: upper
leadership sees that your team's work is valuable, and wants to see more of it, and you may get the chance to become a
manager of managers. Also, around eight people is a good threshold for practical matters like on-call rotations. If the
team has fewer members, the on-call burden can be disproportionately large unless you have first-level support groups to
help; if you have gotten enough team members to require a team split, then that makes the on-call burden potentially
even more spread out amongst more people who understand your systems, which is a good thing.

## Notes on Augmenting Your Team with Contractors

Many teams with an average of eight full-time members can handle one or two contractors without a huge coordination
cost. However, if you add too many, you will need to manage higher coordination costs and onboarding overhead.

Sometimes, temporarily adding many more contract staff makes sense for time-bound, focused efforts (e.g., migrating
systems from on-premise to the cloud, or adopting a new observability platform for a backlog of existing services), or
can help as an augmentation to tackle bugs in the system and handle tackling tech debt. Just be aware that if half of
your team is made up of temporary staff, and they are responsible for mainline projects, you could risk losing critical
knowledge or having the team being overwhelmed if those contractors transition to their next opportunity. Conversely, if
you're lucky and have the right set of circumstances, your contractors could serve as an additional pipeline of
potential talent that could be transitioned to full-time roles.

I don't necessarily recommend starting a team exclusively with contractors -- but at that same time if you are in this
situation (and, again, with the right set of circumstances), your initial pool of contractors could be a potential pool
of candidates to source that elusive first Senior Engineer full-time hire.

## Wrap-Up

These rules of thumb are just that: guidelines I have postulated over the course of my career in different industries and
team sizes. I have personally been a member of teams as small as a size of one, and larger than fifteen. There is no
"one-size-fits-all" approach to building a team, but I believe that if you:

* aim to make your first hire a senior engineer,
* look for continuous learners rather than "know-it-alls" or people who are exclusively skilled in specific frameworks
  and tools, and
* pay attention to team size and role level ratios,

you will set your new team up for long-term success.

Good luck building and growing your new team!
