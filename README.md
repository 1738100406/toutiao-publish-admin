# Toutiao-pubilsh-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



用户登录

13911111111

17090086870

246810

### 创建组件并配置路由

将登录界面并配置到路由中

```
data(){
    Loginrules: {
            mobile: [
              { required: true, message: "请输入账号密码", trigger: "change" },
              { min: 3, max: 11, message: "长度在 3 到 11 个字符", changer: "blur", }, ],
            code: [{ required: true, message: "请输入验证码", trigger: "change" }],
            argument: [
              { validator: (rule, value, callback) => {
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
}
submitForm(formName) {
	this.$refs.formName.validate((valid) => {
    	if (valid) {
            alert('submit!');
         } else {
            console.log('error submit!!');
            return false;
         }
     }
 }
```

```
// Body 参数使用 data 设置
// Query参数使用 params设置
// Headers 参数使用 headers 设置

```

```
//巧妙的利用索引
<template slot-scope="scope">
   <el-tag :type="articleStatus[scope.row.status].type">
      {{articleStatus[scope.row.status].text }}
   </el-tag>
<template >
data(){
	return{
		articleStatus:[
            { status: 0,text:'草稿',type:'info' },
            { status: 1,text:'待审核’, type:success ' }
            { status: 3, text:'审核失败',type:'warning' }
            { status: 4, text:'已删除',type: 'danger' }
        ]
	}
}
```

```
//时间格式化处理
<el-date-picker
    v-model="form.date"
    type="datetimerange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :default-time="['12:00:00']"
    format="yyyy-MM-dd"
    value-format="yyyy-MM-dd">
</el-date-picker>

({
	begin_pubdate: this.form.data ? this.form.data[0] : null,
	end_pubdate: this.form.data ? this.form.data[1] : null,
})

```

```
<el-pagination
    class="fenye"
    layout="prev, pager, next"
    :total="Pagetotal"
    :page-size="pageSize"
    @current-change="onpageChange"
    :disabled="isLoading">
    :disabled="isLoading" //分页点击加载不请求
</el-pagination>
```

```
请求401 :label="1"
```

```
new Image({
          uploadRequest(file) {
            const fd = new FormData()
            fd.append("image", file)
            return uploadimg(fd).then((res) => { //上传图片
            									//第一是return 是返回promise 对象
              return res.data.data.url
              									//第二个return 是返回最好的结果
           })
        },
 }),
```

```
<div class="img-wrap">
            <el-avatar style="width:150px;height:150px" shape="square" size="large" :src="form.photo"></el-avatar>
</div>

上传头像
<label for="file">
            选择修改头像
         <input @change="onChangeAvatar" id="file" type="file" ref="file" hidden />
  </label>
  //这里的 lable中for="file" 会触发id="file" 

      
 
 
 //图片裁切器必须基于img进行初始化
//注意:img必须是可见状态才能正常完成初始化
//获取图片DOM节点
对话框完全打开


//第1次初始化好以后，如果预览裁切的图片发生了变化
裁切器默认不会更新
//如果需要预览图片发生变化更新裁切器:
方式一:裁切器.replace方法
方式二:销毁裁切器，重新初始化
初始化裁切器


 onChangeAvatar() {
      const file = this.$refs.file
      var blobData = window.URL.createObjectURL(file.files[0])
      console.log(blobData)
      this.blobData = blobData
      this.$refs.file.value = '' //解决选择相同文件 不触发change事件
      this.dialogVisible = true
},
//弹窗完全打开 初始化裁切
 dialogOpened() {
      this.cropper = new Cropper(this.$refs.image, {
        aspectRatio: 16 / 9,
      })
},
//弹窗关闭销毁 初始化裁切
  dialogClosed() {
      this.cropper.destroy()
}, 
//弹窗点击确定
dialogConfirm() {
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo' /*, 接口请求字段名 */, file /*, 'example.png' */)
        // 请求提交
        console.log(fd)
        updateUser(fd).then(res => {
          this.form.photo = res.data.data.photo //方法一 把图片赋值给页面						            //this.form.photo=window.URL.createObjectURL(file)方法二预览图片的链接
          this.dialogVisible = false
        })
      })
      console.log('confirm')
},

```

