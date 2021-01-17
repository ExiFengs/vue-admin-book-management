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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.readerId }}
        </template>
      </el-table-column>
      <el-table-column label="读者姓名">
        <template slot-scope="scope">
          {{ scope.row.readerName }}
        </template>
      </el-table-column>
      <el-table-column label="读者账号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.readerAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="读者密码" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.readerPassword }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="注册时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.registrationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.readerSex }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="deleteBook(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <!-- 状态 -->
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->
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
import { getList, getListPage } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
      }
      return statusMap[status]
    },
  },
  data() {
    return {
      pageSize: 6,
      total: null,
      list: null,
      listLoading: true,
    }
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
    deleteBook(row) {},
    edit(row) {
      this.$router.push({
        path: '/update',
        query: {
          id: row.id,
        },
      })
    },
    page(currentPage) {
      this.listLoading = true
      getListPage(currentPage).then(response => {
        console.log(process.env.VUE_APP_BASE_API)
        this.list = response.pageInfo.list
        this.pageSize = response.pageInfo.list.length
        this.total = response.pageInfo.total - 1
        this.listLoading = false
      })
    },
  },
}
</script>
