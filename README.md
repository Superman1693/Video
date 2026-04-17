# 腾讯视频高仿影视APP

一个高颜值的腾讯视频风格影视平台，前后端分离架构。

## 技术栈

### 后端 (Backend)
- **Java 17** + **Spring Boot 3.2**
- **Spring Data JPA** + **H2** 内存数据库
- **Maven** 构建工具
- RESTful API 设计

### 前端 (Frontend)
- **React 18** + **Vite**
- **React Router** 路由
- **Axios** HTTP 请求
- 纯 CSS 自定义样式（腾讯视频暗色主题）

## 功能特性

| 功能 | 说明 |
|------|------|
| 🎬 首页轮播 Banner | 自动切换 + 手动控制，支持缩略图预览 |
| 📺 分类视频行 | 水平滚动，按热播/最新/推荐/高分分类 |
| 🔍 搜索功能 | 全文搜索 + 热门搜索词 |
| 📋 分类筛选 | 按类型/年份/排序方式筛选 |
| 🎥 视频详情 | 播放器、评分、演职人员、相关推荐 |
| 💎 VIP 系统 | VIP 标签、会员开通引导 |
| 📱 响应式设计 | 支持桌面/平板/手机 |
| ♾️ 降级兜底 | 后端不可用时自动使用演示数据 |

## 页面截图

### 首页
![Homepage](https://github.com/user-attachments/assets/3343719c-8949-426f-b4d6-ae611462f4b6)

### 视频详情页
![Video Detail](https://github.com/user-attachments/assets/026ea30b-d249-475a-bf9e-c51f7205046d)

### 搜索页
![Search](https://github.com/user-attachments/assets/7dbecc5d-ecc2-4b5a-8d25-3c91d1bff353)

### 分类页
![Category](https://github.com/user-attachments/assets/17a87031-cc6d-4264-b5ab-c6d304a85f47)

## 快速启动

### 前置要求
- Java 17+
- Maven 3.6+
- Node.js 18+
- npm 9+

### 启动后端

```bash
cd backend
mvn spring-boot:run
# 后端运行在 http://localhost:8080
# H2 控制台: http://localhost:8080/h2-console
```

### 启动前端

```bash
cd frontend
npm install
npm run dev
# 前端运行在 http://localhost:5173
```

## API 文档

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/videos/hot` | GET | 热播视频列表 |
| `/api/videos/new` | GET | 最新视频列表 |
| `/api/videos/recommended` | GET | 推荐视频列表 |
| `/api/videos/top-rated` | GET | 高分视频列表 |
| `/api/videos/{id}` | GET | 视频详情 |
| `/api/videos/{id}/related` | GET | 相关推荐 |
| `/api/videos/search?keyword=xxx` | GET | 搜索视频 |
| `/api/videos/type/{type}` | GET | 按类型查询 |
| `/api/categories` | GET | 分类列表 |
| `/api/banners` | GET | Banner 列表 |

## 项目结构

```
Video/
├── backend/                      # Spring Boot 后端
│   ├── pom.xml
│   └── src/main/java/com/video/
│       ├── VideoApplication.java
│       ├── config/               # CORS、数据初始化
│       ├── controller/           # REST 控制器
│       ├── service/              # 业务逻辑
│       ├── repository/           # 数据访问
│       ├── model/                # 实体类
│       └── dto/                  # 数据传输对象
└── frontend/                     # React 前端
    ├── src/
    │   ├── components/           # 公共组件（Header、Banner、VideoCard 等）
    │   ├── pages/                # 页面（首页、详情、搜索、分类）
    │   └── services/             # API 服务
    └── vite.config.js
```

## 数据说明

项目启动时自动初始化演示数据，包括：
- **6** 个内容分类（电影、电视剧、综艺、动漫、纪录片、体育）
- **19** 部示例影视作品（含热播、最新、推荐、VIP 等标记）
- **5** 条轮播 Banner

