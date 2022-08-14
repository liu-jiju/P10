<template>
    <div class="aa">
        
  <el-container>
      <el-header>
        <span class="c">
          <el-image :src="'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'"></el-image>
        </span>
        <span class="b1 el-icon-user">用户</span>
        <span class="b el-icon-folder">教学</span>
        <span class="b el-icon-folder">题库</span>
        <span class="b el-icon-folder">运营</span>
        <span class="b el-icon-folder">营销</span>
        <span class="b el-icon-folder">商品</span>
        <span class="b el-icon-folder">财务</span>
        <span class="b el-icon-folder">统计</span>
        <span class="b el-icon-folder">系统</span>
        <span class="d">
          <img class="f" src="../assets/小小头像.png" alt="">
          <span class="e">▼</span>
        </span>
      </el-header>
  <el-container>
    <el-aside width="200px">
        <el-menu
      default-active="2"
      router
      class="el-menu-vertical-demo"
      >
      
      <el-menu-item index="/xueyuan">
        <span slot="title">学员管理</span>
      </el-menu-item>
      <el-menu-item index="/jiangshi">
        <span slot="title">讲师管理</span>
      </el-menu-item>
      <el-menu-item index="zhujiao">
        <span slot="title">助教管理</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main style="padding: 0px;">
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
    color: #333;
    text-align: center;
    line-height: 60px;
    
  }
.c{
  float: left;
  width: 80px;
  height: 50px;
  margin-top: 5px;
  margin-left: 50px;
}
.a{
    color: white;
    float: left;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
.el-menu{
    height: 100%;
}
.el-container{
    height: 100%;
}
.is-vertical{
    height: 100%;
  }
  .aa{
    height: 100%;
  }
  .b1{
    float: left;
    margin-left: 100px;
    color: white;
    height: 57px;
    line-height: 57px;
  }
.b{
  float: left;
  margin-left: 40px;
  color: white;
  line-height: 57px;
}
.b1:hover{
  border-bottom: 3px solid greenyellow;
}
.b:hover{
  border-bottom: 3px solid greenyellow;
}
.d{
  float: right;
  width: 60px;
  height: 40px;
  // background-color: red;
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.e{
  color: white;
  // background-color: yellow;
}
.f{
  border-radius: 50%;
}
</style>