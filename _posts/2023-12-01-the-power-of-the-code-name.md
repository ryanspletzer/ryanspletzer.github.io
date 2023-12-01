---
layout: post
title: The Power of the Code Name
date: 2023-12-01 00:00:00
description: >
  Whether for your your team, or for your product or service, a designated code name provides maximum flexibility in the
  face of what is an ever-present constant in our lives: change.
tags:
 - code-names
 - team-topologies
 - service-design
---

Whether for your your team, or for your product or service, a designated code name provides maximum flexibility in the
face of what is an ever-present constant in our lives: change.

Based on my experience, there are a couple things I can assure you that will change in your tenure at a company:

- Your team name will change.
- Your department name will change.
- Your division name will change.
- Your team may experience a reorg, either in the form of splitting, or combining, or moving, or taking on extra staff.
- Your product or service will change hands, either through transfer, or expansion of additional supporting teams.
- Your product or service will experience a rebrand -- either in-place or potentially as part of a "v2" version later
  that replaces it but uses the same codebase, or potentially via getting folded into other services in architectural
  rework.

It may be hard to fathom this forward-thinking thought process, because these things often will happen on the order of
months or years; but rest assured, they will happen.

Therefore, it follows that it makes absolutely zero sense to be naming things -- whether that's code, repositories,
or artifacts in other systems -- based off of names that will inevitably change. This is especially true of things whose
names are _hard to change_.

Do yourself a massive favor, and do two things:

- Orient systems and services and surrounding artifacts in a way that is assumed that they will change hands at some
  point.
- When you do orient those systems that way, choose _code names_ for those systems so that they will endure any sorts of
  rebranding that may occur either from the team name changing or the service name changing.

Further, when it comes to things that _must_ be named after your team or department, consider employing a code name
there to endure through potential renames of those things, again especially for things that are hard to change.

Many objects in our systems can have display names that differ from internal names, or abilities to alias a new name
over an old one to avoid issues with unattended processes that are still latching on to old names, so those are prime
places to employ a code name that doesn't change, along with a display name that can more easily change.

The hardest changes to navigate are reorgs, because in those scenarios often several things are changing at once,
including division/department/team names, amongst other things. While no approach is perfect to be able to endure
every possible combination of change out there, employing code names at a minimum will go a long way towards reducing
your toil when change inevitably does occur.
