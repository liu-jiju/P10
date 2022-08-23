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
        path:'/table',
        name:'table',
        component: () => import('../views/Table.vue')
      },
      {
        path:'/tab',
        name:'tab',
        component: () => import('../views/tab.vue'),
        children:[
          {
            path: '/tab1',
            name: 'tab1',
            component: () => import('../views/tab1.vue'),
          },
          {
            path: '/tab2',
            name: 'tab2',
            component: () => import('../views/tab2.vue'),
          },
          {
            path: '/tab3',
            name: 'tab3',
            component: () => import('../views/tab3.vue'),
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
