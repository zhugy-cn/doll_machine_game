import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router/index'
import store from './stores/index'
import global from './libs/global'


import 'amfe-flexible'
import './assets/stylus/index.styl'

Vue.prototype.$global = global;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
