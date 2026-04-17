import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
})

export const videoApi = {
  getHotVideos: () => api.get('/videos/hot'),
  getNewVideos: () => api.get('/videos/new'),
  getRecommendedVideos: () => api.get('/videos/recommended'),
  getTopRatedVideos: () => api.get('/videos/top-rated'),
  getMostViewedVideos: () => api.get('/videos/most-viewed'),
  getVideoById: (id) => api.get(`/videos/${id}`),
  getVideosByCategory: (categoryId, page = 0, size = 20) =>
    api.get(`/videos/category/${categoryId}`, { params: { page, size } }),
  getVideosByType: (type, page = 0, size = 20) =>
    api.get(`/videos/type/${type}`, { params: { page, size } }),
  searchVideos: (keyword, page = 0, size = 20) =>
    api.get('/videos/search', { params: { keyword, page, size } }),
  getRelatedVideos: (id) => api.get(`/videos/${id}/related`),
}

export const categoryApi = {
  getAllCategories: () => api.get('/categories'),
}

export const bannerApi = {
  getActiveBanners: () => api.get('/banners'),
}

export default api
