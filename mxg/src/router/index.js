import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'homes',
        component: () => import(/* webpackChunkName: "home" */ '../components/Homes.vue'),
        meta:['首页']
      },
      {
        path: 'member',
        component: () => import(/* webpackChunkName: "home" */ '../components/member.vue'),
        meta:['会员管理']
      },
      {
        path: 'supplier',
        component: () => import(/* webpackChunkName: "home" */ '../components/Supplier.vue'),
        meta:['供应商管理']
      },
      {
        path: 'shop',
        component: () => import(/* webpackChunkName: "home" */ '../components/Shop.vue'),
        meta:['商品管理']
      },
      {
        path: 'staff',
        component: () => import(/* webpackChunkName: "home" */ '../components/Staff.vue'),
        meta:['员工管理']
      },
      {
        path: '/home',
        redirect: '/home/homes'
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: "/",
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
