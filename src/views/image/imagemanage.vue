<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="display:flex;justify-content:space-between">
      <el-radio-group v-model="iscollect" @change="Eventchange" size="medium">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" @click="dialogopen">上传素材</el-button>
    </div>
    <div style="margin:20px 0px;">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" v-for="(item, index) in imgList" :key="index">
          <el-image style="width: 100px; height: 100px" :src="item.url" fit="cover"></el-image>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      layout="prev, pager, next"
      @current-change="changePage"
      :total="totalCount"
      :current-page.sync="page"
    >
    </el-pagination>
    <el-dialog title="提示" @closed="closedplay" append-to-body :visible.sync="dialogVisible" width="600px">
      <div>
        <video ref="video" autoplay="autoplay" width="500" preload controls controlslist="nodownload" loop>
          <source src="https://demo.jeecms.com/u/cms/www/202010/14162955f8sw.mp4" />
        </video>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { getimageList } from '@/api/article'
export default {
  data() {
    return {
      imgList: [],
      totalCount: null,
      page: 1,
      iscollect: false, //是否收藏
      dialogVisible: false,
    }
  },

  computed: {},

  methods: {
    Eventchange() {
      console.log(this.iscollect)
      this.loadImageList(1)
    },
    loadImageList(page = 1) {
      this.page = page
      getimageList({
        collect: this.iscollect,
        page,
        per_page: 20,
      }).then(res => {
        console.log(res)
        this.imgList = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    changePage(page) {
      this.loadImageList(page)
    },
    dialogopen() {
      this.dialogVisible = true
      console.log(this.$refs.video)
      this.$refs.video.play()
    },
    closedplay() {
      this.$refs.video.pause()
      this.$refs.video.currentTime = 0
    },
  },

  created() {
    this.loadImageList(1)
  },
  mounted() {},
  components: {},
}
</script>

<style lang="scss" scoped>
a {
  display: flex;
  justify-content: space-between;
}
</style>
