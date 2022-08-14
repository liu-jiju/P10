<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理X" name="first">
        <el-button class="el-icon-delete" type="primary">删除选中</el-button>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input class="a" v-model="input" placeholder="用户名"></el-input>
        <!-- 表格 -->
        <el-table
          :data="tableData.slice((pagenum-1)*pagesize,pagenum*pagesize)"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="id" label="ID"> </el-table-column>
          <el-table-column prop="name" label="用户名"> </el-table-column>
          <el-table-column prop="money" label="账户余额"> </el-table-column>
          <el-table-column label="头像">
            <template slot-scope="scope">
              <img :src="scope.row.thumb" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column prop="state" label="状态"> </el-table-column>
          <el-table-column prop="date" label="注册时间"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="bj(scope.row)"
                >编辑</el-button
              >
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="配置管理X" name="second">配置管理</el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 3, 6]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>

    <!-- 模态框 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form" >
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import data from "../assets/table.json";
export default {
  data() {
    return {
      activeName: "first",
      options: [
        {
          value: "广东省",
          label: "广东省",
        },
        {
          value: "湖南省",
          label: "湖南省",
        },
        {
          value: "福建省",
          label: "福建省",
        },
      ],
      value: "",
      input: "",
      tableData: data.list,
      kong: [],
      dialogFormVisible: false,
      formLabelWidth:'150px',
      form:{
        name:'',
        address:'',
      },
      pagenum:1,
      pagesize:5
    };
  },

  mounted() {
    console.log(data);
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    search() {
      //判断是否为空
      if (this.input.trim().length && this.value != "") {
        //过滤出省份数据
        this.kong = this.tableData.filter((item) =>
          item.address.includes(this.value)
        );
        //过滤好的数据在过滤人名
        console.log(this.kong);
        this.tableData = this.kong.filter((item) =>
          item.name.includes(this.input)
        );
      } else {
        return this.tableData;
      }
    },
    //点击编辑
    bj(row) {
      //显示模态框
      this.dialogFormVisible = true;
      //插槽赋值
      this.form = row
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize=val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum=val
    }
  },
  watch: {
    input() {
      this.search();
    },
    // value(){
    //   this.search()
    // }
  },
};
</script>

<style lang="scss" scoped>
.el-icon-delete {
  float: left;
}
.el-select {
  float: left;
  margin-top: -60px;
  margin-left: 10px;
}
.a {
  width: 300px;
  float: left;
  margin-top: -60px;
  margin-left: 10px;
}
table {
  width: 100%;
  tr {
    height: 30px;
  }
}
img {
  width: 80px;
  height: 80px;
}

</style>