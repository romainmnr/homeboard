<template>
  <div v-show="isSelectRoomDialogShown" class="select-room-dialog">
    <div class="overlay" @click="closeDialog()" />
    <div class="dropdown">
      <div class="header">
        <div class="icon" @click="gotoDashboard()">
          <i class="fas fa-home" />
        </div>
        <div class="title">
          <div>Dashboard</div>
          <div>4 rooms</div>
        </div>
      </div>
      <div
        v-for="page in pages" 
        :key="page.uid" 
        class="room" :class="{active:isActive(page.uid)}" 
        @click="goto(page.uid)">
        {{ page.name }}
      </div>
      <div class="room btn btn-blue">
        <i class="fas fa-plus" /> Add room
      </div>
    </div> 
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({

})
export default class SelectRoomDialog extends Vue 
{

  get pages()
  {
    return this.$store.getters.getPages
  }

  get isSelectRoomDialogShown()
  {
    return this.$store.getters.isSelectRoomDialogShown
  }

  closeDialog()
  {
    this.$store.commit('setSelectRoomDialogState', false)
  }
  openDialog()
  {
    this.$store.commit('setSelectRoomDialogState', true)
  }
  isActive(pageId){
    return this.$route.params.pageId == pageId
  }
  goto(pageId){
    this.$router.push({ name: 'page', params: { pageId }})
    this.closeDialog()
  }
  gotoDashboard(){
    this.$router.push({ name: 'dashboard'})
    this.closeDialog()
  }

}
</script>

