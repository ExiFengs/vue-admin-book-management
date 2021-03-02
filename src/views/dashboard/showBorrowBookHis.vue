<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
            :data="list"
          >
            <el-form-item label="纸质图书简介">
              <span>{{ scope.row.bookList[0].bookIntro }}</span>
            </el-form-item>
            <el-form-item label="电子图书出版社">
              <span>{{ scope.row.bookList[0].bookPress }}</span>
            </el-form-item>

            <el-form-item label="预约时间">
              <span>{{ scope.row.borrowBookHisList[0].subscribeTime }}</span>
            </el-form-item>

            <el-form-item label="借书时间">
              <span v-if="">{{
                scope.row.borrowBookHisList[0].giveBookTime == null
                  ? '图书管理员还没有审核你的借书申请'
                  : scope.row.borrowBookHisList[0].giveBookTime
              }}</span>
            </el-form-item>

            <el-form-item label="预期还书时间">
              <span>{{
                scope.row.borrowBookHisList[0].expectGetBackTime
              }}</span>
            </el-form-item>

            <el-form-item label="还书时间">
              <span v-if="">{{
                scope.row.borrowBookHisList[0].getBackBookTime == null
                  ? '你还没有还书哦'
                  : scope.row.borrowBookHisList[0].getBackBookTime
              }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="纸质图书名称" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookList[0].bookName }}
        </template>
      </el-table-column>
      <el-table-column label="纸质图书作者" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookList[0].bookAuthor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图书类别" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookList[0].category.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="纸质图书图片" width="150" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.bookList[0].bookPicture">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>

      <el-table-column label="借阅数量" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.borrowBookHisList[0].borBookNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="借阅状态"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.borrowBookHisList[0].state | statusFilter">{{
            scope.row.borrowBookHisList[0].state | formatStata
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="cancel(scope.row.borBookId)"
            :disabled="scope.row.borrowBookHisList[0].state == 0 ? false : true"
          >
            取消预约
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
  getBorrowList,
  getBorrowListPage,
  getReaderLikeNameList,
  cancelBorrowBook,
} from '@/api/dashboard'

export default {
  filters: {
    // el-tag类型转换
    statusFilter(status) {
      const statusMap = {
        1: 'info',
        2: 'info',
        0: 'success',
        3: 'danger',
        4: 'success',
        5: 'info',
        6: 'danger',
      }
      return statusMap[status]
    },
    // 状态显示转换
    formatStata(status) {
      const statusMap = {
        1: '已还书',
        2: '已逾期已还书',
        3: '已逾期但未还书',
        0: '已预约',
        4: '已借书',
        5: '已取消预约',
        6: '预约逾期',
      }
      return statusMap[status]
    },
  },
  watch: {
    search: function (val, oldVal) {
      console.log('正在输入的姓名：' + val)
      console.log('已经输入过的姓名：' + oldVal)

      if (val.length != 0) {
        getReaderLikeNameList(val).then(response => {
          this.list = response.bookList.filter(
            item => ~item.bookName.indexOf(val)
          )
        })
      } else {
        this.fetchData()
      }
    },
  },
  data() {
    return {
      search: '', // 搜索
      pageSize: 0,
      total: 0,
      list: {
        bookList: [],
        borrowBookHisList: [],
      },
      listLoading: true,
      imageUrl: '',
      category: '',
      ebookId: null,
    }
  },

  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'id']),
  },
  methods: {
    cancel(id) {
      console.log('[ id ]', id)
      const _this = this
      cancelBorrowBook(id).then(response => {
        console.log(
          '%c [ response ]',
          'font-size:13; background:pink; color:#bf2c9f;',
          response
        )
        _this.$message(response.message)
      })
    },
    fetchData() {
      this.listLoading = true
      getBorrowList(this.$route.query.readerId).then(response => {
        console.log(response)
        this.list = response.pageInfo.list
        this.pageSize = response.pageInfo.list.length
        this.total = response.pageInfo.total
        this.listLoading = false
        console.log(
          '%c [ this.list ]',
          'font-size:13px; background:pink; color:#bf2c9f;',
          this.list
        )
      })
    },
    page(currentPage) {
      this.listLoading = true
      getBorrowListPage(currentPage, this.id).then(response => {
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