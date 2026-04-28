# 文章内容管理平台

## 项目简介

文章内容管理平台是一个基于 Vue 3 构建的现代化后台管理系统，提供文章发布、管理和文章展示功能。系统支持深色/浅色主题切换、响应式布局，为用户提供友好的操作体验。

## 技术栈

| 技术           | 版本  | 说明       |
| ------------ | --- | -------- |
| Vue          | 3.x | 前端框架     |
| Vite         | 6.x | 构建工具     |
| Pinia        | 2.x | 状态管理     |
| Vue Router   | 4.x | 路由管理     |
| Element Plus | 2.x | UI 组件库   |
| Quill        | 1.x | 富文本编辑器   |
| Axios        | 1.x | HTTP 客户端 |
| Sass         | 1.x | CSS 预处理器 |

## 功能特性

### 🔐 用户认证

- 用户登录/注册
- 登录状态持久化
- 记住用户名功能

### 📝 文章管理

- 文章列表展示（分页、筛选、排序）
- 文章发布与编辑
- 富文本编辑器支持
- 文章状态管理（已发布/草稿）

### 📁 分类管理

- 文章分类增删改查
- 分类筛选功能

### 🏠 首页

- 文章列表展示
- 分类筛选与排序
- 文章点赞/收藏功能
- 所有用户可见

### 👤 用户中心

- 个人资料编辑
- 头像上传
- 密码修改
- 退出登录

### 🎨 界面特性

- 深色/浅色主题切换
- 响应式布局设计
- PC端可折叠侧边栏
- 移动端抽屉菜单

## 项目结构

```
Article-Content-Management-Platform/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── api/                # API 接口
│   │   ├── article.js      # 文章相关接口
│   │   └── user.js         # 用户相关接口
│   ├── assets/             # 静态资源
│   ├── components/         # 通用组件
│   │   └── comment/        # 评论组件
│   ├── router/             # 路由配置
│   │   └── index.js        # 路由定义
│   ├── stores/             # Pinia 状态管理
│   │   ├── modules/        # 模块状态
│   │   │   ├── blog.js     # 博客数据管理
│   │   │   └── user.js     # 用户状态管理
│   │   └── index.js        # store 配置
│   ├── utils/              # 工具函数
│   │   ├── formmat.js      # 格式化工具
│   │   ├── request.js      # 请求封装
│   │   ├── storage.js      # 本地存储
│   │   └── theme.js        # 主题管理
│   ├── views/              # 页面组件
│   │   ├── article/        # 文章管理
│   │   │   ├── components/ # 子组件
│   │   │   ├── ArticleDetail.vue
│   │   │   ├── ArticleManage.vue
│   │   │   └── ArticleChannel.vue
│   │   ├── home/           # 博客首页
│   │   │   └── HomePage.vue
│   │   ├── layout/         # 布局组件
│   │   │   └── LayoutContainer.vue
│   │   ├── login/          # 登录页面
│   │   │   └── LoginPage.vue
│   │   └── user/           # 用户管理
│   │       ├── UserAvatar.vue
│   │       ├── UserPassword.vue
│   │       └── UserProfile.vue
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── 教程文件/               # 教程相关文件
├── .editorconfig           # 编辑器配置
├── .gitignore              # Git 忽略文件
├── eslint.config.js        # ESLint 配置
├── index.html              # HTML 模板
├── jsconfig.json           # JS 配置
├── package.json            # 项目配置
├── pnpm-lock.yaml          # 依赖锁文件
└── vite.config.js          # Vite 配置
```

## 快速开始

### 环境要求

- Node.js >= 20.19.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 <http://localhost:5173> 即可查看应用。

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 路由配置

| 路径                    | 页面   | 说明         |
| --------------------- | ---- | ---------- |
| `/`                   | 登录页  | 根路径默认跳转登录页 |
| `/login`              | 登录页  | 用户登录/注册    |
| `/home`               | 博客首页 | 文章列表展示     |
| `/article/manage`     | 文章管理 | 文章列表与编辑    |
| `/article/channel`    | 分类管理 | 文章分类管理     |
| `/article/detail/:id` | 文章详情 | 单篇文章查看     |
| `/user/profile`       | 个人资料 | 用户信息编辑     |
| `/user/avatar`        | 头像设置 | 头像上传       |
| `/user/password`      | 密码修改 | 修改密码       |

## 使用说明

### 登录系统

1. 访问首页自动跳转登录页面
2. 输入用户名和密码进行登录
3. 勾选"记住我"可保存用户名

### 发布文章

1. 登录后进入文章管理页面
2. 点击"发布文章"按钮
3. 填写文章标题、选择分类、上传封面、编写内容
4. 点击"发布"按钮发布文章（或保存为草稿）

### 博客首页

1. 所有用户均可访问博客首页
2. 支持按分类筛选和排序
3. 登录用户可点赞、收藏文章
4. 点击文章标题可查看详情

### 主题切换

- 点击右上角太阳/月亮图标切换深色/浅色模式
- 主题设置自动保存

## 代码规范

```bash
# ESLint 检查
pnpm lint

# Prettier 格式化
pnpm format
```

## 注意事项

1. 项目使用 Pinia 进行状态管理，配置了 localStorage 持久化
2. 路由守卫确保未登录用户只能访问登录页面
3. 博客首页支持所有用户访问（无需登录）
4. 点赞、收藏功能需要登录后使用
5. 响应式设计，支持移动端访问

## 许可证

MIT License
