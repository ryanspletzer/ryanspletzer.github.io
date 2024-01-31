---
layout: post
title: SAML is the new LDAP
date: 2023-11-02 00:00:00
description: >
  SAML has had its time to shine, but it is already a legacy protocol like LDAP that everyone should avoid for new
  implementations.
tags:
 - saml
 - ldap
 - legacy
 - identity
---

SAML has had its time to shine, but it is already a legacy protocol like LDAP that everyone should avoid for new
implementations.

Unless you've been living under a rock the past five years, you should be painfully aware that any and all LDAP usage
(and for that matter, NTLM/Kerberos authentication to go with it) in your environment is a woefully byzantine,
archaic, and inherently not-as-secure or Zero Trust-able with conditional access policies in your environment.

It simply amazes me how many new startups today say that they "support SSO" when in reality that SSO is exclusively
SAML-based and has no OpenID Connect-based option.

I know why, though: in many ways SAML is the "lowest common denominator" when it comes to SSO enterprises, so services
have to support it -- but that being said, it should not be the exclusive way to do SSO with your service.

So, enterprises: evict LDAP from your environment, and ensure you can support OpenID Connect, and stop asking vendors
for SAML support.

Service providers: If you're going to support "SSO" for your products, make sure that you include OpenID Connect as an
option.
