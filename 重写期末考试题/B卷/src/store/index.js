import Vue from 'vue'
import Vuex from 'vuex'
import { unread } from "../assets/tabs.json";
// 数据持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 未读数据 也是默认数据
    unread: unread,
    // 已读数据
    ydunread: [],
    // 回收站数据
    delunread: [],
  },
  mutations: {
    // 设为已读方法
    edityidu(state, item1) {
      // 对应数组添加对应元素
      state.ydunread.push(item1)
      // 根据id查找下标
      const idx = state.unread.findIndex(item => item.id === item1.id)
      // 原数组删除对应元素
      state.unread.splice(idx, 1)
    },
    // 全部已读
    yiduall(state) {
      state.unread.forEach(item => {
        state.ydunread.push(item)
      });
      state.unread = []
    },
    // 还原未读
    ediweiidu(state, item1) {
      state.unread.push(item1)
      const idx = state.ydunread.findIndex(item => item.id === item1.id)
      state.ydunread.splice(idx, 1)
    },
    // 删除已读
    del(state, item1) {
      state.delunread.push(item1)
      const idx = state.ydunread.findIndex(item => item.id === item1.id)
      state.ydunread.splice(idx, 1)
    },
    // 全部删除
    delAll(state) {
      state.ydunread.forEach(item => {
        state.delunread.push(item)
      });
      state.ydunread = []
    },
    // 还原未读
    edithuanyuan(state, item1) {
      state.unread.push(item1)
      const idx = state.delunread.findIndex(item => item.id === item1.id)
      state.delunread.splice(idx, 1)
    },
    // 清空回收站
    qkdelAll(state) {
      state.delunread = []
    },
  },
  // 数据持久化
  plugins: [
    createPersistedState({
      storage: sessionStorage
    })
  ]
})
