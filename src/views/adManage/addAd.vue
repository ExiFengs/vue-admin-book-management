<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="广告栏名称" prop="readerName">
        <el-input v-model="form.adName" />
      </el-form-item>

      <el-form-item label="广告栏详情" prop="readerAccount">
        <el-input v-model="form.adDetails" />
      </el-form-item>

      <el-form-item label="广告栏图片上传" prop="adPicture">
        <el-upload
          name="uploadFile"
          class="avatar-uploader"
          action="http://localhost:8888/bookManagement/adManagement/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.adPicture"
           :src="form.adPicture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')"> 添加 </el-button>
        <el-button @click="resetForm('form')"> 重置 </el-button>
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
} from '@/api/adManagement'

export default {
  data () {
    return {
      form: {
        adId: null,
        adName: '',
        adDetails: '',
        adPicture: '',
      },
      rules: {
        adName: [
          {
            required: true,
            message: '广告栏名称不能为空',
            trigger: 'blur',
          },
        ],
        adDetails: [
          {
            required: true,
            message: '广告栏详情不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created () { },
  methods: {
    handleAvatarSuccess (res, file) {
      this.form.adPicture = URL.createObjectURL(file.raw)
      console.log(res)
      console.log(file)
      console.log('====' + res.fileName)
      console.log(this.form.adPicture)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          addReader(this.form).then(response => {
            if (response.result != 0) {
              console.log(response.ad.adName + '======')
              this.$message(
                '名称为：' + response.ad.adName + '的广告栏添加成功'
              )
            } else {
              this.$message('添加失败')
            }
          })
        }
      })
    },
    resetForm (form) {
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

<style>
.line {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
