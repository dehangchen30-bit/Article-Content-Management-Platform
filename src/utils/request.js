import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores'

const baseURL = 'http://big-event-vue-api-t.itheima.net'
const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const userStore = useUserStore()
    // 发送请求，自动携带token
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 正确响应返回数据
    if (response.data.code === 0) {
      return response
    }
    ElMessage({ message: response.data.message || '服务异常', type: 'error' })
    // 对响应数据做点什么
    return Promise.reject(response.data)
  },
  function (error) {
    ElMessage({ message: error.response.data.message || '服务异常', type: 'error' })
    // 对响应错误做点什么
    if (error.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

export default instance

export { baseURL }
