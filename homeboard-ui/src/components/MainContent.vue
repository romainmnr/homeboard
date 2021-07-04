<template>
  <div class="main-content">
    <div v-show="showOverlay" class="overlay" @click="clickOverlay()" />
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
@Component({

})
export default class MainContent extends Vue {

  clickOverlay () {
    this.$store.dispatch('clickMainOverlay')
  }

  get showOverlay()
  {
    return this.$store.getters.isMainOverlayShown
  }

}

</script>

