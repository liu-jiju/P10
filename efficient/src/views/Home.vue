<template>
	<div>
		<el-container>
			<el-aside width="200px">
				<!-- 收缩栏标题 -->
				<div class="left-top">
					<img style="width: 40px;" src="../assets/v2_rgsxtp.png" alt="">
					<span class="left-top-OA">OA系统管理</span>
				</div>
				<!-- 侧边栏 -->
				<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-menu-item index="4">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
    </el-menu>
			</el-aside>

			<el-container>
				<el-header>Header</el-header>
				<el-main>Main</el-main>
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
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #88abfa;
    color: #333;
    text-align: center;
    height: 100vh;
  }

  .el-main {
    background-color: #E9EEF3;
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
	.left-top{
		width: 180px;
		height: 40px;
		margin: 10px;
		background-color: red;
		display: flex;
		align-items: center;
		.left-top-OA{
			font-size: 18px;
			color: white;
			margin-left: 10px;
		}
	}
</style>
