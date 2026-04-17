<script setup>
import { ref, onMounted, watch } from 'vue'
import { useBlogStore } from '@/stores/modules/blog'
import { useUserStore } from '@/stores/modules/user'
import { Storage } from '@/utils/storage'
import { formatDate } from '@/utils/formmat'
import { ElMessage } from 'element-plus'

const props = defineProps({
  articleId: {
    type: Number,
    required: true
  }
})

const blogStore = useBlogStore()
const userStore = useUserStore()
const comments = ref([])

// 获取评论列表
const getComments = () => {
  comments.value = Storage.getBlogData().comment[props.articleId] || []
}

// 删除评论
const deleteComment = (commentId) => {
  const res = blogStore.deleteComment(props.articleId, commentId)
  if (res) {
    ElMessage.success('评论删除成功')
    getComments()
  } else {
    ElMessage.error('只能删除自己的评论')
  }
}

// 监听评论新增
watch(() => props.articleId, getComments)
onMounted(getComments)
// 接收评论新增事件
defineProps(['commentAdded'])
watch(() => props.commentAdded, getComments)
</script>

<template>
  <div class="comment-list">
    <div v-for="comment in comments" :key="comment.id" class="comment-item">
      <div class="comment-header">
        <span class="comment-author">{{ comment.userName }}</span>
        <span class="comment-time">{{ formatDate(comment.createTime) }}</span>
        <el-button 
          v-if="userStore.userInfo.id === comment.userId" 
          icon="Delete" 
          size="small" 
          type="danger" 
          plain
          @click="deleteComment(comment.id)"
        >
          删除
        </el-button>
      </div>
      <div class="comment-content">{{ comment.content }}</div>
      <hr class="comment-divider" />
    </div>
    <el-empty v-if="comments.length === 0" description="暂无评论"></el-empty>
  </div>
</template>

<style lang="scss" scoped>
.comment-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 14px;
}

.comment-author {
  font-weight: bold;
}

.comment-time {
  color: #999;
}

.comment-content {
  line-height: 1.6;
  font-size: 15px;
}

.comment-divider {
  border: none;
  border-top: 1px solid var(--border-color);
  margin-top: 10px;
}

// 响应式适配
@media (max-width: 768px) {
  .comment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  .comment-content {
    font-size: 14px;
  }
}
</style>