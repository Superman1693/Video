import { useRef } from 'react'
import { Link } from 'react-router-dom'
import VideoCard from './VideoCard'
import './VideoRow.css'

export default function VideoRow({ title, videos = [], link, cardSize = 'medium', loading = false }) {
  const rowRef = useRef(null)

  const scroll = (direction) => {
    if (!rowRef.current) return
    const amount = direction === 'left' ? -600 : 600
    rowRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="video-row">
      <div className="video-row__header">
        <div className="video-row__title-wrap">
          <div className="video-row__title-bar" />
          <h2 className="video-row__title">{title}</h2>
        </div>
        {link && (
          <Link to={link} className="video-row__more">
            更多 &rsaquo;
          </Link>
        )}
      </div>

      <div className="video-row__wrapper">
        {/* Left arrow */}
        <button
          className="video-row__arrow video-row__arrow--left"
          onClick={() => scroll('left')}
          aria-label="向左滚动"
        >
          ‹
        </button>

        {/* Videos list */}
        <div className="video-row__list" ref={rowRef}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`video-card-skeleton video-card--${cardSize}`} />
              ))
            : videos.map(video => (
                <VideoCard key={video.id} video={video} size={cardSize} />
              ))
          }
        </div>

        {/* Right arrow */}
        <button
          className="video-row__arrow video-row__arrow--right"
          onClick={() => scroll('right')}
          aria-label="向右滚动"
        >
          ›
        </button>
      </div>
    </section>
  )
}
