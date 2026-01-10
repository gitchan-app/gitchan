# Icon Generation Guide

This guide explains how to generate all icon files for GitChan from a source image.

---

## Prerequisites

- **macOS** (for `.icns` generation using `sips` and `iconutil`)
- **Python 3** with **Pillow** library (for `.ico` and tray icons)
- **Source images**:
  - `assets/images/gitchan-square.png` - for tray icons (1024x1024 PNG recommended)
  - `assets/images/gitchan-cat.png` - for app icons (ico, icns)

### Install Pillow

```bash
pip3 install Pillow
```

---

## Icon Files Reference

| File | Location | Size | Purpose |
|------|----------|------|---------|
| `gitchan-square.png` | `assets/images/` | 1024x1024 | Source image for tray icons |
| `gitchan-cat.png` | `assets/images/` | 1024x1024 | Source image for app icons |
| `app-icon.icns` | `assets/images/` | Multiple | macOS application icon |
| `app-icon.ico` | `assets/images/` | Multiple | Windows application icon |
| `IconTemplate.png` | `assets/` | 22x22 | macOS menu bar icon |
| `IconTemplate@2x.png` | `assets/` | 44x44 | macOS menu bar icon (Retina) |
| `tray-idle.png` | `assets/images/` | 22x22 | Tray icon - normal state |
| `tray-idle@2x.png` | `assets/images/` | 44x44 | Tray icon - normal state (Retina) |
| `tray-active.png` | `assets/images/` | 22x22 | Tray icon - active/notification state |
| `tray-active@2x.png` | `assets/images/` | 44x44 | Tray icon - active state (Retina) |
| `tray-error.png` | `assets/images/` | 22x22 | Tray icon - error state |
| `tray-error@2x.png` | `assets/images/` | 44x44 | Tray icon - error state (Retina) |
| `tray-idle-white.png` | `assets/images/` | 22x22 | Tray icon - white variant |
| `tray-idle-white@2x.png` | `assets/images/` | 44x44 | Tray icon - white variant (Retina) |
| `tray-offline.png` | `assets/images/` | 22x22 | Tray icon - offline state |
| `tray-offline@2x.png` | `assets/images/` | 44x44 | Tray icon - offline state (Retina) |

---

## Quick Generation (All-in-One)

Run this single script from the project root to generate all icons:

```bash
#!/bin/bash
set -e

cd "$(dirname "$0")/.." || cd .

SOURCE_TRAY="assets/images/gitchan-square.png"
SOURCE_APP="assets/images/gitchan-cat.png"
IMAGES_DIR="assets/images"
ASSETS_DIR="assets"

echo "=== GitChan Icon Generator ==="
echo "Source (tray): $SOURCE_TRAY"
echo "Source (app): $SOURCE_APP"
echo ""

# Check sources exist
if [ ! -f "$SOURCE_TRAY" ]; then
    echo "Error: Source image not found at $SOURCE_TRAY"
    exit 1
fi
if [ ! -f "$SOURCE_APP" ]; then
    echo "Error: Source image not found at $SOURCE_APP"
    exit 1
fi

# 1. Generate macOS .icns (from gitchan-cat.png)
echo "[1/4] Generating macOS .icns..."
ICONSET_DIR="$IMAGES_DIR/app-icon.iconset"
mkdir -p "$ICONSET_DIR"

sips -z 16 16     "$SOURCE_APP" --out "$ICONSET_DIR/icon_16x16.png"
sips -z 32 32     "$SOURCE_APP" --out "$ICONSET_DIR/icon_16x16@2x.png"
sips -z 32 32     "$SOURCE_APP" --out "$ICONSET_DIR/icon_32x32.png"
sips -z 64 64     "$SOURCE_APP" --out "$ICONSET_DIR/icon_32x32@2x.png"
sips -z 128 128   "$SOURCE_APP" --out "$ICONSET_DIR/icon_128x128.png"
sips -z 256 256   "$SOURCE_APP" --out "$ICONSET_DIR/icon_128x128@2x.png"
sips -z 256 256   "$SOURCE_APP" --out "$ICONSET_DIR/icon_256x256.png"
sips -z 512 512   "$SOURCE_APP" --out "$ICONSET_DIR/icon_256x256@2x.png"
sips -z 512 512   "$SOURCE_APP" --out "$ICONSET_DIR/icon_512x512.png"
sips -z 1024 1024 "$SOURCE_APP" --out "$ICONSET_DIR/icon_512x512@2x.png"

iconutil -c icns "$ICONSET_DIR" -o "$IMAGES_DIR/app-icon.icns"
rm -rf "$ICONSET_DIR"
echo "  Created: $IMAGES_DIR/app-icon.icns"

# 2. Generate Windows .ico (from gitchan-cat.png)
echo "[2/4] Generating Windows .ico..."
python3 << 'PYTHON_SCRIPT'
from PIL import Image
import os

source = "assets/images/gitchan-cat.png"
output = "assets/images/app-icon.ico"

img = Image.open(source).convert("RGBA")
sizes = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
icons = [img.resize(size, Image.Resampling.LANCZOS) for size in sizes]
icons[0].save(output, format="ICO", sizes=sizes)
print(f"  Created: {output}")
PYTHON_SCRIPT

# 3. Generate macOS menu bar icons (from gitchan-square.png)
echo "[3/4] Generating macOS menu bar icons..."
python3 << 'PYTHON_SCRIPT'
from PIL import Image

source = "assets/images/gitchan-square.png"
img = Image.open(source).convert("RGBA")

templates = {
    "assets/IconTemplate.png": 22,
    "assets/IconTemplate@2x.png": 44,
}

for path, size in templates.items():
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(path)
    print(f"  Created: {path}")
PYTHON_SCRIPT

# 4. Generate tray icons (from gitchan-square.png)
echo "[4/4] Generating tray icons..."
python3 << 'PYTHON_SCRIPT'
from PIL import Image

source = "assets/images/gitchan-square.png"
img = Image.open(source).convert("RGBA")

tray_icons = {
    "assets/images/tray-idle.png": 22,
    "assets/images/tray-idle@2x.png": 44,
    "assets/images/tray-active.png": 22,
    "assets/images/tray-active@2x.png": 44,
    "assets/images/tray-error.png": 22,
    "assets/images/tray-error@2x.png": 44,
    "assets/images/tray-idle-white.png": 22,
    "assets/images/tray-idle-white@2x.png": 44,
    "assets/images/tray-offline.png": 22,
    "assets/images/tray-offline@2x.png": 44,
}

for path, size in tray_icons.items():
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(path)
    print(f"  Created: {path}")
PYTHON_SCRIPT

echo ""
echo "=== Done! All icons generated successfully ==="
```

