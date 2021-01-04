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
