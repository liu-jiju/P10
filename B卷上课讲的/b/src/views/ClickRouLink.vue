<template>
  <div class="clickRoulink">
    <div>
      <el-tag closable @click="tables">表格</el-tag>&emsp;
      <el-tag closable >tab选项卡</el-tag>
    </div>
    <div>
      <el-dropdown>
        <el-button type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>关闭所有</el-dropdown-item>
          <el-dropdown-item>关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},

  methods: {
    tables(){
      this.$router.push('/table')
    }
  },
};
</script>

<style lang="scss" scoped>
.clickRoulink{
    display: flex;
    justify-content: space-between;
}
</style>