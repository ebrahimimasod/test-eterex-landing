import http from './HttpService'
const endpoint = process.env.PUBLIC_URL

const fetchPriceList = (fromAsset) => {
  return http.get(`/public/api/assets/price/list`, {
    baseURL: endpoint,
    params: {
      name: fromAsset
    }
  });
};

const fetchAssetsList = () => {
  return http.get('public/api/assets/list', {
    baseURL: endpoint,
    params: {
      page_size: 10000
    }
  });
};

export default { fetchPriceList,fetchAssetsList }
