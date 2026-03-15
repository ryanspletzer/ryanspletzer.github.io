---
layout: post
title: "Curating My Own Algorithm"
date: 2026-03-21 00:00:00
description: >
  A follow-up to my previous post on information diets.
  This time I get specific about the tools, feeds, and habits
  that make up my personal approach to cutting through the noise and the slop.
tags:
 - information-diet
 - rss
---

![An impressionist oil painting of a woman in a black hat and dark dress reading a newspaper in a sunlit garden.](/assets/images/Édouard_Manet_-_Woman_Reading_-_1933.435_-_Art_Institute_of_Chicago.jpg)
*"Woman Reading" — Édouard Manet, public domain, via Wikimedia Commons.*

In a previous post,
[Your Information Diet in the Age of AI](/2025/07/your-information-diet-in-the-age-of-ai/),
I talked broadly about why it matters to be intentional with what you read, watch, and listen to.
This time I want to get specific.
Here is what my information diet actually looks like in practice,
and how I use it to cut through the noise and the slop.

## Leaving (Most) Social Media Behind

I spent many years on Twitter.
(To give you a sense of how long that was,
I was there in the very early days
when the way you tweeted was by sending an SMS text with your tweet to the phone number 40404.)
When I finally left,
I realized something:
I had given all my time, attention, energy, and thoughts to that platform
when I could have been making and owning my own content—like writing blog posts.

