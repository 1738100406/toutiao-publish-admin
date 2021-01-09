<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
        ref="form"
        :model="form"
        v-loading="isLoading"
        label-width="80px"
      >
        <el-form-item label="活动区域">
          <el-radio-group v-model="form.radio">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="value" placeholder="请选择">
            <el-option label="全部" :value="null"> </el-option>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="isLoading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到{{ Pagetotal }}条结果:</span>
      </div>
      <div>
        <el-table :data="tableData" v-loading="isLoading" style="width: 100%">
          <el-table-column prop="cover" label="封面" width="180">
            <template>
              <!-- <img
                v-if="scope.row.cover.images"
                :src="scope.row.cover.images"
                style="width:50px;height:50px"
              />
              <img
                v-else
                src="@/assets/no-cover.gif"
                style="width:50px;height:50px"
              /> -->
              <img src="@/assets/no-cover.gif" style="width:50px;height:50px" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-button :type="tableStatus[scope.row.status].type" plain>{{
                tableStatus[scope.row.status].text
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="control" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="$router.push('/publish?id=' + scope.row.id)"
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                @click="ondeleteArticle(scope.row.id)"
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="fenye"
          layout="prev, pager, next"
          :total="Pagetotal"
          :page-size="pageSize"
          @current-change="onpageChange"
          :disabled="isLoading"
          :current-page.sync="currentPage"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getarticle, getchannels, deleteArticle } from "@/api/article.js"
export default {
  data() {
    return {
      value: null,
      tableData: [],
      Pagetotal: null,
      pageSize: 20,
      status: null,
      options: [],
      currentPage: 1,
      isLoading: true,
      form: {
        name: "",
        region: "",
        date: null,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        radio: 3,
      },
      tableStatus: [
        { status: 0, text: "草稿", type: "primary" },
        { status: 1, text: "待审核", type: "info" },
        { status: 2, text: "审核通过", type: "success" },
        { status: 3, text: "审核失败", type: "danger" },
      ],
    }
  },

  computed: {},

  methods: {
    loadarticle(page = 1) {
      this.isLoading = true
      getarticle({
        page: page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.value,
        begin_pubdate: this.form.data ? this.form.data[0] : null,
        end_pubdate: this.form.data ? this.form.data[1] : null,
      }).then((res) => {
        this.Pagetotal = res.data.data.total_count
        this.tableData = res.data.data.results
        this.isLoading = false
      })
    },
    loadchannels() {
      getchannels().then((res) => {
        this.options = res.data.data.channels
      })
    },
    ondeleteArticle(id) {
      console.log(id)
      deleteArticle(id).then((res) => {
        console.log(res)
      })
      this.loadarticle(this.currentPage)
    },
    onSubmit() {
      this.status = this.form.radio
      this.loadarticle()
      console.log("submit!")
    },
    onpageChange(page) {
      this.loadarticle(page)
    },
  },

  created() {
    this.loadarticle(1)
    this.loadchannels()
  },
  mounted() {},
  components: {},
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-bottom: 20px;
}
.fenye {
  width: 100%;
  margin: 20px auto;
}
</style>
