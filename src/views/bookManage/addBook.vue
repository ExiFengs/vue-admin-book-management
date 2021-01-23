<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px" :rules="rules">
      <el-form-item label="纸质图书作者" prop="bookAuthor">
        <el-input v-model="form.bookAuthor" />
      </el-form-item>

      <el-form-item label="纸质图书书名" prop="bookName">
        <el-input v-model="form.bookName" />
      </el-form-item>

      <el-form-item
        label="纸质图书库存"
        prop="bookRepertory"
        :rules="[
          { required: true, message: '库存不能为空' },
          { type: 'number', message: '库存必须为正整数' },
        ]"
      >
        <el-input
          v-model.number="form.bookRepertory"
          onkeyup="this.value=this.value.replace(/[^\d]/g,'');"
        />
      </el-form-item>

      <el-form-item label="纸质图书 ISBN 码" prop="bookIsbn">
        <el-input v-model="form.bookIsbn" />
      </el-form-item>

      <el-form-item label="纸质图书简介" prop="bookIntro">
        <el-input v-model="form.bookIntro" type="textarea" />
      </el-form-item>

      <el-form-item label="纸质图书出版社" prop="bookPress">
        <el-input v-model="form.bookPress" />
      </el-form-item>

      <el-form-item label="纸质图书分类名" prop="categoryId">
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

      <el-form-item label="纸质图书图片上传" prop="adPicture">
        <el-upload
          name="uploadFile"
          class="avatar-uploader"
          action="http://localhost:8888/bookManagement/book/uploadBookImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.bookPicture" :src="form.bookPicture" class="avatar" />
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
  getAllCategory,
} from '@/api/book'

export default {
  data() {
    return {
      form: {
        bookAuthor: '',
        bookName: '',
        bookRepertory: null,
        bookPicture: '',
        bookIsbn: '',
        bookIntro: '',
        bookPress: '',
        categoryId: null,
      },
      categoryList: [],
      rules: {
        adPicture: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'blur',
          },
        ],
        categoryId: [
          {
            required: true,
            message: '请选择图书类别',
            trigger: 'blur',
          },
        ],

        bookAuthor: [
          {
            required: true,
            message: '作者不能为空',
            trigger: 'blur',
          },
        ],
        bookName: [
          {
            required: true,
            message: '书名不能为空',
            trigger: 'blur',
          },
        ],
        bookRepertory: [
          {
            required: true,
            message: '库存不能为空',
            trigger: 'blur',
          },
        ],
        bookIsbn: [
          {
            required: true,
            message: 'ISBN码不能为空',
            trigger: 'blur',
          },
        ],
        bookIntro: [
          {
            required: true,
            message: '图书简介不能为空',
            trigger: 'blur',
          },
        ],
        bookPress: [
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
    this.fetchData()
  },
  methods: {
    fetchData() {
      const _this = this
      getAllCategory().then(response => {
        console.log(response)
        _this.categoryList = response.categoryList
        console.log(_this.categoryList[0].categoryName + '======')
      })
    },
    handleAvatarSuccess(res, file) {
      // this.form.adPicture = URL.createObjectURL(file.raw)
      //后台图片地址http://localhost:8888/bookManagement/img/book/xxxx.jpg
      console.log(res)
      this.form.bookPicture =
        'http://localhost:8888/bookManagement' + res.fileName
      console.log(this.form.bookPicture)
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
          addReader(this.form).then(response => {
            if (response.result != 0) {
              console.log(response.book.bookName + '======')
              this.$message(
                '名称为：' + response.book.bookName + '的纸质图书添加成功'
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
