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
// 修改文章
export const editArticle = (articleId, data, draft = false) => {
  return request({
    url: `/mp/v1_0/articles/${articleId}`,
    method: "put",
    data,
    params: {
      draft, //是否存草稿
    },
  })
}
// 获取文章
export const getArticle = (articleId) => {
  return request({
    url: `/mp/v1_0/articles/${articleId}`,
    method: "get",
  })
}
// 上传图片
export const uploadimg = (data) => {
  return request({
    url: "/mp/v1_0/user/images",
    method: "post",
    data,
    // Content-Typemultipart/form-data
  })
}
// 获取图片素材
export const getimageList = (params) => {
  return request({
    url: "/mp/v1_0/user/images",
    method: "get",
    params,
    // Content-Typemultipart/form-data
  })
}
// 修改文章评论状态
export const edidArticle = (articleId, allowComment = true) => {
  return request({
    url: `/mp/v1_0/comments/status`,
    method: "put",
    params: {
      article_id: articleId.toString(),
    },
    data: {
      allow_comment: allowComment,
    },
  })
}
