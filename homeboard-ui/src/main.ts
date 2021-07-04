import Vue from 'vue'
import App from './App.vue'
import router from '@/routing/main.routes'
import MainStore from '@/stores/main.store'


Vue.config.productionTip = false



new Vue({
  router,
  store: MainStore,
  render: h => h(App),
}).$mount('#homeboard')
