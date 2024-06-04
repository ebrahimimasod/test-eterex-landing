<template>
  <div :id="containerDiv"></div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'TradingView',

  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const containerDiv = ref('tradingview-chart')
    const scriptID = ref('tradingview-chart-script')

    const defaultOption = {
      width: 980,
      height: (() => {
        if (window) {
          return window.innerWidth > 768 ? 650 : 400
        }
        return 600
      })(),
      symbol: 'BINANCE:BTCUSDT',
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: 'tradingview-chart',
    }

    const canUseDOM = () => {
      return (
        typeof window !== 'undefined' &&
        window.document &&
        window.document.createElement
      )
    }

    const getScriptElement = () => {
      return document.getElementById(scriptID.value)
    }

    const scriptExists = () => {
      return getScriptElement() !== null
    }

    const appendScript = (onload) => {
      if (!canUseDOM()) return

      if (scriptExists()) {
        document.getElementById(scriptID.value).remove()
      }

      const script = document.createElement('script')
      script.id = scriptID.value
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://s3.tradingview.com/tv.js'
      script.onload = onload
      document.getElementsByTagName('head')[0].appendChild(script)
    }

    const initWidget = () => {
      setTimeout(() => {
        if (typeof window.TradingView === 'undefined') return
        const options = { ...defaultOption, ...props.options }

        if (options.container_id !== containerDiv.value) {
          // console.error('container_id in Chart component must be "tradingview-chart"');
          return
        }

        /* eslint new-cap: ["error", { "newIsCap": false }] */
        // eslint-disable-next-line no-new
        new window.TradingView.widget(
          Object.assign({ container_id: containerDiv }, options)
        )
      }, 300)
    }

    onMounted(() => {
      appendScript(() => initWidget())
    })

    return { containerDiv }
  },
}
</script>
