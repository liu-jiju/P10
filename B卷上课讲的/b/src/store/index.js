import Vue from 'vue'
import Vuex from 'vuex'
import tab from './modules/tab'
import tabber from './modules/tabber'
import getters from './getters'
// 数据持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
 
  // 数据持久化
  plugins: [
    createPersistedState({
      storage: sessionStorage
    })
  ],
  modules: {
    tab,
    tabber,
  },
  getters
})
