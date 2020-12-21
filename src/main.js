import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './api/http'
import store from './store/index'
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
