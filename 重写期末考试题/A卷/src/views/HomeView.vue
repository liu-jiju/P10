
<template>
    <div>
        
    <el-container>
  <el-header>

  </el-header>
  <el-container>
    <el-aside width="200px">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      >
      
      <el-menu-item index="/xueyuan">
        <span slot="title">学员管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">讲师管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title">助教管理</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

    </div>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.el-header{
    background-color: blue;
}
</style>