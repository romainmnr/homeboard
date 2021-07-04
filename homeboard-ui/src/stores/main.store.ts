import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import Global from '@/stores/modules/Global.store'
import Page from '@/stores/modules/Page.store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Global,
    Page
  },
  strict: true,
  plugins: debug ? [createLogger()] : []
})
