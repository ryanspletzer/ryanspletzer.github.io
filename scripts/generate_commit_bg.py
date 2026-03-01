"""Generate GitHub-style contribution graph tiling backgrounds."""

from PIL import Image, ImageDraw
import random

# Reproducible randomness
random.seed(42)

CELL_SIZE = 11   # square size in px
GAP = 3          # gap between squares
PITCH = CELL_SIZE + GAP  # 14px per cell
GRID = 20        # 20x20 grid (large enough to hide repetition)
TILE_SIZE = GRID * PITCH  # 280px tile
RADIUS = 2       # border-radius for rounded squares

# GitHub contribution graph colors (dark mode)
DARK_BG = (13, 17, 23)         # #0d1117
DARK_EMPTY = (22, 27, 34)      # #161b22
DARK_L1 = (14, 68, 41)         # #0e4429
DARK_L2 = (0, 109, 50)         # #006d32
DARK_L3 = (38, 161, 65)        # #26a641
DARK_L4 = (57, 211, 83)        # #39d353

# GitHub contribution graph colors (light mode)
LIGHT_BG = (235, 237, 240)     # #ebedf0
LIGHT_EMPTY = (235, 237, 240)  # #ebedf0
LIGHT_L1 = (155, 233, 168)     # #9be9a8
LIGHT_L2 = (64, 196, 99)       # #40c463
LIGHT_L3 = (48, 161, 78)       # #30a14e
LIGHT_L4 = (33, 110, 57)       # #216e39


def weighted_level():
    """Realistic commit distribution: mostly empty, some active, few intense."""
    r = random.random()
    if r < 0.40:
        return 0  # empty
    elif r < 0.62:
        return 1  # light
    elif r < 0.78:
        return 2  # medium
    elif r < 0.92:
        return 3  # med-high
    else:
        return 4  # max


def generate_grid():
    """Pre-generate a grid of levels so both approaches use the same pattern."""
    return [[weighted_level() for _ in range(GRID)] for _ in range(GRID)]


def create_alpha_image(grid):
    """
    Approach 1: Alpha image.

    Bright green (#39d353) squares at varying alpha on a transparent background.
    Pair with a CSS background-color (dark: #0d1117, light: #ebedf0) so the
    color bleeds through.  Low-alpha bright green over a dark bg reads as dark
    green; full-alpha reads as bright green — same trick GitHub could use.
    """
    img = Image.new("RGBA", (TILE_SIZE, TILE_SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    GREEN = (57, 211, 83)  # #39d353

    # Muted alpha levels — visible but not distracting
    alpha_map = {
        0: 8,     # barely there
        1: 25,    # hint of green
        2: 50,    # soft green
        3: 85,    # medium green
        4: 120,   # strongest, but still subdued
    }

    for row in range(GRID):
        for col in range(GRID):
            level = grid[row][col]
            x = col * PITCH
            y = row * PITCH
            fill = GREEN + (alpha_map[level],)
            draw.rounded_rectangle(
                [x, y, x + CELL_SIZE, y + CELL_SIZE],
                radius=RADIUS,
                fill=fill,
            )

    return img


def create_standalone_image(grid, mode="dark"):
    """
    Approach 2: Standalone image.

    Exact GitHub contribution colors baked in. Separate images for dark/light.
    """
    if mode == "dark":
        bg = DARK_BG
        colors = [DARK_EMPTY, DARK_L1, DARK_L2, DARK_L3, DARK_L4]
    else:
        bg = LIGHT_BG
        colors = [LIGHT_EMPTY, LIGHT_L1, LIGHT_L2, LIGHT_L3, LIGHT_L4]

    img = Image.new("RGB", (TILE_SIZE, TILE_SIZE), bg)
    draw = ImageDraw.Draw(img)

    for row in range(GRID):
        for col in range(GRID):
            level = grid[row][col]
            x = col * PITCH
            y = row * PITCH
            draw.rounded_rectangle(
                [x, y, x + CELL_SIZE, y + CELL_SIZE],
                radius=RADIUS,
                fill=colors[level],
            )

    return img


grid = generate_grid()

# Approach 1: alpha PNG (one image, works with both themes via bg-color)
alpha_img = create_alpha_image(grid)
alpha_img.save("assets/images/commits-alpha.png")
print(f"commits-alpha.png: {TILE_SIZE}x{TILE_SIZE}px (alpha)")

# Approach 2: standalone PNGs (theme-specific, no bg-color needed)
dark_img = create_standalone_image(grid, "dark")
dark_img.save("assets/images/commits-dark.png")
print(f"commits-dark.png:  {TILE_SIZE}x{TILE_SIZE}px (standalone dark)")

light_img = create_standalone_image(grid, "light")
light_img.save("assets/images/commits-light.png")
print(f"commits-light.png: {TILE_SIZE}x{TILE_SIZE}px (standalone light)")
