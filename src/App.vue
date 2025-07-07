<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'


const date = ref(new Date())

function refresh() {
  date.value = new Date()
}


setInterval(() => {
  refresh()
}, 2000)

</script>

<template>
  <header>

    <div>
      <h1>{{ date.toLocaleDateString('fr-CH', { weekday: "long", month: "long", day: "numeric" }) }}</h1>
      <h2>{{ date.getHours() }}:{{ date.getMinutes() }}</h2>
      <p>St Romain</p>
    </div>
    <div>

    </div>



  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
  place-items: flex-start;
  flex-direction: row;
  width: 100%;
}
</style>
