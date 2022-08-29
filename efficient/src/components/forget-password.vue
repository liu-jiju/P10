<template>
	<div>
		<!-- 忘记密码模态框 -->
		<el-dialog
			:modal-append-to-body="false"
			title="修改密码"
			:visible.sync="flag"
			width="35%"
			@closed="$emit('close')"
		>
			<el-form :model="form">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input
						class="biaodan"
						v-model="form.username"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="新密码" :label-width="formLabelWidth">
					<el-input
						class="biaodan"
						v-model="form.password"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="再次输入" :label-width="formLabelWidth">
					<el-input
						class="biaodan"
						v-model="form.passwords"
						autocomplete="off"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="flag = false"
					>确 定</el-button
				>
				<el-button @click="flag = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	props: ['dialogFormVisible'],
	data() {
		return {
			flag: false,
			formLabelWidth: '170px',
			form: {
				username: '',
				password: '',
				passwords: ''
			}
		}
	},
	watch: {
		dialogFormVisible: function (newVal) {
			this.flag = newVal
			console.log(newVal);
		}
	},

	mounted() {},

	methods: {}
}
</script>

<style lang="scss" scoped>
.biaodan {
	width: 224px;
}
</style>
