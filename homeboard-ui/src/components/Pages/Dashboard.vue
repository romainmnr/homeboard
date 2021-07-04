<template>
  <div class="dashboard">
    <div class="grid">
      <user-tile :user-profile="userProfile" />
      <weather-tile />
      <div class="blank-tile" />
    </div><!-- end of grid #1 -->
  </div>
</template>

<script>
import WeatherTile from '@/components/controls/WeatherTile'
import UserTile from '@/components/controls/UserTile'

export default {
  name: 'Dashboard',
  components:{
    WeatherTile,
    UserTile
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

