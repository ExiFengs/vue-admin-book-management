<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="读者姓名" prop="readerName">
        <el-input v-model.trim="form.readerName" />
      </el-form-item>

      <el-form-item label="读者账号" prop="readerAccount">
        <el-input v-model.trim="form.readerAccount" />
      </el-form-item>

      <el-form-item label="读者密码" prop="readerPassword">
        <el-input
          v-model.trim="form.readerPassword"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>

      <el-form-item label="性别" prop="readerSex">
        <el-select v-model="form.readerSex" placeholder="请选择你的性别">
          <el-option label="女" value="girl" />
          <el-option label="男" value="man" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">注册</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
        <el-button @click="goToLogin">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addReader } from '@/api/table'

export default {
  data() {
    return {
      form: {
        readerName: '',
        readerAccount: '',
        readerPassword: '',
        registrationTime: '',
      },
      rules: {
        readerSex: [
          { required: true, message: '请选择读者性别', trigger: 'blur' },
        ],
        readerName: [
          { required: true, message: '读者名称不能为空', trigger: 'blur' },
        ],
        readerAccount: [
          { required: true, message: '读者账号不能为空', trigger: 'blur' },
        ],
        readerPassword: [
          { required: true, message: '读者密码不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  created() {},
  methods: {
    goToLogin() {
      this.$router.replace('/login')
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var dayjs = require('dayjs')
          var now = dayjs()
          console.log(now)
          // this.form.registrationTime = now;
          addReader(this.form).then(response => {
            if (response.result != 0) {
              console.log(response.reader.readerName + '======')
              this.$message(
                '姓名为：' + response.reader.readerName + '的读者注册成功'
              )
              this.$router.replace('/login')
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
