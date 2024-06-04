import axios from 'axios'
import NProgress from 'nprogress'

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
})
// import { NProgressConfig } from '../features/NProgressConfig'

// NProgress.configure(NProgressConfig)

// axios.defaults.headers.common['crossDomain'] = true;

// before a request is made start the nprogress
axiosInstance.interceptors.request.use((config) => {
  // NProgress.start()
  return config
})

// before a response is returned stop nprogress
axiosInstance.interceptors.response.use((response) => {
  // NProgress.done()
  return response
})

axiosInstance.interceptors.response.use(null, (error) => {
  NProgress.done()
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500

  if (!expectedError) {
    // logger.log(error);
  }

  return Promise.reject(error)
})

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  patch: axiosInstance.patch,
  delete: axiosInstance.delete,
}
