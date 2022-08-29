import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 路由健全
import local from "@/assets/utils/local";
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    if (local.get('token') !== "") {
      next("/home/homes")
    }
  } else {
    if (local.get('token') == "") {
      next("/login")
    }
  }
  next()
});

// 引入全局样式
import './assets/css/index.css'

//请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
  //当进入request拦截器，表示发送了请求，我们就开启进度条
  //为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem("token")
  //必须返回config
  return config
})
//在response拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  //当进入response拦截器，表示请求已经结束，我们就结束进度条
  return config
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
