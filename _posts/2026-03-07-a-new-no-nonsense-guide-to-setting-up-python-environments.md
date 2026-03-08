---
layout: post
title: A New No-Nonsense Guide to Setting Up Python Environments
date: 2026-03-14 00:00:00
description: >
  Almost two years ago I wrote a guide to setting up Python environments
  with pyenv and pyenv-virtualenv,
  and I reserved the right to change my mind later.
  uv came along and I'm cashing in that reservation—it's
  faster, simpler, and finally makes Windows not weird.
tags:
  - python
  - environments
---

![An oil painting of a lone farmer seen from behind, harvesting golden wheat with a scythe in a sunlit field, with his discarded Union Army jacket and canteen visible in the lower right corner.](/assets/images/veteran-in-a-new-field-winslow-homer-1865.jpg)
*Winslow Homer, "The Veteran in a New Field," 1865. Oil on canvas. The Metropolitan Museum of Art, New York. Public domain.*

Almost two years ago I wrote
[A No-Nonsense Guide to Setting Up Python Environments](/2024/04/a-no-nonsense-guide-to-setting-up-python-environments/)
and near the top of it I said:

> I even reserve the right to change my mind later as my own practices and opinions evolve.

Well, I'm cashing in that reservation.

## What Changed

The short answer is [uv](https://docs.astral.sh/uv/).

`uv` is a Python package and project manager written in Rust
by [Astral](https://astral.sh/),
the same folks behind the
[Ruff](https://docs.astral.sh/ruff/) linter and formatter.
It is absurdly fast,
and it replaces `pyenv`, `pyenv-virtualenv`, `pip`, `pip-tools`,
`pipx`, `poetry`, `virtualenv`,
and arguably `conda` for most use cases,
all in one tool.

My old guide had you installing `pyenv` for version management,
then `pyenv-virtualenv` for virtual environments,
then configuring shell init scripts,
and on Windows the whole thing was—I'll
be generous here—*unpleasant*.

`uv` collapses all of that into a single binary
that works the same way on every platform.

## Overview / TL;DR

Install `uv`.
Use `uv` for everything.
That's it.

No, really.
There is no step two.
But I'll walk through the details below
because some of the ergonomics are worth knowing about.

## Installing uv

### macOS

```bash
# Via Homebrew
brew install uv
```

Or via the standalone installer:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Linux

```bash
pipx install uv
```

Or via the standalone installer:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Windows

```powershell
# Via Chocolatey
choco install uv

# Via WinGet
winget install --id=astral-sh.uv -e

# Via Scoop
scoop install main/uv
```

Or via the standalone installer:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

That's the entire platform-specific section of this guide.
Compare that to the original post
where macOS, Linux, and Windows each had their own lengthy section.

## Managing Python Versions

`uv` can install and manage Python versions directly—no
`pyenv` needed:

```bash
# Install a specific Python version
uv python install 3.13

# Install multiple versions
uv python install 3.11 3.12 3.13

# List installed versions
uv python list

# Pin a version for the current directory
uv python pin 3.13
```

That last command creates a `.python-version` file,
which `uv` (and other tools) will respect automatically.

## Creating Virtual Environments

```bash
# Create a virtual environment in the current directory
uv venv

# Create one with a specific Python version
uv venv --python 3.12

# Activate it (if you want to — more on this below)
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows
```

But here's the thing:
you often don't even need to activate the virtual environment.
`uv` will automatically use the `.venv` in the current directory
when you run commands through it:

```bash
# No need to activate first — uv finds the .venv automatically
uv run python my_script.py
uv run pytest
```

## Installing Packages

```bash
# Install a package into the current virtual environment
uv pip install requests

# Install from a requirements file
uv pip install -r requirements.txt

# Compile and sync a lockfile (for reproducible builds)
uv pip compile requirements.in -o requirements.txt
uv pip sync requirements.txt
```

## Project Workflows

If you're starting a new Python project,
`uv` also handles project management:

```bash
# Initialize a new project
uv init my-project
cd my-project

# Add dependencies (creates/updates pyproject.toml and uv.lock)
uv add requests httpx

# Add dev dependencies
uv add --dev pytest ruff

# Run a command in the project's virtual environment
uv run python main.py
uv run pytest

# Sync the environment to match the lockfile
uv sync
```

`uv run` is the one I use the most—it
makes sure the virtual environment exists,
is up to date with your lockfile,
and runs your command in it.
No more "did I activate the venv?" moments.

## Running and Installing Standalone Tools

In my old guide I mentioned `pipx` for installing standalone CLI tools.
`uv` covers this use case too,
though the mapping isn't a direct 1:1—`uvx`
is shorthand for `uv tool run`
and `uv tool install` handles persistent installs:

```bash
# Run a tool without installing it (similar to pipx run)
uvx ruff check .
uvx black --check .

# Install a tool persistently (similar to pipx install)
uv tool install ruff
uv tool install httpie
```

## The Windows Story

I want to spend a moment on this
because the Windows section of my old guide was,
to put it mildly, rough.

The old approach involved:

- Installing Chocolatey
- Installing `pyenv-win` as admin
- Installing `pyenv-win-venv` via a separate script
- Setting environment variables manually
- Creating PowerShell profiles
- Disabling App Execution Aliases for `python.exe` and `python3.exe`
- Dealing with auto-activation that only worked when opening a shell
  in the directory via Explorer (not via `cd`)
- A PR I submitted to fix a bug in the install script

With `uv`:

```powershell
# Or install with your preferred package manager / approach
choco install uv
uv python install 3.13
uv venv
uv pip install requests
```

That's it.
Same commands and same behavior as macOS and Linux.
No admin privileges.
No special environment variables.
No App Execution Alias dance.
No separate tools for version management versus virtual environments.

Windows being on equal footing
instead of an afterthought with a pile of caveats
is reason enough to make the switch.

## What About pyenv?

`pyenv` is a great tool and served me well.
If it's working for you, there's no emergency—keep
using it.
But if you're setting up a new machine,
helping a colleague get started,
or just tired of the ceremony,
`uv` is the simpler path.

I still have `pyenv` installed on my machine
and it continues to work fine alongside `uv`.
The two aren't in conflict.
But new projects and new environments?
I reach for `uv` every time now.

## What About Dev Containers?

In my original post I mentioned
[Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
as an alternative approach,
and that's still a great option—especially
if your target deployment is container-based
or you want fully reproducible environments across a team.

`uv` works great inside containers too.
Astral publishes
[official Docker images](https://docs.astral.sh/uv/guides/integration/docker/)
and `uv` is designed to be friendly in CI and containerized workflows
with its deterministic lockfile and fast installs.

---

When I wrote the original guide in 2024,
you needed a different tool for every job,
a different set of tools on every OS,
and Windows was always the weird one.

`uv` showed up and collapsed all of that into one tool.
It's 10-100x faster for package resolution and installation
(those aren't my numbers, those are from
[Astral's benchmarks](https://docs.astral.sh/uv/)),
and it works the same on every OS.

I reserved the right to change my mind,
and I'm glad I did!

Bonus tip: update your CLAUDE.md / AGENTS.md and hooks
for whatever for your various AI coding tools are
to use `uv` instead of `pyenv` and native `pip`, etc.—you'll
be happy you did.
I often see these AI tools try to `pip install` things using system Python,
which just emits an error
and a reference to [PEP668](https://peps.python.org/pep-0668/),
and then they try 2-3 more steps before they know they have to spin up a virtual Python environment.
These tools/models haven't exactly caught up to the fact that
we've moved beyond this,
but if however you use instructions and hooks to steer them towards `uv`,
it becomes a lot simpler
with fewer false starts and errors for them to get going.
