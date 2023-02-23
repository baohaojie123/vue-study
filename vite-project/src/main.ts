import { createApp } from 'vue'

import store from './store'
import axios from 'axios'
import './style.css'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/2219424-0-default'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  // store.commit('setError', { status: false, message: '' })
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
