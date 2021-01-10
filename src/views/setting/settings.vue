<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号">
              {{ form.id }}
            </el-form-item>
            <el-form-item label="手机号">
              {{ form.mobile }}
            </el-form-item>
            <el-form-item label="邮箱">
              {{ form.email }}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="form.name"> </el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input v-model="form.intro"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <div class="img-wrap">
            <el-avatar style="width:150px;height:150px" shape="square" size="large" :src="form.photo"></el-avatar>
          </div>
          <label for="file">
            选择修改头像
            <input @change="onChangeAvatar" id="file" type="file" ref="file" hidden />
          </label>
        </el-col>
      </el-row>

      <el-dialog
        title="提示"
        @opened="dialogOpened"
        @closed="dialogClosed"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        append-to-body
      >
        <div class="avatar" style="width:150px;height:150px;">
          <img ref="image" id="image" :src="blobData" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import { user, updateUser, updateUserInfo } from '@/api/user'
import globalBus from '@/utils/global-bus'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  data() {
    return {
      form: {
        name: '',
        intro: '',
        email: '',
        id: null,
        mobile: '',
        photo: '',
      },
      dialogVisible: false, //弹窗
      blobData: '',
      cropper: '',
    }
  },

  computed: {},

  methods: {
    onSubmit() {
      updateUserInfo(this.form).then(res => {
        console.log(res.data.data)
        this.loaduserinfo()
        globalBus.$emit('update-user', this.form)
      })
    },
    loaduserinfo() {
      user().then(res => {
        this.form = res.data.data
      })
    },
    onChangeAvatar() {
      const file = this.$refs.file
      var blobData = window.URL.createObjectURL(file.files[0])
      console.log(blobData)
      this.blobData = blobData
      this.$refs.file.value = '' //解决选择相同文件 不触发change事件
      this.dialogVisible = true
    },
    dialogOpened() {
      this.cropper = new Cropper(this.$refs.image, {
        aspectRatio: 16 / 9,
      })
    },
    dialogClosed() {
      this.cropper.destroy()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    dialogConfirm() {
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo' /*, 接口请求字段名 */, file /*, 'example.png' */)
        // 请求提交
        console.log(fd)
        updateUser(fd).then(res => {
          this.form.photo = res.data.data.photo
          this.dialogVisible = false
          globalBus.$emit('update-user', this.form)
        })
      })
      console.log('confirm')
    },
  },

  created() {
    this.loaduserinfo()
  },
  mounted() {},
  components: {},
}
</script>

<style lang="scss" scoped>
.avatar {
  img {
    display: block;
    max-width: 100%;
  }
}
</style>
