---
layout: post
title: A No-Nonsense Guide to GPG Signing with YubiKey
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

I'm a big believer in the secure software supply chain,
and this starts with you on your local machine.

GPG-signed Git commits prove that code actually came from you,
and storing your signing key on a YubiKey means the private key never touches your filesystem.
This guide walks through setting it all up on macOS, Windows, and Ubuntu.

## Why Bother?

If you've ever looked at a commit on GitHub and noticed the green "Verified" badge,
that's GPG signing at work.
Without it, anyone can set `user.name` and `user.email` in their Git config to whatever they want --
there's nothing stopping someone from committing as you.

Signing with GPG attaches a cryptographic proof to each commit that it came from the holder of a
specific private key.
And if that private key lives on a hardware token like a YubiKey,
it can't be exfiltrated by malware or accidentally copied --
the signing operation happens on the YubiKey itself,
and you physically confirm it by touching the device or entering a PIN.

## Overview / TL;DR

The setup involves three layers:

1. **GPG key pair** -- a master key (certify) with subkeys for signing, encryption, and optionally
   authentication
2. **YubiKey** -- the signing subkey gets moved onto the hardware token so it never exists on disk
3. **Git configuration** -- tell Git to use GPG and point it at your signing subkey

The end result: every `git commit` triggers a PIN prompt (or touch) on your YubiKey,
and the commit gets a cryptographic signature that GitHub (or any verifier) can check against your
public key.

## Credits and Caveats

I've been using this setup since 2018 and have accumulated around 920 signatures on my current
YubiKey.
The approach below is opinionated -- there are other valid ways to do this,
including using `ed25519` keys instead of RSA,
or using SSH signing instead of GPG (which GitHub also supports now).
If you already have a workflow that works for you, this guide may not be for you.

I'll break things down between macOS, Linux (Ubuntu), and Windows,
similar to my
[Python environments guide](/2024/04/a-no-nonsense-guide-to-setting-up-python-environments/).

## Prerequisites

Before diving in, you'll need:

- A [YubiKey](https://www.yubico.com/products/) that supports OpenPGP
  (YubiKey 5 series or newer is recommended; older YubiKey 4 works too)
- A computer with a USB port (or USB-C, depending on your YubiKey model)
- Some comfort with the command line

## Step 1: Generate Your GPG Key Pair

If you don't already have a GPG key pair, you'll need to generate one.
If you already have one, skip ahead to
[Step 2: Move the Signing Subkey to Your YubiKey](#step-2-move-the-signing-subkey-to-your-yubikey).

The recommended approach is to generate a master key with **Certify** capability only,
then add separate subkeys for **Sign**, **Encrypt**, and optionally **Authenticate**.
This way, if a subkey is ever compromised, you can revoke just that subkey without losing your
entire identity.

### macOS

```bash
# Install GnuPG via Homebrew
brew install gnupg

# Generate a master key -- choose RSA 4096 and Certify only
# The interactive prompts will walk you through this
gpg --full-generate-key --expert
```

During the interactive prompts:

1. Choose **(8) RSA (set your own capabilities)** and toggle off everything except **Certify**
2. Set key size to **4096**
3. Set an expiration (I use 10+ years, but you can always extend it later)
4. Enter your name and email address
5. Set a strong passphrase -- you'll need this to manage the key,
   but day-to-day signing will use your YubiKey PIN

Now add a signing subkey:

```bash
# Replace YOUR_KEY_ID with your master key ID from the output above
gpg --expert --edit-key YOUR_KEY_ID

# In the GPG prompt:
# gpg> addkey
# Choose (4) RSA (sign only), 4096 bits, set expiration
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
If your YubiKey is plugged in, you'll be prompted for your PIN (or a touch, depending on your
YubiKey's touch policy settings).

If your YubiKey is **not** plugged in, the commit will fail --
this is the intended behavior, because the private key only exists on the hardware token.

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

### Switched computers or reinstalled OS

You'll need to import your public key and then tell GPG to look for the private key on the card:

```bash
# Import your public key
gpg --import /path/to/your-public-key.asc

# Tell GPG to check the card for private keys
gpg --card-status

# Trust the key
gpg --edit-key YOUR_KEY_ID
# gpg> trust
# Choose 5 (ultimate)
# gpg> save
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
