# FiveM Minigame Practice

[Open the practice website](https://aburnett02.github.io/academyrp-minigames/)

This repository groups the minigame resources into their own folders and
provides a browser practice catalog:

- [Pure Minigames](./pure-minigames/) — Number Counter.
- [BOII Minigames](./boii_minigames/) — ten practice games, distributed with
  the upstream GPL-3.0 license and notices.
- [Ay-eye Minigames](./eye_minigames/) — upstream links only; its repository
  does not provide a license permitting source redistribution.

The Pages site currently practices Number Counter and the BOII minigames in a
browser. The Ay-eye links open its upstream preview and repository. FiveM
resource names or source folders are not automatically playable in a browser;
each game needs a browser-compatible interface and any required runtime
behavior.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds the practice app
and packages the BOII browser UI from its GPL-3.0 resource folder. Push to
`main` or `master` to publish changes. Repository Pages must use **GitHub
Actions** as its deployment source.

## Local practice

See [pure-minigames/README.md](./pure-minigames/README.md) for FiveM resource
usage and the Windows local-practice launcher.
