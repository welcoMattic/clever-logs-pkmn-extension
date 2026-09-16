# Store listing copy

Single source of truth for every store field. Keep it in sync with
`manifest.json` (name, description) and never reintroduce the trademarked
franchise name: the listing must read `pkmn` everywhere.

## Common

| Field | Value |
| --- | --- |
| Extension name | Clever Cloud Logs Pkmn |
| Version | see `manifest.json` |
| Category | Developer Tools (CWS) / Web Development (AMO) |
| Homepage | none (repository is private) |
| Support | support email, to fill in at submission time |
| License | MIT |
| Permissions | none (host match on `https://console.clever-cloud.com/*` only) |
| Data collected | none |

## Chrome Web Store

**Name** (max 45 chars, currently 22)

```
Clever Cloud Logs Pkmn
```

**Short description** (max 132 chars, currently 88)

```
Shows the sprite matching each instance name in the Logs tab of the Clever Cloud console.
```

**Detailed description**

```
Clever Cloud names every application instance "Adjective slug" (for example
"Tiny rhyhorn"), using its own uuid_to_pokemon.rs generator. Telling those
instances apart in the Logs tab means reading the names carefully.

This extension puts the matching 96x96 sprite next to every instance name in
the instance selector of the Logs tab, so you recognise a running instance at
a glance. Hover a sprite to zoom it to its native resolution.

- Works on https://console.clever-cloud.com only.
- No account, no login, no configuration.
- Requests no permission, runs no background script, sends no network request:
  the 811 sprites are bundled with the extension.
- Collects no data whatsoever.
- Open source (MIT). Sprites redistributed from PokeAPI/sprites under CC0.

Not affiliated with Clever Cloud.
```

**Single purpose**

```
Display a sprite image next to each instance name in the Logs tab of the
Clever Cloud console.
```

**Host permission justification** (`https://console.clever-cloud.com/*`)

```
The content script only runs on the Clever Cloud console, where the instance
selector it decorates lives. No other site is matched, and no host permission
is requested at runtime.
```

**Privacy practices**

- Does the extension collect user data? **No**, for every category.
- Remote code: **No** (all code and images are bundled in the package).
- Justification of the "single purpose" and host access: see above.
- Privacy policy URL: not required, no data is handled. Add
  `store/privacy-policy.md` published somewhere public if the reviewer asks.

## Firefox Add-ons (AMO)

**Name** (max 50 chars)

```
Clever Cloud Logs Pkmn
```

**Summary** (max 250 chars)

```
Shows the sprite matching each instance name in the Logs tab of the Clever
Cloud console. No permission, no data collection, sprites bundled offline.
```

**Description**: same detailed description as the Chrome Web Store.

**Data collection**: declared in the manifest as
`browser_specific_settings.gecko.data_collection_permissions.required = ["none"]`.

**Notes to reviewer**

```
No build step: the archive holds the sources as they are written, nothing is
minified or generated at package time. content.js is the only logic, about 140
lines. sprites/ holds 811 PNG files redistributed from PokeAPI/sprites
(CC0 1.0), listed in pkmn-names.js. The repository is private; sources can be
provided on request.
```

## French listing (both stores support a fr locale)

**Nom**

```
Clever Cloud Logs Pkmn
```

**Résumé**

```
Affiche le sprite correspondant à chaque nom d'instance dans l'onglet Logs de la console Clever Cloud.
```

**Description**

```
Clever Cloud nomme chaque instance « Adjectif slug » (par exemple « Tiny
rhyhorn »). Dans l'onglet Logs, distinguer ses instances demande de lire les
noms un par un.

Cette extension place le sprite correspondant à côté de chaque nom d'instance
dans le sélecteur d'instances de l'onglet Logs. Au survol, le sprite s'agrandit
à sa résolution native.

- Fonctionne uniquement sur https://console.clever-cloud.com.
- Aucun compte, aucune connexion, aucune configuration.
- Aucune permission, aucun script d'arrière-plan, aucune requête réseau : les
  811 sprites sont embarqués dans l'extension.
- Aucune donnée collectée.
- Open source (MIT). Sprites redistribués depuis PokeAPI/sprites sous CC0.

Extension non affiliée à Clever Cloud.
```
