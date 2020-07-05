<template>
  <div class="main-content">
    <div class="overlay" @click="clickOverlay()" v-show="showOverlay"/>
    <router-view :page="currentPage" />
  </div>
</template>

<script>
import { EventBus } from '@/EventBus.js';
export default {
  name: 'MainContent',

  data: function(){
    return {
      showOverlay: false,
      currentPage :{},
      routeUID: ''
    }
  },
  mounted () {
    EventBus.$on('MainContent.toggleOverlay', state=>{
      this.showOverlay= state
    })
    this.$socketClient.on('getPage.reply', page => {
      this.currentPage = page;
    })
    this.getCurrentPage()
    this.routeUID = this.$route.params.pageId
  },
  updated(){
    if (this.routeUID !== this.$route.params.pageId && typeof this.$route.params.pageId !== 'undefined') {
      this.getCurrentPage()
      this.routeUID = this.$route.params.pageId
    }
  },
  methods:{
    clickOverlay () {
      EventBus.$emit('MainContent.clickOverlay')
    },
    getCurrentPage(){
      this.currentPage = {}
      this.$socketClient.emit('getPage', this.$route.params.pageId);
    }


  }
}
</script>

