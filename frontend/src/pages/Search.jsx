import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { videoApi } from '../services/api'
import './Search.css'

const HOT_SEARCHES = ['流浪地球', '狂飙', '繁花', '三体', '奥本海默', '芭比', '漫长的季节', '黑暗荣耀']

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''

  const [inputValue, setInputValue] = useState(query)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [totalElements, setTotalElements] = useState(0)

  useEffect(() => {
    setInputValue(query)
    if (!query) {
      setResults(null)
      return
    }

    const doSearch = async () => {
      setLoading(true)
      try {
        const res = await videoApi.searchVideos(query)
        const data = res.data.data
        setResults(data.content || [])
        setTotalElements(data.totalElements || 0)
      } catch (err) {
        console.error('Search failed:', err)
        // Demo fallback
        const demoResults = Array.from({ length: 6 }, (_, i) => ({
          id: i + 1,
          title: `${query}相关 - ${['电影', '电视剧', '综艺'][i % 3]}${i + 1}`,
          coverUrl: `https://picsum.photos/seed/search${i + 1}/400/225`,
          rating: 7.5 + Math.random(),
          year: 2023,
          isHot: i < 3,
          type: i < 3 ? 'MOVIE' : 'TV_SERIES',
          viewCount: Math.floor(Math.random() * 50000000),
        }))
        setResults(demoResults)
        setTotalElements(demoResults.length)
      } finally {
        setLoading(false)
      }
    }
    doSearch()
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() })
    }
  }

  const handleHotSearch = (term) => {
    setInputValue(term)
    setSearchParams({ q: term })
  }

  return (
    <div className="search-page page-enter">
      <div className="search-page__header">
        <div className="container">
          {/* Search bar */}
          <form onSubmit={handleSubmit} className="search-page__form">
            <div className="search-page__input-wrap">
              <SearchIcon />
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="搜索影视、演员、导演..."
                className="search-page__input"
                autoFocus
              />
              {inputValue && (
                <button
                  type="button"
                  className="search-page__clear"
                  onClick={() => { setInputValue(''); setSearchParams({}); setResults(null) }}
                >
                  ✕
                </button>
              )}
            </div>
            <button type="submit" className="search-page__submit">搜索</button>
          </form>

          {/* Hot searches */}
          {!query && (
            <div className="search-page__hot">
              <h3>🔥 热门搜索</h3>
              <div className="search-page__hot-list">
                {HOT_SEARCHES.map((term, i) => (
                  <button
                    key={term}
                    className="search-page__hot-item"
                    onClick={() => handleHotSearch(term)}
                  >
                    <span className={`search-page__hot-rank ${i < 3 ? 'search-page__hot-rank--top' : ''}`}>
                      {i + 1}
                    </span>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container search-page__content">
        {query && (
          <>
            {loading ? (
              <div className="loading-container">
                <div className="spinner" />
              </div>
            ) : results !== null ? (
              <>
                <div className="search-page__meta">
                  <span>搜索 "<strong>{query}</strong>" 共找到 <strong>{totalElements}</strong> 个结果</span>
                </div>
                {results.length > 0 ? (
                  <div className="search-page__results">
                    {results.map(video => (
                      <VideoCard key={video.id} video={video} size="large" />
                    ))}
                  </div>
                ) : (
                  <div className="search-page__empty">
                    <div className="search-page__empty-icon">🔍</div>
                    <h3>没有找到相关内容</h3>
                    <p>换个关键词试试吧</p>
                  </div>
                )}
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  )
}
