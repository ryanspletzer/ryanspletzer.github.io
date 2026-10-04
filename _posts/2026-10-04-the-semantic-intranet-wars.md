---
layout: post
title: The Semantic Intranet Wars
date: 2026-10-04 00:00:00
description: >
  My first job had Go Words,
  an in-house take on AOL Keywords,
  and teams fought over who got the good ones.
  Enterprise search ended that fight,
  but agents have started a new one over who owns a concept,
  and concepts overlap far more than keywords ever did.
tags:
 - ai
 - intranet
header: /assets/images/Arcimboldo_Librarian_Stokholm.jpg
---

![Giuseppe Arcimboldo's 16th-century painting The Librarian,
a portrait of a man composed entirely of books,
with an open book splayed on top for hair, a bushy beard of dusters,
and a red-bound volume for an arm, set against a blue-gray curtain.](
    /assets/images/Arcimboldo_Librarian_Stokholm.jpg)
*Giuseppe Arcimboldo, Public domain, via [Wikimedia Commons](
    https://commons.wikimedia.org/wiki/File:Arcimboldo_Librarian_Stokholm.jpg).*

In the 90s,
the way a number of us got online was with [AOL](https://en.wikipedia.org/wiki/AOL),
and there was a gold rush on something called AOL Keywords.

You name it, it had a keyword:
Ford, MTV, Britney.
The New York Times has a fun [archived page](https://archive.nytimes.com/www.nytimes.com/info/help/aol-keywords.html)
showing all the keywords they used to have
to allow people to jump to different parts of the newspaper at the time.

With the rise of search engines like Google,
AOL Keywords gradually faded into irrelevance in the mid-to-late 2000s.

So you can imagine my astonishment
when I walked into my first full-time job post-college in 2012
and discovered that they essentially had an in-house built version of AOL keywords,
accessible from our intranet home page.[^classic-asp]

They called this setup "Go Words,"
and the interesting thing was that inside the enterprise,
these still had some use,
and they worked not only from the intranet home page,
but if you were on the corporate network
(which, since we were in the office most of the time
and if we weren't we were on the VPN to get at anything those days),
you could just type `go/<keyword>`
and it would take you directly to the thing you were interested in.

To me the DNS based approach of just typing into the address bar
was the most useful way to leverage Go Words,
since I didn't even need to hit the intranet home page to click into and enter it.

Anyone could create one of these Go Words and it was awesome,
and behaved to a degree like the company's own link shortener;
sure, cruft built up over time,
and I'm sure someone, somewhere, at some point
trotted out the old term "governance,"
but in reality the cruft never really impacted anything—if
a given go word wasn't used anymore,
or if the target link was long dead,
it wouldn't harm anything,
and if someone claimed a go word that you wanted,
you could talk to the developer of the tool and see about getting it moved,
and whoever had the better semantic claim for the word tended to win out.
So the person who wanted `go/benefits` to go to HR benefits
instead of the other person's desired page on discounts you could get
at stores that the company worked with,
and there would often be a discussion about just using a new go word like "discounts"
and socializing that instead.

Granted, these were indeed simpler times,
but I see many parallels to today—the
search box on the intranet home page
as well as every inch of that intranet home page
is agonized over pixel by pixel,
with different groups vying for the attention they feel they need
with the requisite real estate they feel they should have.

As another example of this from the past,
our intranet home page way back when had a customizable world clock
so when you loaded the intranet home it could show you multiple clocks.

Me being the smart aleck that I was at times, suggested:
"Isn't this built into Windows in the lower right corner with its clock?
And with widgets on the desktop?"
This was not met with great reception,
and indeed a year or two later with various (at the time shelved) attempts
to migrate the intranet home page to something more modern,
ideally based on SharePoint publishing,
ye ol' requirements doc still had this ludicrous thing in it:
"The solution shall be able to allow the user to configure a world clock."

Much like how Google took over the world and AOL Keywords faded,
in the enterprise various search solutions started showing up
and co-opting the traditional keyword model
(or other librarian indexed type models)
of finding information.[^i-wrote-about-this]

What this meant was,
it was time to replace our traditional search box on the intranet home page.
The way it behaved up to that point was,
if there was a go word hit, it would take you directly to that,
but if there was no hit it would take you to traditional search results
from our Google Search Appliance
(which we were replacing with the better more permission-aware SharePoint Server Search).

To say some people were outraged would be an understatement.
Many people had this box on the home page deep in their muscle memory
and they missed their enterprise version of AOL Keywords,
even though they could still do `go/<whatever>` in the address bar.
And it wasn't just the lifers at the company complaining—I
distinctly remember being at a party with other new hires
hearing someone complain behind me about how stupid it was that we were changing this.
I bit my tongue at the time.
Progress always has its detractors,
and I'm sure this person is happily using their agent today
without a care in the world for this ancient intranet tech.

Fast forward to today,
and the intranet home page is still highly sought after by many teams for its real estate,
but there's a new intranet war I see brewing around semantics,
that is, beyond owning an individual keyword,
trying to own a *concept*
so that agents in different places can find and provide your answers
around your domain's offerings
which, due to the way the English language works in an imprecise way,
all have a *very great chance* of overlapping with each other.

Ironically, the Go Words of yore were more precise than this,
in a strange way—being
a deterministic forward at least allowed for predictability in where you'd go and what you'd be shown.

## Footnotes

[^classic-asp]: And everything was written in classic ASP.

[^i-wrote-about-this]: I wrote about this a bit in a
    [prior post](/2025/05/enterprise-search-and-the-myth-of-the-silver-bullet/).
