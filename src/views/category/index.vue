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
          {{ scope.row.categoryId }}
        </template>
      </el-table-column>
      <el-table-column label="图书分类名称">
        <template slot-scope="scope">
          {{ scope.row.categoryName }}
        </template>
      </el-table-column>
    
      <el-table-column label="操作">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            width="200"
            icon="search"
            class="search-input"
            placeholder="输入图书分类名称搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)"
            >修改</el-button
          >
          <el-button size="mini" type="danger" @click="deleteBook(scope.row)"
            >删除</el-button
          >
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
} from '@/api/category'

export default {
  data() {
    return {
      search: '', // 搜索
      pageSize: 7,
      total: 0,
      list: [],
      listLoading: true,
    }
  },
  watch: {
    search: function (val, oldVal) {
      console.log('正在输入的姓名：' + val)
      console.log('已经输入过的姓名：' + oldVal)

      if (val.length != 0) {
        getReaderLikeNameList(val).then(response => {
          this.list = response.categoryList.filter(
            item => ~item.categoryName.indexOf(val)
          )
        })
      } else {
        this.fetchData()
      }
    },
  },

  created() {
    this.fetchData()
  },
  methods: {
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
    deleteBook(row) {
      deleteReader(row.categoryId).then(response => {
        if(response.result != 0){
          this.$alert('姓名为:' + row.categoryName + '的图书类别删除成功！', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            },
          })
        }
      })
    },
    edit(row) {
      this.$router.push({
        path: '/category/updateCategory',
        query: { categoryId: row.categoryId },
      })
      console.log(row.categoryId + '------')
    },
    page(currentPage) {
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
