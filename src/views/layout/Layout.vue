<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <Aside :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div header-wrap>
          <i @click="isCollapse = !isCollapse" class="el-icon-s-fold" style="margin-right:10px"></i>
          <span>XXX有限公司</span>
        </div>

        <el-dropdown>
          <span class="" style="display:flex;align-items: center;">
            <img :src="user.photo" style="width:50px;height:50px;border-radius:50%;margin-right:10px" />
            <span>{{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i></span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-edit-outline"></i>
              修改密码</el-dropdown-item
            >
            <el-dropdown-item>
              <span @click="goout">
                <i class="el-icon-refresh"></i>
                退出
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './components/Aside'
import { user } from '@/api/user.js'
import globalBus from '@/utils/global-bus.js'
export default {
  data() {
    return {
      user: {}, //用户头像
      isCollapse: false, //是否展开
    }
  },

  computed: {},

  methods: {
    getUser() {
      user().then(res => {
        this.user = res.data.data
      })
    },
    //退出登录
    goout() {
      window.localStorage.clear()
      this.$router.push('/login')
    },
  },

  created() {
    this.getUser()
    globalBus.$on('update-user', data => {
      this.user.photo = data.photo
      this.user.name = data.name
    })
  },
  mounted() {},
  components: { Aside },
}
</script>

<style scoped>
.layout-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.aside {
  height: 100%;
  background-color: #001529;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
</style>
