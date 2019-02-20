import request from './request'


// 用户登录，获取token
export function wechatLogin_api(code) {
  return request.get('login/wechatLogin', { params: { code } })
}

// 获取用户信息
export function getUserInfo_api() {
  return request.get('userManager/getUserInfo')
}

// 绑定微信
export function bindWeChat_api(code) {
  return request.post('userManager/bindWeChat', { code })
}

// 修改或设置密码
export function setPassword_api(params) {
  return request.post('userManager/resetPassword', params)
}

// 用户名密码登录
export function passwordLogin_api(params) {
  return request.post('login/accountLogin', params)
}


// 手机验证码登录
export function codeLogin_api(params) {
  return request.post('login/verificationCodeLogin', params)
}