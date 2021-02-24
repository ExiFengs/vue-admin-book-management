<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="170px" :rules="rules">
      <el-form-item label="电子图书作者" prop="eBookAuthor">
        <el-input v-model.trim="form.eBookAuthor" />
      </el-form-item>

      <el-form-item label="电子图书 ISBN 码" prop="eBookIsbn">
        <el-input v-model.trim="form.eBookIsbn" />
      </el-form-item>

      <el-form-item label="电子图书简介" prop="eBookIntro">
        <el-input v-model.trim="form.eBookIntro" type="textarea" />
      </el-form-item>

      <el-form-item label="电子图书出版社" prop="eBookPress">
        <el-input v-model.trim="form.eBookPress" />
      </el-form-item>

      <el-form-item label="电子图书分类名" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择">
          <el-option
            v-for="(item, index) in categoryList"
            :key="index"
            :label="item.categoryName"
            :value="item.categoryId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="电子图书PDF文件上传" prop="eBookFile">
        <el-upload
          name="uploadEBookFile"
          class="upload-demo"
          ref="upload"
          action="http://localhost:8888/bookManagement/appleEBook/uploadEBookFile"
          :on-success="handleEBookFileSuccess"
          :before-upload="beforeEBookFileUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="电子图书图片上传" prop="eBookPicture">
        <el-upload
          name="uploadFile"
          class="avatar-uploader"
          action="http://localhost:8888/bookManagement/appleEBook/uploadBookImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.eBookPicture"
            :src="form.eBookPicture"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')"> 修改 </el-button>
        <el-button @click="resetForm('form')"> 重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getReaderById, getAllCategory, updateReader } from '@/api/appleEBook'

export default {
  data() {
    return {
      form: {
        eBookAuthor: '',
        eBookName: '',
        eBookPicture: '',
        eBookIsbn: '',
        eBookIntro: '',
        eBookPress: '',
        eBookFileUrl: '',
        categoryId: null,
      },
      fileList: [],
      categoryList: [],
      rules: {
        eBookPicture: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'blur',
          },
        ],
        /* eBookFile: [
          {
            required: true,
            message: '请上传电子图书文件',
            trigger: 'blur',
          },
        ], */
        categoryId: [
          {
            required: true,
            message: '请选择图书类别',
            trigger: 'blur',
          },
        ],

        eBookAuthor: [
          {
            required: true,
            message: '作者不能为空',
            trigger: 'blur',
          },
        ],
        eBookIsbn: [
          {
            required: true,
            message: 'ISBN码不能为空',
            trigger: 'blur',
          },
        ],
        eBookIntro: [
          {
            required: true,
            message: '图书简介不能为空',
            trigger: 'blur',
          },
        ],
        eBookPress: [
          {
            required: true,
            message: '图书出版社不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    const _this = this
    getReaderById(this.$route.query.eBookId).then(function (response) {
      console.log('%c [ response ]', 'font-size:13px; background:pink; color:#bf2c9f;', response)
      _this.form.eBookId = response.appleEBook.ebookId
      _this.form.eBookAuthor = response.appleEBook.ebookAuthor
      _this.form.eBookName = response.appleEBook.ebookName
      _this.form.eBookPicture = response.appleEBook.ebookPicture
      _this.form.eBookIsbn = response.appleEBook.ebookIsbn
      _this.form.eBookIntro = response.appleEBook.ebookIntro
      _this.form.eBookPress = response.appleEBook.ebookPress
      _this.form.ebookFileUrl = response.appleEBook.ebookFileUrl
      _this.form.categoryId = response.appleEBook.categoryId
      _this.form.readerId = response.appleEBook.readerId
    })
    this.fetchData()
  },
  methods: {
    beforeEBookFileUpload(file) {
      const isPDF = file.type === 'application/pdf'
      const isLt50M = file.size / 1024 / 1024 < 50

      if (!isPDF) {
        this.$message.error('上传图片只能是 PDF 格式!')
      }
      if (!isLt50M) {
        this.$message.error('上传图片大小不能超过 50MB!')
      }
      return isPDF && isLt50M
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleEBookFileSuccess(res, file) {
      console.log(res)
      this.form.eBookFileUrl =
        'http://localhost:8888/bookManagement' + res.fileName
      console.log(this.form.eBookFileUrl)
      this.fileList.name = res.fileRealName
      this.fileList.url = this.form.eBookFileUrl
      this.form.eBookName = res.eBookRealFileName
      console.log('++++++' + this.form.eBookName)
      console.log('~~~~~' + this.form.eBookFileUrl)
    },
    fetchData() {
      const _this = this
      getAllCategory().then(response =>{
        console.log(response)
        _this.categoryList = response.categoryList
        console.log(_this.categoryList[0].categoryName + '======')
    })
    },
    handleAvatarSuccess(res) {
      // this.form.adPicture = URL.createObjectURL(file.raw)
      //后台图片地址http://localhost:8888/ebookManagement/img/ebook/xxxx.jpg
      console.log(res)
      this.form.eBookPicture =
        'http://localhost:8888/bookManagement' + res.fileName
      console.log(this.form.eBookPicture)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log('这是添加时的表单：' + this.form.eBookAuthor)
          console.log('这是添加时的表单：' + this.form.eBookName)
          console.log('这是添加时的表单：' + this.form.eBookPicture)
          console.log('这是添加时的表单：' + this.form.eBookIsbn)
          console.log('这是添加时的表单：' + this.form.eBookIntro)
          console.log('这是添加时的表单：' + this.form.eBookPress)
          console.log('这是添加时的表单：' + this.form.eBookFileUrl)
          updateReader(this.form).then(response => {
            if (response.result != 0) {
              console.log(response + '======')
              this.$message(
                '名称为：' + this.form.eBookName + '的电子图书修改成功'
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
