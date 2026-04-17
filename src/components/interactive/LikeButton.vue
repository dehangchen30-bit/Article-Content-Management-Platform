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

// 是否已点赞
const isLiked = computed(() => {
  if (!isLogin.value) return false
  const userId = userStore.userInfo.id
  const likeData = Storage.getBlogData().like[props.articleId]
  return likeData?.likeUserIds.includes(userId) || false
})

// 点赞数
const likeCount = computed(() => {
  return Storage.getBlogData().like[props.articleId]?.count || 0
})

// 点击点赞
const handleLike = () => {
  if (!isLogin.value) {
    ElMessage.warning('登录后可点赞')
    return
  }
  blogStore.toggleLike(props.articleId)
}
</script>

<template>
  <el-button 
    @click="handleLike" 
    :icon="isLiked ? 'Heart' : 'HeartFilled'" 
    :type="isLiked ? 'danger' : 'default'"
    :disabled="!isLogin"
    plain
  >
    点赞 ({{ likeCount }})
  </el-button>
</template>