---
layout: post
title: Hello World
date: 2017-02-19 12:00:00
description: This has been a long time coming, but after a few years I finally have a new blog.
headerwidth: 793
headerheight: 397
share: true
comments: true
tags:
 - jekyll
 - github-pages
 - cloudflare
---

## Introduction

Welcome, my friend. If you're reading this now, it means you've found my blog,
and hopefully this is the perpetual last one I'll have. I expect designs to
change over time but this content should be around forever. Getting this stood
up has been long overdue, but it is finally here, and boy am I ready to share
some cool stuff with all of you.

But to level set: No, this site will not win any awards or blow your mind or
change your outlook on life. It's a simple developer blog. You've seen these
before. Moving along...

Let's figure out how we got here and the rationale for how I decided to make and
host this thing (so that I can remember it all years from now).

## Backstory

I first made my own personal static website back in college in the
pre-responsive web design days, back when I was looking for a my first full-time
job. It had a couple basic pages and that was it. That site got very
embarrassing after a while. I finally decided to take it down and just forward
my domain to an about.me page while I worked on getting a new blog-based site
up.

I deliberated over many options, from fully custom developed and hosted on
[Azure](https://azure.microsoft.com) (perhaps backed by something like
[Orchard CMS](http://www.orchardproject.net/)), to paid services like
[Ghost](https://ghost.org/), but finally landed with what you see before you
now.

At the time of this initial writing, this site is definitely in a 'first pass'
mode and I fully expect aspects of it, especially the design, to change over
time, but  I wanted to get started and establish a presence so I can write
content about some of the things I see day to day in the software development
and DevOps spheres.

## Jekyll

Yes, I did the typical developer thing and wen with a
[Jekyll](https://jekyllrb.com/)-generated site hosted on GitHub pages. This
required me to roll up my sleeves and get a Linux VM up at home (chose Ubuntu
so I could VNC to the nice Unity desktop for serving Jekyll in a browser), so I
could use the Ruby-based Jekyll tools through the terminal. You can get Jekyll
working on Windows but I'm a big believer in using the tools where they're meant
to be used -- Linux just works better in this case. Hopefully someday
[Bash on Ubuntu on Windows](https://msdn.microsoft.com/en-us/commandline/wsl/about)
gets fully fleshed out and I won't need a VM anymore!

(Update 6/13/2017: Jekyll works on Windows Subsystem for Linux now!
[These bash lines](https://github.com/ryanspletzer/Scripts/blob/master/Bash/WSL%20Ubuntu%2016.04>/JekyllSetup.sh) will
get you going.)

Jekyll isn't the only static site generator out there, I was also deliberating
about using a generator called [Pretzel](https://github.com/Code52/pretzel),
which is a little more friendly to Windows-native folks and has some items that
are familiar to those who write .NET. But ultimately Jekyll seemed to be the
most widely used solution in this space, and in the interest of sticking with
something that is widely known, and so I could probably find answers about in
the event I hit a snag, I decided to go with Jekyll.

## GitHub Pages

Hand in hand with Jekyll is [GitHub Pages](https://pages.github.com/). This made
a lot of sense as a choice, especially because I spend a lot of my time on
GitHub, and using Git. And not only that, the hosting is free, and you can also
set up your own custom domain name in front of it, even with SSL/TLS.

But GitHub doesn't support custom domains with SSL/TLS out-of-the-box, which
brings me to...

## CloudFlare

I was hoping to leverage [CloudFlare](https://www.cloudflare.com/) when I was
looking at the Ghost solution, but it turns out it also works in conjunction
with GitHub pages by fronting it with its own CDN. By using an SSL cert
from CloudFlare, I'm able to have an end to end hosting solution for this blog
with custom domain name and TLS, without needing to break the bank. (I would
have loved to have taken the time to figure out a Let's Encrypt certificate at
this point, but I'll save that for a rainy day.)

## Disqus

Oh and I'm using [Disqus](https://disqus.com) for comments. Because why not.

## Site Design

This site's theme is a slightly tweaked version of
[Jekyll Clean Dark](https://github.com/streetturtle/jekyll-clean-dark) by Peter Makhov. It will probably change over
time, but one of the great things about this general Jekyll toolset is the ability to get up and running
quickly, and this certainly has been a much quicker experience than when I've
worked on my own sites in the past.

## Open Source

Everything you see here is open source and available in a [public GitHub
repository named ryanspletzer.github.io](https://github.com/ryanspletzer/ryanspletzer.github.io). I maintain a fork of
the fundamental changes I've made to Jekyll Clean Dark
theme over at [this repository](https://github.com/ryanspletzer/jekyll-clean-dark) as well.
