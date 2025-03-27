---
layout: post
title: 'Zero to Trusted: SPIFFE and SPIRE, Demystified'
date: 2025-03-25 00:00:00
description: >
  I vividly remember one of the first tasks my engineering manager handed me: figure out how to automate rotating the
  client_secret for an App Registration in Entra ID (the product formerly known as Azure AD).
tags:
 - zero-trust
 - spiffe
 - spire
---

I vividly remember one of the first tasks my engineering manager handed to me: figure out how to automate rotating the
`client_secret` for an App Registration in Entra ID (the product formerly known as Azure AD).

It sounded straightforward in theory -- "just rotate the secret" -- but I soon realized it was
"[turtles all the way down](https://en.wikipedia.org/wiki/Turtles_all_the_way_down)": each automation script or tool you
introduce to rotate a secret requires another secret to authenticate itself, and that secret, in turn, needs protection
and rotating. It quickly becomes an intractable chain of credentials managing other credentials, and the security
trade-offs pile up fast.

![A generated image of turtles all the way down, courtesy of ChatGPT](/assets/images/turtles-all-the-way-down.png)
*Turtles all the way down, courtesy of ChatGPT*

Eventually several years later, I read
[Solving the Bottom Turtle: A SPIFFE Way to Establish Trust in Your Infrastructure via Universal Identity](
  https://spiffe.io/pdf/Solving-the-bottom-turtle-SPIFFE-SPIRE-Book.pdf),
and I realized "Aha, someone finally cracked this problem," and its solution is one that has the promise to really help
achieve a [zero-trust](https://en.wikipedia.org/wiki/Zero_trust_architecture) posture inside of environments that are
hosting a collaborating set of services (typically, for one or more products, but potentially for other scenarios as
well, even CI/CD).

For those that don't know, _zero-trust_ admittedly, can be an overloaded term, and something that can mean different
things to different people, and does mean different things in different contexts (say, for end users on a device versus
a set of services talking to each other); and depending on who you ask, whether they are more network-oriented or
identity-oriented, they may view controls for zero-trust through different lenses.

With that said, zero-trust at its core is a security model that assumes no implicit trust in network boundaries, and
instead focuses on verifying every request -- by users, systems, or services. With the rise of cloud computing and
microservices, zero-trust principles (such as short-lived certificates and environment-based trust) have become
increasingly critical for reducing the blast radius of breaches and eliminating the risk of long-lived secrets.

Before jumping into the magical solutions that SPIFFE and its implementation SPIRE provide on this front, let's first
talk about the actual problems and logistics involved with a secret string that a person is entrusted with
handling and putting into service in an environment.

I need to apologize because the following descriptions are deliberately going to be painful and will describe the web
browser and clicks and clipboards involved in getting a secret from some type of web page into a place where it can be
used...

## The (Painful) Lifecycle of a Secret

### 1. Acquiring a Secret

Let's say you need a `client_secret` for your app registration in Microsoft Entra ID. You navigate to the Azure Portal,
sign in (hopefully with MFA, device compliance, and all the best practices enforced through conditional access!), and
then generate a random secret with a chosen validity period. Sure, it's not _technically_ difficult. But you've already
introduced a significant risk: you're personally handling the secret, and your clipboard or local files might become a
point of leakage.

### 2. Keeping a Secret

Next, you have to store that secret _somewhere_. If you copy and paste it, you might momentarily stash it in a text file
or keep it in your clipboard, hoping your machine is secure enough (EDR, compliance, device encryption, etc.). The
bigger your team or the more frequent the rotations, the higher the odds that someone, somewhere, will accidentally
commit it to a Git repo or leak it in logs. We rely on our best judgment, but we're all human—and secrets all too easily
slip out.

### 3. Putting a Secret into Service

Now you must inject that secret into an app or service. Do you store it in a password manager or a secrets vault? Do you
put it in your CI/CD pipeline in an encrypted variable? Or do you manually configure it into each environment? Each
approach is a trade-off -- how many copies of the secret are you comfortable with existing at once, and how often do you
rotate them to reduce risk? At large scale, all of these these philosophically different approaches can become a real
source of friction, especially when hundreds of services each need secret management.

### 4. Rotating an In-Service Secret Manually

If you need to rotate that secret after a certain period of time (or before whenever it expires), you basically repeat
the entire "acquire → store → deploy" process. Any misstep during manual rotation risks production outages or breakage
in downstream services that depend on the secret. This is the primary reason people start asking: "How can we automate
this?"

### 5. Rotating an In-Service Secret _Automatically_

Here's where the "turtles all the way down" problem really hits. Automation usually requires another identity (and thus
another credential) with the power to generate new secrets or push them into your environment. That means you end up
managing a higher-level credential to manage your lower-level credentials. In many enterprises, you might have multiple
credentials, each controlling a slice of the rotation story (for example, the secret itself, and perhaps another secret
to authenticate to the environment where you need to push it into) -- with each secret potentially living in a different
vault or secrets manager. It's complexity layered on complexity.

**Bottom line**: The second you add automation for secrets rotation, you typically introduce a chain of new secrets that
must themselves be protected and rotated. It's easy to see how this grows out of control.

## This is Madness

It's turtles all the way down...

There really isn't a great answer to this layering of secrets that own/manage other secrets, and while there are methods
to do credential-less authentication on the cloud providers, the logistics involved in extending that across clouds or
even to data centers can be quite intricate, and it forces you to "pick a horse" from one of the cloud providers --
would you standardize on Azure Arc to extend managed identities to other places like GCP, AWS and the data center?

No matter what, there will always be some type of secret to handle in our environment, but the question is two-fold: how
do you go about making access to those secrets seamless so that they can be easily rotated, but also, how can you go
about *eliminating* certain types of secrets for scenarios like service-to-service authentication?

## Introducing SPIFFE

If the endless layers of secrets-owning-other-secrets make your head spin, you're not alone. These are extremely common
challenges in modern, distributed systems at scale. Even with the best practices for encrypting, storing, and rotating
secrets, mistakes happen. Credentials can leak, get misused, or simply become unwieldy in large-scale environments.

That's where [SPIFFE](https://spiffe.io/) (Secure Production Identity Framework For Everyone) comes in.

Many organizations use secret managers (e.g., HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) to store and rotate
credentials. SPIFFE tackles a complementary problem: it removes certain secrets altogether by issuing ephemeral
certificates. In some cases, you'll still have secrets for legacy apps, but now you can centralize or reduce them over
time as more services adopt SPIFFE-based identities.

SPIFFE is an open standard for secure service identity, meant to free us from many of the pitfalls of distributing and
rotating secrets manually. The SPIFFE standard defines:

1. How to identify workloads (anything running in your environment, across cloud providers or data centers, from a
   container to a VM, or -- with some elbow grease -- even potentially
   [serverless functions](
   https://blog.spiffe.io/enabling-authenticated-communication-for-serverless-workloads-with-spire-d636bf2f7a91)).
2. How to issue and validate these identities in a cryptographically verifiable way without needing to inject long-lived
   secret strings.

The concept originated from folks at Netflix, Meta, and other high-scale tech companies who learned firsthand that
manually distributing secrets doesn't scale or remain secure in a dynamic microservices world. They took inspiration
from their various homegrown solutions to this problem and distilled it up into a standard that is generalized and open
that technologists at other companies could adopt.

Instead of trusting humans and portals to move secrets around, SPIFFE relies on:

1. **Attestation**: Checking that a workload is truly running on the environment it claims (e.g., verifying AWS instance
   metadata, Kubernetes service account tokens, or node properties).
2. **Automated Credential Issuance**: Generating a short-lived identity document (an SVID, which can be a certificate or
   a JWT) that the workload uses for mutual TLS (mTLS) or other secure communication.

### Terminology

For the uninitiated, here's a quick terminology guide:

* **PKI (Public Key Infrastructure)**: A system for creating, managing, distributing, and revoking digital certificates
  and keys.
* **mTLS (Mutual TLS)**: A variation of TLS (commonly known for HTTPS) that requires both client and server to verify
  each other's identity.
* **Attestation**: The process of verifying that a workload is what it claims to be (for example, by checking the
  cryptographic signature of a cloud provider's instance metadata).
* **SVID (SPIFFE Verifiable Identity Document)**: A short-lived certificate (or token) containing a SPIFFE ID that
  proves the identity of a workload.

### What the Heck is an SVID?

An SVID is just a short-lived X.509 certificate with a SPIFFE ID inside one if its fields -- like
`spiffe://mycompany.com/prod/serviceA` -- that can be used to establish mutual TLS (mTLS) between workloads. Once its
lifetime expires (often minutes or hours), the workload automatically fetches a fresh SVID from SPIRE.

While certificate-based SVIDs have more advantages, there are also mechanisms to issue JWT-based SVIDs for scenarios
where certificates are not a good fit. One of the notable downsides to JWT SVIDs is that they cannot be used to
establish the client side of mTLS, effectively making mTLS a non-starter. This is why JWT SVIDs are a bit of a bummer on
the zero-trust front, since mTLS is a powerful mechanism to secure client-server communications (or the "channel" as my
colleague likes to call it).

Whether it is a certificate or JWT SVID, you can think of an SVID as an automatically issued "temporary ID badge" that
expires quickly -- like wearing a visitor's badge in an office that stops working after a few hours. This means if someone
steals that badge (certificate), it's only valid briefly, preventing long-term damage. And because SPIRE automatically
renews SVIDs under the hood, engineers don't have to schedule or script rotations.

## So, What Does SPIRE Do?

[SPIRE](https://spiffe.io/docs/latest/spire-about/spire-concepts/) (the SPIFFE Runtime Environment) is an open-source
implementation of the SPIFFE standards. It handles the bootstrapping and management of workload identities according to
SPIFFE specifications. It is composed of:

* **SPIRE Server**: The "brain" that signs and issues SVIDs.
* **SPIRE Agents**: Lightweight daemons running alongside your workloads (on VMs, Kubernetes nodes, etc.) that attest
  the workloads and fetch SVIDs from the SPIRE server.

Under the hood, SPIRE can:

* Attest that a workload is what it claims to be (via node or workload attestation plugins) based on platform-specific
  signals (e.g., AWS instance metadata, Kubernetes service account tokens, etc.).
* Issue short-lived certificates (called SVIDs, or SPIFFE Verifiable Identity Documents) that the workload uses to
  authenticate itself to other workloads, without passing around a static key or password.
* Rotate certificates automatically so that secrets are ephemeral, drastically reducing the risk of stolen credentials
  being used for too long.

Attestation essentially means, "Prove you're really running where you say you're running." For example, on AWS, SPIRE
can verify a workload by checking the digitally signed metadata document from AWS that confirms your EC2 virtual machine
is indeed in a valid AWS environment. Similarly it can key off of other metadata in Kubernetes based environments to
attest identity, and as mentioned above with some additional effort it can even be done in serverless scenarios. This
check is automated and short-lived, meaning we trust the environment itself to confirm identity rather than a human
copying secrets around, and we re-attest this at desired enough frequencies to ensure that the attestations are "fresh,"
as are the issued SVIDs that follow.

The upshot of all this is that instead of injecting a user-managed secret, each workload receives a cryptographically
verifiable identity tied directly to the environment it runs in. It's effectively removing the manual secret from the
equation and replacing it with an automatic, environment-based trust anchor.

Imagine you deploy a microservice in Kubernetes. When it starts, the SPIRE Agent inside that node verifies the Pod's
identity (using something like the Kubernetes Service Account token or Pod labels). The agent says: "Yes, this is the
real `Service A` Pod in the `production` namespace," and it issues a short-lived SVID certificate with the SPIFFE ID
`spiffe://mycompany.com/prod/serviceA`. Now `Service A` can make an mTLS connection to `Service B`. `Service B` sees the
`spiffe://mycompany.com/prod/serviceA` identity in the certificate and decides whether to trust it based on policies
you've set. _No manual secrets required_.

Let's walk through that step-by-step with a concrete example:

1. **Deploy**: You push your container image to your Kubernetes cluster. (This could happen many different ways, but for
   sake of illustration, let's say it's a typical Kubernetes
   [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).)
2. **Attestation**: The SPIRE Agent on that node check a pod's Kubernetes labels, service account token, or node
   identity to confirm your service really is "Service A."*
3. **SVID Issuance**: The SPIRE Agent requests a short-lived certificate from the SPIRE Server on your service's behalf.
   This SVID in effect is your "workload identity."
4. **mTLS**: "Service A" initiates a mutually authenticated TLS connection to "Service B," presenting the SVID as proof
   of identity. "Service B" verifies the certificate is valid and from a trusted SPIFFE domain.
5. **Automatic Renewal**: If the certificate expires in an hour, SPIRE renews it seamlessly, so there's no downtime or
   manual rotation.

*Note that attestation in Kubernetes is highly flexible and can work off of multiple types of metadata and signals
around the pod to prove identity; in other words, there options available to the implementers to decide precisely how
they wish to identify the workload in Kubernetes.

Understanding this architecture without a visual can admittedly be a challenge, and while I could insert a visual here,
I think it is better to point to the official
[SPIFFE website](https://spiffe.io/docs/latest/spire-about/spire-concepts/) where they have great visuals to illustrate
this.

This process above is how the process works for _workload_ attestation, but at this point you may be asking: "How does
the SPIRE server trust the SPIRE agent in the first place?" This happens prior to workload attestation, through a
process called "node attestation," and we'll cover how this works in a couple of common scenarios, on EC2 and on
Kubernetes.

### SPIRE Agent Node Attestation on EC2

When you run a SPIRE Agent on an EC2 instance, it uses AWS-specific signals to verify that the instance is real and
belongs to your AWS account. Typically, SPIRE reads a digitally signed instance identity document from the EC2 metadata
service -- along with temporary AWS credentials or a signature unique to that instance -- to prove to the SPIRE Server
that "Yes, this Agent really is running on an authentic EC2 instance in our AWS account." Once verified, the Agent is
allowed to issue valid SVIDs to workloads on that host.

### SPIRE Agent Node Attestation on Kubernetes

In a Kubernetes environment, the SPIRE Agent checks one or more Kubernetes tokens or node properties to ensure it's
running on a trusted node within a legitimate cluster. For example, the Agent might validate the node's API server
certificate or use the Kubernetes service account token assigned to the SPIRE Agent's Pod. This cryptographic token
tells the SPIRE Server, "I'm a recognized Kubernetes node within this cluster," and once that's confirmed, the Agent can
issue SVIDs to the containers for the pods on that node.

## Anchor Trust (and Authentication) in the Environment

With SPIFFE/SPIRE, the trust anchors become part of your runtime environment -- like your Kubernetes cluster or cloud
environment's unique attestation data (for instance in the case of EC2 on AWS, leveraging the cryptographically signed
EC2 metadata document from AWS) -- and these anchors are used to generate ephemeral certificates for each workload. This
model shifts responsibility from:

* Humans carefully copying strings back and forth across portals,
* Long-lived service principals whose secrets have to be manually rotated (and worse, that expire and potentially cause
  outages),
* Complex toolchains or third-party password vaults for everything,

... to an *automatic identity issuance* that authenticates workloads based on where and how they run. Your environment,
plus SPIRE, effectively says: "Yes, this is the real `Service A` on the real cluster `us-east-1-prod`," and it hands out
a short-lived credential that `Service A` can use to prove its identity to `Service B`.

## Authorization Still Comes from You

Once you have cryptographically provable identities for your workloads, you can layer on your own policies:

* Which workloads can talk to each other?
* Which cross-environment calls are allowed?
* What exactly does "production" mean in terms of trust?

Humans still need to define the rules and specify exactly which services trust each other, but the underlying
credentials and authentication are handled automatically, so you're not messing around with manual secrets or multi-step
rotations.

## SPIFFE is Spiffy

Puns aside, the real benefit of SPIFFE is that you now have a single, standardized way to express service identity
across practically any environment -- on-premises, multi-cloud, container-based, VM-based, or otherwise. It's a great
unifier that can drastically simplify (and de-risk) a lot of the "madness" of distributing secrets.

## SPIRE is Fire 🔥

As the reference implementation, SPIRE does the heavy lifting of making SPIFFE a reality:

* It boots up agents (node agents) that run on each machine/VM/node.
* Those agents validate workloads (workload attestation).
* They issue SVIDs with short lifetimes so that every service request or mTLS handshake gets a fresh, automatically
  rotated credential.

In short, SPIRE weaves a dynamic web of trust across your environment.

## But Pragmatism Must Also Prevail

While SPIFFE and SPIRE can solve for service-to-service authentication, we can't escape the fact that we still need to
handle some types of secrets, potentially for certain types of database logins, or external APIs (perhaps for tracing)
that haven't yet adopted modern identity frameworks, or older systems that simply can't talk SPIFFE.

However, with SPIFFE in the mix, there exists the potential to push those authentication concerns more towards the edge
of the operating environment, like via potentially wrapping certain legacy API's and services with SPIFFE-aware proxies
to reduce the footprint of secrets scattered throughout the environment.

SPIFFE/SPIRE doesn't magically eradicate every type of shared secret from your environment. However, it makes a big dent
in the ongoing operational burden and risk by taking a huge chunk of service credentials off your plate.

## Push the Envelope

Despite these caveats, there is greater potential for true identity-based security, rather than purely secret-based
security. Think of all the trouble we endure just ensuring a secret is kept safe and rotated frequently. By moving to
ephemeral, environment-attested, cryptographically sound identities:

* We drastically reduce human error and accidental exposures.
* We limit the blast radius when something does get compromised.
* We make secrets rotation effectively invisible to the engineers and automated behind the scenes.

For many organizations, adopting SPIFFE/SPIRE is a step function leap forward towards zero-trust architecture in the
operating environment of large scale sets of services. It may not be a universal fix for all credential types, but it
can lessen the burden of how to manage the existing credentials that you do have, and is a powerful standard and toolset
for modern infrastructure teams looking to level up their security posture for service-to-service authentication.
