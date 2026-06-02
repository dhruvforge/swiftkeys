/**
 * Embeds our icon.ico into the SwiftKeys.exe using resedit
 */
import { Data, NtExecutable, NtExecutableResource, Resource } from 'resedit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const exePath = path.join(projectRoot, 'dist-electron', 'win-unpacked', 'SwiftKeys.exe');
const iconPath = path.join(projectRoot, 'public', 'icon.ico');

if (!fs.existsSync(iconPath)) {
  console.error('icon.ico not found at:', iconPath);
  process.exit(1);
}

if (!fs.existsSync(exePath)) {
  console.error('SwiftKeys.exe not found at:', exePath);
  process.exit(1);
}

console.log('Reading exe...');
const exeData = fs.readFileSync(exePath);
const exe = NtExecutable.from(exeData);
const res = NtExecutableResource.from(exe);

console.log('Reading icon...');
const iconData = fs.readFileSync(iconPath);
const iconFile = Data.IconFile.from(iconData);

const existingIconGroups = Resource.IconGroupEntry.fromEntries(res.entries);
console.log(`Found ${existingIconGroups.length} icon group(s) in exe`);

if (existingIconGroups.length > 0) {
  Resource.IconGroupEntry.replaceIconsForResource(
    res.entries,
    existingIconGroups[0].id,
    existingIconGroups[0].lang,
    iconFile.icons.map(item => item.data)
  );
  console.log('Replaced icon successfully');
} else {
  console.log('No existing icon group found, skipping icon replacement');
}

res.outputResource(exe);
const newExeData = Buffer.from(exe.generate());
fs.writeFileSync(exePath, newExeData);
console.log('Done! Icon updated in SwiftKeys.exe');
