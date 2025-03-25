---
layout: post
title: 'Zero to Trusted: SPIFFE and SPIRE, Demystified'
date: 2025-03-24 00:00:00
description: >
  I very vividly remember one of the first tasks that my engineering manager gave me: figure out how to automate the
  rotation of client_secrets for app registrations with Entra ID (the product formerly known as Azure AD).
tags:
 - zero-trust
 - spiffe
 - spire
---

I very vividly remember one of the first tasks that my engineering manager gave me: figure out how to automate the
rotation of client_secrets for app registrations with Entra ID (the product formerly known as Azure AD).

Little did I know this was a "turtles all the way down" situation, and while it wasn't *technically* an insolvable
problem, it was most definitely an _intractable_ problem, and one which involves many other security compromises to
achieve.

Eventually several years later, I read
[Solving the Bottom Turtle: A SPIFFE Way to Establish Trust in Your Infrastructure via Universal Identity](https://spiffe.io/pdf/Solving-the-bottom-turtle-SPIFFE-SPIRE-Book.pdf),
and I realized "Aha, someone finally cracked this."

But before jumping into the magical solutions that SPIFFE and its implementation SPIRE provide, let's first talk about
the actual problems involved with the logistics that are involved with a secret string that a person is entrusted with
handling and putting into service in an environment.

I need to apologize because the following descriptions are deliberately going to be painful and will describe the web
browser and clicks and clipboards involved in getting a secret from some type of web page into a place where it can be
used...

## The Problem of Acquiring a Secret

For a given owner of an app registration to acquire a secret through the Azure Portal, it involves navigating to the
Azure Portal, signing in as the user with Entra ID, and passing your organizational's conditional access policies during
the course of the sign-in.

(And, your organization is _definitely_ checking for at least MFA, and at hopefully managed device compliance, and
ideally seeing if the user is signing in with a phishing-resistant credential, _right_?)

Once signed in, the person needs to navigate to the app registration that they own, then click a button to generate a
randomized secret (with a validity period that they specify of their own accord).

## The Problem of Keeping a Secret

Next the person has to physically copy this secret to their clipboard and take it to its next destination.

One hopes that they, again, are doing this on a compliant device with EDR and the whole nine yards, and that they are
not putting this secret into an intermediate file locally, or other more egregious places (like accidentally committing
it in a codebase in Git).

Manually handling secrets is one of the more sensitive things that we as engineers have to do, and while we try our best
to do this in sensible way, mistakes do happen. Not only is it annoying to manually fetch secrets, but every manual step
introduces a new opportunity for leakage or human error.

## The Problem of Putting a Secret into Service

When it comes to how to put a secret into service, this is where "philosophies" around secrets handling start to
diverge...

Do you put it into a password manager to pull from later? Do you put it into a secret store and promote it through
CI/CD? Or do you put it _directly_ into a given environment to minimize the places where the secret is stored?

All of these philosophies diverge based on experiences folks have had at various sizes of organizations, but one thing
is for certain: the larger the scale in terms of number of services, products, users, and more, the harder any of these
philosophies become.

## The Problem of Rotating an In-Service Secret Manually

Rotating an in-service secret is, essentially, a repeat of all the "problems" / steps outlined above, which is not only
toilsome, but also has risk in the form of potential production outages if a step is not followed properly.

And that is why people then raise the question of how to rotate secrets automatically, because clicks don't scale... If
your environment has grown from 10 microservices to 100, you can quickly drown in the overhead.

## The Problem of Rotating an In-Service Secret Automatically

This brings us back to the original premise mentioned above: how to auto-rotate all these credentials without having to
go through the manual steps above.

Essentially, for anyone who has studied this problem, they immediately recognize the issue, and it is one that applies
to more scenarios than just Entra ID: in order to automatically rotate a given secret for a given principal, you need to
create another principal that "owns" the original principal (in other words, has rights to create a new secret for the
original principal).

And further, you may even need to grant an automation *another* credential in order to have access into an environment
(like an AWS account or Azure subscription) to push said secret.

Then the question becomes: how do you protect the new secret(s) that you've introduced to managed the other secrets?

## This is Madness

It's turtles all the way down...

There really isn't a great answer to this layering of secrets that own/manage other secrets, and while there are methods
to do credential-less authentication on the cloud providers, the logistics involved in extending that across clouds or
even to data centers can be quite intricate, and it forces you to "pick a horse" from one of the cloud providers --
would you standardize on Azure Arc to extend managed identities to other places like GCP, AWS and the data center?

No matter what, there will always be some type of secret to handle in our environment, but the question is two-fold: how
do you go about making access to those secrets seamless so that they can be easily rotated, but also, how can you go
about *eliminating* certain types of secrets for scenarios like service-to-service authentication?

## Enter SPIFFE

If the endless layers of secrets-owning-other-secrets make your head spin, you're not alone. These are extremely common
challenges in modern, distributed systems at scale. Even with the best practices for encrypting, storing, and rotating
secrets, mistakes happen. Credentials can leak, get misused, or simply become unwieldy in large-scale environments.

That's where [SPIFFE](https://spiffe.io/) (Secure Production Identity Framework For Everyone) comes in. SPIFFE is an
open standard for secure service identity, meant to free us from many of the pitfalls of distributing and rotating
secrets manually. The standard was born out of many years of experience of folks solving these types of problems at very
high scale at companies like Netflix and Meta, who themselves went through their own journeys with managing secrets at
scale as well attempting other methodologies with Kerberos and homegrown PKI techniques. The SPIFFE standard defines:

1. How to identify workloads (anything running in your environment, from a container to a VM, or yes, with some elbow
   grease, even potentially
   [serverless functions](https://blog.spiffe.io/enabling-authenticated-communication-for-serverless-workloads-with-spire-d636bf2f7a91)).
2. How to issue and validate these identities in a cryptographically verifiable way without needing to inject long-lived
   secret strings.

## So, What Does SPIRE Do?

[SPIRE](https://spiffe.io/docs/latest/spire-about/spire-concepts/) (the SPIFFE Runtime Environment) is an open-source
implementation of the SPIFFE standards. It handles the bootstrapping and management of workload identities according to
SPIFFE specifications. Under the hood, SPIRE can:

* Attest that a workload is what it claims to be (via node or workload attestation plugins) based on platform-specific
  signals (e.g., AWS instance metadata, Kubernetes service account tokens, etc.).
* Issue short-lived certificates (called SVIDs, or SPIFFE Verifiable Identity Documents) that the workload uses to
  authenticate itself to other workloads, without passing around a static key or password.
* Rotate certificates automatically so that secrets are ephemeral, drastically reducing the risk of stolen credentials
  being used for too long.

The upshot is that instead of injecting a user-managed secret, each workload receives a cryptographically verifiable
identity tied directly to the environment it runs in. It's effectively removing the manual secret from the equation and
replacing it with an automatic, environment-based trust anchor.

An SVID is just a short-lived X.509 certificate with a SPIFFE ID inside one if its fields -- like
`spiffe://mycompany.com/prod/serviceA` -- that can be used to establish mutual TLS (mTLS) between workloads. Once its
lifetime expires (often minutes or hours), the workload automatically fetches a fresh SVID from SPIRE.

While certificate-based SVID's have more advantages, there are also mechanisms to issue JWT-based SVIDs for scenarios
where certificates are not a good fit. One of the notable downsides to JWT SVIDs is that they cannot be used to
establish the client side of mTLS, effectively making mTLS a non-starter.

Imagine you deploy a microservice in Kubernetes. When it starts, the SPIRE Agent inside that node verifies the Pod's
identity (using something like the Kubernetes Service Account token or Pod labels). The agent says: "Yes, this is the
real `Service A` Pod in the `production` namespace," and it issues a short-lived SVID certificate with the SPIFFE ID
`spiffe://mycompany.com/prod/serviceA`. Now `Service A` can make an mTLS connection to `Service B`. `Service B` sees the
`spiffe://mycompany.com/prod/serviceA` identity in the certificate and decides whether to trust it based on policies
you've set. _No manual secrets required_.

## Anchor Trust (and Authentication) in the Environment

With SPIFFE/SPIRE, the trust anchors become part of your runtime environment -- like your Kubernetes cluster or cloud
environment's unique attestation data (like in the case of AWS, leveraging the cryptographically signed EC2 metadata
document from AWS) -- and these anchors are used to generate ephemeral certificates for each workload. This model shifts
responsibility from:

* Humans carefully copying strings back and forth across portals.
* Long-lived service principals whose secrets have to be manually rotated (and worse, that expire and potentially cause
  outages).
* Complex toolchains or third-party password vaults for everything.

... to an *automatic identity issuance* that authenticates workloads based on where and how they run. Your environment,
plus SPIRE, effectively says: "Yes, this is the real `Service A` on the real cluster `us-east-1-prod`," and it hands out
a short-lived credential that `Service A` can use to prove its identity to `Service B`.

## Anchor Authorization in what the Humans Specify

Once you have cryptographically provable identities for your workloads, you can layer on your own policies:

* Which workload can talk to which?
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
handle secrets for things like certain types of database logins, or external APIs (perhaps for tracing) that haven't yet
adopted modern identity frameworks, or older systems that simply can't talk SPIFFE.

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

For many organizations, adopting SPIFFE/SPIRE is a quantum leap forward toward zero-trust architecture. It may not be a
universal fix for all credentials or compliance mandates, but it's a powerful standard and toolset for modern
infrastructure teams looking to level up their security posture.
