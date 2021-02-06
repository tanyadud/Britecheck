import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import inventory from './modules/inventory.js'
import messages from '@/store/modules/messages'
const namespaced = true

Vue.use(Vuex)
export const store = new Vuex.Store({
  namespaced,
  modules: {
    user: user,
    inventory: inventory,
    messages: messages
  },
  state: {
    loading: false
  },
  mutations: {
    set(state, { type, val }) {
      state[type] = val
    }
  },
  actions: {
    setLoading({ commit }, val) {
      commit('set', { type: 'loading', val: val })
    }
  },
  getters: {
    loading(state) {
      return state.loading
    }
  }
})
