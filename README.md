# Clever Cloud Logs Pkmn

Extension navigateur qui affiche le sprite pkmn correspondant au nom d'instance de vos applications Clever Cloud, dans le sélecteur d'instances de l'onglet **Logs** de la [console](https://console.clever-cloud.com).

Clever Cloud nomme ses instances « Adjectif pokémon » (ex. *Tiny rhyhorn*) via [uuid_to_pokemon.rs](https://github.com/CleverCloud/uuid_to_pokemon.rs). L'extension embarque les 811 sprites correspondants (source : [PokeAPI/sprites](https://github.com/PokeAPI/sprites), CC0) et les injecte devant chaque nom d'instance.

## Installation

### Chrome / Edge / Brave (Chromium)
1. Ouvrir `chrome://extensions` (ou `edge://extensions`).
2. Activer le **mode développeur**.
3. **Charger l'extension non empaquetée** et sélectionner ce dossier.

Note : Chrome affiche un avertissement bénin sur la clé `browser_specific_settings` (elle ne sert qu'à Firefox).

### Firefox
1. Ouvrir `about:debugging#/runtime/this-firefox`.
2. **Charger un module complémentaire temporaire** et sélectionner `manifest.json`.

Pour une installation permanente, l'extension doit être signée via [AMO](https://addons.mozilla.org).

### Safari (macOS, Xcode requis)
```sh
xcrun safari-web-extension-converter . --app-name "Clever Logs Pkmn"
```
Puis lancer l'app générée, et activer l'extension dans Safari → Réglages → Extensions (autoriser les extensions non signées dans le menu Développement si besoin).

## Fonctionnement

- Content script sur `https://console.clever-cloud.com/*`, sans permission ni background script.
- La console utilise des web components Lit (shadow DOM ouvert) : le script traverse récursivement les shadow roots pour trouver les composants `cc-logs-instances[-beta]` et place le sprite (`sprites/<slug>.png`) au bord droit du panneau, centré sur la ligne de son instance. Au survol, le sprite s'agrandit x3 (96px, sa résolution native) puis reprend sa taille quand le curseur le quitte.
- Un scan périodique + des MutationObservers suivent les navigations SPA et les nouvelles instances (déploiements, scaling).

## Développement

```sh
npm install          # dépendances de dev uniquement, l'extension n'a aucun build
npm test             # node:test : parsing des noms, traversée shadow DOM, injection, assets
npm run test:functional  # Playwright : Chromium, Firefox, WebKit + extension réelle
npm run lint         # web-ext lint (addons-linter), aussi lancé en postinstall
```

`npm ci --ignore-scripts` saute le `postinstall` : la CI relance donc `npm run lint`
explicitement.

Les tests unitaires reconstruisent la structure shadow DOM de la console (jsdom) et vérifient le parsing « Adjectif slug », l'injection des sprites, l'idempotence, la détection des nouvelles instances (MutationObserver) et le zoom au survol. Les tests d'assets valident les 811 sprites, le manifest et la cohérence des versions.

## Release

```sh
npm run build   # lance les tests puis produit dist/clever-logs-pkmn-extension-v<version>.zip
```

Le zip (~840 Ko) est prêt pour le Chrome Web Store, Edge Add-ons et Firefox AMO (même archive). Textes de listing, procédure de soumission et secrets GitHub Actions : voir [`store/`](store/). La publication sur les stores se déclenche à la main depuis l'onglet Actions (workflow `Release`). Pour Safari, convertir le dossier avec `safari-web-extension-converter` (voir Installation). Penser à incrémenter `version` dans `manifest.json` **et** `package.json` (un test vérifie qu'elles concordent).

## Régénérer les sprites

```sh
python3 scripts/fetch_sprites.py
```

Le script retélécharge la liste de noms depuis le repo Clever Cloud, mappe chaque slug vers son ID PokeAPI et télécharge les sprites manquants dans `sprites/`, puis régénère `pkmn-names.js`.

## Licences

- Code sous licence MIT (voir `LICENSE`).
- Sprites distribués via [PokeAPI/sprites](https://github.com/PokeAPI/sprites) (CC0 1.0). Les artworks Pokémon restent la propriété de The Pokémon Company / Nintendo / Game Freak.
