---
layout: post
title: I Have No PATs
date: 2024-03-01 00:00:00
description: >
  I have pushed the content of this blog post to GitHub Pages with zero use of a personal access token (fine-grained or
  otherwise) or even an SSH key.

  How is this possible?
tags:
 - git
 - git-credential-manager
---

I have pushed the content of this blog post to GitHub Pages with zero use of a personal access token (fine-grained or
otherwise) or even an SSH key.

How is this possible?

![alt text](/assets/images/github_pats.png)

![alt text](/assets/images/github_fgpats.png)

![alt text](/assets/images/github_sshkeys.png)

The answer is [Git Credential Manager](https://github.com/git-ecosystem/git-credential-manager).

I've been using GCM for several years now, and its convenience and security deserves more hype.

What I love about GCM is how it seamlessly and securely authenticates me via OAuth in a browser using a trusted GitHub
app, and subsequently retrieves an OAuth access token, scoped with least privilege permissions, which is securely stored
in my macOS Keychain (or in Credential Manager on Windows), with access control set exclusively to the
git-credential-manager application, all without me having to ever handle copying around a credential manually.

For those running GitHub Enterprise Server, it even works there with the latest versions, as well as with many other
source control providers like Bitbucket, GitLab, and more.

Security professionals should take note here, as the use of OAuth and the authentication brokering and credential
storage approaches, coupled with a broader Zero Trust posture and controls for conditional access for your
organization, do really help to advance the cause of protecting these credentials, and by extension the source control
systems to which they provide access --
[this blog post](https://github.blog/2022-04-07-git-credential-manager-authentication-for-everyone/) from GitHub goes
into more depth about this.

If you're still setting up your Git credentials via existing methods, I highly recommend taking a look at Git Credential
Manager to make the setup process for Git authentication easier, seamless, and more secure.
