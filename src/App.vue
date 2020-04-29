<template>
  <div id="homeboard">
    <main-content />
    <swipe-panel />
    <select-room-dialog />
  </div>
</template>

<script>
import MainContent from './components/MainContent.vue'
import SwipePanel from './components/SwipePanel/SwipePanel.vue'
import SelectRoomDialog from './components/controls/SelectRoomDialog.vue'

export default {
  name: 'App',
  components: {
    MainContent,
    SwipePanel,
    SelectRoomDialog
  }
}
</script>

<style lang="scss">
@import '@/assets/style.scss';
</style>
