---
layout: post
title: Vendor Lock-in
date: 2023-03-26 00:00:00
description: Do you use an API of any kind? Congratulations, you have vendor lock-in.
tags:
 - Vendor Lock-in
 - Cloud-Native
 - Multi-Cloud
 - Cloud-Agnostic
---

Do you use an API of any kind? Congratulations, you have vendor lock-in.

Now that I have your attention, let's dig into what I mean...

## What is Vendor Lock-In

Companies spend an awful lot of time fretting about this concept called "vendor lock-in."

Most typically when this term comes up it's in relation to cloud providers, and specifically the fear that being
dependent on only one will result in a sticky situation if the given provider wants to raise prices on their customers.

The way companies propose to avoid vendor lock-in is by considering some form of multi-cloud and/or cloud-agnostic
strategy.

## Cloud-Native vs. Multi-Cloud vs. Cloud-Agnostic

The differences between cloud-native and multi-cloud and cloud-agnostic are non-obvious, but are thoroughly explained
[elsewhere](https://www.adesso.de/en/news/blog/cloud-native-multi-cloud-or-rather-cloud-agnostic-2.jsp), so I will leave
that as an exercise for the reader.

Many larger companies will have some form of multi-cloud, especially in the tech industry -- they'll have their
"primary" cloud provider, as well as a secondary cloud provider for one reason or another. A prime example would be a
company whose products run on AWS, but also has an Azure presence since they are a Microsoft 365 shop and need to run
certain internal enterprise workloads on Azure to more naturally facilitate integration for those use cases, or perhaps
a small GCP presence due to a recent acquisition of a company that runs their product workloads there.

It's really easy in this regard for a company to become "naturally" multi-cloud without any concentrated effort. Even
if it did make some sense to move a workload from one cloud to another, through sheer inertia and weight of data and
costs related to migration, workloads at rest tend to stay at rest. And this is OK. Many workloads don't make sense to
move -- if you've got a Microsoft 365 integration with Azure Functions and managed identities, and it's humming along
fine, why bother?

## Being Cloud-Agnostic is Very Hard

The difficulty really comes in when you talk about going from multi-cloud to cloud-agnostic.

Achieving the state of cloud-agnostic is something that I feel only recently became more of a feasible concept, with the
advent of Kubernetes and service meshes, and moreover products like OpenShift that can wrap up much of this complexity
for you.

Now, I fully understand why business leaders out there may want to become cloud-agnostic, but what's often
under-estimated is the sheer amount of effort to get there and the understanding that, even if you do all this, you've
just traded off one vendor lock-in scenario for another.

Let's address the "effort" aspect of becoming cloud-agnostic first.

In order for you to get to this cloud-agnostic state, you have to establish an abstraction layer across all the clouds
involved, which as mentioned is achievable in theory with Kubernetes/service mesh and a product like OpenShift.

However, even if you do this, you have to ask a few key questions: am I using any cloud-native services whatsoever like
API gateway services, or identity plane concepts like IAM Roles or Managed Identities, or cloud-specific databases like
Dynamo or Cosmos DB?

There are more aspects to think through than this, but in my experience, your entry points like API gateways, the way
you do authentication/authorization, and the way you do database workloads, all have to be thoroughly re-thought.

Even if you are using more database protocols like MySQL or Mongo or others, it may be backed by a cloud-native service
like Aurora or DocumentDB which did a lot of heavy lifting for you. And I literally mean heavy -- data is the heaviest
part of all of this and the aspect that gets most overlooked when these discussions come up. (There is more on the egress
costs of data later in this post.)

Add to that the fact that doing databases on Kubernetes at the time of this writing is challenging (though
[progress is being made](https://www.oreilly.com/library/view/managing-cloud-native/9781098111380/)), and you've got
quite the org-wide initiative on your hands.

Is achieving a cloud-agnostic state worth the sheer amount of effort you will have to do to get there, all for handling
a theoretical price hike issue that may never come? Oh, and by the way, you need to keep iterating on features for your
customers while you're doing all this. The world doesn't stop turning.

## Thought Experiment: Let's Pretend We're Cloud-Agnostic

Let's say for the sake of argument you have gotten onto OpenShift and achieved a cloud-agnostic state, and this
theoretical price hike comes from a cloud provider where you're running one or more workloads.

In this cloud-agnostic state, you should be able to just seamlessly "float" those workloads with all their data from one
cloud to another, right?

Well, let's hope you have a backend network set up to do that to avoid the insane amount of internet network egress
costs you're likely to incur during the floating process. Even with a private network you still may run into these
type of costs.

And then minus the application workloads that have migrated, what do you do with all the footprint of network
infrastructure that's leftover on the existing cloud provider? Would you delete it all and recreate it later if needed?
Would you be able to easily recreate that if you wanted to migrate back?

This is all assuming the theoretical price hike is coming from your cloud provider itself -- what if it's coming from
your abstraction layer, perhaps from something like OpenShift itself? In this case, you would have just traded one
vendor lock-in scenario for another.

You could certainly roll your own cross-cloud Kubernetes and service mesh deployment yourself, and depending on your
level of strictness, you may have to go with only raw virtual machines, because managed Kubernetes on the cloud
providers could be considered another layer of lock-in. But here's the deal: even with VMs, you need to now deal with
the specifics of the cloud provider at a certain platform level. The APIs for spinning up VMs on Azure are different
than that for AWS. And though tools like Terraform at a surface level seem like a way to not have to think about this,
the reality is that you'll be having to figure out the semantics in Terraform per cloud. Terraform is not "write once,
deploy anywhere" type of tool.

## What About Data Centers?

Maybe you're one of those companies that's not all-in on the cloud and is aggressive about sticking with your own data
centers. Here's a newsflash: vendor lock-in exists at that level, too. For example, are you using Dell EMC? That is a
form of vendor lock-in.

The only way to try to avoid vendor lock-in is to source the rare earth minerals from the right places in the world, and
build your own server hardware, and run it in your own data centers. But even then, let's hope you have a choice of
internet connections, else you are tying yourself to a specific ISP. Even when something like an internet connection is
an interchangeable commodity, you're still at the mercy of what is offered in a specific location.

## Vendor Lock-In is Unavoidable or: How I Learned to Stop Worrying and Start Deploying

I'm taking the prior scenario to an extreme, only to wrap it back around this point: vendor lock-in is both a real
thing, and an unavoidable thing.

If vendor lock-in is unavoidable, what are we to do?

Well, as in all things in business, partner with the right service providers that you trust, and hope that they have
your long-term success in mind. That may sound ominous, but it should give you confidence: if vendor lock-in is
unavoidable, you should fearlessly deploy to the cloud provide that makes sense for the workload, whether you have the
mythical abstraction layer in place or not.
