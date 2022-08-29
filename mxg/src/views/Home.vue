<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="pic">
          <img src="../assets/img/logo.png" alt="" />
        </div>
        <span @click="$router.push('/home/homes')" class="h2"
          >梦学谷管理系统</span
        >
        <el-dropdown @command="account">
          <el-button>
            {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="amend"
              ><i class="el-icon-edit"></i>修改密码</el-dropdown-item
            >
            <el-dropdown-item command="logOut"
              ><i class="el-icon-s-operation"></i>退出系统</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <!-- 利用三元运算符绑定侧边栏的宽度实现伸缩 -->
        <el-aside style="width: 180px">
          <el-menu class="el-menu-vertical-demo" router>
            <el-menu-item index="/home/homes">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/home/member">
              <i class="el-icon-user-solid"></i>
              <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="/home/supplier">
              <i class="el-icon-s-cooperation"></i>
              <span slot="title">供应商管理</span>
            </el-menu-item>
            <el-menu-item index="/home/shop">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/home/staff">
              <i class="el-icon-user"></i>
              <span slot="title">员工管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 内容模块 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      status-icon
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="onePass">
          <el-input
            type="password"
            v-model="ruleForm.onePass"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="twoPass">
          <el-input
            type="password"
            v-model="ruleForm.twoPass"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="确定密码" prop="thrPass">
          <el-input
            type="password"
            v-model="ruleForm.thrPass"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from "@/assets/utils/local";
import loginApi from "../API/loginApi";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.thrPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.twoPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      name: "",
      dialogVisible: false,
      ruleForm: {
        onePass: "",
        twoPass: "",
        thrPass: "",
      },
      rules: {
        onePass: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        twoPass: [{ validator: validatePass, trigger: "blur" }],
        thrPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    account(command) {
      if (command == "logOut") {
        local.remove("token");
        this.$router.push("/login");
        this.$message({
          message: "退出成功",
          type: "success",
        });
      } else if (command == "amend") {
        this.dialogVisible = true;
      }
    },
    confirm(k) {
      this.$refs[k].validate((valid) => {
        if (valid) {
          loginApi
            .amend(this.ruleForm.onePass, this.ruleForm.twoPass)
            .then(() => {
              this.$router.push("/login");
              this.$message({
                message: "修改成功",
                type: "success",
              });
            });
        } else {
          this.$message("修改失败");
          return false;
        }
        this.dialogVisible = true;
      });
    },
  },

  mounted() {
    loginApi.token().then((k) => {
      // console.log(k);
      this.name = k.data.data.name;
    });
  },
};
</script>

<style lang='scss'>
.home {
  width: 100%;
  height: 100%;
  & > .el-container {
    width: 100%;
    height: 100%;
    display: flex;
    .el-header {
      width: 100%;
      height: 60px;
      display: flex;
      .pic {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      & > span {
        font-size: 24px;
        font-weight: bold;
        margin-right: 69%;
      }
    }
    & > .el-container {
      width: 100%;
      flex: 1;
      // .el-aside {
      //   width: 200px ;
      // }
    }
  }
}
.el-header {
  background-color: #373d41;
  color: #fff;
  line-height: 60px;
}
.pic img{
    vertical-align: middle;
}
// .el-aside {
//   // background-color: #333744;
//   // color: #fff;
// }
.el-main {
  background-color: #e9eef3;
  color: #333;
}
body > .el-container {
  margin-bottom: 40px;
}
.h2 {
  cursor: pointer;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>