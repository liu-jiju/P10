<template>
  <div>
    <el-aside width="200px">
       <el-menu
      default-active="/students"
      class="el-menu-vertical-demo"
      background-color="white"
      text-color="black"
      active-text-color="blue"
      unique-opened
      router
      >
      
      <el-menu-item 
       v-for="route in routesList"
       :key="route.id" 
       :index="route.path">
        <i :class="route.icon"></i>
        <span slot="title">{{route.title}}</span>
      </el-menu-item>

      <!-- <el-menu-item index="/students">
        <i class="el-icon-menu"></i>
        <span slot="title">学生管理</span>
      </el-menu-item>
      <el-menu-item index="/teacher">
        <i class="el-icon-document"></i>
        <span slot="title">讲师管理</span>
      </el-menu-item>
      <el-menu-item index="/assistant">
        <i class="el-icon-setting"></i>
        <span slot="title">助教管理</span>
      </el-menu-item> -->
    </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data:[],
      routesList:[],
    };
  },

  created() {
    this.$axios.get('/parameters/query').then(res=>{
      console.log(res);
      this.data=res.data.routes
      this.routesList=this.data
    })
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
    background-color: white;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    color: black;
    text-align: left;
  }
</style>