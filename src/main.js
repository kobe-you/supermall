import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//Vue.prototype.$bus:用一个Vue对象实现事件总线
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
