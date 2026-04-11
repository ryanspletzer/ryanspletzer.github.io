---
layout: post
title: A No-Nonsense Guide to GPG Commit Signing with a YubiKey
date: 2026-04-11 00:00:00
description: >
  GPG-signed Git commits prove that code actually came from you,
  and storing your signing key on a YubiKey means the private key
  never persists on your filesystem.
  This guide walks through setting it all up on macOS, Windows, and Ubuntu.
tags:
 - gpg
 - yubikey
 - security
 - git
---

![Delegates seated at a long table in the Hall of Mirrors at Versailles, signing the Treaty of Versailles in 1919, with tall arched mirrors and ornate chandeliers reflected behind them.](/assets/images/960px-William_Orpen_-_The_Signing_of_Peace_in_the_Hall_of_Mirrors.jpg)
*William Orpen, The Signing of Peace in the Hall of Mirrors, 1919. Imperial War Museum, London. Public domain,
via
[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:William_Orpen_%E2%80%93_The_Signing_of_Peace_in_the_Hall_of_Mirrors.jpg)*

Anyone who knows me well knows that I nerd out about some specific things,
like [OAuth](/2025/11/oidc-oauth-spec-graph/) and its adjacent specs like OpenID Connect, JWT, etc.,
and other auth specs like FIDO2/WebAuthn and SPIFFE/SPIRE,
[Git itself](https://git-scm.com/book/en/v2),[^pro-git-book]
CI/CD,
Zero Trust,
certain fancy words like "[idempotency](https://en.wikipedia.org/wiki/Idempotence),"
and in recent years AI and data engineering practices
(just to name a few).

I'm also a big believer in the promise and evolution of the secure software supply chain,
and am of the firm belief that a secure software supply chain starts with *you*,
on your local machine.

Therefore it should come as no surprise
that I nerd out quite heavily about GPG-signed Git commits—cryptographic
proof that code actually came from *you*
(possibly in tandem with an AI agent helping you)—and
about taking that an extra step further
by storing your signing key on a YubiKey[^other-hardware-keys]
so that the private key never persists on your filesystem.

This guide walks through how to set up GPG commit signing with a YubiKey on macOS, Windows, and Ubuntu.

Now, you may look at this post and think:
"Ryan, this is really long, and it even has a table of contents...
is this truly 'No-Nonsense'?"

Trust me when I say this: the nonsense is as minimized as possible here.
Going through GPG / YubiKey setups has traditionally been not well-explained,
and not for the faint of heart
(hence why many people don't do it!).
Because I've been doing this for many years,
I have thought beyond initial setup
and further to the many scenarios you *will* run into along the way:
for example, not just how to set up your key initially,
but what you have to do for setting up a second YubiKey,
what you have to do if you need to re-key,
and more.

So while this post covers the initial setup,
it also serves as a reference you can come back to
when those additional scenarios inevitably arise.
Feel free to jump to the section(s) that are relevant for your situation.
I'll keep adding to this as I think of more scenarios to address,
so you can refer back to this post when needed, and so I can, too![^unaddressed-scenarios]

* TOC
{:toc}

## Why Bother?

If you've ever looked at at someone's activity on GitHub and noticed the green "Verified" badge
across all the commits on their PR,
that's GPG commit signing at work.
Without it, anyone can set `user.name` and `user.email` in their Git config to whatever they want—though
it would be coming from a different GitHub account,
there's really nothing stopping someone from "committing as you"
with this commit metadata set in their Git config.[^commit-impersonation]

Signing commits with GPG attaches a cryptographic proof to each commit
asserting that it came from the holder of a specific private key.[^gpg-hash-then-sign]
(And it also personally gives me a large dopamine hit when I see the green "Verified" badge.)

If that private key lives on a hardware token like a YubiKey,
it can't be exfiltrated by malware or accidentally copied—the
signing operation happens on the YubiKey itself,
and you confirm it by entering your YubiKey PIN for the first signing.
After that, the YubiKey stays unlocked for subsequent signings
until you log out, shutdown/reboot, or remove the YubiKey.[^touch-to-sign]

I would be remiss in talking about software supply chain
if I didn't mention that GPG isn't the only way to sign commits.
GitHub also shows the green "Verified" badge for commits signed with
[SSH or S/MIME](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification),
and it's worth being aware of how
[Sigstore's Gitsign](https://docs.sigstore.dev/cosign/signing/gitsign/)
uses OpenID Connect to create keyless signatures
that are strongly tied to your identity without requiring long-lived keys at all.
Certain organizations may be at the level of maturity where Sigstore + OIDC
is the right fit for showing provenance,
but everyone is on their own software supply chain journey
and organizations and people are at different points in that journey.
Notably, GitHub doesn't currently show the green "Verified" label for Sigstore signatures—which
my dopamine would be sad about—but
Sigstore does provide strong cryptographic assurances through its transparency log.
It's also worth noting that Git only supports one signing method at a time,
so you have to choose between GPG, SSH, S/MIME, or Sigstore—you
can't layer them.
In the absence of other options being available to you,
I recommend setting up GPG commit signing yourself,
because it is entirely within your control
and is also what the Linux and Git open source projects use for signing themselves.
GPG signing is better than nothing.
If you are someone who prefers using SSH with GitHub,
then SSH signing may be more appealing for you.[^ssh-signing]

## Overview / TL;DR

The setup involves three parts:

1. **Generating a GPG key pair** – generating a master key (certify) with subkeys for signing, encryption,
   and optionally authentication
2. **Moving to the YubiKey** – moving the signing subkey gets onto the hardware token so it doesn't persist on disk
3. **Configuring Git** – telling Git to use GPG and point it at your signing subkey

The end result: every `git commit` triggers a signing operation on your YubiKey,
and the commit gets a cryptographic signature that GitHub (or any verifier)
can check against your public key.

I'll break things down as we go between macOS, Linux (Ubuntu)[^other-distros], and Windows.

## Planning Your Key Identity

Before you generate anything,
it's worth understanding a constraint that will shape your setup:
a YubiKey's OpenPGP applet holds exactly one key slot each
for signing, encryption, and authentication.
That's one identity per YubiKey—you
can't load a second, separate GPG key alongside the first.

If you use multiple email addresses—say,
a personal email address and a work email address—you
have two options:

**One key, multiple UIDs (recommended):**
Add all your email addresses as UIDs on a single GPG key.
Git and GitHub match the commit's author email against the UIDs on your key
to decide whether to show the "Verified" badge,
so as long as every address you commit with is listed as a UID,
you're covered.[^gpg-email-matching]
This is what I do—one GPG key with both my personal and work emails attached,
loaded onto one pair of YubiKeys (primary + secondary).
It's simpler to manage,
and you only need one set of hardware tokens.

**Separate keys per identity:**
Generate a completely independent GPG key for each email/identity,
each on its own YubiKey (ideally a pair of YubiKeys per GPG identity, for redundancy).
This gives you full isolation between identities—revoking
your work key doesn't touch your personal one—but
it means more hardware to buy and manage,
separate Git signing configs per repo or directory or machine,
and separate public keys to upload to GitHub.

For most people, the single-key approach is the pragmatic choice.
The separate-keys approach makes more sense
if your organization absolutely requires dedicated hardware tokens,
or if you just personally want an absolute firewall between identities.

If you ever need to change an email address down the road—a
new job, a domain change, etc.—you
add the new UID to your existing key, optionally revoke the old one,
and re-upload your public key to GitHub.
I cover that process in
[Re-Keying: Updating Your Email Addresses](#re-keying-updating-your-email-addresses) below.

## Prerequisites

Before diving in, you'll need:

* At least one (but very preferably two) [YubiKey](https://www.yubico.com/products/)(s) that supports OpenPGP
  (YubiKey 5 series or newer is recommended, but older YubiKey 4 works too;
  I use a pair of [YubiKey 5C FIPS](https://www.yubico.com/product/yubikey-5c-fips/) models)[^yubikey-accessories]
* A computer with a USB port
  (which depends on your YubiKey model,
  but on modern computers I'd opt for USB Type-C if you can)
* Some comfort with the command line

## Step 1: Generate Your GPG Key Pair

If you don't already have a GPG key pair, you'll need to generate one.
If you already have one, you can skip ahead to
[Step 2: Move the Signing Subkey to Your YubiKey](#step-2-move-the-signing-subkey-to-your-yubikey),
but you may want to keep reading to compare your generation method with this one.

The recommended approach is to generate a master key with **Certify** capability only,
then add separate subkeys for **Sign**, **Encrypt**, and optionally **Authenticate**.
This way, if a subkey is ever compromised, you can revoke just that subkey without losing your
entire identity.

This guide recommends `ed25519` for all keys.
It's the modern default—smaller keys, faster signing, and a simpler implementation
with fewer knobs to misconfigure compared to RSA.
YubiKey 5 series supports `ed25519` natively.[^rsa-still-fine]

### macOS – Key Generation

```bash
# Install GnuPG via Homebrew
brew install gnupg

# Or build from source: https://www.gnupg.org/download/

# Generate a master key with ed25519
# The interactive prompts will walk you through this
gpg --full-generate-key --expert
```

During the interactive prompts, you'll see a numbered menu.
There are two paths:

**Quick path – option (9) "ECC and ECC":**
creates a master key that can certify and sign,
plus an encryption subkey, all in one step.

**Clean path – option (11) "ECC (set your own capabilities)":**
lets you toggle capabilities individually so you can create a certify-only master key,
then add dedicated Sign, Encrypt, and Auth subkeys afterward.

I recommend the clean path (option 11)[^subkey-separation],
but option 9 is perfectly fine if you want to get going quickly.

Whichever you choose, the remaining prompts are the same:

1. Select **Curve 25519**
2. Set an expiration—I
   recommend 2 years for subkeys and 5–10 years for the master key.
   Shorter subkey expirations act as a safety net
   (if you lose access, the key auto-expires rather than lingering forever),
   and you can always
   [extend the expiration](#extending-key-expiration) later
   without generating new keys
3. Enter your name and email address—use
   the same email address you commit with in Git
   (i.e. the one in `git config user.email`)
4. Set a strong passphrase—make
   it long (I'd say 20+ characters), unique, and stored in your password manager.
   This passphrase protects your key backups;
   if someone obtains your exported key files,
   the passphrase is the only thing standing between them and your identity.
   Day-to-day signing uses your YubiKey PIN, not this passphrase,
   so you won't be typing it often—only
   during key management operations

If you chose option (11), add your signing subkey now:

```bash
# Replace YOUR_MASTER_KEY_ID with your master key ID from the output above
gpg --expert --edit-key YOUR_MASTER_KEY_ID

# In the GPG prompt:
# gpg> addkey
# Choose (10) ECC (sign only), select Curve 25519, set expiration
# gpg> save
```

You can also add encryption and authentication subkeys the same way if you want those capabilities
on your YubiKey.

### Ubuntu – Key Generation

```bash
# Install GnuPG
sudo apt update && sudo apt install -y gnupg2 scdaemon pcscd

# Generate keys the same way as macOS
gpg --full-generate-key --expert
```

The process is identical to macOS from here (see above)—add subkeys with `gpg --expert --edit-key`.

### Windows – Key Generation

```powershell
# Install GPG4Win via Chocolatey
# Or download from https://www.gpg4win.org/
choco install gpg4win -y

# Generate keys from a terminal (Git Bash, PowerShell, or cmd)
gpg --full-generate-key --expert
```

Same interactive process as macOS above for key generation and subkey creation.

## Step 2: Move the Signing Subkey to Your YubiKey

This is the critical step—once you move a subkey to the YubiKey,
**it is removed from your local keyring**.
The local keyring will retain a "stub" that points to the YubiKey,
but the actual private key material only exists on the hardware token.

**Back up your keys first.** Seriously.

```bash
# Export your full key (public + private) to a safe location
gpg --export-secret-keys --armor YOUR_MASTER_KEY_ID > ~/gpg-export/master-secret-key.asc
gpg --export-secret-subkeys --armor YOUR_MASTER_KEY_ID > ~/gpg-export/secret-subkeys.asc
```

Also generate a revocation certificate now, while you have easy access to the master key:

```bash
gpg --gen-revoke YOUR_MASTER_KEY_ID > ~/gpg-export/revocation-certificate.asc
```

A revocation certificate is a pre-signed statement that says "this key is no longer valid."
If you ever lose access to your master key entirely—lose
the secure backup, forget the passphrase,
or worse, a third party obtains control of the key and passphrase—this
certificate is your only way to tell the world the key is dead.
It's tied to your key's fingerprint, not its expiration date,
so it never needs to be regenerated
(not when you extend expiration, add UIDs, or make any other key changes).

Note that GnuPG 2.1+ actually generates a revocation certificate automatically
during key creation and stores it in `~/.gnupg/openpgp-revocs.d/`,
but you should copy it into your secure backup location alongside your key exports
rather than relying on it being on a single machine.

Move these exported files into a secure storage location,
then delete the local `~/gpg-export/` directory.
These files should not persist on your filesystem—the
whole point is that the private key material lives on your YubiKey, not on disk.

Some practical storage options:

* As file attachments in a password manager like 1Password or Bitwarden
  (the keys are already passphrase-protected, and you likely trust your
  password manager with everything else already)
* An encrypted USB drive stored in a fireproof safe or safety deposit box
* An encrypted archive in a cloud drive

You'll need these backups if your YubiKey is ever lost or broken.

Now, insert your YubiKey and move the signing subkey onto it:

```bash
# Edit your key
gpg --edit-key YOUR_MASTER_KEY_ID

# Select the signing subkey (check the index -- usually key 1 or 2)
# gpg> key 1
# gpg> keytocard
# Choose (1) Signature key
# gpg> save
```

You can verify the key is on the card:

```bash
gpg --card-status
```

You should see your signing key fingerprint listed under "Signature key"
and your subkey listing should show `ssb>` (the `>` indicates the key is on a card).

### Loading the Same Key onto a Second YubiKey

I strongly recommend having two YubiKeys:
a primary YubiKey that you carry and a secondary YubiKey stored somewhere safe
(I keep mine in a fireproof safe at home).
This is good practice for FIDO2/WebAuthn[^fido2-passkeys] as well
(where you'd pre-register both keys with your services),
and it applies equally to GPG signing.

When my primary YubiKey was stolen
(along with my backpack—more post-mortem learnings from that to come in a future blog post!),
I was very glad I had a secondary ready to go.[^stolen-yubikey-risk]
Without it, I would have left hanging while I waited for a new YubiKey to arrive
(not to mention since I rely on it for sign-in for many services, beyond just the GPG use case),
and further without secure backups of the GPG master and sub keys
I would have to generate entirely new keys,
re-upload them to GitHub, and update every machine I use.

The simplest approach is to load the *same* signing subkey onto both YubiKeys.
This way your `.gitconfig` doesn't change regardless of which key is plugged in—Git
just sees the same subkey ID either way.
The tradeoff is that you can't revoke one without revoking the other
(since it's the same subkey),
but since the private key can't be extracted from a stolen YubiKey,
this is unlikely to matter in practice.

To do this, **before you discard your local key backup** from the step above,
move the subkey to your second YubiKey:

```bash
# After moving the subkey to your first YubiKey and saving,
# restore the local private key from your backup
gpg --delete-secret-keys YOUR_MASTER_KEY_ID
gpg --import ~/gpg-export/master-secret-key.asc

# Insert your second YubiKey and move the subkey onto it
gpg --edit-key YOUR_MASTER_KEY_ID
# gpg> key 1
# gpg> keytocard
# Choose (1) Signature key
# gpg> save
```

After this, both YubiKeys hold the same signing subkey,
and you can swap between them seamlessly.
Just remember that when you plug in a different YubiKey than the one GPG last saw,
you may need to run `gpg --card-status` so GPG re-discovers the key stub
on the new card.

### Removing the Master Key from Your Machine

Once your subkeys are on your YubiKey(s) and your backups are safely stored offline,
there's no reason to keep the master key's private portion on your local keyring.
You only need the master key for infrequent key management tasks—adding
a new UID, extending the expiration date, revoking a subkey,
or signing someone else's key.
For day-to-day commit signing, the subkey on your YubiKey is all you need.
Assuming you performed all the correct secure backup steps for your master and subkeys
mentioned during key generation above,
you are free to safely remove the master key from your keyring.

```bash
# Remove the secret master key from your local keyring
gpg --delete-secret-keys YOUR_MASTER_KEY_ID

# Re-import the public key so GPG still knows about your key
gpg --import ~/gpg-export/public-key.asc

# Plug in your YubiKey so GPG re-discovers the subkey stubs
gpg --card-status
```

After this, `gpg --list-secret-keys` will show `sec#` instead of `sec`—the
`#` indicates the master key's private portion is absent.
Your signing subkey on the YubiKey still works normally.

When you eventually need to do key management,
temporarily import your master key from your secure backup,
do the work, then delete it again.
This is elaborated on in several scenarios described later in this blog post.

## Step 3: Configure Git for GPG Signing

### macOS – Git Config

The macOS setup involves a few pieces:

```bash
# Install pinentry-mac for the PIN prompt dialog
# Or build from source: https://github.com/GPGTools/pinentry-mac
brew install pinentry-mac
```

Configure GPG to use `pinentry-mac` for PIN entry—this
gives you a native macOS dialog instead of a terminal prompt:

```text
# ~/.gnupg/gpg-agent.conf
pinentry-program /opt/homebrew/bin/pinentry-mac
```

If you're on an Intel Mac, the path would be `/usr/local/bin/pinentry-mac` instead.

This is worth calling out: using a GUI pinentry like `pinentry-mac` instead of the text-based
`pinentry-curses` or `pinentry-tty` isn't just a cosmetic preference—it's
a practical requirement if you use AI coding tools like
[Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview)
that execute Git commands on your behalf.
I used to use the text-based pinentry in my terminal,
but when Claude Code runs `git commit` it spawns the process in a way where the terminal-based
pinentry can't grab the TTY to prompt you for your PIN.
With `pinentry-mac`, the PIN dialog pops open as a native macOS window regardless of which process
triggered the commit, so signing works seamlessly whether you're committing manually or through an
AI assistant.

You may also want to set `no-tty` in your GPG config (which I personally do),
which further ensures GPG doesn't try to interact with the terminal directly—this
complements the GUI pinentry approach:

```text
# ~/.gnupg/gpg.conf
no-tty
```

If you're using the newer keyboxd (GnuPG 2.4+), add this (which I also personally do):

```text
# ~/.gnupg/common.conf
use-keyboxd
```

Set the `GPG_TTY` environment variable in your shell RC file
(needed even with `pinentry-mac` as a fallback):

```bash
# Add to ~/.zshrc or ~/.bashrc
export GPG_TTY=$(tty)

# Or for fish, add to ~/.config/fish/config.fish
# set -x GPG_TTY (tty)

# Or for PowerShell, add to your $PROFILE
# $env:GPG_TTY = (tty)
```

Now configure Git:

```bash
# Point Git at your GPG binary, homebrew path shown below
# If you installed via a different method this may be a different path
git config --global gpg.program /opt/homebrew/bin/gpg

# Set your signing key (use the signing *subkey* ID, not the master key)
git config --global user.signingKey YOUR_SIGNING_SUBKEY_ID

# Enable signing for all commits
git config --global commit.gpgsign true
```

### Ubuntu – Git Config

```bash
# Install a GUI pinentry (recommended) or terminal pinentry
sudo apt install -y pinentry-gnome3
# Or for KDE: sudo apt install -y pinentry-qt
# Or terminal-only: sudo apt install -y pinentry-curses

# Add to ~/.bashrc or ~/.zshrc
export GPG_TTY=$(tty)

# Or for fish, add to ~/.config/fish/config.fish
# set -x GPG_TTY (tty)

# Configure Git
git config --global gpg.program gpg
git config --global user.signingKey YOUR_SIGNING_SUBKEY_ID
git config --global commit.gpgsign true
```

For the `gpg-agent.conf` pinentry line,
I recommend a GUI pinentry on desktop Ubuntu for the same reason
as `pinentry-mac` on macOS—if
you use AI coding tools like Claude Code that run `git commit` on your behalf,
a terminal-based pinentry like `pinentry-curses` can't grab the TTY
to prompt for your PIN.
A GUI pinentry pops up a dialog window regardless of which process triggered the commit.

```text
# ~/.gnupg/gpg-agent.conf
pinentry-program /usr/bin/pinentry-gnome3
```

Or for KDE:

```text
pinentry-program /usr/bin/pinentry-qt
```

If you're on a headless server with no desktop environment,
`pinentry-curses` is your only option:

```text
pinentry-program /usr/bin/pinentry-curses
```

You may also want to set `no-tty` in your GPG config,
just like on macOS, to ensure GPG doesn't try to interact with the terminal directly:

```text
# ~/.gnupg/gpg.conf
no-tty
```

If you're using GnuPG 2.4+ with keyboxd:

```text
# ~/.gnupg/common.conf
use-keyboxd
```

### Windows – Git Config

```powershell
# If using GPG4Win, Kleopatra handles PIN entry automatically

# Configure Git (in Git Bash or PowerShell)
git config --global gpg.program "C:\Program Files (x86)\GnuPG\bin\gpg.exe"
git config --global user.signingKey YOUR_SIGNING_SUBKEY_ID
git config --global commit.gpgsign true
```

If you installed GPG4Win, the Kleopatra application manages PIN entry via a GUI dialog.
This works well with AI coding tools like Claude Code for the same reason
as `pinentry-mac` on macOS and `pinentry-gnome3` on Ubuntu—the
PIN dialog pops up as a native window regardless of which process triggered the commit.
If you installed GPG standalone via Chocolatey, you may need to configure pinentry separately.

## Step 4: Upload Your Public Key to GitHub

For GitHub to show the "Verified" badge, it needs your public key:

```bash
# Export your public key
gpg --armor --export YOUR_MASTER_KEY_ID
```

Copy the output (including the `-----BEGIN PGP PUBLIC KEY BLOCK-----` and
`-----END PGP PUBLIC KEY BLOCK-----` lines) and add it in GitHub under
**Settings > SSH and GPG keys > New GPG key**.

This step is the same regardless of your operating system.

### Making Your Public Key Easy to Find Later

While you're generating your public key,
this is a good time to make sure you can easily retrieve it
when [setting up a new machine](#setting-up-on-a-new-machine) down the road.

You can *optionally* upload it to a public keyserver:[^keys-openpgp-org]

```bash
gpg --keyserver keys.openpgp.org --send-keys YOUR_MASTER_KEY_ID
```

Then on any new machine, you can import it directly:

```bash
gpg --keyserver keys.openpgp.org --recv-keys YOUR_MASTER_KEY_ID
```

Alternatively, keep your public key (not your private key!)
in a place you can easily access—a
private GitHub gist, a cloud drive, or even committed to your dotfiles repo (potentially),
but honestly what I do is just keep this in my password manager, too, for convenience.

## Step 5: Test It

Make a test commit and verify it:

```bash
# Create a test commit
git commit --allow-empty -m "Test GPG signing"

# Verify the signature
git log --show-signature -1
```

You should see output indicating a good signature from your key.
If your YubiKey is plugged in, you'll be prompted for your PIN.

If your YubiKey is **not** plugged in, the commit will fail
and/or the pinentry terminal prompt or GUI will indicate you need to insert your card—this
is the intended behavior, because the private key only exists on the hardware token.

## Setting Up on a New Machine

Getting your initial key generated and moved onto the YubiKey is a one-time thing.
But when you get a new machine—or reinstall your OS—you
need to get the new machine to recognize the key that's already on your YubiKey.
This is the part that tripped me up the first time,
because the steps are different from the initial setup and not always well-documented.

The core idea is the same on every platform:
install GPG, import your public key, plug in the YubiKey so GPG discovers the private key stubs,
set trust, and configure Git and pinentry.

One step you'll notice here that wasn't needed during initial setup is setting trust.
When you generate a key, GPG automatically assigns "ultimate" trust to it
because it knows you created it yourself.
When you import a key on a new machine,
GPG doesn't automatically know it's *yours*—it
just sees an imported public key—so
you need to explicitly tell GPG to trust it.
Without this, GPG will warn you on every signing operation.

If you uploaded your public key to a keyserver
[earlier](#making-your-public-key-easy-to-find-later),
importing it on the new machine is one command:

```bash
gpg --keyserver keys.openpgp.org --recv-keys YOUR_MASTER_KEY_ID
```

Otherwise, import it from a file
(downloaded from your password manager, cloud drive, etc.)
or export it from another machine that already has it:

```bash
# From a file
gpg --import /path/to/public-key.asc
```

### macOS – New Machine

```bash
# Install GnuPG and pinentry-mac
# Or build from source: https://www.gnupg.org/download/
# Or build from source: https://github.com/GPGTools/pinentry-mac
brew install gnupg pinentry-mac

# Import your public key (from a backup, a keyserver, or export from another machine)
gpg --import /path/to/public-key.asc

# Plug in your YubiKey and tell GPG to discover the private key stubs on the card
gpg --card-status

# Trust your own key (otherwise GPG will warn on every signature)
gpg --edit-key YOUR_MASTER_KEY_ID
# gpg> trust
# Choose 5 (ultimate)
# gpg> save
```

Then set up the same config files as in
[Step 3](#step-3-configure-git-for-gpg-signing):

```text
# ~/.gnupg/gpg-agent.conf
pinentry-program /opt/homebrew/bin/pinentry-mac
```

```text
# ~/.gnupg/gpg.conf
no-tty
```

```text
# ~/.gnupg/common.conf (GnuPG 2.4+)
use-keyboxd
```

```bash
# Add to ~/.zshrc or ~/.bashrc
export GPG_TTY=$(tty)

# Or for fish, add to ~/.config/fish/config.fish
# set -x GPG_TTY (tty)

# Or for PowerShell, add to your $PROFILE
# $env:GPG_TTY = (tty)

# Configure Git
# If you installed via a different method this may be a different path
git config --global gpg.program /opt/homebrew/bin/gpg
git config --global user.signingKey YOUR_SIGNING_SUBKEY_ID
git config --global commit.gpgsign true
```

### Ubuntu – New Machine

```bash
# Install GnuPG and smartcard support with a GUI pinentry
sudo apt update && sudo apt install -y gnupg2 scdaemon pcscd pinentry-gnome3
# Or for KDE: replace pinentry-gnome3 with pinentry-qt
# Or headless: replace pinentry-gnome3 with pinentry-curses

# Import your public key
gpg --import /path/to/public-key.asc

# Plug in your YubiKey and discover the private key stubs
gpg --card-status

# Trust your own key
gpg --edit-key YOUR_MASTER_KEY_ID
# gpg> trust
# Choose 5 (ultimate)
# gpg> save
```

Then configure the same config files as in
[Step 3](#step-3-configure-git-for-gpg-signing):

```text
# ~/.gnupg/gpg-agent.conf
pinentry-program /usr/bin/pinentry-gnome3
```

```text
# ~/.gnupg/gpg.conf
no-tty
```

```text
# ~/.gnupg/common.conf (GnuPG 2.4+)
use-keyboxd
```

```bash
# Add to ~/.bashrc or ~/.zshrc
export GPG_TTY=$(tty)

# Or for fish, add to ~/.config/fish/config.fish
# set -x GPG_TTY (tty)

# Configure Git
git config --global gpg.program gpg
git config --global user.signingKey YOUR_SIGNING_SUBKEY_ID
git config --global commit.gpgsign true
```

### Windows – New Machine

```powershell
# Install GPG4Win
# Or download from https://www.gpg4win.org/
choco install gpg4win -y

# Import your public key (from PowerShell, Git Bash, or cmd)
gpg --import C:\path\to\public-key.asc

# Plug in your YubiKey and discover the private key stubs
gpg --card-status

# Trust your own key
gpg --edit-key YOUR_MASTER_KEY_ID
# gpg> trust
# Choose 5 (ultimate)
# gpg> save

# Configure Git
git config --global gpg.program "C:\Program Files (x86)\GnuPG\bin\gpg.exe"
git config --global user.signingKey YOUR_SIGNING_SUBKEY_ID
git config --global commit.gpgsign true
```

Kleopatra (included with GPG4Win) handles PIN entry automatically on Windows,
so no separate pinentry configuration is needed.

## Re-Keying: Updating Your Email Addresses

At some point you'll likely need to update the email addresses on your GPG key—you
switch jobs, your company changes its domain,
or you retire an old personal address.
Because your YubiKey holds your *subkeys* (signing, encryption, authentication)
and UIDs live on the *master key*,
the good news is that re-keying doesn't require touching the YubiKey at all.
It's purely a master-key operation.

You'll need your master key's private portion for this,
so temporarily import it from your secure backup
(from your password manager or wherever you've securely stored it):

```bash
# Import the master key from your secure backup
gpg --import ~/gpg-export/master-secret-key.asc
```

### Adding a New UID

```bash
gpg --edit-key YOUR_MASTER_KEY_ID

# In the GPG prompt:
# gpg> adduid
# Enter your new name and email address
# gpg> save
```

### Revoking an Old UID (Optional)

If the old address is no longer valid and you don't want it associated with your key,
you can revoke it.
A revoked UID stays visible on the key (GPG doesn't truly delete UIDs)
but is marked as no longer valid:

```bash
gpg --edit-key YOUR_MASTER_KEY_ID

# Select the UID to revoke (UIDs are numbered starting at 1)
# gpg> uid 2
# gpg> revuid
# Confirm the revocation
# gpg> save
```

If you'd rather keep the old UID active—maybe
the address still works as an alias—that's fine too.
Either way, historical commits aren't affected:
GitHub stores verification records at push time,
so commits that were already verified keep their "Verified" badge
regardless of UID revocations.

### Re-Uploading Your Public Key

After modifying UIDs, you need to re-export and re-upload your public key
so verifiers (like GitHub) know about the change:

```bash
# Export the updated public key
gpg --armor --export YOUR_MASTER_KEY_ID > updated-public-key.asc
```

Then replace the key in GitHub under
**Settings > SSH and GPG keys**—add
the new export first, then delete the old entry.
GitHub stores a
[verification record](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)
at push time, so previously-verified commits keep their "Verified" badge
even after you rotate or revoke keys.

If you use a keyserver, push the update there too:

```bash
gpg --keyserver keys.openpgp.org --send-keys YOUR_MASTER_KEY_ID
```

### Cleaning Up

Once you're done, remove the master key's private portion from your local keyring again
(just like in
[Removing the master key from your machine](#removing-the-master-key-from-your-machine)):

```bash
gpg --delete-secret-keys YOUR_MASTER_KEY_ID
gpg --import ~/gpg-export/public-key.asc
gpg --card-status
```

And don't forget to update your secure backup with the new export,
since the master key now has updated UIDs.

### Updating Git Config

If your new email address is the one you want to commit with going forward,
update your Git config:

```bash
git config --global user.email "your-new-email@example.com"
```

No change is needed for `user.signingKey`—that
points to your signing subkey, which hasn't changed.

## Revoking a Compromised Subkey

To be clear: if your YubiKey is lost or stolen,
your signing subkey is almost certainly *not* compromised.
The private key cannot be extracted from the hardware token,
and the PIN retry counter locks the card after 3 failed attempts.
A lost YubiKey is not analogous to a leaked private key file.

That said, if you believe a *subkey* was compromised—for
example, your subkey backup was obtained by a third party
along with the passphrase—you
can revoke just that subkey and generate a new one
while keeping your master key and identity intact.

If the compromise extends to your *master key*
(your secure backup was exposed along with the passphrase),
use the revocation certificate you generated in
[Step 2](#step-2-move-the-signing-subkey-to-your-yubikey) and follow the
[Starting Over: Complete Re-Key](#starting-over-complete-re-key) process instead.

### Revoke the Subkey

Import your master key from your secure backup,
then revoke the compromised signing subkey:

```bash
# Import the master key
gpg --import ~/gpg-export/master-secret-key.asc

# Edit the key and revoke the signing subkey
gpg --edit-key YOUR_MASTER_KEY_ID

# Select the compromised subkey (check the index)
# gpg> key 1
# gpg> revkey
# Confirm the revocation and provide a reason
# gpg> save
```

### Publish the Revocation

The revocation needs to reach anyone who might verify your signatures:

```bash
# Export the updated public key (now containing the revocation)
gpg --armor --export YOUR_MASTER_KEY_ID > revoked-public-key.asc

# Push to keyserver if you use one
gpg --keyserver keys.openpgp.org --send-keys YOUR_MASTER_KEY_ID
```

On GitHub, go to **Settings > SSH and GPG keys**,
add the updated public key export (which includes the revocation metadata),
then remove the old entry.
Because GitHub stores verification records at push time,
your previously-verified commits keep their "Verified" badge—the
revocation prevents *new* signatures from being verified under the old subkey,
but doesn't retroactively invalidate past ones.

### Generate a New Signing Subkey

```bash
# Still in edit mode with the master key imported
gpg --expert --edit-key YOUR_MASTER_KEY_ID

# gpg> addkey
# Choose (10) ECC (sign only), select Curve 25519, set expiration
# gpg> save
```

### Load the New Subkey onto Your YubiKey(s)

Follow the same process as
[Step 2: Move the Signing Subkey to Your YubiKey](#step-2-move-the-signing-subkey-to-your-yubikey)—move
the new subkey to your primary YubiKey,
then restore from backup and move to your secondary if you have one.

### Update Git Config and GitHub

```bash
# Point Git at the new signing subkey ID
git config --global user.signingKey YOUR_NEW_SIGNING_SUBKEY_ID
```

Upload the new public key export to GitHub
(the one containing both the revoked old subkey and the new active one).
Future commits will be signed with the new subkey and show "Verified."

### Clean Up

First, export your updated public key
(which now contains the revoked old subkey and the new active one)
and update your secure backup:

```bash
# Export the updated public key
gpg --armor --export YOUR_MASTER_KEY_ID > ~/gpg-export/public-key.asc
```

Then remove the master key's private portion from your local keyring.
The `--delete-secret-keys` command removes all secret key material,
so you re-import the public key afterward
so GPG still knows your key exists
(and the YubiKey stubs get re-associated when you run `--card-status`):

```bash
gpg --delete-secret-keys YOUR_MASTER_KEY_ID
gpg --import ~/gpg-export/public-key.asc
gpg --card-status

# Test a signed commit
git commit --allow-empty -m "Test new signing subkey"
git log --show-signature -1
```

## Starting Over: Complete Re-Key

The sections above cover lighter-weight changes—updating
UIDs or revoking a single subkey while keeping the same master key.
Sometimes you need to start from scratch with an entirely new GPG identity.

Scenarios where a complete re-key makes sense:

* Your **master key** was compromised (not just a subkey)
* You want to **switch algorithms** (e.g. RSA 4096 to ed25519)
* You've **lost both YubiKeys and your secure backup**—you
  have no way to recover the old key
* Your key has **expired** and you'd rather start fresh
  than extend it

### Revoke the Old Key (if You Still Have Access)

If you generated a revocation certificate during
[Step 2](#step-2-move-the-signing-subkey-to-your-yubikey)
(or GnuPG generated one for you in `~/.gnupg/openpgp-revocs.d/`),
this is the fastest path—you
don't need the master key's private portion at all:

```bash
# Import the pre-generated revocation certificate
gpg --import ~/gpg-export/revocation-certificate.asc

# Publish the revoked key to keyserver
gpg --keyserver keys.openpgp.org --send-keys YOUR_OLD_MASTER_KEY_ID
```

Alternatively, if you have the master key but not the revocation certificate,
you can generate one now:

```bash
# Import the master key from your secure backup
gpg --import ~/gpg-export/master-secret-key.asc

# Generate a revocation certificate
gpg --gen-revoke YOUR_OLD_MASTER_KEY_ID > revocation-certificate.asc

# Import the revocation into your keyring
gpg --import revocation-certificate.asc

# Publish the revoked key to keyserver
gpg --keyserver keys.openpgp.org --send-keys YOUR_OLD_MASTER_KEY_ID
```

On GitHub, you can leave the old (now-revoked) key in place or remove it.
Previously-verified commits keep their "Verified" badge regardless.

If you've lost access to both the master key *and* the revocation certificate,
you can't revoke it—just
remove the old public key from GitHub and move on.
The old key will eventually expire on its own
(assuming you set an expiration date, which is one more reason to always set one).

### Generate New Keys and Set Up from Scratch

From here, the process is the same as a first-time setup.
Walk through each step with your new key:

1. [Generate your new GPG key pair](#step-1-generate-your-gpg-key-pair)
2. [Move the signing subkey to your YubiKey(s)](#step-2-move-the-signing-subkey-to-your-yubikey)
3. [Configure Git](#step-3-configure-git-for-gpg-signing)—update
   `user.signingKey` to point to your new signing subkey ID
4. [Upload your new public key to GitHub](#step-4-upload-your-public-key-to-github)
5. [Test it](#step-5-test-it)

Don't forget to store your new master key and subkey backups securely,
just like the first time around.

### Updating Other Machines

Any machine that was configured with the old key will need to be updated.
Follow the [Setting Up on a New Machine](#setting-up-on-a-new-machine) steps,
importing the *new* public key instead of the old one.

You'll also want to clean out the old key from those machines:

```bash
# Remove the old key from your keyring
gpg --delete-keys YOUR_OLD_MASTER_KEY_ID
```

## Extending Key Expiration

Expiration dates on GPG keys aren't permanent—they're
metadata that can be updated at any time,
as long as you have the master key's private portion.
This applies to both the master key *and* subkeys.

This is one of the reasons shorter subkey expirations (like 2 years) are practical:
you're not committing to a hard deadline,
just setting a safety net that you periodically push forward.

### Extending Your Master Key's Expiration

```bash
# Import your master key from your secure backup
gpg --import ~/gpg-export/master-secret-key.asc

# Edit the key (the master key is selected by default)
gpg --edit-key YOUR_MASTER_KEY_ID

# gpg> expire
# Enter the new expiration period (e.g. 5y for 5 years from today)
# gpg> save
```

### Extending a Subkey's Expiration

```bash
gpg --edit-key YOUR_MASTER_KEY_ID

# Select the subkey you want to extend (check the index)
# gpg> key 1
# gpg> expire
# Enter the new expiration period (e.g. 2y for 2 years from today)
# gpg> save
```

You can extend multiple subkeys in one session—select
each one with `key N`, run `expire`, then `save` when you're done.

### After Extending

Once you've updated expiration dates,
re-export and re-upload your public key
so that verifiers know about the new dates:

```bash
# Export the updated public key
gpg --armor --export YOUR_MASTER_KEY_ID > updated-public-key.asc

# Push to keyserver if you use one
gpg --keyserver keys.openpgp.org --send-keys YOUR_MASTER_KEY_ID
```

On GitHub, add the updated export under
**Settings > SSH and GPG keys**, then remove the old entry.

Then clean up: remove the master key's private portion from your local keyring,
and update your secure backup with the new export.

```bash
gpg --delete-secret-keys YOUR_MASTER_KEY_ID
gpg --import ~/gpg-export/public-key.asc
gpg --card-status
```

No changes are needed to your YubiKey, Git config, or signing subkey ID—the
subkeys themselves haven't changed, just their expiration metadata.

## Troubleshooting

A few common issues and fixes:

### "gpg: signing failed: No secret key"

This usually means GPG can't find the key stub pointing to your YubiKey.
Try:

```bash
# Restart the GPG agent
gpgconf --kill gpg-agent

# Re-read the card
gpg --card-status
```

### "gpg: signing failed: Inappropriate ioctl for device"

This means `GPG_TTY` isn't set. Add `export GPG_TTY=$(tty)` to your shell RC file and restart
your terminal.

### PIN Entry Dialog Doesn't Appear on macOS

Make sure `pinentry-mac` is installed and configured in `~/.gnupg/gpg-agent.conf`.
Then restart the agent:

```bash
gpgconf --kill gpg-agent
```

## Bonus: Using Your YubiKey for SSH Authentication

If you added an authentication subkey to your YubiKey during key generation,
you can use that same YubiKey for SSH authentication—meaning
one hardware token handles both GPG commit signing and SSH access.

The way this works is that the GPG agent can act as an SSH agent.
When you `ssh` into a server or `git push` over SSH,
the GPG agent intercepts the request and uses the authentication subkey
on your YubiKey to perform the handshake.
The SSH private key never exists as a file on disk,
just like your signing key.

### Setup

First, tell the GPG agent to offer SSH support.
Add this to your `gpg-agent.conf`:

```text
enable-ssh-support
```

Then point your shell's `SSH_AUTH_SOCK` at the GPG agent's socket
instead of the default SSH agent:

```bash
# Add to ~/.zshrc or ~/.bashrc
export SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)

# Or for fish, add to ~/.config/fish/config.fish
# set -x SSH_AUTH_SOCK (gpgconf --list-dirs agent-ssh-socket)
```

Next, tell the GPG agent which key to offer for SSH.
Each GPG key has a "keygrip"—a hash that identifies it independently of the key ID.
You need to add your authentication subkey's keygrip to `~/.gnupg/sshcontrol`:

```bash
# Find the keygrips for your key
gpg --list-keys --with-keygrip YOUR_MASTER_KEY_ID

# Look for the keygrip on the line after your [A] (authentication) subkey
# and add it to sshcontrol
echo "YOUR_AUTH_KEYGRIP" >> ~/.gnupg/sshcontrol
```

Restart the GPG agent for changes to take effect:

```bash
gpgconf --kill gpg-agent
```

### Verifying It Works

With your YubiKey plugged in, you should now see your GPG-backed SSH key:

```bash
ssh-add -L
```

This outputs a public key in SSH format that you can add to GitHub
(**Settings > SSH and GPG keys > New SSH key**),
paste into a server's `~/.ssh/authorized_keys`,
or use anywhere else you'd use an SSH key.

The difference is that when you actually authenticate,
the private key operation happens on the YubiKey—you'll
see the PIN prompt (or touch, if you enabled it)
just like with commit signing.

## Closing Thoughts

This setup has served me well for years.
The day-to-day experience is simple: plug in the YubiKey, commit code, enter the PIN when prompted.
The security benefit is significant—your
signing key never persists as a file that could be stolen or accidentally leaked.

The initial setup is admittedly a bit involved,
especially the key generation and subkey-to-card transfer steps,
but it's a one-time cost that pays dividends in the form of verified commits and peace of mind
(and dopamine hits from green "Verified" commit labels in GitHub—gets me every time).

<!-- markdownlint-disable-next-line MD022 -->
## Footnotes
{:.no_toc}

[^pro-git-book]: I highly recommend
    [Pro Git](https://git-scm.com/book/en/v2) by Scott Chacon and Ben Straub.
    It's free to read online,
    and it's the most thorough resource on Git internals and workflows
    I've come across.
    If you want to understand how Git actually works under the hood
    rather than just memorizing commands, this is the book.

[^other-hardware-keys]: I mention YubiKey explicitly here
    because that's what I use and it seems to be the most popular,
    but other brands of hardware security keys can be used,
    like NitroKey, OnlyKey, Token2, and Feitean.
    Notably, while Google's Titan security key supports FIDO2/WebAuthn,
    Titan keys do *not* support GPG commit signing.
    Many of the steps outlined here for YubiKey will be similar for other keys.

[^unaddressed-scenarios]: For the diligent and eagle-eyed readers out there,
    if you think of a scenario that I haven't addressed and would like me to add it,
    feel free to message me on LinkedIn.

[^commit-impersonation]: It can happen, and
    [has happened to some well-known folks out there](https://www.hanselman.com/blog/how-to-setup-signed-git-commits-with-a-yubikey-neo-and-gpg-and-keybase-on-windows#:~:text=I%20just%20want%20to%20be%20able%20to%20sign%20my%20code%20commits%20to%20GitHub%20so%20I%20might%20avoid%20people%20impersonating%20my%20Git%20Commits%20(happens%20more%20than%20you%27d%20think%20and%20has%20happened%20recently.)).
    Also credit to Scott Hanselman whose aforementioned linked post originally got me into all this;
    it's a great guide for Windows.
    In his case he uses a key he created from [Keybase](https://keybase.io/),
    which is an awesome service that I've also used,
    but has been a bit dormant since Zoom acquired them.

[^gpg-hash-then-sign]: Technically, GPG signing uses a hash of the commit content,
    which is then signed with your private key.
    The verifier re-hashes the commit and checks the signature against your public key.

[^touch-to-sign]: You can optionally
    [enable touch-to-sign](https://docs.yubico.com/software/yubikey/tools/ykman/OpenPGP_Commands.html#ykman-openpgp-keys-set-touch-options-key-policy)
    via `ykman openpgp keys set-touch sig on`
    for an extra layer of physical confirmation for *each and every signing operation*,
    but it's off by default.
    I don't personally use this because I consider the initial PIN unlock
    to be good enough security for my circumstances,
    and further when I have coding agents working on things on my machine
    I want them to be able to do signed commits without constant intervention.

[^ssh-signing]: And given you know how to get SSH going with GitHub,
    I assume you can figure out how to set up commit signing with that as well,
    and further can figure out how to use an SSH key on a YubiKey—just
    ask a couple of questions to your favorite AI and you'll have that done.

[^other-distros]: I'll assume that if you're well-versed in Linux
    that you can figure this out for your distro of choice.
    While Ubuntu is the most popular,
    and hence why I focus on it in this post and others,
    I myself tend to lean more towards Fedora these days.

[^gpg-email-matching]: GitHub matches the commit's author email
    against the UIDs on your GPG key
    to decide whether to show the "Verified" badge.
    If you commit with multiple email addresses
    (e.g. personal and work), you can add additional UIDs to the same key
    with `gpg --edit-key YOUR_MASTER_KEY_ID` then `adduid`.

[^yubikey-accessories]: A couple of practical accessories I use:
    I keep a pair of
    [magnetic USB-C adapters](https://www.amazon.com/dp/B0CGLM6PYN)
    on each of my machines so I can pull the YubiKey off MagSafe-style
    when moving between them—this
    also alleviates the fear of snapping a YubiKey off in a USB port.
    And since YubiKeys are small and easy to misplace,
    I attached an AirTag on a key ring
    (I like the Apple Finewoven AirTag key rings)
    along with a small [hand strap](https://www.amazon.com/dp/B08RX4V4CM) to make it easier to keep track of.

[^rsa-still-fine]: My own keys are RSA 4096 from 2018, which is still perfectly secure,
    but if I were starting fresh today I'd go with ed25519.
    If you're wondering about quantum computing cracking this in the future:
    neither RSA nor ed25519 (nor any ECC) is post-quantum encryption—Shor's
    algorithm could theoretically break both.
    (I say theoretically because I believe there are
    [reasons](https://eprint.iacr.org/2025/1237.pdf) to be
    [skeptical](https://www.schneier.com/blog/archives/2025/07/cheating-on-quantum-computing-benchmarks.html)
    about how far along we really are with quantum computing.)
    When post-quantum algorithms land in GnuPG, everyone needs to re-key regardless.
    In the meantime, the "harvest now, decrypt later" concern
    applies primarily to *encrypted* data, not *signatures*.
    For commit signing, the threat from a recovered private key
    is forward-looking (forging future signatures as you),
    not retroactive—your
    past signed commits are already baked into Git's hash chain
    and can't be altered in-place regardless of what happens to the key.

[^subkey-separation]: This is recommended for the same reason you don't use your root CA
    to sign leaf certs—if a subkey is compromised, you revoke just that subkey
    without losing your entire identity.

[^fido2-passkeys]: FIDO2 and WebAuthn are the underlying standards behind
    what most people now know as
    [passkeys](https://fidoalliance.org/passkeys/).
    A YubiKey can act as a hardware-bound passkey for logging into services
    like GitHub, Google, and Microsoft—separate
    from GPG signing, but using the same physical device.

[^stolen-yubikey-risk]: You might wonder whether I rotated my signing key
    after the YubiKey was stolen.
    I didn't—the private key cannot be extracted from a YubiKey,
    and the PIN retry counter locks the card after 3 failed attempts,
    so the practical risk was near zero.
    If you want to be extra cautious in a similar situation,
    you should revoke the subkey and generate a new one
    from your backed-up master key.

[^keys-openpgp-org]: I recommend `keys.openpgp.org` specifically
    because it requires email verification before publishing your identity.
    When you upload a key, the server strips all UIDs (email addresses)
    and sends a verification email to each address on the key.
    Only after you click the confirmation link
    does the server associate that email with your key
    and make it searchable by email address.
    This means no one can upload a key claiming to be you
    without access to your inbox.
    Traditional SKS keyservers (like `pgp.mit.edu`) have no such verification,
    which led to issues like the 2019 certificate flooding attack.
