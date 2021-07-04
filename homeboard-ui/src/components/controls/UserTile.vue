<template>
  <div class="welcome-tile">
    <div class="welcome-tile-header">
      <div>Good morning,</div>
      <div>{{ userProfile.name }}!</div>
    </div>
    <span>Living room is opening</span>
    <div class="welcome-tile-link" @click="isSelected=!isSelected">
      See all activities
    </div>
  </div>
</template>

<script>
import moment from 'moment'


export default {
  name: 'UserTile',
  props: {
    userProfile: Object
  },
  data: function(){
    return {
      isSelected: false,
      date:'',
      time:'',

    }
  },
  mounted(){
    moment.locale('fr');
    this.init();
    setInterval(() => {
      this.init();
    }, 6000);
  },

  methods:{
    init(){
      this.date = moment().format("dddd Do MMMM YYYY");
      this.time =  moment().format("HH:mm");
    },


  }

}
</script>

