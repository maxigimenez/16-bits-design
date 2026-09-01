import { copyFile, mkdir } from 'node:fs/promises';

const sourceAssets = new URL('../src/assets/fonts/', import.meta.url);
const outputAssets = new URL('../dist/assets/fonts/', import.meta.url);

await mkdir(outputAssets, { recursive: true });
await copyFile(new URL('../src/styles.css', import.meta.url), new URL('../dist/styles.css', import.meta.url));

await Promise.all([
  'jetbrains-mono-latin.woff2',
  'silkscreen-latin-bold.woff2',
  'silkscreen-latin-regular.woff2',
].map((font) => copyFile(new URL(font, sourceAssets), new URL(font, outputAssets))));
