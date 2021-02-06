<template>
  <v-container class="inventory-container">
    <v-row class="justify-end align-center">
      <div class="flex-shrink-0">
        <v-btn
          rounded
          small
          class="mx-1 primary"
          @click="$router.push('/item/createItem')"
        >
          <v-icon class="pr-1">mdi-plus</v-icon>
          Add Item
        </v-btn>
        <v-btn
          rounded
          small
          class="mx-1 primary"
          @click="$router.push('/item/editItem')"
        >
          <v-icon class="pr-1">mdi-plus</v-icon>
          Edit Item(Testing)
        </v-btn>
        <v-btn
          rounded
          small
          class="mx-1 primary"
          @click="$router.push('/createFolder')"
        >
          <v-icon class="pr-1">mdi-folder-plus</v-icon>
          Add Folder
        </v-btn>
        <v-btn
          rounded
          small
          class="mx-1 primary"
          @click="$router.push('/editFolder')"
        >
          <v-icon class="pr-1">mdi-folder-plus</v-icon>
          Edit Folder(testing)
        </v-btn>
      </div>
    </v-row>
    <v-row wrap>
      <v-col class="col-4">
        <v-card outlined height="100%">
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in ['Filter', 'Filter', 'Filter']"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group> </v-list></v-card
      ></v-col>
      <v-col class="col-8">
        <router-view></router-view>
      </v-col>
    </v-row>
    <!-- List of folders -->
  </v-container>
</template>

<script>
export default {
  name: 'Inventory'
}
</script>
<style scoped>
.inventory-container {
  padding: 12px !important;
}
</style>
