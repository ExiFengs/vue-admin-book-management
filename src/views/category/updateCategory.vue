<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="图书分类名称" prop="categoryName">
        <el-input v-model.trim="form.categoryName" />
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
  getReaderById,
  updateReader,
} from '@/api/category'

export default {
  data() {
    return {
      form: {
        categoryId: null,
        categoryName: '',
      },
      rules: {
        categoryName: [
          { required: true, message: '图书管理员名称不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    const _this = this
    getReaderById(this.$route.query.categoryId).then(function (response) {
      _this.form.categoryId = response.category.categoryId
      _this.form.categoryName = response.category.categoryName
    })
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updateReader(this.form).then(response => {
            if (response.result != 0) {
              console.log(response.category.categoryName + '======')
              this.$message(
                '姓名为：' + response.category.categoryName + '的图书管理员更新成功'
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
