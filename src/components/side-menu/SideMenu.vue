<template>
  <v-list nav>
    <v-list-item-group active-class="text--accent-4">
      <v-list-item
        @click="$router.push({ path: item.path }).catch(() => {})"
        v-for="(item, i) in menuItems"
        :key="i"
      >
        <v-list-item-title>
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      menuItems: [
        {
          title: 'Inventory',
          icon: 'mdi-package-variant-closed',
          path: '/inventory'
        },
        {
          title: 'Activity History',
          icon: 'mdi-history',
          path: '/activityhistory'
        },
        {
          title: 'Tags',
          icon: 'mdi-tag-multiple-outline',
          path: '/tags'
        },
        {
          title: 'Users',
          icon: 'mdi-account-group-outline',
          path: '/users'
        },
        {
          title: 'Import',
          icon: 'mdi-import',
          path: '/import'
        },
        {
          title: 'User Profile Settings',
          icon: 'mdi-account-cog-outline',
          path: '/usersettings'
        },
        {
          title: 'Help Center',
          icon: 'mdi-help',
          path: '/help'
        }
      ]
    }
  }
}
</script>
