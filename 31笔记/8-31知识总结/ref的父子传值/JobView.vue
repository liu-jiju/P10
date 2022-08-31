<template>
  <div>
    <!-- 岗位管理 -->
    <div class="post">
      <p>
        <span>岗位名称</span>
        <el-input
          v-model="user"
          placeholder="请输入姓名"
          class="inp"
        ></el-input>
        <el-button icon="el-icon-search">查询</el-button>
        <el-button icon="el-icon-refresh-left">重置</el-button>
        <el-button icon="el-icon-circle-plus-outline" @click="added" class="btn"
          >新增岗位</el-button
        >
      </p>
      <!-- 表格数据 -->
      <div class="table">
        <template>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="id" align="center" width="100">
            </el-table-column>
            <el-table-column prop="technology" label="岗位名称" align="center">
            </el-table-column>
            <el-table-column prop="remarks" label="备注" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  style="color: #fff; background-color: #7aabf6"
                  icon="el-icon-edit"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)"
                  style="color: #fff; background-color: #f56c6c"
                  icon="el-icon-delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="paging">
          <!-- 分页  -->
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </div>

      <!-- <Dialog
        :dialogFormVisible="dialogFormVisible"
        @close="close"
        :row="row"
        :isEdit="isEdit"
      ></Dialog> -->
      <Dialog v-if="dialogFormVisible" ref="dialogForm" @close="close"></Dialog>
    </div>
  </div>
</template>

<script>
import Dialog from './Dialog.vue'
// import Dialog from '@/views/workflow/approvaltype/Dialog.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: '',
  components: { Dialog },
  data() {
    return {
      user: '', //用户
      isEdit: false, //判断是否编辑状态
      tableData: [
        {
          technology: '技术岗',
          remarks: '市技术专家称号' //备注
        },
        {
          technology: '销售岗',
          remarks: '销售冠军' //备注
        }
      ],
      dialogFormVisible: false, //弹框
      row: {},
      currentPage: 1 //分页第一页
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 编辑
    handleEdit(index, row) {
      // console.log(index, row)
      // this.isEdit = true
      // this.row = row
      this.dialogFormVisible = true
      this.$nextTick(() => {
        console.log(this.$refs.dialogForm, 'this.$refs.dialogForm')
        this.$refs.dialogForm.init(row)
      })
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row)
    },
    // 新增岗位
    added() {
      this.isEdit = false
      this.dialogFormVisible = true
    },
    // 关闭弹框
    close() {
      console.log('关闭弹框')
      this.dialogFormVisible = false
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style scoped lang="scss">
.paging {
  float: right;
  margin: 20px 0 0 0;
}
.post {
  padding: 20px;
  .inp {
    width: 240px;
    margin: 0 10px;
  }
  .btn {
    background-color: #c2c2fb;
    color: #fff;
  }
  .table {
    margin-top: 50px;
  }
}
</style>
