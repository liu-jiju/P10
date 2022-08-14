import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: ()=> import('../components/index.vue'),
    children:[
      {
        path: '/biaoge',
        name: 'biaoge',
        component: () => import('../components/biaoge.vue')
      },
      {
        path: '/tab',
        name: 'tab',
        component: () => import('../components/tab.vue'),
        children:[
          {
            path: '/tab1',
            name: 'tab1',
            component: () => import('../components/tab1.vue'),
          },
          {
            path: '/tab2',
            name: 'tab2',
            component: () => import('../components/tab2.vue'),
          },
          {
            path: '/tab3',
            name: 'tab3',
            component: () => import('../components/tab3.vue'),
          },
        ]
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
