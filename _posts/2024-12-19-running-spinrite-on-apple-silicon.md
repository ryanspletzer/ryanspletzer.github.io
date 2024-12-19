---
layout: post
title: Running SpinRite on Apple Silicon
date: 2024-12-19 00:00:00
description: >
  I was trying to run SpinRite 6.1 on some drives from an old Drobo 5N NAS that bit the dust a few years back, but I
  didn't have an x86 machine handy, but after a bit of research I found a very elegant way to do this with QEMU.

tags:
 - spinrite
 - qemu
 - apple-silicon
 - macOS
---

I was trying to run SpinRite 6.1 on some drives from an old Drobo 5N NAS that bit the dust a few years back, but I
didn't have an x86 machine handy, so after a bit of research I found a very elegant way to do this with QEMU on macOS.

Allow me to provide a little more background for those who may not know what I'm talking about...

In my opinion, Steve Gibson's [SpinRite](https://www.grc.com/sr/spinrite.htm) is the best hard drive maintenance and
recovery utility out there, and the way you use it is by booting it from removable media (typically, a USB thumb drive,
although in the distant past I remember running it off these things we call "CD's"). The SpinRite program itself runs
using FreeDOS.

As time has progressed, though, machines have moved to UEFI booting instead of BIOS, and on top of that many machines
have moved away from x86 architectures to ARM architectures, like Apple Silicon on macs, and now increasingly, ARM on
Windows, and given that SpinRite needs legacy BIOS boot methods and an x86 chipset to run, it's becoming more
challenging to get it going these days.

We're looking at getting a new NAS in place at our house in the near future, and I had old drives from a prior NAS (a
Drobo 5N that ceased to function several years back) which I wanted to dust off and run through SpinRite in anticipation
of using them in a new NAS.

I recently did a purge of old devices and I no longer had an Intel/AMD x86/x64 machine handy anymore, and short of
getting a small Intel compute stick or something, I wanted to see if I could somehow emulate what was necessary to have
SpinRite 6.1 run on my M2 MacBook Pro.

After a little while of research and some back and forth with ChatGPT, I found the solution in the form of
[QEMU](https://www.qemu.org/), which I installed via Homebrew:

```bash
brew install qemu
```

(I also looked at [UTM](https://mac.getutm.app/) which is another great app that wraps QEMU with a nice UI, but due to
some quirks on macOS -- primarily the fact that you can't run it elevated with `sudo` to get the proper drive access
since the app doesn't work properly that way -- I had to pivot.)

Now, in order to get a SpinRite 6.1 ISO file in the proper format for use with QEMU, I did have to temporarily boot up
Windows 11 in Parallels and run spinrite.exe to create that image (BUT, see next, you don't need to do this, there's a
simpler way to do this). This ISO conversion was just a one-time exercise, as I have the ISO stored in my OneDrive for
later use.

However, for purposes of this blog post, I didn't want folks to have to go through setting up a full Windows VM one time
just to do the .img to .iso conversion, and though I tried several mac-native commands to try to get the conversion just
right, none of them worked specifically for SpinRite.

So, I resorted to installing [Wine](https://www.winehq.org/) via Homebrew and using
that to run `spinrite.exe` to prove out creating the ISO in a less heavy way that doesn't involve running a full
Windows 11 VM. (Note that Wine is one of those apps that macOS is going to initially block for "safety" reasons, but
since you hopefully know what you're doing, you can go to Privacy & Security in Settings and click "Open anyway.")

```bash
brew install wine-stable
wine spinrite.exe # Opens the SpinRite GUI app and lets you make an ISO; close once done
```

Before you go fire up your QEMU emulator, first you should insert your storage media you're going to run SpinRite on,
then _eject_ it through Finder, but leave the physical drive inserted -- yes, it needs to be not mounted to the host
macOS operating system so that QEMU can attach to it. (Alternatively you can do `diskutil list` to see what your disk
number -- in my case it was `/dev/disk4` -- then do `diskutil unmount /dev/disk4` to unmount it.) If you forget to do
this, QEMU will say `qemu-system-x86_64: Could not open '/dev/disk4': Resource busy`. Also note that after quitting
QEMU, macOS will immediately re-mount the drive...

Finally, run QEMU (with `sudo`, which is necessary so it can get at the drive -- as always do this with caution and only
if you're comfortable), providing the correct path to `SpinRite.iso`. Note that the ISO path is _case-sensitive_ --
beyond the obviousness of macOS being a case-sensitive file system, I say this because `spinrite.exe` will output
`SpinRite.iso` with uppercase `S` and `R`, and that might trip someone up.

```bash
sudo qemu-system-x86_64 -drive file=/dev/disk4,format=raw -cdrom /Users/username/Desktop/SpinRite.iso -boot d
```

Voilà:

![SpinRite running on macOS under QEMU](/assets/images/spinrite-on-macos.png)

Hopefully, this saves someone out there some time from having to go through the same steps I did to figure this out.

As a caveat, if it wasn't obvious, this solution does not work against your actual hard drive of your mac itself, but it
at least is a good middle ground for servicing other drives that you may have.

As another caveat, SpinRite 6.1 may give a new message (as of the 6.1 version) about an inability to create an `SRLOGS`
directory and write to it -- I suspect that is due to the way it is being launched from a bootable read-only ISO image
which is presented to the guest OS as a CD-ROM, and unlike a bootable USB drive, it cannot be written to. I'm used to
running SpinRite 6.0 from the past sans logs, so I did not fret too much about not having those for this exercise. Steve
Gibson is planning formal UEFI boot support for SpinRite 7 which should hopefully allow even booting from a mac, which
would solve for this in the future.

Is this the most performant way to run SpinRite? Maybe not. I'm not certain of the performance hit that might occur going
through the x86 translation layer of QEMU. But regardless, if utter performance is not a concern, (meaning, you're maybe
willing ot wait a little longer for SpinRite to process a drive), it certainly is a great fallback approach to having to
seek out x86 hardware in an increasingly ARM-based world.

Happy spinning, and Happy Holidays! 💿
