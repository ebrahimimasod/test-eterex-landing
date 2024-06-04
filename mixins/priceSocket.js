import Configs from '@/httpservices/Configs'

export default {
  data() {
    return {
      endpoint: 'wss://stream.eterex.com',
      iconbase:'/assets/coins/svg/',

      apiUrl: 'https://api.eterex.com/api',
      cache: {}, // coins data cache
      coins: [], // live coin list from api
      asset: 'USDT', // filter by base asset pair
      sort: 'assetVolume', // sort by param
      order: 'desc', // sort order ( asc, desc )
      status: 0, // socket status ( 0: closed, 1: open, 2: active, -1: error )
      sock: null, // socket inst

      irtUsdtPrice: "",
      usdtIrtPrice: "",
      limit: 12,

      searchText: '',
      tab: 'irt',
    }
  },

  computed: {
    coinsList() {
      let list = this.coins

      const usdt = {
        arrow: '▲',
        asset: 'USDT',
        assetVolume: 0,
        change: 0,
        high: 1,
        icon:'/assets/coins/svg/usdt_.svg',
        info: 'USDT/USDT 1 ( ▲ +0.00% | +0 )',
        low: 1,
        name: 'USDT',
        open: 1,
        pair: 'USDT/USDT',
        percent: 0.0,
        price: 1,
        sign: '+',
        style: 'gain',
        symbol: 'USDT',
        token: 'USDT',
        tokenVolume: 0,
        trades: 0,
      }

      list.unshift(usdt)

      if (this.asset) {
        list = list.filter((i) => i.asset === this.asset)
      }

      return list
    },

    // filter the wallets base of search text
    filtered() {
      return this.coinsList
        .filter((coin) => {
          const searchRes =
            coin.symbol
              .toLocaleLowerCase()
              .includes(this.searchText.toLocaleLowerCase()) ||
            coin.name
              .toLowerCase()
              .includes(this.searchText.toLocaleLowerCase())

          return searchRes
        })
        .slice(0, this.limit)
    },
  },

  mounted() {
    this.getConfigs()
    this.sockInit()
  },

  // app destroyed
  destroyed() {
    clearInterval(this.countDown)
    this.sockClose()
  },

  unmounted() {
    clearInterval(this.countDown)
    this.sockClose()
  },

  methods: {
    // finalize data for each coin from socket
    getCoinData(item) {
      const reg = /^([a-zA-Z0-9_.-]+)(BTC|ETH|BNB|USDT|TUSD|LTC)$/
      const symbol = String(item.s)
        // eslint-disable-next-line
        .replace(/[^\w\-]+/g, '')
        .toUpperCase()

      const token = symbol.replace(reg, '$1')
      const asset = symbol.replace(reg, '$2')
      const name = token
      const pair = token + '/' + asset
      const icon = this.iconbase + token.toLowerCase() + '_.svg'
      const open = parseFloat(item.o)
      const high = parseFloat(item.h)
      const low = parseFloat(item.l)
      const price = parseFloat(item.c)
      const change = parseFloat(item.p)
      const percent = parseFloat(item.P)
      const trades = parseInt(item.n)
      const tokenVolume = Math.round(item.v)
      const assetVolume = Math.round(item.q)
      const sign = percent >= 0 ? '+' : ''
      const arrow = percent >= 0 ? '▲' : '▼'
      const info = [
        pair,
        price.toFixed(8),
        '(',
        arrow,
        sign + percent.toFixed(2) + '%',
        '|',
        sign + change.toFixed(8),
        ')',
      ].join(' ')
      let style = ''

      if (percent > 0) style = 'gain'
      if (percent < 0) style = 'loss'

      return {
        symbol,
        token,
        asset,
        name,
        pair,
        icon,
        open,
        high,
        low,
        price,
        change,
        percent,
        trades,
        tokenVolume,
        assetVolume,
        sign,
        arrow,
        style,
        info,
      }
    },

    // start socket connection
    sockInit() {
      if (this.status > 0) return
      try {
        this.status = 0 // closed
        this.sock = new WebSocket(this.endpoint)

        this.sock.addEventListener('open', this.onSockOpen)
        this.sock.addEventListener('close', this.onSockClose)
        this.sock.addEventListener('error', this.onSockError)
        this.sock.addEventListener('message', this.onSockData)
      } catch (err) {
        this.status = -1 // error
        this.sock = null
      }
    },

    // process data from socket
    onSockData(e) {
      const list = JSON.parse(e.data) || []

      for (const item of list) {
        // cleanup data for each coin
        const c = this.getCoinData(item)
        // add coin data to cache
        this.cache[c.symbol] = c
      }
      // convert cache object to final prices list for each symbol

      this.coins = Object.keys(this.cache).map((s) => this.cache[s])

      this.status = 2 // active
    },

    // on socket connected
    onSockOpen() {
      this.status = 1 // open
      // this.sockHeartbeat()
    },

    // close socket connection
    sockClose() {
      if (this.sock) {
        this.sock.close()
      }
    },

    // on socket error
    onSockError() {
      this.status = -1 // error
      setTimeout(this.sockInit, 10000) // try again
    },

    //  send a heartbeat message to server every 10 seconds
    // sockHeartbeat() {
    //     this.sock.send('pingByClient')

    //     this.countDown = setInterval(() => {
    //         this.sock.send('pingByClient')
    //     }, 10000)
    // },

    //  get FIAT PRICE
    getConfigs() {
      Configs.getConfigs()
        .then((response) => {
          this.irtUsdtPrice = response.data.irtUsdt
          this.usdtIrtPrice = response.data.usdtIrt
        })
        .catch(() => { })
    },
  },
}
