<template>
  <el-menu
    default-active="/"
    class="el-menu-vertical-aside"
    @open="handleOpen"
    @close="handleClose"
    background-color="#001529"
    text-color="#A69F8C"
    active-text-color="#fff"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-menu"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-document"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-position"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-s-comment"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-setting"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-s-management"></i>
      <span slot="title">个人管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: ["isCollapse"],
  data() {
    return {}
  },

  computed: {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },

  created() {},
  mounted() {},
  components: {},
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-aside {
  background-color: pink;
  .el-menu-item.is-active {
    background-color: #1890ff !important;
  }
}
</style>
