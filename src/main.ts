import { createApp } from 'vue'
import router from './router/index'
import axios from 'axios'
import store from './store/index'
import App from './App.vue'

axios.defaults.baseURL = '/mk/api'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 2000)

  return config
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
