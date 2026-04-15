## 测试账号

test053:111111

## big-event-manage
大事件管理系统
该项目基于vue3+Element-Plus技术完成

## 缺失模块

其中，登录页面的“记住我”功能未实现、“忘记密码功能未实现”

# 插件使用

#### 1、 pnpm包管理器
        1.1 安装方式： npm install -g pnpm
        1.2 创建项目： pnpm create vue

#### 2、 ESlint代码风格 + Prettier代码格式化

#### 3、 husky 代码提交规范

#### 4、 vue-router4 路由组件
        可使用beforeEach全局路由守卫，实现登录拦截

#### 5、 pinia 状态管理-构建用户仓库 和 持久化
         5.1 安装持久化插件persist： pnpm add pinia-plugin-persistedstate -D
         5.2 配置：到store/index.js中添加并使用，统一导出仓库pinia 独立维护
                 优化：由 stores 统一维护，在 stores/index.js 中完成 pinia 初始化，交付 main.js 使用仓库 统一导出
                 优化：由 stores/index.js 统一导出，导入路径统一 `./stores`，而且仓库维护在 stores/modules 中

#### 6、 element-ui 组件库
##### 6.1 安装： pnpm add element-plus
##### 6.2 自动按需导入插件： pnpm add -D unplugin-vue-components unplugin-auto-import
##### 6.3 配置：到vite.config.js中添加：
        ...
        import AutoImport from 'unplugin-auto-import/vite'
        import Components from 'unplugin-vue-components/vite'
        import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

          // https://vitejs.dev/config/
          export default defineConfig({
            plugins: [
              ...
              AutoImport({
                resolvers: [ElementPlusResolver()]
              }),
              Components({
                resolvers: [ElementPlusResolver()]
              })
            ]
          })

#### 7、数据交互 - 请求工具设计 request基于axios搭建，要求有同意请求、统一响应拦截器

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
