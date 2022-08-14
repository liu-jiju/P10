<template>
  <div>
    <!-- v-for循环渲染界面 -->
    <p v-for="(item, index) in delunread" :key="index">
      {{ item.title }}
      <span>
        <el-button @click="huanyuan(item)">还原</el-button>
      </span>
    </p>
    <el-button type="danger" @click="qkdel()">清空回收站</el-button>
  </div>
</template>
<script>
// 引入vuex的数据
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    // 注册数据
    ...mapState(["delunread"]),
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    // 映射对应方法
    ...mapMutations(["edithuanyuan","qkdelAll"]),
    // 还原已读
    huanyuan(item) {
      this.edithuanyuan(item);
    },
    // 清空回收站
    qkdel(){
       this.qkdelAll();
    }
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