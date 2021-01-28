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
        label="阅读ID"
        width="95"
        sortable
      >
        <template slot-scope="scope">
          {{ scope.row.readId }}
        </template>
      </el-table-column>
      <el-table-column label="电子图书作者" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.eBookList[0].ebookAuthor }}
        </template>
      </el-table-column>
      <el-table-column label="电子图书名称" width="380" align="center">
        <template slot-scope="scope">
          {{ scope.row.eBookList[0].ebookName }}
        </template>
      </el-table-column>
      <el-table-column label="电子图书简介" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eBookList[0].ebookIntro }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电子图书出版社" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eBookList[0].ebookPress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="读者姓名" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.readerList[0].readerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="读者账号" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.readerList[0].readerAccount }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="图书类别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eBookList.category.categoryName }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="阅读次数" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.readBookHisList[0].readNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电子图书图片" width="200" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.eBookList[0].ebookPicture">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
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
import { getReadList, getReadListPage } from '@/api/ebook'

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
    openEBookFile(URL, ebookId) {
      var tempwindow = window.open('_blank')
      tempwindow.location = URL
    },
    fetchData() {
      this.listLoading = true
      getReadList().then(response => {
        console.log(response)
        this.list.eBookPicture =
          process.env.VUE_APP_BASE_API + response.pageInfo.list.eBookPicture
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
      getReadListPage(currentPage).then(response => {
        console.log(process.env.VUE_APP_BASE_API)
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
