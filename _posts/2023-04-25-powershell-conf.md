---
layout: post
title: PowerShell + DevOps Global Summit Conference 2023
date: 2023-04-24 00:00:00
description: >
  This week I am at a conference I've admired from afar but have not yet had the chance to go to, until now: the
  PowerShell + DevOps Global Summit.
tags:
 - conferences
 - powershell
 - devops
---

This week I am at a conference I've admired from afar but have not yet had the chance to go to, until now:

The [PowerShell + DevOps Global Summit](https://powershellsummit.org/).

If you've talked to me at any point, you likely know that PowerShell is a really important language and ecosystem for
me, and was a real inflection point in my career.

Back in 2014 I was at my first job doing SharePoint Server development in C# -- which, obviously, was the _hippest_,
_coolest_ type of development a young software engineer could ask to do, especially in the era where mobile apps were
exploding. :) But I digress.

I quickly learned that SharePoint Server begets SQL Server, which begets learning about Active Directory, which is
connected to Exchange Online, which is connected to Office 365 and Azure AD, and Azure subscriptions and resources can
help to run to automate all these things -- it's all connected!

And how do we manage and automate all these things without an excrutiating click-next experience?

PowerShell.

At my next role I moved into working on R&D applications and the hosting environments and CI/CD around them, and I
realized pretty quickly that in order to be successful and go beyond the rudimentary GUI approaches of the time (and in
order to _do the right thing_), I was going to need to get really good at PowerShell, and automation in general. (Mouse
clicks don't scale.)

I remember early on watching the Microsoft Virtual Academy courses from Jason Helmick and Jeffrey Snover:

* [Getting Started with PowerShell 3.0](https://learn.microsoft.com/en-us/shows/getstartedpowershell3/)
* [Advanced Tools & Scripting with PowerShell 3.0](https://learn.microsoft.com/en-us/shows/advpowershell3/)
* [Getting Started with PowerShell Desired State Configuration (DSC)](https://learn.microsoft.com/en-us/shows/getting-started-with-powershell-dsc/)
* [Advanced PowerShell Desired State Configuration (DSC) and Custom Resources](https://learn.microsoft.com/en-us/shows/advanced-powershell-dsc-and-custom-resources/)

Learning PowerShell through these courses _changed my life_ (and I got to tell that to Jason Helmick in person here).
It altered the trajectory of my career in ways that are difficult to fully appreciate. I started asking questions like:
"Why can't we automate the setup of that server? Why can't we script out the creation of those cloud resources?" And
more. These are things we take for granted today, but were game-changing at the time. Azure and AWS were much more
nascent than they are today, and everyone was trying to wrap their heads around this new earth-shattering concept
called "DevOps."

Were it not for PowerShell, I'd be a humble C# developer that is still utterly dependent on a different set of mouse
clicks in the full Visual Studio IDE, with little to no ability to perform all the surrounding things that it takes to
delivery infrastructure and software atop it. PowerShell took me beyond the IDE and into the terminal (which, let's be
frank, is where most of us are at today for software development), and got me introduced to some of the tools that
inspired PowerShell like bash, zsh and more. But most importantly, the _concepts_ that I got introduced to through
PowerShell, like Automation, Scripting, CI/CD, CLI's, and way too many more to list, are really what broadened my
horizons to new ways of thinking and new technological possibilities.

Fast forward to today: PowerShell is so much more than a Windows-only tool, it's now cross-platform! Windows, macOS, and
Linux. We actively write PowerShell that works everywhere. It's the ultimate "glue" tool for tying things together. Need
to write a webhook endpoint to trigger CI from your GitHub repo? PowerShell's got your back. Need that quick script to
fix some data in your systems? PowerShell. I could continue, but you get the idea.

Not only is it "glue," PowerShell can be a serious development language, too. As a concrete example, my team is
currently looking into developing a wrapper API for Exchange Online PowerShell in Azure Functions so we can manage
objects there with a nicer REST-based approach. With any luck, we may be able to release that as open source so the
community can leverage it as well.

It's important to take moments like these and reflect back on how far you've come. I'm getting to meet many of the folks
in industry here that I've looked up to for a number of years. It's a cool full-circle type of feeling that which is
making me feel incredible grateful for my career path -- yes, even those early years as a SharePoint developer, which
turns out, were quite critical for getting me to where I'm at now -- and the important role that PowerShell has played
in helping me get to where I am today.
