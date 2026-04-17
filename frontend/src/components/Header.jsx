import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Header.css'

const NAV_ITEMS = [
  { label: '首页', path: '/' },
  { label: '电影', path: '/category/movie' },
  { label: '电视剧', path: '/category/tv' },
  { label: '综艺', path: '/category/variety' },
  { label: '动漫', path: '/category/anime' },
  { label: '纪录片', path: '/category/documentary' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const searchRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [searchOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">
            <svg viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="6" fill="#00B2FF"/>
              <path d="M8 12h4v12H8V12zm6 0l8 6-8 6V12zm10 0h4v12h-4V12z" fill="white"/>
            </svg>
          </div>
          <span className="header__logo-text">腾讯视频</span>
        </Link>

        {/* Navigation */}
        <nav className="header__nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`header__nav-item ${isActive(item.path) ? 'header__nav-item--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="header__actions">
          {/* Search */}
          <div className={`header__search ${searchOpen ? 'header__search--open' : ''}`}>
            {searchOpen ? (
              <form onSubmit={handleSearch} className="header__search-form">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="搜索影视、演员、导演..."
                  className="header__search-input"
                />
                <button type="submit" className="header__search-btn">
                  <SearchIcon />
                </button>
                <button
                  type="button"
                  className="header__search-close"
                  onClick={() => setSearchOpen(false)}
                >
                  ✕
                </button>
              </form>
            ) : (
              <button
                className="header__icon-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="搜索"
              >
                <SearchIcon />
              </button>
            )}
          </div>

          {/* VIP Button */}
          <button className="header__vip-btn">
            <span>🎬</span>
            <span>开通VIP</span>
          </button>

          {/* Login */}
          <button className="header__login-btn">登录</button>

          {/* Mobile menu */}
          <button
            className="header__mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="header__mobile-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="header__mobile-nav-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  )
}
