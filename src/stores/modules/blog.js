import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Storage } from '@/utils/storage'
import { useUserStore } from './user'
import { getCateList } from '@/api/article'

export const useBlogStore = defineStore('blog', () => {
  const userStore = useUserStore()
  // 文章列表
  const articleList = ref([])
  // 文章分类列表
  const cateList = ref([])
  // 排序类型（time/like）
  const sortType = ref('time')
  // 筛选分类ID
  const filterCateId = ref('')

  // 初始化文章列表（模拟多用户文章）
  const initArticleList = async () => {
    // 先获取分类列表
    const cateRes = await getCateList()
    cateList.value = cateRes.data.data
    // 从localStorage获取或初始化模拟文章
    const blogData = Storage.getBlogData()
    if (blogData.articles.length === 0) {
      // 模拟数据
      const mockArticles = [
        {
          id: 1,
          title: 'Vue3 + Pinia 实战教程',
          content: '这是一篇关于Vue3和Pinia的实战教程，详细讲解了状态管理的使用...',
          authorId: 1001,
          authorName: '前端开发',
          authorPic: '',
          cate_id: 1,
          cate_name: '前端',
          pub_date: new Date().toISOString(),
          state: '已发布'
        },
        {
          id: 2,
          title: 'Element Plus 深色模式适配',
          content: 'Element Plus的深色模式配置非常简单，只需要...',
          authorId: 1002,
          authorName: 'UI设计',
          authorPic: '',
          cate_id: 2,
          cate_name: 'UI/UX',
          pub_date: new Date(Date.now() - 86400000).toISOString(),
          state: '已发布'
        }
      ]
      Storage.updateBlogData({ articles: mockArticles })
      articleList.value = mockArticles
    } else {
      articleList.value = blogData.articles
    }
  }

  // 筛选+排序后的文章列表
  const filteredArticles = computed(() => {
    let list = [...articleList.value]
    // 分类筛选
    if (filterCateId.value) {
      list = list.filter(item => item.cate_id === filterCateId.value)
    }
    // 排序
    if (sortType.value === 'time') {
      list.sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date))
    } else if (sortType.value === 'like') {
      list.sort((a, b) => {
        const aLikeCount = Storage.getBlogData().like[a.id]?.count || 0
        const bLikeCount = Storage.getBlogData().like[b.id]?.count || 0
        return bLikeCount - aLikeCount
      })
    }
    return list
  })

  // ========== 互动功能 ==========
  // 点赞/取消点赞
  const toggleLike = (articleId) => {
    if (!userStore.token) return false
    const userId = userStore.userInfo.id
    const blogData = Storage.getBlogData()
    // 初始化文章点赞数据
    if (!blogData.like[articleId]) {
      blogData.like[articleId] = { likeUserIds: [], count: 0 }
    }
    const likeData = blogData.like[articleId]
    // 判断是否已点赞
    const isLiked = likeData.likeUserIds.includes(userId)
    if (isLiked) {
      // 取消点赞
      likeData.likeUserIds = likeData.likeUserIds.filter(id => id !== userId)
      likeData.count -= 1
    } else {
      // 点赞
      likeData.likeUserIds.push(userId)
      likeData.count += 1
    }
    Storage.updateBlogData({ like: blogData.like })
    return !isLiked
  }

  // 收藏/取消收藏
  const toggleCollect = (articleId) => {
    if (!userStore.token) return false
    const userId = userStore.userInfo.id
    const blogData = Storage.getBlogData()
    // 初始化用户收藏数据
    if (!blogData.collect.userCollect[userId]) {
      blogData.collect.userCollect[userId] = []
    }
    // 初始化文章收藏数
    if (!blogData.collect.articleCount[articleId]) {
      blogData.collect.articleCount[articleId] = 0
    }
    const userCollect = blogData.collect.userCollect[userId]
    const isCollected = userCollect.includes(articleId)
    if (isCollected) {
      // 取消收藏
      blogData.collect.userCollect[userId] = userCollect.filter(id => id !== articleId)
      blogData.collect.articleCount[articleId] -= 1
    } else {
      // 收藏
      blogData.collect.userCollect[userId].push(articleId)
      blogData.collect.articleCount[articleId] += 1
    }
    Storage.updateBlogData({ collect: blogData.collect })
    return !isCollected
  }

  // 关注/取消关注作者
  const toggleFollow = (authorId) => {
    if (!userStore.token) return false
    const userId = userStore.userInfo.id
    const blogData = Storage.getBlogData()
    // 初始化用户关注数据
    if (!blogData.follow.userFollow[userId]) {
      blogData.follow.userFollow[userId] = []
    }
    // 初始化作者粉丝数
    if (!blogData.follow.authorFans[authorId]) {
      blogData.follow.authorFans[authorId] = 0
    }
    const userFollow = blogData.follow.userFollow[userId]
    const isFollowed = userFollow.includes(authorId)
    if (isFollowed) {
      // 取消关注
      blogData.follow.userFollow[userId] = userFollow.filter(id => id !== authorId)
      blogData.follow.authorFans[authorId] -= 1
    } else {
      // 关注
      blogData.follow.userFollow[userId].push(authorId)
      blogData.follow.authorFans[authorId] += 1
    }
    Storage.updateBlogData({ follow: blogData.follow })
    return !isFollowed
  }

  // 发布评论
  const addComment = (articleId, content) => {
    if (!userStore.token) return false
    const userId = userStore.userInfo.id
    const userName = userStore.userInfo.nickname || userStore.userInfo.username
    const blogData = Storage.getBlogData()
    // 初始化文章评论数据
    if (!blogData.comment[articleId]) {
      blogData.comment[articleId] = []
    }
    const newComment = {
      id: Date.now(), // 用时间戳做评论ID
      content,
      userId,
      userName,
      createTime: new Date().toISOString()
    }
    blogData.comment[articleId].unshift(newComment)
    Storage.updateBlogData({ comment: blogData.comment })
    return true
  }

  // 删除评论
  const deleteComment = (articleId, commentId) => {
    if (!userStore.token) return false
    const userId = userStore.userInfo.id
    const blogData = Storage.getBlogData()
    const comments = blogData.comment[articleId] || []
    // 只能删除自己的评论
    const commentIndex = comments.findIndex(item => item.id === commentId && item.userId === userId)
    if (commentIndex > -1) {
      comments.splice(commentIndex, 1)
      Storage.updateBlogData({ comment: blogData.comment })
      return true
    }
    return false
  }

  return {
    articleList,
    cateList,
    sortType,
    filterCateId,
    initArticleList,
    filteredArticles,
    toggleLike,
    toggleCollect,
    toggleFollow,
    addComment,
    deleteComment
  }
})