---
layout: post
title: A New Kind of Tool Chaining
date: 2023-05-10 00:00:00
description: >
  I doubt I'm the first one to notice this, but I'm recognizing a new kind of tool chaining going on with the emergent
  OpenAI services.
tags:
 - chaining
 - openai
 - chatgpt
---

I doubt I'm the first one to notice this, but I'm recognizing a new kind of tool chaining going on with the emergent
OpenAI services.

On Unix/Linux systems, there exists a very
[fundamental concept](https://www.geeksforgeeks.org/chaining-commands-in-linux/#) that tools can be chained through
standard output:

A | B | C

The output of A can be piped to B which can further pipe its output to C.

This allows for powerful and immeasurable combinations of tools to fulfill different tasks.

Beyond the basics of using ChatGPT for the base interaction tool as it is, we've been learning a lot about the OpenAI
models and ChatGPT and how these new tools can be "chained" together with other services, like databases, search
results, and in full inception fashion, even taking people's naive prompts and asking the model make better prompts.

The implications of this are difficult to fathom, since these types of tools could be slip-streamed into so many
existing workflows today, and chained together in new and unique ways.

Go ahead and ask ChatGPT: "What are the top ways that ChatGPT and the OpenAI API service behind it can be chained with
other tools?"

Based on what I saw, it's a good start, but just scratching the surface -- as evidenced by your ability to keep asking
it for more examples in the same chat.

Part of what makes infinite combinations daunting for some folks is there are no clear ways to predict all the
potential things that could arise -- we could spend a whole entire blog post just talking about security/legal/privacy,
etc., and thus for expediency when discussing these topics, I like to distill those considerations down to a higher
level heading of "ethics."

Unlike integrating a traditional third party SaaS service into your company, where you have a fairly standard checklist
of things to go through and questions and answers to solve from all the interested parties in your company, when I ask
people about integrating these services, I know that it is quite different; because much like the infinite combinations
of Linux tools that can be put into a pipeline, I hear infinite combinations of considerations, with each person
bringing up their own unique set.

Due to this, I believe that many cultural or mindset shifts will be required at many companies in industry, because
infinite combinations could lead to infinite conversations, means that you cannot possibly account for all of them.
