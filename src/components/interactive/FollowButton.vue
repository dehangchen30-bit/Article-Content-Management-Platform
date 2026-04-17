<script setup>
import { computed } from 'vue'
import { useBlogStore } from '@/stores/modules/blog'
import { useUserStore } from '@/stores/modules/user'
import { Storage } from '@/utils/storage'
import { ElMessage } from 'element-plus'

const props = defineProps({
  authorId: {
    type: Number,
    required: true
  }
})

const blogStore = useBlogStore()
const userStore = useUserStore()
const isLogin = computed(() => !!userStore.token)

// 是否已关注
const isFollowed = computed(() => {
  if (!isLogin.value) return false
  const userId = userStore.userInfo.id
  const followData = Storage.getBlogData().follow.userFollow[userId] || []
  return followData.includes(props.authorId)
})

// 点击关注
const handleFollow = () => {
  if (!isLogin.value) {
    ElMessage.warning('登录后可关注')
    return
  }
  blogStore.toggleFollow(props.authorId)
}
</script>

<template>
  <el-button 
    @click="handleFollow" 
    :icon="isFollowed ? 'UserFilled' : 'User'" 
    :type="isFollowed ? 'success' : 'default'"
    :disabled="!isLogin"
    plain
  >
    {{ isFollowed ? '已关注' : '关注作者' }}
  </el-button>
</template>