// 用户模块的相关方法
import request from '@/utils/request.js'
export const login = data => {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'post',
    data: data,
  })
}
export const user = () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'GET',
  })
}
// 更新用户头像
export const updateUser = data => {
  return request({
    url: '/mp/v1_0/user/photo',
    method: 'PATCH',
    data,
  })
}
// 修改用户资料
export const updateUserInfo = data => {
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'PATCH',
    data,
  })
}
