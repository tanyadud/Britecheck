import axios from 'axios'
import config from './../config'
const axiosApi = axios.create({
  baseURL: config.apiBaseUrl
})

export default class APIService {
  post(url, content, headers = {}) {
    var token = localStorage.getItem('token')
    console.log(token)
    return axiosApi.post(url, content, {
      headers: {
        ...headers,
        Authorization: 'bearer ' + token
      }
    })
      .then(response => {
        return response.data
      })
      .catch(e => {
        if (e.response.status === 401) {
          throw e.response
        }
        throw e.response
      })
  }
}
