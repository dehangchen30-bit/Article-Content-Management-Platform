<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/modules/blog'
import { useUserStore } from '@/stores/modules/user'
import { Storage } from '@/utils/storage'
import { formatDate } from '@/utils/formmat'
import LikeButton from '@/components/interactive/LikeButton.vue'
import CollectButton from '@/components/interactive/CollectButton.vue'
import FollowButton from '@/components/interactive/FollowButton.vue'
import CommentList from '@/components/comment/CommentList.vue'
import CommentForm from '@/components/comment/CommentForm.vue'

const route = useRoute()
const blogStore = useBlogStore()
const userStore = useUserStore()
const articleId = Number(route.params.id)
const article = ref(null)

// 初始化数据
onMounted(() => {
  blogStore.initArticleList()
  // 获取文章详情
  article.value = blogStore.articleList.find(item => item.id === articleId)
})

// 获取作者粉丝数
const getFansCount = (authorId) => {
  return Storage.getBlogData().follow.authorFans[authorId] || 0
}
</script>

<template>
  <div class="article-detail" v-if="article">
    <!-- 文章头部 -->
    <el-card class="article-header">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <span>作者：{{ article.authorName }}</span>
        <span>分类：{{ article.cate_name }}</span>
        <span>发布时间：{{ formatDate(article.pub_date) }}</span>
        <span>粉丝数：{{ getFansCount(article.authorId) }}</span>
      </div>
      <!-- 互动按钮 -->
      <div class="interactive-buttons" mt="20">
        <LikeButton :article-id="article.id" />
        <CollectButton :article-id="article.id" />
        <FollowButton :author-id="article.authorId" />
      </div>
    </el-card>

    <!-- 文章内容 -->
    <el-card class="article-content" mt="20">
      <div class="content">{{ article.content }}</div>
    </el-card>

    <!-- 评论区 -->
    <el-card class="comment-section" mt="20">
      <template #header>
        <h3>评论区</h3>
      </template>
      <CommentForm :article-id="article.id" />
      <CommentList :article-id="article.id" />
    </el-card>
  </div>

  <!-- 文章不存在 -->
  <el-empty v-else description="文章不存在"></el-empty>
</template>

<style lang="scss" scoped>
.article-detail {
  max-width: 1200px;
  margin: 0 auto;
}

.article-header {
  padding: 20px;
}

.article-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  color: #999;
  font-size: 14px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

.interactive-buttons {
  display: flex;
  gap: 15px;
}

.article-content {
  padding: 20px;
  line-height: 1.8;
  font-size: 16px;
}

.comment-section {
  padding: 20px;
}

// 响应式适配
@media (max-width: 768px) {
  .article-title {
    font-size: 20px;
  }
  .article-meta {
    flex-direction: column;
    gap: 8px;
  }
  .article-content {
    padding: 15px;
    font-size: 14px;
  }
  .interactive-buttons {
    flex-direction: column;
    gap: 10px;
  }
}
</style>