---
layout: post
title: A No-Nonsense Guide to Setting Up Python Environments
date: 2024-04-29 00:00:00
description: >
  Python has become the lingua franca for developing various AI/ML solutions (and more), but getting started with
  setting up a proper Python environment can be tricky and involve several hours of research or asking colleagues how
  they go about it, and many "getting started with Python" guides tend to gloss over these aspects, which is why I hope
  in this post to give a no-nonsense, guide to setting up Python environments.

tags:
 - python
 - environments
---

Python has become the lingua franca for developing various AI/ML solutions (and more), but getting started with setting
up a proper Python environment can be tricky and involve several hours of research or asking colleagues how they go
about it, and many "getting started with Python" guides tend to gloss over these aspects, which is why I hope in this
post to give a no-nonsense guide to setting up Python environments.

## Overview / TL;DR

The prescriptive setup outlined below involves installing the `pyenv` and `pyenv-virtualenv` equivalents for the
respective operating system platform to manage global Python version installations and subsequent local Python virtual
environments, respectively.

Why do you want to do this? The answer is: isolation -- you ideally want a standalone Python environment, with its own
installed packages, and _avoid_ using a global Python environment and set of globally installed packages.

## Credits and Caveats

My own internet research aside, I would like to credit my teammates who are experts in this area who have given me a lot
of pointers and helpful opinons on what works well. My first exposure to Python was well over a decade ago in college
with 2.7, before `pyenv` even existed, and thus I've been up-revving my mental models of Python environment management
to match the current state of the world and how many developers prefer to set up their local Python dev environments.

As a result, this will hopefully be a distillation that should save you a few hours of searching around and reading and
forming your own opinions, to give you an opinionated way to quickly get started with Python environments.

I will break things down between macOS, Linux, and Windows.

I will also say up-front that your preferred methodology may not match this, as you may be using different tools or
techniques like containerization with Docker or tools like Conda or `venv` or `pipenv` or the standalone `virtualenv`
tools (even if some of these don't handle multiple Python versions); if you already have your own preferred way to set
up Python environments, then this guide isn't really for you. 🙂 (And I even reserve the right to change my mind later
as my own practices and opinions evolve.)

Sidebar: Containerization is quite handy regardless, because quite often the target for where you're going to run these
Python workloads is a container-based one; but even then, having native Python environments on your native OS platform
is still handy for flexibility and convenience, for instance for doing quick proofs-of-concept or for learning or simple
scripts, or, maybe you're developing a local Python application for distribution to a certain OS via something like
`pipx` and you want to mimic that environment explicitly.

Before diving into the setup steps, note that it is often helpful to "practice" and try these things out first in a
clean and temporary environment like a VM in Parallels on macOS or Hyper-V in Windows or some other virtualized
environment other than your main host machine, so you can easily start over if things get a little weird.

## macOS

On macOS, install [Homebrew](https://brew.sh/) if you haven't already -- note that this also installs Xcode Command Line
Tools, which is relevant in that installing Xcode Command Line Tools also installs a version of Python 3 at the time of
this writing. (Apple notably stopped bundling Python 3 with the base operating system in favor of this approach.)

You more than likely want to be able to try newer versions than that which comes with the Xcode tools -- for example,
the version on my machine is 3.9.6, but the latest version available is 3.12.3.

One way to get a new version of Python is to install it via homebrew directly, but *you do not have to do it this
way* -- instead you can install it via `pyenv` explicitly.

However, do note that the Python versions available via `pyenv` may lag slightly behind the latest available version
that can be installed directly via Homebrew; for example, at the time of this writing, the latest version of Python
available directly via Homebrew is 3.12.3, whereas via `pyenv` it's 3.12.2. (According to the `pyenv` GitHub repo,
3.12.3 will be released via `pyenv` soon, so it will wind up being about a six month delay.)

Also note that other Homebrew packages may depend on a specific version of Python, and as a result may install versions
of Python directly via Homebrew anyways, including packages like `awscli` and `pipx`. Despite this, you can still
override your global Python version with `pyenv` later to be a desired one, in the case that the latest Python installed
via Homebrew is a little too far ahead for your tastes, or if dependent tools are installing older versions and you want
a newer version.

With that all said, here's how you directly install a version of Python via Homebrew, noting that this will change the
global `python3` that is on your path away from the built-in system Python that ships with macOS Xcode tools -- again,
_YOU DON'T HAVE TO DO THIS_, this is just for illustration:

