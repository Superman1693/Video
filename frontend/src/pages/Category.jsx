import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { videoApi } from '../services/api'
import './Category.css'

const CATEGORY_CONFIG = {
  movie: { title: '电影', type: 'MOVIE', icon: '🎬' },
  tv: { title: '电视剧', type: 'TV_SERIES', icon: '📺' },
  variety: { title: '综艺', type: 'VARIETY', icon: '🎭' },
  anime: { title: '动漫', type: 'ANIME', icon: '✨' },
  documentary: { title: '纪录片', type: 'DOCUMENTARY', icon: '🎥' },
  hot: { title: '热播推荐', type: null, icon: '🔥' },
  new: { title: '最新上线', type: null, icon: '✨' },
  recommended: { title: '口碑精选', type: null, icon: '⭐' },
  top: { title: '高分榜单', type: null, icon: '🏆' },
}

const SORT_OPTIONS = [
  { label: '综合排序', value: 'default' },
  { label: '最新上线', value: 'newest' },
  { label: '评分最高', value: 'rating' },
  { label: '播放最多', value: 'views' },
]

const FILTER_GENRES = ['全部', '剧情', '动作', '喜剧', '爱情', '科幻', '悬疑', '历史', '犯罪', '奇幻', '恐怖', '动画']
const FILTER_YEARS = ['全部', '2024', '2023', '2022', '2021', '2020', '2019', '更早']

export default function Category() {
  const { slug } = useParams()
  const config = CATEGORY_CONFIG[slug] || { title: '分类', icon: '🎬' }

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('default')
  const [selectedGenre, setSelectedGenre] = useState('全部')
  const [selectedYear, setSelectedYear] = useState('全部')

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      try {
        let res
        if (config.type) {
          res = await videoApi.getVideosByType(config.type)
          setVideos(res.data.data || [])
        } else if (slug === 'hot') {
          res = await videoApi.getHotVideos()
          setVideos(res.data.data || [])
        } else if (slug === 'new') {
          res = await videoApi.getNewVideos()
          setVideos(res.data.data || [])
        } else if (slug === 'recommended') {
          res = await videoApi.getRecommendedVideos()
          setVideos(res.data.data || [])
        } else if (slug === 'top') {
          res = await videoApi.getTopRatedVideos()
          setVideos(res.data.data || [])
        }
      } catch (err) {
        // Demo fallback
        const demos = Array.from({ length: 18 }, (_, i) => ({
          id: i + 1,
          title: `${config.title} - 影片${i + 1}`,
          coverUrl: `https://picsum.photos/seed/cat${slug}${i}/400/225`,
          rating: 7 + Math.random() * 2.5,
          year: 2023 - (i % 4),
          isHot: i < 6,
          isVip: i % 2 === 0,
          isNew: i >= 12,
          type: config.type || 'MOVIE',
          viewCount: Math.floor(Math.random() * 80000000),
          tags: '剧情,动作',
        }))
        setVideos(demos)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [slug])

  const sortedVideos = [...videos].sort((a, b) => {
    switch (sort) {
      case 'rating': return (b.rating || 0) - (a.rating || 0)
      case 'views': return (b.viewCount || 0) - (a.viewCount || 0)
      case 'newest': return (b.year || 0) - (a.year || 0)
      default: return 0
    }
  })

  return (
    <div className="category-page page-enter">
      {/* Hero */}
      <div className="cat-hero">
        <div className="container cat-hero__inner">
          <div className="cat-hero__icon">{config.icon}</div>
          <div>
            <h1 className="cat-hero__title">{config.title}</h1>
            <p className="cat-hero__count">
              {loading ? '加载中...' : `共 ${videos.length} 部作品`}
            </p>
          </div>
        </div>
      </div>

      <div className="container cat-content">
        {/* Filters */}
        <div className="cat-filters">
          {/* Genre filter */}
          <div className="cat-filter-row">
            <span className="cat-filter-label">类型</span>
            <div className="cat-filter-options">
              {FILTER_GENRES.map(genre => (
                <button
                  key={genre}
                  className={`cat-filter-btn ${selectedGenre === genre ? 'cat-filter-btn--active' : ''}`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Year filter */}
          <div className="cat-filter-row">
            <span className="cat-filter-label">年份</span>
            <div className="cat-filter-options">
              {FILTER_YEARS.map(year => (
                <button
                  key={year}
                  className={`cat-filter-btn ${selectedYear === year ? 'cat-filter-btn--active' : ''}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="cat-filter-row cat-filter-row--sort">
            <span className="cat-filter-label">排序</span>
            <div className="cat-filter-options">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`cat-filter-btn ${sort === opt.value ? 'cat-filter-btn--active' : ''}`}
                  onClick={() => setSort(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video grid */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner" />
          </div>
        ) : (
          <div className="cat-grid">
            {sortedVideos.map(video => (
              <VideoCard key={video.id} video={video} size="medium" />
            ))}
          </div>
        )}

        {!loading && videos.length === 0 && (
          <div className="cat-empty">
            <div className="cat-empty-icon">📭</div>
            <h3>暂无内容</h3>
          </div>
        )}
      </div>
    </div>
  )
}
