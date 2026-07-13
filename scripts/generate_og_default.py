"""Generate the default Open Graph share image (1200x627).

Reuses the commit-graph texture from generate_commit_bg.py over the
site's dark background (#303030), with the site name and domain in
the theme's text and accent colors. Referenced as the og:image
fallback for pages without a `header:` frontmatter image.

Usage (from the repo root):
    uv run --with pillow python scripts/generate_og_default.py
"""

import random

from PIL import Image, ImageDraw, ImageFont

# Reproducible randomness (different seed than the bg tile so the
# card doesn't visibly repeat the site background pattern)
random.seed(7)

WIDTH, HEIGHT = 1200, 627  # LinkedIn-recommended large card size

# Site theme (dark)
BG = (48, 48, 48)          # --color-bg #303030
TEXT = (231, 233, 234)     # --color-text
ACCENT = (53, 180, 222)    # --color-accent #35B4DE
GREEN = (57, 211, 83)      # commit-graph green #39d353

# Commit-graph texture, scaled up from the 11px/3px site tile
CELL_SIZE = 22
GAP = 6
PITCH = CELL_SIZE + GAP
RADIUS = 4
ALPHA = {0: 5, 1: 14, 2: 26, 3: 42, 4: 62}

FONT_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"


def weighted_level():
    """Same commit-intensity distribution as generate_commit_bg.py."""
    r = random.random()
    if r < 0.40:
        return 0
    elif r < 0.62:
        return 1
    elif r < 0.78:
        return 2
    elif r < 0.92:
        return 3
    else:
        return 4


def load_font(size, want_bold):
    """Load Helvetica Neue from the ttc, picking the face by name."""
    for index in range(16):
        try:
            font = ImageFont.truetype(FONT_PATH, size, index=index)
        except OSError:
            break
        family, style = font.getname()
        if "Italic" in style:
            continue
        if want_bold and style == "Bold":
            return font
        if not want_bold and style in ("Regular", "Medium"):
            return font
    raise RuntimeError("Helvetica Neue face not found")


def draw_texture(img):
    """Commit squares across the card, fading toward the text band."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    cols = WIDTH // PITCH + 1
    rows = HEIGHT // PITCH + 1
    band_top, band_bottom = HEIGHT * 0.28, HEIGHT * 0.72
    for row in range(rows):
        for col in range(cols):
            y = row * PITCH
            alpha = ALPHA[weighted_level()]
            # Quiet the texture behind the text band so type stays crisp
            if band_top < y < band_bottom:
                alpha = min(alpha, 10)
            draw.rounded_rectangle(
                [col * PITCH, y, col * PITCH + CELL_SIZE, y + CELL_SIZE],
                radius=RADIUS,
                fill=GREEN + (alpha,),
            )
    img.alpha_composite(overlay)


def draw_text(img):
    draw = ImageDraw.Draw(img)
    name_font = load_font(104, want_bold=True)
    domain_font = load_font(42, want_bold=False)

    name = "Ryan Spletzer"
    domain = "spletzer.com"

    name_w = draw.textlength(name, font=name_font)
    domain_w = draw.textlength(domain, font=domain_font)

    name_y = HEIGHT * 0.36
    draw.text(((WIDTH - name_w) / 2, name_y), name, font=name_font, fill=TEXT)

    # Accent rule between name and domain
    rule_y = name_y + 148
    rule_w = 120
    draw.rounded_rectangle(
        [(WIDTH - rule_w) / 2, rule_y, (WIDTH + rule_w) / 2, rule_y + 6],
        radius=3,
        fill=ACCENT,
    )

    draw.text(
        ((WIDTH - domain_w) / 2, rule_y + 36),
        domain,
        font=domain_font,
        fill=ACCENT,
    )


img = Image.new("RGBA", (WIDTH, HEIGHT), BG + (255,))
draw_texture(img)
draw_text(img)
img.convert("RGB").save("assets/images/og-default.png")
print(f"og-default.png: {WIDTH}x{HEIGHT}px")
