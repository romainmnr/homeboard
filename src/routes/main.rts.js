import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Dashboard from '@/components/Pages/Dashboard'

export default  new VueRouter({
  routes:[
    { 
      path: '/', 
      component: Dashboard 
    }
  ]
})
