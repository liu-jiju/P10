<!-- eslint-disable vue/multi-word-component-names -->
<!--  -->
<template>
  <div class="max">
    <Bread />
    <div class="seek">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <!-- 会员卡号 -->
          <el-input v-model="seek.cardNum" placeholder="会员卡号"></el-input>
          <!-- 会员名字 -->
          <el-input v-model="seek.name" placeholder="会员名字"></el-input>
        </el-form-item>

        <!-- 支付类型 -->
        <el-form-item>
          <el-select
            style="width: 110px"
            v-model="seek.payType"
            placeholder="支付类型"
          >
            <el-option label="现金" value="1"></el-option>
            <el-option label="微信" value="2"></el-option>
            <el-option label="支付宝" value="3"></el-option>
            <el-option label="银行卡" value="4"></el-option>
          </el-select>
        </el-form-item>

        <!-- 会员生日 -->
        <el-form-item>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="出生日期"
              v-model="seek.birthday"
              style="width: 200px"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-button type="primary" @click="inquire">查询</el-button>
        <el-button type="primary" @click="add">新增</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="tableDiv">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="cardNum" label="会员卡号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="会员姓名"> </el-table-column>
        <el-table-column prop="birthday" label="会员生日"> </el-table-column>
        <el-table-column prop="phone" label="手机号码"> </el-table-column>
        <el-table-column prop="integral" label="可用积分"> </el-table-column>
        <el-table-column prop="money" label="开卡金额"> </el-table-column>
        <el-table-column prop="payType" label="支付类型"> </el-table-column>
        <el-table-column prop="address" label="会员地址"> </el-table-column>
        <el-table-column label="操作" style="min-width: 120px">
          <template slot-scope="scope">
            <el-button size="mini" @click="compile(scope.row)">编辑</el-button>
            <el-button size="mini" @click="del(scope.row)" type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div style="margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.pagenum"
        :page-sizes="[10]"
        :page-size="paging.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="会员编辑" :visible.sync="dialogTableVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="ruleForm.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="会员生日">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="会员生日"
              v-model="ruleForm.birthday"
              style="width: 200px"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <!-- 手机号码 -->
        <el-form-item label="手机号码">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <!-- 开卡金额 -->
        <el-form-item label="开卡金额">
          <el-input v-model="ruleForm.money"></el-input>
        </el-form-item>
        <!-- 可用积分 -->
        <el-form-item label="可用积分">
          <el-input v-model="ruleForm.integral"></el-input>
        </el-form-item>
        <!-- 支付类型 -->
        <el-form-item label="支付类型" prop="payType">
          <el-select
            style="width: 110px"
            v-model="ruleForm.payType"
            placeholder="支付类型"
          >
            <el-option label="现金" value="1"></el-option>
            <el-option label="微信" value="2"></el-option>
            <el-option label="支付宝" value="3"></el-option>
            <el-option label="银行卡" value="4"></el-option>
          </el-select>
        </el-form-item>
        <!-- 会员地址 -->
        <el-form-item label="会员地址">
          <el-input type="textarea" v-model="ruleForm.address"></el-input>
        </el-form-item>

        <!-- 底部 -->
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Bread from "./Bread";
import memberAPI from "../API/memberAPI";
export default {
  components: { Bread },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "",
  data() {
    return {
      //搜索框绑定
      seek: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      // table数据
      tableData: [],
      //分页
      paging: {
        pagenum: 1,
        pagesize: 10,
      },
      //总条数
      total: 0,

      // 新增编辑
      condition: 0,
      dialogTableVisible: false,
      //数据
      ruleForm: {
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: "",
        integral: "",
        payType: "",
        address: "",
      },
      //校验
      rules: {
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "change" }],
        payType: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.tableJson();
  }, //安装
  methods: {
    //!添加模态框 == 1
    add() {
      this.condition = 1;
      this.dialogTableVisible = true;
      this.ruleForm = {};
    },
    //~添加编辑数据
    submitForm() {
      if (this.condition == 1) {
        console.log("这是添加");
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            memberAPI.confirmData(this.ruleForm).then((item) => {
              console.log(item.data);
              if (item.data.code == 2000) {
                this.$message({
                  message: "新增成功",
                  type: "success",
                });
                this.dialogTableVisible = false;
                this.condition = 0;
                this.ruleForm = {};
              }
            });
          } else {
            this.$message({
              message: "不得为空",
              type: "warning",
            });
            return false;
          }
        });
      } else if (this.condition == 2) {
        console.log("这是修改");
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            memberAPI.compileData(this.ruleForm).then((item) => {
              if (item.data.code == 2000) {
                this.$message({
                  message: "新增成功",
                  type: "success",
                });
                this.dialogTableVisible = false;
                this.condition = 0;
                this.ruleForm = {};
              }
            });
          } else {
            this.$message({
              message: "不得为空",
              type: "warning",
            });
            return false;
          }
        });
      }
    },
    // !编辑  == 2
    compile(data) {
      this.condition = 2;
      this.dialogTableVisible = true;
      this.ruleForm = data;
    },
    //模态框重置
    resetForm() {
      this.ruleForm = {};
    },
    // 获取全部数据
    async tableJson() {
      //遮罩
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      //请求数据
      // let { data: item } = await this.$http.post(
      //   `member/list/search/1/20`,
      //   this.paging
      // );
      memberAPI.getMemberList().then((item) => {
        console.log(item);
        this.total = item.data.data.total;
        this.tableData = item.data.data.rows;
        console.log(this.tableData);
      });

      loading.close();
    },
    // 分页触发
    handleSizeChange() {
      this.tableJson();
    },
    handleCurrentChange() {
      this.tableJson();
    },
    // 查询
    async inquire() {
      if (
        this.seek.cardNum ||
        this.seek.name ||
        this.seek.payType ||
        this.seek.birthday !== ""
      ) {
        memberAPI.inquireData(this.seek).then((item) => {
          this.$message({
            message: item.data.message,
            type: "success",
          });
        });

        this.tableJson();
        this.reset();
      } else {
        this.$message.error("不得为空");
      }
    },
    //重置
    reset() {
      this.seek.cardNum = null;
      this.seek.name = null;
      this.seek.payType = null;
      this.seek.birthday = null;
    },
    // 删除
    del(data) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确定后

          memberAPI.deleteData(data.id).then((item) => {
            if (item.data.code == 2000) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.tableJson();
            } else {
              this.$message({
                type: "info",
                message: "删除失败",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  }, //方法
  computed: {}, //计算
  watch: {}, //监听
  filters: {}, //过滤器
};
</script>
<style lang='scss' scoped>
.max {
  min-width: 1000px;
}
.seek {
  margin-top: 14px;
  display: flex;
  .el-input {
    width: 200px;
    margin: 0px 4px;
  }
}
.el-table {
  height: 350px;
  overflow: auto;
}
//支付方式
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
