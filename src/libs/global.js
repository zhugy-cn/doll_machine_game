import store from '@/stores'
export default {
  // 打开loading
  openLoading(message = "载入中...") {
    let payload = {
      message,
      visible: true
    }
    store.commit('SET_GLOBAL_LOADING', payload)
  },
  // 关闭loading
  closeLoading() {
    store.commit('SET_GLOBAL_LOADING', false)
  },
  showToast(options) {
    store.dispatch('setToastAct', options)
  }
}
