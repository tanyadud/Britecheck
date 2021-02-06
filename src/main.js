import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import vuetify from './plugins/vuetify'
import Toasted from 'vue-toasted'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(vuetify)
Vue.use(VueLazyload)

Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 3000
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
