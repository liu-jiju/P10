<template>
	<div class="login">
		<div class="zhong">
			<div class="biaoti" style="margin-top: 29px">OA系统登录</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
				<el-form-item label="" prop="username">
					<el-input v-model="ruleForm.username" style="margin-top: 34px;" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
				</el-form-item>
				<el-form-item label="" prop="password">
					<el-input v-model="ruleForm.password" style="margin-top: 17px;" placeholder="请输入密码" prefix-icon="el-icon-s-cooperation"></el-input>
				</el-form-item>
			</el-form>
			<!-- <div class="ipt" style="text-align: center">
				<el-input
					v-model="ruleForm.username"
					style="margin: 34px 0px"
					placeholder="请输入用户名"
					prefix-icon="el-icon-user-solid"
				>
				</el-input>
			</div>
			<div class="ipt" style="text-align: center">
				<el-input placeholder="请输入密码" prefix-icon="el-icon-s-cooperation">
				</el-input>
			</div> -->
			<div class="pwd" @click="flag=true">忘记密码？</div>
			<div class="yan">
				<el-input placeholder="验证码"> </el-input>
				<el-button>验证码图片</el-button>
			</div>
			<div style="text-align: center">
				<el-button class="btn" type="primary" @click="login">登录</el-button>
			</div>
		</div>

		<div class="footer">
			<div style="text-align: center;">
				<!-- ©2022美团版权所有京ICP证070791号京公网安备11010502025545号 -->
			</div>
		</div>
		<ForgetPassword :dialogFormVisible='flag' @close="flag=false"/>
	</div>
</template>

<script>
import ForgetPassword from '../components/forget-password.vue'
import axios from 'axios'
export default {
	components:{
		ForgetPassword,
	},
	data() {
		return {
			flag:false,
			ruleForm: {
				username: '',
				password:'',
			},
			rules:{
				username:[
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				password:[
					{ required: true, message: '请输入密码', trigger: 'blur' },
				],
			},
		}
	},

	mounted() {

	},

	methods: {
		//登录
		login(){
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
	},
	created(){
		axios.post('/efficient/user/login').then(res=>{
			console.log(res);
		})
	}
}
</script>

<style lang="scss" scoped>
.login {
	background-image: url(../assets/login.png);
	width: 100%;
	height: 100%;
	background-position: center;
	background-size: cover;
	position: fixed;
	.zhong {
		position: absolute;
		width: 495px;
		height: 463px;
		background-color: white;
		border-radius: 34px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		.biaoti {
			font-family: 方正兰亭黑-标准;
			font-size: 28px;
			text-align: center;
		}
		.el-input {
			width: 389px;
		}
		.yan {
			width: 389px;
			height: 46px;
			margin: auto;
			margin-top: 38px;
			display: flex;
			justify-content: space-between;
			.el-input {
				width: 248px;
				height: 46px;
			}
			::v-deep .el-button--default {
				color: #cecece;
				background-color: white;
				border: 1px solid #cecece;
				width: 119px;
				height: 46px;
				border-radius: 16px;
			}
		}
		.pwd {
			color: #f4c438;
			cursor: pointer;
			float: right;
			margin-right: 53px;
			margin-top: -20px;
			font-size: 16px;
		}
		.btn {
			width: 332px;
			height: 52px;
			color: white;
			font-size: 20px;
			margin-top: 47px;
			border-radius: 10px;
		}
	}
}
::v-deep .el-input__inner {
	border-radius: 16px;
	height: 46px;
}
.footer {
	width: 100%;
	height: 41px;
	color: #9a9a9a;
	font-size: 14px;
	position: absolute;
	bottom: 30px;
}

</style>
