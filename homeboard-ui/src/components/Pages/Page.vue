<template>
  <div class="page">
    <div class="grid">
      <user-tile :user-profile="userProfile" />
      <weather-tile />
    </div><!-- end of grid #1 -->
    <div class="grid">
      <tile v-for="tile in page.tiles" :key="tile.id" :config="tile" />
    </div>
  </div>
</template>

<script>
import Tile from './../controls/Tile'
import WeatherTile from '@/components/controls/WeatherTile'
import UserTile from '@/components/controls/UserTile'

export default {
  name: 'Dashboard',
  components:{
    Tile, WeatherTile, UserTile
  },
  props: {   
    userProfile: Object,
    page: {type:Object, default:()=>{return {}}}
  },
  data: function(){
    return {

    }
  },
  mounted(){

  },
  methods:{

  }

}
</script>

