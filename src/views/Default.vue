<template>
  <v-app>
    <TopBar @open-drawer="onOpenDrawer" />
    <v-navigation-drawer
      app
      v-model="drawer"
      left
      @transitionend="onOpenDrawer"
    >
      <SideMenu />
    </v-navigation-drawer>
    <div></div>
    <v-main>
      <v-container
        app
        background-color="grey lighten-2"
        class="default-container"
      >
        <!--<Breadcrumbs />-->
        <Message />
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>
<script>
import Message from '@/components/Message'
import TopBar from '@/components/top-bar/TopBar'
import SideMenu from '@/components/side-menu/SideMenu'
// import Breadcrumbs from '@/components/Breadcrumbs'
export default {
  name: 'Default',
  data() {
    return {
      drawer: false,
      isMobile: false
    }
  },
  mounted() {
    this.onResize()
  },
  methods: {
    onOpenDrawer(isOpen) {
      this.drawer = !this.drawer
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      console.log('resize', this.windowSize)
      if (this.windowSize.x < 800) this.drawer = false
      else this.drawer = true
    }
  },

  components: {
    TopBar,
    SideMenu,
    Message
    // Breadcrumbs
  }
}
</script>
<style scoped>
.container {
  width: 100% !important;
  max-width: 100%;
}
.default-container {
  padding: 0 0 0 0 !important;
}
</style>
