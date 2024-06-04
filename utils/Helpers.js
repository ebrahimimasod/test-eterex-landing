export const strLimit = (value, length = 10) => {
  return String(value).length <= length
    ? value
    : value.substr(0, length) + '...'
}

export const generateMetaData = (title, params = {}) => {
  const appName = 'اِتِرِاکس';
  const appDescription = 'پشتیبانی 24 ساعته و برگزاری جلسات مشاوره، بخشی از خدماتی است که صرافی اتراکس برای تمام مشتریانش فراهم کرده است';


  const getTitle = () => {
    if (params.withoutAppName) {
      return title
    }
    return title ? `${appName}؛ ${title}` : appName
  }

  const getDescription = () => {
    return params.description || appDescription;
  }

  const defaultMeta = [
    {charset: 'utf-8'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {name: 'robots', content: 'index, follow'},
    {name: 'og:locale', content: 'fa_IR'},
    {property: 'og:title', content: 'اِتِرِاکس | ارائه خدمات نوین رمزارزها'},
    {property: 'og:image', content: 'https://eterex.com/favicon.ico'},
    {name: 'mobile-web-app-capable', content: "yes"},
    {name: 'apple-mobile-web-app-title', content: "صرافی انلاین اتراکس"},
    {name: 'og:type', property: 'og:type', content: "website"},
    {name: 'og:title', property: 'og:title', content: getTitle()},
    {name: 'og:site_name', property: 'og:site_name', content: "صرافی انلاین اتراکس"},
    {name: 'description', content: getDescription()},
    {property: 'og:description', content: getDescription()},
  ];
  const customMeta = params.meta ?? [];

  const meta = params.withoutDefaultMeta
    ? customMeta
    : [
      ...defaultMeta,
      ...customMeta
    ]

  return {
    title: getTitle(),
    meta,
  }
}

export const slugeable = (value, character = '-') => {
  if (value) {
    return String(value).replace(/ /g, character)
  }
  return null
}

export const isSSR = () => typeof (window) === 'undefined'

export function getAssetIconUrl(asset) {
  console.log({url: process.env.STATIC_SRC});

  return `${process.env.STATIC_SRC}icons/png/${asset.toLowerCase()}_.png`;
}

export const getConfigPriceFromGroup = (symbol = "", priceGroups = []) => {
  let prices = {
    usdtIrt: 0,
    irtUsdt: 0,
  };

  const usdtPrices = priceGroups.find(i => i.coins.includes(String(symbol)?.toUpperCase()))?.prices || {
    irtUsdt: 0,
    usdtIrt: 0
  };
  prices.usdtIrt = usdtPrices?.usdtIrt
  prices.irtUsdt = usdtPrices?.irtUsdt

  return prices;
}

