import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import SingUpView from '@/views/SingUpView'
import SingInView from "@/views/SingInView.vue";

const routes = [
  {
    path: '/',
    name: 'SingUp',
    component: SingUpView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },{
    path: '/Login',
    name: 'singUp',
    component: SingInView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
