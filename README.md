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

