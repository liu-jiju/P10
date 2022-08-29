<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 面包蟹 -->
    <Bread />
    <!-- 搜索内容 -->
    <div class="seave">
      <el-input v-model="inp1" placeholder="账号" class="inp"></el-input>
      <el-input v-model="inp2" placeholder="姓名" class="inp"></el-input>
      <el-button type="primary" size="medium" @click="tableDatas"
        >查询</el-button
      >
      <el-button type="primary" size="medium" @click="dialogFormVisible = true"
        >新增</el-button
      >
      <el-button size="medium" @click="addQz">重置</el-button>
    </div>
    <!-- 信息 -->
    <el-table :data="tableData" height="350" border style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="salary" label="薪酬"> </el-table-column>
      <el-table-column prop="entryDate" label="入职时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="remove(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="user" :rules="rules" ref="ruleForm">
        <el-form-item label="账号" :label-width="'80px'" prop="username">
          <el-input autocomplete="off" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="'80px'" prop="name">
          <el-input autocomplete="off" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="'80px'" prop="age">
          <el-input v-model="user.age"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="'80px'" prop="mobile">
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
        <el-form-item label="薪酬" :label-width="'80px'" prop="salary">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" :label-width="'80px'" prop="entryDate">
          <el-date-picker
            v-model="user.entryDate"
            type="date"
            placeholder="请选择入职时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑角色" :visible.sync="flag">
      <el-form :model="user1" :rules="rules" ref="ruleForms">
        <el-form-item label="账号" :label-width="'80px'" prop="username">
          <el-input autocomplete="off" v-model="user1.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="'80px'" prop="name">
          <el-input autocomplete="off" v-model="user1.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="'80px'" prop="age">
          <el-input v-model="user1.age"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="'80px'" prop="mobile">
          <el-input v-model="user1.mobile"></el-input>
        </el-form-item>
        <el-form-item label="薪酬" :label-width="'80px'" prop="salary">
          <el-input v-model="user1.salary"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" :label-width="'80px'" prop="entryDate">
          <el-date-picker
            v-model="user1.entryDate"
            type="date"
            placeholder="请选择入职时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flag = false">取 消</el-button>
        <el-button type="primary" @click="doEdit('ruleForms')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 50]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals"
    >
    </el-pagination>
  </div>
</template>

<script>
import Api from "../API/supplierApi";
import Bread from "./Bread";
export default {
  components: { Bread },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "",
  data() {
    return {
      tableData: [],
      inp1: "",
      inp2: "",
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 3,
      },
      totals: 0,
      // 添加
      dialogFormVisible: false,
      user: {
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      // 修改
      flag: false,
      user1: {
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      rules: {
        username: [{ required: true, message: "账号", trigger: "blur" }],
        name: [{ required: true, message: "姓名", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.tableDatas();
  },
  methods: {
    // 获取数据 staff/list/search/1/10
    tableDatas() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      // this.$http
      //   .post("staff/list/search/1/10", { params: this.queryInfo })
      Api.tableDatas().then((res) => {
        this.tableData = res.data.data.rows;
        this.totals = res.data.data.total;
        console.log(res);
      });
      loading.close()
    },
    // 重置
    addQz() {
      (this.inp1 = ""), (this.inp2 = "");
    },
    // 新增
    addRoles(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Api.addRoles(this.user)
            // this.$http.post("staff", this.user)
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                this.$message({
                  message: "新增成功,初始密码为：123456",
                  type: "warning",
                });
              }
              this.tableDatas();
            });
          this.dialogFormVisible = false;
        } else {
          return false;
        }
        // 置空
        this.user = {
          username: "",
          name: "",
          age: "",
          mobile: "",
          salary: "",
          entryDate: "",
        };
      });
    },
    //编辑 staff/10
    edit(item) {
      this.user1 = {
        username: item.username,
        name: item.name,
        age: item.age,
        mobile: item.mobile,
        salary: item.salary,
        entryDate: item.entryDate,
      };
      this.flag = true;
    },
    // 执行编辑操作
    doEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Api.doEdit(this.user1)
            // this.$http.put("staff/10", this.user1)
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                });
              }
              this.tableDatas();
            });
          this.flag = false;
        } else {
          return false;
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.queryInfo.pageSize = val;
      this.tableDatas();
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
      this.tableDatas();
    },
    // 删除 staff/10
    remove() {
      this.$confirm("确定删除这条数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Api.remove()
            // this.$http.delete("staff/10")
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
              }
              this.tableDatas();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {},
  watch: {},
};
</script>

<style scoped>
.span {
  border-left: 4px solid rgb(27, 194, 50);
  padding-left: 10px;
}
.inp {
  width: 170px;
  margin-right: 10px;
}
.seave {
  margin: 15px 0 15px 0;
}
</style>
