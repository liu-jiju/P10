<template>
  <div>
    <el-container>
        <el-header>
            <Header/>
        </el-header>
      <el-container>
        <Nav/>
        <el-main>
            <Main/>
        </el-main>
        
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from './Nav.vue'
import Main from './Main.vue'
import Header from './Header.vue'
export default {
    components:{
        Nav,Main,Header
    }
}
</script>

<style lang="scss" scoped>

  .el-container{
    height: 100%;
  }
  

.el-header {
    background-color: blue;
    color: #333;
    

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
 
</style>