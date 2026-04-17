<script setup>
import { computed } from 'vue'
import { useBlogStore } from '@/stores/modules/blog'
import { useUserStore } from '@/stores/modules/user'
import { Storage } from '@/utils/storage'
import { ElMessage } from 'element-plus'

const props = defineProps({
  articleId: {
    type: Number,
    required: true
  }
})

const blogStore = useBlogStore()
const userStore = useUserStore()
const isLogin = computed(() => !!userStore.token)

// 是否已收藏
const isCollected = computed(() => {
  if (!isLogin.value) return false
  const userId = userStore.userInfo.id
  const collectData = Storage.getBlogData().collect.userCollect[userId] || []
  return collectData.includes(props.articleId)
})

// 收藏数
const collectCount = computed(() => {
  return Storage.getBlogData().collect.articleCount[props.articleId] || 0
})

// 点击收藏
const handleCollect = () => {
  if (!isLogin.value) {
    ElMessage.warning('登录后可收藏')
    return
  }
  blogStore.toggleCollect(props.articleId)
}
</script>

<template>
  <el-button 
    @click="handleCollect" 
    :icon="isCollected ? 'Star' : 'StarFilled'" 
    :type="isCollected ? 'warning' : 'default'"
    :disabled="!isLogin"
    plain
  >
    收藏 ({{ collectCount }})
  </el-button>
</template>