// 文章模块的相关方法
import request from "@/utils/request.js"
export const getarticle = (params) => {
  return request({
    url: "/mp/v1_0/articles",
    method: "get",
    params: params,
  })
}
// 文章频道
export const getchannels = (data) => {
  return request({
    url: "/mp/v1_0/channels",
    method: "get",
    data: data,
  })
}
// 删除文章
export const deleteArticle = (data) => {
  return request({
    url: `/mp/v1_0/articles/${data}`,
    method: "delete",
  })
}
// 发布文章
export const publishArticle = (data, draft = false) => {
  return request({
    url: `/mp/v1_0/articles`,
    method: "post",
    data,
    params: {
      draft, //是否存草稿
    },
  })
}