Save this as `scripts/generate-icons.sh` and run:

```bash
chmod +x scripts/generate-icons.sh
./scripts/generate-icons.sh
```

---

## Manual Generation (Step by Step)

### 1. macOS Application Icon (.icns)

Uses `gitchan-cat.png` as source:

```bash
# Create iconset directory
mkdir -p assets/images/app-icon.iconset

# Generate all required sizes
sips -z 16 16     assets/images/gitchan-cat.png --out assets/images/app-icon.iconset/icon_16x16.png
sips -z 32 32     assets/images/gitchan-cat.png --out assets/images/app-icon.iconset/icon_16x16@2x.png
sips -z 32 32     assets/images/gitchan-cat.png --out assets/images/app-icon.iconset/icon_32x32.png
sips -z 64 64     assets/images/gitchan-cat.png --out assets/images/app-icon.iconset/icon_32x32@2x.png
sips -z 128 128   assets/images/gitchan-cat.png --out assets/images/app-icon.iconset/icon_128x128.png
sips -z 256 256   assets/images/gitchan-cat.png --out assets/images/app-icon.iconset/icon_128x128@2x.png
sips -z 256 256   assets/images/gitchan-cat.png --out assets/images/app-icon.iconset/icon_256x256.png
sips -z 512 512   assets/images/gitchan-cat.png --out assets/images/app-icon.iconset/icon_256x256@2x.png
sips -z 512 512   assets/images/gitchan-cat.png --out assets/images/app-icon.iconset/icon_512x512.png
sips -z 1024 1024 assets/images/gitchan-cat.png --out assets/images/app-icon.iconset/icon_512x512@2x.png

# Convert to .icns
iconutil -c icns assets/images/app-icon.iconset -o assets/images/app-icon.icns

# Clean up
rm -rf assets/images/app-icon.iconset
```

### 2. Windows Application Icon (.ico)

Uses `gitchan-cat.png` as source:

```bash
python3 -c "
from PIL import Image

img = Image.open('assets/images/gitchan-cat.png').convert('RGBA')
sizes = [(16,16), (24,24), (32,32), (48,48), (64,64), (128,128), (256,256)]
icons = [img.resize(size, Image.Resampling.LANCZOS) for size in sizes]
icons[0].save('assets/images/app-icon.ico', format='ICO', sizes=sizes)
print('Created: assets/images/app-icon.ico')
"
```

### 3. macOS Menu Bar Icons (IconTemplate)

Uses `gitchan-square.png` as source:

```bash
python3 -c "
from PIL import Image

img = Image.open('assets/images/gitchan-square.png').convert('RGBA')

img.resize((22, 22), Image.Resampling.LANCZOS).save('assets/IconTemplate.png')
img.resize((44, 44), Image.Resampling.LANCZOS).save('assets/IconTemplate@2x.png')
print('Created: assets/IconTemplate.png, assets/IconTemplate@2x.png')
"
```

### 4. Tray Icons

Uses `gitchan-square.png` as source:

```bash
python3 -c "
from PIL import Image

img = Image.open('assets/images/gitchan-square.png').convert('RGBA')

tray_icons = {
    'assets/images/tray-idle.png': 22,
    'assets/images/tray-idle@2x.png': 44,
    'assets/images/tray-active.png': 22,
    'assets/images/tray-active@2x.png': 44,
    'assets/images/tray-error.png': 22,
    'assets/images/tray-error@2x.png': 44,
    'assets/images/tray-idle-white.png': 22,
    'assets/images/tray-idle-white@2x.png': 44,
    'assets/images/tray-offline.png': 22,
    'assets/images/tray-offline@2x.png': 44,
}

for path, size in tray_icons.items():
    img.resize((size, size), Image.Resampling.LANCZOS).save(path)
    print(f'Created: {path}')
"
```

---

## Notes

- **Source Image Requirements**: Use a square PNG image (1024x1024 recommended) with transparency support
- **macOS Specific**: The `sips` and `iconutil` commands are only available on macOS
- **Cross-Platform ICO**: The Python/Pillow method works on any platform
- **Template Icons**: macOS uses `IconTemplate` naming convention for menu bar icons that adapt to light/dark mode

---

## Troubleshooting

### "sips: Unable to render destination"

The source image might be a JPEG disguised as PNG. Convert it first:

```bash
sips -s format png assets/images/icon.png --out assets/images/icon.png
```

### "ModuleNotFoundError: No module named 'PIL'"

Install Pillow:

```bash
pip3 install Pillow
```

### Icons appear blurry on Retina displays

Ensure you've generated the `@2x` versions (44x44 for tray icons, which display at 22x22 on Retina).
