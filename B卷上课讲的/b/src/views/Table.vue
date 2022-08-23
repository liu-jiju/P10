<template>
  <div>
    <div class="del">
      <el-button type="primary" icon="el-icon-delete">删除选中</el-button>&emsp;
      <el-select v-model="value" placeholder="请选择地址">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.label"
          :value="item.label"
        >
        </el-option> </el-select
      >&emsp;
      <el-input class="ipt" v-model="input" placeholder="请选择用户名" @input="searchInput"></el-input>
    </div>
    <!-- 表格 -->
    <el-table
      border
      ref="multipleTable"
      :data="tableData.slice((pagenum-1)*pagesize,pagenum*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" prop="id" label="ID">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column align="center" prop="name" label="用户名">
      </el-table-column>
      <el-table-column align="center" prop="money" label="账户余额">
        <template slot-scope="scope"> ￥{{ scope.row.money }} </template>
      </el-table-column>
      <el-table-column align="center" prop="thumb" label="头像(查看大图)">
        <template slot-scope="scope">
            <el-image :src="scope.row.thumb" :preview-src-list="Array(scope.row.thumb)"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="center" prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state === '成功'">成功</el-tag>
          <el-tag type="warning" v-else>失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="注册时间">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="bj(scope.row)">编辑</el-button>
          <el-button class="fontsize" icon="el-icon-delete" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 3, 6]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
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
export default {
  data() {
    return {
      value: "",
      input: "",
      options: [],
      tableData: [],
      tableDataCopy: [],
      total:0,
      pagenum:1,
      pagesize:3,
      dialogFormVisible: false,
      formLabelWidth:'150px',
      form:{
        name:'',
        address:'',
      },
    };
  },
  created() {
    this.gettableData();
    this.getAdressInfo();
  },
  methods: {
    //请求数据
    gettableData() {
      this.$http.get("/parameter/tableList").then((res) => {
        const data = res.data.data;
        if (data.status === 200) {
          this.tableData = data.list;
          this.tableDataCopy = data.list;
          this.total=this.tableData.length
        } else {
          this.$message.error("请稍等...");
        }
      });
    },
    //获取地址
    getAdressInfo(){
      this.$http.get('/parameter/address').then(res=>{
        // console.log(res);
        const data=res.data.data
        if (data.status === 200) {
          this.options = data.list;
        } else {
          this.$message.error("请稍等...");
        }
      })
    },  
    //搜索
    searchInput(){
      // console.log(this.tableData);
      if(this.input.trim().length && this.value !=''){
        var kong=this.tableData.filter(item=>item.address.includes(this.value));
        // console.log(this.tableDataCopy);
        this.tableData=kong.filter(item=>item.name.includes(this.input))
      }else{
        this.tableData=this.tableDataCopy;
      }
      this.total=this.tableData.length
    },
    //点击编辑
    bj(row) {
      //显示模态框
      this.dialogFormVisible = true;
      //插槽赋值
      this.form = row
    },
    handleSizeChange(val) {
      console.log(`每页: ${val} 条`);
      this.pagesize=val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      
      this.pagenum=val;
    }
  },
  watch:{
    input(){
      console.log('bbb');
      this.searchInput()
    }
  },  
};
</script>

<style lang="scss" scoped>
.del {
  margin: 10px 0;
}
.ipt {
  width: 300px;
}
.el-image {
  width: 50px;
}
.fontsize{
  color: red;
}
</style>