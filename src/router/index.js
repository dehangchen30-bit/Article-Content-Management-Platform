// import { useUserStore } from '@/stores'
// import { createRouter, createWebHistory } from 'vue-router'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
//     {
//       path: '/',
//       component: () => import('@/views/layout/LayoutContainer.vue'),
//       redirect: '/article/manage',
//       children: [
//         { path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue') },
//         { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') },
//         { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') },
//         { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
//         { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') },
//       ],
//     },
//   ],
// })

// // 访问拦截
// router.beforeEach((to) => {
//   // 如果用户为登录，则拦回到登录页面进行登录
//   const userStore = useUserStore()
//   if(!userStore.token && to.path!=='/login')
//     return '/login'
// })

// // export default router
// import { createRouter, createWebHistory } from 'vue-router'
// // 移除顶层的 useUserStore 导入！！

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
//     {
//       path: '/',
//       component: () => import('@/views/layout/LayoutContainer.vue'),
//       redirect: '/article/manage',
//       children: [
//         { path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue') },
//         { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') },
//         { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') },
//         { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
//         { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') },
//       ],
//     },
//   ],
// })

// // 访问拦截 - 调整逻辑：延迟导入+内部使用 store
// router.beforeEach(async (to) => {
//   // 延迟导入 + 内部实例化 store（确保 Pinia 已挂载）
//   const { useUserStore } = await import('@/stores')
//   const userStore = useUserStore()
  
//   if(!userStore.token && to.path!=='/login') {
//     return '/login'
//   }
// })

// export default router
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/home', // 确保默认跳home
      children: [
        { path: '/home', component: () => import('@/views/home/HomePage.vue') },
        { path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue') },
        { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') },
        { path: '/article/detail/:id', component: () => import('@/views/article/ArticleDetail.vue') },
        { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') },
        { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
        { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') },
      ],
    },
  ],
})

// 修复：延迟导入+正确的白名单匹配逻辑
router.beforeEach(async (to) => {
  // 关键：延迟导入useUserStore，确保Pinia已挂载
  const { useUserStore } = await import('@/stores/modules/user')
  const userStore = useUserStore()
  const isLogin = !!userStore.token

  // 修复：白名单匹配函数（精准匹配）
  const isWhiteList = (path) => {
    const whiteListRules = [
      /^\/login$/,          // 登录页
      /^\/home$/,           // 首页
      /^\/article\/detail\/\d+$/, // 文章详情页
    ]
    return whiteListRules.some(rule => rule.test(path))
  }

  // 未登录 + 不在白名单 → 跳登录
  if (!isLogin && !isWhiteList(to.path)) {
    return '/login'
  }
  // 已登录 + 访问登录页 → 跳首页（可选，优化体验）
  if (isLogin && to.path === '/login') {
    return '/home'
  }
})

export default router