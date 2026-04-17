import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Banner.css'

export default function Banner({ banners = [] }) {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % banners.length)
  }, [banners.length])

  const prev = () => {
    setCurrent(prev => (prev - 1 + banners.length) % banners.length)
  }

  useEffect(() => {
    if (isHovered || banners.length === 0) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isHovered, next, banners.length])

  if (!banners.length) {
    return <div className="banner banner--loading"><div className="spinner" /></div>
  }

  const banner = banners[current]

  return (
    <div
      className="banner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background images */}
      {banners.map((b, i) => (
        <div
          key={b.id}
          className={`banner__bg ${i === current ? 'banner__bg--active' : ''}`}
          style={{ backgroundImage: `url(${b.imageUrl})` }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="banner__overlay" />
      <div className="banner__overlay-bottom" />

      {/* Content */}
      <div className="banner__content container">
        <div className="banner__info">
          {banner.badgeText && (
            <span
              className="banner__badge"
              style={{ background: banner.badgeColor || 'var(--accent-primary)' }}
            >
              {banner.badgeText}
            </span>
          )}
          <h1 className="banner__title">{banner.title}</h1>
          <p className="banner__subtitle">{banner.subtitle}</p>
          <div className="banner__actions">
            <button
              className="banner__play-btn"
              onClick={() => banner.videoId && navigate(`/video/${banner.videoId}`)}
            >
              <PlayIcon />
              立即播放
            </button>
            <button
              className="banner__detail-btn"
              onClick={() => banner.videoId && navigate(`/video/${banner.videoId}`)}
            >
              详情介绍
            </button>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="banner__thumbnails">
          {banners.map((b, i) => (
            <button
              key={b.id}
              className={`banner__thumbnail ${i === current ? 'banner__thumbnail--active' : ''}`}
              onClick={() => setCurrent(i)}
            >
              <img src={b.imageUrl} alt={b.title} />
              <div className="banner__thumbnail-overlay" />
              <span className="banner__thumbnail-title">{b.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Arrow navigation */}
      <button className="banner__arrow banner__arrow--prev" onClick={prev}>
        <ChevronIcon direction="left" />
      </button>
      <button className="banner__arrow banner__arrow--next" onClick={next}>
        <ChevronIcon direction="right" />
      </button>

      {/* Dot indicators */}
      <div className="banner__dots">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`banner__dot ${i === current ? 'banner__dot--active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}

function ChevronIcon({ direction }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      {direction === 'left'
        ? <path d="M15 18l-6-6 6-6"/>
        : <path d="M9 18l6-6-6-6"/>
      }
    </svg>
  )
}
