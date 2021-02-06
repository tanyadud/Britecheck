import userService from '@/services/user'
import { checkApiSuccess } from '../../utils'
import router from '../../router'
import axios from 'axios'
import moment from 'moment'

const namespaced = true

const state = {
  user: {},
  status: '',
  error: '',
  invitedUsers: [
  ]
}

const mutations = {
  set(state, { type, val }) {
    state[type] = val
  },
  inviteUser(state, payload) {
    var temp = {
      name: payload.firstName + ' ' + payload.lastName,
      email: payload.email,
      role: payload.role
    }
    state.invitedUsers.push(temp)
  }
}
const actions = {
  async login({ dispatch, commit }, payload) {
    return await userService
      .login(payload)
      .then((response) => {
        if (checkApiSuccess(response)) {
          var token = response.data.data.token
          localStorage.setItem('token', token)
          localStorage.setItem('curUserData', JSON.stringify(response.data.data))
          commit('set', { type: 'user', val: response.data.data })
          axios.defaults.headers.common.Authorization = token
          router.push({ name: 'Inventory' }).then(() => { })
        } else {
          if (response.data.error.type !== 200) {
            commit('set', { type: 'error', val: response.data.error.message })
          }
        }
        return response
      })
      .catch((err) => {
        dispatch('setLoading', false)
        localStorage.removeItem('token')
        console.log(err)
      })
  },
  async register({ dispatch, commit }, payload) {
    return await userService
      .register(payload)
      .then((response) => {
        if (checkApiSuccess(response)) {
          dispatch('setLoading', true)
          var token = response.data.data.token
          localStorage.setItem('token', token)
          localStorage.setItem('curUserData', JSON.stringify(response.data.data))
          commit('set', { type: 'user', val: response.data.data })
          axios.defaults.headers.common.Authorization = token
          router.push({ name: 'Inventory' }).then(() => { })
        } else {
        }
        dispatch('setLoading', false)
        return response
      })
      .catch((err) => {
        dispatch('setLoading', false)
        localStorage.removeItem('token')
        console.log(err)
      })
  },
  getInvitedUsers({ dispatch, commit }) {
    userService
      .getInvitedUsers()
      .then((response) => {
        if (checkApiSuccess(response)) {
          dispatch('setLoading', true)
          dispatch('resToPayload', response)
        }
        dispatch('setLoading', false)
      })
      .catch((err) => {
        dispatch('setLoading', false)
        console.log(err)
      })
  },
  update({ dispatch, commit }, payload) {
    userService
      .update(payload)
      .then((response) => {
        if (checkApiSuccess(response)) {
          dispatch('setLoading', true)
          localStorage.setItem('curUserData', JSON.stringify(response.data.data))
          commit('set', { type: 'user', val: response.data.data })
          router.push({ name: 'Inventory' }).then(() => { })
        } else {
        }
        dispatch('setLoading', false)
      })
      .catch((err) => {
        dispatch('setLoading', false)
        console.log(err)
      })
  },
  resToPayload({ commit }, response) {
    const payload = []
    response.data.data.forEach(doc => {
      const tmp = {
        id: doc.id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        role: doc.role,
        dateAdded: doc.created == null ? '-' : moment(doc.created).format('MM/DD/YYYY'),
        lastActive: doc.lastVisit == null ? '-' : moment(doc.lastvisit).format('MM/DD/YYYY'),
        inviteStatus: doc.inviteStatus
      }
      payload.push(tmp)
    })
    commit('set', { type: 'invitedUsers', val: payload })
  },
  async inviteUser({ dispatch, commit }, payload) {
    return await userService.inviteUser(payload).then((response) => {
      if (checkApiSuccess(response)) {
        dispatch('setLoading', true)
        dispatch('resToPayload', response)
        return response
      }
    })
  },
  // updating existing friend
  updateUser({ dispatch, commit }, payload) {
    userService.editInvitedUser(payload).then((response) => {
      if (checkApiSuccess(response)) {
        dispatch('setLoading', true)
        dispatch('resToPayload', response)
      }
    })
  },
  delInvitedUser({ dispatch, commit }, id) {
    userService.delInvitedUser(id).then((response) => {
      if (checkApiSuccess(response)) {
        dispatch('setLoading', true)
        dispatch('resToPayload', response)
      }
    })
  },
  logout({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      dispatch('setLoading', false)
      localStorage.removeItem('token')
      localStorage.removeItem('curUserData')
      delete axios.defaults.headers.common.Authorization
      resolve()
    })
  },
  async resetPwdReq({ dispatch, commit }, payload) {
    return await userService.resetPwdReq(payload.email).then((response) => {
      if (checkApiSuccess(response)) {
        return response
      }
    })
  },
  async tokenConfirm({ dispatch, commit }, payload) {
    return await userService.tokenConfirm(payload).then((response) => {
      if (checkApiSuccess(response)) {
        return response
      }
    })
  },
  async resetPassword({ dispatch, commit }, payload) {
    return await userService.resetPassword(payload).then((response) => {
      if (checkApiSuccess(response)) {
        return response
      }
    })
  },
  removeErrors({ dispatch, commit }) {
    commit('set', { type: 'error', val: '' })
  }
}

const getters = {
  user(state) {
    return state.user
  },
  invitedUsers: state => {
    return state.invitedUsers
  },
  error(state) {
    return state.error
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
