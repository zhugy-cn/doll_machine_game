import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router/index'
import store from './stores/index'


import 'amfe-flexible'
import './assets/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
