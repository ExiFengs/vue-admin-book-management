<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="图书管理员姓名" prop="readerName">
        <el-input v-model="form.readerName" />
      </el-form-item>

      <el-form-item label="图书管理员账号" prop="readerAccount">
        <el-input v-model="form.readerAccount" />
      </el-form-item>

      <el-form-item label="图书管理员密码" prop="readerPassword">
        <el-input
          v-model="form.readerPassword"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">修改</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addReader,
  getList,
  getListPage,
  getNowFormatDate,
  getReaderById,
  updateReader,
} from '@/api/bookManager'

export default {
  data() {
    return {
      form: {
        bookManagerId: '',
        readerName: '',
        readerAccount: '',
        readerPassword: '',
      },
      rules: {
        readerName: [
          { required: true, message: '图书管理员名称不能为空', trigger: 'blur' },
        ],
        readerAccount: [
          { required: true, message: '图书管理员账号不能为空', trigger: 'blur' },
        ],
        readerPassword: [
          { required: true, message: '图书管理员密码不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    const _this = this
    getReaderById(this.$route.query.bookManagerId).then(function (response) {
      _this.form.bookManagerId = response.bookManager.bookManagerId
      _this.form.readerName = response.bookManager.readerName
      _this.form.readerAccount = response.bookManager.readerAccount
      _this.form.readerPassword = response.bookManager.readerPassword
    })
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updateReader(this.form).then(response => {
            if (response.result != 0) {
              console.log(response.bookManager.readerName + '======')
              this.$message(
                '姓名为：' + response.bookManager.readerName + '的读者更新成功'
              )
            } else {
              this.$message('添加失败')
            }
          })
        }
      })
    },
    resetForm(form) {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
      this.$message({
        message: '重置成功!',
        type: 'warning',
      })
    },
  },
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
