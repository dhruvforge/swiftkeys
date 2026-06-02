/**
 * Rebuilds app.asar from current dist/ output and electron/ folder,
 * then replaces it in dist-electron/win-unpacked/resources/
 */
import { createPackage } from '@electron/asar';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const tempDir = path.join(os.tmpdir(), 'swiftkeys-app-staging');
const outputAsar = path.join(projectRoot, 'dist-electron', 'win-unpacked', 'resources', 'app.asar');

// Clean and recreate temp dir
fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir, { recursive: true });

// Copy dist/ -> temp/dist/
const distSrc = path.join(projectRoot, 'dist');
const distDst = path.join(tempDir, 'dist');
fs.cpSync(distSrc, distDst, { recursive: true });
console.log('Copied dist/ to staging');

// Copy electron/ -> temp/electron/
const electronSrc = path.join(projectRoot, 'electron');
const electronDst = path.join(tempDir, 'electron');
fs.cpSync(electronSrc, electronDst, { recursive: true });
console.log('Copied electron/ to staging');

// Copy package.json
fs.copyFileSync(
  path.join(projectRoot, 'package.json'),
  path.join(tempDir, 'package.json')
);
console.log('Copied package.json to staging');

// Pack into asar
console.log('Packing into asar...');
await createPackage(tempDir, outputAsar);
console.log('Done! app.asar updated at:', outputAsar);

// Cleanup
fs.rmSync(tempDir, { recursive: true, force: true });
