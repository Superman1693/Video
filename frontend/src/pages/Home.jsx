import { useState, useEffect } from 'react'
import Banner from '../components/Banner'
import VideoRow from '../components/VideoRow'
import { videoApi, bannerApi } from '../services/api'
import './Home.css'

export default function Home({ isLoggedIn, isVip, onActivateVip }) {
  const [banners, setBanners] = useState([])
  const [hotVideos, setHotVideos] = useState([])
  const [newVideos, setNewVideos] = useState([])
  const [recommendedVideos, setRecommendedVideos] = useState([])
  const [topRatedVideos, setTopRatedVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [bannersRes, hotRes, newRes, recRes, topRes] = await Promise.all([
          bannerApi.getActiveBanners(),
          videoApi.getHotVideos(),
          videoApi.getNewVideos(),
          videoApi.getRecommendedVideos(),
          videoApi.getTopRatedVideos(),
        ])
        setBanners(bannersRes.data.data || [])
        setHotVideos(hotRes.data.data || [])
        setNewVideos(newRes.data.data || [])
        setRecommendedVideos(recRes.data.data || [])
        setTopRatedVideos(topRes.data.data || [])
      } catch (err) {
        console.error('Failed to fetch home data:', err)
        // Use fallback demo data when backend is not available
        setBanners(DEMO_BANNERS)
        setHotVideos(DEMO_VIDEOS.filter(v => v.isHot))
        setNewVideos(DEMO_VIDEOS.filter(v => v.isNew))
        setRecommendedVideos(DEMO_VIDEOS.filter(v => v.isRecommended))
        setTopRatedVideos([...DEMO_VIDEOS].sort((a, b) => b.rating - a.rating))
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const handleOpenVip = () => {
    if (!isLoggedIn) {
      window.alert('请先登录后再开通VIP会员')
      return
    }
    if (isVip) {
      window.alert('您已是VIP会员')
      return
    }
    const activated = onActivateVip?.()
    window.alert(activated ? 'VIP会员开通成功' : '开通失败，请稍后重试')
  }

  return (
    <div className="home page-enter">
      {/* Banner */}
      <Banner banners={banners} />

      {/* Category quick nav */}
      <div className="home__categories">
        <div className="container">
          <div className="home__category-list">
            {CATEGORY_QUICK_NAV.map(cat => (
              <a key={cat.label} href={cat.path} className="home__category-item">
                <span className="home__category-icon">{cat.icon}</span>
                <span>{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Video rows */}
      <main className="home__main container">
        <VideoRow
          title="🔥 热播推荐"
          videos={hotVideos}
          loading={loading}
          link="/category/hot"
          cardSize="medium"
        />

        {/* Featured VIP banner */}
        <div className="home__vip-banner">
          <div className="home__vip-banner-content">
            <div className="home__vip-badge">VIP</div>
            <div className="home__vip-text">
              <h3>{isVip ? '您已开通腾讯视频VIP会员' : '开通腾讯视频VIP会员'}</h3>
              <p>{isVip ? '尊享4K超清、无广告、VIP专享影视内容' : '海量影视免费看 · 4K超清画质 · 无广告体验'}</p>
            </div>
            <button
              className={`home__vip-btn ${isVip ? 'home__vip-btn--opened' : ''}`}
              onClick={handleOpenVip}
            >
              {isVip ? 'VIP已开通' : '立即开通 ¥25/月'}
            </button>
          </div>
        </div>

        <VideoRow
          title="✨ 最新上线"
          videos={newVideos}
          loading={loading}
          link="/category/new"
          cardSize="medium"
        />

        <VideoRow
          title="⭐ 口碑精选"
          videos={recommendedVideos}
          loading={loading}
          link="/category/recommended"
          cardSize="large"
        />

        <VideoRow
          title="🏆 高分榜单"
          videos={topRatedVideos}
          loading={loading}
          link="/category/top"
          cardSize="medium"
        />
      </main>
    </div>
  )
}

const CATEGORY_QUICK_NAV = [
  { label: '电影', icon: '🎬', path: '/category/movie' },
  { label: '电视剧', icon: '📺', path: '/category/tv' },
  { label: '综艺', icon: '🎭', path: '/category/variety' },
  { label: '动漫', icon: '✨', path: '/category/anime' },
  { label: '纪录片', icon: '🎥', path: '/category/documentary' },
  { label: '体育', icon: '⚽', path: '/category/sports' },
  { label: '儿童', icon: '🧒', path: '/category/children' },
  { label: '音乐', icon: '🎵', path: '/category/music' },
]

// Demo data for when backend is not available
const DEMO_BANNERS = [
  { id: 1, title: '流浪地球2', subtitle: '中国科幻巨制 震撼来袭', imageUrl: 'https://picsum.photos/seed/banner1/1920/800', videoId: 1, badgeText: 'VIP独家', badgeColor: '#FFD700' },
  { id: 2, title: '狂飙', subtitle: '年度最佳剧集 口碑炸裂', imageUrl: 'https://picsum.photos/seed/banner2/1920/800', videoId: 9, badgeText: '热播', badgeColor: '#FF4444' },
  { id: 3, title: '繁花', subtitle: '王家卫执导 胡歌主演', imageUrl: 'https://picsum.photos/seed/banner3/1920/800', videoId: 10, badgeText: '大剧', badgeColor: '#4FC3F7' },
]

const DEMO_VIDEOS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: ['流浪地球2', '满江红', '无名', '消失的她', '封神第一部', '长安三万里', '奥本海默', '芭比', '狂飙', '繁花', '漫长的季节', '三体'][i],
  coverUrl: `https://picsum.photos/seed/video${i + 1}/400/225`,
  rating: 7.5 + Math.random() * 2,
  year: 2023,
  viewCount: Math.floor(Math.random() * 100000000),
  isHot: i < 6,
  isNew: i >= 4 && i < 10,
  isRecommended: i % 3 === 0,
  isVip: i % 2 === 0,
  type: i < 8 ? 'MOVIE' : 'TV_SERIES',
  tags: '剧情,动作,科幻',
}))
