import { cp, copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const webDirectory = resolve(scriptDirectory, '..');
const repositoryDirectory = resolve(webDirectory, '..', '..');
const publicDirectory = resolve(webDirectory, 'public', 'games');

const bundledGames = [
  {
    id: 'boii',
    resourceDirectory: 'boii_minigames',
    noticeFile: 'LICENSE',
  },
];

await rm(resolve(publicDirectory, 'eye'), { recursive: true, force: true });

for (const game of bundledGames) {
  const destinationDirectory = resolve(publicDirectory, game.id);
  await rm(destinationDirectory, { recursive: true, force: true });
  await mkdir(destinationDirectory, { recursive: true });
  await cp(
    resolve(repositoryDirectory, game.resourceDirectory, 'html'),
    destinationDirectory,
    { recursive: true, force: true }
  );
  await copyFile(
    resolve(repositoryDirectory, game.resourceDirectory, game.noticeFile),
    resolve(destinationDirectory, game.noticeFile)
  );
}
