import http from './HttpService'

const getPage = (slug) => {
  return http.get(`/pages`, {
    params: {
      slug,
    },
  })
}

export default { getPage }
