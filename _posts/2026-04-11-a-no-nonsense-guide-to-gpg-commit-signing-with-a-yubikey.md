---
layout: post
title: A No-Nonsense Guide to GPG Commit Signing with a YubiKey
date: 2026-04-11 00:00:00
description: >
  GPG-signed Git commits prove that code actually came from you,
  and storing your signing key on a YubiKey means the private key
  never touches your filesystem.
  This guide walks through setting it all up on macOS, Windows, and Ubuntu.
tags:
 - gpg
 - yubikey
 - security
 - git
---

![Delegates seated at a long table in the Hall of Mirrors at Versailles, signing the Treaty of Versailles in 1919, with tall arched mirrors and ornate chandeliers reflected behind them.](/assets/images/960px-William_Orpen_-_The_Signing_of_Peace_in_the_Hall_of_Mirrors.jpg)
*William Orpen, The Signing of Peace in the Hall of Mirrors, 1919. Imperial War Museum, London. Public domain,
via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:William_Orpen_%E2%80%93_The_Signing_of_Peace_in_the_Hall_of_Mirrors.jpg)*

Anyone who knows me well knows that I nerd out about some specific things,
like [OAuth](/2025/11/oidc-oauth-spec-graph/) and its adjacent specs like OpenID Connect, JWT, etc.,
and other auth specs like FIDO2/WebAuthn and SPIFFE/SPIRE,
[Git itself](https://git-scm.com/book/en/v2),[^pro-git-book]
CI/CD,
Zero Trust,
certain fancy words like "[idempotency](https://en.wikipedia.org/wiki/Idempotence),"
and in recent years AI and data engineering practices.

I'm also a big believer in the promise and evolution of the secure software supply chain,
and am of the firm belief that a secure software supply chain starts with *you*,
on your local machine.

Therefore it should come as no surprise
that I nerd out quite heavily about GPG-signed Git commits
to help to prove that your code actually came from *you*
(possibly in tandem an AI agent helping you),
and taking that an extra step further
and storing your signing key on a YubiKey so that the private key never touches your filesystem.

This guide walks through how to set up GPG commit signing with a YubiKey on macOS, Windows, and Ubuntu.

Though I mention YubiKey explicitly here
(because that's what I use and seems to be the most popular),
other brands of hardware security keys can be used,
like NitroKey, OnlyKey, Token2 and Feitean.
Notably, while Google's Titan security key supports FIDO2/WebAuthn,
it's important to be aware that Titan security keys do *not* support GPG commit signing.
Many of the steps outlined here for YubiKey will be similar for other keys.

* TOC
{:toc}

## Why Bother?

If you've ever looked at a commit on GitHub and noticed the green "Verified" badge
across all the commits on someone's PR,
that's GPG commit signing at work.
Without it, anyone can set `user.name` and `user.email` in their Git config to whatever they want --
there's really nothing stopping someone from committing as you.[^commit-impersonation]

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
because it is entirely within your control,
and is also what the Linux and Git open source projects use for signing themselves,
and is GPG signing better than nothing.
If you are someone who prefers using SSH with GitHub,
then SSH signing may be more appealing for you.[^ssh-signing]

## Overview / TL;DR

The setup involves three layers:

1. **GPG key pair** -- a master key (certify) with subkeys for signing, encryption, and optionally
   authentication
2. **YubiKey** -- the signing subkey gets moved onto the hardware token so it never exists on disk
3. **Git configuration** -- tell Git to use GPG and point it at your signing subkey

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
a personal address and a work address—you
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
separate Git signing configs per repo or directory,
and separate public keys to upload to GitHub.

For most people, the single-key approach is the pragmatic choice.
The separate-keys approach makes more sense
if your organization requires dedicated hardware tokens,
or if you want an absolute firewall between identities.

If you ever need to change an email address down the road—a
new job, a domain change—you
add the new UID to your existing key, optionally revoke the old one,
and re-upload your public key to GitHub.
I cover that process in
[Re-Keying: Updating Your Email Addresses](#re-keying-updating-your-email-addresses) below.

## Prerequisites

Before diving in, you'll need:

* A [YubiKey](https://www.yubico.com/products/) that supports OpenPGP
  (YubiKey 5 series or newer is recommended; older YubiKey 4 works too)
* A computer with a USB port (depends on your YubiKey model—mine is a YubiKey 5C FIPS one)[^yubikey-accessories]
* Some comfort with the command line

## Step 1: Generate Your GPG Key Pair

If you don't already have a GPG key pair, you'll need to generate one.
If you already have one, skip ahead to
[Step 2: Move the Signing Subkey to Your YubiKey](#step-2-move-the-signing-subkey-to-your-yubikey).

The recommended approach is to generate a master key with **Certify** capability only,
then add separate subkeys for **Sign**, **Encrypt**, and optionally **Authenticate**.
This way, if a subkey is ever compromised, you can revoke just that subkey without losing your
entire identity.

This guide recommends `ed25519` for all keys.
It's the modern default—smaller keys, faster signing, and a simpler implementation
with fewer knobs to misconfigure compared to RSA.
YubiKey 5 series supports `ed25519` natively.[^rsa-still-fine]

### macOS

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

**Quick path -- option (9) "ECC and ECC":**
creates a master key that can certify and sign,
plus an encryption subkey, all in one step.

**Clean path -- option (11) "ECC (set your own capabilities)":**
lets you toggle capabilities individually so you can create a certify-only master key,
then add dedicated Sign, Encrypt, and Auth subkeys afterward.[^subkey-separation]

I recommend the clean path (option 11) for the reasons in the footnote,
but option 9 is perfectly fine if you want to get going quickly.

Whichever you choose, the remaining prompts are the same:

1. Select **Curve 25519**
2. Set an expiration (I use 10+ years, but you can always extend it later)
3. Enter your name and email address—use
   the same email address you commit with in Git
   (i.e. the one in `git config user.email`)
4. Set a strong passphrase—you'll
   need this to manage the key,
   but day-to-day signing will use your YubiKey PIN

If you chose option (11), add your signing subkey now:

```bash
# Replace YOUR_KEY_ID with your master key ID from the output above
gpg --expert --edit-key YOUR_KEY_ID

# In the GPG prompt:
# gpg> addkey
# Choose (10) ECC (sign only), select Curve 25519, set expiration
# gpg> save
```

You can also add encryption and authentication subkeys the same way if you want those capabilities
on your YubiKey.

### Ubuntu

```bash
# Install GnuPG
sudo apt update && sudo apt install -y gnupg2 scdaemon pcscd

# Generate keys the same way as macOS
gpg --full-generate-key --expert
```

The process is identical to macOS from here—add subkeys with `gpg --expert --edit-key`.

### Windows

```powershell
# Install GPG4Win via Chocolatey
choco install gpg4win -y

# Or download from https://www.gpg4win.org/

# Generate keys from a terminal (Git Bash, PowerShell, or cmd)
gpg --full-generate-key --expert
```

Same interactive process as above for key generation and subkey creation.

## Step 2: Move the Signing Subkey to Your YubiKey

This is the critical step—once you move a subkey to the YubiKey,
**it is removed from your local keyring**.
The local keyring will retain a "stub" that points to the YubiKey,
but the actual private key material only exists on the hardware token.

**Back up your keys first.** Seriously.

```bash
# Export your full key (public + private) to a safe location
gpg --export-secret-keys --armor YOUR_KEY_ID > /path/to/secure/backup/master-key.asc
gpg --export-secret-subkeys --armor YOUR_KEY_ID > /path/to/secure/backup/subkeys.asc
```

Store these backups somewhere secure.
You'll need them if your YubiKey is ever lost or broken.
Some practical options:

* An encrypted USB drive stored in a fireproof safe or safety deposit box
* As file attachments in a password manager like 1Password or Bitwarden
  (the keys are already passphrase-protected, and you likely trust your
  password manager with everything else already)
* An encrypted archive in a cloud drive

Now, insert your YubiKey and move the signing subkey onto it:

```bash
# Edit your key
gpg --edit-key YOUR_KEY_ID

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

### Loading the same key onto a second YubiKey

I strongly recommend having two YubiKeys:
a primary YubiKey that you carry and a secondary YubiKey stored somewhere safe
(I keep mine in a fireproof safe at home).
This is good practice for FIDO2/WebAuthn[^fido2-passkeys] as well
(where you'd pre-register both keys with your services),
and it applies equally to GPG signing.

When my primary YubiKey was stolen
(along with my backpack—more post-mortem learnings from that to come in a future blog post!),
I was very glad I had a secondary ready to go.[^stolen-yubikey-risk]
Without it, I would have needed to generate entirely new keys,
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
gpg --delete-secret-keys YOUR_KEY_ID
gpg --import /path/to/secure/backup/master-key.asc

# Insert your second YubiKey and move the subkey onto it
gpg --edit-key YOUR_KEY_ID
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

### Removing the master key from your everyday machine

Once your subkeys are on your YubiKey(s) and your backups are safely stored offline,
there's no reason to keep the master key's private portion on your local keyring.
You only need the master key for infrequent key management tasks—adding
a new UID, extending the expiration date, revoking a subkey,
or signing someone else's key.
For day-to-day commit signing, the subkey on your YubiKey is all you need.

```bash
# Remove the secret master key from your local keyring
gpg --delete-secret-keys YOUR_KEY_ID

# Re-import the public key so GPG still knows about your key
gpg --import /path/to/secure/backup/your-public-key.asc

# Plug in your YubiKey so GPG re-discovers the subkey stubs
gpg --card-status
```

After this, `gpg --list-secret-keys` will show `sec#` instead of `sec` --
the `#` indicates the master key's private portion is absent.
Your signing subkey on the YubiKey still works normally.

When you eventually need to do key management,
temporarily import your master key from the offline backup,
do the work, then delete it again.

## Step 3: Configure Git for GPG Signing

### macOS

The macOS setup involves a few pieces:

```bash
# Install pinentry-mac for the PIN prompt dialog
brew install pinentry-mac

# Or build from source: https://github.com/GPGTools/pinentry-mac
```

Configure GPG to use `pinentry-mac` for PIN entry --
this gives you a native macOS dialog instead of a terminal prompt:

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

You may also want to set `no-tty` in your GPG config,
which further ensures GPG doesn't try to interact with the terminal directly—this
complements the GUI pinentry approach:

```text
# ~/.gnupg/gpg.conf
no-tty
```

If you're using the newer keyboxd (GnuPG 2.4+), add this:

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
# Point Git at your GPG binary
git config --global gpg.program /opt/homebrew/bin/gpg

# Set your signing key (use the signing *subkey* ID, not the master key)
git config --global user.signingKey YOUR_SIGNING_SUBKEY_ID

# Enable signing for all commits
git config --global commit.gpgsign true
```

### Ubuntu

```bash
# Install pinentry for terminal or GUI
sudo apt install -y pinentry-curses
# Or for GNOME: sudo apt install -y pinentry-gnome3

# Add to ~/.bashrc or ~/.zshrc
export GPG_TTY=$(tty)

# Or for fish, add to ~/.config/fish/config.fish
# set -x GPG_TTY (tty)

# Configure Git
git config --global gpg.program gpg
git config --global user.signingKey YOUR_SIGNING_SUBKEY_ID
git config --global commit.gpgsign true
```

For Ubuntu, the `gpg-agent.conf` pinentry line would be:

```text
# ~/.gnupg/gpg-agent.conf
pinentry-program /usr/bin/pinentry-curses
```

Or for GNOME desktop:

```text
pinentry-program /usr/bin/pinentry-gnome3
```

### Windows

```powershell
# If using GPG4Win, Kleopatra handles PIN entry automatically

# Configure Git (in Git Bash or PowerShell)
git config --global gpg.program "C:\Program Files (x86)\GnuPG\bin\gpg.exe"
git config --global user.signingKey YOUR_SIGNING_SUBKEY_ID
git config --global commit.gpgsign true
```

If you installed GPG4Win, the Kleopatra application manages PIN entry via a GUI dialog.
If you installed GPG standalone via Chocolatey, you may need to configure pinentry separately.

## Step 4: Upload Your Public Key to GitHub

For GitHub to show the "Verified" badge, it needs your public key:

```bash
# Export your public key
gpg --armor --export YOUR_KEY_ID
```

Copy the output (including the `-----BEGIN PGP PUBLIC KEY BLOCK-----` and
`-----END PGP PUBLIC KEY BLOCK-----` lines) and add it in GitHub under
**Settings > SSH and GPG keys > New GPG key**.

This step is the same regardless of your operating system.

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

If your YubiKey is **not** plugged in, the commit will fail—this
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

### macOS

```bash
# Install GnuPG and pinentry-mac
brew install gnupg pinentry-mac

# Import your public key (from a backup, a keyserver, or export from another machine)
gpg --import /path/to/your-public-key.asc

# Plug in your YubiKey and tell GPG to discover the private key stubs on the card
gpg --card-status

# Trust your own key (otherwise GPG will warn on every signature)
gpg --edit-key YOUR_KEY_ID
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

```bash
# Add to ~/.zshrc or ~/.bashrc
export GPG_TTY=$(tty)

# Or for fish, add to ~/.config/fish/config.fish
# set -x GPG_TTY (tty)

# Or for PowerShell, add to your $PROFILE
# $env:GPG_TTY = (tty)

# Configure Git
git config --global gpg.program /opt/homebrew/bin/gpg
git config --global user.signingKey YOUR_SIGNING_SUBKEY_ID
git config --global commit.gpgsign true
```

### Ubuntu

```bash
# Install GnuPG and smartcard support
sudo apt update && sudo apt install -y gnupg2 scdaemon pcscd pinentry-curses

# Import your public key
gpg --import /path/to/your-public-key.asc

# Plug in your YubiKey and discover the private key stubs
gpg --card-status

# Trust your own key
gpg --edit-key YOUR_KEY_ID
# gpg> trust
# Choose 5 (ultimate)
# gpg> save
```

Then configure pinentry:

```text
# ~/.gnupg/gpg-agent.conf
pinentry-program /usr/bin/pinentry-curses
```

Or for GNOME desktop:

```bash
sudo apt install -y pinentry-gnome3
```

```text
# ~/.gnupg/gpg-agent.conf
pinentry-program /usr/bin/pinentry-gnome3
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

### Windows

```powershell
# Install GPG4Win
choco install gpg4win -y

# Import your public key (from PowerShell, Git Bash, or cmd)
gpg --import C:\path\to\your-public-key.asc

# Plug in your YubiKey and discover the private key stubs
gpg --card-status

# Trust your own key
gpg --edit-key YOUR_KEY_ID
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

### A note on public key availability

The steps above assume you have your public key file handy.
To avoid fumbling for it on a new machine,
you can *optionally* export it to a keyserver ahead of time:

```bash
# Upload to a public keyserver (do this from your current machine)
gpg --keyserver keys.openpgp.org --send-keys YOUR_KEY_ID
```

Then on the new machine, import it directly:

```bash
gpg --keyserver keys.openpgp.org --recv-keys YOUR_KEY_ID
```

Alternatively, keep your public key (not your private key!)
in a place you can easily access—a
private GitHub gist, a cloud drive, or even committed to your dotfiles repo (potentially),
but honestly what I do is just keep this in my password manager, too, for convenience.

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
gpg --import /path/to/secure/backup/master-key.asc
```

### Adding a new UID

```bash
gpg --edit-key YOUR_KEY_ID

# In the GPG prompt:
# gpg> adduid
# Enter your new name and email address
# gpg> save
```

### Revoking an old UID (optional)

If the old address is no longer valid and you don't want it associated with your key,
you can revoke it.
A revoked UID stays visible on the key (GPG doesn't truly delete UIDs)
but is marked as no longer valid:

```bash
gpg --edit-key YOUR_KEY_ID

# Select the UID to revoke (UIDs are numbered starting at 1)
# gpg> uid 2
# gpg> revuid
# Confirm the revocation
# gpg> save
```

If you'd rather keep the old UID active—maybe
the address still works as an alias,
or you have historical commits signed under it—that's
fine too.
GitHub will still show "Verified" for commits made under any non-revoked UID on the key.

### Re-uploading your public key

After modifying UIDs, you need to re-export and re-upload your public key
so verifiers (like GitHub) know about the change:

```bash
# Export the updated public key
gpg --armor --export YOUR_KEY_ID > updated-public-key.asc
```

Then replace the key in GitHub under
**Settings > SSH and GPG keys**—add
the new export first, then delete the old entry.
GitHub will re-verify your existing commits against the updated key.
Commits signed under a revoked UID will lose their "Verified" badge,
while commits under the new or still-active UIDs remain verified.

If you use a keyserver, push the update there too:

```bash
gpg --keyserver keys.openpgp.org --send-keys YOUR_KEY_ID
```

### Cleaning up

Once you're done, remove the master key's private portion from your local keyring again
(just like in
[Removing the master key from your everyday machine](#removing-the-master-key-from-your-everyday-machine)):

```bash
gpg --delete-secret-keys YOUR_KEY_ID
gpg --import /path/to/secure/backup/your-public-key.asc
gpg --card-status
```

And don't forget to update your offline backup with the new export,
since the master key now has updated UIDs.

### Updating Git config

If your new email address is the one you want to commit with going forward,
update your Git config:

```bash
git config --global user.email "your-new-email@example.com"
```

No change is needed for `user.signingKey`—that
points to your signing subkey, which hasn't changed.

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

### PIN entry dialog doesn't appear on macOS

Make sure `pinentry-mac` is installed and configured in `~/.gnupg/gpg-agent.conf`.
Then restart the agent:

```bash
gpgconf --kill gpg-agent
```

## Bonus: Using Your YubiKey for SSH Authentication

If you added an authentication subkey to your YubiKey during key generation,
you can use that same YubiKey for SSH authentication --
meaning one hardware token handles both GPG commit signing and SSH access.

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
Each GPG key has a "keygrip" -- a hash that identifies it independently of the key ID.
You need to add your authentication subkey's keygrip to `~/.gnupg/sshcontrol`:

```bash
# Find the keygrips for your key
gpg --list-keys --with-keygrip YOUR_KEY_ID

# Look for the keygrip on the line after your [A] (authentication) subkey
# and add it to sshcontrol
echo "YOUR_AUTH_KEYGRIP" >> ~/.gnupg/sshcontrol
```

Restart the GPG agent for changes to take effect:

```bash
gpgconf --kill gpg-agent
```

### Verifying it works

With your YubiKey plugged in, you should now see your GPG-backed SSH key:

```bash
ssh-add -L
```

This outputs a public key in SSH format that you can add to GitHub
(**Settings > SSH and GPG keys > New SSH key**),
paste into a server's `~/.ssh/authorized_keys`,
or use anywhere else you'd use an SSH key.

The difference is that when you actually authenticate,
the private key operation happens on the YubiKey --
you'll see the PIN prompt (or touch, if you enabled it)
just like with commit signing.

## Closing Thoughts

This setup has served me well for years.
The day-to-day experience is simple: plug in the YubiKey, commit code, enter the PIN when prompted.
The security benefit is significant—your
signing key never exists as a file that could be stolen or accidentally leaked.

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

[^commit-impersonation]: It can happen, and
    [has happened to some well-known folks out there](https://www.hanselman.com/blog/how-to-setup-signed-git-commits-with-a-yubikey-neo-and-gpg-and-keybase-on-windows#:~:text=I%20just%20want%20to%20be%20able%20to%20sign%20my%20code%20commits%20to%20GitHub%20so%20I%20might%20avoid%20people%20impersonating%20my%20Git%20Commits%20(happens%20more%20than%20you%27d%20think%20and%20has%20happened%20recently.)).
    Also credit to Scott Hanselman whose aformentioned linked post originally got me into all this;
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
    a couple questions to your favorite AI and you'll have that done.

[^other-distros]: I'll assume that if you're well-versed in Linux
    that you can figure this out for your distro of choice.

[^yubikey-accessories]: A couple of practical accessories I use:
    I keep a pair of
    [magnetic USB-C adapters](https://www.amazon.com/dp/B0CGLM6PYN)
    on each of my machines so I can pull the YubiKey off MagSafe-style
    when moving between them—this
    also alleviates the fear of snapping a YubiKey off in a USB port.
    And since YubiKeys are small and easy to misplace,
    I attached an AirTag on a key ring
    (yes, I like the Apple Finewoven AirTag key rings)
    along with a small [hand strap](https://www.amazon.com/dp/B08RX4V4CM) to make it easier to keep track of.

[^rsa-still-fine]: My own keys are RSA 4096 from 2018, which is still perfectly secure,
    but if I were starting fresh today I'd go with ed25519.

[^subkey-separation]: This is recommended for the same reason you don't use your root CA
    to sign leaf certs—if a subkey is compromised, you revoke just that subkey
    without losing your entire identity.

[^gpg-email-matching]: GitHub matches the commit's author email
    against the UIDs on your GPG key
    to decide whether to show the "Verified" badge.
    If you commit with multiple email addresses
    (e.g. personal and work), you can add additional UIDs to the same key
    with `gpg --edit-key YOUR_KEY_ID` then `adduid`.

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
