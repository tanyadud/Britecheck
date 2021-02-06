<template>
  <div>
    <v-app-bar app color="white">
      <v-row align="center">
        <v-app-bar-nav-icon
          @click.stop=";(drawer = !drawer), $emit('open-drawer', drawer)"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>Inventory</v-toolbar-title>
        <v-col cols="12" sm="4" md="4">
          <v-text-field
            hide-details
            append-icon="mdi-magnify"
            placeholder="Search"
            @click:append="onSearch"
            filled
            rounded
            dense
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <div class="mx-3">
          <LangSelect />
        </div>
        <UserTopMenu />
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import LangSelect from '@/components/top-bar/LangSelect'
import UserTopMenu from '@/components/top-bar/UserTopMenu'
export default {
  name: 'Topbar',
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    onSearch() {}
  },
  components: {
    LangSelect,
    UserTopMenu
  }
}
</script>
