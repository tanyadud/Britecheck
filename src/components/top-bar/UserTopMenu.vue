<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <!-- <v-btn icon x-large v-on="on">
        <span>{{ curUserName }}</span>
      </v-btn> -->

      <span v-on="on" class="mx-3 cur-username">{{ curUserName }}</span>
    </template>
    <v-list>
      <v-list-item class="profile-btn">
        <v-list-item-title @click="EditProfile">Edit Profile</v-list-item-title>
      </v-list-item>
      <v-list-item class="logout-btn">
        <v-list-item-title @click="logout">Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'UserTopMenu',
  data() {
    return {
      langs: [{ title: 'Edit profile' }, { title: 'Logout' }],
      curUserName: ''
    }
  },
  mounted() {
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    this.curUserName = curUserData.lastName + ' ' + curUserData.firstName
  },
  methods: {
    logout: function () {
      this.$store.dispatch('user/logout').then(() => {
        document.location.href = '/login'
      })
    },
    EditProfile: function () {
      this.$router.push('/usersettings')
    }
  }
}
</script>
<style lang="css">
.profile-btn,
.logout-btn {
  cursor: pointer;
}
.profile-btn:hover,
.logout-btn:hover {
  background-color: darkgrey;
}
.cur-username {
  cursor: pointer;
}
</style>
