# Screenshots

Store screenshots must show the extension doing its job on the real console:
a mock page is grounds for rejection on both stores.

## Specs

| Store | Format | Count |
| --- | --- | --- |
| Chrome Web Store | PNG or JPEG, 1280x800 (or 640x400), no alpha | 1 required, 5 max |
| AMO | PNG or JPEG, 4 MB max, no size constraint | 1 is enough |
| Edge | PNG, 1280x800 | 1 required, 10 max |

Optional Chrome Web Store promo tiles: small 440x280, marquee 1400x560.

## Shots to take

1. **The instance selector, sprites in place.** Logs tab of an application
   with at least three running instances, right-hand panel visible.
2. **A sprite zoomed on hover** (x3, native resolution).
3. **Before / after**, side by side, if a third shot is wanted.

## How to capture

1. Load the unpacked extension in the browser (`chrome://extensions` →
   developer mode → load unpacked, pointing at the repository root).
2. Open a real application's Logs tab in the Clever Cloud console.
3. Size the window to 1280x800 and capture.
4. Save as `store/screenshots/01-instances.png`, `02-hover.png`, ...

Check before uploading: no organisation name, application name, domain or log
line that should stay private. Crop or blur what must not ship.
