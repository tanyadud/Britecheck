const inventory1 = [
  {
    name: 'All Items',
    path: '/allitems',
    component: () => import('../views/inventory/AllItems'),
    meta: {
      breadCrumb: 'All Items'
    },

    children: [
      {
        name: 'AvailableInventory',
        path: 'availiableinventory',
        component: () => import('../views/inventory/AvailableInventory'),
        meta: {
          breadCrumb: 'Availiable Inventory'
        }

      }

    ]

  }

]

export default inventory1
