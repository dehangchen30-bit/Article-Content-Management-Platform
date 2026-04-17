<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { register, login } from '@/api/user'
import { ref, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores'

// pinia相关仓库
const userStore = useUserStore()

// 登录、注册状态
const isRegister = ref(false)

// 表单元素
const form = ref(null)

// 表单数据
const emptyForm = {
  username: '',
  password: '',
  repassword: ''
}
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

// 侦听登录、注册状态变化，一旦变化，触发表单数据清空
watch(isRegister, () => {
  formModel.value = emptyForm
})

// 校验规则  四大校验方式
// const rules = {
//   username: [
//     { required: true, message: '请输入用户名', trigger: 'blur' }, // 1、非空校验
//     { min: 1, max: 10, message: '用户名长度在 1 到 10 个字符', trigger: 'blur' } // 2、长度校验
//   ],
//   password: [
//     { required: true, message: '请输入密码', trigger: 'blur' },
//     { pattern: /^\S{6,15}$/, message: '密码必须是6 到 15 位的非空字符', trigger: 'blur' } // 3、正则校验
//   ],
//   repassword: [
//     { required: true, message: '请输入密码', trigger: 'blur' },
//     { // 4、自定义校验
//       validator: (rule, value, callback) => {
//         if (value !== formModel.value.password) {
//           callback(new Error('两次输入的密码不一致'))
//         } else {
//           callback()
//         }
//       },
//       trigger: 'blur'
//     }
//   ]
// }
// 拆分校验规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 10, message: '用户名长度在 1 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6 到 15 位的非空字符', trigger: 'blur' }
  ]
}
const registerRules = {
  ...loginRules,
  repassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 注册
const registerFn = async () => {
  await form.value.validate()
  await register(formModel.value).then(function () {
    ElMessage({ message: '注册成功', type: 'success' })
    formModel.value = emptyForm
    isRegister.value = false
  }).catch(function () {
    formModel.value = emptyForm
  })
}

// // 登录
// const loginFn = async () => {
//   await form.value.validate()
//   await login(formModel.value).then((res) => {
//     userStore.setToken(res.data.token)
//     formModel.value = emptyForm
//     ElMessage.success('登录成功')
//     router.push('/')
//   })
// }


// 新增记住我绑定
const rememberMe = ref(false)
// 页面初始化时读取本地存储
onMounted(() => {
  const savedUsername = localStorage.getItem('rememberedUsername')
  if (savedUsername) {
    formModel.value.username = savedUsername
    rememberMe.value = true
  }
})
// 登录成功后处理记住我逻辑
const loginFn = async () => {
  await form.value.validate()
  await login(formModel.value).then((res) => {
    userStore.setToken(res.data.token)
    // 记住用户名
    if (rememberMe.value) {
      localStorage.setItem('rememberedUsername', formModel.value.username)
    } else {
      localStorage.removeItem('rememberedUsername')
    }
    formModel.value = emptyForm
    ElMessage.success('登录成功')
    router.push('/')
  })
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册 -->
      <el-form :model="formModel" 
      :rules="isRegister ? registerRules : loginRules" 
      ref="form" 
      size="large" 
      autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="formModel.repassword" :prefix-icon="Lock" type="password" placeholder="请输入再次密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="registerFn" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="never" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录 -->
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" name="password" :prefix-icon="Lock" type="password"
            placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
            <el-link type="primary" :underline="never">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginFn" class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="never" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>