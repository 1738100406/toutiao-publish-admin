import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import "./styles/index.scss"
import "nprogress/nprogress.css"
import ElementUI from "element-ui"
import { ElementTiptapPlugin } from "element-tiptap"
// 引入 ElementUI 样式
import "element-ui/lib/theme-chalk/index.css"
// import element-tiptap 样式
import "element-tiptap/lib/index.css"
Vue.use(ElementTiptapPlugin, {
  lang: "zh", // 见 i18n
  spellcheck: true,
  // https://github.com/Leecason/element-tiptap/issues/49
})
// 现在你已经在全局注册了 `el-tiptap` 组件。
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
