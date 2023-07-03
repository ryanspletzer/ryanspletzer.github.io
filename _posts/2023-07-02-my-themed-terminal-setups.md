---
layout: post
title: My Themed Terminal Setups and Source Controlling Dotfiles
date: 2023-07-02 00:00:00
description: >
  People have been wondering about how I created my themed terminal setups, so I thought I'd make a post about it.
tags:
 - terminals
 - powershell
 - zsh
 - bash
 - oh-my-posh
 - dotfiles
 - nerd-fonts
---

People have been wondering about how I created my themed terminal setups, so I thought I'd make a post about it.

I've also found an approach in all this to source control my dotfiles, which I'll dig into in this post.

I have themed terminal setups for both macOS and Windows, so I've got repos with dotfiles and approaches for both.
(This setup is also possible to do on Linux / WSL, just haven't gotten around to it.)

## Inspiration

First off, credit where credit is due: [Scott Hanselman](https://www.hanselman.com/) has a number of
[posts](https://www.hanselman.com/blog/my-ultimate-powershell-prompt-with-oh-my-posh-and-the-windows-terminal) about
this which I recommend checking out, as they were the original inspiration for my terminal setups.

If you're interested in getting a similarly themed setup, read on...

![My Themed Terminal](/assets/images/my-themed-terminal.png)

## Package Managers

I use package managers for everything -- [Chocolatey](https://community.chocolatey.org/) on Windows and
[Homebrew](https://brew.sh/) on macOS. (I'll probably get into
[winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/) at some point, just not yet.)

I also use [PowerShellGet](https://www.powershellgallery.com/packages/PowerShellGet) for PowerShell modules and
recommend getting the latest version of that installed in your PowerShell environment.

The rest of this post assumes you're knowledgeable with these package managers and able to get them installed.

## Source Controlling Dotfiles

I found an approach for source controlling dotfiles in my home directory with git -- the trick is to do a `.gitignore`
file that ignores everything _by default_ and selectively _un-ignoring_ files under certain paths.

Turning your home directory into a git repo itself is a bit convoluted to get going at first, but once I figured it out,
I was very happy with it, since I could update my dotfiles and commit changes to them and push them up right away.

Because my dotfiles can and do change frequently, I won't go into exhaustive detail here on them, but instead point to
the repos where I have them. The root of these repos represents the root of my home directory on the respective
platform.

My dotfiles for macOS are [here](https://github.com/ryanspletzer/macos-dotfiles/).

My dotfiles for Windows are [here](https://github.com/ryanspletzer/windows-dotfiles/).

A few things I want to note about these dotfiles:

* On macOS, I've got dotfiles for PowerShell (pwsh), zsh, and bash. I'm most familiar with PowerShell so the most robust
  setup is there, and it is my default shell on mac. If you have notes about how to make my zsh and bash setups better,
  send me a message, but have tried to replicate a lot of the auto-complete/history setups there similar to what I have
  in PowerShell, but I consider PowerShell to be the best setup I've been able to get so
* On Windows, it's a bit of an insane story with the number of places that PowerShell profiles can be when you're using
  OneDrive personal and/or OneDrive for Business (since PowerShell looks for the profile in the Documents direcory and
  adding OneDrive to the mix likely moves where that directory is), so in order to accommodate whatever Windows machine
  I'm on, I've put my PowerShell profile in the standard location for PowerShell 7+, and simply dot-source that profile
  from all the other potential profile locations. This also results in a really insane `.gitignore` file on that
  platform, but it is what it is.

Note that if you're trying to follow this setup, the presence of these dotfiles will try to load things that don't exist
yet if you haven't installed the right packages, so follow along next for that. Speaking of which...

## Dev Machine Setup Scripts

I highly recommend you get into the practice of maintaining a dev machine setup script which installs all the tools you
need to be productive on a given machine. This is something I've been doing personally for years and it makes getting
set up on new machines a breeze, to the point where I basically just run it, and then pull down my dotfiles to my home
directory, then I'm done.

Oh and, just take notes on your setups, too -- there's things that inevitably can't be scripted that you'll want to
customize on a new machine, and you'll thank yourself later when you have those notes.

## macOS

I recently got a new mac and therefore have been spending a lot of time on that side of the house fine-tuning things, so
I'll start there.

### 1. Practice in a macOS VM

If you have [Parallels](https://www.parallels.com/) or some other type of VM tool, you may want to practice this setup
there to not disturb your host machine until you know you have something you like. You can run a guest macOS VM on macs,
so that's handy.

### 2. Get PowerShell

I use PowerShell everywhere, even on macOS. You may be fine with just zsh, and that's ok. If you want to use PowerShell,
install it via [Homebrew](https://formulae.brew.sh/cask/powershell).

I go a radical step further on macOS and set this as my default shell. I've seen people also do this on Linux as their
daily driver who are living their best life.

### 3. iTerm2

First off, on mac, get yourself a better terminal. I use [iTerm2](https://iterm2.com/) which can be installed with
[Homebrew](https://formulae.brew.sh/cask/iterm2).

### 4. Nerd Fonts for macOS

Next, install some [Nerd Fonts](https://www.nerdfonts.com/) -- you'll need these for special icons in your prompt. I use
Cascadia Code (which for reasons I'll spare has a different name for the actual font name). If you wish you can install
all the different Nerd Fonts with a helper script like
[this](https://gist.github.com/davidteren/898f2dcccd42d9f8680ec69a3a5d350e), or just install the one you want.

Note that as of Nerd Fonts 3 you'll find a number of icons have moved in terms of their names so I customized the Oh My
Posh theme (more on that in a second) to fix a number of things there based on one of the default themes. I can't say
I've hit 100% of the icons I might run into, but I've at least fixed what I've found so far through using it for a
while.

Once you have your preferred font installed, change iTerm2 to use it under Settings > Profiles > Text.

### 5. Oh My Posh for macOS

[Oh My Posh](https://ohmyposh.dev/) is an amazing prompt theming engine for any shell. It started as a theming engine
for PowerShell, then grew from there. I've found it to be _better_ than Oh My Zsh, Oh My Bash, and Oh My Fish, for all
the shells I use, and I love that it is a one-stop-shop solution versus trying to theme individual shells. (I stopped
trying to set up Fish a while back since between zsh, bash, and PowerShell, I have enough shells.)

Install Oh My Posh via [Homebrew](https://formulae.brew.sh/formula/oh-my-posh).

I have my theme JSON file for Oh My Posh at a standard location in my home directory, and it's the same theme file for
both macOS and Windows.

### 6. Extra: Terminal-Icons for macOS

This applies only to PowerShell: there's a great module called
[Terminal-Icons](https://www.powershellgallery.com/packages/Terminal-Icons) which you can install from the
PowerShell Gallery, and doing so will give you some nice icons when listing items in the current directory.

Note that to see this on macOS you have to run Get-ChildItem, since your regular `ls` call on that platform uses the
native binary. (On Windows with PowerShell running `ls` will show the icons, since in that shell on Windows `ls` is an
alias for the `Get-ChildItem` cmdlet.)

One caveat: at the time of this writing, Nerd Fonts 3 was pretty new on the scene, and Terminal-Icons had not yet
released a new version to the PowerShell Gallery; the commits to fix this are in trunk in that repo, there's just not a
new version on the gallery yet. In the meantime, I applied a patch from another PR and put it into a fork
[here](https://github.com/ryanspletzer/Terminal-Icons/tree/feature/nf-3-patch), which can be cloned locally. Part of
that branch is an update to `build.ps1` to add a Publish step, to publish to a local PSRepository I set up. To do that,
you can make a directory in home at `~/PSRepository`, and run:

```powershell
Register-PSRepository -Name Local -SourceLocation /Users/yourusername/PSRepository -PublishLocation /Users/yourusername/PSRepository -InstallationPolicy Trusted
```

Then run the following to "publish" the module to your local repository:

```powershell
# This will prompt for a credential -- just give it something fake.
./build.ps1 -PSGalleryApiKey (get-credential abc) -Verbose
```

Then Install the module from your local repository:

```powershell
Install-Module -Name Terminal-Icons -Repository Local
```

If you don't want to go through all that, you can just install the latest version of your desired font from Nerd Fonts 2
through Homebrew, until a new version of Terminal-Icons is published to the gallery.

### 7. PSReadline and Other Interactive Prompt Helpers for zsh, bash

If you're using PowerShell you'll want to get the latest
[PSReadline](https://www.powershellgallery.com/packages/PSReadLine) and add some things to your profile to get
predictive autocomplete from history in a list view. (Once installed see the profile in the repos above for how to turn
this on.)

I have similar setups for zsh and bash via these Homebrew packages, though in playing around I may have turned some of
them off. Try installing these and taking a look at my `.zshrc` and `.bashrc` and related files in the macOS repo above
to get an idea of the current setup for these. Oh also you'll want to get the latest bash from Homebrew, because the
built-in bash in macOS is old and won't handle most things. (Though these days I don't use bash much on macOS, just
pwsh and zsh.) I'm open to feedback on how to make these zsh and bash setups better since I'm not a deep expert in this
area, so if you think this can be improved, shoot me a message.

```text
bash-completion@2
bash-git-prompt
fzf
zsh-autocomplete
zsh-autosuggestions
zsh-history-substring-search
zsh-syntax-highlighting
```

### 8. Put Dotfiles in Place for macOS

The last step is to put your dotfiles in place. I have example .zshrc, .bashrc and PowerShell profile files in the repos
linked above, as well as the Oh My Posh JSON theme files.

## Windows

Windows is largely the same approach to set up as macOS above.

### 1. Practice in a Windows VM

You can practice this in a Windows VM, either with Hyper-V or with the
[Windows Sandbox](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview)
feature.

### 2. PowerShell

Windows PowerShell 5.1 is built into Windows itself, but if you want the latest and greatest features you'll want to go
grab the latest PowerShell, ideally by installing it via
[Chocolatey](https://community.chocolatey.org/packages/powershell-core).

### 3. Windows Terminal

[Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) is already the default on the
latest Windows 11 builds, but if you're not on one of those builds or on Windows 10, you'll have to go get this from the
app store.

### 4. Nerd Fonts for Windows

Install one via Chocolatey -- I like [Cascadia Code](https://community.chocolatey.org/packages/nerd-fonts-CascadiaCode).

Once installed, set it as your font in Windows Terminal.

### 5. Oh My Posh for Windows

Install Oh My Posh via [Chocolatey](https://community.chocolatey.org/packages/oh-my-posh).

I have my theme JSON file for Oh My Posh at a standard location in my home directory, and it's the same theme file for
both macOS and Windows.

### 6. Extra: Terminal-Icons for Windows

These steps are largely the same as macOS (see above). Get
[Terminal-Icons](https://www.powershellgallery.com/packages/Terminal-Icons) and add the necessary item to your profile
(example in repos above).

Note that on Windows the `ls` command in PowerShell is an alias for `Get-ChildItem` so running that will show you all
the fancy icons when listing items in a directory.

### 7. PSReadline Interactive Prompt Helpers

This is largely the same as for macOS above. Get the latest
[PSReadline](https://www.powershellgallery.com/packages/PSReadLine) module in PowerShell.

### 8. Put Dotfiles in Place for Windows

The last step is to put your dotfiles in place. I have example PowerShell profile files in the repos linked above, as
well as the Oh My Posh JSON theme files.
