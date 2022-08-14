import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../components/index.vue'),
    children:[
      {
        path: '/xueyuan',
        name: 'xueyuan',
        component: () => import('../components/xueyuan.vue')
      },
      {
        path: '/jiangshi',
        name: 'jiangshi',
        component: () => import('../components/jiangshi.vue')
      },
      {
        path: '/zhujiao',
        name: 'zhujiao',
        component: () => import('../components/zhujiao.vue')
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
