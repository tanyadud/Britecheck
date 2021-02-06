const inventory = [
  {
    path: 'categories',
    name: 'Categories',
    component: () => import('../views/inventory/Categories')
  },
  {
    path: 'category',
    name: 'emptyCategory',
    redirect: 'categories'
  },
  {
    path: 'category/:id',
    name: 'Category',
    component: () => import('./../views/inventory/Category.vue')
  }
  // {
  //   path: 'item/createItem/',
  //   name: 'CreateItem',
  //   component: () => import('./../views/inventory/CreateItem.vue')
  // }

]
export default inventory
