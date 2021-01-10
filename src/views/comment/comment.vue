<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table :data="commentList" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column prop="comment_status" label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '启用' : '未启用' }}
          </template>
        </el-table-column>
        <el-table-column prop="comment_status" label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.stateDisable"
              @change="onSwitchChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      layout="prev, pager, next"
      @current-change="pageChange"
      :total="totalCount"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { getarticle, edidArticle } from '@/api/article'
export default {
  data() {
    return {
      commentList: [],
      totalCount: null,
    }
  },

  computed: {},

  methods: {
    loadAdricle(page = 1) {
      getarticle({
        page,
        response_type: 'comment',
      }).then((res) => {
        res.data.data.results.map((v) => {
          v.stateDisable = false
        })
        this.commentList = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onSwitchChange(item) {
      console.log(item)
      item.stateDisable = true
      edidArticle(item.id, item.comment_status).then((res) => {
        item.stateDisable = false
        this.$message({
          message: item.comment_status ? '开启成功' : '关闭成功',
          type: 'success',
        })
      })
    },
    pageChange(page) {
      this.loadAdricle(page)
      this.loadAdricle(1)
    },
  },

  created() {
    this.loadAdricle(1)
  },
  mounted() {},
  components: {},
}
</script>

<style scoped></style>
