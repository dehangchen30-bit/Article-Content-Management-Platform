<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  Moon,
  Sunny,
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import { onMounted, ref, computed, watch } from 'vue' // 新增watch
import { ElMessageBox, ElDrawer } from 'element-plus'
import router from '@/router'
import { initTheme, toggleTheme, getCurrentTheme } from '@/utils/theme'

const userStore = useUserStore()
// 深色模式状态
const theme = ref(getCurrentTheme())
// 移动端抽屉（侧边栏）
const drawerVisible = ref(false)
// 屏幕宽度
const screenWidth = ref(window.innerWidth)

// 初始化
onMounted(() => {
  theme.value = initTheme() // 同步初始化后的主题
  userStore.getUserInfo()
  // 监听窗口大小
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
    if (screenWidth.value >= 768) {
      drawerVisible.value = false
    }
  })
})

// 监听主题变化（可选，确保theme和实际DOM className同步）
watch(
  () => theme.value,
  (newVal) => {
    document.documentElement.className = newVal
  },
  { immediate: true }
)

// 切换深色模式
const handleToggleTheme = () => {
  theme.value = toggleTheme()
}

// 右上角下拉菜单
const onCommand = async (command) => {
  if (command === 'logout') {
    await ElMessageBox.confirm(
      '您确认要退出系统吗？',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      }
    )
    userStore.setToken('')
    userStore.setUserInfo({})
    router.push('/login')
  } else {
    router.push(`/user/${command}`)
  }
}

// 响应式判断：是否移动端
const isMobile = computed(() => screenWidth.value < 768)
</script>

<template>
  <el-container class="layout-container">
    <!-- 移动端抽屉侧边栏 -->
    <el-drawer
      v-model="drawerVisible"
      direction="left"
      :with-header="false"
      :width="200"
      v-if="isMobile"
    >
      <div class="el-aside__logo"></div>
      <el-menu 
        active-text-color="#ffd04b" 
        background-color="#232323" 
        :default-active="$route.path" 
        text-color="#fff" 
        router
      >
        <el-menu-item index="/home">
          <el-icon><Promotion /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-drawer>

    <!-- PC端常驻侧边栏 -->
    <el-aside width="200px" v-else>
      <div class="el-aside__logo"></div>
      <el-menu 
        active-text-color="#ffd04b" 
        background-color="#232323" 
        :default-active="$route.path" 
        text-color="#fff" 
        router
      >
        <el-menu-item index="/home">
          <el-icon><Promotion /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <!-- 移动端菜单按钮 -->
        <el-button v-if="isMobile" icon="Menu" @click="drawerVisible = true" circle></el-button>
        <div>黑马程序员：<strong>{{ userStore.userInfo.nickname || userStore.userInfo.username }}</strong></div>
        <div class="header-actions">
          <!-- 深色模式开关（优化按钮样式） -->
          <el-button 
            @click="handleToggleTheme" 
            :icon="theme === 'dark-theme' ? Sunny : Moon" 
            circle 
            plain
            :class="{ 'theme-btn--dark': theme === 'dark-theme' }"
            title="切换深色/浅色模式"
          ></el-button>
          <!-- 用户下拉菜单 -->
          <el-dropdown placement="bottom-end" @command="onCommand">
            <span class="el-dropdown__box">
              <el-avatar :src="userStore.userInfo.user_pic || avatar" />
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2025 Created by HFP</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;

  .el-aside {
    background-color: #232323; /* 侧边栏固定深色，如需跟随主题可改为var(--card-bg) */

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: var(--card-bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid var(--border-color);

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .theme-btn--dark {
      border-color: var(--text-color);
      color: var(--text-color);
    }

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: var(--text-color);
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-main {
    background-color: var(--bg-color);
    padding: 20px;
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: var(--text-color);
    background-color: var(--card-bg);
    border-top: 1px solid var(--border-color);
  }

  // Element Plus组件深色模式适配（补充更多组件）
  :deep(.el-card) {
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
  }
  :deep(.el-table) {
    --el-table-bg-color: var(--card-bg);
    --el-table-text-color: var(--text-color);
    --el-table-border-color: var(--border-color);
  }
  :deep(.el-input__wrapper) {
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
  }
  :deep(.el-form-item__label) {
    color: var(--text-color);
  }
  :deep(.el-select .el-input__wrapper) {
    background-color: var(--card-bg);
  }
  :deep(.el-tag) {
    background-color: var(--card-bg);
    border-color: var(--border-color);
    color: var(--text-color);
  }
}

// 响应式适配
@media (max-width: 768px) {
  .layout-container {
    .el-header {
      padding: 0 10px;
    }
    .el-main {
      padding: 10px;
    }
    .el-button {
      padding: 8px 12px;
      font-size: 14px;
    }
  }
}
</style>