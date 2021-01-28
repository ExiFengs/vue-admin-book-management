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
      <el-table-column label="纸质图书作者" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookList[0].bookAuthor }}
        </template>
      </el-table-column>
      <el-table-column label="纸质图书名称" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookList[0].bookName }}
        </template>
      </el-table-column>
      <el-table-column label="纸质图书简介" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookList[0].bookIntro }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电子图书出版社" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookList[0].bookPress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图书类别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookList[0].category.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="纸质图书图片" width="180" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.bookList[0].bookPicture">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>

      <el-table-column label="借阅时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.borrowBookHisList[0].giveBookTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借阅数量" width="50" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.borrowBookHisList[0].borBookNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预期还书时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.borrowBookHisList[0].expectGetBackTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="借阅状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.borrowBookHisList[0].state| statusFilter">{{scope.row.borrowBookHisList[0].state | formatStata}}</el-tag>
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
            我要还书
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
import { getBorrowList, getBorrowListPage, getReaderLikeNameList } from '@/api/dashboard'

export default {
  filters: {
    // el-tag类型转换
    statusFilter(status) {
      const statusMap = {
        1: 'info',
        2: 'danger',
        0: 'success'
      }
      return statusMap[status]
    },
    // 状态显示转换
    formatStata(status) {
      const statusMap = {
        1: '已还书',
        2: '已逾期',
        0: '已借书',
      }
      return statusMap[status]
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
  data() {
    return {
      search: '', // 搜索
      pageSize: 7,
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
    fetchData() {
      this.listLoading = true
      getBorrowList(this.$route.query.readerId).then(response => {
        console.log(response)
        this.list = response.pageInfo.list
        this.pageSize = response.pageInfo.list.length
        this.total = response.pageInfo.total
        this.listLoading = false
        console.log(this.list)
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
