<!-- 文章管理 -->
<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { getArticleList, delArticle } from '@/api/article'
import { formatDate } from '@/utils/formmat'
import { ElMessageBox, ElMessage } from 'element-plus'
import ArticleEdit from './components/ArticleEdit.vue'

const loading = ref(false)
const formInline = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 搜索逻辑
const onSearch = () => {
  formInline.value.pagenum = 1
  getTableData()
}
// 重置逻辑
const onReset = () => {
  formInline.value.pagenum = 1
  formInline.value.cate_id = ''
  formInline.value.state = ''
  getTableData()
}

// 表格数据
const tableData = ref([])
const total = ref(0)
const getTableData = async () => {
  loading.value = true
  const res = await getArticleList(formInline.value)
  tableData.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getTableData()

// 分页逻辑
const handleSizeChange = (val) => { //改变页面数据量
  formInline.value.pagesize = val
  formInline.value.pagenum = 1
  getTableData()
}
const handleCurrentChange = (val) => { //改变当前页
  formInline.value.pagenum = val
  getTableData()
}

// 删除逻辑
const delRow = async (row) => {
  await ElMessageBox.confirm(
    '您确定要删除该文章吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  await delArticle(row.id)
  ElMessage.success('删除成功')
  getTableData()
}
//抽屉逻辑
const articleEditRef = ref()

// 编辑文章
const editRow = (row) => {
  articleEditRef.value.open(row)
}
// 新增文章
const addArticle = () => {
  articleEditRef.value.open({})
}

// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / formInline.value.pagesize)
    formInline.value.pagenum = lastPage
  }
  // 如果是编辑，直接渲染当前页
  getTableData()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra> <el-button type="primary" @click="addArticle">发布文章</el-button></template>
    <!-- 表单部分 -->
    <el-form :inline="true" :model="formInline">
      <el-form-item label="文章分类：">
        <channel-select width="width:220px;" v-model:cateId="formInline.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="formInline.state" placeholder="请选择" clearable style="width: 220px;">
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary" plain>搜索</el-button>
        <el-button @click="onReset" plain>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date" label="发表时间" align="center">
        <template #default="{ row }">
          {{ formatDate(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button @click="editRow(row)" :icon="Edit" type="primary" circle plain></el-button>
          <el-button @click="delRow(row)" :icon="Delete" type="danger" circle plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-model:current-page="formInline.pagenum" v-model:page-size="formInline.pagesize"
      :page-sizes="[2, 3, 5, 10]" :background="true" layout="jumper,total, sizes, prev, pager, next" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange"
      style="margin-top: 30px; justify-content: flex-end" />
    <!-- 抽屉 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>

  </page-container>
</template>

<style scoped></style>