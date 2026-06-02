import { HashRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import TypingTest from './components/TypingTest'
import Focus from './pages/Focus'
import History from './pages/History'

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="app">
            <Header />
            <main className="main">
              <Routes>
                <Route path="/" element={<TypingTest />} />
                <Route path="/focus" element={<Focus />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  )
}
