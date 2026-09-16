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

## Available shots

Captured on the real console (app `photobook`, three instances), 1280x800 PNG:

| File | Shot |
| --- | --- |
| `01-instances.png` | the instance selector, one sprite per instance |
| `02-hover-zoom.png` | `Fussy bonsly` hovered, sprite zoomed to x3 |

Blurred on purpose: the log panel (the lines carried client IP addresses and
application URLs), the application name and its `app_...` id. Only the
instance selector, the subject of the screenshots, is sharp. The account
avatar in the left rail is left as it is.

A third shot (before / after, side by side) is optional.

## How to capture them again

1. Load the unpacked extension in the browser (`chrome://extensions` →
   developer mode → load unpacked, pointing at the repository root).
2. Open a real application's Logs tab in the Clever Cloud console.
3. Size the window to 1280x800 and capture.
4. Save as `store/screenshots/01-instances.png`, `02-hover.png`, ...

Check before uploading: no organisation name, application name, domain or log
line that should stay private. Crop or blur what must not ship.
