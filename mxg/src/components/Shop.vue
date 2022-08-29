<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Bread />
    <!-- 查询区域 -->
    <el-input
      class="inp"
      style="width: 200px"
      placeholder="商品名称"
      v-model="serachFrom.name"
    ></el-input>
    <el-input
      class="inp"
      style="width: 200px"
      placeholder="商品编号"
      v-model="serachFrom.code"
    ></el-input>
    <el-input
      class="inp"
      style="width: 200px"
      placeholder="选择供应商"
      v-model="supplierName"
      @focus="searchDialogVisible = true"
    ></el-input>
    <el-button type="primary" @click="serachList">查询</el-button>
    <el-button type="primary" @click="addList">新增</el-button>
    <el-button @click="closes">重置</el-button>
    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%" height="350">
      <el-table-column
        fixed
        prop="id"
        label="序号"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="商品编码"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="spec"
        label="商品规格"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="retailPrice"
        label="零售价"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="purchasePrice"
        label="进货价"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="storageNum"
        label="库存数量"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="supplierName"
        label="供应商"
        width="160"
      ></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="editList(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="delList(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog
      :title="comput + '商品'"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="addForm.code"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="addForm.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="addForm.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="addForm.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="addForm.storageNum"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            placeholder="选择供应商"
            @focus="adds"
            v-model="addForm.supplierName"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLists">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择供应商"
      :visible.sync="searchDialogVisible"
      width="40%"
    >
      <el-input class="inp" style="width: 200px"></el-input>
      <el-button type="primary" @click="searchs">查询</el-button>
      <el-table
        @row-click="names"
        :data="supplieData"
        style="width: 100%"
        height="350"
      >
        <el-table-column
          fixed
          prop="id"
          label="序号"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="供应商名称"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="linkman"
          label="联系人"
          width="160"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="searchDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="searchLists">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bread from "./Bread";
import supplierAPI from "../API/supplierApi";
export default {
  components: { Bread },
  data() {
    return {
      // 总数据
      tableData: [],
      // 分页
      total: 0,
      query: "",
      pagenum: 1,
      pagesize: 10,
      addDialogVisible: false,
      // 添加定义数据
      addForm: {
        name: "",
        code: "",
        id: "",
        purchasePrice: 0,
        retailPrice: 0,
        storageNum: 0,
        supplierName: "",
      },
      // 添加表单验证
      addRules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入商品编码", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        retailPrice: [
          { required: true, message: "请输入商品规格", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      concat: 0,
      serachFrom: {
        name: "",
        code: "",
      },
      supplierName: "",
      searchDialogVisible: false,
      supplieData: [],
      num: 0,
    };
  },
  mounted() {
    this.list();
    this.searchs();
  },
  methods: {
    // 获取总数据
    list() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      supplierAPI.list().then((res) => {
        this.tableData = res.data.data.rows;
        this.total = res.data.data.total;
      });
      loading.close()
    },
    // 添加区域
    addList() {
      this.concat = 1;
      console.log(this.concat);
      this.addDialogVisible = true;
    },
    addLists() {
      if (this.concat === 1) {
        this.$refs.addForm.validate((valid) => {
          if (!valid) {
            // console.log("error submit!!");
            return false;
          }
          supplierAPI.addLists().then((res) => {
            console.log(res);
            if (res.status !== 200) {
              this.$message.error(res.data.message);
              return false;
            }
            this.$message.success(res.data.message);
            this.list();
            this.addDialogVisible = false;
          });
        });
      }
      if (this.concat === 2) {
        this.$refs.addForm.validate((valid) => {
          if (!valid) {
            // console.log("error submit!!");
            return false;
          }
          supplierAPI.editLists().then((res) => {
            // console.log(res);
            if (res.status !== 200) {
              this.$message.error(res.data.message);
              return false;
            }
            this.$message.success(res.data.message);
            this.list();
            this.addDialogVisible = false;
          });
        });
      }
    },
    addDialogClosed() {
      this.$refs.addForm.resetFields();
    },
    handleSizeChange(val) {
      this.ppagesize = val;
      this.list();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.list();
    },
    // 编辑获取对应数据
    editList() {
      this.concat = 2;
      this.addDialogVisible = true;
      supplierAPI.editList().then((res) => {
        // console.log(res.data.data);
        if (res.status !== 200) {
          this.$message.error(res.data.message);
          return false;
        }
        this.addForm = res.data.data;
      });
    },
    async delList() {
      var conf = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (conf !== "confirm") {
        return this.$message.error("您已经取消删除");
      }
      supplierAPI.delList().then((res) => {
        // console.log(res.data);
        if (res.status !== 200) {
          this.$message.error(res.data.message);
          return false;
        }
        this.$message.success(res.data.message);
        this.list();
      });
    },
    closes() {
      this.serachFrom.name = "";
      this.serachFrom.code = "";
      this.supplierName = "";
    },
    serachList() {
      this.list();
      this.serachFrom.name = "";
      this.serachFrom.code = "";
      this.supplierName = "";
    },
    searchLists() {
      this.searchDialogVisible = false;
    },
    searchs() {
      this.$http
        .post(`supplier/list/search/${this.pagenum}/${this.pagesize}`)
        .then((res) => {
          console.log(res);
          if (res.status !== 200) {
            this.$message.error(res.data.message);
            return false;
          }
          this.supplieData = res.data.data.rows;
        });
    },
    names(suppliers) {
      console.log(suppliers);
      if (this.num == 0) {
        this.searchDialogVisible = false;
        return (this.supplierName = suppliers.name);
      } else if (this.num == 1) {
        this.num = 0;
        this.searchDialogVisible = false;
        return (this.addForm.supplierName = suppliers.name);
      } else {
        this.num = 0;
        this.searchDialogVisible = false;
        return (this.editForm.supplierName = suppliers.name);
      }
    },
    edits() {
      this.num = 2;
      this.searchDialogVisible = true;
    },
    adds() {
      this.searchDialogVisible = true;
      this.num = 1;
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    comput() {
      if (this.concat === 1) {
        return "添加";
      }
      if (this.concat === 2) {
        return "修改";
      }
    },
  },
  watch: {},
  getters: {},
};
</script>

<style scoped>
.inp {
  width: 200px;
  margin-top: 10px;
  margin-right: 10px;
}
</style>