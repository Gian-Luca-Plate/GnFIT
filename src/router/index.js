import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import SingUpView from '@/views/SingUpView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },{
    path: '/singUp',
    name: 'singUp',
    component: SingUpView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
