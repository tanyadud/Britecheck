<template>
  <div>
    <div v-if="mode == 1" @click="changemode">
      <router-link :to="{ name: 'AvailableInventory' }"
        >Go to availableInventory
      </router-link>
    </div>
    <div v-if="mode == 2">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllItems',
  data() {
    return {
      mode: 1
    }
  },
  components: {},

  created() {
    if (this.$route.path === '/allitems') {
      this.mode = 1
    } else if (this.$route.path === '/allitems/availiableinventory') {
      this.mode = 2
    }
  },
  mounted() {},
  methods: {
    changemode() {
      this.mode = 2
    }
  },
  unmounted() {
    console.log('unmount')
  }
}
</script>
