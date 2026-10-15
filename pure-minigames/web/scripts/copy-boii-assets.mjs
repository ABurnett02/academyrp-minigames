import { cp, copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const webDirectory = resolve(scriptDirectory, '..');
const repositoryDirectory = resolve(webDirectory, '..', '..');
const sourceDirectory = resolve(repositoryDirectory, 'boii_minigames', 'html');
const destinationDirectory = resolve(
  webDirectory,
  'public',
  'games',
  'boii'
);

await mkdir(destinationDirectory, { recursive: true });
await cp(sourceDirectory, destinationDirectory, {
  recursive: true,
  force: true,
});
await copyFile(
  resolve(repositoryDirectory, 'boii_minigames', 'LICENSE'),
  resolve(destinationDirectory, 'LICENSE')
);
