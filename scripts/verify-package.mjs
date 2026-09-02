import { access, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const packageRoot = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('package.json', packageRoot), 'utf8'));

async function assertFile(relativePath) {
  await access(new URL(relativePath.replace(/^\.\//, ''), packageRoot));
}

for (const target of Object.values(manifest.exports)) {
  if (typeof target === 'string') {
    await assertFile(target);
    continue;
  }

  await Promise.all(Object.values(target).map(assertFile));
}

const esm = await import('@16-bits-design/ui');
const esmAlert = await import('@16-bits-design/ui/alert');
const esmCard = await import('@16-bits-design/ui/card');
const esmTheme = await import('@16-bits-design/ui/theme');
const esmSpinner = await import('@16-bits-design/ui/spinner');
const esmSegmented = await import('@16-bits-design/ui/segmented');
const esmTable = await import('@16-bits-design/ui/table');

if (esm.Alert !== esmAlert.Alert || esm.Card !== esmCard.Card || esm.Segmented !== esmSegmented.Segmented || esm.Spinner !== esmSpinner.Spinner || esm.ThemeProvider !== esmTheme.ThemeProvider || esm.Table !== esmTable.Table) {
  throw new Error('ESM root exports do not resolve to the public component subpaths.');
}

const require = createRequire(import.meta.url);
const cjs = require('@16-bits-design/ui');
const cjsAlert = require('@16-bits-design/ui/alert');
const cjsCard = require('@16-bits-design/ui/card');
const cjsTheme = require('@16-bits-design/ui/theme');
const cjsSpinner = require('@16-bits-design/ui/spinner');
const cjsSegmented = require('@16-bits-design/ui/segmented');
const cjsTable = require('@16-bits-design/ui/table');

if (cjs.Alert !== cjsAlert.Alert || cjs.Card !== cjsCard.Card || cjs.Segmented !== cjsSegmented.Segmented || cjs.Spinner !== cjsSpinner.Spinner || cjs.ThemeProvider !== cjsTheme.ThemeProvider || cjs.Table !== cjsTable.Table) {
  throw new Error('CommonJS root exports do not resolve to the public component subpaths.');
}

const [dialogModule, toastModule, stylesheet] = await Promise.all([
  readFile(new URL('dist/dialog.js', packageRoot), 'utf8'),
  readFile(new URL('dist/toast.js', packageRoot), 'utf8'),
  readFile(new URL('dist/styles.css', packageRoot), 'utf8'),
]);

if (!dialogModule.includes("from '@16-bits-design/ui/theme'") || !toastModule.includes("from '@16-bits-design/ui/theme'")) {
  throw new Error('Portal components must share the public theme context.');
}

if (!stylesheet.includes("url('./assets/fonts/jetbrains-mono-latin.woff2')")) {
  throw new Error('The published stylesheet does not reference the packaged fonts.');
}

console.log(`Verified ${Object.keys(manifest.exports).length} public exports for ${manifest.name}@${manifest.version}.`);
