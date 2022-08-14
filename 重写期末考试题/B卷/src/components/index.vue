<template>
    <div>
        <el-container>
            <el-header>
                <span @click="shou" class="el-icon-s-unfold">后台管理系统</span>
                <span @click="zhan" class="el-icon-rank">不懂温柔</span>
            </el-header>
            <el-container>
                <el-aside :width="iscollapse?'40px':'200px'">
                    <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>图书管理</span>
        </template>
       
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>后台管理</span>
        </template>
        
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>国际化</span>
        </template>
        
      </el-submenu>
      <el-menu-item index="./biaoge">
        <i class="el-icon-document"></i>
        <span slot="title">基础表格</span>
      </el-menu-item>
      <el-menu-item index="./tab">
        <i class="el-icon-setting"></i>
        <span slot="title">tab选项卡</span>
      </el-menu-item>
    </el-menu>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            iscollapse:false,
        };
    },

    mounted() {
        
    },

    methods: {
        shou(){
            this.iscollapse=!this.iscollapse
        },
        zhan(){

        }
    },
};
</script>

<style lang="scss" scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-icon-s-unfold{
    color: white;
    
  }
  .el-icon-rank{
    color: white;
  }
  .el-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
</style>