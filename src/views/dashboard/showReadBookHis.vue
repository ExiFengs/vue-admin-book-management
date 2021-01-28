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
      <el-table-column prop="id" align="center" label="读者ID" width="95" sortable>
        <template slot-scope="scope">
          {{ scope.row.readerId }}
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
       <!-- <el-table-column label="图书类别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eBookList.category.categoryName }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="阅读次数" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.readBookHisList[0].readNum}}</span>
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
          @click="openEBookFile(scope.row.eBookList[0].ebookFileUrl, scope.row.ebookId)"
          >
            查看该电子书
            <i class="el-icon-view el-icon--right"></i> 
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="电子图书图片" width="200" align="center" >
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
import { getList, getListPage, getReaderLikeNameList, updateReadEbookReadHis } from '@/api/dashboard'

export default {
  data () {
    return {
      search: '', // 搜索
      pageSize: 7,
      total: 0,
      list: {
        eBookList:[],
        readBookHisList: [],
      },
      listLoading: true,
      imageUrl: '',
      category: '',
      ebookId: null,
    }
  },

  created () {
    this.fetchData()
  },
    computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'id']),
  },
  methods: {
    openEBookFile(URL, ebookId){
      var tempwindow=window.open('_blank');
      tempwindow.location=URL;
      console.log('更新阅读记录')
      console.log('读者 id：',this.id)
      console.log('电子书 id：',ebookId)
      const _this = this
      updateReadEbookReadHis(this.id, ebookId).then(function (response){
          console.log(response)
          _this.$message(
              '你在阅读书ID为：' + ebookId + '的电子图书!'
            )
      })
    },
    fetchData () {
      this.listLoading = true
      getList(this.$route.query.readerId).then(response => {
        console.log(response)
        this.list.eBookPicture = process.env.VUE_APP_BASE_API + response.pageInfo.list.eBookPicture
        this.list = response.pageInfo.list
        this.pageSize = response.pageInfo.list.length
        this.total = response.pageInfo.total
        this.listLoading = false
        console.log(this.list)
      })
    },
    
    page (currentPage) {
      this.listLoading = true
      getListPage(currentPage, this.id).then(response => {
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
