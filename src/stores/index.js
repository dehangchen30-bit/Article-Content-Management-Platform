import { useUserStore } from './modules/user'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/home', // 默认跳转到首页
      children: [
        { path: '/home', component: () => import('@/views/home/HomePage.vue') }, // 新增首页
        { path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue') },
        { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') },
        { path: '/article/detail/:id', component: () => import('@/views/article/ArticleDetail.vue') }, // 新增文章详情
        { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') },
        { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
        { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') },
      ],
    },
  ],
})

// 访问拦截（游客可访问首页和文章详情）
router.beforeEach((to) => {
  const userStore = useUserStore()
  const isLogin = !!userStore.token
  // 无需登录的页面
  const whiteList = ['/login', '/home', '/article/detail/:id']
  if (!isLogin && !whiteList.some(path => to.path.match(new RegExp(`^${path.replace(':id', '\\d+')}$`)))) {
    return '/login'
  }
})

export default router
export { useUserStore }