# Publishing

`npm run build` produces `dist/clever-logs-pkmn-extension-v<version>.zip`, the
same archive for the Chrome Web Store, Edge Add-ons and AMO. The GitHub
Actions `Release` workflow rebuilds it and can push it to both stores.

## Before the first submission

- [x] Icon: `icons/icon.*` stays as it is, a Poké Ball. The trademark risk it
      carries is accepted knowingly; it is the most likely rejection trigger
      left.
- [x] Support: the Chrome Web Store wants a URL, not an email, so the
      repository is public and its issue tracker is the support channel:
      https://github.com/welcoMattic/clever-logs-pkmn-extension/issues
      (contact@welcomattic.com as the support email where one is asked for).
- [x] Screenshots captured (`store/screenshots/`).
- [ ] `npm run build` green (it runs `npm test` and `npm run lint` first).

## Chrome Web Store

1. Developer account: one-off 5 USD fee, https://chrome.google.com/webstore/devconsole
2. Create the item **by hand** and upload the zip once: the API can only
   update an existing item, never create one.
3. Fill the listing from `listing.md`, add the screenshots, answer the privacy
   questionnaire (no data collected, no remote code).
4. Submit for review. Later versions can go out from the `Release` workflow.

### Secrets for the workflow

Create an OAuth client for the Chrome Web Store API
(https://developer.chrome.com/docs/webstore/using-api) and set these
repository secrets:

| Secret | Where it comes from |
| --- | --- |
| `CWS_EXTENSION_ID` | item id in the developer dashboard URL |
| `CWS_CLIENT_ID` | Google Cloud OAuth client id |
| `CWS_CLIENT_SECRET` | Google Cloud OAuth client secret |
| `CWS_REFRESH_TOKEN` | obtained once with the OAuth playground / `chrome-webstore-upload-keys` |

## Firefox Add-ons (AMO)

1. Account on https://addons.mozilla.org, then **Submit a New Add-on** and
   upload the zip once to create the listing.
2. Fill the listing from `listing.md`, add the screenshots and the reviewer
   note, pick MIT as the license.
3. Later versions are signed and submitted by the `Release` workflow.

### Secrets for the workflow

From https://addons.mozilla.org/developers/addon/api/key/:

| Secret | Value |
| --- | --- |
| `AMO_JWT_ISSUER` | JWT issuer |
| `AMO_JWT_SECRET` | JWT secret |

## Edge Add-ons (optional)

Same zip, https://partner.microsoft.com/dashboard/microsoftedge. No workflow
step: submission is manual.

## Safari (optional)

Requires Xcode and a paid Apple Developer account:

```sh
xcrun safari-web-extension-converter . --app-name "Clever Logs Pkmn"
```

## Releasing a new version

1. Bump `version` in `manifest.json` **and** `package.json` (a unit test
   checks they match).
2. Commit, then `git tag vX.Y.Z && git push --tags`. The `Release` workflow
   builds the zip and attaches it to a GitHub release.
3. Store publishing is deliberately **not** automatic on a tag: run the
   `Release` workflow manually from the Actions tab and tick
   `publish_chrome` / `publish_firefox`. A step whose secrets are missing
   skips itself instead of failing.
