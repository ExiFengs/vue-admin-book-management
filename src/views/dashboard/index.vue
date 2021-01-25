<template>
  <div>
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  <el-container>
  <el-header>
    <el-carousel :interval="2000" arrow="always" style="padding-top: 3vh;" :height="bannerH +'px'">
      <el-carousel-item v-for="(item,index) in advertisementList" :key="index">
          <img style="width: 100%; height: 100%;" v-bind:src="item.adPicture">
          <span style="position: absolute; bottom: 0; left: 0px; color: red; font-size: 200%; font-family:'Times New Roman',Times,serif;">{{ item.adDetails }}</span> 
      </el-carousel-item>
    </el-carousel>
    </el-carousel>
    <el-tabs type="border-card">
      <el-tab-pane
        :key="index"
        v-for="(item, index) in categoryList"
        :label="item.categoryName"
        :name="item.categoryName"
      >
      {{item.categoryName}}
      </el-tab-pane>
  </el-tabs>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAllAd, getAllCategory } from '@/api/dashboard'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
  },
  data() {
    return {
      bannerH: 200,
      advertisementList: [],
      categoryList: [],
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
        console.log('分类信息：',response)
        this.categoryList = response.categoryList
      })
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

<style lang="scss" scoped>
.el-header,
.el-footer {
  text-align: center;
  line-height: auto;
}

.el-aside {
  text-align: center;
  line-height: auto;
}

.el-main {
  text-align: center;
  line-height: auto;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
