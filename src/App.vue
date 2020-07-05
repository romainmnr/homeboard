<template>
  <div id="homeboard" :key="ts">
    <main-content />
    <swipe-panel />
    <select-room-dialog :pages="pageList" />
  </div>
</template>

<script>
import MainContent from './components/MainContent.vue'
import SwipePanel from './components/SwipePanel/SwipePanel.vue'
import SelectRoomDialog from './components/controls/SelectRoomDialog.vue'
import io from 'socket.io-client';
import Vue from 'vue'

export default {
  name: 'App',
  components: {
    MainContent,
    SwipePanel,
    SelectRoomDialog
  },
  data(){
    return {
      ts: 0,
      pageList: []
    }
  },
  beforeMount(){
    Vue.$socketClient = Vue.prototype.$socketClient = io('http://localhost:3210', {
      path: '/socket'
    });
    
    this.$socketClient.on('getPages.reply', pages => {
      this.pageList = pages
      this.refreshUi()
    })

    //-- trigger all init events
    this.$socketClient.emit('getPages')
  },
  methods: {
    refreshUi(){
      this.ts = Date.now()
    }

  }
}
</script>

<style lang="scss">
@import '@/assets/style.scss';
</style>
