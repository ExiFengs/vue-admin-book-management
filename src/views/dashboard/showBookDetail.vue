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
      <el-button
        @click="dialogFormVisible = true"
        style="float: right; position: absolute; right: 5%; bottom: 2%"
        type="primary"
      >
        我要借书
      </el-button>

      <el-dialog title="借阅图书" :visible.sync="dialogFormVisible">
        <el-form :model="borrowBook">
          <el-form-item label="借阅数量:" :label-width="formLabelWidth">
            <el-input
              v-model.number="borrowBook.borBookNum"
              autocomplete="off"
              onkeyup="this.value=this.value.replace(/[^\d]/g,'');"
            ></el-input>
          </el-form-item>
          <el-form-item label="预期还书时间:" :label-width="formLabelWidth">
            <el-date-picker
              v-model="borrowBook.expectGetBackTime"
              type="datetime"
              placeholder="选择预期还书时间"
              align="right"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false; borrowTheBook(borrowBook);"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBookById, updateBorrowBookReadHis } from '@/api/dashboard'

export default {
  name: '',
  data() {
    return {
       pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }, {
            text: '一个月后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 4);
              picker.$emit('pick', date);
            }
          }]
          
        },
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
      borrowBook: {},
      dialogFormVisible: false,
      categoryList: [],
      formLabelWidth: '120px',
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
    computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'id']),
  },
  methods: {
    fetchData() {},
    borrowTheBook(borrowBook){
      const _this = this
      console.log('[ borrowBook ]', borrowBook)
      updateBorrowBookReadHis(this.id, this.form.bookId, borrowBook.expectGetBackTime, borrowBook.borBookNum).then(function (res){
         console.log(res)
            _this.$message(
                '你借阅书名为：' + _this.form.bookName + '的纸质图书成功!'
              )
      })
    },
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
.demo-image__preview {
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
