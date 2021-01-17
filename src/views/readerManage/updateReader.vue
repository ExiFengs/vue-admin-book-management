<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">

      <el-form-item label="读者姓名" prop="readerName">
        <el-input v-model="form.readerName" />
      </el-form-item>

      <el-form-item label="读者账号" prop="readerAccount">
        <el-input v-model="form.readerAccount" />
      </el-form-item>

      <el-form-item label="读者密码" prop="readerPassword">
          <el-input placeholder="请输入密码" v-model="form.readerPassword" show-password></el-input>
      </el-form-item>
      
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.readerSex" placeholder="请选择你的性别">
          <el-option label="女" value="girl" />
          <el-option label="男" value="man" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">修改</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { addReader, getList, getListPage, getNowFormatDate, getReaderById, updateReader } from "@/api/table";

export default {
  data() {
    return {
      form: {
        readerId: '',
        readerName: '',
        readerAccount: '',
        readerPassword: '',
        readerSex: '',
        registrationTime: ''
      },
      rules: {
        readerName: [
            { required: true, message: '读者名称不能为空', trigger: 'blur' }
        ],
        readerAccount:[
            { required: true, message: '读者账号不能为空', trigger: 'blur' }
        ],
        readerPassword: [
            { required: true, message: '读者密码不能为空', trigger: 'blur' }
        ]
    }
    }
  },
  created() {
      const _this = this
      getReaderById(this.$route.query.readerId).then(function(response){
                _this.form.readerId = response.reader.readerId;
                _this.form.readerName = response.reader.readerName;
                _this.form.readerAccount = response.reader.readerAccount;
                _this.form.readerPassword = response.reader.readerPassword;
                _this.form.readerSex = response.reader.readerSex;
            })
  },
  methods: {
    onSubmit(form) {
        this.$refs[form].validate((valid) => {
            if(valid){
                updateReader(this.form).then(response => {
                    if(response.result != 0){
                        console.log(response.reader.readerName + '======');
                        this.$message('姓名为：' + response.reader.readerName+'的读者更新成功');
                    }else{
                        this.$message('添加失败');
                    }
                })
            }
        })
    },
    resetForm(form) {
      this.$nextTick(()=>{this.$refs.form.resetFields();})  
      this.$message({
        message: '重置成功!',
        type: 'warning'
      })
    }
  }
}

</script>

<style scoped>
.line{
  text-align: center;
}
</style>

