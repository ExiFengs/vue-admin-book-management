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
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
            :data="list"
          >
            <el-form-item label="电子图书作者">
              <span>{{ scope.row.ebookAuthor }}</span>
            </el-form-item>
            <el-form-item label="电子图书出版社">
              <span>{{ scope.row.ebookPress }}</span>
            </el-form-item>
            <el-form-item label="电子图书ISBN码">
              <span>{{ scope.row.ebookIsbn }}</span>
            </el-form-item>
            <el-form-item label="电子图书简介">
              <span>{{ scope.row.ebookIntro }}</span>
            </el-form-item>
             <el-form-item label="拒绝理由">
              <span>{{ scope.row.refusalReason }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="电子图书名称" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.ebookName }}
        </template>
      </el-table-column>
      <el-table-column label="图书类别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.category.categoryName }}</span>
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
      <el-table-column label="电子图书图片" width="150" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.ebookPicture">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{
            scope.row.state | formatStata
          }}</el-tag>
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
            @click="edit(scope.row)"
            :disabled="scope.row.state == 0 ? false : true"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteBook(scope.row)"
            :disabled="scope.row.state == 0 ? false : true"
          >
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
import { mapGetters } from 'vuex'
import {
  deleteReader,
  getReaderLikeNameList,
  getListById,
  getListPageById,
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
    }
  },
  watch: {
    search: function (val, oldVal) {
      console.log('正在输入的姓名：' + val)
      console.log('已经输入过的姓名：' + oldVal)

      if (val.length != 0) {
        getReaderLikeNameList(val, this.id).then(response => {
          console.log('模糊搜素：' + response.appleEBookList.ebookName)
          this.list = response.appleEBookList.filter(
            item => ~item.ebookName.indexOf(val)
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
        0: '审核中',
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
      this.$notify.info({
        title: '提示',
        message: '你正在查看电子书',
        duration: 0,
      })
    },
    fetchData() {
      this.listLoading = true
      getListById(this.id).then(response => {
        console.log(response)
        this.list = response.pageInfo.list
        this.pageSize = response.pageInfo.list.length
        this.total = response.pageInfo.total
        this.listLoading = false
        console.log(this.list)
      })
    },
    deleteBook(row) {
      deleteReader(row.ebookId).then(response => {
        this.$alert(
          '名称为:' + row.ebookName + '的电子图书删除成功！',
          '消息',
          {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            },
          }
        )
      })
    },
    edit(row) {
      this.$router.push({
        path: '/updateAppleEBooke',
        query: { eBookId: row.ebookId },
      })
      console.log(row.ebookId + '------')
    },
    page(currentPage) {
      this.listLoading = true
      getListPageById(currentPage, this.id).then(response => {
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
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 150px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>