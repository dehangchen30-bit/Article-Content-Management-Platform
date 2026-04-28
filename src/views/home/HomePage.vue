 <!-- //首页有内容，但是点赞收藏数字不变化 
<script setup>
import { onMounted } from 'vue'
import { useBlogStore } from '@/stores/modules/blog'
import { formatDate } from '@/utils/formmat'
import { Storage } from '@/utils/storage'
import { ElMessage } from 'element-plus'

const blogStore = useBlogStore()

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

// 点赞功能
const handleLike = (articleId) => {
  const blogData = Storage.getBlogData()
  // 模拟用户ID（实际需从用户Store获取）
  const userId = 1 
  
  // 避免重复点赞
  if (blogData.like[articleId]?.likeUserIds.includes(userId)) {
    ElMessage.warning('已点赞该文章')
    return
  }

  // 更新点赞数据
  const newLikeData = {
    ...blogData.like,
    [articleId]: {
      likeUserIds: [...(blogData.like[articleId]?.likeUserIds || []), userId],
      count: (blogData.like[articleId]?.count || 0) + 1
    }
  }

  Storage.updateBlogData({ like: newLikeData })
  ElMessage.success('点赞成功')
}

// 收藏功能
const handleCollect = (articleId) => {
  const blogData = Storage.getBlogData()
  const userId = 1 // 实际需从用户Store获取

  // 避免重复收藏
  if (blogData.collect.userCollect[userId]?.includes(articleId)) {
    ElMessage.warning('已收藏该文章')
    return
  }

  // 更新收藏数据
  const newUserCollect = {
    ...blogData.collect.userCollect,
    [userId]: [...(blogData.collect.userCollect[userId] || []), articleId]
  }
  const newArticleCount = {
    ...blogData.collect.articleCount,
    [articleId]: (blogData.collect.articleCount[articleId] || 0) + 1
  }

  Storage.updateBlogData({
    collect: {
      userCollect: newUserCollect,
      articleCount: newArticleCount
    }
  })
  ElMessage.success('收藏成功')
}
</script>

