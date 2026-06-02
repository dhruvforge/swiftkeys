// Preload runs in a privileged context before the page loads.
// Expose only what the renderer actually needs via contextBridge.

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('swiftkeys', {
  platform: process.platform,
})
