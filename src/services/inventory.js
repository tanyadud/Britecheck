import a from 'axios'
import config from './../config'
// const token = config.token
const token = localStorage.getItem('token')
console.log('token', token)
a.defaults.headers.common = { Authorization: `Bearer ${token}` }
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const prefixEndpoint = config.apiBaseUrl

export default {
  getToken() {
    const token = localStorage.getItem('token')
    console.log('token', token)
    a.defaults.headers.common = { Authorization: `Bearer ${token}` }
  },
  createItem(payload) {
    return a.post(prefixEndpoint + 'addItem', payload, headers)
  },
  createFolder(payload) {
    return a.post(prefixEndpoint + 'category/add', payload, headers)
  },
  editFolder(payload) {
    return a.post(prefixEndpoint + 'category/update', payload, headers)
  },
  getInventory(payload) {
    this.getToken()
    return a.post(prefixEndpoint + 'v1/user', headers)
  },
  getCategories(payload) {
    this.getToken()
    return a.post(prefixEndpoint + 'inventory', payload, headers)
  },
  uploadImage(payload) {
    const headers1 = {
      'Content-Type': 'multipart/form-data'
    }
    return a.post(prefixEndpoint + 'image/upload', payload, headers1)
  }

}
