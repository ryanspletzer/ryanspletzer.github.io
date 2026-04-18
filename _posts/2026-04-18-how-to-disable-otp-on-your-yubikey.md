---
layout: post
title: How to Disable OTP on Your YubiKey
date: 2026-04-18 00:00:00
description: >
  That mysterious string of characters someone just pasted into Slack?
  That's a YubiKey's OTP slot firing.
  Here's how to disable it via the ykman CLI or YubiKey Manager GUI,
  and why it won't affect FIDO2, OpenPGP, or anything else you actually use.
tags:
 - security
 - yubikey
---

<!-- TODO: Add header image (telegraph / obsolete tech metaphor from Wikimedia Commons)
Suggested search: "telegraph operator" or "telegraph key" on Wikimedia Commons.
Some candidates:
  - File:Telegrafista.jpg (telegraph operator, 1908)
  - File:J38TelegraphKey.jpg (telegraph key)
  - File:Telephone_switchboard.jpg (old switchboard)
Save to assets/images/ and replace this block with:
![Alt text](/assets/images/FILENAME.jpg)
*Attribution, date. Institution. Public domain,
via [Wikimedia Commons](URL)*
-->

If you've spent any amount of time in a Slack workspace
where people use YubiKeys,
you've seen it:
suddenly a message appears in a channel that looks something like this:

`ccccccgkgdkvvvjvfblbbdihehndrvjkutduvftrgubfc`

