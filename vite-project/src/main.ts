import { createApp } from 'vue'

import store from './store'
import axios from 'axios'
import './style.css'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/2219424-0-default'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  const error = e.response.statusText
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
