# zhangjiachang.com 个人网站开发计划

## 项目定位

- **技术栈**：Next.js 14 App Router + TypeScript + Tailwind CSS
- **部署**：Vercel，域名 zhangjiachang.com
- **内容**：文件系统 MDX（`/content/blog/`、`/content/work/`），无数据库
- **设计**：Apple 风格、编辑级质感、Typography-driven、深色/浅色模式

---

## 设计系统要点

### 字体策略

- **英文标题/强调**：Google Fonts 选气质接近的——`Instrument Sans`、`DM Sans` 或 `Outfit`（Söhne/Neue Montreal 替代）
- **中文**：`"PingFang SC", "Noto Sans SC", sans-serif`
- 使用 `next/font` 加载，避免 CLS

### 配色与模式

- **浅色**：背景 `#fafafa`，文字 `#0a0a0a`
- **深色**：背景 `#0a0a0a` 或 `#000`，文字 `#fafafa`
- **强调色**：`#5856D6` 或 `#FF6B35`，仅用于链接 hover、导航指示

### 布局约束

- 正文 `max-w-[720px]`
- 作品区域可更宽（如 `max-w-4xl`）
- Mobile-first 响应式

---

## Phase 1：先跑起来（优先实现）

### 1.1 项目初始化

```bash
npx create-next-app@latest zhangjiachang-website --typescript --tailwind --app --src-dir=false
```

- 启用 TypeScript 严格模式
- 配置 `tailwind.config.ts`：自定义颜色、字体、动画时长
- 创建 `globals.css`：CSS 变量实现 dark/light（`--bg`、`--fg`、`--accent` 等）

### 1.2 全局布局与导航

**`app/layout.tsx`**

- 根布局：`ThemeProvider`（通过 `next-themes` 或自建 context）实现系统偏好 + 手动切换
- `<html className>` 根据 theme 切换
- 引入 `next/font` 字体

**`components/Navigation.tsx`**

- 固定顶部：Logo | Work | Blog | About | Contact
- 滚动时：`backdrop-blur-md` + `bg-white/80 dark:bg-black/80`
- 移动端：汉堡菜单 → 全屏遮罩式导航
- 当前路由高亮（强调色下划线或字重）

**`components/Footer.tsx`**

- 极简：版权 + 可选社交链接

### 1.3 核心页面

**首页 `app/page.tsx`**

| 区块   | 内容                                                           | 实现方式                                  |
| ------ | -------------------------------------------------------------- | ----------------------------------------- |
| Hero   | 全屏高，居中 tagline "I design interactions that feel inevitable." | 硬编码文案 + `animate-in fade-in`          |
| 精选作品 | 2–3 张大图卡片                                                 | 静态数据（JSON 或常量），Phase 2 改为从 content 读取 |
| 最新文章 | 3 篇标题+摘要                                                  | Phase 1 可占位或静态，Phase 2 接 MDX       |
| Bio    | 简短介绍 + "View Full Bio →"                                   | 硬编码，链接 `/about`                      |

**关于 `app/about/page.tsx`**

- 照片占位：`aspect-square bg-neutral-200 dark:bg-neutral-800` + 占位文案
- 专业简介（硬编码）
- 技能标签：`Interaction Design, Mobile OS, AI Product Design, Prototyping, Design Systems`
- 职业时间线：垂直 `Timeline` 组件（年份 + 角色 + 公司）
- 简历按钮：`<a href="/resume.pdf">Download Resume</a>`（PDF 预留）

**联系 `app/contact/page.tsx`**

- Email、LinkedIn、GitHub、Twitter/X 链接
- CTA："Open to opportunities in interaction design. Let's talk."
- 表单：Phase 1 仅 UI 展示，Phase 3 可接 serverless

### 1.4 主题切换

**`components/ThemeToggle.tsx`**

- 太阳/月亮图标切换
- 使用 `next-themes` 的 `useTheme`，或自建 `ThemeContext` + `localStorage` + `prefers-color-scheme`

### 1.5 响应式与动效

- 断点：`sm:640`、`md:768`、`lg:1024`
- Hero 入场：`opacity-0` → `opacity-100` + `translate-y-2` → `translate-y-0`，`animation-delay` 错开
- 卡片 hover：`scale-[1.02]` 或 `brightness-95`，`transition` 约 200ms

### 1.6 部署与域名

- 推送至 GitHub → 在 Vercel 导入项目
- Vercel 项目设置中绑定 `zhangjiachang.com`
- 配置 DNS（A/CNAME 指向 Vercel）

---

## Phase 2：内容能力

### 2.1 MDX 内容架构

**安装与配置**

```bash
npm install contentlayer2 next-contentlayer2
```

- `contentlayer.config.ts`：定义 `Blog`、`Work` 两个 document 类型，字段对应 frontmatter
- 内容目录：`/content/blog/`、`/content/work/`
- `next.config.js`：`withContentlayer()`

### 2.2 博客

