<template>
  <div class="students">
    <div class="headers">{{ this.$route.name }}</div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="学员状态">
        <el-select v-model="formInline.status" placeholder="请选择学员状态">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学员名称">
        <el-input
          v-model="formInline.name"
          placeholder="请选择学员名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="formInline.phone"
          placeholder="请选择手机号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" icon="el-icon-search">搜索</el-button>
        <el-button @click="reset" icon="el-icon-loading">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary">新增学员</el-button>
        <el-button type="primary">批量导入</el-button>
        <el-button type="primary">批量导出</el-button>
        <el-button type="primary">查看报表</el-button>
    </div><br>
    <!-- 表格 -->
    <el-table

      ref="multipleTable"
      :data="tableList"
      tooltip-effect="dark"
      style="width: 100%"
      border
      
      
    >
      <el-table-column align="center" type="selection" width="55"> </el-table-column>
      <el-table-column header-align="center" prop="nickname" label="学生名称">
        <template slot-scope="scope">
            <img :src="scope.row.avatar" >
            {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="mobile" label="手机号"> </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
            <el-tag type="error" v-if="scope.row.status==0">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间">
        <template slot-scope="{row:{created_at}}">
            {{ new Date(Number(created_at)*1000).toLocaleString()}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="操作">
        <template slot-scope="scope">
        <el-button type="text">详情-</el-button>
        <el-button type="text">编辑-</el-button>
        <el-button type="text">
            {{scope.row.status === 1 ? '禁用' : '启用'}}
        </el-button>
        <el-button type="text">删除-</el-button>
        <el-button type="text">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 5, 8, 10, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableListCopy.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        //学员状态   1 启用  0  禁用
        status: "",
        //学员名称
        name: "",
        //手机号
        phone: "",
      },
      //表格信息
    //   tableList:[],
      tableListCopy:[],
      //当前页
      pagenum:1,
      //每页条数
      pagesize:10,
      aaa:[],
    };
  },

  created() {
    // this.tableList=data;
    // this.tableListCopy=data;
    
    this.$axios.get('/parameter/query').then(res=>{
        // console.log(res);
        this.aaa=res.data.data
        // console.log(this.aaa);
        this.tableListCopy=this.aaa
    })
  },
  computed:{
    tableList: {
        get: function () {
            let tableLists = [];
            if(this.pagenum === 1){
                tableLists=this.tableListCopy.slice(0,this.pagesize);
            }else{
                tableLists=this.tableListCopy.slice((this.pagenum-1)*this.pagesize,this.pagenum*this.pagesize)
            }
            return tableLists
        },
        set:()=>{

        }
    }
  },

  methods: {
    //搜索
    onSubmit() {
        let status = this.formInline.status;
        let name =this.formInline.name;
        let phone =this.formInline.phone;
        //用switch case
        if(status||status===0 && name && phone){
            this.searchThree();
        }else if(status || (status===0 && name && !phone)){
            this.searchStatusAndName()
        }else if(status || (status===0 && !name && phone)){
            this.searchStatusAndPhone()
        }else if(!status && name && phone && status !==0){
            this.searchNameAndPhone()
        }else if(!status && !name && phone && status !==0){
            this.searchPhone()
        }else if(!status && name && !phone && status !==0){
            this.searchName()
        }else if(status || (status===0 && !name && !phone)){
            this.searchStatus()
        }


        
    },
    //只有启用
    searchStatus(){
        this.tableListCopy=this.aaa.filter(
            item=>item.status === this.formInline.status
        )
        
    },
    //只有姓名
    searchName(){
        this.tableListCopy=this.aaa.filter(
            item=>item.nickname.indexOf(this.formInline.name) > -1
        );
    },
    //只有手机号
    searchPhone(){
        this.tableListCopy=this.aaa.filter(
            item=>item.mobile.indexOf(this.formInline.phone) > -1
        );
    },
    //启用+姓名
    searchStatusAndName(){
        let result1 = this.aaa.filter(
            item=>item.status===this.formInline.status
        );
        this.tableListCopy=result1.filter(
            item=>item.nickname.indexOf(this.formInline.name) > -1
        )
    },  
    //启用+手机号
    searchStatusAndPhone(){
        let result1 = this.aaa.filter(
            item=>item.status===this.formInline.status
        );
        this.tableListCopy=result1.filter(
            item=>item.mobile.indexOf(this.formInline.phone) > -1
        )
    },  
    //姓名+手机号
    searchNameAndPhone(){
        let result1 = this.aaa.filter(
            item=>item.nickname.indexOf(this.formInline.name) > -1
        );
        console.log(result1);
        this.tableListCopy=result1.filter(
            item=>item.mobile.indexOf(this.formInline.phone) > -1
        )
    },  
    //启用+姓名+手机号
    searchThree(){
        let result1 = this.aaa.filter(
            item=>item.status===this.formInline.status
        );
        let result2 = result1.filter(
            item=>item.nickname.indexOf(this.formInline.name) > -1
        );
        this.tableListCopy=result2.filter(
            item=>item.mobile.indexOf(this.formInline.phone) > -1
        )
    },  
    //重置
    reset() {
        this.tableListCopy=this.aaa
        this.formInline={}
    },
    //分页
    handleSizeChange(val) {
    console.log(`每页 ${val} 条`);
    this.pagesize = val;
    },
    handleCurrentChange(val) {
    console.log(`当前页: ${val}`);
    this.pagenum = val;
    }
  },
};
</script>

<style lang="scss" scoped>
.students {
  .headers {
    padding: 0 0 20px 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    font-weight: 900;
    width: 100%;
  }
  img{
    vertical-align: middle;
    margin-right: 7px;
    width: 16%;
  }
}

</style>