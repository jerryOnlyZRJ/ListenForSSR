import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/client/pages/DashBoard/DashBoard'
import Editor from '@/client/pages/Editor/Editor'
import Login from '@/client/pages/Login/Login'
import Register from '@/client/pages/Register/Register'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
      path: '/',
      component: Login
    }, {
      path: '/dashboard',
      component: DashBoard
    }, {
      path: '/editor',
      component: Editor
    }, {
      path: '/register',
      component: Register
    }]
  })
}