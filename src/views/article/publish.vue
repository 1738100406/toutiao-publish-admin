<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text item">
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in channelList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发布</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { getchannels, publishArticle } from "@/api/article.js"
export default {
  data() {
    return {
      channelList: [],
      article: {
        title: "",
        content: "",
        cover: {
          type: 1,
          images: [],
        },
        channel_id: "",
      },
    }
  },

  computed: {},

  methods: {
    onSubmit(draft = false) {
      console.log("submit!")
      console.log(this.article)
      publishArticle(this.article, draft).then((res) => {
        console.log(res.data.data.id)
      })
    },
    loadchannels() {
      getchannels().then((res) => {
        this.channelList = res.data.data.channels
      })
    },
  },

  created() {
    this.loadchannels()
  },
  mounted() {},
  components: {},
}
</script>

<style lang="scss" scoped></style>
