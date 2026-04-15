import request from '@/utils/request'

// 注册
export const register = (obj) => {
  const { username, password, repassword } = obj
  return request.post('/api/reg', {
    username,
    password,
    repassword,
  })
}

// 登录
export const login = (obj) => {
  const { username, password } = obj
  return request.post('/api/login', {
    username,
    password,
  })
}

// 获取用户信息
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}


// 更新用户信息
export const userUpdateInfoService = (obj) => {
  const { id, username,nickname, email, user_pic } = obj
  return request.put('/my/userinfo', {
    id, 
    username,
    nickname,
    email,
    user_pic,
  })
}

// 更新用户密码
export const userUpdatePwdService = (obj) => {
  const { old_pwd, new_pwd, re_pwd } = obj
  return request.patch('/my/updatepwd', {
    old_pwd,
    new_pwd,
    re_pwd,
  })
}

// 更新用户头像
export const userUpdateAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', {
    avatar,
  })
}