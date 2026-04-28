/**
 * localStorage 操作工具
 * 统一处理互动数据、深色模式状态
 */
export const Storage = {
  // 设置数据
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  // 获取数据
  get(key) {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : null
  },
  // 移除数据
  remove(key) {
    localStorage.removeItem(key)
  },
  // 清空数据
  clear() {
    localStorage.clear()
  },

  // ========== 互动数据专用方法 ==========
  // 初始化数据结构（避免空值报错）
  initBlogData() {
    const defaultData = {
      like: {},          // 点赞：{ articleId: { likeUserIds: [], count: 0 } }
      collect: {         // 收藏：{ userId: { collectArticleIds: [] }, articleCollectCount: {} }
        userCollect: {},
        articleCount: {}
      },
      comment: {},       // 评论：{ articleId: [{ id, content, userId, createTime }] }
      follow: {          // 关注：{ userId: { followAuthorIds: [] }, authorFansCount: {} }
        userFollow: {},
        authorFans: {}
      },
      articles: []       // 模拟所有用户文章列表（无接口时用）
    }
    if (!this.get('blog_data')) {
      this.set('blog_data', defaultData)
    }
  },

  // 获取数据
  getBlogData() {
    this.initBlogData()
    return this.get('blog_data')
  },

  // 更新数据
  updateBlogData(newData) {
    const oldData = this.getBlogData()
    this.set('blog_data', { ...oldData, ...newData })
  }
}

// 初始化数据
Storage.initBlogData()