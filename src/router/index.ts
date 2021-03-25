import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ColumnDetail from '../views/ColumnDetail.vue'
import Create from '../views/CreatePost.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/column/:id',
      name: 'Column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    }
  ]
})
export default router