```bash
# ***YOU DON'T* HAVE TO DO THIS*** -- you can install the latest version of Python via pyenv later, but there may be a
# reason you want to get a version of Python installed directly via Homebrew, which is why it is touched on here.
brew install python@3.12
```

With that explanation and preamble out of the way, the remaining steps for macOS will describe the preferred path of
using `pyenv` and `pyenv-virtualenv`.

First install [pyenv](https://github.com/pyenv/pyenv):

```bash
# Install pyenv
brew install pyenv
```

And follow the instructions for
[Set up your shell environment for Pyenv](https://github.com/pyenv/pyenv?tab=readme-ov-file#set-up-your-shell-environment-for-pyenv).

Next, install [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv):

```bash
# Install pyenv-virtualenv
brew install pyenv-virtualenv
```

And follow the
[instructions](https://github.com/pyenv/pyenv-virtualenv?tab=readme-ov-file#installing-with-homebrew-for-macos-users)
for adding the line to your `.rc` file for your shell to automatically activate Python virtual environments when you
change into a given directory that contains a virtual environment.

Now you can install global versions of Python with `pyenv` and create local virtual environments in a given directory
with `pyenv-virtualenv`.

With that in place, let's say you have a repo at `~/git/my-repo` and want to create a virtual Python environment there
with the latest 3.11 patch version of Python -- this is how you would do it:

```bash
# Install latest patch version of Python 3.11 globally, which at the time of this writing is 3.11.9
pyenv install 3.11

# Change to repo directory
cd ~/git/my-repo

# Create a named Python virtual environment based on 3.11.9
pyenv virtualenv 3.11.9 my-repo-virtualenv-3.11.9

# Set that virtual environment to be used for the local Python version for your repo directory
pyenv local my-repo-virtualenv-3.11.9
```

If you've followed the steps for adding lines to your shell's `.rc` file for automatic activation of Python virtual
environments linked above, when entering this directory the virtual environment should automatically activate -- else,
you need to manually activate it with the following:

```bash
# Change to repo directory
cd ~/git/my-repo

# Activate the virtual environment
pyenv activate

# Deactivate when you are done
pyenv deactivate
```

## Linux

The process for Linux distributions is going to feel awfully similar to macOS, with the exception that different package
managers are involved (`apt` or `yum` instead of `brew`), and will vary slightly based on the Linux distribution you're
working with.

With that said, here is an example of getting started in an Ubuntu environment:

```bash
# Ensure you have installed the requisite Python build dependencies for pyenv to function properly
# See here and adjust accordingly for your Linux distribution:
# https://github.com/pyenv/pyenv/wiki#suggested-build-environment
sudo apt update; sudo apt install build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev curl \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

# Ensure you have Git installed or this next step won't work
sudo apt install git

# Run the pyenv installer
# Note: on Linux this also installs pyenv-virtualenv
curl https://pyenv.run | bash

# Add the following to your desired .rc file for your shell to auto-activate pyenv and pyenv-virtualenv.
# Bash RC example below -- for further steps on adding this to your .bash_profile for non-login shells, or for steps
# for other shells like zsh or fish, see:
# https://github.com/pyenv/pyenv?tab=readme-ov-file#set-up-your-shell-environment-for-pyenv
echo -e 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo -e '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo -e 'eval "$(pyenv init -)"' >> ~/.bashrc
echo -e 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc

# Install a recent version of Python, latest of 3.12 as of this writing is 3.12.3
pyenv install 3.12

# Create a pretend directory for a repo and set your location to it
mkdir -p ~/git/my-repo
cd ~/git/my-repo

# Create a virtualenv and set it as the virtualenv for the local directory
pyenv virtualenv 3.12.3 my-repo-virtualenv-3.12.3
pyenv local my-repo-virtualenv-3.12.3
```

## Windows

To be totally honest, getting Python going on Windows is the weirdest of the bunch, and because of that you may want
to consider using Windows Subsystem for Linux (in which case, follow the steps above for your desired Linux distribution
in WSL); but in any case, the steps are below if you choose to pursue creating Python virtual environments on Windows.

First of all, install [Chocolatey](https://chocolatey.org/install) if you haven't already. (Sorry WinGet fans, I
couldn't find the desired packages with that tool...)

Then install [pyenv-win](https://github.com/pyenv-win/pyenv-win) (with the caveat that you need to run this step as
Administrator):

```powershell
# Install pyenv-win, need to run this as administrator
choco install pyenv-win -y
```

Next install [pyenv-win-venv](https://github.com/pyenv-win/pyenv-win-venv) -- note that you may need to set your
execution policy in PowerShell on a new machine to allow scripts to run, in order to install this. (For those who think
that the PowerShell execution policy is a security boundary, see
[this](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4#long-description)
to correct your thinking, and also understand that on macOS and Linux there is no direct equivalent execution policy for
bash shell scripts so... yeah.)

Also note that you may need to create a PowerShell profile file if it doesn't exist already for auto activation when
opening a terminal in a given directory (which, there are huge caveats with auto-activation on Windows, see the code
steps further below). Also note that if you're using the built-in Windows PowerShell, if you want this to work in the
newer PowerShell versions you'll need to update the profile for that shell as well (or vice versa, if you do this in
newer PowerShell you may need to update your profile in old PowerShell, too.)

```powershell
# Set the execution policy to Bypass if needed -- run this as administrator
Set-ExecutionPolicy -ExecutionPolicy Bypass

# Run the next steps as a normal user

# Install pyenv-win-venv
# Note at the time of this writing there is a quirk where the install script might actually report failure when it
# actually succeeded -- I've submitted a PR and related issue to resolve this:
# https://github.com/pyenv-win/pyenv-win-venv/pull/28
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win-venv/main/bin/install-pyenv-win-venv.ps1" -OutFile "$HOME\install-pyenv-win-venv.ps1"
& "$HOME\install-pyenv-win-venv.ps1"

# To auto-activate environments, add this line to your PowerShell profile.
# First, Ensure your PowerShell profile file exists first
if (-not (Test-Path -Path $PROFILE)) {
    New-Item -Path $PROFILE -Force
}

# Then, add the init line.
Add-Content -Path $PROFILE -Value 'pyenv-venv init'

# This is an undocumented quirk -- need to set these environment variables for pyenv-win-venv to work, then
# restart the terminal.
[System.Environment]::SetEnvironmentVariable('PYENV_HOME', $env:USERPROFILE + '\.pyenv\pyenv-win', 'User')

# pyenv-win is pretty out-of-date as of this writing, and unlike the macOS and Linux versions, comes with an update
# command, so update pyenv to get latest available versions.
pyenv update

# Then install a recent global Python version
pyenv install 3.12.3

# Create a pretend directory for a repo and set your location to it
mkdir -p ~/git/my-repo
cd ~/git/my-repo

# NOTE: Before doing this next step, you may need to disable python3.exe *and* python.exe from "App Execution Aliases"
# on Windows, see:
# https://stackoverflow.com/questions/65348890/python-was-not-found-run-without-arguments-to-install-from-the-microsoft-store

# Create a virtualenv and set it as the virtualenv for the local directory
pyenv-venv install 3.12.3 my-repo-virtualenv-3.12.3
pyenv-venv local my-repo-virtualenv-3.12.3

# NOTE that pyenv-win is currently limited and does *not* support auto-activation via `cd` or changing into the
# directory, it only supports auto-activation when you open a shell directly in the given directly via Explorer. See:
# https://github.com/pyenv-win/pyenv-win-venv/issues/12
# If you follow the steps above, you can activate a virtualenv at any time in a given directory by running
pyenv-venv init

# Or
pyenv-venv activate my-repo-virtualenv-3.12.3

# And to deactivate:
pyenv-venv deactivate
```

## Bonus: Python Dev Container with Visual Studio Code

I mentioned earlier in the blog post about the containerization approach, and I wanted to give honorable mention to the
[Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) feature of Visual Studio Code, which
allows you to do local development from within a local container (or, even a remote container with the GitHub Codespaces
feature).

The container image you use can be configured in your `devcontainer.json` file for your repo, and come from either a
public container registry or even an internal container registry for your organization.

There is a good starting point `devcontainer.json` file and sibling `DOCKERFILE` and supporting scripts in a sample repo
of devcontainer setups from GitHub,
[here](https://github.com/microsoft/vscode-dev-containers/blob/main/containers/python-3/.devcontainer/devcontainer.json).

In the future I may update this blog post with more content on how to get this approach going, but the
[README.md](https://github.com/microsoft/vscode-dev-containers/blob/main/containers/python-3/README.md) from the
aforementioned repo does have really good documentation and steps to get this going.

On top of WSL as an option on Windows, this is also a very good option to use, in lieu of the quirks of using
`pyenv-win` and `pyenv-win-venv` on Windows, and not only that, this approach works on every OS platform out there,
assuming you use Visual Studio Code as your IDE.
