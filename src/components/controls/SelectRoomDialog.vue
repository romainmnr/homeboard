<template>

  <div class="select-room-dialog" v-show="showDialog">
    <div class="overlay" @click="closeDialog()"/>
    <div class="dropdown">
      <div class="header">
        <div class="icon"><i class="fas fa-home"></i></div>
        <div class="title">
            <div>Dashboard</div>
            <div>4 rooms</div>
        </div>
      </div>
      <div class="room" 
        @click="goto(page.id)" 
        v-for="page in pages" :key="page.id" 
        :class="{active:isActive(page.id)}">{{page.name}}</div>
      <div class="room btn btn-blue"><i class="fas fa-plus"></i> Add room</div>
    </div> 
  </div>
</template>

<script>
import { EventBus } from '@/EventBus.js';

export default {
  name: 'SelectRoomDialog',
  props: {   
    pages: Array
  },
  data: function(){
    return {
      showDialog: false
    }
  },
  mounted () {
    EventBus.$on('SelectRoomDialog.show', this.openDialog)
  },

  methods:{
    closeDialog(){
      this.showDialog=false
    },
    openDialog(){
      this.showDialog=true
    },
    isActive(pageId){
      return this.$route.params.pageId == pageId
    },
    goto(pageId){
      this.$router.push({ path: pageId })
      this.closeDialog()
    }

  }
}
</script>

