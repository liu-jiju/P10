<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- eslint-disable vue/no-mutating-props -->
    <el-dialog
      :title="isEdit ? '编辑岗位' : '新增岗位'"
      :visible.sync="dialogFormVisible"
      :before-close="close"
      @open="openDialog"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="岗位名称" prop="technology">
          <el-input v-model="ruleForm.technology"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="说明"
            v-model="ruleForm.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          style="background: #b886f8"
          @click="submitForm('ruleForm')"
          >确 定</el-button
        >
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  //props: ['dialogFormVisible', 'isEdit', 'row'],
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        technology: '', //职位
        remarks: '' //备注
      },
      rules: {
        technology: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        remarks: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 1, max: 999, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    init(row) {
      this.dialogFormVisible = true
      console.log(row, 'row岗位')
      this.ruleForm = row
    },
    // 新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submitForm')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('close')
    },
    // 关闭弹框
    close() {
      this.resetForm('ruleForm')
    },
    // 打开弹框触发
    openDialog() {
      if (this.isEdit == true) {
        this.ruleForm.technology = this.row.technology
        this.ruleForm.remarks = this.row.remarks
      }
    }
  }
}
</script>
<style scoped lang="scss"></style>
