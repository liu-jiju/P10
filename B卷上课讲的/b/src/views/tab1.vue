<template>
  <div>
    <!-- v-for循环渲染页面 -->
    <p v-for="(item, index) in unreads" :key="index">
      {{ item.title }}
      <el-button @click="yidugo(item)">标记为已读</el-button>
    </p>
    <el-button type="success" @click="yiduAll">全部已读</el-button>
  </div>
</template>

<script>
// 引入vuex的数据

import { mapMutations, mapState } from "vuex";
export default {
  name: "P9QMNsTab1",
  computed: {
    // 注册数据

  },
  data() {
    return {
      unreads:[],
    };
  },

  created() {
    this.unreads=this.$store.state.tabber.unread
  },

  methods: {
    // 映射对应方法
    // ...mapMutations(["tabber/edityidu", "tabber/yiduall"]),
    
    // 标记为已读
    yidugo(item) {
      
      this.$store.commit('tabber/edityidu',item)
    },
    // 全部标记为已读
    yiduAll() {
      // this.yiduall();
      this.$store.commit('tabber/yiduall')
      this.unreads=[]
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid #000;
}
</style>