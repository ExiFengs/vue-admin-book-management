<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <span>电子图书名：{{ this.form.eBookName }}</span>
    </div>
    <div class="demo-image__preview">
      <el-image
        style="width: 300px; height: 400px"
        :src="this.form.eBookPicture"
      >
      </el-image>
    </div>
    <div class="text item">
      <span>图书作者：{{ this.form.eBookAuthor }}</span
      ><br /><br /><br />
      <span>图书ISBN码：{{ this.form.eBookIsbn }}</span
      ><br /><br /><br />
      <span>图书出版社：{{ this.form.eBookPress }}</span
      ><br /><br /><br />
      <span>图书分类名：{{ this.form.categoryName }}</span
      ><br /><br /><br />
      <span>图书简介：{{ this.form.eBookIntro }}</span
      ><br /><br /><br />

      <el-link
        target= "_blank"
        style="float: right; position: absolute; right: 5%; bottom: 2%"
        type="primary"
        :href="this.form.eBookFileUrl"
        @click.native="readEBook"
      >
        查看该电子书
        <i class="el-icon-view el-icon--right"></i>
      </el-link>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateReadEbookReadHis, getEBookById } from '@/api/dashboard'

export default {
  name: '',
  data() {
    return {
      form: {
        eBookId: '',
        eBookAuthor: '',
        eBookName: '',
        eBookPicture: '',
        eBookIsbn: '',
        eBookIntro: '',
        eBookPress: '',
        eBookFileUrl: '',
        categoryName: '',
      },
      readCounts: null,
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'id']),
  },
  methods: {
    fetchData() {
      const _this = this
      getEBookById(this.$route.query.ebookId).then(function (response) {
        console.log('res:', response)
        _this.form.eBookId = response.eBook.ebookId
        _this.form.eBookAuthor = response.eBook.ebookAuthor
        _this.form.eBookName = response.eBook.ebookName
        _this.form.eBookPicture = response.eBook.ebookPicture
        _this.form.eBookIsbn = response.eBook.ebookIsbn
        _this.form.eBookIntro = response.eBook.ebookIntro
        _this.form.eBookFileUrl = response.eBook.ebookFileUrl
        _this.form.eBookPress = response.eBook.ebookPress
        _this.form.categoryId = response.eBook.categoryId
        _this.form.categoryName = response.eBook.category.categoryName
        console.log(_this.form)
      })
    },
    readEBook() {
        console.log('更新阅读记录')
        console.log('读者 id：',this.id)
        console.log('电子书 id：',this.form.eBookId)
        const _this = this
        updateReadEbookReadHis(this.id, this.form.eBookId).then(function (response){
            console.log(response)
            _this.$message(
                '你在阅读书名为：' + _this.form.eBookName + '的电子图书!'
              )
        })
    },
    openEBookFile(URL) {
      var tempwindow = window.open('_blank')
      tempwindow.location = URL
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