If you're not familiar with YubiKeys, this looks like gibberish—maybe
someone's cat walked across the keyboard,
or they fell asleep with their face on the keys.
But if you *are* familiar with YubiKeys,
you know exactly what happened:
they bumped the sensor on their key,
and the OTP (One-Time Password) slot fired a
[Yubico OTP](https://developers.yubico.com/OTP/) string
directly into whatever text field had focus at the time.

I have personally witnessed this more times than I can count.
My response is always the same—I
react to the message with the Yubico emoji.[^yubico-emoji]
Some people see my reaction and immediately know what happened.
Others are genuinely confused,
both by the mystery string they just broadcasted
and by my cryptic emoji response.
It's a near-universal YubiKey user experience,
and it's entirely preventable.

If you're here, you probably want to stop this from happening.
Good news: it takes about 30 seconds.

* TOC
{:toc}

## Quick Reference

If you just want the fix and don't need the backstory,
here you go.

### Via ykman (CLI)

First, install the
[YubiKey Manager CLI](https://developers.yubico.com/yubikey-manager/)
if you haven't already:

```bash
# macOS
brew install ykman

# Ubuntu / Debian
sudo apt install -y yubikey-manager

# Windows (Chocolatey)
choco install yubikey-manager -y

# Windows (winget)
winget install Yubico.YubiKeyManager
```

Then, with your YubiKey inserted, disable OTP on the USB interface:

```bash
$ ykman config usb --disable OTP
USB configuration changes:
  Disable Yubico OTP
  The YubiKey will reboot
Proceed? [y/N]: y
USB application configuration updated.
```

And if your YubiKey has NFC, disable OTP there too:

```bash
$ ykman config nfc --disable OTP
NFC configuration changes:
  Disable Yubico OTP
  The YubiKey will reboot
Proceed? [y/N]: y
NFC application configuration updated.
```

That's it.
No more accidental OTP strings.
Read on for the GUI method, more context, or to understand what you just did.

### Via YubiKey Manager (GUI)

If you'd rather not use the command line, Yubico provides a graphical application:

1. Download and install
   [YubiKey Manager](https://www.yubico.com/support/download/yubikey-manager/)
   (available on macOS, Windows, and Linux,
   and you can also get this through package managers like Homebrew and Chocolatey)
2. Open YubiKey Manager and insert your YubiKey
3. Click **Interfaces** in the left sidebar
4. Under **USB**, uncheck **OTP**
5. If your YubiKey supports NFC, under **NFC**, uncheck **OTP** as well
6. Click **Save Interfaces**

Done.
The application will confirm the change,
and your YubiKey will no longer emit OTP strings on touch.

## Disabling OTP vs. Removing the Credential

There are actually two different things you can do here,
and it's worth understanding the distinction.

**Disabling the OTP application** is what the Quick Reference section above does.
This turns off the entire OTP interface at the transport level—USB
and/or NFC.
The YubiKey no longer presents an OTP interface to the host at all.
The credential that was in the slot still exists on the key,
but it's completely inaccessible.
This is the recommended approach if you don't use OTP for anything.

**Removing the slot credential** is a more surgical option.
Your YubiKey has two OTP slots:
Slot 1 (short touch, 1–2.5 seconds)
and Slot 2 (long touch, 3–5 seconds).
The accidental-OTP problem is almost always Slot 1 firing on a brief touch.
You can remove just that credential while leaving the OTP application enabled:

```bash
$ ykman otp info
Slot 1: programmed
Slot 2: empty

$ ykman otp delete 1
Do you really want to delete the configuration of slot 1? [y/N]: y
```

After this, touching the sensor briefly does nothing—Slot
1 is empty, so there's no credential to fire.
But the OTP application itself is still active,
which means you could program a new credential into either slot later
if you wanted to.

You can check the current state of your slots at any time
with `ykman otp info`.

**When to use which:**
if you never use OTP for anything—and
most people don't—disable
the entire application.
If you want to keep one slot active
(say, a static password in Slot 2)
but stop the accidental Slot 1 misfires,
just delete the Slot 1 credential.

## What This Doesn't Affect

This is the part where I reassure you
that you're not breaking your YubiKey.

Disabling OTP has **zero effect** on any of the other applications
on your key.
YubiKey applications are independent modules,
and turning one off doesn't touch the others:

* **FIDO2/WebAuthn** — passkeys, hardware security keys for web authentication.
  This is what the industry has moved to, and it has nothing to do with OTP.
* **OpenPGP** — GPG commit signing, encryption, and authentication.
  If you followed my
  [GPG commit signing guide](/2026/04/a-no-nonsense-guide-to-gpg-commit-signing-with-a-yubikey/),
  none of that is affected.
* **PIV** — smart card authentication, certificate-based auth.
  Unrelated to OTP.
* **OATH** — TOTP and HOTP via the
  [Yubico Authenticator](https://www.yubico.com/products/yubico-authenticator/) app.
  This is a common source of confusion—the
  OATH application is a *completely separate module*
  from the OTP application,
  even though the names sound similar.
  Disabling OTP does not affect your TOTP codes in Yubico Authenticator.

## Re-Enabling OTP

Disabling OTP is fully reversible.

If you ever need OTP back—and
I'm struggling to imagine why you would,
but who am I to judge—the
process is straightforward.

Via ykman:

```bash
# Re-enable OTP over USB
ykman config usb --enable OTP

# Re-enable OTP over NFC
ykman config nfc --enable OTP
```

Via the GUI: same steps as before,
but check the OTP box instead of unchecking it.

If you went the slot-credential route
and deleted the Yubico OTP credential from Slot 1,
you can reprogram it:

```bash
ykman otp yubiotp 1 --serial-public-id --generate-private-id --generate-key
```

This generates a new Yubico OTP credential
and programs it into Slot 1.
Note that this is a *new* credential—the
old one is gone—so
you would need to re-register it with any services
that relied on the previous Yubico OTP credential.[^re-registration]

## What OTP Actually Is (And Why You Probably Don't Need It)

If you're still reading,
you might be curious about what exactly you just turned off,
and why it existed in the first place.
The OTP application on a YubiKey supports several different credential types,
and the terminology can be confusing
because "OTP" gets used to mean different things
in different contexts.

### Yubico OTP

This is the default.
Every YubiKey ships with a Yubico OTP credential pre-programmed into Slot 1,
and it's the thing that fires when you accidentally touch the sensor.

When the slot fires, the YubiKey types a 44-character string
that encodes the key's identity and a counter,
encrypted with a symmetric key
that's shared with
[Yubico's validation servers (YubiCloud)](https://www.yubico.com/products/yubicloud/).
A service that wants to verify the OTP sends it to YubiCloud,
which decrypts it,
checks the counter to prevent replay attacks,
and responds with a pass or fail.[^yubicloud-validation]

That pre-programmed Slot 1 credential is registered with YubiCloud at the factory—which
is what makes Yubico OTP work out of the box,
but also means the symmetric key exists on Yubico's servers from day one.
This is fine for the threat model the protocol was designed around,
but it's another reason the industry has converged on public-key approaches
like FIDO2 where no copy of your secret lives anywhere but on the key itself.

This was genuinely useful in the pre-FIDO2 era.
Before WebAuthn became a standard,
Yubico OTP was one of the best options available
for hardware-backed two-factor authentication.
Some services still support it—Yubico's
own forums being a notable example—but
the list has been shrinking for years
as the industry has converged on FIDO2/WebAuthn.

The name "YubiKey" itself is a reference to this feature—"Yubi"
comes from "ubiquitous,"
and the original product, released in 2008, was an OTP token only.

### Static Password

A YubiKey OTP slot can also be configured to hold a static password—a
fixed string that gets typed every time you touch the sensor.
This is essentially a hardware-stored password.

It's the simplest credential type:
no cloud validation, no counters, no encryption.
Just a string that gets typed.
Some people use this as a component of a passphrase—the
YubiKey types a long random portion,
and they type a memorized prefix or suffix.
In practice, this is rarely used,
and FIDO2/WebAuthn is a far better solution for authentication.

### OATH HOTP

OTP slots can also hold
HMAC-based One-Time Password (HOTP) credentials,
as defined in [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226).
These are counter-based: each touch generates the next code in a sequence.

This is distinct from the *OATH application* on the YubiKey,
which is a separate module that can store
many TOTP and HOTP credentials
and is accessed via the Yubico Authenticator app rather than
through the OTP slot.
If you have an HOTP credential in an OTP slot,
disabling the OTP application *will* disable it—but
the OATH application remains unaffected.

### OATH TOTP (A Common Source of Confusion)

Time-based One-Time Passwords
([RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238))
**cannot** be generated via the OTP slots.
The YubiKey lacks a real-time clock,
so it can't compute time-based codes on its own.

TOTP is instead handled by the separate **OATH application**
on the YubiKey.
The YubiKey stores the TOTP secrets,
and the
[Yubico Authenticator](https://www.yubico.com/products/yubico-authenticator/) app
on your computer or phone provides the clock
and displays the codes.
This is an entirely different module from OTP—disabling
the OTP application has no effect on your TOTP codes.

This is probably the single biggest point of confusion around YubiKey OTP.
People hear "I'm disabling OTP" and panic about their authenticator codes.
The OATH application and the OTP application have nothing to do with each other.

### Why FIDO2/WebAuthn Replaced All of This

[FIDO2/WebAuthn](https://fidoalliance.org/fido2-2/fido2-web-authentication-webauthn/)
is the modern standard for hardware-backed authentication,
and it fixes the problems
that every OTP-based approach has:

* **Phishing-resistant by design** — the credential is
  [origin-bound](https://www.w3.org/TR/webauthn-3/#sctn-rp-id),
  meaning the browser will not submit it to a lookalike domain.
  OTP credentials have no concept of origin—they're
  just strings that get pasted wherever you're typing,
  which is, incidentally, the entire problem this post is about.
* **No shared secrets** — FIDO2 uses public-key cryptography.
  The private key never leaves the hardware token.
  Yubico OTP requires a symmetric key
  shared between the YubiKey and YubiCloud,
  which means there's a copy of the secret on Yubico's servers.
* **No third-party validation service** — FIDO2 verification happens
  directly between the service you're logging into and the authenticator.
  Yubico OTP requires the service to send the OTP to YubiCloud
  for validation.
* **Built into everything** — every major browser, operating system,
  and a rapidly growing number of services support WebAuthn natively.

The OTP application on your YubiKey is a legacy feature.
It was useful in its time, but that time has largely passed.
Disabling it doesn't remove any functionality you're likely using—it
just stops the key from doing the one thing
that annoys everyone.

<!-- markdownlint-disable-next-line MD022 -->
## Footnotes
{:.no_toc}

[^yubico-emoji]:
    If your Slack workspace doesn't have a Yubico emoji,
    I highly recommend adding one.
    It's the most efficient way to acknowledge
    what just happened without having to explain it.

[^yubicloud-validation]:
    Yubico OTP validation requires network access to YubiCloud
    (or a self-hosted validation server).
    This is another reason the protocol has fallen out of favor—it
    requires the service to call out to Yubico just to verify the credential.
    Yubico does provide
    [open-source validation server software](https://developers.yubico.com/yubikey-val/)
    for self-hosting, but very few organizations go that route.

[^re-registration]:
    The Yubico OTP credential is generated from a unique key pair.
    If you delete and regenerate it,
    the new credential will have different keys,
    so any service that was validating the old credential
    won't recognize the new one.
    You would need to re-register the YubiKey with those services.
    This is one more reason to prefer disabling the OTP application
    over deleting the slot credential—if
    you ever need the credential again,
    re-enabling the application restores the original credential
    since it was never deleted from the key.
