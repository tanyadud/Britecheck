import Vue from 'vue'
import VueRouter from 'vue-router'
import userRoutes from './userRoutes'
import mainRoutes from './mainRoutes'
import a from 'axios'
import config from './../config'
const prefixEndpoint = config.apiBaseUrl
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}
Vue.use(VueRouter)

const routes = mainRoutes.concat(userRoutes)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(recorde => recorde.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next()
      return
    }
    if (to.path === '/resetpassword') {
      router.push({ name: 'ResetPassword' })
    } else if (to.path === '/forgotPassword') {
      const payload = {
        email: to.query.email,
        token: to.query.token
      }
      a.post(prefixEndpoint + 'password/recovery', payload, headers)
        .then((res) => {
          console.log('tokenConfirm', res)
          if (res.data.error.type === 200) {
            localStorage.setItem('verificationData', JSON.stringify(payload))
            next({ name: 'passwordForgot' })
          } else {
            console.log('Failed')
            next({ name: 'Login' })
          }
        })
    } else if (to.path === '/invite/accept') {
      const payload = {
        email: to.query.email,
        token: to.query.token
      }
      a.post(prefixEndpoint + 'invite/accept', payload, headers)
        .then((res) => {
          console.log('tokenConfirm', res)
          if (res.data.error.type === 200) {
            localStorage.setItem('verificationData1', JSON.stringify(payload))
            next({ name: 'SetPassword' })
          } else {
            console.log('Failed')
            next({ name: 'Login' })
          }
        })
    } else if (to.path === '/policy') {
      router.push({ name: 'Policy' })
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
