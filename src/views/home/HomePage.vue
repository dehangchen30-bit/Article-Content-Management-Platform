<script setup>
import { onMounted } from 'vue'
import { useBlogStore } from '@/stores/modules/blog'
// import { useUserStore } from '@/stores/modules/user'
import { formatDate } from '@/utils/formmat'
import { Storage } from '@/utils/storage'

const blogStore = useBlogStore()
// const userStore = useUserStore()

// 初始化数据
onMounted(() => {
  blogStore.initArticleList()
})

// 获取文章点赞数
const getLikeCount = (articleId) => {
  return Storage.getBlogData().like[articleId]?.count || 0
}

// 获取文章收藏数
const getCollectCount = (articleId) => {
  return Storage.getBlogData().collect.articleCount[articleId] || 0
}
</script>
<template>
  <page-container title="博客首页">
    <!-- 筛选和排序 -->
    <el-row :gutter="20" class="filter-bar" mb="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <el-select v-model="blogStore.filterCateId" placeholder="请选择分类" clearable>
          <el-option label="全部分类" value="" />
          <el-option
            v-for="cate in blogStore.cateList"
            :key="cate.id"
            :label="cate.cate_name"
            :value="cate.id"
          />
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <el-select v-model="blogStore.sortType" placeholder="排序方式">
          <el-option label="最新发布" value="time" />
          <el-option label="最多点赞" value="like" />
        </el-select>
      </el-col>
    </el-row>

    <!-- 文章列表 -->
    <div class="flex-responsive">
      <!-- 修改el-card的使用方式，去掉el-card-header/el-card-body -->
      <el-card
        v-for="article in blogStore.filteredArticles"
        :key="article.id"
        class="article-card"
        hover
      >
        <!-- 卡片头部内容 -->
        <template #header>
          <el-link
            type="primary"
            :underline="never"
            @click="$router.push(`/article/detail/${article.id}`)"
          >
            <h3>{{ article.title }}</h3>
          </el-link>
        </template>

        <!-- 卡片主体内容 -->
        <div class="article-meta">
          <span>作者：{{ article.authorName }}</span>
          <span>分类：{{ article.cate_name }}</span>
          <span>发布时间：{{ formatDate(article.pub_date) }}</span>
        </div>
        <div class="article-preview">{{ article.content.slice(0, 100) }}...</div>
        <div class="article-stats" mt="10">
          <el-tag size="small">点赞：{{ getLikeCount(article.id) }}</el-tag>
          <el-tag size="small" ml="10">收藏：{{ getCollectCount(article.id) }}</el-tag>
        </div>
      </el-card>
    </div>

    <!-- 空状态 -->
    <el-empty v-if="blogStore.filteredArticles.length === 0" description="暂无文章"></el-empty>
  </page-container>
</template>

<style lang="scss" scoped>
.filter-bar {
  margin-bottom: 20px;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
  color: #999;
  font-size: 14px;
}

.article-preview {
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 10px;
}

.article-stats {
  display: flex;
  align-items: center;
}
.article-card {
  background-color: var(--card-bg); /* 跟随深色/浅色主题的卡片背景色 */
  // margin-bottom: 15px; /* 卡片底部外边距，控制间距 */
}
// 响应式适配
@media (max-width: 768px) {
  .article-card {
    margin: 0 0 15px;
  }
  .article-meta {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
