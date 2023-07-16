---
layout: post
title: Reflections on Search in a Post-GPT World
date: 2023-07-16 00:00:00
description: >
  Lately I've been thinking about Search again, and I wanted to share some musings and past insights for anyone out
  there that may be working on these things, as well as some forward-thinking thoughts about where this may be headed in
  the new LLM / GPT world we find ourselves in.
tags:
 - search
 - data
 - gpt
 - llm
---

Lately I've been thinking about Search again, and I wanted to share some musings and past insights for anyone out there
that may be working on these things, as well as some forward-thinking thoughts about where this may be headed in our new
post-LLM / -GPT world we find ourselves in.

Some background: early on in my career I worked on the decommission of a
[Google Search Appliance](https://en.wikipedia.org/wiki/Google_Search_Appliance) with the rollout of FAST Search with
SharePoint Server 2010, and subsequently SharePoint Server 2013 Search.*

For as praised as the Google Search appliance was at the time, it lacked sorely in one area: understanding document
level permissions and security trimming.**

Enterprise Search is _hard_. I'm
[not saying anything new](https://www.realstorygroup.com/Blog/lessons-death-google-search-appliance) with this
statement, but re-iterating that it is very different from your traditional web-based search in many different ways.
It is my belief that the reason it is hard has almost nothing to do with search itself, and everything to do with
information architecture and quality of data, and convincing your stakeholders that crawling everything under
the sun is perhaps not helpful.

*[FAST Search](https://web.archive.org/web/20070630084112/http://www.fastsearch.com/) was a company that
[Microsoft acquired](https://news.microsoft.com/2008/01/08/microsoft-announces-offer-to-acquire-fast-search-transfer/)
and bolted on their search to SharePoint Server 2010, and by SharePoint Server 2013 had fully integrated its search
capabilities into the platform.

**While it was technically possible as of a certain point in time, it was
[incredibly painful](https://static.googleusercontent.com/media/www.google.com/en//support/enterprise/static/gsa/docs/deployment/en/GSASecurity.pdf)
to implement.

Maybe talk about how sharepoint truck was backed up and dropped off.

These are some of the under-appreciated and obscure corners of the IT landscape that do not get a light shone on them
that often, yet at the same time this corner produces something that is utilized by every single person in your company.

Document level permissions

Barring that, filters for id's (users groups)

Garbage in, garbage out (data and knowledge mgmt strategy)

Proper document access (more than things you shouldn't see, things that are irrelevant)

Federation requires propagation of this, too

Couple with gpt for a role access pattern is icing on the cake

More pure UX level things to account for UI-wise, but you get the idea

Research with search api

Mari kondo our data

<https://www.seattletimes.com/business/successful-sharepoint-builds-teamwork/>