- **列表** `app/blog/page.tsx`：`allBlogs` 按 `date` 倒序，`BlogPostCard` 展示标题、日期、摘要、标签
- **详情** `app/blog/[slug]/page.tsx`：MDX 渲染，`max-w-prose`，支持代码高亮（`rehype-highlight` 或 `shiki`）、图片、引用块
- 标签筛选：URL 参数 `?tag=Design+Thinking` 或 `/blog/tag/[tag]`

### 2.3 作品集

- **列表** `app/work/page.tsx`：网格布局，`ProjectCard`（封面、标题、描述、标签）
- **详情** `app/work/[slug]/page.tsx`：长页面叙事，大图、多图画廊、嵌入视频（`iframe` 或 MDX 自定义组件）
- MDX 组件：`<Gallery images={[...]} />`、`<Video src="..." />`

### 2.4 首页数据源

- 精选作品：`allWork.filter(p => p.featured)`
- 最新文章：`allBlogs.slice(0, 3)`

---

## Phase 3：管理后台

### 3.1 认证

- **路由** `app/admin/page.tsx`：未登录显示登录表单（密码输入）
- **API** `app/api/admin/auth/route.ts`：校验 `ADMIN_PASSWORD`，通过则签发 JWT 或设置 httpOnly cookie
- 中间件：`/admin/*` 需验证 token/cookie，否则重定向登录

### 3.2 文章管理

- **列表** `app/admin/page.tsx`（登录后）：表格展示所有 blog/work，支持筛选、`published`/`featured` 切换
- **编辑器** `app/admin/editor/page.tsx`：集成 `@uiw/react-md-editor` 或 `react-simple-code-editor` + 预览
- **API** `app/api/admin/posts/route.ts`：`POST` 新建、`PUT` 更新、`DELETE` 删除——底层调用 [GitHub Contents API](https://docs.github.com/en/rest/repos/contents) 对 `content/blog/*.mdx`、`content/work/*.mdx` 做 create/update
- 需配置 `GITHUB_TOKEN`（repo 写权限）、`GITHUB_REPO`（如 `username/zhangjiachang-website`）

### 3.3 图片上传

- **API** `app/api/admin/upload/route.ts`：接收 `multipart/form-data`，调用 `@vercel/blob` 的 `put()`，返回 `url`
- 管理后台：拖拽/点击上传区域，上传后复制 URL 插入 MDX
- 环境变量：`BLOB_READ_WRITE_TOKEN`（Vercel 项目内创建 Blob Store 后获取）

---

## Phase 4：打磨

- **动效**：`framer-motion` 或 CSS `@keyframes` 实现滚动触发 fade-in/slide-up
- **SEO**：每页 `metadata`（`title`、`description`）、`generateMetadata` 动态生成，Open Graph 标签
- **sitemap.xml**：`app/sitemap.ts` 基于 `allBlogs`、`allWork` 生成
- **robots.txt**：`app/robots.ts` 允许爬取，排除 `/admin`
- **JSON-LD**：博客文章页注入 `Article` 结构化数据
- **RSS**：`app/feed.xml/route.ts` 或 `feed.xml` 静态生成
- **OG Image**：`@vercel/og` 动态生成文章/作品预览图
- **Lighthouse**：`next/image` 优化图片、`next/font` 预加载、合理使用 RSC

---

## 项目结构（Phase 1 完成后）

```
/app
  layout.tsx
  page.tsx
  globals.css
  /about/page.tsx
  /contact/page.tsx
  /blog          # Phase 2
  /work          # Phase 2
  /admin         # Phase 3
  /api           # Phase 3
/components
  Navigation.tsx
  Footer.tsx
  ThemeToggle.tsx
  ProjectCard.tsx    # Phase 2
  BlogPostCard.tsx   # Phase 2
  MDXComponents.tsx  # Phase 2
  Timeline.tsx       # About 用
/content            # Phase 2
  /blog
  /work
/lib
  mdx.ts         # Phase 2
  github.ts      # Phase 3
/public
  /images
  resume.pdf
```

---

## 关键依赖

| 阶段      | 包                                                                   |
| --------- | -------------------------------------------------------------------- |
| Phase 1   | `next`, `tailwindcss`, `next-themes`                                |
| Phase 2   | `contentlayer2`, `next-contentlayer2`, `rehype-highlight` 或 `shiki` |
| Phase 3   | `@vercel/blob`, `@octokit/rest`, `jose`（JWT）                        |
| Phase 4   | `@vercel/og`, `framer-motion`（可选）                                 |

---

## 实施顺序建议

1. **Phase 1**：搭建项目 → 布局+导航 → Home/About/Contact → 主题 → 响应式 → 部署
2. **Phase 2**：配置 Contentlayer → 博客列表/详情 → 作品列表/详情 → 首页接入真实数据
3. **Phase 3**：admin 认证 → 文章 CRUD（GitHub API）→ 图片上传
4. **Phase 4**：按优先级逐步添加动效、SEO、RSS、OG 等

---

## 注意事项

- 文案与 UI 以英文为主，正文内容可中英混排（为 2028 出海求职预留）
- 管理后台「保存」= GitHub commit → Vercel 自动部署，内容始终在 Git 中有版本
- 每个页面保持单一职责，避免过度装饰，设计品质即作品展示
