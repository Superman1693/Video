import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import VideoDetail from './pages/VideoDetail'
import Search from './pages/Search'
import Category from './pages/Category'
import './App.css'

const USER_STORAGE_KEY = 'video-app-user'

export default function App() {
  const [user, setUser] = useState(loadUserFromStorage)
  const isLoggedIn = Boolean(user?.username)
  const isVip = Boolean(user?.isVip)

  const handleLogin = (username) => {
    const nextUser = {
      username,
      isVip: user?.isVip || false,
      vipActivatedAt: user?.vipActivatedAt || null,
    }
    setUser(nextUser)
    saveUserToStorage(nextUser)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem(USER_STORAGE_KEY)
  }

  const handleActivateVip = () => {
    if (!user) return false
    if (user.isVip) return false
    const nextUser = {
      ...user,
      isVip: true,
      vipActivatedAt: new Date().toISOString(),
    }
    setUser(nextUser)
    saveUserToStorage(nextUser)
    return true
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onActivateVip={handleActivateVip}
        />
        <main className="app__main">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isLoggedIn={isLoggedIn}
                  isVip={isVip}
                  onActivateVip={handleActivateVip}
                />
              }
            />
            <Route
              path="/video/:id"
              element={
                <VideoDetail
                  isLoggedIn={isLoggedIn}
                  isVipUser={isVip}
                  onActivateVip={handleActivateVip}
                />
              }
            />
            <Route path="/search" element={<Search />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function loadUserFromStorage() {
  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveUserToStorage(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '64px',
      gap: '16px',
    }}>
      <div style={{ fontSize: '80px' }}>🎬</div>
      <h1 style={{ fontSize: '32px', color: 'var(--text-primary)' }}>页面未找到</h1>
      <p style={{ color: 'var(--text-muted)' }}>您访问的页面不存在</p>
      <a
        href="/"
        style={{
          marginTop: '8px',
          padding: '10px 24px',
          background: 'var(--accent-primary)',
          borderRadius: '8px',
          color: '#fff',
        }}
      >
        返回首页
      </a>
    </div>
  )
}
