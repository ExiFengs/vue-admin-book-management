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
      <el-table-column label="纸质图书作者" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookList[0].bookAuthor }}
        </template>
      </el-table-column>
      <el-table-column label="纸质图书名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookList[0].bookName }}
        </template>
      </el-table-column>
      <el-table-column label="纸质图书库存" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookList[0].bookRepertory }}
        </template>
      </el-table-column>
      <el-table-column label="纸质图书图片" width="120" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.bookList[0].bookPicture">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="读者姓名" width="90" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.readerList[0].readerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="读者账号" width="90" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.readerList[0].readerAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图书类别" width="90" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookList[0].category.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借书时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.borrowBookHisList[0].giveBookTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="借阅数量" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.borrowBookHisList[0].borBookNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预期还书时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.borrowBookHisList[0].expectGetBackTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="还书时间" width="180" align="center">
        <template slot-scope="scope">
          <span v-if="">{{ scope.row.borrowBookHisList[0].getBackBookTime == null ? '还没有还书哦' :  scope.row.borrowBookHisList[0].getBackBookTime}}</span>
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

      <el-table-column label="借书" width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="getBorrowBook(scope.row.borBookId)" 
          :disabled="scope.row.borrowBookHisList[0].state == 0 ? false : true" >
            读者借书
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="还书" width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="getBackBook(scope.row.borBookId)" 
          :disabled="scope.row.borrowBookHisList[0].state == 0 || scope.row.borrowBookHisList[0].state == 3 || scope.row.borrowBookHisList[0].state == 4 ? false : true" >
            读者还书
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
import { getBorrowList, getBorrowListPage } from '@/api/book'
import { getBackBook, getBorrowBook } from '@/api/dashboard'


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
  filters: {
    // el-tag类型转换
    statusFilter(status) {
      const statusMap = {
        1: 'info',
        2: 'info',
        0: 'success',
        3: 'danger',
        4: 'success',
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
        4: '已借书'
      }
      return statusMap[status]
    }
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
    getBorrowBook(id) {
      console.log('[ id ]', id)
      const _this = this 
      getBorrowBook(id).then(response => {
        console.log('%c [ response ]', 'font-size:13; background:pink; color:#bf2c9f;', response)
        _this.$message(
          response.message
        )
      })
    },
    getBackBook(id) {
      console.log('[ id ]', id)
      const _this = this 
      getBackBook(id).then(response => {
        console.log('%c [ response ]', 'font-size:13; background:pink; color:#bf2c9f;', response)
        _this.$message(
          response.message
        )
      })
    },
    fetchData() {
      this.listLoading = true
      getBorrowList().then(response => {
        console.log(response)
      
        let resList = [];
        for (var i in response.pageInfo.list) {
          resList.push(response.pageInfo.list[i])
        }
        this.list = resList
        this.pageSize = response.pageInfo.list.length
        this.total = response.pageInfo.total
        this.listLoading = false
        console.log(this.list)
      })
    },

    page(currentPage) {
      this.listLoading = true
      getBorrowListPage(currentPage).then(response => {
        console.log(response)
        console.log(currentPage + '========')
        let resList = [];
        for (var i in response.pageInfo.list) {
          resList.push(response.pageInfo.list[i])
        }
        this.list = resList
        // this.pageSize = response.pageInfo.list.length;
        this.total = response.pageInfo.total
        this.listLoading = false
      })
    },
  },
}
</script>
