import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/Home.vue')
	},
]

const router = new VueRouter({
	routes
})

export default router
