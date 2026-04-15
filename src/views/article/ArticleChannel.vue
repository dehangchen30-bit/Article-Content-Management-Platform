<!-- 文章分类 -->
<script setup>
import { ref, onMounted } from 'vue'
import { getCateList, delCate, addCate, updateCate } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
// 获取分类列表
const cateList = ref([])
const getCateListFn = async () => {
  loading.value = true
  const res = await getCateList()
  cateList.value = res.data.data
  form.value = { ...emptyForm }
  loading.value = false
}
onMounted(() => {
  getCateListFn()
})

// 表格按钮
const handleEdit = (index, row) => { //编辑分类
  title.value = '编辑分类'
  form.value = { ...row }
  dialogVisible.value = true
}
const handleDelete = async (index, row) => {
  await ElMessageBox.confirm(
    '该操作不可逆，你确定要删除吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
  await delCate(row.id)
  ElMessage.success('删除成功')
  getCateListFn()
}
// 对话框相关
const formBom = ref(null)
const title = ref('')
const dialogVisible = ref(false)
const form = ref({
  id: null,
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入文章分类名', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '分类名称必须是1到10位的非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入文章分类别名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须由1-15个大小写字母和数字组成的字符串', trigger: 'blur' }
  ]
}
const emptyForm = {
  id: null,
  cate_name: '',
  cate_alias: ''
}

const addCateFn = () => { //新增分类
  title.value = '新增分类'
  form.value = { ...emptyForm }
  dialogVisible.value = true

}

const btnConfirm = async () => {
  await formBom.value.validate()
  if (title.value === '新增分类') {
    await addCate(form.value)
    ElMessage.success('新增成功')
  } else {
    await updateCate(form.value)
    ElMessage.success('修改成功')
  }
  getCateListFn()
  dialogVisible.value = false
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra> <el-button @click="addCateFn" type="primary"> 添加分类</el-button></template>

    <el-table v-loading="loading" :data="cateList" style="width: 100%" v-if="cateList.length > 0">
      <el-table-column align="center" label="序号" type="index" width="100" />
      <el-table-column label="分类名称" prop="cate_name" />
      <el-table-column label="分类别名" prop="cate_alias" />
      <el-table-column align="center" label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" plain :icon="Edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="danger" plain :icon="Delete" circle
            @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty description="空空如也" v-else />
  </page-container>

  <!-- 对话框，用于编辑和添加 -->
  <el-dialog v-model="dialogVisible" :title="title" width="500">
    <el-form :model="form" :rules="rules" ref="formBom">
      <div style="margin: 20px;">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="form.cate_name" />
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="form.cate_alias" />
        </el-form-item>
      </div>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="btnConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>