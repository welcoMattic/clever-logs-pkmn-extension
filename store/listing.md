# Store listing copy

Single source of truth for every store field. Keep it in sync with
`manifest.json` (name, description) and never reintroduce the trademarked
franchise name: the listing must read `pkmn` everywhere.

Every block below is meant to be copied as is, one paragraph per line, so
nothing gets pasted into a form with hard wraps in the middle of a sentence.

## Common

| Field | Value |
| --- | --- |
| Extension name | Clever Cloud Logs Pkmn |
| Version | see `manifest.json` |
| Category | Developer Tools (CWS) / Web Development (AMO) |
| Homepage | none (repository is private) |
| Support | contact@welcomattic.com |
| License | MIT |
| Permissions | none (host match on `https://console.clever-cloud.com/*` only) |
| Data collected | none |

## English

**Name** (CWS max 45, AMO max 50 / currently 22)

```
Clever Cloud Logs Pkmn
```

**Short description / summary** (CWS max 132, AMO max 250 / currently 88)

```
Shows the sprite matching each instance name in the Logs tab of the Clever Cloud console.
```

**Detailed description**

```
Clever Cloud names every application instance "Adjective slug" (for example "Tiny rhyhorn"), using its own open source name generator. Telling those instances apart in the Logs tab means reading the names carefully.

This extension puts the matching 96x96 sprite next to every instance name in the instance selector of the Logs tab, so you recognise a running instance at a glance. Hover a sprite to zoom it to its native resolution.

- Works on https://console.clever-cloud.com only.
- No account, no login, no configuration.
- Requests no permission, runs no background script, sends no network request: the 811 sprites are bundled with the extension.
- Collects no data whatsoever.
- Open source (MIT). Sprites redistributed from PokeAPI/sprites under CC0.

Not affiliated with Clever Cloud.
```

**Single purpose** (CWS)

```
Display a sprite image next to each instance name in the Logs tab of the Clever Cloud console.
```

**Host permission justification** (CWS, `https://console.clever-cloud.com/*`)

```
The content script only runs on the Clever Cloud console, where the instance selector it decorates lives. No other site is matched, and no host permission is requested at runtime.
```

**Notes to reviewer** (AMO)

```
No build step: the archive holds the sources as they are written, nothing is minified or generated at package time. content.js is the only logic, about 140 lines. sprites/ holds 811 PNG files redistributed from PokeAPI/sprites (CC0 1.0), listed in pkmn-names.js. The repository is private; sources can be provided on request.
```

## French

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
Clever Cloud nomme chaque instance « Adjectif slug » (par exemple « Tiny rhyhorn »), via son générateur de noms open source. Dans l'onglet Logs, distinguer ses instances demande de lire les noms un par un.

Cette extension place le sprite correspondant à côté de chaque nom d'instance dans le sélecteur d'instances de l'onglet Logs. Au survol, le sprite s'agrandit à sa résolution native.

- Fonctionne uniquement sur https://console.clever-cloud.com.
- Aucun compte, aucune connexion, aucune configuration.
- Aucune permission, aucun script d'arrière-plan, aucune requête réseau : les 811 sprites sont embarqués dans l'extension.
- Aucune donnée collectée.
- Open source (MIT). Sprites redistribués depuis PokeAPI/sprites sous CC0.

Extension non affiliée à Clever Cloud.
```

**Objectif unique** (CWS)

```
Afficher un sprite à côté de chaque nom d'instance dans l'onglet Logs de la console Clever Cloud.
```

**Justification de l'accès à l'hôte** (CWS)

```
Le content script ne s'exécute que sur la console Clever Cloud, où se trouve le sélecteur d'instances qu'il décore. Aucun autre site n'est concerné et aucune permission d'hôte n'est demandée à l'exécution.
```

## Privacy practices (CWS)

- Does the extension collect user data? **No**, for every category.
- Remote code: **No** (all code and images are bundled in the package).
- Privacy policy URL: not required, no data is handled.

## Data collection (AMO)

Declared in the manifest as
`browser_specific_settings.gecko.data_collection_permissions.required = ["none"]`.
