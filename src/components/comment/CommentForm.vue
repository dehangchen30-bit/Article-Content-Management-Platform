<script setup>
import { ref } from 'vue'
import { useBlogStore } from '@/stores/modules/blog'
import { useUserStore } from '@/stores/modules/user'
import { ElMessage } from 'element-plus'

const props = defineProps({
  articleId: {
    type: Number,
    required: true
  }
})

const blogStore = useBlogStore()
const userStore = useUserStore()
const isLogin = !!userStore.token
const commentContent = ref('')

// 提交评论
const submitComment = () => {
  if (!isLogin) {
    ElMessage.warning('登录后可评论')
    return
  }
  if (!commentContent.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }
  const res = blogStore.addComment(props.articleId, commentContent.value)
  if (res) {
    ElMessage.success('评论发布成功')
    commentContent.value = ''
    // 通知评论列表刷新
    emit('commentAdded')
  } else {
    ElMessage.error('评论发布失败')
  }
}

const emit = defineEmits(['commentAdded'])
</script>

<template>
  <el-form class="comment-form" v-if="isLogin">
    <el-form-item>
      <el-input
        v-model="commentContent"
        type="textarea"
        rows="3"
        placeholder="请输入评论内容..."
        resize="none"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitComment">发布评论</el-button>
    </el-form-item>
  </el-form>
  <div class="login-tip" v-else>
    <el-button type="primary" @click="$router.push('/login')">登录后发表评论</el-button>
  </div>
</template>

<style lang="scss" scoped>
.comment-form {
  margin-bottom: 20px;
}

.login-tip {
  padding: 20px 0;
  text-align: center;
}

@media (max-width: 768px) {
  .el-textarea {
    font-size: 14px;
  }
  .el-button {
    width: 100%;
  }
}
</style>