<template>
  <page-container title="首页">
    
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

    
    <div class="flex-responsive">
      <el-card 
        v-for="article in blogStore.filteredArticles" 
        :key="article.id" 
        class="article-card"
        hover
      >
       
        <template #header>
          <el-link 
            type="primary" 
            :underline="false" 
            @click="$router.push(`/article/detail/${article.id}`)"
          >
            <h3>{{ article.title }}</h3>
          </el-link>
        </template>
        
       
        <div class="article-meta">
          <span>作者：{{ article.authorName }}</span>
          <span>分类：{{ article.cate_name }}</span>
          <span>发布时间：{{ formatDate(article.pub_date) }}</span>
        </div>
        <div class="article-preview">
          {{ article.content.slice(0, 100) }}...
        </div>
        
        <div class="article-actions" mt="10">
          <el-button 
            type="text" 
            icon="el-icon-heart" 
            @click="handleLike(article.id)"
          >
            点赞：{{ getLikeCount(article.id) }}
          </el-button>
          <el-button 
            type="text" 
            icon="el-icon-star" 
            @click="handleCollect(article.id)"
            ml="10"
          >
            收藏：{{ getCollectCount(article.id) }}
          </el-button>
        </div>
      </el-card>
    </div>

   
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
.article-actions {
  display: flex;
  align-items: center;
  margin-top: 10px;
  
  :deep(.el-button) {
    padding: 0;
    color: var(--text-color);
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style> 

 -->





<!--  
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
  <page-container title="首页">
    // 筛选和排序 
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

    // 文章列表 
    <div class="flex-responsive">
      //修改el-card的使用方式，去掉el-card-header/el-card-body 
      <el-card
        v-for="article in blogStore.filteredArticles"
        :key="article.id"
        class="article-card"
        hover
      >
        //卡片头部内容 
        <template #header>
          <el-link
            type="primary"
            :underline="never"
            @click="$router.push(`/article/detail/${article.id}`)"
          >
            <h3>{{ article.title }}</h3>
          </el-link>
        </template>

        // 卡片主体内容 
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

    // 空状态 
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
</style> -->


<script setup>
import { onMounted, computed, watch, ref } from 'vue'
import { useBlogStore } from '@/stores/modules/blog'
import { useUserStore } from '@/stores/modules/user'
import { formatDate } from '@/utils/formmat'
import { Storage } from '@/utils/storage'
import { ElMessage } from 'element-plus'

const blogStore = useBlogStore()
const userStore = useUserStore()

// 登录状态判断
const isLogin = computed(() => !!userStore.token)
// 定义响应式数据触发视图更新
const blogData = ref(Storage.getBlogData())

// 初始化数据
onMounted(() => {
  blogStore.initArticleList()
  // 初始化时同步数据
  blogData.value = Storage.getBlogData()
})

// 监听Storage数据变化，强制更新响应式数据
watch(
  () => Storage.getBlogData(),
  (newVal) => {
    blogData.value = { ...newVal } // 解构触发响应式更新
  },
  { deep: true, immediate: true }
)

// 获取文章点赞数（从响应式数据读取）
const getLikeCount = (articleId) => {
  return blogData.value.like[articleId]?.count || 0
}

// 获取文章收藏数（从响应式数据读取）
const getCollectCount = (articleId) => {
  return blogData.value.collect.articleCount[articleId] || 0
}

// 检查是否已点赞（从响应式数据读取）
const isArticleLiked = (articleId) => {
  if (!isLogin.value) return false
  const userId = userStore.userInfo.id
  const likeData = blogData.value.like[articleId]
  return likeData?.likeUserIds.includes(userId) || false
}

// 检查是否已收藏（从响应式数据读取）
const isArticleCollected = (articleId) => {
  if (!isLogin.value) return false
  const userId = userStore.userInfo.id
  const collectData = blogData.value.collect.userCollect[userId] || []
  return collectData.includes(articleId)
}

// 点赞功能（使用store方法，关联登录用户）
const handleLike = (articleId) => {
  if (!isLogin.value) {
    ElMessage.warning('登录后可点赞')
    return
  }
  // 先获取当前状态
  // const beforeLike = isArticleLiked(articleId)
  // 调用store方法更新数据
  const result = blogStore.toggleLike(articleId)
  // 手动刷新数据
  blogData.value = { ...Storage.getBlogData() }
  // 根据返回结果提示
  ElMessage.success(result ? '点赞成功' : '取消点赞成功')
}

// 收藏功能（使用store方法，关联登录用户）
const handleCollect = (articleId) => {
  if (!isLogin.value) {
    ElMessage.warning('登录后可收藏')
    return
  }
  // 先获取当前状态
  // const beforeCollect = isArticleCollected(articleId)
  // 调用store方法更新数据
  const result = blogStore.toggleCollect(articleId)
  // 手动刷新数据
  blogData.value = { ...Storage.getBlogData() }
  // 根据返回结果提示
  ElMessage.success(result ? '收藏成功' : '取消收藏成功')
}
</script>

<template>
  <page-container title="首页">
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
      <el-card 
        v-for="article in blogStore.filteredArticles" 
        :key="article.id" 
        class="article-card"
        hover
      >
        <!-- 卡片头部（跳转详情页） -->
        <template #header>
          <el-link 
            type="primary" 
            :underline="false" 
            @click="$router.push(`/article/detail/${article.id}`)"
          >
            <h3>{{ article.title }}</h3>
          </el-link>
        </template>
        
        <!-- 卡片主体 -->
        <div class="article-meta">
          <span>作者：{{ article.authorName }}</span>
          <span>分类：{{ article.cate_name }}</span>
          <span>发布时间：{{ formatDate(article.pub_date) }}</span>
        </div>
        <div class="article-preview">
          {{ article.content.slice(0, 100) }}...
        </div>
        
        <!-- 点赞/收藏按钮（带状态展示） -->
        <div class="article-actions" mt="10">
          <el-button 
            type="text" 
            :icon="isArticleLiked(article.id) ? 'el-icon-heart' : 'el-icon-heart-empty'"
            :style="{ color: isArticleLiked(article.id) ? '#f56c6c' : 'inherit' }"
            @click="handleLike(article.id)"
            :disabled="!isLogin"
          >
            {{ isArticleLiked(article.id) ? '已点赞' : '点赞' }}：{{ getLikeCount(article.id) }}
          </el-button>
          <el-button 
            type="text" 
            :icon="isArticleCollected(article.id) ? 'el-icon-star' : 'el-icon-star-empty'"
            :style="{ color: isArticleCollected(article.id) ? '#e6a23c' : 'inherit' }"
            @click="handleCollect(article.id)"
            :disabled="!isLogin"
            ml="10"
          >
            {{ isArticleCollected(article.id) ? '已收藏' : '收藏' }}：{{ getCollectCount(article.id) }}
          </el-button>
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
  background-color: var(--card-bg);
  margin-bottom: 15px;
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

.article-actions {
  display: flex;
  align-items: center;
  margin-top: 10px;
  
  :deep(.el-button) {
    padding: 0;
    &:hover {
      color: var(--el-color-primary);
    }
    &[disabled] {
      color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>