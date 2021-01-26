<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <span>纸质图书名：{{ this.form.bookName }}</span>
    
    </div>
    <div class="demo-image__preview">
      <el-image
        style="width: 300px; height: 400px"
        :src="this.form.bookPicture"
      >
      </el-image>
    </div>
    <div class="text item">
      <span>图书作者：{{ this.form.bookAuthor }}</span
      ><br /><br /><br />
      <span>图书ISBN码：{{ this.form.bookIsbn }}</span
      ><br /><br /><br />
      <span>图书出版社：{{ this.form.bookPress }}</span
      ><br /><br /><br />
      <span>图书分类名：{{ this.form.categoryName }}</span
      ><br /><br /><br />
      <span>图书库存：{{ this.form.bookRepertory }}</span
      ><br /><br /><br />
      <span>图书简介：{{ this.form.bookIntro }}</span
      ><br /><br /><br />
      <el-button style="float: right; position:absolute; right: 5%; bottom: 2% " type="primary">
        我要借书
        </el-button>
    </div>
  </el-card>
</template>

<script>
import {
  getBookById,
} from '@/api/dashboard'

export default {
  name: '',
  data() {
    return {
      form: {
        bookId: '',
        bookAuthor: '',
        bookName: '',
        bookRepertory: null,
        bookPicture: '',
        bookIsbn: '',
        bookIntro: '',
        bookPress: '',
        categoryId: null,
        categoryName: '',
      },
      categoryList: [],
    }
  },
  created() {
    const _this = this
    getBookById(this.$route.query.bookId).then(function (response) {
      console.log('res:', response)
      _this.form.bookId = response.book.bookId
      _this.form.bookAuthor = response.book.bookAuthor
      _this.form.bookName = response.book.bookName
      _this.form.bookRepertory = response.book.bookRepertory
      _this.form.bookPicture = response.book.bookPicture
      _this.form.bookIsbn = response.book.bookIsbn
      _this.form.bookIntro = response.book.bookIntro
      _this.form.bookPicture = response.book.bookPicture
      _this.form.bookPress = response.book.bookPress
      _this.form.categoryId = response.book.categoryId
      _this.form.categoryName = response.book.category.categoryName
      console.log(_this.form)
    })
  },
  methods: {
    fetchData() {},
  },
  components: {},
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  float: right;
  padding-right: 20%;
}
.demo-image__preview{
    float: left;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  position: relative;
  left: 20%;
  width: 50%;
}
</style>
