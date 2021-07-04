
import Vue from "vue"
import Router from "vue-router"

//-- Import custom components:
import Dashboard from '@/components/Pages/Dashboard.vue'
import Page from '@/components/Pages/Page.vue'
import Login from '@/components/Pages/Login.vue'
import MainStore from '@/stores/main.store'

//-- Load Vue Router
Vue.use(Router);

//-- Configure Routing
const router = new Router({
  routes:[
    { name:'dashboard', path: '/', component: Dashboard},
    { name:'page', path: '/p/:pageId', component: Page },
    { name:'login', path: '/login', component: Login, meta: { hideSwipePanel: true } }
  ]
})

export default router