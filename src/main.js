import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Pages/Dashboard'

Vue.config.productionTip = false
Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    { path: '/', redirect:'/dashboard'},
    { path: '/:pageId', component: Dashboard }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#homeboard')
