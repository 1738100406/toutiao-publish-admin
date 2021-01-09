import Vue from "vue"
import VueRouter from "vue-router"
import layout from "@/views/layout/Layout"
import home from "@/views/Home"
import NProgress from "nprogress"
Vue.use(VueRouter)

const routes = [
  { path: "/login", component: () => import("../views/Login.vue") },
  {
    path: "/",
    component: layout,
    children: [
      { path: "/", component: home },
      { path: "/article", component: () => import("../views/article/article") },
      { path: "/publish", component: () => import("../views/article/publish") },
      { path: "/image", component: () => import("../views/image/imagemanage") },
      { path: "/comment", component: () => import("../views/comment/comment") },
    ],
  },
]

const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const user = JSON.parse(window.localStorage.getItem("user"))
  if (to.path !== "/login") {
    if (user) {
      next()
    } else {
      next("/login")
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
