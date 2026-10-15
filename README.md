# FiveM Minigame Practice

[Open the practice website](https://aburnett02.github.io/academyrp-minigames/)

This repository groups the minigame resources into their own folders and
provides a browser practice catalog:

- [Pure Minigames](./pure-minigames/) — Number Counter.
- [BOII Minigames](./boii_minigames/) — ten practice games, distributed with
  the upstream GPL-3.0 license and notices.
- [Ay-eye Minigames](./eye_minigames/) — bundled upstream resource and 70-game
  browser practice integration, included with maintainer-confirmed permission.
  See its [bundle notice](./eye_minigames/BUNDLED-NOTICE.md).

The Pages site provides Number Counter and all 80 bundled BOII and Ay-eye
browser minigames in one practice catalog.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds the practice app
and packages the browser interfaces from both upstream resources. Push to
`main` or `master` to publish changes. Repository Pages must use **GitHub
Actions** as its deployment source.

## Local practice

See [pure-minigames/README.md](./pure-minigames/README.md) for FiveM resource
usage and the Windows local-practice launcher.
