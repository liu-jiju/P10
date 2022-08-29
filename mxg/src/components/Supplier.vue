<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 面包屑 -->
    <Bread />
    <el-row :gutter="20">
      <el-col :span="5"
        ><div>
          <el-input v-model="inputOne" placeholder="供应商名称"></el-input></div
      ></el-col>
      <el-col :span="5"
        ><div><el-input v-model="inputTwo" placeholder="联系人"></el-input></div
      ></el-col>
      <el-col :span="5"
        ><div>
          <el-input v-model="inputThree" placeholder="联系电话"></el-input></div
      ></el-col>
      <el-col :span="2"
        ><div>
          <el-button type="primary" @click="inquire">查询</el-button>
        </div></el-col
      >
      <el-col :span="2"
        ><div>
          <el-button type="primary" @click="newlyFormVisible = true"
            >新增</el-button
          >
        </div></el-col
      >
      <el-col :span="2"
        ><div><el-button @click="reset">重置</el-button></div></el-col
      >
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" height="350" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60px">
      </el-table-column>
      <el-table-column prop="name" label="供应商名称"> </el-table-column>
      <el-table-column prop="linkman" label="联系人"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <el-button @click="compile(scope.row)">编辑</el-button>
          <el-button @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 新增的对话框 -->
    <el-dialog title="供应商编辑" :visible.sync="newlyFormVisible" width="35%">
      <el-form
        :model="confirmForm"
        :rules="confirmRules"
        ref="confirmForm"
        label-width="100px"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="confirmForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="confirmForm.linkman" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="练习电话">
          <el-input v-model="confirmForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="confirmForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newlyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmFormVisible">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑的对话框 -->
    <el-dialog
      title="供应商编辑"
      :visible.sync="compileFormVisible"
      width="35%"
    >
      <el-form
        :model="compileForm"
        :rules="compileRules"
        ref="confirmForm"
        label-width="100px"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="compileForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="compileForm.linkman" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="练习电话">
          <el-input v-model="compileForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="compileForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="compileFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="compileFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import supplierApi from "../API/supplierApi";
import Bread from "./Bread";
export default {
  components: { Bread },
  data() {
    return {
      // 查询的input
      inputOne: "",
      inputTwo: "",
      inputThree: "",
      // 表格数据
      tableData: [],
      // 新增的对话框
      newlyFormVisible: false,
      // 新增的表单数据
      confirmForm: {
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      // 新增的表单验证
      confirmRules: {
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
      },
      // 编辑的对话框
      compileFormVisible: false,
      // 分页
      total: 0,
      // 编辑的表单
      compileForm: {
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      // 编辑的表单验证
      compileRules: {
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 查询
    inquire() {
      supplierApi
        .inquireData(this.inputOne, this.inputTwo, this.inputThree)
        .then((k) => {
          // console.log(k)
          this.tableData = k.data.data.rows;
        });
    },
    // 新增
    confirmFormVisible() {
      supplierApi
        .confirmData(
          this.confirmForm.name,
          this.confirmForm.linkman,
          this.confirmForm.mobile,
          this.confirmForm.remark
        )
        .then((k) => {
          if (k.status == 200) {
            this.$message({
              message: "新增成功",
              type: "success",
            });
          }
        });
      this.newlyFormVisible = false;
      this.getData();
    },
    // 获取列表数据
    getData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      supplierApi.getSupplierList().then((k) => {
        this.tableData = k.data.data.rows;
        this.total = k.data.data.total;
        // console.log(k);
      });
      loading.close()
    },
    // 重置
    reset() {
      this.inputOne = this.inputTwo = this.inputThree = "";
    },
    // 编辑的按钮
    compile(data) {
      this.compileForm = data;
      this.compileFormVisible = true;
    },
    // 分页
    handleSizeChange() {
      this.getData();
    },
    handleCurrentChange() {
      this.getData();
    },
    // 删除
    del(data) {
      supplierApi.deleteData(data.id).then((k) => {
        // console.log(k.data.message)
        this.$message(k.data.message);
        this.getData();
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.el-table {
  margin-top: 15px;
}
</style>