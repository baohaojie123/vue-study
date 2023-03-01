import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import Create from './views/CreatePost.vue'
import Signup from './views/Signup.vue'
import store from './store'
import axios from 'axios'
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true } // 已经登录跳转到首页
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    }, {
      path: '/create',
      name: 'create',
      component: Create,
      meta: { requiredLogin: true }
    },
  ]
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        store.commit('logout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (to.meta.redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
export default router