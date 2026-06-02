const { app, BrowserWindow, shell, Menu } = require('electron')
const path = require('path')

const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 860,
    minHeight: 580,
    backgroundColor: '#0e0d16',
    title: 'SwiftKeys',
    icon: path.join(__dirname, isDev ? '../public/icon.png' : '../dist/icon.png'),
    show: false, // wait until ready-to-show for a clean launch
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  // Remove default menu bar (keeps it clean)
  Menu.setApplicationMenu(null)

  if (isDev) {
    win.loadURL('http://localhost:5174')
  } else {
    // In production, load the built index.html
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Show window only when fully painted — no white flash
  win.once('ready-to-show', () => win.show())

  // Open external links in the OS default browser, not a new Electron window
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url)
    return { action: 'deny' }
  })

  if (isDev) {
    // Uncomment to open DevTools automatically during development:
    // win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()

  // macOS: re-create window when dock icon is clicked and no windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit on all windows closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
