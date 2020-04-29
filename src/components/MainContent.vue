<template>
  <div class="main-content">
    <div class="overlay" @click="clickOverlay()" v-show="showOverlay"/>

    <router-view></router-view>

  </div>

</template>

<script>
import { EventBus } from '@/scripts/EventBus.js';

export default {
  name: 'MainContent',
  data: function(){
    return {
      showOverlay: false
    }
  },
  mounted () {
    EventBus.$on('MainContent.toggleOverlay', state=>{
      this.showOverlay= state
    })
  },
  methods:{
    clickOverlay () {
      EventBus.$emit('MainContent.clickOverlay')
    }

  }
}
</script>

