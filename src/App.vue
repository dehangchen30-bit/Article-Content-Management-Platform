<!-- <script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>

</template>

<style scoped></style> -->

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { onMounted } from 'vue'
import { initTheme } from '@/utils/theme'

// 初始化深色模式
onMounted(() => {
  initTheme()
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
/* 全局样式已在main.scss中定义 */
</style>