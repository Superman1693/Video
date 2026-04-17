import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { videoApi } from '../services/api'
import './VideoDetail.css'

export default function VideoDetail({ isLoggedIn, isVipUser, onActivateVip }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [video, setVideo] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeTab, setActiveTab] = useState('intro')

  const handlePlay = () => {
    if (video?.isVip && !isVipUser) {
      if (!isLoggedIn) {
        window.alert('该内容为VIP专享，请先登录后观看')
        return
      }
      const shouldActivate = window.confirm('该内容为VIP专享，是否立即开通VIP会员？')
      if (!shouldActivate) return
      onActivateVip?.()
    }
    setIsPlaying(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setIsPlaying(false)
      try {
        const [videoRes, relatedRes] = await Promise.all([
          videoApi.getVideoById(id),
          videoApi.getRelatedVideos(id),
        ])
        setVideo(videoRes.data.data)
        setRelatedVideos(relatedRes.data.data || [])
      } catch (err) {
        console.error('Failed to fetch video:', err)
        // Demo fallback
        setVideo(getDemoVideo(id))
        setRelatedVideos(Array.from({ length: 6 }, (_, i) => getDemoVideo(i + 1)))
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="video-detail video-detail--loading">
        <div className="loading-container">
          <div className="spinner" />
          <p>加载中...</p>
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="video-detail">
        <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
          <h2>视频未找到</h2>
          <button onClick={() => navigate('/')} className="vd-back-btn">返回首页</button>
        </div>
      </div>
    )
  }

  const typeLabel = {
    MOVIE: '电影',
    TV_SERIES: '电视剧',
    ANIME: '动漫',
    VARIETY: '综艺',
    DOCUMENTARY: '纪录片',
  }

  return (
    <div className="video-detail page-enter">
      {/* Video player section */}
      <div className="vd-player-wrap">
        <div className="vd-player-inner">
          {isPlaying ? (
            <div className="vd-player">
              <video
                src={video.videoUrl || 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'}
                controls
                autoPlay
                className="vd-video"
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          ) : (
            <div
              className="vd-thumbnail"
              style={{ backgroundImage: `url(${video.coverUrl || `https://picsum.photos/seed/${id}/1280/720`})` }}
            >
              <div className="vd-thumbnail-overlay" />
              <button className="vd-play-btn" onClick={handlePlay}>
                <PlayIcon />
                <span>立即播放</span>
              </button>
              {video.isVip && !isVipUser && (
                <div className="vd-vip-hint">
                  <span className="badge badge-vip">VIP</span>
                  <span>开通VIP会员即可免费观看</span>
                  <button className="vd-vip-open-btn" onClick={handlePlay}>立即开通</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="vd-main container">
        {/* Left - video info */}
        <div className="vd-left">
          {/* Meta info */}
          <div className="vd-meta">
            <div className="vd-badges">
              {video.isVip && <span className="badge badge-vip">VIP独家</span>}
              {video.isVip && isVipUser && <span className="badge vd-member-badge">会员可看</span>}
              {video.isHot && <span className="badge badge-hot">热播</span>}
              {video.isNew && <span className="badge badge-new">最新</span>}
              {typeLabel[video.type] && (
                <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                  {typeLabel[video.type]}
                </span>
              )}
            </div>

            <h1 className="vd-title">{video.title}</h1>

            <div className="vd-stats">
              {video.rating && (
                <div className="vd-rating">
                  <span className="vd-rating-score">{video.rating.toFixed(1)}</span>
                  <div className="vd-rating-stars">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} style={{ color: s <= Math.round(video.rating / 2) ? '#FFD700' : '#444' }}>★</span>
                    ))}
                    {video.ratingCount && (
                      <span className="vd-rating-count">{formatCount(video.ratingCount)}人评分</span>
                    )}
                  </div>
                </div>
              )}

              <div className="vd-info-grid">
                {video.year && <InfoItem label="年份" value={video.year} />}
                {video.country && <InfoItem label="地区" value={video.country} />}
                {video.durationMinutes && (
                  <InfoItem label="时长" value={
                    video.type === 'MOVIE'
                      ? `${video.durationMinutes}分钟`
                      : `每集约${video.durationMinutes}分钟`
                  } />
                )}
                {video.episodeCount && <InfoItem label="集数" value={`全${video.episodeCount}集`} />}
                {video.viewCount && <InfoItem label="播放" value={formatCount(video.viewCount)} />}
                {video.categoryName && <InfoItem label="分类" value={video.categoryName} />}
              </div>
            </div>

            {/* Action buttons */}
            <div className="vd-actions">
              <button className="vd-action-play" onClick={handlePlay}>
                <PlayIcon />
                立即播放
              </button>
              <button
                className={`vd-action-btn ${isFavorited ? 'vd-action-btn--active' : ''}`}
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <HeartIcon filled={isFavorited} />
                {isFavorited ? '已收藏' : '收藏'}
              </button>
              <button className="vd-action-btn">
                <ShareIcon />
                分享
              </button>
              <button className="vd-action-btn">
                <DownloadIcon />
                缓存
              </button>
            </div>

            {/* Tags */}
            {video.tags && (
              <div className="vd-tags">
                {video.tags.split(',').map(tag => (
                  <span key={tag} className="tag">{tag.trim()}</span>
                ))}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="vd-tabs">
            {['intro', 'cast', 'episodes'].map(tab => (
              <button
                key={tab}
                className={`vd-tab ${activeTab === tab ? 'vd-tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'intro' ? '简介' : tab === 'cast' ? '演职人员' : '选集'}
              </button>
            ))}
          </div>

          <div className="vd-tab-content">
            {activeTab === 'intro' && (
              <div className="vd-intro">
                {video.director && (
                  <p className="vd-director"><strong>导演：</strong>{video.director}</p>
                )}
                {video.cast && (
                  <p className="vd-cast"><strong>主演：</strong>{video.cast}</p>
                )}
                <p className="vd-desc">{video.description || '暂无简介'}</p>
              </div>
            )}

            {activeTab === 'cast' && (
              <div className="vd-cast-grid">
                {(video.cast || '').split(',').filter(Boolean).map((actor, i) => (
                  <div key={i} className="vd-cast-item">
                    <div className="vd-cast-avatar">
                      <img
                        src={`https://picsum.photos/seed/actor${i + 1}/80/80`}
                        alt={actor}
                      />
                    </div>
                    <span>{actor.trim()}</span>
                  </div>
                ))}
                {(!video.cast || video.cast.split(',').length === 0) && (
                  <p style={{ color: 'var(--text-muted)' }}>暂无演职人员信息</p>
                )}
              </div>
            )}

            {activeTab === 'episodes' && (
              <div className="vd-episodes">
                {video.episodeCount
                  ? Array.from({ length: Math.min(video.episodeCount, 20) }, (_, i) => (
                      <button key={i} className={`vd-episode-btn ${i === 0 ? 'vd-episode-btn--active' : ''}`}>
                        第{i + 1}集
                      </button>
                    ))
                  : <p style={{ color: 'var(--text-muted)' }}>这是一部电影，没有分集。</p>
                }
              </div>
            )}
          </div>
        </div>

        {/* Right - related videos */}
        <div className="vd-right">
          <h3 className="vd-related-title">相关推荐</h3>
          <div className="vd-related-list">
            {relatedVideos.map(v => (
              <div key={v.id} className="vd-related-item" onClick={() => navigate(`/video/${v.id}`)}>
                <div className="vd-related-cover">
                  <img
                    src={v.coverUrl || `https://picsum.photos/seed/${v.id}/200/112`}
                    alt={v.title}
                  />
                  <div className="vd-related-overlay">
                    <PlayIcon small />
                  </div>
                </div>
                <div className="vd-related-info">
                  <p className="vd-related-name">{v.title}</p>
                  {v.rating && <span className="vd-related-rating">★ {v.rating.toFixed(1)}</span>}
                  {v.year && <span className="vd-related-year">{v.year}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="vd-info-item">
      <span className="vd-info-label">{label}</span>
      <span className="vd-info-value">{value}</span>
    </div>
  )
}

function PlayIcon({ small }) {
  return (
    <svg width={small ? 16 : 20} height={small ? 16 : 20} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function formatCount(count) {
  if (!count) return ''
  if (count >= 100000000) return `${(count / 100000000).toFixed(1)}亿`
  if (count >= 10000) return `${(count / 10000).toFixed(0)}万`
  return count.toString()
}

function getDemoVideo(id) {
  const titles = ['流浪地球2', '满江红', '无名', '消失的她', '封神第一部', '长安三万里', '奥本海默', '芭比', '狂飙', '繁花', '漫长的季节', '三体']
  const i = (Number(id) - 1) % titles.length
  return {
    id: Number(id),
    title: titles[i] || `影片 ${id}`,
    description: '这是一部精彩的影视作品，剧情跌宕起伏，演员表演出色，值得一看。',
    coverUrl: `https://picsum.photos/seed/video${id}/1280/720`,
    rating: 8.0 + (i % 3) * 0.3,
    year: 2023,
    country: '中国',
    viewCount: 50000000,
    ratingCount: 1200000,
    durationMinutes: 120,
    isHot: i % 2 === 0,
    isNew: i % 3 === 0,
    isVip: i % 2 === 0,
    type: i < 8 ? 'MOVIE' : 'TV_SERIES',
    episodeCount: i >= 8 ? 36 : null,
    director: '著名导演',
    cast: '主演A,主演B,主演C',
    tags: '剧情,动作,科幻',
    categoryName: '电影',
    categoryId: 1,
  }
}
