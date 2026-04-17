import { useNavigate } from 'react-router-dom'
import './VideoCard.css'

export default function VideoCard({ video, size = 'medium' }) {
  const navigate = useNavigate()

  if (!video) return null

  const handleClick = () => navigate(`/video/${video.id}`)

  const formatViews = (count) => {
    if (!count) return ''
    if (count >= 100000000) return `${(count / 100000000).toFixed(1)}亿播放`
    if (count >= 10000) return `${(count / 10000).toFixed(1)}万播放`
    return `${count}播放`
  }

  const typeLabel = {
    MOVIE: '电影',
    TV_SERIES: '电视剧',
    ANIME: '动漫',
    VARIETY: '综艺',
    DOCUMENTARY: '纪录片',
  }

  return (
    <div className={`video-card video-card--${size}`} onClick={handleClick}>
      {/* Cover image */}
      <div className="video-card__cover">
        <img
          src={video.coverUrl || `https://picsum.photos/seed/${video.id}/400/225`}
          alt={video.title}
          loading="lazy"
        />

        {/* Overlay */}
        <div className="video-card__overlay">
          <button className="video-card__play">
            <PlayIcon />
          </button>
          {video.durationMinutes && (
            <span className="video-card__duration">
              {formatDuration(video.durationMinutes)}
            </span>
          )}
          {video.episodeCount && (
            <span className="video-card__episodes">全{video.episodeCount}集</span>
          )}
        </div>

        {/* Badges */}
        <div className="video-card__badges">
          {video.isVip && <span className="badge badge-vip">VIP</span>}
          {video.isHot && <span className="badge badge-hot">热</span>}
          {video.isNew && <span className="badge badge-new">新</span>}
        </div>

        {/* Type tag */}
        {typeLabel[video.type] && (
          <span className="video-card__type">{typeLabel[video.type]}</span>
        )}
      </div>

      {/* Info */}
      <div className="video-card__info">
        <h3 className="video-card__title">{video.title}</h3>
        <div className="video-card__meta">
          {video.rating && (
            <span className="video-card__rating">
              ★ {video.rating.toFixed(1)}
            </span>
          )}
          {video.year && (
            <span className="video-card__year">{video.year}</span>
          )}
          <span className="video-card__views">{formatViews(video.viewCount)}</span>
        </div>
        {size === 'large' && video.tags && (
          <div className="video-card__tags">
            {video.tags.split(',').slice(0, 3).map(tag => (
              <span key={tag} className="tag">{tag.trim()}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}

function formatDuration(minutes) {
  if (!minutes) return ''
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}`
  return `${m}分钟`
}
