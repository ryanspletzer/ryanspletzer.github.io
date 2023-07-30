---
layout: post
title: OpenAI Enterprise Deployment Approaches
date: 2023-05-10 00:00:00
description: >
  I wanted to capture some thoughts on deployment approaches for OpenAI in a large enterprise.
tags:
 - openai
 - azure
---

I wanted to capture some thoughts on deployment approaches for OpenAI services in a large enterprise.

Or rather, I want to take a stab at it -- given the short amount of time this service has been out at the time of this
writing, I'm bound to get something slightly incorrect, but absolute preciseness is not always possible, and these
conversations seem to be popping up a lot recently... So someone has to give it a try.

## OpenAI vs. Azure OpenAI

One important up-front consideration is the distinction between the public OpenAI service and the Azure OpenAI service.

From a deployment model standpoint, it's a familiar story: there is a consumer/prosumer SaaS version of OpenAI's ChatGPT
and DALL-E and more, and these are inherently multi-tenant services. There is not _yet_ a standalone business offering
for the OpenAI SaaS service. However, OpenAI does have a private cloud provider hosted version of the service with more
controls, in the form of Azure OpenAI.

To draw an analogy, this is not unlike a number of SaaS services that offer consumer/prosumer SaaS (think SendGrid
Free/Essentials), business SaaS (think SendGrid Pro/Premier), and cloud provider marketplace versions of the product
(think SendGrid from AWS Marketplace or Azure Marketplace).

For enterprises who are getting serious about using OpenAI, they will want to take a long look at the
[Azure OpenAI](https://azure.microsoft.com/en-us/products/cognitive-services/openai-service) service, which is a private
cloud provider offering that offers a number of additional levels of control.

## Levels of Additional Control Offered by Azure OpenAI

With the ChatGPT version at chat.openai.com, your interactions with the service can be used in an anonymized way to
improve the service -- which is fine and dandy, until you realize that your particular organization's confidential and
proprietary data is likely not something you want floating around the OpenAI ether.

With Azure OpenAI your interactions are not used in this way, and you can further choose whether or not Microsoft is
allowed to view prompts and completions, and many orgs with highly confidential data will want to opt out of this to
again retain a higher level of confidentiality.

There are other examples like having control over what chat history you store, the ability to make the service
available over a private network via an Azure VNet, and more. [This post](https://msandbu.org/openai-vs-azure-openai/)
gives a pretty good breakdown, and though not comprehensive, it gives you a good idea of the various aspects of control
you gain by using the Azure OpenAI variant.

## Azure OpenAI Deployment Topologies and Approaches

If your enterprise decides that it wants to invest in Azure OpenAI as a capability for the company, a number of
follow-up considerations come into play, but one of the big ones revolves around a core premise of shared services
versus distributed discrete services, and depending on your company makeup, you will likely wind up with a mix of both.

I think it may help to make an analogy: Many enterprises have CI/CD setups, and there is a model that often emerges
where a central group of folks maintain a centralized pool of build agents, but various engineering teams are still
empowered to deploy their own build agents in a distributed fashion which they can customize to meet their needs.

There are likely other services beyond CI/CD that fall into this pattern, but the reason I try to draw this analogy is
that a shared central pool of build agents and distributed pools of build agents run by discrete teams is a similar type
of model that I foresee happening for OpenAI, and specifically Azure OpenAI.

It might be tempting to think that all the employees in your company could share one central Azure OpenAI service, but
it is my belief that history will repeat itself and we'll wind up with a mix of centralized as well as distributed
services much like the centralized and distributed CI/CD model.

The reality is, unless you're a smaller company that's planning to only offer a general ChatGPT experience to the
company that is the same for everyone, the chances are high that you're going to want to offer different flavors of
these services for different use cases, or will need to provide duplicate copies of these services to different personas
for purposes of divvying up cost centers and billing. Further, the question of whether or not these services all land in
the same or several Azure subscriptions is one of organizational topology and design and to some degree cost allocation
as well, since subscriptions are a billing boundary, but I certainly can see models for large enterprises where you wind
up with multiple Azure subscriptions owned by different teams for these services, versus pooling them all in a
relatively small static set of subscriptions.

Product teams at a company may need to offer different types of services and models to customers that are primed and
trained by different data sets, which would necessitate separate discrete backend services; also, the product teams may
collectively identify a use case like a shared customer support trained service that could be leveraged by multiple
products.

IT teams may need to offer different types of services and models catered to different parts of the business like
Marketing, Finance, HR, Sales, and more, trained on specific data sets for those functions; also, they may want to create
a shared general purpose set of services that employees at large may consume, like an overall support chat, which could
combine data sets from various disciplines within the company.

We could come up with many variations of these setups depending on the makeup of a given company, but I think this
starts to paint a picture of how these services might permeate the fabric of our companies, in ways far beyond a simple
single hosted service for all to use with only one central group running and supporting it, and likely much more in the
ways that things like VMs, containers, orchestrators, and other technology trends have come into the picture in the
past.

In much the same way in 2008 when everyone wanted corporate email on their iPhones, and in the same way that technology
trends like CI/CD become widespread and normalized, so too will everyone want and expect contextual AI assistance in
and around our tools, and the arrangement of backing services that we create will play a big part in that. I believe
that it will take a mix of shared and distributed use case-specific deployments to get there. And I also believe that
success in further fine-tuning these services' models with training data from the enterprise will require an
unprecedented and elevated level of partnership amongst all the functions within an organization.
