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
      <el-table-column prop="id" align="center" label="ID" width="95" sortable>
        <template slot-scope="scope">
          {{ scope.row.bookId }}
        </template>
      </el-table-column>
      <el-table-column label="纸质图书作者" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookAuthor }}
        </template>
      </el-table-column>
      <el-table-column label="纸质图书名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookName }}
        </template>
      </el-table-column>
      <el-table-column label="纸质图书库存" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookRepertory }}</span>
        </template>
      </el-table-column>
       <el-table-column label="纸质图书ISBN码" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookIsbn }}</span>
        </template>
      </el-table-column>
       <el-table-column label="纸质图书简介" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookIntro }}</span>
        </template>
      </el-table-column>
       <el-table-column label="纸质图书出版社" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookPress }}</span>
        </template>
      </el-table-column>
       <el-table-column label="图书类别id" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.categoryId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图书类别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.category.categoryName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="纸质图书图片" width="150" align="center" >
        <template slot-scope="scope">
          <el-image :src="scope.row.bookPicture">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            width="200"
            icon="search"
            class="search-input"
            placeholder="输入纸质图书名称搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="deleteBook(scope.row)">
            删除
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
import {
  getList,
  getListPage,
  deleteReader,
  getReaderLikeNameList,
} from '@/api/book'

export default {
  data () {
    return {
      search: '', // 搜索
      pageSize: 7,
      total: 0,
      list: [],
      listLoading: true,
      imageUrl: '',
      category: ''
    }
  },
  watch: {
    search: function (val, oldVal) {
      console.log('正在输入的姓名：' + val)
      console.log('已经输入过的姓名：' + oldVal)

      if (val.length != 0) {
        getReaderLikeNameList(val).then(response => {
          this.list = response.bookList.filter(item => ~item.bookName.indexOf(val))
        })
      } else {
        this.fetchData()
      }
    },
  },

  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getList().then(response => {
        console.log(response)
        this.list.bookPicture = process.env.VUE_APP_BASE_API + response.pageInfo.list.bookPicture
        this.list = response.pageInfo.list
        this.pageSize = response.pageInfo.list.length
        this.total = response.pageInfo.total
        this.listLoading = false
      })
    },
    deleteBook (row) {
      deleteReader(row.bookId).then(response => {
        this.$alert('名称为:' + row.bookName + '的纸质图书删除成功！', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload()
          },
        })
      })
    },
    edit (row) {
      this.$router.push({
        path: '/book/updateBook',
        query: { bookId: row.bookId },
      })
      console.log(row.bookId + '------')
    },
    page (currentPage) {
      this.listLoading = true
      getListPage(currentPage).then(response => {
        console.log(process.env.VUE_APP_BASE_API)
        console.log(response)
        console.log(currentPage + '========')
        this.list = response.pageInfo.list
        // this.pageSize = response.pageInfo.list.length;
        this.total = response.pageInfo.total
        this.listLoading = false
      })
    },
  },
}
</script>
