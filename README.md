# FiveM Minigame Practice

[Open the practice website](https://aburnett02.github.io/academyrp-minigames/)

This repository groups the minigame resources into their own folders and
provides a browser practice catalog:

- [Pure Minigames](./pure-minigames/) — Number Counter.
- [BOII Minigames](./boii_minigames/) — ten practice games, distributed with
  the upstream GPL-3.0 license and notices.

The Pages site provides Number Counter and all ten BOII browser minigames in
one practice catalog. Ay-eye minigames are temporarily excluded pending legal
documentation. The Number Counter practice screen also adapts its layout and
touch controls for phone-sized screens. The catalog also links to NoPixel's
hosted Word Memory, Laptop Terminal, and PinCracker games; those are played on
the third-party NP-Minigames site rather than bundled here. It also links to
external heist-hack practice sites listed by the NoPixel Wiki. The Wiki warns
that using those sites while playing on the NoPixel server is considered
cheating.

External practice links only point to independently operated websites; this
project does not host, embed, or copy their games, code, or assets. The
destination owners retain their rights, and linking is not permission to reuse
their content. Licensing has not been verified for every destination. The
NP-Minigames GitHub repository, Jesper-Hustad's Laptop Hack repository, and
Sharkiller's repository did not show a license file when checked. The VAR
repository includes an MIT license. The LightsOut page displays a copyright
notice; no reuse license was identified.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds the practice app
and packages the BOII browser interfaces. Push to
`main` or `master` to publish changes. Repository Pages must use **GitHub
Actions** as its deployment source.

## Local practice

See [pure-minigames/README.md](./pure-minigames/README.md) for FiveM resource
usage and the Windows local-practice launcher.
