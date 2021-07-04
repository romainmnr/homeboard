<template>
  <div class="login-view">
    <div class="grid center">
      <div v-for="user in userProfiles" :key="user.uid" class="tile tile-user-profile" @click="selectUser(user)">
        <div class="tile-header">
          <div class="tile-user-thumb" :style="{'background-image':`url('${user.imagePath}')`}" />
        </div>
        <div class="tile-content">
          <div class="tile-user-name">
            {{ user.name }}
          </div>
          <div class="tile-user-role">
            {{ user.role }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data: function(){
    return {
      userProfiles: []
    }
  },
  mounted(){
    this.$socketClient.on('user-profiles.getall.reply', data => {
      console.log('users',data)
      this.userProfiles = data
    })
    this.$socketClient.emit('user-profiles.getall')
  },
  methods:{
    selectUser(user){
      console.log(user)
      this.$socketClient.emit('user-profiles.select', user.uid)
    }

  }

}
</script>

