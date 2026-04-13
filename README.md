# 樊赛娅作品集网站

基于 Astro 构建的静态作品集网站，深色高级风格，参考 peachweb.io 的视觉表达。

## 项目特点

- **全宽铺满布局**：留白高级，排版节奏好
- **深色电影感**：克制动效，玻璃质感导航
- **内容驱动**：只需修改 `src/content.json` 即可更新全站
- **SEO 友好**：完整的 meta 标签和语义化 HTML
- **响应式设计**：移动端、平板、桌面全适配

## 快速开始

### 本地预览

```bash
npm install
npm run dev
```

访问 `http://localhost:4321`

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

## 项目结构

```
fansaiya-profile/
├── src/
│   ├── components/       # 组件
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/          # 布局
│   │   └── Layout.astro
│   ├── pages/            # 页面（自动路由）
│   │   ├── index.astro   # 首页
│   │   ├── works.astro   # 作品列表
│   │   ├── about.astro   # 关于
│   │   ├── contact.astro # 联系
│   │   ├── video.astro   # 视频
│   │   ├── gallery.astro # 图集
│   │   └── project/
│   │       └── [id].astro # 作品详情（动态路由）
│   ├── styles/           # 样式
│   │   ├── design-system.css # 设计系统变量
│   │   ├── globals.css       # 全局样式
│   │   ├── index.css         # 首页样式
│   │   ├── works.css         # 作品列表样式
│   │   ├── project.css       # 作品详情样式
│   │   └── page.css          # 通用页面样式
│   └── content.json      # 内容数据（核心）
├── public/
│   └── downloads/
│       └── portfolio.pdf # 作品集 PDF
└── astro.config.mjs      # Astro 配置
```

## 如何更新内容

### 1. 修改作品信息

编辑 `src/content.json`：

```json
{
  "works": [
    {
      "id": 1,
      "title": "作品标题",
      "slug": "work-slug",
      "category": "环境设计",
      "tags": ["UE5", "地形", "光照"],
      "description": "详细描述...",
      "shortDescription": "简短描述",
      "coverImage": "图片URL或路径",
      "images": ["图1", "图2"],
      "videoUrl": "视频链接（可选）",
      "details": {
        "engine": "Unreal Engine 5.4",
        "scale": "8km²",
        "duration": "3 months",
        "team": "Solo Project",
        "description": "项目详情..."
      }
    }
  ]
}
```

### 2. 替换图片

- 方式 1：使用外部图床（如 Unsplash、自己的 CDN）
- 方式 2：放到 `public/images/` 目录，然后在 JSON 里写 `/images/xxx.jpg`

### 3. 更新作品集 PDF

替换 `public/downloads/portfolio.pdf`。

### 4. 修改联系方式

编辑 `src/content.json` 的 `site` 部分：

```json
{
  "site": {
    "email": "your@email.com",
    "wechat": "微信号"
  }
}
```

## 部署

### Vercel（推荐）

1. 把项目推到 GitHub
2. 在 Vercel 导入项目
3. 自动检测 Astro 并部署

### Netlify

1. 把项目推到 GitHub
2. 在 Netlify 导入项目
3. Build command: `npm run build`
4. Publish directory: `dist`

### 其他静态托管

构建后把 `dist/` 目录上传到任何静态托管服务。

## 设计系统

所有设计变量在 `src/styles/design-system.css`：

- 颜色：`--color-*`
- 字体：`--font-*`
- 间距：`--spacing-*`
- 圆角：`--radius-*`
- 阴影：`--shadow-*`

修改这些变量可以快速调整全站视觉。

## 技术栈

- **Astro 6.1** - 静态站点生成器
- **TypeScript** - 类型安全
- **CSS Variables** - 设计系统
- **原生 JavaScript** - 搜索/筛选交互

## 浏览器支持

- Chrome/Edge（最新 2 个版本）
- Firefox（最新 2 个版本）
- Safari（最新 2 个版本）

## 许可

© 2026 樊赛娅. All rights reserved.
