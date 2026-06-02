// Converts public/icon.svg → public/icon.png (256x256) and public/icon.ico
// Run once: node scripts/make-icons.mjs

import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const svgBuf = readFileSync(path.join(root, 'public', 'icon.svg'))

// PNG 256x256
const pngBuf = await sharp(svgBuf).resize(256, 256).png().toBuffer()
writeFileSync(path.join(root, 'public', 'icon.png'), pngBuf)
console.log('✓ icon.png')

// ICO: embed a 256x256 PNG inside a minimal ICO wrapper
// ICO format: ICONDIR + ICONDIRENTRY + PNG data
const pngData = pngBuf
const iconDir   = Buffer.alloc(6)
iconDir.writeUInt16LE(0, 0)  // reserved
iconDir.writeUInt16LE(1, 2)  // type: ICO
iconDir.writeUInt16LE(1, 4)  // image count

const entry = Buffer.alloc(16)
entry.writeUInt8(0, 0)               // width  (0 = 256)
entry.writeUInt8(0, 1)               // height (0 = 256)
entry.writeUInt8(0, 2)               // color count
entry.writeUInt8(0, 3)               // reserved
entry.writeUInt16LE(1, 4)            // color planes
entry.writeUInt16LE(32, 6)           // bits per pixel
entry.writeUInt32LE(pngData.length, 8)   // size of image data
entry.writeUInt32LE(6 + 16, 12)          // offset of image data

writeFileSync(
  path.join(root, 'public', 'icon.ico'),
  Buffer.concat([iconDir, entry, pngData])
)
console.log('✓ icon.ico')
