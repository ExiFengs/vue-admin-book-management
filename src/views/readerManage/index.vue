<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort = "{prop: 'date', order: 'ascending'}"
    >
      <el-table-column prop="id" align="center" label="ID" width="95" sortable>
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
        prop="date"
        label="注册时间"
        width="200"
        sortable
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
      <el-table-column label="操作">
        <template slot="header" slot-scope="scope">
          <el-input
            width="200"
            icon="search"
            class="search-input"
            v-model="search"
            placeholder="输入读者姓名搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" size="mini" type="primary"
            >修改</el-button
          >
          <el-button @click="deleteBook(scope.row)" size="mini" type="danger"
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
    >
    </el-pagination>

  </div>
</template>

<script>
import { getList, getListPage, deleteReader, getListPageComplex, getReaderLikeNameList } from "@/api/table";

export default {
  /* filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  }, */
  created() {
    this.fetchData();
  },
  data() {
    return {
      search: '',  //搜索 
      pageSize: 7,
      total: 0,
      list: [],
      listLoading: true
    };
  },
  watch: {
    search: function(val, oldVal){
      
      console.log('正在输入的姓名：' + val);
      console.log('已经输入过的姓名：' + oldVal);

        if(val.length != 0){
            getReaderLikeNameList(val).then((response) => {
            this.list = response.readerList.filter( item => (~item.readerName.indexOf(val)));
        })}else{
            this.fetchData();
          }
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        console.log(response);
        this.list = response.pageInfo.list;
        this.pageSize = response.pageInfo.list.length;
        this.total = response.pageInfo.total;
        this.listLoading = false;
      });
    },
    deleteBook(row) {
      deleteReader(row.readerId).then((response) => {
        this.$alert("姓名为:" + row.readerName + "的读者删除成功！", "消息", {
          confirmButtonText: "确定",
          callback: (action) => {
            window.location.reload();
          },
        });
      });
    },
    edit(row) {
      this.$router.push({
                    path: '/example/updateReader',
                    query:{readerId : row.readerId}
                })
      console.log(row.readerId + "------");
    },
    page(currentPage) {
      this.listLoading = true;
      getListPage(currentPage).then((response) => {
        console.log(process.env.VUE_APP_BASE_API);
        console.log(response);
        console.log(currentPage + "========");
        this.list = response.pageInfo.list;
        //this.pageSize = response.pageInfo.list.length;
        this.total = response.pageInfo.total;
        this.listLoading = false;
      });
    },
  },
};
</script>
