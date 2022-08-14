<template>
  <div>
    <div class="tou">学员管理</div>
    <hr/>
    <div class="xxx">
        <div class="a">
      <div class="a1">
        学员状态
        <el-select  v-model="aaa" slot="prepend" placeholder="请选择">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </div>
      <div class="a2">
        学员名称<el-input  v-model="name" placeholder="请输入学生关键字"></el-input>
      </div>
      <div class="a3">
        手机号<el-input  v-model="input" placeholder="请输入手机号"></el-input>
      </div>
      <el-button class="el-icon-search" @click="sou">搜索</el-button>
      <el-button class="el-icon-refresh" @click="cz">重置</el-button>
    </div>

    <div class="b">
        <el-button type="primary">新增学员</el-button>
        <el-button type="primary">批量导入</el-button>
        <el-button type="primary">批量导出</el-button>
        <el-button type="primary">查看报表</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData.slice((pagenum-1)*pagesize,pagenum*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="nickname" label="学生姓名">
        <template class="tem" slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.avatar"
          ></el-image>&emsp;
          <span class="span1">{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==0">启用</el-tag>
          <el-tag v-if="scope.row.status==1">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" show-overflow-tooltip>
        <template slot-scope="{ row: { created_at } }">
          {{ new Date(Number(created_at)).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template>
          <a href="">详情-</a>
          <a href="">编辑-</a>
          <a href="">禁用-</a>
          <a href="">删除-</a>
          <a href="">重置密码</a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
    </div>
    
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import data from "../assets/list.json";
export default {
  data() {
    return {
      name: "",
      input: "",
      aaa: "",
      tableData: data,
      tableData1: data,
      pagesize:10,
      pagenum:1,
      aa:[],
      bb:[],
      cc:[],
    };
  },

  mounted() {
    // console.log(data);
  },
  created(){
  },
  
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize=val
      console.log(this.pagesize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum=val
      console.log(this.pagenum);
      
    },
    //搜索
    sou() {
      
      
      if(this.aaa !=''){
        let aa=this.tableData1.filter(item=>{
          return item.status==this.aaa
        })
        this.tableData=aa
      }
      if(this.name.trim() !=''){
        let bb=this.tableData.filter(item=>{
          return item.nickname.includes(this.name)
        })
        this.tableData=bb
      } 
      if(this.input.trim() !=''){
        let cc=this.tableData.filter(item=>{
          return item.mobile.includes(this.input)
        })
        this.tableData=cc
      }
    },
    //重置
    cz() {
      this.tableData=data
      this.aaa=''
      this.name=''
      this.input=''
    },
    
    //
    handleSelectionChange(val) {
      console.log(val);
    },
  
    // ss1() {
    //   if (this.input.trim().length) {
    //     return (this.list = this.data.filter((item) =>
    //       item.mobile.includes(this.input)
    //     ));
    //   } else {
    //     return (this.list = this.data);
    //   }
    // },
  },
  
};
</script>

<style lang="scss" scoped>
.a {
  width: 100%;
  height: 50px;
  display: flex;
}
.el-input {
  width: 150px;
}
table {
  width: 100%;
}
tr {
  height: 50px;
}
a {
  text-decoration: none;
  color: rgb(61, 172, 216);
}
.el-button{
  height: 40px;
}
.b{
  display: flex;
}
.tou{
  height: 30px;
  line-height: 30px;
  font-weight: 900;
  padding-left: 20px;
}
.xia{
  width: 100%;
  height: 1px;
  background-color: black;
}
.xxx{
  padding: 20px;
}
::v-deep .cell{
  display: flex;
  align-items: center;
}

</style>