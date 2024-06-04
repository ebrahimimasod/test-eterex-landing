import http from './HttpService'

const endpoint = process.env.BASE_URL

const getFAQ = () => {
    return http.get(endpoint + '/pages?slug=faqs')
}

export default { getFAQ }
