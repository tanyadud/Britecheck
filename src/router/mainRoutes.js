import inventory from '@/router/inventory'
const Default = () => import('@/views/Default')

const mainRoutes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
    redirect: 'inventory/categories',
    component: Default,
    children: [
      {
        path: '/inventory',
        name: 'Inventory',
        redirect: 'inventory/categories',
        component: () => import('../views/inventory/Inventory'),
        children: [...inventory],
        meta: {
          breadcrumbs: [{ name: 'Inventory' }]
        }
      },
      {
        path: '/item/createItem',
        name: 'CreateItem',
        component: () => import('../views/inventory/CreateItem.vue')
      },
      {
        path: '/item/editItem',
        name: 'EditItem',
        component: () => import('../views/inventory/EditItem.vue')
      },
      {
        path: '/editFolder',
        name: 'EditFolder',
        component: () => import('../views/inventory/EditFolder.vue')
      },
      {
        path: '/createFolder',
        name: 'CreateFolder',
        component: () => import('../views/inventory/CreateFolder.vue')
      },
      {
        path: '/activityhistory',
        name: 'ActivityHistory',
        component: () => import('../views/ActivityHistory.vue'),
        meta: {
          breadcrumbs: [{ name: 'Activity History' }]
        }
      },
      {
        path: '/tags',
        name: 'Tags',
        component: () => import('../views/Tags.vue'),
        meta: {
          breadcrumbs: [{ name: 'Tags' }]
        }
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/Users.vue'),
        meta: {
          breadcrumbs: [{ name: 'Users' }]
        }
      },
      {
        path: '/import',
        name: 'Import',
        component: () => import('../views/Import.vue'),
        meta: {
          breadcrumbs: [{ name: 'Import' }]
        }
      },
      {
        path: '/usersettings',
        name: 'UserSettings',
        component: () => import('../views/UserSettings.vue'),
        meta: {
          breadcrumbs: [{ name: 'User Settings' }]
        }
      },
      {
        path: '/help',
        name: 'HelpCenter',
        component: () => import('../views/HelpCenter.vue'),
        meta: {
          breadcrumbs: [{ name: 'Help Center' }]
        }
      },
      {
        path: '*',
        name: 'not-found',
        component: () => import('../views/NotFound.vue'),
        meta: {
          breadcrumbs: [{ name: 'Not Found' }]
        }
      }
    ]
  }
]
export default mainRoutes
