# SwiftKeys

A typing speed trainer built with React + Electron. Track your WPM, accuracy, and improvement over time — all stored locally, no account needed.

## Features

- Real-time WPM and accuracy tracking
- Adaptive learning — adjusts to your weak spots
- Results history and progress charts
- Focus mode
- Works as a desktop app (Electron) or in the browser

## Run Locally

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/dhruvforge/swiftkeys.git
cd swiftkeys
npm install
```

### Run in browser
```bash
npm run dev
```

### Run as desktop app
```bash
npm run electron:dev
```

## Build

### Desktop app (Windows)
```bash
npm run electron:build
```
Output will be in `dist-electron/`.

## Tech Stack

- **React 19** + **Vite**
- **Electron** — desktop wrapper
- **Recharts** — progress charts
- **React Router**
- All data stored locally in the browser / app storage