That stuck with me.
Today I only have a handful of social media accounts:
[LinkedIn](https://www.linkedin.com/in/ryanspletzer/),
[Bluesky](https://bsky.app/),
and [Mastodon](https://hachyderm.io/).
I only post to them when I share something I've written here.
For the little social media I do have,
I don't have any of those apps on my phone.
That one change alone has done more for my mental health and focus than I expected,
and I find myself with more time and energy for programming and writing
and the finer things in life.

## The Problem with Algorithms

Algorithms in social media are a mixed bag.
Some are so good at figuring out what you want that they become addicting.
TikTok's algorithm, for example, is eerily good at this.
It has a level of randomness that takes you into interesting adjacent content
you never would have sought out yourself.
I don't use it anymore for exactly that reason:
it's *too* good at keeping you glued to the screen.

Then there are algorithms that are just bad.
YouTube's recommendation engine, which I otherwise love as a platform,
has a tunnel vision problem.
Watch one cat video and it assumes the next ten things you want to see are more cat videos.
It lacks the serendipity that makes discovery interesting.
LinkedIn's feed is similar—you
still see good things from people you respect,
but let's be honest: those good things are floating around in a sea of slop.

Bluesky and Mastodon don't feel nearly as algorithm-driven,
which is refreshing.

## RSS: My Personal Feed

My solution to a lot of this is [RSS](https://en.wikipedia.org/wiki/RSS),
a simple open protocol that's been around since the late '90s.
It lets websites publish a feed of their content,
and you subscribe to whichever feeds you want in a reader app.
No account required, no algorithm deciding what you see,
no company in the middle.
RSS and its sibling protocol [Atom](https://en.wikipedia.org/wiki/Atom_(web_standard))
are also what power podcasts under the hood—every
podcast app is really just a specialized feed reader
that fetches audio and video files instead of articles.

Now on to my modern RSS feed setup:
I heard about [Feedbin](https://feedbin.com/) and
[NetNewsWire](https://netnewswire.com/) from
[Leo Laporte](https://twit.tv/) on the TWiT network,
and the setup has been great.

Feedbin is a hosted RSS service with a small subscription fee,
but what you get for it is worth it:
it syncs your read/unread state across any RSS client you connect to it.
That keeps you portable.
You can use NetNewsWire on your Mac,
Flipboard on an iPad,
or try out a completely different reader—your
state follows you everywhere.
If you remember Google Reader, this kind of setup gets you back to a similar experience.
(We all miss Google Reader.)

I currently subscribe to about 76 feeds (and counting) organized into two categories:
**news** and **tech**.
I strive to keep it simple.

My news category is deliberately lean—just a handful of sources.
I started with more, but when you add major news outlets into a
drama-free RSS reader,
you suddenly realize from the headlines alone how much of the content
is either garbage or just there to sensationalize and stoke fear.
The clean, linear presentation of RSS strips away
the layout and design that masks the fear-mongering.
It becomes a litmus test for quality.
I won't name names on the ones I cut,
but I will give a shout-out to the
[BBC](https://www.bbc.com/news)—they
consistently get it right.

My tech category is where the bulk of my feeds live.
It's a mix of individual blogs from people I respect,
tech publications, product and leadership voices,
AI-focused sources, and web development resources.
I won't list them all here—the
whole point is that you should curate your own.
Everyone is at a different point in their journey,
and what I find useful might not be what you need.

I will say that I recently made a deliberate decision
to add more product management thought leaders into my mix of feeds.
That's one of the nice things about this approach—you
can intentionally expand into new areas rather than waiting for an algorithm
to maybe surface something relevant.

## LinkedIn as Discovery, RSS as Delivery

One pattern I've settled into:
I appreciate when people post on LinkedIn,
but on LinkedIn you may miss things,
and what you see might only be snippets rather than the full picture.
So when I find someone who consistently writes good stuff,
I go find their actual website and subscribe via RSS.
LinkedIn is how I find people;
RSS is how I actually read them.

A handy thing worth mentioning:
you can subscribe to people on [Medium](https://medium.com/) and
[Substack](https://substack.com/) via RSS too.
You don't have to use their apps or get their emails.
Just grab the RSS feed URL by appending `/feed` and add it to your reader.
Several of the feeds I follow are Medium or Substack authors
consumed entirely through Feedbin.
(Now unlike the good ol' days,
you may not be able to read the full length of every article in the reader app,
but that isn't really the end of the world—the
point is to have a feed of high quality content,
and if you have to pop out to the browser to read something,
that is fine;
people need to eat and they often need the clicks.)

## What It Feels Like

What I'm really doing with all of this is curating my own algorithm.
Admittedly, maybe calling it an "algorithm" is a stretch,
because it's very simple and linear,
and it's only filled with things I consider to be high quality.

My routine is a morning and evening scan.
I can scroll through headlines and be in and out in a couple of minutes.
If there's a great post from someone I respect, I take the time to read it.
But by and large,
the whole experience takes far less time than social media
and is far less triggering.

Compare that to reaching for a social media app—you
open it for "just a minute" and get sucked into a vortex.
With RSS there's no infinite scroll designed to trap you,
no outrage-bait wedged between the posts you actually care about.
You read what's there and you're done.

It's healthier.
I feel less anxiety, less fear from sensationalized headlines,
and I have more bandwidth for the things that matter to me—writing,
building things, and thinking clearly.

## How You Can Do This Too

If any of this resonates, here's the practical version:

1. **Pick a sync service and a reader.**
   I use [Feedbin](https://feedbin.com/) with
   [NetNewsWire](https://netnewswire.com/),
   but there are plenty of options.
   The key is a service that syncs state across devices
   so you're not tied to one app.
2. **Start subscribing.**
   Think about the people whose writing you value—bloggers,
   newsletter authors, journalists.
   Find their RSS feeds.
   Most blogs have one;
   Medium and Substack do, too.
3. **Organize into categories** that make sense to you.
   Mine are simple: news and tech.
   Yours might be different.
4. **Prune ruthlessly.**
   Add sources liberally at first, then cut anything
   that consistently disappoints.
   Headlines in a clean reader will tell you a lot
   about a source's real quality.
5. **Remove social apps from your phone.**
   This was a big one for me.
   You can still use those platforms on a computer when you choose to,
   but removing the temptation to reach for them
   in idle moments makes a real difference.
6. **Give it time.**
   The payoff isn't instant,
   but after a few weeks you'll notice you feel better informed
   with less effort and less anxiety.
   Especially after removing social media apps from the phone,
   you'll find your thumb instinctively reaching
   for where those apps used to be in your phone's app grid—I
   found out that this unconscious reflex subsides after a few days to a week.

That's my information diet.
No algorithms, no doomscrolling.
Just a feed I built myself, filled with things worth reading.

And reading is good.
Just ask [LeVar Burton](https://www.youtube.com/watch?v=OAIW5se_cxg).
