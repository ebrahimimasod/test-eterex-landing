import http from './HttpService'
const endpoint = process.env.API_URL + '/Configs/v2'

const getConfigs = () => {
  return http.get(endpoint)
}

export default { getConfigs }
