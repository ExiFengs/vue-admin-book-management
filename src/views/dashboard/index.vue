<template>
  <div>
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  <el-container>
    <div style="position:relative;">

      <span
      style="position:relative; left:2%; padding-top: 2vh; color: #6699CC; font-family:'Times New Roman',Times,serif; font-size:30px;">
      公益图书系统
      </span>

    <el-input placeholder="请输入图书名进行搜素"  v-model="search" class="input-with-select" style="position:relative; width: 22%; left:65%; padding-top: 2vh;">
    </el-input>
    </div>
    
  <el-header style="width: 100%; height: 100%;">
    <!-- 广告栏 -->
    <el-divider content-position="left">广告栏信息</el-divider>
    <el-carousel :interval="2000" arrow="always" style="padding-top: 1vh;" :height="bannerH +'px'">
      <el-carousel-item v-for="(item,index) in advertisementList" :key="index">
          <img style="width: 98%; height: 100%;" v-bind:src="item.adPicture">
          <span style="position: absolute; bottom: 0; left: 0px; color: white; background: red; font-size: 200%; font-family:'Times New Roman',Times,serif;">{{ item.adDetails }}</span> 
      </el-carousel-item>
    </el-carousel>
    </el-carousel>
  </el-header>
    <el-container>
      <el-main>
        <!-- 分类导航 -->
        <el-divider content-position="left">图书分类</el-divider>
        <el-tabs type="border-card" @tab-click="clickTab">
          <el-tab-pane
            :key="item.categoryId"
            v-for="(item, index) in categoryList"
            :label="item.categoryName"
            :name="item.categoryId"
          >
          <!-- {{item.categoryName}} -->
          <!-- 纸质图书信息 -->
          <span style="color: #6699CC; ">纸质图书<br></span><br>
            <el-row :gutter="20">
              <el-col :span="6" v-for="(item, index) in bookList" :key="index">
                <el-card :body-style="{ padding: '5px' }">
                  <img :src="item.bookPicture" class="image">
                  <div style="padding: 14px;">
                    <span>{{item.bookName}}</span>
                    <div class="bottom clearfix">
                    <time class="time">作者:{{item.bookAuthor}}</time><br><br>
                      <time class="time">简介:{{item.bookIntro}}</time>
                      <el-button type="text" class="button" @click="showBookDetail(item)">查看详情</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <!-- 电子图书信息 -->
          <el-divider></el-divider>
          <span style="color: #6699CC; ">电子图书<br></span><br>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in  eBookList" :key="index">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item.ebookPicture" class="image">
                <div style="padding: 14px;">
                  <span>{{item.ebookName}}</span>
                  <div class="bottom clearfix">
                    <time class="time">作者:{{item.ebookAuthor}}</time><br><br>
                    <time class="time">简介:{{item.ebookIntro}}</time>
                    <el-button type="text" class="button" @click="showEBookDetail(item)">查看详情</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          </el-tab-pane>
      </el-tabs>

      </el-main>
      <el-footer></el-footer>
    </el-container>
</el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAllAd, getAllCategory, getOneCategoryByBookCategoryId, getEBookLikeNameList, getBookLikeNameList} from '@/api/dashboard'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
  },
  data() {
    return {
      currentDate: new Date(),
      bannerH: 200,
      advertisementList: [],
      categoryList: [],
      categoryId: '',
      bookList: [],
      eBookList: [],
      input: '',
      select: '',
      search: '', // 搜索

    }
  },
  watch: {
    search: function (val, oldVal) {
      console.log('正在输入的姓名：' + val)
      console.log('已经输入过的姓名：' + oldVal)
      if (val.length != 0) {
        getEBookLikeNameList(val).then(response => {
          this.eBookList = response.eBookList.filter(item => ~item.ebookName.indexOf(val))
        })
        getBookLikeNameList(val).then(response => {
          this.bookList = response.bookList.filter(item => ~item.bookName.indexOf(val))
        })
       }else {
        this.fetchData()
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAllAd().then(response => {
        console.log(response)
        this.advertisementList = response.advertisementList
      })
      getAllCategory().then(response => {
        console.log('分类信息：', response)
        this.categoryList = response.categoryList
      })
    },
    clickTab(tab, event){
      console.log(tab, event)
      this.categoryId = tab.name
      getOneCategoryByBookCategoryId(this.categoryId).then(response => {
        console.log(response)
        this.bookList = response.bookList
        this.eBookList = response.eBookList

      })
    },
    showBookDetail(val){
       this.$router.push({
        path: '/showBookDetail',
        query: { bookId : val.bookId },
      })
      console.log(val.bookId + '------')
    },
    showEBookDetail(val){
       this.$router.push({
        path: '/showEBookDetail',
        query: { ebookId: val.ebookId },
      })
      console.log(val.ebookId+ '------')
    },
    setBannerH() {
      this.bannerH = document.body.clientWidth / 4
    },
  },
  mounted() {
    this.setBannerH()
    window.addEventListener(
      'resize',
      () => {
        this.setBannerH()
      },
      false
    )
  },
}
</script>

<style>

  .el-select .el-input {
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

.el-header {
  text-align: center;
  line-height: auto;
  height: auto;
}



.el-main {
  text-align: center;
  line-height: auto;
  height: 100%;
}


.time {
  font-size: 13px;
  color: #999;
  float: left;

}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  float: left;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
