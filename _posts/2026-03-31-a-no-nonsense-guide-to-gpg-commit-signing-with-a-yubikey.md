---
layout: post
title: A No-Nonsense Guide to GPG Commit Signing with a YubiKey
date: 2026-03-31 00:00:00
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

I'm a big believer in the promise and evolution of the secure software supply chain.

I am also of the belief that a secure software supply chain starts with *you*,
on your local machine.

GPG-signed Git commits help to prove that your code actually came from you (possibly in tandem an AI agent helping you),
and storing your signing key on a YubiKey means the private key never touches your filesystem.

This guide walks through how to set up GPG commit signing with a YubiKey on macOS, Windows, and Ubuntu.

Though I mention YubiKey explicitly here
(because that's what I use and seems to be the most popular),
other brands of hardware security keys can be used,
like NitroKey, OnlyKey, Token2 and Feitean.
Notably, while Google's Titan security key supports FIDO2,
it's important to be aware that it does not support GPG commit signing.
Many of the steps outlined here for YubiKey will be similar for other keys.

* TOC
{:toc}

## Why Bother?

If you've ever looked at a commit on GitHub and noticed the green "Verified" badge
across all the commits on someone's PR,
that's GPG commit signing at work.
Without it, anyone can set `user.name` and `user.email` in their Git config to whatever they want—there's
really nothing stopping someone from committing as you.
(It can happen, and
[has happened to some well-known folks out there](https://www.hanselman.com/blog/how-to-setup-signed-git-commits-with-a-yubikey-neo-and-gpg-and-keybase-on-windows#:~:text=I%20just%20want%20to%20be%20able%20to%20sign%20my%20code%20commits%20to%20GitHub%20so%20I%20might%20avoid%20people%20impersonating%20my%20Git%20Commits%20(happens%20more%20than%20you%27d%20think%20and%20has%20happened%20recently.)).)

Signing with GPG attaches a cryptographic proof to each commit
asserting that it came from the holder of a specific private key.
(And it also personally gives me a large dopamine hit when I see the green "Verified" badge.)
If that private key lives on a hardware token like a YubiKey,
it can't be exfiltrated by malware or accidentally copied—the
signing operation happens on the YubiKey itself,
and you confirm it by entering your YubiKey PIN for the first signing.
After that, the YubiKey stays unlocked for subsequent signings
until you log out, shutdown/reboot, or remove the YubiKey.
(You can optionally
[enable touch-to-sign](https://docs.yubico.com/software/yubikey/tools/ykman/OpenPGP_Commands.html#ykman-openpgp-keys-set-touch-options-key-policy)
via `ykman openpgp keys set-touch sig on`
for an extra layer of physical confirmation for *each and every signing operation*,
but it's off by default—I
don't personally use this because I consider the initial PIN unlock to be good enough security for my circumstances,
and further when I have coding agents working on things autonomously on my machine
I want them to be able to do signed commits without constant intervention.)

## Overview / TL;DR

The setup involves three layers:

1. **GPG key pair** -- a master key (certify) with subkeys for signing, encryption, and optionally
   authentication
2. **YubiKey** -- the signing subkey gets moved onto the hardware token so it never exists on disk
3. **Git configuration** -- tell Git to use GPG and point it at your signing subkey

The end result: every `git commit` triggers a signing operation on your YubiKey,
and the commit gets a cryptographic signature that GitHub (or any verifier)
can check against your public key.

## Credits and Caveats

I've been using this setup since 2018 and have accumulated around 920 signatures on my current YubiKey
(after the one YubiKey I had been using the longest got stolen—more on that in a bit).
The approach below is opinionated—there are other valid ways to do this,
and there are alternatives like SSH signing instead of GPG (which GitHub also supports now).
If you already have a workflow that works for you, this guide may not be for you.

I'll break things down between macOS, Linux (Ubuntu), and Windows,
similar to my
[Python environments guide](/2024/04/a-no-nonsense-guide-to-setting-up-python-environments/).

## Prerequisites

Before diving in, you'll need:

- A [YubiKey](https://www.yubico.com/products/) that supports OpenPGP
  (YubiKey 5 series or newer is recommended; older YubiKey 4 works too)
- A computer with a USB port (depends on your YubiKey model—mine is a YubiKey 5C FIPS one)
- Some comfort with the command line

## Step 1: Generate Your GPG Key Pair

If you don't already have a GPG key pair, you'll need to generate one.
If you already have one, skip ahead to
[Step 2: Move the Signing Subkey to Your YubiKey](#step-2-move-the-signing-subkey-to-your-yubikey).

The recommended approach is to generate a master key with **Certify** capability only,
then add separate subkeys for **Sign**, **Encrypt**, and optionally **Authenticate**.
This way, if a subkey is ever compromised, you can revoke just that subkey without losing your
entire identity.

This guide recommends `ed25519` for all keys.
It's the modern default -- smaller keys, faster signing, and a simpler implementation with fewer
knobs to misconfigure compared to RSA.
YubiKey 5 series supports ed25519 natively.
(My own keys are RSA 4096 from 2018, which is still perfectly secure,
but if I were starting fresh today I'd go with ed25519.)

### macOS

```bash
# Install GnuPG via Homebrew
brew install gnupg

# Generate a master key with ed25519
# The interactive prompts will walk you through this
gpg --full-generate-key --expert
```

During the interactive prompts:

1. Choose **(9) ECC and ECC** (or **(11) ECC (set your own capabilities)** if you want Certify only)
2. Select **Curve 25519**
3. Set an expiration (I use 10+ years, but you can always extend it later)
4. Enter your name and email address
5. Set a strong passphrase -- you'll need this to manage the key,
   but day-to-day signing will use your YubiKey PIN

If you chose option (9), GPG creates both a master key (certify + sign) and an encryption subkey
automatically.
If you want a dedicated signing subkey separate from your master key
(recommended for the same reason you don't use your root CA to sign leaf certs),
use option (11) to create a certify-only master, then add subkeys:

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

The process is identical to macOS from here -- add subkeys with `gpg --expert --edit-key`.

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

This is the critical step -- once you move a subkey to the YubiKey,
**it is removed from your local keyring**.
The local keyring will retain a "stub" that points to the YubiKey,
but the actual private key material only exists on the hardware token.

**Back up your keys first.** Seriously.

```bash
# Export your full key (public + private) to a safe location
gpg --export-secret-keys --armor YOUR_KEY_ID > /path/to/secure/backup/master-key.asc
gpg --export-secret-subkeys --armor YOUR_KEY_ID > /path/to/secure/backup/subkeys.asc
```

Store these backups somewhere secure -- an encrypted USB drive, a safe,
or another offline location.
You'll need them if your YubiKey is ever lost or broken.

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

## Step 3: Configure Git for GPG Signing

### macOS

The macOS setup involves a few pieces:

```bash
# Install pinentry-mac for the PIN prompt dialog
brew install pinentry-mac
```

Configure GPG to use `pinentry-mac` for PIN entry --
this gives you a native macOS dialog instead of a terminal prompt:

```text
# ~/.gnupg/gpg-agent.conf
pinentry-program /opt/homebrew/bin/pinentry-mac
```

If you're on an Intel Mac, the path would be `/usr/local/bin/pinentry-mac` instead.

This is worth calling out: using a GUI pinentry like `pinentry-mac` instead of the text-based
`pinentry-curses` or `pinentry-tty` isn't just a cosmetic preference --
it's a practical requirement if you use AI coding tools like
[Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview)
that execute Git commands on your behalf.
I used to use the text-based pinentry in my terminal,
but when Claude Code runs `git commit` it spawns the process in a way where the terminal-based
pinentry can't grab the TTY to prompt you for your PIN.
With `pinentry-mac`, the PIN dialog pops open as a native macOS window regardless of which process
triggered the commit, so signing works seamlessly whether you're committing manually or through an
AI assistant.

You may also want to set `no-tty` in your GPG config,
which further ensures GPG doesn't try to interact with the terminal directly --
this complements the GUI pinentry approach:

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

If your YubiKey is **not** plugged in, the commit will fail --
this is the intended behavior, because the private key only exists on the hardware token.

## Setting Up on a New Machine

Getting your initial key generated and moved onto the YubiKey is a one-time thing.
But when you get a new machine -- or reinstall your OS --
you need to get the new machine to recognize the key that's already on your YubiKey.
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
you can export it to a keyserver ahead of time:

```bash
# Upload to a public keyserver (do this from your current machine)
gpg --keyserver keys.openpgp.org --send-keys YOUR_KEY_ID
```

Then on the new machine, import it directly:

```bash
gpg --keyserver keys.openpgp.org --recv-keys YOUR_KEY_ID
```

Alternatively, keep your public key (not your private key!) in a place you can
easily access -- a private GitHub gist, a cloud drive, or even committed to your dotfiles repo.

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

If you added an authentication subkey to your YubiKey, you can also use it for SSH.
Add this to your `gpg-agent.conf`:

```text
enable-ssh-support
```

And add this to your shell RC:

```bash
export SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)
```

Then add your authentication key's "keygrip" to `~/.gnupg/sshcontrol`:

```bash
# Find the keygrip
gpg --list-keys --with-keygrip YOUR_KEY_ID

# Add the authentication subkey's keygrip to sshcontrol
echo "YOUR_AUTH_KEYGRIP" >> ~/.gnupg/sshcontrol
```

Now `ssh-add -L` will show your GPG-backed SSH key,
which you can add to GitHub, servers, etc.

## Closing Thoughts

This setup has served me well for years.
The day-to-day experience is simple: plug in the YubiKey, commit code, enter the PIN when prompted.
The security benefit is significant --
your signing key never exists as a file that could be stolen or accidentally leaked.

The initial setup is admittedly a bit involved, especially the key generation and subkey-to-card
transfer steps,
but it's a one-time cost that pays dividends in the form of verified commits and peace of mind.
