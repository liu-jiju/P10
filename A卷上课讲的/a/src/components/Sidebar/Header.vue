<template>
    <div>

        <span class="c">
          <el-image :src="'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'"></el-image>
        </span>
        <span class="b1 el-icon-user">用户</span>
        <span class="b el-icon-s-opportunity">教学</span>
        <span class="b el-icon-share">题库</span>
        <span class="b el-icon-s-grid">运营</span>
        <span class="b el-icon-s-data">营销</span>
        <span class="b el-icon-s-flag">商品</span>
        <span class="b el-icon-s-comment">财务</span>
        <span class="b el-icon-menu">统计</span>
        <span class="b el-icon-s-open">系统</span>
        <span class="d">
          <img class="f" src="../../assets/小小头像.png" alt="">
          <span class="e">▼</span>
        </span>

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
.c{
  float: left;
  width: 80px;
  height: 50px;
  margin-top: 5px;
  margin-left: 50px;
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