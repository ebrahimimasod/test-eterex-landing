import http from './HttpService'

const getPosts = (numInPage = 9, page = 1, categories, order = 'desc') => {
  return http.get(`/posts`, {
    params: {
      page,
      categories,
      order,
      per_page: numInPage,
    },
  })
}

const getPostBySlug = (params) => {
  return http.get('/posts', {
    params,
  })
}

const getPostImages = () => {
  return http.get(`/media`)
}

const getCategories = () => {
  return http.get('/categories?per_page=50')
}

const getComments = (post) => {
  return http.get(`/comments`, {
    params: {
      post,
    },
  })
}

const postComments = (comment) => {
  return http.post('/comments', {
    post: comment.postID,
    author_name: comment.authorName,
    author_email: comment.authorEmail,
    content: comment.contentData,
  })
}

export default {
  getPosts,
  getPostBySlug,
  getCategories,
  getPostImages,
  getComments,
  postComments,
}
