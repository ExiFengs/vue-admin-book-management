<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort="{ prop: 'date', order: 'ascending' }"
    >
      <el-table-column
        prop="id"
        align="center"
        label="读者ID"
        width="95"
        sortable
      >
        <template slot-scope="scope">
          {{ scope.row.readerId }}
        </template>
      </el-table-column>
      <el-table-column prop="id" align="center" label="读者姓名" width="95">
        <template slot-scope="scope">
          {{ scope.row.reader.readerName }}
        </template>
      </el-table-column>
      <el-table-column label="电子图书作者" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.ebookAuthor }}
        </template>
      </el-table-column>
      <el-table-column label="电子图书名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.ebookName }}
        </template>
      </el-table-column>

      <el-table-column label="电子图书ISBN码" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ebookIsbn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电子图书简介" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ebookIntro }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电子图书出版社" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ebookPress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{
            scope.row.state | formatStata
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="图书类别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.category.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电子图书图片" width="150" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.ebookPicture">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="电子图书文件" width="110" align="center">
        <template slot-scope="scope">
          <!-- <el-link 
          type="primary"
          :href="scope.row.ebookFileUrl"
          > -->
          <el-link
            type="primary"
            @click="openEBookFile(scope.row.ebookFileUrl)"
          >
            查看该电子书
            <i class="el-icon-view el-icon--right"></i>
          </el-link>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            width="200"
            icon="search"
            class="search-input"
            placeholder="输入电子图书名称搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="putAway(scope.row)"
            :disabled="scope.row.state == 0 ? false : true"
          >
            允许上架
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="refuse(scope.row)"
            :disabled="scope.row.state == 0 ? false : true"
          >
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="page"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getList,
  getListPage,
  getReaderLikeNameList,
  putAway,
  refuse,
} from '@/api/appleEBook'

export default {
  data() {
    return {
      search: '', // 搜索
      pageSize: 7,
      total: 0,
      list: [],
      listLoading: true,
      imageUrl: '',
      category: '',
      appleEBook: {},
      readerId: null,
    }
  },

  watch: {
    search: function (val, oldVal) {
      console.log('正在输入的姓名：' + val)
      console.log('已经输入过的姓名：' + oldVal)

      if (val.length != 0) {
        getReaderLikeNameList(val).then(response => {
          console.log(
            '%c [ response ]',
            'font-size:13px; background:pink; color:#bf2c9f;',
            response
          )
          this.list = response.appleEBookList.filter(
            item => ~item.bookName.indexOf(val)
          )
        })
      } else {
        this.fetchData()
      }
    },
  },
  filters: {
    // el-tag类型转换
    statusFilter(status) {
      const statusMap = {
        1: 'info',
        2: 'danger',
        0: 'success',
      }
      return statusMap[status]
    },
    // 状态显示转换
    formatStata(status) {
      const statusMap = {
        1: '审核通过',
        2: '审核失败',
        0: '待审核',
      }
      return statusMap[status]
    },
  },

  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'id']),
  },
  methods: {
    openEBookFile(URL) {
      var tempwindow = window.open('_blank')
      tempwindow.location = URL
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(response) 
        this.list = response.pageInfo.list
        this.pageSize = response.pageInfo.list.length
        this.total = response.pageInfo.total
        this.listLoading = false
      })
    },
    refuse(row) {
      this.appleEBook.eBookId = row.ebookId
      this.appleEBook.eBookAuthor = row.ebookAuthor
      this.appleEBook.eBookIntro = row.ebookIntro
      this.appleEBook.eBookIsbn = row.ebookIsbn
      this.appleEBook.eBookName = row.ebookName
      this.appleEBook.eBookPicture = row.ebookPicture
      this.appleEBook.eBookPress = row.ebookPress
      this.appleEBook.eBookFileUrl = row.ebookFileUrl
      this.appleEBook.categoryId = row.categoryId
      this.appleEBook.readerId = row.readerId
      this.appleEBook.state = row.state
      refuse(this.appleEBook).then(response => {
        console.log(
          '%c [ this.appleEBook ]',
          'font-size:13px; background:pink; color:#bf2c9f;',
          this.appleEBook
        )
        if (response.result != 0) {
          this.$message(
            '名称为：' + response.appleEBook.bookName + '的电子图书拒绝上架'
          )
        } else {
          this.$message('出错啦')
        }
      })
    },
    putAway(row) {
      console.log(
        '%c [ row ]',
        'font-size:13px; background:pink; color:#bf2c9f;',
        row
      )
      this.appleEBook.eBookId = row.ebookId
      this.appleEBook.eBookAuthor = row.ebookAuthor
      this.appleEBook.eBookIntro = row.ebookIntro
      this.appleEBook.eBookIsbn = row.ebookIsbn
      this.appleEBook.eBookName = row.ebookName
      this.appleEBook.eBookPicture = row.ebookPicture
      this.appleEBook.eBookPress = row.ebookPress
      this.appleEBook.eBookFileUrl = row.ebookFileUrl
      this.appleEBook.categoryId = row.categoryId
      this.appleEBook.readerId = row.readerId
      this.appleEBook.state = row.state
      console.log(
        '%c [ this.appleEBook ]',
        'font-size:13px; background:pink; color:#bf2c9f;',
        this.appleEBook
      )
      putAway(this.appleEBook).then(response => {
        if (response.result != 0) {
          this.$message(
            '名称为：' + response.appleEBook.bookName + '的电子图书上架成功'
          )
        } else {
          this.$message('出错啦')
        }
      })
    },
    page(currentPage) {
      this.listLoading = true
      getListPage(currentPage).then(response => {
        console.log(process.env.VUE_APP_BASE_API)
        console.log(response)
        this.list = response.pageInfo.list
        this.total = response.pageInfo.total
        this.listLoading = false
      })
    },
  },
}
</script>
