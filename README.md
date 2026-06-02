# SwiftKeys

A typing speed trainer built with React + Electron. Track your WPM, accuracy, and improvement over time.

## Features

- Real-time WPM and accuracy tracking
- Adaptive learning — adjusts to your weak spots
- Results history and progress charts
- Focus mode
- Auth (login/signup via Supabase)
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

Create a `.env.local` file in the root:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Get these from your [Supabase project settings](https://supabase.com/dashboard).

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
- **Supabase** — auth and results storage
- **Recharts** — progress charts
- **React Router**
