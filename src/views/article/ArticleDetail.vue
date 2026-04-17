<!-- <script setup>
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
    //文章头部
    <el-card class="article-header">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <span>作者：{{ article.authorName }}</span>
        <span>分类：{{ article.cate_name }}</span>
        <span>发布时间：{{ formatDate(article.pub_date) }}</span>
        <span>粉丝数：{{ getFansCount(article.authorId) }}</span>
      </div>
      //互动按钮
      <div class="interactive-buttons" mt="20">
        <LikeButton :article-id="article.id" />
        <CollectButton :article-id="article.id" />
        <FollowButton :author-id="article.authorId" />
      </div>
    </el-card>

    //文章内容
    <el-card class="article-content" mt="20">
      <div class="content">{{ article.content }}</div>
    </el-card>

    //评论区
    <el-card class="comment-section" mt="20">
      <template #header>
        <h3>评论区</h3>
      </template>
      <CommentForm :article-id="article.id" />
      <CommentList :article-id="article.id" />
    </el-card>
  </div>

  //文章不存在
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
</style> -->

<template>
  <page-container title="文章详情">
    <!-- 文章主体 -->
    <el-card v-if="article" class="article-detail-card">
      <!-- 文章头部 -->
      <div class="article-header">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <span>作者：{{ article.authorName }}</span>
          <span>分类：{{ article.cate_name }}</span>
          <span>发布时间：{{ formatDate(article.pub_date) }}</span>
        </div>
        <!-- 关注作者按钮 -->
        <follow-button :author-id="article.authorId" class="follow-btn" />
      </div>

      <!-- 文章内容 -->
      <div class="article-content">{{ article.content }}</div>

      <!-- 互动按钮区 -->
      <div class="article-actions">
        <like-button :article-id="article.id" />
        <collect-button :article-id="article.id" class="ml-20" />
      </div>

      <!-- 评论区 -->
      <div class="comment-section mt-30">
        <h3>评论区</h3>
        <comment-form 
          :article-id="article.id" 
          @comment-added="refreshComments" 
        />
        <comment-list 
          :article-id="article.id" 
          :comment-added="commentAddedFlag" 
        />
      </div>
    </el-card>

    <!-- 加载/空状态 -->
    <el-empty v-else description="文章不存在或已删除" />
  </page-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/modules/blog'
import { formatDate } from '@/utils/formmat'
import LikeButton from '@/components/LikeButton.vue'
import CollectButton from '@/components/CollectButton.vue'
import FollowButton from '@/components/FollowButton.vue'
import CommentForm from '@/components/CommentForm.vue'
import CommentList from '@/components/CommentList.vue'
import PageContainer from '@/components/PageContainer.vue'

// 路由实例
const route = useRoute()
// 博客Store
const blogStore = useBlogStore()

// 文章数据
const article = ref(null)
// 评论刷新标识（用于通知评论列表更新）
const commentAddedFlag = ref(0)

// 获取文章详情
const getArticleDetail = () => {
  const articleId = Number(route.params.id)
  article.value = blogStore.articleList.find(item => item.id === articleId)
}

// 刷新评论（触发评论列表重新获取）
const refreshComments = () => {
  commentAddedFlag.value++
}

// 监听路由参数变化（比如从不同文章跳转）
watch(
  () => route.params.id,
  () => {
    getArticleDetail()
    // 重置评论刷新标识
    commentAddedFlag.value = 0
  },
  { immediate: true }
)

// 初始化文章列表（确保数据存在）
onMounted(() => {
  if (blogStore.articleList.length === 0) {
    blogStore.initArticleList().then(getArticleDetail)
  }
})
</script>

<style lang="scss" scoped>
.article-detail-card {
  padding: 20px;
}

.article-header {
  margin-bottom: 20px;
}

.article-meta {
  display: flex;
  gap: 20px;
  margin: 10px 0;
  color: #999;
  font-size: 14px;
}

.follow-btn {
  margin-top: 10px;
}

.article-content {
  line-height: 1.8;
  font-size: 16px;
  margin: 20px 0;
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.article-actions {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.comment-section {
  margin-top: 30px;
}

// 响应式适配
@media (max-width: 768px) {
  .article-meta {
    flex-direction: column;
    gap: 5px;
  }
  .article-content {
    font-size: 14px;
  }
}
</style>