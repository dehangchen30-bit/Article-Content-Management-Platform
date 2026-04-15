<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { addArticle, getArticleDetail, updateArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'
import axios from 'axios'

const drawerShow = ref(false)

// 默认表单
const formDeault = {
  id: '',
  title: '',
  content: '',
  cate_id: '',
  cover_img: '',
  state: ''
}

const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ],
  cover_img: [
    { required: true, message: '请上传封面图片', trigger: 'blur' }
  ],
  cate_id: [
    { required: true, message: '请选择文章分类', trigger: 'blur' }
  ]
}

const formData = ref({ ...formDeault }) // 表单数据

const editorRef = ref(null)
const open = async (row) => {
  drawerShow.value = true
  if (row.id) { // 编辑
    const res = await getArticleDetail(row.id)
    formData.value = res.data.data
    imageUrl.value = baseURL + formData.value.cover_img // 拼接图片真实地址
    // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
    // 网络图片转成 file 对象, 需要转换一下
    formData.value.cover_img = await imageUrlToFile(imageUrl.value, formData.value.cover_img)
  } else {// 打开前先清空表单数据
    formData.value = { ...formDeault }
    imageUrl.value = '' // 清空图片
    editorRef.value.setHTML('') // 清空富文本框数据
  }
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageData = response.data;

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] });

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error);
    throw error;
  }
}

defineExpose({
  open
})

// 图片上传相关逻辑
const imageUrl = ref('')
const onSelectFile = (upLoadFile) => {
  imageUrl.value = URL.createObjectURL(upLoadFile.raw) // 图片预览
  formData.value.cover_img = upLoadFile.raw  // 暂存，用于将来提交
}
// 发布文章
const emit = defineEmits(['success'])
const formRef = ref(null)
const submit = async (state) => { // 提交
  await formRef.value.validate()
  // 将已发布还是草稿状态，存入 state
  formData.value.state = state
  // 转换 formData 数据,后台要求该数据类型，直接传
  const fd = new FormData()
  for (let key in formData.value) {
    fd.append(key, formData.value[key])
  }
  if (formData.value.id) {
    await updateArticle(fd)
    ElMessage.success('修改成功')
    drawerShow.value = false
    emit('success', 'update')
  } else {
    // 添加请求
    await addArticle(fd)
    ElMessage.success('添加成功')
    drawerShow.value = false
    emit('success', 'add')
  }
}

</script>

<template>
  <el-drawer v-model="drawerShow" :title="formData.id ? '编辑文章' : '新增文章'" size="50%">
    <el-form ref="formRef" :rules="rules" :model="formData" label-width="auto" style="width: 100%;">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelSelect v-model:cateId="formData.cate_id" width="width:100%;"></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false" :on-change="onSelectFile">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor ref="editorRef" theme="snow" v-model:content="formData.content" contentType="html">
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item style="margin-left: 68px;">
        <el-button type="primary" @click="submit('已发布')">发布</el-button>
        <el-button type="info" @click="submit('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
// 图片预览样式
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

// 富文本编辑器
.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 300px;
  }
}
</style>