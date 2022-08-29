<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login">
    <div class="loginForm">
      <h2>梦学谷管理系统</h2>
      <el-form
        :model="list"
        :rules="rules"
        ref="list"
        label-width="100px"
        class="demo-listForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="list.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="list.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginButton('list')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import local from "@/assets/utils/local";
import loginApi from "../API/loginApi";
export default {
  data() {
    return {
      list: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    loginButton(k) {
      this.$refs[k].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          var user = this.list;
          loginApi.login(this.list.username, this.list.password).then((k) => {
            // console.log(k)
            if (k.status == 200) {
              local.set("token", k.data.data.token);
              this.$message({
                message: "登录成功",
                type: "success",
              });
              this.$router.push("/home");
            } else {
              this.$message({
                message: "登录失败",
                type: "warning",
              });
            }
          });
        } else {
          this.$message({
            message: "请输入账号和密码",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style lang='scss'>
.login {
  width: 100%;
  height: 100%;
  background: url(../assets/img/夕阳.jpeg);
  background-size: 100% 100%;
  .loginForm {
    width: 350px;
    height: 160px auto;
    background-color: #dcdfe6;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h2 {
      padding: 10px 0;
      margin-left: 100px;
    }
    .demo-listForm {
      padding: 20px 55px 20px 0;
    }
  }
}
</style>