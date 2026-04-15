import request from '@/utils/request'

// =============文章分类管理相关api==============
// 获取-文章分类列表
export const getCateList = () => {
  return request.get('/my/cate/list')
}
// 新增-文章分类
export const addCate = (obj) => {
  const { cate_name, cate_alias } = obj
  return request.post('/my/cate/add', {
    cate_name, //文章分类名 1-10个非空格字符
    cate_alias, //文章分类别名 1-15个大小写字母和数字组成的字符串
  })
}
// 获取-文章分类详情
export const getCateDetail = (id) => {
  return request.get('/my/cate/info', {
    params: {
      id, // 文章分类id
    },
  })
}
// 更新-文章分类
export const updateCate = (obj) => {
  const { id, cate_name, cate_alias } = obj
  return request.put('/my/cate/info', {
    id, //文章分类id
    cate_name, // 文章分类名字
    cate_alias, // 文章分类别名
  })
}
// 删除-文章分类
export const delCate = (id) => {
  return request.delete('/my/cate/del', { params: { id } })
}

// =============文章管理相关api==============
// 获取-文章列表
export const getArticleList = (obj) => {
  const { pagenum, pagesize, cate_id, state } = obj
  return request.get('/my/article/list', {
    params: {
      pagenum, // 当前页码
      pagesize, // 每页显示多少条数据
      cate_id, // 分类id
      state, // 文章状态(可选值"已发布"或"草稿")
    },
  })
}
// 发布-文章
export const addArticle = (obj) => {
  return request.post('/my/article/add', obj)
}
// 获取-文章详情
export const getArticleDetail = (id) => {
  return request.get('/my/article/info', {
    params: {
      id, // 文章id
    },
  })
}
// 更新-文章
export const updateArticle = (obj) => {
  return request.put('/my/article/info', obj)
}
// 删除-文章
export const delArticle = (id) => {
  return request.delete('/my/article/info', {
    params: {
      id, // 删除文章id
    },
  })
}
