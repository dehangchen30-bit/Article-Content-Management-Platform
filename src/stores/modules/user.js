import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'bigEvent_user',
  () => {
    // 用户权限
    const token = ref('')
    const setToken = (t) => {
      token.value = t
    }

    // 用户信息
    const userInfo = ref({})
    const getUserInfo = async () => {
      const res = await userGetInfoService()
      userInfo.value = res.data.data
    }
    const setUserInfo = (info) => {
      userInfo.value = info
    }
    return {
      token,
      setToken,
      userInfo,
      getUserInfo,
      setUserInfo,
    }
  },
  {
    persist: true,
  },
)
