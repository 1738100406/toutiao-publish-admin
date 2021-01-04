<template>
  <div class="login-container">
    <div class="login-header">
      <div class="login-header-logo">
        <img src="../assets/logo_index.png" alt="" />
      </div>
      <el-form ref="loginForm" :rules="Loginrules" :model="user">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入账号" v-model="user.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="验证码" v-model="user.code"></el-input>
        </el-form-item>
        <el-form-item prop="argument">
          <el-checkbox v-model="user.argument"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="onLogin"
            :loading="loginLoading"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user.js"
export default {
  data() {
    return {
      user: {
        // mobile: "",
        mobile: "13911111111",
        // code: "",
        code: "246810",
        argument: false,
      },
      Loginrules: {
        mobile: [
          { required: true, message: "请输入账号密码", trigger: "change" },
          {
            min: 3,
            max: 11,
            message: "长度在 3 到 11 个字符",
            changer: "blur",
          },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "change" }],
        argument: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                return callback(new Error("请同意条款"))
              }
            },
            trigger: "blur",
          },
        ],
      },
      checked: false, //是否阅读条款
      loginLoading: false, //登录loding
    }
  },
  methods: {
    onLogin(loginForm) {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login() {
      this.loginLoading = true
      login(this.user)
        .then((res) => {
          if (res.data.message == "OK") {
            this.$message({
              message: "登录成功",
              type: "success",
            })
            this.loginLoading = false
            window.localStorage.setItem("user", JSON.stringify(res.data.data))
            this.$router.push("/")
          } else {
            this.$message.error("登录失败,手机号或验证码错误")
          }
        })
        .catch((res) => {
          this.loginLoading = false
        })
    },
  },

  created() {},
  components: {},
}
</script>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../assets/login_bg.jpg") no-repeat;
  .login-header {
    .login-header-logo {
      display: flex;
      justify-content: center;
      text-align: center;
      margin-bottom: 20px;
    }
    min-width: 500px;
    background-color: #fff;
    padding: 50px;
    border-radius: 10px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
