<template>
  <div class="c-trading-view-chart">
    <div :key="componentKey">
      <div ref="chartBox" class="trading-veiw-section">
        <div v-if="symbolLoaded">
          <TradingView
            :options="{
              symbol: 'BINANCE:' + symbol + 'USDT',
              theme: 'light',
              width: '100%',
              interval: 'D',
              timezone: 'Etc/UTC',
              locale: 'fa_IR',
              allow_symbol_change: false,
              hide_side_toolbar: false,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TradingView from './TradingView'

export default {
  components: {
    TradingView,
  },

  props: {
    symbol: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      symbolLoaded: false,
      componentKey: 0,
    }
  },

  watch: {
    symbol() {
      this.componentKey += 1
    },
  },

  mounted() {
    this.symbolLoaded = true
  },

  destroyed() {
    // delete this.$options.components.VueTradingView
  },
}
</script>
<style lang="scss">
.c-trading-view-chart {
  .series-2KhwsEwE .titleWrapper-2KhwsEwE,
  .series-2KhwsEwE .valuesWrapper-2KhwsEwE {
    display: none !important;
  }
}
</style>
