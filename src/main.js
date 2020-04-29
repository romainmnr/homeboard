import Vue from 'vue'
import App from './App.vue'

import router from '@/routes/main.rts'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#homeboard')
