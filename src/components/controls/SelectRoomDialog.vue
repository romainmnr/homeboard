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
      <div class="room">Kitchen</div>
      <div class="room active">Living room</div>
      <div class="room ">Bedroom</div>
      <div class="room btn btn-blue"><i class="fas fa-plus"></i> Add room</div>
    </div> 
  </div>
</template>

<script>
import { EventBus } from '@/scripts/EventBus.js';

export default {
  name: 'SelectRoomDialog',
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
    }

  }
}
</script>

