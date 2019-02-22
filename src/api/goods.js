import request from './request'


// localStorage.setItem('unionid', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im92RHo3NV9KMEkzRUgwR3JLYnRFS0s4eHllWmci.9IDSlI6VBRQqQDZSOc8BHKRd199k-Ep3dz2EswWNYOU')


// 获取用户信息
export function getUserInfo_api() {
  let unionid = localStorage.getItem('unionid')
  return request.get('public/user/info', { params: { unionid } })
}


// 获取奖品列表
export function getPrizeList_api(machine_id) {
  return request.post('public/game/jiawawa/getPrize', { machine_id })
}

// 检查用户的余额
export function checkBalance_api(single_price) {
  let params = {
    single_price,
    unionid: localStorage.getItem('unionid')
  }
  return request.get('public/game/jiawawa/check', { params })
}

// 玩游戏
export function playGame_api(params) {
  params.unionid = localStorage.getItem('unionid')
  return request.post('public/game/jiawawa/play', params)
}


// 系统维护
export function isMaintenance_api() {
  return request.get('is_maintenance', { params: { type: 9 } })
}