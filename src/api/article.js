// 文章模块的相关方法
import request from "@/utils/request.js"
export const loadarticle = () => {
  return request({
    url: "/mp/v1_0/articles",
    method: "get",
  })
}
