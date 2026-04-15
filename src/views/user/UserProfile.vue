<!-- 基本资料 -->

<script setup>
import { ref } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores' 
import {userUpdateInfoService} from '@/api/user'
import { ElMessage } from 'element-plus'


const userStore = useUserStore()
userStore.getUserInfo()
// 定义表单数据
const form = ref(userStore.userInfo)

// 表单验证规则
const rules = {
  nickname: [
    { 
      required: true, 
      message: '请输入用户昵称', 
      trigger: 'blur' 
    },
    { 
      pattern: /^\S{1,10}$/, 
      message: '昵称必须为1-10位非空格字符', 
      trigger: 'blur' 
    }
  ],
  email: [
    { 
      required: true, 
      message: '请输入邮箱地址', 
      trigger: 'blur' 
    },
    { 
      type: 'email', 
      message: '请输入正确的邮箱格式', 
      trigger: 'blur' 
    }
  ]
}

// 表单引用
const formRef = ref()

// 提交表单
const onSubmit = async() => {
  await formRef.value.validate()
  await userUpdateInfoService(form.value)
  ElMessage.success('修改成功')
  userStore.getUserInfo()
}
</script>
<template>
  <page-container title="基本资料">
  <el-form
  ref="formRef"
  :model="form"
  :rules="rules"
  label-width="100px"
  style="max-width: 460px"
  >
    <!-- 登录名称 -->
    <el-form-item label="登录名称" prop="username">
      <el-input v-model="form.username" disabled />
    </el-form-item>
    
    <!-- 用户昵称 -->
    <el-form-item label="用户昵称" prop="nickname">
      <el-input 
        v-model="form.nickname" 
        placeholder="请输入用户昵称" 
      />
    </el-form-item>
    
    <!-- 用户邮箱 -->
    <el-form-item label="用户邮箱" prop="email">
      <el-input 
        v-model="form.email" 
        placeholder="请输入邮箱地址" 
      />
    </el-form-item>
    
    <!-- 提交按钮 -->
    <el-form-item>
      <el-button 
        type="primary" 
        size="large"
        @click="onSubmit"
      >
        <el-icon><Edit /></el-icon>
        提交修改
      </el-button>
    </el-form-item>
  </el-form>

  </page-container>  
</template>



<style scoped></style>