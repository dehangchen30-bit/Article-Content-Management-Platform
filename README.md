# 文章内容管理系统

## 项目简介

文章内容管理系统是一个基于 Vue 3 构建的后台管理系统，主要用于管理文章、频道和用户信息。系统采用现代化的前端技术栈，提供了直观友好的用户界面和完整的功能模块。

## 技术栈

- **前端框架**：Vue 3
- **状态管理**：Pinia
- **路由管理**：Vue Router
- **UI 组件库**：Element Plus
- **富文本编辑器**：Quill
- **HTTP 客户端**：Axios
- **构建工具**：Vite
- **代码规范**：ESLint + Prettier
- **样式预处理器**：Sass

## 项目结构

```
BigEvent-manage/
├── public/             # 静态资源
├── src/                # 源代码
│   ├── api/            # API 接口
│   ├── assets/         # 静态资源
│   ├── components/     # 通用组件
│   ├── router/         # 路由配置
│   ├── stores/         # Pinia 状态管理
│   ├── utils/          # 工具函数
│   ├── views/          # 页面组件
│   │   ├── article/    # 文章管理
│   │   ├── layout/     # 布局组件
│   │   ├── login/      # 登录页面
│   │   └── user/       # 用户管理
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── 教程文件/           # 教程相关文件
├── .editorconfig       # 编辑器配置
├── .gitignore          # Git 忽略文件
├── eslint.config.js    # ESLint 配置
├── index.html          # HTML 模板
├── jsconfig.json       # JS 配置
├── package.json        # 项目配置
├── pnpm-lock.yaml      # 依赖锁文件
└── vite.config.js      # Vite 配置
```

## 功能模块

### 1. 登录模块

- 用户登录
- 路由守卫，未登录用户自动跳转至登录页

### 2. 文章管理

- 文章列表展示
- 文章编辑
- 频道管理

### 3. 用户管理

- 个人资料编辑
- 头像修改
- 密码修改

## 安装和运行

### 环境要求

- Node.js ^20.19.0 || >=22.12.0

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
# 使用 npm
npm run dev

# 使用 pnpm
pnpm dev
```

### 构建生产版本

```bash
# 使用 npm
npm run build

# 使用 pnpm
pnpm build
```

### 预览生产构建

```bash
# 使用 npm
npm run preview

# 使用 pnpm
pnpm preview
```

## 开发指南

### 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查和格式化：

```bash
# 运行 ESLint 检查并自动修复
npm run lint

# 运行 Prettier 格式化代码
npm run format
```

### 目录说明

- **api/**：包含所有 API 接口调用
- **assets/**：存放图片、样式等静态资源
- **components/**：通用组件
- **router/**：路由配置
- **stores/**：Pinia 状态管理，按模块划分
- **utils/**：工具函数，如请求拦截器、格式化工具等
- **views/**：页面组件，按功能模块划分

### 路由配置

项目使用 Vue Router 进行路由管理，主要路由如下：

- `/login`：登录页面
- `/`：主布局，包含以下子路由：
  - `/article/manage`：文章管理
  - `/article/channel`：频道管理
  - `/user/profile`：个人资料
  - `/user/avatar`：头像修改
  - `/user/password`：密码修改

## 注意事项

1. 项目使用了 Pinia 进行状态管理，并配置了持久化存储
2. 项目使用了 Element Plus 作为 UI 组件库
3. 项目使用了 Quill 作为富文本编辑器
4. 项目使用了 Axios 进行 HTTP 请求，并配置了请求拦截器
5. 项目使用了路由守卫，未登录用户会被自动重定向到登录页面

## 许可证

MIT License
