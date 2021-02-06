import inventoryService from '@/services/inventory'
import { checkApiSuccess } from '../../utils'
import router from '../../router'
// import axios from 'axios'

const namespaced = true
const state = {
  categories: [],
  error: ''
  // categories: [
  //   {
  //     id: 12271,
  //     name: 'Computers',
  //     categories: [
  //       {
  //         id: 4453,
  //         name: 'Notebooks',
  //         items: [
  //           {
  //             id: 2876,
  //             name: 'MacBook Pro 2015',
  //             description: 'MacBook Pro 2015 description',
  //             quantity: 6,
  //             price: 999
  //           },
  //           {
  //             id: 876343,
  //             name: 'MacBook Pro 2020',
  //             description: "MacBook Pro 2015 16'",
  //             quantity: 2,
  //             price: 1299
  //           }
  //         ]
  //       },
  //       {
  //         id: 7534,
  //         name: 'PC'
  //       }
  //     ],
  //     items: [
  //       {
  //         id: 4637,
  //         name: 'iMac',
  //         description: 'iMac description',
  //         quantity: 4,
  //         price: 600
  //       },
  //       {
  //         id: 46337,
  //         name: 'Mac Mini',
  //         description: 'Mac Mini description',
  //         quantity: 5,
  //         price: 459
  //       }
  //     ]
  //   },
  //   {
  //     id: 12143,
  //     name: 'Keyboards',
  //     items: []
  //   },
  //   {
  //     id: 14521,
  //     name: 'Chairs',
  //     items: []
  //   }
  // ]
}
const mutations = {
  set(state, { type, val }) {
    state[type] = val
  }
}
const actions = {
  async createItem({ dispatch, commit }, payload) {
    var inventory = await dispatch('getInventory')
    var inventoryId = inventory.inventoryId[0]
    var categoryId = 1
    const tmp = {
      inventoryId: inventoryId,
      categoryId: categoryId,
      name: payload.name,
      images: payload.images,
      description: payload.notes,
      quantity: parseInt(payload.quantity),
      price: parseInt(payload.price)
    }
    inventoryService.createItem(tmp).then((response) => {
      if (checkApiSuccess(response)) {
        console.log('success')
      }
    })
  },
  async getInventory({ dispatch, commit }) {
    await inventoryService.getInventory().then((response) => {
      if (checkApiSuccess(response)) {
      }
    })
  },

  async getCategories({ dispatch, commit }) {
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    var inventoryId = curUserData.inventories[0]
    const payload = {
      id: inventoryId
    }
    return await inventoryService
      .getCategories(payload)
      .then((response) => {
        if (checkApiSuccess(response)) {
          console.log('getCategories', response.data.data.categories)
          commit('set', { type: 'categories', val: response.data.data.categories })
          return response.data.data.categories
        } else {
          if (response.data.error.type !== 200) {
            commit('set', { type: 'error', val: response.data.error.message })
          }
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  },
  async createFolder({ dispatch, commit }, payload) {
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    const inventoryId = curUserData.inventories[0]
    console.log('payload', inventoryId, payload.folder.id)
    var tmpPayload = {}
    if (payload.folder === '') {
      tmpPayload = {
        inventoryId: inventoryId,
        name: payload.name,
        image: payload.images[0] ? payload.images[0] : '',
        description: payload.notes
      }
    } else {
      tmpPayload = {
        inventoryId: inventoryId,
        name: payload.name,
        image: payload.images[0] ? payload.images[0] : '',
        description: payload.notes,
        parentId: payload.folder.id
      }
    }
    console.log('tmpPayload', tmpPayload)
    return inventoryService.createFolder(tmpPayload).then((response) => {
      if (checkApiSuccess(response)) {
        console.log('success')
        router.push({ name: 'Inventory' }).then(() => { })
        return response
      }
    })
  },
  async editFolder({ dispatch, commit }, payload) {
    console.log('editPayload', payload)
    return inventoryService.editFolder(payload).then((response) => {
      if (checkApiSuccess(response)) {
        console.log('success')
        router.push({ name: 'Inventory' }).then(() => { })
        return response
      }
    })
  },
  async uploadImage({ dispatch, commit }, payload) {
    console.log('imageFormdata', payload)
    return await inventoryService.uploadImage(payload).then((response) => {
      if (checkApiSuccess(response)) {
        console.log('success', response)
        // router.push({ name: 'Inventory' }).then(() => { })
        return response.data.data.filename
      }
    })
  }

}
const getters = {
  categories: (state) => {
    return state.categories
  },
  categoryById: (state) => (id) => {
    return state.categories.find((category) => category.id === id)
  },
  computers: (state) => {
    return state.categories.find((category) => category.name === 'Computers')
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
