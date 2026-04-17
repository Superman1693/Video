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

export default function Header({ user, onLogin, onLogout, onActivateVip }) {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [authError, setAuthError] = useState('')
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

  const handleOpenVip = () => {
    if (!user) {
      setAuthDialogOpen(true)
      setAuthError('请先登录后再开通VIP会员')
      return
    }
    if (user.isVip) {
      window.alert('您已是VIP会员')
      return
    }
    onActivateVip?.()
    window.alert('VIP会员开通成功')
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    const username = formData.username.trim()
    const password = formData.password.trim()
    if (!username || !password) {
      setAuthError('请输入用户名和密码')
      return
    }
    if (password.length < 6) {
      setAuthError('密码长度至少6位')
      return
    }
    onLogin?.(username)
    setAuthDialogOpen(false)
    setAuthError('')
    setFormData({ username: '', password: '' })
  }

  return (
    <>
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
            <button className="header__vip-btn" onClick={handleOpenVip}>
              <span>🎬</span>
              <span>{user?.isVip ? 'VIP已开通' : '开通VIP'}</span>
            </button>

            {/* Login */}
            {user ? (
              <>
                <button className="header__login-btn header__login-btn--active">{user.username}</button>
                <button className="header__logout-btn" onClick={onLogout}>退出</button>
              </>
            ) : (
              <button
                className="header__login-btn"
                onClick={() => {
                  setAuthDialogOpen(true)
                  setAuthError('')
                }}
              >
                登录
              </button>
            )}

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

      {authDialogOpen && (
        <div className="header__auth-mask" onClick={() => setAuthDialogOpen(false)}>
          <div className="header__auth-dialog" onClick={e => e.stopPropagation()}>
            <h3>账号登录</h3>
            <p>登录后可收藏内容并开通VIP会员</p>
            <form onSubmit={handleSubmitLogin}>
              <input
                type="text"
                placeholder="请输入用户名"
                value={formData.username}
                onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
              />
              <input
                type="password"
                placeholder="请输入密码"
                value={formData.password}
                onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
              <div className="header__auth-tip">密码长度至少6位</div>
              {authError && <div className="header__auth-error">{authError}</div>}
              <div className="header__auth-actions">
                <button type="button" onClick={() => setAuthDialogOpen(false)}>取消</button>
                <button type="submit">登录</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
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
