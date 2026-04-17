import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import VideoDetail from './pages/VideoDetail'
import Search from './pages/Search'
import Category from './pages/Category'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<VideoDetail />} />
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
