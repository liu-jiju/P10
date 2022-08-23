<template>
  <div>
    <clickRoulink/>
    <!-- element 导航栏 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
	    router
    >
    <!-- 跳转对应路由 -->
      <el-menu-item index="/tab1">未读消息</el-menu-item>
      <el-menu-item index="/tab2">已读消息</el-menu-item>
      <el-menu-item index="/tab3">回收站</el-menu-item>
    </el-menu>
    <!-- 路由容器 -->
	<router-view></router-view>
  </div>
</template>

<script>
import clickRoulink from '../views/ClickRouLink.vue'
export default {
    components:{
        clickRoulink
    },
  data() {
    return {
      activeIndex: "/tab1",
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>