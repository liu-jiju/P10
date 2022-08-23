<template>
  <div>
    <!-- v-for遍历循环渲染界面 -->
    <p
      v-for="(item, index) in ydunread"
      :key="index"
    >
      {{ item.title }}
      <span >
        <el-button @click="weidugo(item)">还原未读</el-button>
        <el-button @click="delone(item)">删除</el-button>
      </span>
    </p>
    <el-button type="danger" @click="deloneAll()">全部删除</el-button>
  </div>
</template>

<script>
// 引入vuex的数据
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    // 注册数据
  },
  data() {
    return {
      ydunread:[],
    };
  },

  created() {
    this.ydunread=this.$store.state.tabber.ydunread
  },

  methods: {
    // 映射对应方法
    // ...mapMutations(["ediweiidu", "del","delAll"]),
    // 还原已读
    weidugo(item) {
      // this.ediweiidu(item);
      this.$store.commit('tabber/ediweiidu',item)
    },
    // 删除数据
    delone(item) {
      // this.del(item);
      this.$store.commit('tabber/del',item)

    },
    // 全部删除
    deloneAll(){
      // this.delAll();
      this.$store.commit('tabber/delAll')
      this.ydunread=[]

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