<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text item">
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <div>
            <el-tiptap height="350" v-model="article.content" :extensions="extensions" placeholder="请输入文章内容" />
          </div>
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
          <el-button type="primary" @click="onSubmit(false)">{{ $route.query.id ? '修改' : '发布' }}</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { getchannels, publishArticle, getArticle, editArticle, uploadimg } from '@/api/article.js'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  LineHeight,
  History,
  TextColor,
  TextHighlight,
  Fullscreen,
  FontType,
  FontSize,
  CodeView,
  Image,
  FormatClear,
} from 'element-tiptap'
export default {
  data() {
    return {
      channelList: [],
      article: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: [],
        },
        channel_id: '',
      },
      extensions: [
        new CodeView(), //代码显示
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new Image({
          uploadRequest(file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadimg(fd).then(res => {
              return res.data.data.url
            })
          },
        }),
        new BulletList(),
        new OrderedList(),
        new LineHeight(),
        new History(),
        new TextColor(),
        new TextHighlight(),
        new Fullscreen(),
        new FontType(),
        new FontSize(),
        new FormatClear(),
      ],
    }
  },
  computed: {},

  methods: {
    onSubmit(draft = false) {
      if (this.$route.query.id) {
        editArticle(this.$route.query.id, this.article, draft).then(res => {
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success',
          })
          // 跳转到内容管理页面
          this.$router.push('/article')
        })
      } else {
        publishArticle(this.article, draft).then(res => {
          console.log(res.data.data.id)
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success',
          })
          // 跳转到内容管理页面
          this.$router.push('/article')
        })
      }
    },
    loadchannels() {
      getchannels().then(res => {
        this.channelList = res.data.data.channels
      })
    },
    loadgetArticle() {
      let articleId = this.$route.query.id
      getArticle(articleId).then(res => {
        // console.log(res.data.data)
        this.article = res.data.data
      })
    },
  },

  created() {
    this.loadchannels()
    if (this.$route.query.id) {
      this.loadgetArticle()
    }
  },
  mounted() {},
}
</script>

<style lang="scss" scoped></style>
