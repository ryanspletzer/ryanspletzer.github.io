"""Backfill `header:` frontmatter from each post's first content image.

The `header:` key drives og:image / twitter:image (and upgrades
twitter:card to summary_large_image) via _includes/header.html, and it
also renders the image on the homepage listing for the latest posts.

Dry-run by default: prints what would change and why posts are skipped.
Pass --apply to write the frontmatter edits in place.

Usage (from the repo root):
    python3 scripts/backfill_header_images.py
    python3 scripts/backfill_header_images.py --apply
"""

import argparse
import re
import sys
from pathlib import Path

POSTS_DIR = Path("_posts")

# [ \t]* (not \s*) after the closing delimiter: \s* would swallow the
# blank line that conventionally follows it, churning every edited post.
FRONTMATTER_RE = re.compile(r"\A---[ \t]*\n(.*?)\n---[ \t]*\n", re.DOTALL)
# Markdown image; the URL may start on its own line with leading whitespace
# (see the Tiepolo image in the 2026-07-11 post) and may contain one level
# of balanced parens (e.g. Creation_of_Adam_(cropped)_meme.jpg).
MD_IMAGE_RE = re.compile(
    r"!\[[^\]]*\]\(\s*((?:[^()\s]|\([^()\s]*\))+)\s*\)", re.DOTALL
)
HTML_IMAGE_RE = re.compile(r"<img[^>]+src=[\"']([^\"']+)[\"']")


def first_local_image(body: str) -> str | None:
    """Return the first local (/-rooted) image path in the post body."""
    candidates = []
    for regex in (MD_IMAGE_RE, HTML_IMAGE_RE):
        match = regex.search(body)
        if match:
            candidates.append((match.start(), match.group(1)))
    if not candidates:
        return None
    path = min(candidates)[1]
    return path if path.startswith("/") else None


def process(post: Path, apply: bool) -> tuple[str, str]:
    """Return (status, detail) for one post; write the edit when applying."""
    text = post.read_text(encoding="utf-8")
    match = FRONTMATTER_RE.match(text)
    if not match:
        return "skip", "no frontmatter"

    frontmatter = match.group(1)
    if re.search(r"^header:", frontmatter, re.MULTILINE):
        return "skip", "header: already set"

    body = text[match.end():]
    image = first_local_image(body)
    if image is None:
        if MD_IMAGE_RE.search(body) or HTML_IMAGE_RE.search(body):
            return "skip", "first image is external"
        return "skip", "no image in body"

    if not Path(image.lstrip("/")).is_file():
        return "skip", f"image file missing: {image}"

    if apply:
        updated = (
            f"---\n{frontmatter}\nheader: {image}\n---\n"
            + text[match.end():]
        )
        post.write_text(updated, encoding="utf-8")
    return "backfill", image


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--apply", action="store_true",
        help="write the frontmatter edits (default is dry-run)",
    )
    args = parser.parse_args()

    if not POSTS_DIR.is_dir():
        print("run from the repo root (no _posts/ here)", file=sys.stderr)
        return 1

    counts = {"backfill": 0, "skip": 0}
    for post in sorted(POSTS_DIR.glob("*.md")):
        status, detail = process(post, args.apply)
        counts[status] += 1
        print(f"{status:8}  {post.name}: {detail}")

    verb = "backfilled" if args.apply else "would backfill"
    print(f"\n{verb} {counts['backfill']} posts, skipped {counts['skip']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
